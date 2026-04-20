import { motion } from 'framer-motion';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button, buttonVariants } from './ui/button';
import { ExternalLink, Github, Layers, X, Globe } from 'lucide-react';
import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "./ui/dialog";
import { db } from '@/lib/firebase';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { cn } from '@/lib/utils';

const initialProjects = [
  {
    title: 'Weather Forecaster',
    description: 'A responsive web application that displays real-time weather, humidity, and atmospheric conditions dynamically using a weather API.',
    image: 'https://images.unsplash.com/photo-1592210454359-9043f067919b?auto=format&fit=crop&q=60&w=600&h=450',
    tags: ['HTML', 'CSS', 'JavaScript', 'Weather API'],
    github: '#',
    live: '#',
    fullStory: `
      Building the Weather Forecaster taught me the fundamental power of asynchronous JavaScript. I used the Fetch API to connect with OpenWeatherMap, transforming raw JSON data into a beautiful, human-readable interface.
      
      The biggest challenge was handling edge cases: what happens when the user types a city that doesn't exist? I implemented robust error handling and a "smart search" feature that suggests common locations.
      
      For the styling, I focused on dynamic background changes—the UI shifts from a warm sun-drenched look to a cool, rainy aesthetic depending on the current weather condition reported by the API.
    `
  },
  {
    title: 'Automated PDF Result Generator',
    description: 'Developed an Automated PDF Generator for Student Results that converts student marks and academic data from Excel sheets into well-formatted result PDFs using Python. Built with powerful libraries like Pandas, OpenPyXL, and ReportLab / FPDF.',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=60&w=600&h=450',
    tags: ['Python', 'Pandas', 'OpenPyXL', 'ReportLab / FPDF'],
    github: '#',
    live: '#',
    fullStory: `
      This system was developed to solve the complex challenge of managing and generating student result reports at a large scale. By leveraging Python's rich ecosystem, I built a tool that converts student marks and academic data directly from Excel sheets into professional, well-formatted PDFs.
      
      The core processing uses Pandas for efficient data manipulation and OpenPyXL for precise Excel handling. For high-quality document generation, I implemented a flexible layout engine using ReportLab and FPDF, ensuring every result card meets institutional design standards.
      
      Key Impact:
      - Reduces manual data entry work by over 90%.
      - Eliminates human errors inherent in bulk manual processing.
      - Enables college administration to generate hundreds of professional reports in seconds.
      - Provides a scalable solution for academic data management.
    `
  },
  {
    title: 'Personal Premium Portfolio',
    description: 'A high-performance modern portfolio featuring glassmorphism UI, GSAP animations, and an integrated interactive chat interface.',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=60&w=600&h=450',
    tags: ['React 19', 'Tailwind', 'GSAP', 'Firebase'],
    github: '#',
    live: '#',
    fullStory: `
      This portfolio represents my latest exploration into high-end web aesthetics. I combined React 19 with GSAP to create a scroll-driven experience that feels fluid and organic.
      
      The "Glassmorphism" UI was achieved through complex Backdrop Filter combinations and semi-transparent color scales. I integrated Firebase for a live Admin Dashboard, allowing me to update my projects and read visitor messages in real-time.
      
      The most rewarding part was implementing the interactive chat interface, which uses custom prompts to answer questions about my background and skills, providing an interactive "hiring" experience for potential employers.
    `
  }
];

