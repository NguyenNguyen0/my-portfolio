export interface TechIconEntry {
	/** Icon shown in light theme (and dark theme too, if darkSrc is absent). */
	lightSrc?: string;
	/** Icon shown in dark theme, when it differs from lightSrc. */
	darkSrc?: string;
	/** Apply a dark-mode invert filter — for single-variant monochrome-black SVGs with no theme-aware pair. */
	invert?: boolean;
}

// Canonical tech id -> icon source. The theme-paired icons under
// public/icons/stack/ were extracted once from the tech-stack-icons package
// (scripts/extract-tech-icons.mjs) — importing that package at runtime would
// ship its entire ~8.7MB icon dataset to the client, so only the ~30 SVGs we
// actually use are kept as static files. A few techs it doesn't cover
// (fastapi, mcp, kafka, qdrant, ansible) fall back to the older local
// /icons/*.svg files; the monochrome-black ones among those (mcp, kafka,
// ansible) set invert so they don't disappear on dark backgrounds.
export const techIconMap: Record<string, TechIconEntry> = {
	html: { lightSrc: '/icons/stack/html-light.svg', darkSrc: '/icons/stack/html-dark.svg' },
	css: { lightSrc: '/icons/stack/css-light.svg', darkSrc: '/icons/stack/css-dark.svg' },
	javascript: { lightSrc: '/icons/stack/javascript-light.svg', darkSrc: '/icons/stack/javascript-dark.svg' },
	typescript: { lightSrc: '/icons/stack/typescript-light.svg', darkSrc: '/icons/stack/typescript-dark.svg' },
	java: { lightSrc: '/icons/stack/java-light.svg', darkSrc: '/icons/stack/java-dark.svg' },
	python: { lightSrc: '/icons/stack/python-light.svg', darkSrc: '/icons/stack/python-dark.svg' },
	go: { lightSrc: '/icons/stack/go-light.svg', darkSrc: '/icons/stack/go-dark.svg' },
	react: { lightSrc: '/icons/stack/react-light.svg', darkSrc: '/icons/stack/react-dark.svg' },
	redux: { lightSrc: '/icons/stack/redux-light.svg', darkSrc: '/icons/stack/redux-dark.svg' },
	nextjs: { lightSrc: '/icons/stack/nextjs-light.svg', darkSrc: '/icons/stack/nextjs-dark.svg' },
	tailwindcss: { lightSrc: '/icons/stack/tailwindcss-light.svg', darkSrc: '/icons/stack/tailwindcss-dark.svg' },
	nodejs: { lightSrc: '/icons/stack/nodejs-light.svg', darkSrc: '/icons/stack/nodejs-dark.svg' },
	express: { lightSrc: '/icons/stack/express-light.svg', darkSrc: '/icons/stack/express-dark.svg' },
	fastapi: { lightSrc: '/icons/FastAPI-icon.svg' },
	flask: { lightSrc: '/icons/stack/flask-light.svg', darkSrc: '/icons/stack/flask-dark.svg' },
	mongodb: { lightSrc: '/icons/stack/mongodb-light.svg', darkSrc: '/icons/stack/mongodb-dark.svg' },
	postgresql: { lightSrc: '/icons/stack/postgresql-light.svg', darkSrc: '/icons/stack/postgresql-dark.svg' },
	redis: { lightSrc: '/icons/stack/redis-light.svg', darkSrc: '/icons/stack/redis-dark.svg' },
	git: { lightSrc: '/icons/stack/git-light.svg', darkSrc: '/icons/stack/git-dark.svg' },
	docker: { lightSrc: '/icons/stack/docker-light.svg', darkSrc: '/icons/stack/docker-dark.svg' },
	postman: { lightSrc: '/icons/stack/postman-light.svg', darkSrc: '/icons/stack/postman-dark.svg' },
	vercel: { lightSrc: '/icons/stack/vercel-light.svg', darkSrc: '/icons/stack/vercel-dark.svg' },
	linux: { lightSrc: '/icons/stack/linux-light.svg', darkSrc: '/icons/stack/linux-dark.svg' },
	mcp: { lightSrc: '/icons/mcp.svg', invert: true },
	langgraph: { lightSrc: '/icons/stack/langgraph-light.svg', darkSrc: '/icons/stack/langgraph-dark.svg' },
	gemini: { lightSrc: '/icons/stack/gemini-light.svg', darkSrc: '/icons/stack/gemini-dark.svg' },
	aws: { lightSrc: '/icons/stack/aws-light.svg', darkSrc: '/icons/stack/aws-dark.svg' },
	terraform: { lightSrc: '/icons/stack/terraform-light.svg', darkSrc: '/icons/stack/terraform-dark.svg' },
	kafka: { lightSrc: '/icons/Apache Kafka.svg', invert: true },
	spring: { lightSrc: '/icons/stack/spring-light.svg', darkSrc: '/icons/stack/spring-dark.svg' },
	expo: { lightSrc: '/icons/stack/expo-light.svg', darkSrc: '/icons/stack/expo-dark.svg' },
	nestjs: { lightSrc: '/icons/stack/nestjs-light.svg', darkSrc: '/icons/stack/nestjs-dark.svg' },
	qdrant: { lightSrc: '/icons/qdrant-brandmark-red.svg' },
	groq: { lightSrc: '/icons/stack/groq-light.svg', darkSrc: '/icons/stack/groq-dark.svg' },
	ollama: { lightSrc: '/icons/stack/ollama-light.svg', darkSrc: '/icons/stack/ollama-dark.svg' },
	ansible: { lightSrc: '/icons/Ansible.svg', invert: true },
	rag: {},
};
