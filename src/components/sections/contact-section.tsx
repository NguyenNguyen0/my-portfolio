'use client';

import { motion, useReducedMotion, type Variants } from 'framer-motion';
import { useState } from 'react';
import { Github, Linkedin, MessageCircleMore, CheckCircle, AlertCircle, Loader2, Copy, Check } from 'lucide-react';

const EMAIL = 'nguyentrungnguyen.dev@gmail.com';

// GitLab SVG — lucide has no GitLab icon
const GitLabIcon = () => (
	<svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor" aria-hidden="true">
		<path d="M22.65 14.39L12 22.13 1.35 14.39a.84.84 0 0 1-.3-.94l1.22-3.78 2.44-7.51A.42.42 0 0 1 4.82 2a.43.43 0 0 1 .58 0 .42.42 0 0 1 .11.18l2.44 7.49h8.1l2.44-7.49a.42.42 0 0 1 .11-.18.43.43 0 0 1 .58 0 .42.42 0 0 1 .11.18l2.44 7.51L23 13.45a.84.84 0 0 1-.35.94z"/>
	</svg>
);

const socialLinks = [
	{ icon: Github, href: 'https://github.com/NguyenNguyen0', label: 'GitHub' },
	{ icon: GitLabIcon, href: 'https://gitlab.com/nguyennguyen0', label: 'GitLab' },
	{ icon: Linkedin, href: 'https://www.linkedin.com/in/nguyennguyen0/', label: 'LinkedIn' },
	{ icon: MessageCircleMore, href: 'https://zalo.me/0394757329', label: 'Zalo' },
];

const fadeUp: Variants = {
	hidden: { opacity: 0, y: 20 },
	visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } },
};

interface FormData {
	name: string;
	email: string;
	subject: string;
	message: string;
}

interface FormErrors {
	name?: string;
	email?: string;
	message?: string;
}

