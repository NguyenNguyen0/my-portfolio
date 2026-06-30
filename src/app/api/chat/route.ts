import { streamText, stepCountIs } from 'ai';
import { NextRequest, NextResponse } from 'next/server';
import { chatModel } from '@/lib/chat/model';
import { buildSystemPrompt } from '@/lib/chat/system-prompt';
import { chatTools } from '@/lib/chat/tools';

export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    const result = streamText({
      model: chatModel,
      system: buildSystemPrompt(),
      messages,
      tools: chatTools,
      stopWhen: stepCountIs(3),
      temperature: 0.4,
    });

    return result.toUIMessageStreamResponse({
      onError: (error) => {
        console.error('[chat] stream error:', error);
        const message = error instanceof Error ? error.message : String(error);
        if (message.includes('Rate limit') || message.includes('rate_limit')) {
          return 'Bot đang quá tải (hết hạn mức Groq). Vui lòng thử lại sau ít phút.';
        }
        return 'Đã có lỗi xảy ra khi xử lý yêu cầu. Vui lòng thử lại.';
      },
    });
  } catch (error) {
    console.error('[chat] route error:', error);
    if (error instanceof SyntaxError) {
      return NextResponse.json(
        { error: 'Invalid request body' },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
