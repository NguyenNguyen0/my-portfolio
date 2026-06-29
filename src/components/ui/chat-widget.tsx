'use client';

import { useRef, useEffect, useState } from 'react';
import { usePortfolioActions } from '@/context/portfolio-actions';
import { useTheme } from 'next-themes';
import { AnimatePresence, motion } from 'framer-motion';
import { Bot, X, Send } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { cn } from '@/lib/utils';

type ChatMessage = { role: 'user' | 'assistant'; content: string };

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const { dispatch } = usePortfolioActions();
  const { setTheme } = useTheme();

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const userInput = input.trim();
    if (!userInput || isLoading) return;

    const newMessages: ChatMessage[] = [
      ...messages,
      { role: 'user', content: userInput },
    ];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

    // Add empty assistant message to stream into
    setMessages(prev => [...prev, { role: 'assistant', content: '' }]);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages }),
      });

      if (!res.ok || !res.body) {
        setMessages(prev => {
          const updated = [...prev];
          updated[updated.length - 1] = { role: 'assistant', content: 'Sorry, something went wrong.' };
          return updated;
        });
        return;
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });

        const lines = buffer.split('\n');
        buffer = lines.pop() ?? '';

        for (const line of lines) {
          if (!line.startsWith('data: ')) continue;
          const raw = line.slice(6).trim();
          if (!raw) continue;
          let event: Record<string, unknown>;
          try { event = JSON.parse(raw); } catch { continue; }

          if (event.type === 'text-delta' && typeof event.delta === 'string') {
            setMessages(prev => {
              const updated = [...prev];
              updated[updated.length - 1] = {
                ...updated[updated.length - 1],
                content: updated[updated.length - 1].content + (event.delta as string),
              };
              return updated;
            });
          } else if (event.type === 'tool-input-available') {
            handleUiAction(event.toolName as string, event.input as Record<string, unknown>);
          }
        }
      }
    } catch {
      setMessages(prev => {
        const updated = [...prev];
        updated[updated.length - 1] = { role: 'assistant', content: 'Sorry, something went wrong.' };
        return updated;
      });
    } finally {
      setIsLoading(false);
    }
  }

  function handleUiAction(toolName: string, args: Record<string, unknown>) {
    switch (toolName) {
      case 'scroll_to_section': {
        const el = document.getElementById(args.sectionId as string);
        el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        break;
      }
      case 'change_theme':
        setTheme(args.theme as string);
        break;
      case 'change_accent_color':
        document.documentElement.style.setProperty('--primary', args.primary as string);
        document.documentElement.style.setProperty('--ring', args.ring as string);
        dispatch({ type: 'SET_ACCENT_COLOR', color: args.color as string });
        break;
      case 'highlight_project': {
        const el = document.getElementById('projects-section');
        el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        dispatch({ type: 'SET_HIGHLIGHTED_PROJECT', projectId: args.projectId as string });
        break;
      }
      case 'set_hero_description':
        dispatch({ type: 'SET_HERO_DESCRIPTION', text: args.text as string });
        break;
      case 'focus_skill':
        dispatch({ type: 'SET_FOCUSED_SKILL', skillId: args.skillId as string });
        break;
      case 'reset_ui':
        document.documentElement.style.removeProperty('--primary');
        document.documentElement.style.removeProperty('--ring');
        dispatch({ type: 'RESET' });
        break;
    }
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            transition={{ duration: 0.18 }}
            className="w-[min(480px,90vw)] h-[50vh] min-h-[400px] bg-card border border-border flex flex-col overflow-hidden shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-card">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="font-[family-name:var(--font-press-start)] text-[10px] text-primary tracking-wider">
                  ASK ME
                </span>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Close chat"
              >
                <X size={16} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-3 py-3 space-y-3">
              {messages.length === 0 && (
                <div className="text-center text-muted-foreground text-xs mt-8 space-y-1">
                  <p className="font-[family-name:var(--font-vt323)] text-3xl text-primary">
                    👾 Hello!
                  </p>
                  <p>Ask me anything about Nguyễn Trung Nguyên and his projects.</p>
                </div>
              )}

              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={cn(
                    'flex',
                    msg.role === 'user' ? 'justify-end' : 'justify-start',
                  )}
                >
                  <div
                    className={cn(
                      'max-w-[80%] px-3 py-2 text-sm leading-relaxed',
                      msg.role === 'user'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-foreground',
                    )}
                  >
                    {msg.role === 'assistant' ? (
                      <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        components={{
                          p: ({ children }) => <p className="mb-1 last:mb-0">{children}</p>,
                          ul: ({ children }) => <ul className="list-disc pl-4 mb-1">{children}</ul>,
                          ol: ({ children }) => <ol className="list-decimal pl-4 mb-1">{children}</ol>,
                          code: ({ children }) => (
                            <code className="bg-background/60 px-1 rounded text-xs font-mono">
                              {children}
                            </code>
                          ),
                          a: ({ href, children }) => (
                            <a href={href} target="_blank" rel="noopener noreferrer" className="text-primary underline">
                              {children}
                            </a>
                          ),
                        }}
                      >
                        {msg.content}
                      </ReactMarkdown>
                    ) : (
                      msg.content
                    )}
                  </div>
                </div>
              ))}

              {isLoading && messages[messages.length - 1]?.content === '' && (
                <div className="flex justify-start">
                  <div className="bg-muted px-3 py-2 flex gap-1 items-center">
                    {[0, 1, 2].map((i) => (
                      <motion.span
                        key={i}
                        className="w-1.5 h-1.5 rounded-full bg-primary"
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                      />
                    ))}
                  </div>
                </div>
              )}

              <div ref={bottomRef} />
            </div>

            {/* Input */}
            <form
              onSubmit={handleSubmit}
              className="border-t border-border flex items-center"
            >
              <input
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder="Type a message…"
                disabled={isLoading}
                className="flex-1 bg-background text-foreground text-sm px-3 py-3 outline-none placeholder:text-muted-foreground disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="h-full px-4 py-3 bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-40 transition-colors"
                aria-label="Send"
              >
                <Send size={16} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Trigger button */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-14 h-14 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-lg hover:bg-primary/90 transition-colors relative"
        aria-label="Open AI chat"
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.span key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
              <X size={22} />
            </motion.span>
          ) : (
            <motion.span key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
              <Bot size={22} />
            </motion.span>
          )}
        </AnimatePresence>
        {/* ponytail: pulse ring only when closed — no additional state needed */}
        {!open && (
          <span className="absolute inset-0 rounded-full ring-2 ring-primary animate-ping opacity-30 pointer-events-none" />
        )}
      </button>
    </div>
  );
}
