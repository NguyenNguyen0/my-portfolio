'use client';

import Image from 'next/image';
import { motion, useReducedMotion, type Variants } from 'framer-motion';
import { useState } from 'react';

// ──────────────────────────────────────
// Data
// ──────────────────────────────────────

const CAT_COLORS = {
	ai:       '#F4B9B0',
	backend:  '#16A34A',
	devops:   '#888888',
	frontend: '#2A3FE5',
} as const;

type Category = keyof typeof CAT_COLORS;

interface ConstellationNode {
	id:    string;
	label: string;
	icon:  string | null;
	cat:   Category;
	x:     number; // 0–100 — maps directly to SVG viewBox %
	y:     number;
}

const NODES: ConstellationNode[] = [
	{ id: 'linux',     label: 'Linux',       icon: '/icons/linux.svg',                  cat: 'devops',   x: 18, y: 14 },
	{ id: 'mcp',       label: 'MCP',         icon: '/icons/mcp.svg',                     cat: 'ai',       x: 82, y: 10 },
	{ id: 'langgraph', label: 'LangGraph',   icon: '/icons/langgraph-color.svg',         cat: 'ai',       x: 88, y: 36 },
	{ id: 'gemini',    label: 'Gemini',      icon: '/icons/gemini-color.svg',            cat: 'ai',       x: 76, y: 65 },
	{ id: 'aws',       label: 'AWS',         icon: '/icons/AWS.svg',                     cat: 'devops',   x: 54, y: 84 },
	{ id: 'docker',    label: 'Docker',      icon: '/icons/Docker.svg',                  cat: 'devops',   x: 28, y: 82 },
	{ id: 'terraform', label: 'Terraform',   icon: '/icons/HashiCorp Terraform.svg',     cat: 'devops',   x: 10, y: 58 },
	{ id: 'kafka',     label: 'Kafka',       icon: '/icons/Apache Kafka.svg',            cat: 'backend',  x: 8,  y: 32 },
	{ id: 'spring',    label: 'Spring Boot', icon: '/icons/Spring.svg',                  cat: 'backend',  x: 24, y: 50 },
	{ id: 'fastapi',   label: 'FastAPI',     icon: '/icons/FastAPI-icon.svg',            cat: 'backend',  x: 36, y: 16 },
	{ id: 'react',     label: 'React',       icon: '/icons/react-icon.svg',              cat: 'frontend', x: 66, y: 16 },
	{ id: 'rag',       label: 'RAG',         icon: null,                                 cat: 'ai',       x: 64, y: 76 },
];

const CROSS: [string, string][] = [
	['kafka',     'spring'],
	['mcp',       'langgraph'],
	['langgraph', 'gemini'],
	['langgraph', 'rag'],
	['rag',       'fastapi'],
	['docker',    'aws'],
	['docker',    'terraform'],
	['react',     'fastapi'],
	['spring',    'fastapi'],
];

interface StackGroup {
	label: string;
	color: string;
	items: { name: string; icon: string | null }[];
}

