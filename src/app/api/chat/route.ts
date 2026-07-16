import { streamText, stepCountIs } from 'ai';
import { NextRequest, NextResponse } from 'next/server';
import { chatModel } from '@/lib/chat/model';
import { buildSystemPrompt } from '@/lib/chat/system-prompt';
import { chatTools } from '@/lib/chat/tools';
import { isRateLimited } from '@/lib/chat/rate-limit';

export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
	const ip =
		req.headers.get('x-forwarded-for')?.split(',')[0].trim() ?? 'unknown';
	if (isRateLimited(ip)) {
		return NextResponse.json(
			{ error: 'Too many requests. Please try again in a minute.' },
			{ status: 429 },
		);
	}

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
				const message =
					error instanceof Error ? error.message : String(error);
				if (
					message.includes('Rate limit') ||
					message.includes('rate_limit')
				) {
					return 'The bot is overloaded right now (Groq quota exhausted). Please try again in a few minutes.';
				}
				return 'Something went wrong while processing your request. Please try again.';
			},
		});
	} catch (error) {
		console.error('[chat] route error:', error);
		if (error instanceof SyntaxError) {
			return NextResponse.json(
				{ error: 'Invalid request body' },
				{ status: 400 },
			);
		}

		return NextResponse.json(
			{ error: 'Internal server error' },
			{ status: 500 },
		);
	}
}
