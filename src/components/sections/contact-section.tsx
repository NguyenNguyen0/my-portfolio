'use client';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { SpotlightCard } from '@/components/ui/spotlight-card';
import {
	Github,
	Linkedin,
	Mail,
	FileUser,
	MessageCircleMore,
	CheckCircle,
	AlertCircle,
	Loader2,
} from 'lucide-react';

const socialLinks = [
	{ icon: Github, href: 'https://github.com/NguyenNguyen0', label: 'GitHub' },
	{
		icon: Linkedin,
		href: 'https://www.linkedin.com/in/nguyennguyen0/',
		label: 'LinkedIn',
	},
	{
		icon: FileUser,
		href: 'https://www.topcv.vn/xem-cv/VA8HAANcCA5UDlcKVwwFBFQDCwMODgdSCABSAQ9a6b',
		label: 'TopCV',
	},
	{
		icon: MessageCircleMore,
		href: 'https://zalo.me/0394757329',
		label: 'Zalo',
	},
	{ icon: Mail, href: 'mailto:trungnguyenwork123@gmail.com', label: 'Email' },
];

const personalInfo = {
	email: 'trungnguyenwork123@gmail.com',
	address: 'Ho Chi Minh City',
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
	subject?: string;
	message?: string;
}

export const ContactSection = () => {
	const [formData, setFormData] = useState<FormData>({
		name: '',
		email: '',
		subject: '',
		message: '',
	});

	const [isSubmitting, setIsSubmitting] = useState(false);
	const [submitStatus, setSubmitStatus] = useState<
		'idle' | 'success' | 'error'
	>('idle');
	const [statusMessage, setStatusMessage] = useState('');
	const [errors, setErrors] = useState<FormErrors>({});
	const [submitTimestamp, setSubmitTimestamp] = useState<string | null>(null);

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	) => {
		const { id, value } = e.target;
		setFormData((prev) => ({ ...prev, [id]: value }));

		if (errors[id as keyof FormErrors]) {
			setErrors((prev) => ({ ...prev, [id]: undefined }));
		}
	};

	const validateForm = (): boolean => {
		const newErrors: FormErrors = {};

		if (!formData.name.trim()) newErrors.name = 'Name is required';
		if (!formData.email.trim()) newErrors.email = 'Email is required';
		if (!formData.message.trim()) newErrors.message = 'Message is required';

		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (formData.email && !emailRegex.test(formData.email)) {
			newErrors.email = 'Please enter a valid email address';
		}

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		setSubmitStatus('idle');
		setStatusMessage('');

		if (!validateForm()) return;

		setIsSubmitting(true);

		try {
			const response = await fetch('/api/mail', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(formData),
			});

			const data = await response.json();

			if (response.ok) {
				setSubmitStatus('success');
				setStatusMessage('Your message has been sent successfully!');
				setSubmitTimestamp(data.timestamp);

				setFormData({
					name: '',
					email: '',
					subject: '',
					message: '',
				});
			} else {
				setSubmitStatus('error');
				setStatusMessage(
					data.error || 'Failed to send message. Please try again.',
				);
				setSubmitTimestamp(data.timestamp);
			}
		} catch (error) {
			setSubmitStatus('error');
			setStatusMessage(
				'An unexpected error occurred. Please try again later.',
			);
			console.error(error);
		} finally {
			setIsSubmitting(false);
		}
	};
	return (
		<section
			id="contact-section"
			className="py-20 px-4 max-w-7xl mx-auto"
			aria-labelledby="contact-title"
		>
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				whileInView={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.8 }}
				viewport={{ once: true }}
				className="text-center mb-16"
			>
				<h2
					id="contact-title"
					className="text-4xl md:text-5xl font-bold mb-4"
				>
					Let&apos;s Work Together
				</h2>
				<p className="text-xl text-muted-foreground max-w-2xl mx-auto">
					Have a project in mind? I&apos;d love to hear about it. Send
					me a message and let&apos;s discuss how we can bring your
					ideas to life.
				</p>
			</motion.div>

			<div className="grid md:grid-cols-2 gap-12">
				<motion.div
					initial={{ opacity: 0, x: -20 }}
					whileInView={{ opacity: 1, x: 0 }}
					transition={{ duration: 0.8 }}
					viewport={{ once: true }}
				>
					<SpotlightCard>
						<form
							className="space-y-6"
							aria-labelledby="contact-form-title"
							onSubmit={handleSubmit}
						>
							<h3 id="contact-form-title" className="sr-only">
								Contact Form
							</h3>

							{/* Status messages */}
							{submitStatus === 'success' && (
								<div className="bg-green-100 dark:bg-green-900/20 border border-green-200 dark:border-green-800 p-4 rounded-md flex items-start gap-3">
									<CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
									<div>
										<p className="text-green-800 dark:text-green-300 font-medium">
											{statusMessage}
										</p>
										{submitTimestamp && (
											<p className="text-green-600 dark:text-green-400 text-sm mt-1">
												Sent at:{' '}
												{new Date(
													submitTimestamp,
												).toLocaleString()}
											</p>
										)}
									</div>
								</div>
							)}

							{submitStatus === 'error' && (
								<div className="bg-red-100 dark:bg-red-900/20 border border-red-200 dark:border-red-800 p-4 rounded-md flex items-start gap-3">
									<AlertCircle className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
									<div>
										<p className="text-red-800 dark:text-red-300 font-medium">
											{statusMessage}
										</p>
										{submitTimestamp && (
											<p className="text-red-600 dark:text-red-400 text-sm mt-1">
												At:{' '}
												{new Date(
													submitTimestamp,
												).toLocaleString()}
											</p>
										)}
									</div>
								</div>
							)}

							<div className="grid md:grid-cols-2 gap-4">
								<div>
									<label
										htmlFor="name"
										className="block text-sm font-medium mb-2"
									>
										Name{' '}
										<span className="text-red-500">*</span>
									</label>
									<Input
										id="name"
										placeholder="Your name"
										aria-required="true"
										value={formData.name}
										onChange={handleChange}
										className={
											errors.name ? 'border-red-500' : ''
										}
										aria-invalid={
											errors.name ? 'true' : 'false'
										}
									/>
									{errors.name && (
										<p
											className="text-red-500 text-sm mt-1"
											role="alert"
										>
											{errors.name}
										</p>
									)}
								</div>
								<div>
									<label
										htmlFor="email"
										className="block text-sm font-medium mb-2"
									>
										Email{' '}
										<span className="text-red-500">*</span>
									</label>
									<Input
										id="email"
										type="email"
										placeholder="your@email.com"
										aria-required="true"
										value={formData.email}
										onChange={handleChange}
										className={
											errors.email ? 'border-red-500' : ''
										}
										aria-invalid={
											errors.email ? 'true' : 'false'
										}
									/>
									{errors.email && (
										<p
											className="text-red-500 text-sm mt-1"
											role="alert"
										>
											{errors.email}
										</p>
									)}
								</div>
							</div>
							<div>
								<label
									htmlFor="subject"
									className="block text-sm font-medium mb-2"
								>
									Subject
								</label>
								<Input
									id="subject"
									placeholder="Project inquiry"
									value={formData.subject}
									onChange={handleChange}
									className={
										errors.subject ? 'border-red-500' : ''
									}
									aria-invalid={
										errors.subject ? 'true' : 'false'
									}
								/>
								{errors.subject && (
									<p
										className="text-red-500 text-sm mt-1"
										role="alert"
									>
										{errors.subject}
									</p>
								)}
							</div>
							<div>
								<label
									htmlFor="message"
									className="block text-sm font-medium mb-2"
								>
									Message{' '}
									<span className="text-red-500">*</span>
								</label>
								<Textarea
									id="message"
									placeholder="Tell me about your project..."
									rows={6}
									aria-required="true"
									value={formData.message}
									onChange={handleChange}
									className={
										errors.message ? 'border-red-500' : ''
									}
									aria-invalid={
										errors.message ? 'true' : 'false'
									}
								/>
								{errors.message && (
									<p
										className="text-red-500 text-sm mt-1"
										role="alert"
									>
										{errors.message}
									</p>
								)}
							</div>
							<Button
								type="submit"
								size="lg"
								className="w-full"
								disabled={isSubmitting}
							>
								{isSubmitting ? (
									<>
										<Loader2 className="mr-2 h-4 w-4 animate-spin" />
										Sending...
									</>
								) : (
									'Send Message'
								)}
							</Button>
						</form>
					</SpotlightCard>
				</motion.div>

				<motion.div
					initial={{ opacity: 0, x: 20 }}
					whileInView={{ opacity: 1, x: 0 }}
					transition={{ duration: 0.8 }}
					viewport={{ once: true }}
					className="space-y-8"
				>
					<div>
						<h3 className="text-2xl font-semibold mb-4">
							Get in Touch
						</h3>
						<p className="text-muted-foreground leading-relaxed">
							I&apos;m always open to discussing new
							opportunities, creative ideas, or potential
							collaborations. Whether you have a project in mind
							or just want to connect, feel free to reach out!
						</p>
					</div>

					<div>
						<h4 className="text-lg font-semibold mb-4">
							Connect with me
						</h4>
						<div
							className="flex gap-4"
							role="list"
							aria-label="Social links"
						>
							{socialLinks.map((social, index) => (
								<motion.a
									key={social.label}
									href={social.href}
									initial={{ opacity: 0, y: 20 }}
									whileInView={{ opacity: 1, y: 0 }}
									transition={{
										duration: 0.5,
										delay: index * 0.1,
									}}
									viewport={{ once: true }}
									whileHover={{ scale: 1.1 }}
									className="p-3 bg-secondary rounded-full hover:bg-primary hover:text-primary-foreground transition-colors"
									aria-label={`Connect with me on ${social.label}`}
									rel="noopener noreferrer"
									target="_blank"
									role="listitem"
								>
									<social.icon
										className="w-5 h-5"
										aria-hidden="true"
									/>
									<span className="sr-only">
										{social.label}
									</span>
								</motion.a>
							))}
						</div>
					</div>

					<div className="space-y-4">
						<div>
							<h4 className="font-semibold">Email</h4>
							<p className="text-muted-foreground">
								<a
									href={`mailto:${personalInfo.email}`}
									className="hover:underline"
								>
									{personalInfo.email}
								</a>
							</p>
						</div>
						<div>
							<h4 className="font-semibold">Location</h4>
							<p className="text-muted-foreground">
								{personalInfo.address}
							</p>
						</div>
					</div>
				</motion.div>
			</div>
		</section>
	);
};
