'use client';

import { useRef, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { usePortfolioActions } from '@/context/portfolio-actions';
import { useTheme } from 'next-themes';
import { AnimatePresence, motion } from 'framer-motion';
import { Bot, X, Send, Info } from 'lucide-react';
import { cn } from '@/lib/utils';

type ChatMessage = { role: 'user' | 'assistant'; content: string };

// react-markdown + remark-gfm are ~150KB and unused until the first assistant
// reply exists — code-split them out of the eager initial bundle.
const Markdown = dynamic(
	() =>
		import('react-markdown').then((rm) =>
			import('remark-gfm').then((gfm) => {
				const ReactMarkdown = rm.default;
				const remarkGfm = gfm.default;
				return function Markdown({ children }: { children: string }) {
					return (
						<ReactMarkdown
							remarkPlugins={[remarkGfm]}
							components={{
								p: ({ children }) => (
									<p className="mb-1 last:mb-0">{children}</p>
								),
								ul: ({ children }) => (
									<ul className="list-disc pl-4 mb-1">
										{children}
									</ul>
								),
								ol: ({ children }) => (
									<ol className="list-decimal pl-4 mb-1">
										{children}
									</ol>
								),
								code: ({ children }) => (
									<code className="bg-background/60 px-1 rounded text-xs font-mono">
										{children}
									</code>
								),
								a: ({ href, children }) => (
									<a
										href={href}
										target="_blank"
										rel="noopener noreferrer"
										className="text-primary underline"
									>
										{children}
									</a>
								),
							}}
						>
							{children}
						</ReactMarkdown>
					);
				};
			}),
		),
	{ ssr: false },
);

const PROMPT_CHIPS = [
	{ label: '🎨 Change color', text: 'Change the background color to blue' },
	{
		label: '📝 Edit content',
		text: 'Change the hero description to a cheerful greeting',
	},
	{ label: '💼 View projects', text: 'Show me the featured projects' },
	{ label: '🙋 About Trung Nguyên', text: 'Introduce Trung Nguyên' },
	{ label: '🌙 Switch theme', text: 'Switch to light mode' },
	{ label: '🛠 Skills', text: 'What skills does Trung Nguyên have?' },
	{ label: '📬 Contact', text: 'How can I contact Trung Nguyên?' },
	{ label: '🔄 Reset UI', text: 'Reset the UI back to default' },
];

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

	async function sendMessage(userInput: string) {
		if (!userInput || isLoading) return;

		const newMessages: ChatMessage[] = [
			...messages,
			{ role: 'user', content: userInput },
		];
		setMessages(newMessages);
		setInput('');
		setIsLoading(true);

		// Add empty assistant message to stream into
		setMessages((prev) => [...prev, { role: 'assistant', content: '' }]);

		try {
			const res = await fetch('/api/chat', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ messages: newMessages }),
			});

			if (!res.ok || !res.body) {
				setMessages((prev) => {
					const updated = [...prev];
					updated[updated.length - 1] = {
						role: 'assistant',
						content: 'Sorry, something went wrong.',
					};
					return updated;
				});
				return;
			}

			const reader = res.body.getReader();
			const decoder = new TextDecoder();
			let buffer = '';
			let accumulatedText = '';
			let errorText: string | null = null;

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
					try {
						event = JSON.parse(raw);
					} catch {
						continue;
					}

					if (
						event.type === 'text-delta' &&
						typeof event.delta === 'string'
					) {
						accumulatedText += event.delta;
						setMessages((prev) => {
							const updated = [...prev];
							updated[updated.length - 1] = {
								...updated[updated.length - 1],
								content:
									updated[updated.length - 1].content +
									(event.delta as string),
							};
							return updated;
						});
					} else if (event.type === 'tool-output-available') {
						const output = event.output as Record<string, unknown>;
						if (output?.ok && typeof output.action === 'string') {
							handleUiAction(output.action, output);
						}
					} else if (event.type === 'error') {
						errorText =
							typeof event.errorText === 'string'
								? event.errorText
								: 'An error occurred while processing your request.';
					}
				}
			}

			if (errorText) {
				setMessages((prev) => {
					const updated = [...prev];
					updated[updated.length - 1] = {
						role: 'assistant',
						content: errorText as string,
					};
					return updated;
				});
			} else if (!accumulatedText) {
				setMessages((prev) => {
					const updated = [...prev];
					updated[updated.length - 1] = {
						role: 'assistant',
						content:
							"The bot couldn't generate a reply. Please try again.",
					};
					return updated;
				});
			}
		} catch {
			setMessages((prev) => {
				const updated = [...prev];
				updated[updated.length - 1] = {
					role: 'assistant',
					content: 'Lost connection to the server. Please try again.',
				};
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
				document.documentElement.style.setProperty(
					'--primary',
					args.primary as string,
				);
				document.documentElement.style.setProperty(
					'--ring',
					args.ring as string,
				);
				dispatch({
					type: 'SET_ACCENT_COLOR',
					color: args.color as string,
				});
				break;
			case 'highlight_project': {
				const el = document.getElementById('projects-section');
				el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
				dispatch({
					type: 'SET_HIGHLIGHTED_PROJECT',
					projectId: args.projectId as string,
				});
				break;
			}
			case 'set_hero_description':
				dispatch({
					type: 'SET_HERO_DESCRIPTION',
					text: args.text as string,
				});
				break;
			case 'focus_skill':
				dispatch({
					type: 'SET_FOCUSED_SKILL',
					skillId: args.skillId as string,
				});
				break;
			case 'reset_ui':
				document.documentElement.style.removeProperty('--primary');
				document.documentElement.style.removeProperty('--ring');
				dispatch({ type: 'RESET' });
				break;
		}
	}

	return (
		<>
			<style>{`
				@keyframes chat-cube-spin {
					from { transform: rotateY(0deg); }
					to { transform: rotateY(360deg); }
				}
				.chat-cube { animation: chat-cube-spin 7s linear infinite; }
				@media (prefers-reduced-motion: reduce) {
					.chat-cube { animation: none; }
				}
			`}</style>
			<div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
				<AnimatePresence>
					{open && (
						<motion.div
							initial={{ opacity: 0, y: 16, scale: 0.96 }}
							animate={{ opacity: 1, y: 0, scale: 1 }}
							exit={{ opacity: 0, y: 16, scale: 0.96 }}
							transition={{ duration: 0.18 }}
							className="w-[min(560px,92vw)] h-[min(70vh,640px)] min-h-[480px] bg-card border border-border flex flex-col overflow-hidden shadow-2xl"
						>
							{/* Header */}
							<div className="flex items-center justify-between px-4 py-3 border-b border-border bg-card">
								<div className="flex items-center gap-2">
									<span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
									<span className="font-[family-name:var(--font-press-start)] text-[10px] text-primary tracking-wider">
										ASK ME
									</span>
								</div>
								<div className="flex items-center gap-3">
									<div className="relative group">
										<Info
											size={15}
											className="text-muted-foreground hover:text-foreground transition-colors cursor-help"
										/>
										<div className="absolute right-0 top-full mt-2 w-64 bg-popover border border-border p-3 text-[11px] leading-relaxed text-muted-foreground opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity z-10 shadow-xl">
											<p className="text-foreground font-semibold mb-1">
												⚠️ Demo showcase
											</p>
											<p className="mb-1.5">
												Demonstrates AG-UI, tool
												calling, and context engineering
												— not a production support bot.
											</p>
											<p className="mb-1.5">
												Model: Groq{' '}
												<code className="text-primary">
													openai/gpt-oss-120b
												</code>{' '}
												(free tier). Limited to ~100k
												tokens/day, may hit rate limits
												at any time.
											</p>
											<p>
												Conversation history isn&apos;t
												saved across page reloads.
											</p>
										</div>
									</div>
									<button
										onClick={() => setOpen(false)}
										className="text-muted-foreground hover:text-foreground transition-colors"
										aria-label="Close chat"
									>
										<X size={16} />
									</button>
								</div>
							</div>

							{/* Messages */}
							<div className="flex-1 overflow-y-auto px-3 py-3 space-y-3">
								{messages.length === 0 && (
									<div className="text-center text-muted-foreground text-xs mt-6 space-y-3">
										<p className="font-[family-name:var(--font-vt323)] text-3xl text-primary">
											👾 Hello!
										</p>
										<p>
											Ask me anything about Nguyễn Trung
											Nguyên and his projects.
										</p>
										<div className="flex flex-wrap justify-center gap-2 pt-2 px-2">
											{PROMPT_CHIPS.map((chip) => (
												<button
													key={chip.label}
													onClick={() =>
														sendMessage(chip.text)
													}
													className="px-3 py-1.5 text-[11px] border border-dotted border-border text-foreground hover:border-solid hover:border-primary hover:text-primary transition-colors"
												>
													{chip.label}
												</button>
											))}
										</div>
									</div>
								)}

								{messages.map((msg, i) => (
									<div
										key={i}
										className={cn(
											'flex',
											msg.role === 'user'
												? 'justify-end'
												: 'justify-start',
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
												<Markdown>
													{msg.content}
												</Markdown>
											) : (
												msg.content
											)}
										</div>
									</div>
								))}

								{isLoading &&
									messages[messages.length - 1]?.content ===
										'' && (
										<div className="flex justify-start">
											<div className="bg-muted px-3 py-2 flex gap-1 items-center">
												{[0, 1, 2].map((i) => (
													<motion.span
														key={i}
														className="w-1.5 h-1.5 rounded-full bg-primary"
														animate={{
															opacity: [
																0.3, 1, 0.3,
															],
														}}
														transition={{
															duration: 1,
															repeat: Infinity,
															delay: i * 0.2,
														}}
													/>
												))}
											</div>
										</div>
									)}

								<div ref={bottomRef} />
							</div>

							{/* Input */}
							<form
								onSubmit={(e) => {
									e.preventDefault();
									sendMessage(input.trim());
								}}
								className="border-t border-border flex items-center"
							>
								<input
									value={input}
									onChange={(e) => setInput(e.target.value)}
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

				{/* Trigger button — CSS-only rotating cube (no animation library) */}
				<button
					onClick={() => setOpen((v) => !v)}
					className="relative w-14 h-14 [perspective:400px]"
					aria-label={open ? 'Close AI chat' : 'Open AI chat'}
				>
					<div
						className={cn(
							'chat-cube absolute inset-0 [transform-style:preserve-3d]',
							open && '[animation-play-state:paused]',
						)}
					>
						<div className="absolute inset-0 flex items-center justify-center bg-primary text-primary-foreground border border-primary-foreground/20 shadow-lg [transform:translateZ(28px)]">
							<Bot size={22} />
						</div>
						<div className="absolute inset-0 bg-primary/85 border border-primary-foreground/20 [transform:rotateY(90deg)_translateZ(28px)]" />
						<div className="absolute inset-0 bg-primary/70 border border-primary-foreground/20 [transform:rotateY(180deg)_translateZ(28px)]" />
						<div className="absolute inset-0 bg-primary/85 border border-primary-foreground/20 [transform:rotateY(-90deg)_translateZ(28px)]" />
					</div>

					{/* Close overlay — plain opacity toggle off the existing `open` state */}
					<span
						className={cn(
							'absolute inset-0 flex items-center justify-center bg-foreground text-background transition-opacity duration-150 pointer-events-none',
							open ? 'opacity-100' : 'opacity-0',
						)}
					>
						<X size={20} />
					</span>

					{/* ponytail: pulse ring only when closed — no additional state needed */}
					{!open && (
						<span className="absolute inset-0 ring-2 ring-primary animate-ping opacity-30 pointer-events-none" />
					)}
				</button>
			</div>
		</>
	);
}
