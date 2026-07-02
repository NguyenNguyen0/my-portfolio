import { createGroq } from '@ai-sdk/groq';

const groq = createGroq({ apiKey: process.env.GROQ_API_KEY });

export const chatModel = groq('openai/gpt-oss-120b');