const STACK: StackGroup[] = [
	{
		label: 'LANGUAGES',
		color: '#D97706',
		items: [
			{ name: 'Java',       icon: '/icons/Java.svg' },
			{ name: 'Python',     icon: '/icons/Python-icon.svg' },
			{ name: 'TypeScript', icon: '/icons/TypeScript.svg' },
		],
	},
	{
		label: 'FRONTEND',
		color: '#16A34A',
		items: [
			{ name: 'React',    icon: '/icons/react-icon.svg' },
			{ name: 'Next.js',  icon: '/icons/nextjs-icon.svg' },
			{ name: 'Expo',     icon: '/icons/logo-type-b.svg' },
			{ name: 'Tailwind', icon: '/icons/tailwind-icon.svg' },
		],
	},
	{
		label: 'BACKEND & DB',
		color: '#2A3FE5',
		items: [
			{ name: 'Spring Boot', icon: '/icons/Spring.svg' },
			{ name: 'FastAPI',     icon: '/icons/FastAPI-icon.svg' },
			{ name: 'NestJS',      icon: '/icons/Nest.js.svg' },
			{ name: 'Node.js',     icon: '/icons/nodejs-icon.svg' },
			{ name: 'Kafka',       icon: '/icons/Apache Kafka.svg' },
			{ name: 'PostgreSQL',  icon: '/icons/postgresql-icon.svg' },
			{ name: 'MongoDB',     icon: '/icons/MongoDB-icon.svg' },
			{ name: 'Redis',       icon: '/icons/Redis-icon.svg' },
			{ name: 'Qdrant',      icon: '/icons/qdrant-brandmark-red.svg' },
		],
	},
	{
		label: 'AI & DEVOPS',
		color: '#F4B9B0',
		items: [
			{ name: 'LangGraph',  icon: '/icons/langgraph-color.svg' },
			{ name: 'MCP',        icon: '/icons/mcp.svg' },
			{ name: 'RAG',        icon: null },
			{ name: 'Gemini API', icon: '/icons/gemini-color.svg' },
			{ name: 'Groq',       icon: '/icons/groq-text.svg' },
			{ name: 'Ollama',     icon: '/icons/ollama.svg' },
			{ name: 'Docker',     icon: '/icons/Docker.svg' },
			{ name: 'Terraform',  icon: '/icons/HashiCorp Terraform.svg' },
			{ name: 'Ansible',    icon: '/icons/Ansible.svg' },
			{ name: 'AWS',        icon: '/icons/AWS.svg' },
		],
	},
];

const META = [
	{ label: 'LOCATION',  value: 'Go Vap, Ho Chi Minh City' },
	{ label: 'EDUCATION', value: 'IUH — Software Eng. 2022–' },
	{ label: 'ENGLISH',   value: 'TOEIC 625' },
	{ label: 'SPECIALTY', value: 'Distributed Systems · AI' },
];

// ──────────────────────────────────────
// Shared variants
// ──────────────────────────────────────

const fadeUp: Variants = {
	hidden:  { opacity: 0, y: 20 },
	visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } },
};

// ──────────────────────────────────────
// S1 — Hero
// ──────────────────────────────────────

function HeroAvatar() {
	const shouldReduce = useReducedMotion();
	return (
		/* Column: compact width on desktop, full width on mobile. Vertically centered. */
		<div className="flex-shrink-0 w-full sm:w-auto sm:ml-12 sm:mr-12 flex flex-col items-center justify-center gap-4 py-10 sm:py-12 border-b sm:border-b-0 sm:border-r border-dotted border-border">
			{/* Ring wrapper — rings + avatar share same center */}
			<div className="relative flex items-center justify-center w-48 h-48">
				{/* Outer pulse ring */}
				<motion.div
					className="absolute w-64 h-64 rounded-full border-2 border-dashed border-primary pointer-events-none"
					animate={shouldReduce ? {} : { scale: [1, 1.12, 1], opacity: [0.25, 0.06, 0.25] }}
					transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
					aria-hidden="true"
				/>
				{/* Inner pulse ring */}
				<motion.div
					className="absolute w-56 h-56 rounded-full border border-dashed border-primary pointer-events-none"
					animate={shouldReduce ? {} : { scale: [1, 1.08, 1], opacity: [0.45, 0.12, 0.45] }}
					transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut', delay: 0.6 }}
					aria-hidden="true"
				/>
				{/* Avatar circle — 192px */}
				<div className="relative w-48 h-48 rounded-full border-2 border-primary overflow-hidden z-10 flex-shrink-0">
					<Image
						src="/avatar.jpg"
						alt="Nguyễn Trung Nguyên"
						fill
						className="object-cover object-top"
						sizes="192px"
						priority
					/>
				</div>
			</div>
			{/* Tag */}
			<span className="font-pixel text-[8px] bg-primary text-primary-foreground px-3 py-1 tracking-widest whitespace-nowrap z-10">
				PLAYER 1
			</span>
		</div>
	);
}

