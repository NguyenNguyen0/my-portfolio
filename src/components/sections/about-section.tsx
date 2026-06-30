'use client';

import Image from 'next/image';
import { motion, AnimatePresence, useReducedMotion, type Variants } from 'framer-motion';
import { useState, useEffect } from 'react';
import { usePortfolioActions } from '@/context/portfolio-actions';

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
	x:     number;
	y:     number;
}

const NODES: ConstellationNode[] = [
	{ id: 'linux',     label: 'Linux',       icon: '/icons/linux.svg',                  cat: 'devops',   x: 18, y: 14 },
	{ id: 'mcp',       label: 'MCP',         icon: '/icons/mcp.svg',                    cat: 'ai',       x: 82, y: 10 },
	{ id: 'langgraph', label: 'LangGraph',   icon: '/icons/langgraph-color.svg',        cat: 'ai',       x: 88, y: 36 },
	{ id: 'gemini',    label: 'Gemini',      icon: '/icons/gemini-color.svg',           cat: 'ai',       x: 76, y: 65 },
	{ id: 'aws',       label: 'AWS',         icon: '/icons/AWS.svg',                    cat: 'devops',   x: 54, y: 84 },
	{ id: 'docker',    label: 'Docker',      icon: '/icons/Docker.svg',                 cat: 'devops',   x: 28, y: 82 },
	{ id: 'terraform', label: 'Terraform',   icon: '/icons/HashiCorp Terraform.svg',    cat: 'devops',   x: 10, y: 58 },
	{ id: 'kafka',     label: 'Kafka',       icon: '/icons/Apache Kafka.svg',           cat: 'backend',  x: 8,  y: 32 },
	{ id: 'spring',    label: 'Spring Boot', icon: '/icons/Spring.svg',                 cat: 'backend',  x: 24, y: 50 },
	{ id: 'fastapi',   label: 'FastAPI',     icon: '/icons/FastAPI-icon.svg',           cat: 'backend',  x: 36, y: 16 },
	{ id: 'react',     label: 'React',       icon: '/icons/react-icon.svg',             cat: 'frontend', x: 66, y: 16 },
	{ id: 'rag',       label: 'RAG',         icon: null,                                cat: 'ai',       x: 64, y: 76 },
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
	cats:  Category[];
	items: { name: string; icon: string | null }[];
}

