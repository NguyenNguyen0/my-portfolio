'use client';

import dynamic from 'next/dynamic';

// Floating overlay with no SEO content and its own client-only state —
// deferring it out of the initial route bundle cuts First Load JS without
// affecting what's rendered on first paint (dynamic() + ssr:false needs a
// client boundary, hence this tiny wrapper around the server-rendered layout).
export const ChatWidget = dynamic(
	() => import('./chat-widget').then((mod) => mod.ChatWidget),
	{ ssr: false },
);