export default function Projects() {
  const [projects, setProjects] = useState<any[]>(initialProjects);
  const [selectedProject, setSelectedProject] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const q = query(collection(db, 'projects'), orderBy('createdAt', 'desc'));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          setProjects(data);
        }
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  return (
    <section id="projects" className="container mx-auto px-6">
      <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
        <div>
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">Featured Projects</h2>
          <div className="h-1.5 w-24 bg-primary rounded-full" />
        </div>
        <p className="text-muted-foreground max-w-md">
          A collection of projects where I've applied my technical skills to solve real problems 
          and explore new technologies.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project, index) => (
          <motion.div
            key={project.id || index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            onClick={() => setSelectedProject(project)}
            className="cursor-pointer"
          >
            <Card className="group overflow-hidden border-none glass-card h-full flex flex-col hover:bg-white/[0.03] transition-colors">
              <div className="relative overflow-hidden aspect-video">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                  <a 
                    href={project.github} 
                    target="_blank" 
                    rel="noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className={cn(buttonVariants({ variant: "secondary", size: "icon" }), "rounded-full")}
                  >
                    <Github className="h-5 w-5" />
                  </a>
                  <a 
                    href={project.live} 
                    target="_blank" 
                    rel="noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className={cn(buttonVariants({ variant: "secondary", size: "icon" }), "rounded-full")}
                  >
                    <ExternalLink className="h-5 w-5" />
                  </a>
                </div>
              </div>
              
              <CardHeader className="pb-3">
                <div className="flex gap-2 flex-wrap mb-2">
                  {project.tags?.map((tag: string) => (
                    <Badge key={tag} variant="secondary" className="bg-primary/10 text-primary border-none text-[10px]">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <CardTitle className="group-hover:text-primary transition-colors">{project.title}</CardTitle>
              </CardHeader>
              
              <CardContent className="flex-grow">
                <p className="text-muted-foreground text-sm line-clamp-3">
                  {project.description}
                </p>
              </CardContent>
              
              <CardFooter className="pt-0 flex justify-between">
                <button 
                  className="text-primary font-bold hover:underline underline-offset-4 flex items-center transition-all group/btn"
                  onClick={() => setSelectedProject(project)}
                >
                  Learn More <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Project Detail Dialog */}
      <Dialog open={!!selectedProject} onOpenChange={(open) => !open && setSelectedProject(null)}>
        <DialogContent className="sm:max-w-3xl max-h-[90vh] overflow-y-auto glass-card border-none p-0 outline-none shadow-2xl scrollbar-thin scrollbar-thumb-primary/20">
          {selectedProject && (
            <div className="flex flex-col">
              <div className="relative aspect-video lg:aspect-[21/9]">
                <img 
                  src={selectedProject.image} 
                  alt={selectedProject.title}
                  className="w-full h-full object-cover"
                />
                <button 
                  className={cn(buttonVariants({ variant: "secondary", size: "icon" }), "absolute top-4 right-4 rounded-full backdrop-blur-md bg-black/40 border-white/10")}
                  onClick={() => setSelectedProject(null)}
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="p-8 md:p-12 space-y-10">
                <div className="space-y-6">
                  <div className="flex gap-2 flex-wrap">
                    {selectedProject.tags?.map((tag: string) => (
                      <Badge key={tag} variant="secondary" className="bg-primary/20 text-primary border-none font-mono uppercase text-[10px] tracking-widest">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <DialogTitle className="text-4xl md:text-5xl font-display font-bold leading-tight tracking-tighter">
                    {selectedProject.title}
                  </DialogTitle>
                </div>

                <div className="prose prose-invert max-w-none">
                  <DialogDescription className="text-lg text-foreground/80 leading-relaxed font-sans whitespace-pre-wrap">
                    {selectedProject.fullStory || `
                      This project demonstrates advanced implementation of modern web standards and user-centric design principles. Integrated within a professional ecosystem, it showcases technical agility and attention to detail.
                    `}
                  </DialogDescription>
                </div>

                <div className="grid sm:grid-cols-2 gap-4 pt-8 border-t border-white/10">
                  <a 
                    href={selectedProject.github} 
                    target="_blank" 
                    rel="noreferrer"
                    className={cn(buttonVariants({ variant: "outline" }), "rounded-full w-full h-12 text-base font-bold bg-white/5 border-white/10 hover:bg-white/10")}
                  >
                    <Github className="mr-2 h-5 w-5" /> Repository
                  </a>
                  <a 
                    href={selectedProject.live} 
                    target="_blank" 
                    rel="noreferrer"
                    className={cn(buttonVariants({ variant: "default" }), "rounded-full w-full h-12 text-base font-bold shadow-lg shadow-primary/20")}
                  >
                    <Globe className="mr-2 h-5 w-5" /> Explore Live Site
                  </a>
                </div>

                <div className="flex justify-center pt-4">
                  <Button 
                    variant="ghost" 
                    onClick={() => setSelectedProject(null)}
                    className="text-muted-foreground hover:text-primary gap-2"
                  >
                    <ArrowLeft className="h-4 w-4" /> Back to My Work
                  </Button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}

function ArrowLeft({ className }: { className?: string }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <path d="m12 19-7-7 7-7"/><path d="M19 12H5"/>
    </svg>
  );
}

function ArrowRight({ className }: { className?: string }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
    </svg>
  );
}