function HeroInfo() {
	return (
		<div className="flex-1 min-w-0 p-6 sm:p-8">
			<h2 className="font-pixel text-[12px] text-foreground mb-2 leading-relaxed">
				Nguyễn Trung Nguyên
			</h2>
			<p className="font-pixel text-[7px] text-primary mb-5 tracking-widest leading-relaxed">
				FULL-STACK DEVELOPER · AI INTEGRATION · IUH 2022–
			</p>
			{/* Bio — left blue border */}
			<div className="border-l-2 border-secondary pl-4 mb-5">
				<p className="font-mono-custom text-sm text-muted-foreground leading-relaxed">
					Full-Stack Developer specializing in distributed systems, AI-powered applications,
					and cloud-native deployments. Builds end-to-end — microservices to LLM agents,
					Kafka pipelines to React interfaces — and ships to production on AWS.
				</p>
			</div>
			{/* 2×2 meta grid */}
			<div className="grid grid-cols-2 gap-2">
				{META.map((m) => (
					<div key={m.label} className="border border-dotted border-border p-3 bg-[#080808]">
						<p className="font-pixel text-[7px] text-muted-foreground mb-1 tracking-widest">
							{m.label}
						</p>
						<p className="font-mono-custom text-xs text-foreground leading-snug">
							{m.value}
						</p>
					</div>
				))}
			</div>
		</div>
	);
}

// ──────────────────────────────────────
// S2 — Constellation
// ──────────────────────────────────────

function TechNode({
	node,
	hovered,
	onHover,
}: {
	node:    ConstellationNode;
	hovered: string | null;
	onHover: (id: string | null) => void;
}) {
	const isHovered = hovered === node.id;
	const isDimmed  = hovered !== null && !isHovered;
	const color     = CAT_COLORS[node.cat];

	return (
		<div
			className="absolute flex flex-col items-center gap-1 -translate-x-1/2 -translate-y-1/2 cursor-pointer z-10"
			style={{ left: `${node.x}%`, top: `${node.y}%` }}
			onMouseEnter={() => onHover(node.id)}
			onMouseLeave={() => onHover(null)}
			aria-label={node.label}
		>
			<motion.div
				animate={{ scale: isHovered ? 1.2 : 1, opacity: isDimmed ? 0.35 : 1 }}
				transition={{ duration: 0.18 }}
				className="w-10 h-10 border bg-[#080808] flex items-center justify-center"
				style={{ borderColor: color }}
			>
				{node.icon ? (
					<div className="w-7 h-7 bg-white flex items-center justify-center p-[3px]">
						<Image src={node.icon} alt={node.label} width={22} height={22} className="object-contain w-full h-full" />
					</div>
				) : (
					<span className="font-pixel text-[6px] leading-tight text-center" style={{ color }}>
						{node.label.slice(0, 3).toUpperCase()}
					</span>
				)}
			</motion.div>
			<motion.span
				animate={{ opacity: isDimmed ? 0.25 : 1 }}
				transition={{ duration: 0.18 }}
				className="font-pixel text-[6px] whitespace-nowrap"
				style={{ color }}
			>
				{node.label}
			</motion.span>
		</div>
	);
}

