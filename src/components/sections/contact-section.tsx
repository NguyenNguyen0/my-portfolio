'use client';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { SpotlightCard } from '@/components/ui/spotlight-card';
import { Github, Linkedin, Mail, Twitter } from 'lucide-react';

const socialLinks = [
	{ icon: Github, href: '#', label: 'GitHub' },
	{ icon: Linkedin, href: '#', label: 'LinkedIn' },
	{ icon: Twitter, href: '#', label: 'Twitter' },
	{ icon: Mail, href: 'mailto:john@example.com', label: 'Email' },
];

export const ContactSection = () => {
	return (
		<section className="py-20 px-4 max-w-7xl mx-auto">
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				whileInView={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.8 }}
				viewport={{ once: true }}
				className="text-center mb-16"
			>
				<h2 className="text-4xl md:text-5xl font-bold mb-4">
					Let&apos;s Work Together
				</h2>
				<p className="text-xl text-muted-foreground max-w-2xl mx-auto">
					Have a project in mind? I&apos;d love to hear about it. Send me a
					message and let&apos;s discuss how we can bring your ideas to
					life.
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
						<form className="space-y-6">
							<div className="grid md:grid-cols-2 gap-4">
								<div>
									<label
										htmlFor="name"
										className="block text-sm font-medium mb-2"
									>
										Name
									</label>
									<Input id="name" placeholder="Your name" />
								</div>
								<div>
									<label
										htmlFor="email"
										className="block text-sm font-medium mb-2"
									>
										Email
									</label>
									<Input
										id="email"
										type="email"
										placeholder="your@email.com"
									/>
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
								/>
							</div>
							<div>
								<label
									htmlFor="message"
									className="block text-sm font-medium mb-2"
								>
									Message
								</label>
								<Textarea
									id="message"
									placeholder="Tell me about your project..."
									rows={6}
								/>
							</div>
							<Button type="submit" size="lg" className="w-full">
								Send Message
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
							I&apos;m always open to discussing new opportunities,
							creative ideas, or potential collaborations. Whether
							you have a project in mind or just want to connect,
							feel free to reach out!
						</p>
					</div>

					<div>
						<h4 className="text-lg font-semibold mb-4">
							Connect with me
						</h4>
						<div className="flex gap-4">
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
								>
									<social.icon className="w-5 h-5" />
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
								john@example.com
							</p>
						</div>
						<div>
							<h4 className="font-semibold">Location</h4>
							<p className="text-muted-foreground">
								San Francisco, CA
							</p>
						</div>
					</div>
				</motion.div>
			</div>
		</section>
	);
};
