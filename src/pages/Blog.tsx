import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button, buttonVariants } from '@/components/ui/button';
import { Search, Calendar, User, Clock, Share2, X, ArrowLeft } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { cn } from '@/lib/utils';

const mockPosts = [
  {
    id: '1',
    title: 'How I built my Portfolio with AI',
    date: 'April 15, 2026',
    author: 'Rajnish Kumar',
    readTime: '5 min read',
    excerpt: 'Exploring the boundary between human creativity and AI-powered development tools...',
    content: `
      ## The Convergence of Human & Artificial Intelligence
      Implementing a high-performance portfolio in 2026 isn't just about writing code; it's about orchestrating AI agents to handle the boilerplate while focusing on design and logic.
      
      ### Why AI-First Development?
      The speed of iteration is the primary advantage. What used to take days—setting up a responsive grid, configuring a CMS, and styling components—now happens in minutes. I used localized AI agents to build the glassmorphism UI seen on this site.
      
      #### Technical Implementation
      I leveraged React 19 and Tailwind CSS. The AI helped optimize the GSAP animations for smoother performance on mobile devices.
      
      ### The Human Touch
      While AI wrote the initial scaffolding, the design recipes, typography pairings, and interaction nuances were handcrafted to ensure a unique "premium" feel that generic generators lack.
    `,
    tags: ['AI', 'Tech', 'Web Dev'],
    image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=60&w=600&h=300'
  },
  {
    id: '2',
    title: 'My Journey through BCA 1st Year',
    date: 'March 20, 2026',
    author: 'Rajnish Kumar',
    readTime: '8 min read',
    excerpt: 'Sharing my experiences, the challenges I faced, and how I ranked 1st in my college...',
    content: `
      ## The Academic Leap
      Starting a BCA during the AI revolution has been a transformation. I entered my first year at St. Xavier's with a passion for logic and left with a deep understanding of software engineering fundamentals.
      
      ### Ranking 1st in Class
      Achieving the first rank wasn't about rote learning. It was about applying academic concepts to real projects. My "Automated Result Generator" was born out of a desire to help my peers understand their data better.
      
      #### Key Learnings
      - Data Structures aren't just for interviews; they're the DNA of efficient apps.
      - Networking and peer collaboration are as important as solo coding sessions.
    `,
    tags: ['Personal', 'Education'],
    image: 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?auto=format&fit=crop&q=60&w=600&h=300'
  },
  {
    id: '3',
    title: 'Automating Student Results with Python',
    date: 'February 10, 2026',
    author: 'Rajnish Kumar',
    readTime: '6 min read',
    excerpt: 'A deep dive into the technical details of the PDF Generator project using Pandas...',
    content: `
      ## Solving Real Problems
      The "Automated Result Generator" is more than a Python script. It's a solution that saves teachers 40+ hours per semester.
      
      ### The Tech Stack
      - **Python**: The engine.
      - **Pandas**: For heavy Excel data lifting.
      - **FPDF2**: For generating millimetre-perfect PDF layouts.
      
      #### The Challenge
      Parsing inconsistent Excel data from different departments. I implemented a fuzzy-matching logic to normalize student names and IDs across disparate spreadsheets.
    `,
    tags: ['Python', 'Automation'],
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=60&w=600&h=300'
  }
];