function Constellation() {
	const [hovered, setHovered]    = useState<string | null>(null);
	const shouldReduce             = useReducedMotion();
	const CENTER                   = { x: 50, y: 50 };

	const centerOpacity = (id: string) => {
		if (hovered === null) return 0.2;
		return hovered === id ? 0.8 : 0.08;
	};

	const crossOpacity = (a: string, b: string) => {
		if (hovered === null) return 0.12;
		return hovered === a || hovered === b ? 0.6 : 0.04;
	};

	return (
		<div
			className="relative w-full overflow-hidden"
			style={{ height: '440px', background: '#030305' }}
			aria-label="Interactive skill constellation"
		>
			{/* Dot-grid texture */}
			<div
				className="absolute inset-0 pointer-events-none"
				aria-hidden="true"
				style={{
					backgroundImage: 'radial-gradient(circle, oklch(60% 0 0 / 0.07) 1px, transparent 1px)',
					backgroundSize: '24px 24px',
				}}
			/>

			{/* SVG lines — viewBox 0 0 100 100 = direct % mapping */}
			<svg
				className="absolute inset-0 w-full h-full pointer-events-none"
				viewBox="0 0 100 100"
				preserveAspectRatio="none"
				aria-hidden="true"
			>
				{/* Center → node */}
				{NODES.map((n) => (
					<line
						key={`c-${n.id}`}
						x1={CENTER.x} y1={CENTER.y}
						x2={n.x}      y2={n.y}
						stroke={CAT_COLORS[n.cat]}
						strokeWidth="0.3"
						strokeDasharray="1.5 1.5"
						strokeOpacity={centerOpacity(n.id)}
						style={{ transition: 'stroke-opacity 0.22s ease' }}
					/>
				))}
				{/* Cross-connections */}
				{CROSS.map(([a, b]) => {
					const na = NODES.find((n) => n.id === a)!;
					const nb = NODES.find((n) => n.id === b)!;
					return (
						<line
							key={`x-${a}-${b}`}
							x1={na.x} y1={na.y}
							x2={nb.x} y2={nb.y}
							stroke="#ffffff"
							strokeWidth="0.18"
							strokeDasharray="1 2"
							strokeOpacity={crossOpacity(a, b)}
							style={{ transition: 'stroke-opacity 0.22s ease' }}
						/>
					);
				})}
			</svg>

			{/* Tech nodes */}
			{NODES.map((n) => (
				<TechNode key={n.id} node={n} hovered={hovered} onHover={setHovered} />
			))}

			{/* Center node */}
			<div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
				<motion.div
					animate={shouldReduce ? {} : { y: [0, -7, 0] }}
					transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
					className="relative flex items-center justify-center"
				>
					{/* Glow ring */}
					<motion.div
						animate={shouldReduce ? {} : { scale: [1, 1.5, 1], opacity: [0.45, 0, 0.45] }}
						transition={{ duration: 2.5, repeat: Infinity }}
						className="absolute w-14 h-14 rounded-full border border-primary"
						aria-hidden="true"
					/>
					<div className="w-14 h-14 rounded-full border-2 border-primary overflow-hidden bg-white flex-shrink-0">
						<Image
							src="/dev-icon.png"
							alt="NTN center node"
							width={56}
							height={56}
							className="w-full h-full object-cover"
						/>
					</div>
				</motion.div>
			</div>

			{/* Legend */}
			<div className="absolute bottom-3 right-3 flex flex-col gap-1" aria-hidden="true">
				{(Object.entries(CAT_COLORS) as [Category, string][]).map(([cat, color]) => (
					<div key={cat} className="flex items-center gap-1.5">
						<div className="w-2 h-2" style={{ background: color }} />
						<span className="font-pixel text-[6px] uppercase" style={{ color }}>
							{cat}
						</span>
					</div>
				))}
			</div>
		</div>
	);
}

// ──────────────────────────────────────
// S3 — Tech Stack Inventory
// ──────────────────────────────────────

