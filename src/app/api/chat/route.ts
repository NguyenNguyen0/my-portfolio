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

    return result.toUIMessageStreamResponse();
  } catch (error) {
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