export const ContactSection = () => {
	const shouldReduce = useReducedMotion();
	const [formData, setFormData] = useState<FormData>({ name: '', email: '', subject: '', message: '' });
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
	const [statusMessage, setStatusMessage] = useState('');
	const [errors, setErrors] = useState<FormErrors>({});
	const [copied, setCopied] = useState(false);

	const copyEmail = async () => {
		await navigator.clipboard.writeText(EMAIL);
		setCopied(true);
		setTimeout(() => setCopied(false), 2000);
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { id, value } = e.target;
		setFormData((prev) => ({ ...prev, [id]: value }));
		if (errors[id as keyof FormErrors]) {
			setErrors((prev) => ({ ...prev, [id]: undefined }));
		}
	};

	const validate = (): boolean => {
		const next: FormErrors = {};
		if (!formData.name.trim()) next.name = 'Required';
		if (!formData.email.trim()) next.email = 'Required';
		else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) next.email = 'Invalid email';
		if (!formData.message.trim()) next.message = 'Required';
		setErrors(next);
		return Object.keys(next).length === 0;
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setSubmitStatus('idle');
		if (!validate()) return;
		setIsSubmitting(true);
		try {
			const res = await fetch('/api/mail', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(formData),
			});
			const data = await res.json();
			if (res.ok) {
				setSubmitStatus('success');
				setStatusMessage('Message sent successfully!');
				setFormData({ name: '', email: '', subject: '', message: '' });
			} else {
				setSubmitStatus('error');
				setStatusMessage(data.error || 'Failed to send. Please try again.');
			}
		} catch {
			setSubmitStatus('error');
			setStatusMessage('An unexpected error occurred.');
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<section id="contact-section" className="py-16 sm:py-24 px-4 max-w-7xl mx-auto">
			{/* Heading */}
			<motion.div
				variants={fadeUp}
				initial={shouldReduce ? false : 'hidden'}
				whileInView="visible"
				viewport={{ once: true }}
				className="mb-12 sm:mb-16"
			>
				<p className="font-pixel text-[10px] text-primary mb-3 tracking-widest">
					CONTACT
				</p>
				<h2 className="font-pixel text-xl sm:text-2xl md:text-3xl text-foreground leading-relaxed">
					LET&apos;S TALK
				</h2>
			</motion.div>

			<div className="grid md:grid-cols-2 gap-10 md:gap-16">
				{/* Form */}
				<motion.div
					variants={fadeUp}
					initial={shouldReduce ? false : 'hidden'}
					whileInView="visible"
					viewport={{ once: true }}
				>
					<div className="pixel-card p-6 sm:p-8">
						<form
							onSubmit={handleSubmit}
							className="space-y-5"
							aria-label="Contact form"
							noValidate
						>
							{/* Status */}
							{submitStatus === 'success' && (
								<div className="flex items-start gap-3 p-4 border border-success bg-success/10">
									<CheckCircle className="h-4 w-4 text-success mt-0.5 flex-shrink-0" />
									<p className="font-mono-custom text-sm text-success">{statusMessage}</p>
								</div>
							)}
							{submitStatus === 'error' && (
								<div className="flex items-start gap-3 p-4 border border-destructive bg-destructive/10">
									<AlertCircle className="h-4 w-4 text-destructive mt-0.5 flex-shrink-0" />
									<p className="font-mono-custom text-sm text-destructive">{statusMessage}</p>
								</div>
							)}

							{/* Name + Email row */}
							<div className="grid sm:grid-cols-2 gap-4">
								<PixelField
									id="name"
									label="NAME"
									placeholder="Your name"
									value={formData.name}
									error={errors.name}
									onChange={handleChange}
									required
								/>
								<PixelField
									id="email"
									label="EMAIL"
									type="email"
									placeholder="your@email.com"
									value={formData.email}
									error={errors.email}
									onChange={handleChange}
									required
								/>
							</div>

							<PixelField
								id="subject"
								label="SUBJECT"
								placeholder="Project inquiry"
								value={formData.subject}
								onChange={handleChange}
							/>

							{/* Message */}
							<div>
								<label htmlFor="message" className="font-pixel text-[9px] text-muted-foreground block mb-2 tracking-wide">
									MESSAGE <span className="text-destructive" aria-hidden="true">*</span>
								</label>
								<textarea
									id="message"
									rows={5}
									placeholder="Tell me about your project..."
									value={formData.message}
									onChange={handleChange}
									aria-required="true"
									aria-invalid={errors.message ? 'true' : 'false'}
									className={`w-full bg-input text-foreground font-mono-custom text-sm px-4 py-3 border border-dotted placeholder:text-muted-foreground focus:outline-none focus:border-solid focus:border-ring resize-none transition-colors ${errors.message ? 'border-destructive border-solid' : 'border-border'}`}
								/>
								{errors.message && (
									<p className="font-mono-custom text-xs text-destructive mt-1" role="alert">{errors.message}</p>
								)}
							</div>

							<button
								type="submit"
								disabled={isSubmitting}
								className="w-full font-pixel text-[10px] px-6 py-4 bg-primary text-primary-foreground border-2 border-primary transition-all duration-150 hover:-translate-y-0.5 hover:shadow-[0_4px_0_0_color-mix(in_oklch,var(--primary)_30%,transparent)] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none flex items-center justify-center gap-2 leading-relaxed"
							>
								{isSubmitting ? (
									<><Loader2 className="w-3 h-3 animate-spin" /> SENDING...</>
								) : (
									'▶ SEND MESSAGE'
								)}
							</button>
						</form>
					</div>
				</motion.div>

				{/* Info + Socials */}
				<motion.div
					variants={fadeUp}
					initial={shouldReduce ? false : 'hidden'}
					whileInView="visible"
					viewport={{ once: true }}
					className="space-y-8"
				>
					<div>
						<p className="font-pixel text-[10px] text-muted-foreground mb-3 tracking-widest">GET IN TOUCH</p>
						<p className="font-mono-custom text-sm text-muted-foreground leading-relaxed">
							Always open to new opportunities, interesting ideas,
							or just a conversation about tech.
							Don&apos;t hesitate to reach out.
						</p>
					</div>

					<div className="pixel-card p-6 space-y-4">
						<div>
							<p className="font-pixel text-[9px] text-muted-foreground tracking-widest mb-2">EMAIL</p>
							<div className="flex items-center gap-3">
								<span className="font-mono-custom text-sm text-foreground break-all">{EMAIL}</span>
								<button
									onClick={copyEmail}
									aria-label={copied ? 'Email copied' : 'Copy email address'}
									className="flex-shrink-0 p-1.5 border border-dotted border-border text-muted-foreground transition-all duration-150 hover:border-solid hover:border-primary hover:text-primary hover:-translate-y-0.5"
								>
									{copied
										? <Check className="w-3.5 h-3.5 text-success" />
										: <Copy className="w-3.5 h-3.5" />
									}
								</button>
							</div>
						</div>
						<div className="border-t border-dotted border-border" />
						<div>
							<p className="font-pixel text-[9px] text-muted-foreground tracking-widest mb-1">LOCATION</p>
							<p className="font-mono-custom text-sm text-foreground">Ho Chi Minh City, Vietnam</p>
						</div>
					</div>

					<div>
						<p className="font-pixel text-[10px] text-muted-foreground mb-4 tracking-widest">CONNECT</p>
						<div className="flex flex-wrap gap-3" role="list" aria-label="Social links">
							{socialLinks.map((social) => (
								<a
									key={social.label}
									href={social.href}
									target="_blank"
									rel="noopener noreferrer"
									aria-label={`Connect on ${social.label}`}
									role="listitem"
									className="flex items-center gap-2 px-4 py-3 border border-dotted border-border text-muted-foreground transition-all duration-150 hover:border-solid hover:border-primary hover:text-primary hover:-translate-y-0.5"
								>
									<social.icon className="w-4 h-4" aria-hidden="true" />
									<span className="font-pixel text-[9px]">{social.label.toUpperCase()}</span>
								</a>
							))}
						</div>
					</div>
				</motion.div>
			</div>
		</section>
	);
};

interface PixelFieldProps {
	id: string;
	label: string;
	type?: string;
	placeholder?: string;
	value: string;
	error?: string;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	required?: boolean;
}

function PixelField({ id, label, type = 'text', placeholder, value, error, onChange, required }: PixelFieldProps) {
	return (
		<div>
			<label htmlFor={id} className="font-pixel text-[9px] text-muted-foreground block mb-2 tracking-wide">
				{label} {required && <span className="text-destructive" aria-hidden="true">*</span>}
			</label>
			<input
				id={id}
				type={type}
				placeholder={placeholder}
				value={value}
				onChange={onChange}
				aria-required={required}
				aria-invalid={error ? 'true' : 'false'}
				className={`w-full bg-input text-foreground font-mono-custom text-sm px-4 py-3 border border-dotted placeholder:text-muted-foreground focus:outline-none focus:border-solid focus:border-ring transition-colors ${error ? 'border-destructive border-solid' : 'border-border'}`}
			/>
			{error && <p className="font-mono-custom text-xs text-destructive mt-1" role="alert">{error}</p>}
		</div>
	);
}