function GemItem({ name, icon, color }: { name: string; icon: string | null; color: string }) {
	const [hovered, setHovered] = useState(false);
	return (
		<div
			className="relative"
			onMouseEnter={() => setHovered(true)}
			onMouseLeave={() => setHovered(false)}
		>
			<motion.div
				whileHover={{ scale: 1.18 }}
				transition={{ duration: 0.14 }}
				className="w-9 h-9 border bg-[#080808] flex items-center justify-center cursor-pointer"
				style={{ borderColor: hovered ? color : '#2a2a2a' }}
			>
				{icon ? (
					<div className="w-[26px] h-[26px] bg-white flex items-center justify-center p-[3px]">
						<Image src={icon} alt={name} width={20} height={20} className="object-contain w-full h-full" />
					</div>
				) : (
					<span className="font-pixel text-[6px] leading-tight text-center" style={{ color }}>
						{name.slice(0, 3).toUpperCase()}
					</span>
				)}
			</motion.div>
			{hovered && (
				<div
					className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 px-2 py-1 bg-[#111] border whitespace-nowrap z-30 pointer-events-none"
					style={{ borderColor: color }}
				>
					<span className="font-pixel text-[7px]" style={{ color }}>{name}</span>
				</div>
			)}
		</div>
	);
}

function TechStackGrid() {
	return (
		<div className="grid grid-cols-2 md:grid-cols-4 border border-dotted border-border">
			{STACK.map((group, gi) => (
				<div
					key={group.label}
					className={`p-5 ${gi % 2 === 0 ? 'border-r border-dotted border-border md:border-r' : 'md:border-r border-dotted border-border'} ${gi < 2 ? 'border-b border-dotted border-border md:border-b-0' : ''}`}
				>
					<p className="font-pixel text-[8px] mb-3 tracking-widest" style={{ color: group.color }}>
						{group.label}
					</p>
					<div
						className="border-t border-dashed mb-4"
						style={{ borderColor: group.color + '55' }}
					/>
					<div className="flex flex-wrap gap-2">
						{group.items.map((item) => (
							<GemItem key={item.name} name={item.name} icon={item.icon} color={group.color} />
						))}
					</div>
				</div>
			))}
		</div>
	);
}

// ──────────────────────────────────────
// Main export
// ──────────────────────────────────────

export const AboutSection = () => {
	const shouldReduce = useReducedMotion();

	return (
		<section className="py-16 sm:py-24 px-4 max-w-7xl mx-auto" id="about">
			{/* Header */}
			<motion.div
				variants={fadeUp}
				initial={shouldReduce ? false : 'hidden'}
				whileInView="visible"
				viewport={{ once: true }}
				className="mb-12"
			>
				<p className="font-pixel text-[10px] text-primary mb-3 tracking-widest">ABOUT</p>
				<h2 className="font-pixel text-xl sm:text-2xl md:text-3xl text-foreground leading-relaxed">
					PLAYER PROFILE
				</h2>
			</motion.div>

			{/* S1: Hero card */}
			<motion.div
				variants={fadeUp}
				initial={shouldReduce ? false : 'hidden'}
				whileInView="visible"
				viewport={{ once: true }}
				className="flex flex-col sm:flex-row gap-10 sm:gap-0 items-center mb-16 border border-dotted border-border bg-[#030303] overflow-hidden"
			>
				<HeroAvatar />
				<HeroInfo />
			</motion.div>

			{/* S2: Constellation */}
			<motion.div
				variants={fadeUp}
				initial={shouldReduce ? false : 'hidden'}
				whileInView="visible"
				viewport={{ once: true }}
				className="mb-2"
			>
				<p className="font-pixel text-[10px] text-muted-foreground mb-4 tracking-widest">
					SKILL CONSTELLATION
				</p>
			</motion.div>
			<motion.div
				variants={fadeUp}
				initial={shouldReduce ? false : 'hidden'}
				whileInView="visible"
				viewport={{ once: true }}
				className="mb-16 border border-dotted border-border overflow-hidden"
			>
				<Constellation />
			</motion.div>

			{/* S3: Inventory */}
			<motion.div
				variants={fadeUp}
				initial={shouldReduce ? false : 'hidden'}
				whileInView="visible"
				viewport={{ once: true }}
				className="mb-4"
			>
				<p className="font-pixel text-[10px] text-muted-foreground mb-4 tracking-widest">
					INVENTORY
				</p>
			</motion.div>
			<motion.div
				variants={fadeUp}
				initial={shouldReduce ? false : 'hidden'}
				whileInView="visible"
				viewport={{ once: true }}
			>
				<TechStackGrid />
			</motion.div>
		</section>
	);
};
