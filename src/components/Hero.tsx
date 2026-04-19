import { motion } from 'framer-motion';
import { Typewriter } from 'react-simple-typewriter';
import { buttonVariants } from './ui/button';
import { ArrowRight, Download, Github, Linkedin, ExternalLink } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { UserCircle } from 'lucide-react';
import gsap from 'gsap';

export default function Hero() {
  const [imageError, setImageError] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const actionsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Intro animation for text elements
      gsap.from(".hero-anim", {
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: 'power4.out',
      });
      
      // Scale-in for buttons
      gsap.from(".action-anim", {
        scale: 0.8,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'back.out(1.7)',
        delay: 0.8
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={heroRef} className="relative min-h-[90vh] flex items-center justify-center pt-20 overflow-hidden">
      <div className="container mx-auto px-6 relative z-10 grid md:grid-cols-2 gap-12 items-center">
        
        {/* Left Side: Text Content */}
        <div ref={textRef} className="space-y-8">
          <div className="space-y-4">
            <span className="hero-anim px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold tracking-wide uppercase inline-block border border-primary/20">
              Welcome to my digital space
            </span>
            <h1 className="hero-anim text-5xl md:text-7xl font-display font-bold leading-tight">
              I'm <span className="text-primary italic">Rajnish Kumar</span>
            </h1>
            <div className="hero-anim text-2xl md:text-4xl font-display font-medium text-foreground/80 h-12">
              <span className="text-foreground">a </span>
              <span className="text-primary">
                <Typewriter
                  words={['Software Developer', 'Full Stack Developer', 'Problem Solver', 'BCA Student']}
                  loop={0}
                  cursor
                  cursorStyle='_'
                  typeSpeed={70}
                  deleteSpeed={50}
                  delaySpeed={1000}
                />
              </span>
            </div>
          </div>
          
          <p className="hero-anim text-lg text-muted-foreground max-w-xl leading-relaxed">
            Aspiring Software Developer currently in BCA 2nd Year (2025-26). 
            Passionate about building scalable web applications and exploring Artificial Intelligence. 
            Ranked 1st in BCA 1st Year (2024-25) with a merit certificate.
          </p>

          <div ref={actionsRef} className="flex flex-wrap gap-4 pt-4">
            <div className="action-anim">
              <a 
                href="#projects" 
                className={cn(buttonVariants({ variant: "default", size: "lg" }), "rounded-full px-8 hover:scale-105 transition-transform group")}
              >
                View My Work
                <ExternalLink className="ml-2 h-4 w-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </a>
            </div>
            <div className="action-anim">
              <a 
                href="/resume.pdf" 
                download
                className={cn(buttonVariants({ variant: "outline", size: "lg" }), "rounded-full px-8 hover:scale-105 transition-transform group")}
              >
                Download CV
                <Download className="ml-2 h-4 w-4 group-hover:translate-y-1 transition-transform" />
              </a>
            </div>
            
            <div className="action-anim flex items-center gap-6 ml-4">
              <a href="https://github.com/rajnish-kumar-dev" target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                <Github className="h-6 w-6" />
              </a>
              <a href="https://www.linkedin.com/in/rajnish-kumar-25ab53346" target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                <Linkedin className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>

        {/* Right Side: Image/Visual */}
        <div className="relative flex justify-center items-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="relative w-40 h-40 md:w-56 md:h-56"
          >
            {/* Animated Circles Background */}
            <div className="absolute inset-0 bg-primary/20 rounded-full animate-pulse-soft blur-2xl opacity-30" />
            <div className="absolute -inset-2 border border-primary/20 rounded-full animate-[spin_10s_linear_infinite]" />
            
            <div className="relative w-full h-full rounded-full glass-card overflow-hidden group border-2 border-primary/30 flex items-center justify-center bg-muted shadow-2xl">
              {!imageError ? (
                <img 
                  src="/rajnish_profile.jpg" 
                  alt="Rajnish Kumar" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  onError={() => setImageError(true)}
                />
              ) : (
                <div className="flex flex-col items-center text-primary/40">
                  <UserCircle size={64} strokeWidth={1} />
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent flex items-end p-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <div className="text-primary font-bold">Top Rank #1</div>
                  <div className="text-sm text-foreground/70">BCA 2024-25 Merit Holder</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