export default function Blog() {
  const [search, setSearch] = useState('');
  const [selectedPost, setSelectedPost] = useState<typeof mockPosts[0] | null>(null);
  
  const filteredPosts = mockPosts.filter(post => 
    post.title.toLowerCase().includes(search.toLowerCase()) ||
    post.tags.some(tag => tag.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="pt-32 pb-24 container mx-auto px-6">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-6xl font-display font-bold mb-4">The Digital Journal</h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Insights, tutorials, and personal reflections on my journey as a student and developer.
        </p>
      </div>

      <div className="max-w-xl mx-auto mb-12 relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
        <Input 
          className="pl-12 rounded-full h-12 glass" 
          placeholder="Search articles..." 
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredPosts.map((post, index) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            onClick={() => setSelectedPost(post)}
          >
            <Card className="glass-card border-none overflow-hidden group cursor-pointer h-full flex flex-col hover:border-primary/20 transition-all border border-transparent">
              <div className="aspect-video overflow-hidden relative">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <Badge className="bg-white text-black font-bold">Read Article</Badge>
                </div>
              </div>
              <CardHeader>
                <div className="flex justify-between items-center mb-2">
                  <p className="text-xs text-muted-foreground font-medium uppercase tracking-widest">{post.date}</p>
                </div>
                <CardTitle className="group-hover:text-primary transition-colors text-xl leading-tight">{post.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-muted-foreground text-sm line-clamp-3 mb-6">
                  {post.excerpt}
                </p>
                <div className="flex gap-2 flex-wrap">
                  {post.tags.map(tag => (
                    <Badge key={tag} variant="secondary" className="bg-primary/5 text-primary text-[10px]">
                      #{tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Article Detail Dialog */}
      <Dialog open={!!selectedPost} onOpenChange={(open) => !open && setSelectedPost(null)}>
        <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-y-auto glass-card border-none p-0 outline-none shadow-2xl scrollbar-thin scrollbar-thumb-primary/20">
          {selectedPost && (
            <div className="flex flex-col">
              <div className="relative aspect-video lg:aspect-[21/9]">
                <img 
                  src={selectedPost.image} 
                  alt={selectedPost.title}
                  className="w-full h-full object-cover"
                />
                <button 
                  className={cn(buttonVariants({ variant: "secondary", size: "icon" }), "absolute top-4 right-4 rounded-full backdrop-blur-md bg-black/40 border-white/10")}
                  onClick={() => setSelectedPost(null)}
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="p-8 md:p-16 space-y-10">
                <div className="space-y-6">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground uppercase tracking-widest font-mono">
                    <span className="flex items-center gap-1.5"><Calendar size={14} /> {selectedPost.date}</span>
                    <span className="w-1 h-1 rounded-full bg-muted-foreground" />
                    <span className="flex items-center gap-1.5"><Clock size={14} /> {selectedPost.readTime}</span>
                  </div>
                  <DialogTitle className="text-4xl md:text-6xl font-display font-bold leading-[0.9] tracking-tighter">
                    {selectedPost.title}
                  </DialogTitle>
                  <div className="flex items-center gap-3 pt-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary">
                      {selectedPost.author.charAt(0)}
                    </div>
                    <div>
                      <p className="font-bold text-foreground">{selectedPost.author}</p>
                      <p className="text-xs text-muted-foreground">Author & Developer</p>
                    </div>
                    <Button variant="outline" size="icon" className="ml-auto rounded-full border-white/10">
                      <Share2 size={18} />
                    </Button>
                  </div>
                </div>

                <div className="prose prose-invert max-w-none">
                  <DialogDescription className="text-xl text-foreground/90 leading-relaxed font-sans whitespace-pre-wrap">
                    {selectedPost.content}
                  </DialogDescription>
                </div>

                <div className="pt-12 border-t border-white/10 flex flex-col items-center gap-8">
                  <div className="bg-primary/5 p-8 rounded-3xl text-center max-w-2xl">
                    <h4 className="text-2xl font-display font-bold mb-3">Enjoyed this article?</h4>
                    <p className="text-muted-foreground mb-6">
                      I write about modern development, AI integration, and the journey of a computer science student. 
                      Feel free to reach out if you have questions!
                    </p>
                    <div className="flex justify-center gap-4">
                      <Button className="rounded-full px-8">Follow Me</Button>
                      <Button variant="outline" className="rounded-full px-8 border-white/10">Next Article</Button>
                    </div>
                  </div>
                  
                  <Button 
                    variant="ghost" 
                    onClick={() => setSelectedPost(null)}
                    className="text-muted-foreground hover:text-primary gap-2"
                  >
                    <ArrowLeft className="h-4 w-4" /> Back to Digital Journal
                  </Button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
