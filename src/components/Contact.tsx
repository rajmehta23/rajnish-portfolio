import { motion } from 'framer-motion';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Card, CardContent } from './ui/card';
import { Mail, MessageSquare, Phone, Send, Github, Linkedin, Twitter, MapPin } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { toast } from 'sonner';
import { buttonVariants } from './ui/button';
import { cn } from '@/lib/utils';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  subject: z.string().min(5, 'Subject must be at least 5 characters'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export default function Contact() {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormValues) => {
    try {
      // 1. Save to Firestore as backup
      await addDoc(collection(db, 'messages'), {
        ...data,
        status: 'unread',
        createdAt: serverTimestamp(),
      });
      
      // 2. Send via Backend API for real Email notification
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Failed to trigger email notification');
      }

      toast.success('Message sent! I will check my email and get back to you.');
      reset();
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error('Failed to send message. Please try again later.');
    }
  };

  return (
    <section id="contact" className="container mx-auto px-6">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">Get In Touch</h2>
        <div className="h-1.5 w-24 bg-primary mx-auto rounded-full" />
      </div>

      <div className="grid lg:grid-cols-5 gap-12">
        <motion.div 
          className="lg:col-span-2 space-y-8"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-bold mb-4">Let's talk about your project</h3>
          <p className="text-muted-foreground">
            I'm currently looking for internships and freelance opportunities. 
            If you have a question or just want to say hi, I'll do my best to get back to you!
          </p>

          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <Mail />
              </div>
              <div>
                <p className="font-bold">Email</p>
                <p className="text-muted-foreground">rajnishkumarschool911@gmail.com</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <Phone />
              </div>
              <div>
                <p className="font-bold">Phone</p>
                <p className="text-muted-foreground">+91 91131 69121</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <MapPin />
              </div>
              <div>
                <p className="font-bold">Location</p>
                <p className="text-muted-foreground">Patna, Bihar, India</p>
              </div>
            </div>
          </div>

          <div className="flex space-x-4 pt-4">
            <a 
              href="https://www.linkedin.com/in/rajnish-kumar-25ab53346" 
              target="_blank" 
              rel="noreferrer"
              className={cn(buttonVariants({ variant: "outline", size: "icon" }), "rounded-full")}
            >
              <Linkedin className="h-5 w-5" />
            </a>
            <a 
              href="https://github.com/rajnish-kumar-dev" 
              target="_blank" 
              rel="noreferrer"
              className={cn(buttonVariants({ variant: "outline", size: "icon" }), "rounded-full")}
            >
              <Github className="h-5 w-5" />
            </a>
            <div className={cn(buttonVariants({ variant: "outline", size: "icon" }), "rounded-full cursor-not-allowed opacity-50")}>
              <Twitter className="h-5 w-5" />
            </div>
          </div>
        </motion.div>

        <motion.div 
          className="lg:col-span-3"
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <Card className="glass-card border-none">
            <CardContent className="pt-8">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Name</label>
                    <Input {...register('name')} placeholder="John Doe" className="bg-background/50" />
                    {errors.name && <p className="text-xs text-destructive">{errors.name.message}</p>}
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Email</label>
                    <Input {...register('email')} placeholder="john@example.com" className="bg-background/50" />
                    {errors.email && <p className="text-xs text-destructive">{errors.email.message}</p>}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Subject</label>
                  <Input {...register('subject')} placeholder="Project Discussion" className="bg-background/50" />
                  {errors.subject && <p className="text-xs text-destructive">{errors.subject.message}</p>}
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Message</label>
                  <Textarea {...register('message')} placeholder="Tell me more about what you need..." rows={5} className="bg-background/50" />
                  {errors.message && <p className="text-xs text-destructive">{errors.message.message}</p>}
                </div>
                
                <Button type="submit" className="w-full rounded-full group" disabled={isSubmitting}>
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                  <Send className="ml-2 h-4 w-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
