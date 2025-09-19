'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { MdEmail } from 'react-icons/md';
import { SiMinutemailer } from 'react-icons/si';
import { FaGlobe } from 'react-icons/fa';
import { socialLinks } from '@/data/socialLink';
import clsx from 'clsx';
import Image from 'next/image';

interface ContactFormData {
	name: string;
	email: string;
	subject: string;
	message: string;
}

export function Contact() {
	const [formData, setFormData] = useState<ContactFormData>({
		name: '',
		email: '',
		subject: '',
		message: '',
	});
	const [emailCopied, setEmailCopied] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

	const myEmail = 'trungnguyenwork123@gmail.com';

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { name, value } = e.target;
		setFormData(prev => ({
			...prev,
			[name]: value,
		}));
	};

	const copyEmail = async () => {
		try {
			await navigator.clipboard.writeText(myEmail);
			setEmailCopied(true);
			setTimeout(() => setEmailCopied(false), 2000);
		} catch (err) {
			console.error('Failed to copy email:', err);
		}
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsSubmitting(true);

		// Simulate form submission (since this is frontend only)
		try {
			await new Promise(resolve => setTimeout(resolve, 1500));
			setSubmitStatus('success');
			setFormData({ name: '', email: '', subject: '', message: '' });
		} catch {
			setSubmitStatus('error');
		} finally {
			setIsSubmitting(false);
			setTimeout(() => setSubmitStatus('idle'), 5000);
		}
	};

	return (
		<section id='contact' className='py-16 px-4 sm:px-6 lg:px-8'>
			<div className='max-w-6xl mx-auto'>
				{/* Section Header */}
				<motion.div
					className='text-center mb-16'
					initial={{ opacity: 0, y: 30 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.6 }}
				>
					<h2
						className={clsx(
							'text-4xl sm:text-5xl lg:text-6xl font-bold',
							'text-gray-900 dark:text-white',
							'font-montserrat mb-4'
						)}
					>
						Get In Touch
					</h2>
					<p
						className={clsx(
							'text-lg sm:text-xl',
							'text-gray-600 dark:text-gray-400',
							'max-w-2xl mx-auto',
							'font-montserrat'
						)}
					>
						Have a project in mind or want to collaborate? I&apos;d love to hear
						from you!
					</p>
				</motion.div>

				<div className='grid grid-cols-1 lg:grid-cols-2 gap-12'>
					{/* Contact Information */}
					<motion.div
						className='space-y-8'
						initial={{ opacity: 0, x: -30 }}
						whileInView={{ opacity: 1, x: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.6, delay: 0.2 }}
					>
						{/* Email Section */}
						<div
							className={clsx(
								'p-6 rounded-2xl bg-white/60 dark:bg-gray-800/60',
								'border border-gray-200 dark:border-gray-700 shadow-lg'
							)}
						>
							<h3
								className={clsx(
									'text-xl font-semibold mb-4',
									'text-gray-900 dark:text-white',
									'font-montserrat',
									'flex items-center'
								)}
							>
								<MdEmail className='mr-2 text-2xl text-orange-500' />
								Email Me Directly
							</h3>
							<div className='flex items-center gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-700/50'>
								<Image
									src='/icons/gmail.svg'
									alt='Gmail'
									width={24}
									height={24}
									className='flex-shrink-0'
								/>
								<span
									className={clsx(
										'flex-1 text-sm sm:text-base text-gray-800 dark:text-gray-200',
										'font-medium break-all sm:break-normal',
										'min-w-0'
									)}
								>
									{myEmail}
								</span>
								<button
									onClick={copyEmail}
									className={clsx(
										'p-2 rounded-lg transition-all duration-200',
										'hover:bg-gray-200 dark:hover:bg-gray-600',
										'focus:outline-none focus:ring-2 focus:ring-purple-500'
									)}
									title='Copy email address'
								>
									{emailCopied ? (
										<svg
											className='w-5 h-5 text-green-500'
											fill='currentColor'
											viewBox='0 0 20 20'
										>
											<path
												fillRule='evenodd'
												d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
												clipRule='evenodd'
											/>
										</svg>
									) : (
										<svg
											className='w-5 h-5 text-gray-500 dark:text-gray-400'
											fill='none'
											stroke='currentColor'
											viewBox='0 0 24 24'
										>
											<path
												strokeLinecap='round'
												strokeLinejoin='round'
												strokeWidth={2}
												d='M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z'
											/>
										</svg>
									)}
								</button>
							</div>
							{emailCopied && (
								<motion.p
									className='text-sm text-green-600 dark:text-green-400 mt-2'
									initial={{ opacity: 0, y: -10 }}
									animate={{ opacity: 1, y: 0 }}
									exit={{ opacity: 0, y: -10 }}
								>
									Email copied to clipboard!
								</motion.p>
							)}
						</div>

						{/* Social Links */}
						<div
							className={clsx(
								'p-6 rounded-2xl bg-white/60 dark:bg-gray-800/60',
								'border border-gray-200 dark:border-gray-700 shadow-lg'
							)}
						>
							<h3
								className={clsx(
									'text-xl font-semibold mb-6',
									'text-gray-900 dark:text-white',
									'font-montserrat',
									'flex items-center'
								)}
							>
								<FaGlobe className='text-2xl mr-2 text-cyan-400' />
								Connect With Me
							</h3>
							<div className='grid grid-cols-2 gap-4'>
								{socialLinks.map(social => (
									<motion.a
										key={social.name}
										href={social.url}
										target='_blank'
										rel='noopener noreferrer'
										className={clsx(
											'flex items-center gap-3 p-4',
											'bg-gray-50 dark:bg-gray-700/50',
											'hover:bg-gray-100 dark:hover:bg-gray-600/50',
											'rounded-xl transition-all duration-200',
											'border border-transparent',
											'hover:border-purple-200 dark:hover:border-purple-700',
											'group'
										)}
										whileHover={{ scale: 1.02 }}
										whileTap={{ scale: 0.98 }}
									>
										<div
											className={clsx(
												'w-8 h-8 flex-shrink-0',
												'group-hover:scale-110 transition-transform duration-200'
											)}
										>
											<Image
												src={social.icon}
												alt={social.name}
												width={32}
												height={32}
												className='w-full h-full object-contain'
											/>
										</div>
										<span
											className={clsx(
												'font-medium',
												'text-gray-700 dark:text-gray-300',
												'group-hover:text-purple-600 dark:group-hover:text-purple-400',
												'transition-colors duration-200'
											)}
										>
											{social.name}
										</span>
									</motion.a>
								))}
							</div>
						</div>
					</motion.div>

					{/* Contact Form */}
					<motion.div
						initial={{ opacity: 0, x: 30 }}
						whileInView={{ opacity: 1, x: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.6, delay: 0.4 }}
					>
						<div
							className={clsx(
								'p-8 rounded-2xl bg-white/60 dark:bg-gray-800/60',
								'border border-gray-200 dark:border-gray-700 shadow-lg'
							)}
						>
							<h3
								className={clsx(
									'text-2xl font-semibold mb-6',
									'text-gray-900 dark:text-white',
									'font-montserrat',
									'flex items-center'
								)}
							>
								<SiMinutemailer className='text-2xl mr-2 text-blue-400' />
								Send Me a Message
							</h3>

							<form onSubmit={handleSubmit} className='space-y-6'>
								<div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
									<div>
										<label
											htmlFor='name'
											className={clsx(
												'block text-sm font-medium mb-2',
												'text-gray-700 dark:text-gray-300'
											)}
										>
											Name *
										</label>
										<input
											type='text'
											id='name'
											name='name'
											value={formData.name}
											onChange={handleInputChange}
											required
											className={clsx(
												'w-full px-4 py-3 rounded-lg',
												'bg-gray-50 dark:bg-gray-700/50',
												'border border-gray-200 dark:border-gray-600',
												'text-gray-900 dark:text-white',
												'placeholder-gray-500 dark:placeholder-gray-400',
												'focus:ring-2 focus:ring-purple-500 focus:border-transparent',
												'transition-all duration-200'
											)}
											placeholder='Your name'
										/>
									</div>
									<div>
										<label
											htmlFor='email'
											className={clsx(
												'block text-sm font-medium mb-2',
												'text-gray-700 dark:text-gray-300'
											)}
										>
											Email *
										</label>
										<input
											type='email'
											id='email'
											name='email'
											value={formData.email}
											onChange={handleInputChange}
											required
											className={clsx(
												'w-full px-4 py-3 rounded-lg',
												'bg-gray-50 dark:bg-gray-700/50',
												'border border-gray-200 dark:border-gray-600',
												'text-gray-900 dark:text-white',
												'placeholder-gray-500 dark:placeholder-gray-400',
												'focus:ring-2 focus:ring-purple-500 focus:border-transparent',
												'transition-all duration-200'
											)}
											placeholder='your.email@example.com'
										/>
									</div>
								</div>

								<div>
									<label
										htmlFor='subject'
										className={clsx(
											'block text-sm font-medium mb-2',
											'text-gray-700 dark:text-gray-300'
										)}
									>
										Subject *
									</label>
									<input
										type='text'
										id='subject'
										name='subject'
										value={formData.subject}
										onChange={handleInputChange}
										required
										className={clsx(
											'w-full px-4 py-3 rounded-lg',
											'bg-gray-50 dark:bg-gray-700/50',
											'border border-gray-200 dark:border-gray-600',
											'text-gray-900 dark:text-white',
											'placeholder-gray-500 dark:placeholder-gray-400',
											'focus:ring-2 focus:ring-purple-500 focus:border-transparent',
											'transition-all duration-200'
										)}
										placeholder="What's this about?"
									/>
								</div>

								<div>
									<label
										htmlFor='message'
										className={clsx(
											'block text-sm font-medium mb-2',
											'text-gray-700 dark:text-gray-300'
										)}
									>
										Message *
									</label>
									<textarea
										id='message'
										name='message'
										value={formData.message}
										onChange={handleInputChange}
										required
										rows={5}
										className={clsx(
											'w-full px-4 py-3 rounded-lg',
											'bg-gray-50 dark:bg-gray-700/50',
											'border border-gray-200 dark:border-gray-600',
											'text-gray-900 dark:text-white',
											'placeholder-gray-500 dark:placeholder-gray-400',
											'focus:ring-2 focus:ring-purple-500 focus:border-transparent',
											'transition-all duration-200',
											'resize-vertical'
										)}
										placeholder='Tell me about your project or just say hello!'
									/>
								</div>

								{/* Submit Status Messages */}
								{submitStatus === 'success' && (
									<motion.div
										className='p-4 rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800'
										initial={{ opacity: 0, y: -10 }}
										animate={{ opacity: 1, y: 0 }}
									>
										<p className='text-green-800 dark:text-green-200'>
											✅ Message sent successfully!
											I&apos;ll get back to you soon.
										</p>
									</motion.div>
								)}

								{submitStatus === 'error' && (
									<motion.div
										className='p-4 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800'
										initial={{ opacity: 0, y: -10 }}
										animate={{ opacity: 1, y: 0 }}
									>
										<p className='text-red-800 dark:text-red-200'>
											❌ Something went wrong. Please
											try again or contact me
											directly.
										</p>
									</motion.div>
								)}

								<motion.button
									type='submit'
									disabled={isSubmitting}
									className={clsx(
										'w-full py-4 px-6 rounded-lg',
										'text-white font-semibold',
										'bg-gradient-to-r from-purple-600 to-blue-600',
										'hover:from-purple-700 hover:to-blue-700',
										'focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2',
										'disabled:opacity-50 disabled:cursor-not-allowed',
										'transition-all duration-200',
										'font-montserrat'
									)}
									whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
									whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
								>
									{isSubmitting ? (
										<span className='flex items-center justify-center gap-2'>
											<svg
												className='animate-spin w-5 h-5'
												fill='none'
												viewBox='0 0 24 24'
											>
												<circle
													className='opacity-25'
													cx='12'
													cy='12'
													r='10'
													stroke='currentColor'
													strokeWidth='4'
												/>
												<path
													className='opacity-75'
													fill='currentColor'
													d='m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
												/>
											</svg>
											Sending...
										</span>
									) : (
										'Send Message'
									)}
								</motion.button>
							</form>
						</div>
					</motion.div>
				</div>

				{/* Mini Footer */}
				<motion.div
					className='text-center mt-16'
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.6, delay: 0.6 }}
				>
					<p
						className={clsx(
							'text-lg font-medium',
							'text-gray-600 dark:text-gray-400',
							'font-montserrat'
						)}
					>
						Looking forward to hearing from you 🚀
					</p>
				</motion.div>
			</div>
		</section>
	);
}