const STACK: StackGroup[] = [
	{
		label: 'LANGUAGES',
		color: '#D97706',
		cats:  [],
		items: [
			{ name: 'Java',       icon: '/icons/Java.svg' },
			{ name: 'Python',     icon: '/icons/Python-icon.svg' },
			{ name: 'TypeScript', icon: '/icons/TypeScript.svg' },
		],
	},
	{
		label: 'FRONTEND',
		color: '#16A34A',
		cats:  ['frontend'],
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
		cats:  ['backend'],
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
		cats:  ['ai', 'devops'],
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
// Category filter bar
// ──────────────────────────────────────

function CategoryFilter({
	active,
	onToggle,
	onReset,
}: {
	active:   Set<Category>;
	onToggle: (cat: Category) => void;
	onReset:  () => void;
}) {
	return (
		<div className="flex flex-wrap gap-2 mb-6">
			{(Object.entries(CAT_COLORS) as [Category, string][]).map(([cat, color]) => {
				const on = active.has(cat);
				return (
					<button
						key={cat}
						onClick={() => onToggle(cat)}
						className="font-pixel text-[8px] px-3 py-1.5 border tracking-widest transition-all duration-200"
						style={{
							borderColor: on ? color : 'var(--border)',
							color:       on ? color : 'var(--muted-foreground)',
							background:  on ? `${color}18` : 'transparent',
						}}
					>
						{on ? '■' : '□'} {cat.toUpperCase()}
					</button>
				);
			})}
			<button
				onClick={onReset}
				className="font-pixel text-[8px] px-3 py-1.5 border border-dotted border-muted-foreground/40 text-muted-foreground/60 tracking-widest hover:border-primary hover:text-primary transition-all duration-200"
			>
				■ ALL
			</button>
		</div>
	);
}

// ──────────────────────────────────────
// S1 — Hero
// ──────────────────────────────────────

function HeroAvatar() {
	const shouldReduce = useReducedMotion();
	return (
		<div className="flex-shrink-0 w-full sm:w-auto sm:ml-12 sm:mr-12 flex flex-col items-center justify-center gap-4 py-10 sm:py-12 border-b sm:border-b-0 sm:border-r border-dotted border-border">
			<div className="relative flex items-center justify-center w-48 h-48">
				<motion.div
					className="absolute w-64 h-64 rounded-full border-2 border-dashed border-primary pointer-events-none"
					animate={shouldReduce ? {} : { scale: [1, 1.12, 1], opacity: [0.25, 0.06, 0.25] }}
					transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
					aria-hidden="true"
				/>
				<motion.div
					className="absolute w-56 h-56 rounded-full border border-dashed border-primary pointer-events-none"
					animate={shouldReduce ? {} : { scale: [1, 1.08, 1], opacity: [0.45, 0.12, 0.45] }}
					transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut', delay: 0.6 }}
					aria-hidden="true"
				/>
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
			<div className="border-l-2 border-secondary pl-4 mb-5">
				<p className="font-mono-custom text-sm text-muted-foreground leading-relaxed">
					Full-Stack Developer specializing in distributed systems, AI-powered applications,
					and cloud-native deployments. Builds end-to-end — microservices to LLM agents,
					Kafka pipelines to React interfaces — and ships to production on AWS.
				</p>
			</div>
			<div className="grid grid-cols-2 gap-2">
				{META.map((m) => (
					<div key={m.label} className="border border-dotted border-border p-3 bg-muted">
						<p className="font-pixel text-[7px] text-muted-foreground mb-1 tracking-widest">{m.label}</p>
						<p className="font-mono-custom text-xs text-foreground leading-snug">{m.value}</p>
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
	shouldReduce,
	focusedSkill,
}: {
	node:         ConstellationNode;
	hovered:      string | null;
	onHover:      (id: string | null) => void;
	shouldReduce: boolean;
	focusedSkill: string | null;
}) {
	const isHovered = hovered === node.id;
	const isFocused = focusedSkill === node.id;
	const isDimmed  = hovered !== null && !isHovered && !isFocused;
	const color     = CAT_COLORS[node.cat];
	// Deterministic float params from position (no Math.random → no SSR mismatch)
	const floatDur  = 2.2 + (node.x % 10) * 0.18;
	const floatDel  = (node.y * 0.05) % 2.5;

	return (
		<motion.div
			className="absolute flex flex-col items-center -translate-x-1/2 -translate-y-1/2 cursor-pointer z-10"
			style={{ left: `${node.x}%`, top: `${node.y}%` }}
			initial={{ opacity: 0, scale: 0.5 }}
			animate={{ opacity: isDimmed ? 0.28 : 1, scale: 1 }}
			exit={{ opacity: 0, scale: 0.4 }}
			transition={{ duration: 0.22 }}
			onMouseEnter={() => onHover(node.id)}
			onMouseLeave={() => onHover(null)}
		>
			{/* Float + hover-stop wrapper */}
			<motion.div
				animate={shouldReduce ? {} : { y: [0, -7, 0] }}
				transition={shouldReduce ? {} : { duration: floatDur, repeat: Infinity, ease: 'easeInOut', delay: floatDel }}
				whileHover={shouldReduce ? {} : { y: 0 }}
				className="flex flex-col items-center gap-1"
			>
				<motion.div
					animate={isFocused && !shouldReduce
						? { scale: [1, 1.3, 1, 1.3, 1], filter: [`drop-shadow(0 0 8px ${color})`, `drop-shadow(0 0 18px ${color})`, `drop-shadow(0 0 8px ${color})`, `drop-shadow(0 0 18px ${color})`, `drop-shadow(0 0 8px ${color})`] }
						: { scale: isHovered ? 1.22 : 1, filter: 'none' }
					}
					transition={isFocused ? { duration: 1.2, ease: 'easeInOut' } : { duration: 0.16 }}
					className="w-10 h-10 border p-1.5 flex items-center justify-center"
					style={{
						borderColor:    color,
						background:     'color-mix(in oklch, var(--foreground) 8%, transparent)',
						backdropFilter: 'blur(6px)',
						boxShadow:      isHovered || isFocused ? `0 0 12px ${color}66` : 'none',
					}}
				>
					{node.icon ? (
						<Image src={node.icon} alt={node.label} width={24} height={24} className="object-contain w-full h-full" />
					) : (
						<span className="font-pixel text-[6px] leading-tight text-center" style={{ color }}>
							{node.label.slice(0, 3).toUpperCase()}
						</span>
					)}
				</motion.div>
				<span className="font-pixel text-[6px] whitespace-nowrap" style={{ color, opacity: isDimmed ? 0.25 : 1, transition: 'opacity 0.2s' }}>
					{node.label}
				</span>
			</motion.div>
		</motion.div>
	);
}

function Constellation({ activeCategories, focusedSkill }: { activeCategories: Set<Category>; focusedSkill: string | null }) {
	const [hovered, setHovered] = useState<string | null>(null);
	const shouldReduce          = useReducedMotion() ?? false;
	const CENTER                = { x: 50, y: 50 };

	const visibleNodes = NODES.filter(n => activeCategories.has(n.cat));
	const visibleIds   = new Set(visibleNodes.map(n => n.id));

	const centerOpacity = (id: string) => {
		if (!visibleIds.has(id)) return 0;
		if (hovered === null) return 0.2;
		return hovered === id ? 0.8 : 0.06;
	};

	const crossOpacity = (a: string, b: string) => {
		if (!visibleIds.has(a) || !visibleIds.has(b)) return 0;
		if (hovered === null) return 0.12;
		return hovered === a || hovered === b ? 0.6 : 0.03;
	};

	return (
		<div
			className="relative w-full min-h-screen overflow-hidden bg-card"
			aria-label="Interactive skill constellation"
		>
			{/* Dot-grid texture */}
			<div
				className="absolute inset-0 pointer-events-none"
				aria-hidden="true"
				style={{
					backgroundImage: 'radial-gradient(circle, oklch(60% 0 0 / 0.09) 1px, transparent 1px)',
					backgroundSize:  '24px 24px',
				}}
			/>

			{/* SVG lines — always rendered, opacity-transitioned for smooth category filter */}
			<svg
				className="absolute inset-0 w-full h-full pointer-events-none"
				viewBox="0 0 100 100"
				preserveAspectRatio="none"
				aria-hidden="true"
			>
				{NODES.map((n) => (
					<line
						key={`c-${n.id}`}
						x1={CENTER.x} y1={CENTER.y}
						x2={n.x}      y2={n.y}
						stroke={CAT_COLORS[n.cat]}
						strokeWidth="0.3"
						strokeDasharray="1.5 1.5"
						strokeOpacity={centerOpacity(n.id)}
						style={{ transition: 'stroke-opacity 0.3s ease' }}
					/>
				))}
				{CROSS.map(([a, b]) => {
					const na = NODES.find((n) => n.id === a)!;
					const nb = NODES.find((n) => n.id === b)!;
					return (
						<line
							key={`x-${a}-${b}`}
							x1={na.x} y1={na.y}
							x2={nb.x} y2={nb.y}
							stroke="var(--foreground)"
							strokeWidth="0.18"
							strokeDasharray="1 2"
							strokeOpacity={crossOpacity(a, b)}
							style={{ transition: 'stroke-opacity 0.3s ease' }}
						/>
					);
				})}
			</svg>

			{/* Tech nodes with AnimatePresence */}
			<AnimatePresence>
				{visibleNodes.map((n) => (
					<TechNode
						key={n.id}
						node={n}
						hovered={hovered}
						onHover={setHovered}
						shouldReduce={shouldReduce}
						focusedSkill={focusedSkill}
					/>
				))}
			</AnimatePresence>

			{/* Center — GIF character */}
			<div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
				<motion.div
					animate={shouldReduce ? {} : { y: [0, -7, 0] }}
					transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
					className="relative flex items-center justify-center"
				>
					<div
						className="relative h-40 w-40 border-2 border-primary overflow-hidden flex-shrink-0"
						style={{ background: 'linear-gradient(180deg, color-mix(in oklch, var(--foreground) 10%, var(--card)) 0%, var(--card) 100%)' }}
					>
						<Image
							src="/cool_software_engineer_rotations_8dir.gif"
							alt="Developer character"
							fill
							sizes="160px"
							className="object-contain object-bottom"
							unoptimized
						/>
					</div>
				</motion.div>
			</div>

			{/* Legend — dims when category inactive */}
			<div className="absolute bottom-3 right-3 flex flex-col gap-1" aria-hidden="true">
				{(Object.entries(CAT_COLORS) as [Category, string][]).map(([cat, color]) => {
					const on = activeCategories.has(cat);
					return (
						<div key={cat} className="flex items-center gap-1.5" style={{ opacity: on ? 1 : 0.3, transition: 'opacity 0.3s' }}>
							<div className="w-2 h-2" style={{ background: color }} />
							<span className="font-pixel text-[6px] uppercase" style={{ color }}>{cat}</span>
						</div>
					);
				})}
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
				className="w-9 h-9 border p-1.5 flex items-center justify-center cursor-pointer"
				style={{
					borderColor:    hovered ? color : 'var(--border)',
					background:     'color-mix(in oklch, var(--foreground) 7%, transparent)',
					backdropFilter: 'blur(4px)',
					boxShadow:      hovered ? `0 0 10px ${color}44` : 'none',
					transition:     'border-color 0.15s, box-shadow 0.15s',
				}}
			>
				{icon ? (
					<Image src={icon} alt={name} width={22} height={22} className="object-contain w-full h-full" />
				) : (
					<span className="font-pixel text-[6px] leading-tight text-center" style={{ color }}>
						{name.slice(0, 3).toUpperCase()}
					</span>
				)}
			</motion.div>
			{hovered && (
				<div
					className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 px-2 py-1 whitespace-nowrap z-30 pointer-events-none"
					style={{ background: 'var(--popover)', border: `1px solid ${color}` }}
				>
					<span className="font-pixel text-[7px]" style={{ color }}>{name}</span>
				</div>
			)}
		</div>
	);
}

function TechStackGrid({ activeCategories }: { activeCategories: Set<Category> }) {
	const visibleGroups = STACK.filter(
		(g) => g.cats.length === 0 || g.cats.some((c) => activeCategories.has(c))
	);

	return (
		<div
			className="border border-dotted border-border overflow-hidden bg-muted/50"
		>
			<div className="grid grid-cols-2 md:grid-cols-4">
				<AnimatePresence mode="popLayout">
					{visibleGroups.map((group) => (
						<motion.div
							key={group.label}
							layout
							initial={{ opacity: 0, y: 12 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: -8 }}
							transition={{ duration: 0.22 }}
							className="p-5 border-r border-b border-dotted border-border"
						>
							<p className="font-pixel text-[8px] mb-3 tracking-widest" style={{ color: group.color }}>
								{group.label}
							</p>
							<div className="border-t border-dashed mb-4" style={{ borderColor: group.color + '55' }} />
							<div className="flex flex-wrap gap-2">
								{group.items.map((item) => (
									<GemItem key={item.name} name={item.name} icon={item.icon} color={group.color} />
								))}
							</div>
						</motion.div>
					))}
				</AnimatePresence>
			</div>
		</div>
	);
}

// ──────────────────────────────────────
// Main export
// ──────────────────────────────────────

export const AboutSection = () => {
	const shouldReduce = useReducedMotion();
	const { state, dispatch } = usePortfolioActions();

	const [activeCategories, setActiveCategories] = useState<Set<Category>>(
		new Set(Object.keys(CAT_COLORS) as Category[])
	);

	useEffect(() => {
		if (!state.focusedSkill) return;
		const t = setTimeout(() => dispatch({ type: 'SET_FOCUSED_SKILL', skillId: null }), 3000);
		return () => clearTimeout(t);
	}, [state.focusedSkill, dispatch]);

	const toggleCategory = (cat: Category) => {
		setActiveCategories((prev) => {
			const next = new Set(prev);
			if (next.has(cat)) next.delete(cat); else next.add(cat);
			return next;
		});
	};

	const resetCategories = () =>
		setActiveCategories(new Set(Object.keys(CAT_COLORS) as Category[]));

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
				className="flex flex-col sm:flex-row gap-10 sm:gap-0 items-center mb-16 border border-dotted border-border bg-card overflow-hidden"
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
				<CategoryFilter
					active={activeCategories}
					onToggle={toggleCategory}
					onReset={resetCategories}
				/>
			</motion.div>
			<motion.div
				variants={fadeUp}
				initial={shouldReduce ? false : 'hidden'}
				whileInView="visible"
				viewport={{ once: true }}
				className="mb-16 border border-dotted border-border overflow-hidden"
			>
				<Constellation activeCategories={activeCategories} focusedSkill={state.focusedSkill} />
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
				<TechStackGrid activeCategories={activeCategories} />
			</motion.div>
		</section>
	);
};
