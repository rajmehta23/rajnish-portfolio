import { useState, useEffect } from 'react';
import { auth, db } from '../lib/firebase';
import { 
  signInWithPopup, 
  GoogleAuthProvider, 
  onAuthStateChanged, 
  signOut,
  User 
} from 'firebase/auth';
import { 
  collection, 
  getDocs, 
  addDoc, 
  deleteDoc, 
  doc, 
  updateDoc,
  serverTimestamp,
  orderBy,
  query,
  limit
} from 'firebase/firestore';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, 
  Trash2, 
  LogOut, 
  LayoutDashboard, 
  Briefcase, 
  Code, 
  MessageCircle, 
  FileText,
  ShieldCheck,
  Settings,
  Edit,
  ExternalLink,
  Eye,
  CheckCircle2,
  Clock,
  Database,
  ArrowRight
} from 'lucide-react';
import { Button, buttonVariants } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

export default function Admin() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const handleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      toast.success('Logged in successfully!');
    } catch (error) {
      toast.error('Login failed. Please try again.');
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    toast.info('Logged out.');
  };

  if (loading) return (
    <div className="pt-32 flex justify-center items-center min-h-[60vh]">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
    </div>
  );

  if (!user) return (
    <div className="pt-40 container mx-auto px-6 max-w-md text-center">
      <div className="p-10 glass-card rounded-3xl border-primary/20 border shadow-2xl">
        <div className="w-20 h-20 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-8 animate-pulse">
          <ShieldCheck className="w-12 h-12 text-primary" />
        </div>
        <h1 className="text-3xl font-display font-bold mb-4 tracking-tight">Admin Hub</h1>
        <p className="text-muted-foreground mb-8 text-sm leading-relaxed">
          Secure portal to manage your portfolio content, real-time analytics, and visitor interactions.
        </p>
        <Button onClick={handleLogin} className="w-full rounded-full h-12 text-lg shadow-lg hover:shadow-primary/20 transition-all font-bold" size="lg">
          Authenticate with Google
        </Button>
      </div>
    </div>
  );

  return (
    <div className="pt-24 pb-24 container mx-auto px-6">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6"
      >
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary/20 rounded-xl flex items-center justify-center">
              <LayoutDashboard className="text-primary h-6 w-6" />
            </div>
            <h1 className="text-4xl font-display font-bold tracking-tight">System Control</h1>
          </div>
          <p className="text-muted-foreground flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            Active Session: {user.displayName}
          </p>
        </div>
        <div className="flex gap-4">
          <Button onClick={handleLogout} variant="outline" className="rounded-full px-6 border-white/10 hover:bg-destructive/10 hover:text-destructive transition-colors">
            <LogOut className="mr-2 h-4 w-4" /> Secure Logout
          </Button>
        </div>
      </motion.div>

      <Tabs defaultValue="projects" className="space-y-10">
        <div className="flex overflow-x-auto pb-2 -mx-2 px-2 scrollbar-none sticky top-24 z-40">
          <TabsList className="glass-pills h-14 p-1.5 rounded-full border border-white/5 bg-black/40 backdrop-blur-xl shrink-0">
            <TabsTrigger value="projects" className="rounded-full px-8 h-full data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all">
              <Briefcase className="mr-2 h-4 w-4" /> Projects
            </TabsTrigger>
            <TabsTrigger value="skills" className="rounded-full px-8 h-full data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all">
              <Code className="mr-2 h-4 w-4" /> Skills
            </TabsTrigger>
            <TabsTrigger value="messages" className="rounded-full px-8 h-full data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all">
              <MessageCircle className="mr-2 h-4 w-4" /> Inbound
            </TabsTrigger>
            <TabsTrigger value="blog" className="rounded-full px-8 h-full data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all">
              <FileText className="mr-2 h-4 w-4" /> Content
            </TabsTrigger>
            <TabsTrigger value="system" className="rounded-full px-8 h-full data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all">
              <Database className="mr-2 h-4 w-4" /> System
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="projects" className="outline-none focus-visible:ring-0">
          <AdminProjects />
        </TabsContent>
        
        <TabsContent value="messages" className="outline-none">
          <AdminMessages />
        </TabsContent>

        <TabsContent value="skills">
           <div className="glass-card p-16 text-center rounded-[2rem] border-white/5">
              <div className="w-20 h-20 bg-muted rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Code className="w-10 h-10 text-muted-foreground" />
              </div>
              <h3 className="text-2xl font-bold mb-2">Technical Arsenal</h3>
              <p className="text-muted-foreground mb-8 max-w-md mx-auto">Manage your professional skills, proficiency levels, and tech stack categories.</p>
              <Button disabled className="rounded-full px-10 border-dashed">Module Under Construction</Button>
           </div>
        </TabsContent>

        <TabsContent value="system">
          <AdminSystem />
        </TabsContent>
      </Tabs>
    </div>
  );
}

function AdminProjects() {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [newProject, setNewProject] = useState({ 
    title: '', 
    description: '', 
    image: '', 
    tags: '',
    github: '#',
    live: '#'
  });

  const fetchProjects = async () => {
    setLoading(true);
    const q = query(collection(db, 'projects'), orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    setProjects(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    setLoading(false);
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProject.title) return;
    
    try {
      const tagsArray = newProject.tags.split(',').map(s => s.trim()).filter(Boolean);
      await addDoc(collection(db, 'projects'), {
        ...newProject,
        tags: tagsArray,
        createdAt: serverTimestamp()
      });
      setNewProject({ title: '', description: '', image: '', tags: '', github: '#', live: '#' });
      fetchProjects();
      toast.success('Project deployed successfully!');
    } catch (err) {
      toast.error('Failed to add project');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this project?')) return;
    await deleteDoc(doc(db, 'projects', id));
    fetchProjects();
    toast.error('Project removed from database');
  };

  return (
    <div className="grid lg:grid-cols-3 gap-10">
      <div className="lg:col-span-1">
        <Card className="glass-card border-white/5 rounded-[2rem] sticky top-44 shadow-xl">
          <CardHeader>
            <CardTitle className="text-xl">Project Architect</CardTitle>
            <CardDescription>Deploy a new project to your portfolio</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-5" onSubmit={handleAdd}>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Title</label>
                <Input 
                  value={newProject.title} 
                  onChange={(e) => setNewProject({...newProject, title: e.target.value})}
                  placeholder="e.g., Weather App" 
                  className="rounded-xl border-white/10 bg-black/20 focus:bg-black/40 transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Description</label>
                <Textarea 
                  value={newProject.description}
                  onChange={(e) => setNewProject({...newProject, description: e.target.value})}
                  placeholder="Tell the story of this project..." 
                  rows={4}
                  className="rounded-xl border-white/10 bg-black/20 focus:bg-black/40 transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Image URL</label>
                <Input 
                  value={newProject.image} 
                  onChange={(e) => setNewProject({...newProject, image: e.target.value})}
                  placeholder="Unsplash or CDN link" 
                  className="rounded-xl border-white/10 bg-black/20"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Tags (comma separated)</label>
                <Input 
                  value={newProject.tags} 
                  onChange={(e) => setNewProject({...newProject, tags: e.target.value})}
                  placeholder="React, Tailwind, AI" 
                  className="rounded-xl border-white/10 bg-black/20"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">GitHub</label>
                  <Input 
                    value={newProject.github} 
                    onChange={(e) => setNewProject({...newProject, github: e.target.value})}
                    placeholder="#" 
                    className="rounded-xl border-white/10 bg-black/20"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Live URL</label>
                  <Input 
                    value={newProject.live} 
                    onChange={(e) => setNewProject({...newProject, live: e.target.value})}
                    placeholder="#" 
                    className="rounded-xl border-white/10 bg-black/20"
                  />
                </div>
              </div>
              <Button className="w-full rounded-xl h-11 font-bold shadow-lg shadow-primary/10 transition-all">
                <Plus className="mr-2 h-4 w-4" /> Deploy Project
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>

      <div className="lg:col-span-2 space-y-6">
        {loading ? (
          <div className="grid gap-4">
            {[1,2,3].map(i => <div key={i} className="h-24 glass animate-pulse rounded-2xl" />)}
          </div>
        ) : projects.length === 0 ? (
          <div className="p-20 glass rounded-[2.5rem] border border-dashed border-white/10 text-center space-y-4">
            <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mx-auto">
              <Database className="text-muted-foreground h-8 w-8" />
            </div>
            <div className="space-y-1">
              <h4 className="text-lg font-bold">Database Empty</h4>
              <p className="text-muted-foreground text-sm">Deploy your first project or use System Seed to populate.</p>
            </div>
          </div>
        ) : (
          <AnimatePresence>
            <div className="grid gap-6">
              {projects.map((p, idx) => (
                <motion.div
                  key={p.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                >
                  <Card className="glass-card border-white/5 group overflow-hidden rounded-[1.5rem] hover:bg-white/[0.03] transition-all duration-300">
                    <CardContent className="p-0 flex flex-col sm:flex-row">
                      <div className="sm:w-32 h-32 sm:h-auto shrink-0 overflow-hidden relative grayscale group-hover:grayscale-0 transition-all duration-500">
                        <img src={p.image} className="w-full h-full object-cover scale-105 group-hover:scale-100 transition-transform duration-500" />
                        <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                      <div className="p-6 flex-grow flex justify-between items-center gap-6">
                        <div className="space-y-2">
                          <div className="flex items-center gap-3">
                            <h4 className="text-xl font-bold tracking-tight">{p.title}</h4>
                            <div className="flex gap-1">
                              {p.tags?.slice(0, 2).map((t: string) => (
                                <Badge key={t} variant="outline" className="text-[10px] h-4 border-white/10">{t}</Badge>
                              ))}
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground line-clamp-1 max-w-sm">{p.description}</p>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="ghost" size="icon" className="rounded-full hover:bg-white/10">
                            <Edit size={16} className="text-muted-foreground" />
                          </Button>
                          <Button variant="ghost" size="icon" onClick={() => handleDelete(p.id)} className="rounded-full text-destructive hover:bg-destructive/10">
                            <Trash2 size={16} />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </AnimatePresence>
        )}
      </div>
    </div>
  );
}

function AdminMessages() {
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchMessages = async () => {
    setLoading(true);
    const q = query(collection(db, 'messages'), orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    setMessages(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    setLoading(false);
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleDelete = async (id: string) => {
    await deleteDoc(doc(db, 'messages', id));
    fetchMessages();
    toast.info('Message archived');
  };

  const markAsRead = async (id: string) => {
    await updateDoc(doc(db, 'messages', id), { status: 'read' });
    fetchMessages();
  };

  return (
    <div className="space-y-6">
      {loading ? (
        <div className="space-y-4">
           {[1,2,3].map(i => <div key={i} className="h-32 glass animate-pulse rounded-2xl" />)}
        </div>
      ) : messages.length === 0 ? (
        <div className="p-20 glass rounded-[2.5rem] text-center space-y-4 border border-white/5 shadow-inner">
          <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto">
            <MessageCircle className="text-muted-foreground h-8 w-8" />
          </div>
          <p className="text-muted-foreground">Inbound transmissions will appear here.</p>
        </div>
      ) : (
        <div className="grid gap-6">
          {messages.map((m) => (
            <Card key={m.id} className={cn("glass-card border-white/5 overflow-hidden transition-all duration-500", m.status === 'unread' ? 'border-primary/20 shadow-lg shadow-primary/5 bg-primary/[0.02]' : 'opacity-80')}>
              <div className="p-8 flex flex-col md:flex-row gap-8">
                <div className="md:w-64 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-lg font-bold">
                      {m.name.charAt(0)}
                    </div>
                    <div>
                      <div className="font-bold flex items-center gap-2">
                        {m.name}
                        {m.status === 'unread' && <div className="w-1.5 h-1.5 rounded-full bg-primary" />}
                      </div>
                      <div className="text-xs text-muted-foreground truncate max-w-[150px]">{m.email}</div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center text-xs text-muted-foreground gap-2">
                      <Clock size={12} /> {m.createdAt?.toDate().toLocaleDateString()}
                    </div>
                    <Badge variant={m.status === 'unread' ? 'default' : 'outline'} className="w-fit text-[10px] px-2 py-0 uppercase">
                      {m.status}
                    </Badge>
                  </div>
                </div>
                
                <div className="flex-grow space-y-4">
                   <h4 className="text-xl font-bold tracking-tight text-foreground">{m.subject}</h4>
                   <p className="text-muted-foreground text-sm leading-relaxed whitespace-pre-wrap">{m.message}</p>
                   
                   <div className="flex gap-3 pt-4 border-t border-white/5">
                      {m.status === 'unread' && (
                        <Button size="sm" onClick={() => markAsRead(m.id)} className="rounded-full px-5 h-8 text-xs font-bold">
                          <CheckCircle2 size={14} className="mr-2" /> Mark Handled
                        </Button>
                      )}
                      <Button size="sm" variant="ghost" onClick={() => handleDelete(m.id)} className="rounded-full px-5 h-8 text-xs font-bold text-destructive hover:bg-destructive/10">
                        <Trash2 size={14} className="mr-2" /> Archive
                      </Button>
                      <a 
                        href={`mailto:${m.email}`}
                        className={cn(buttonVariants({ variant: "outline", size: "sm" }), "rounded-full px-5 h-8 text-xs font-bold ml-auto border-white/10")}
                      >
                        Reply Via Email
                      </a>
                   </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

function AdminSystem() {
  const seedProjects = [
    {
      title: 'Weather Forecaster',
      description: 'A responsive web application that displays real-time weather, humidity, and atmospheric conditions dynamically using a weather API.',
      image: 'https://images.unsplash.com/photo-1592210454359-9043f067919b?auto=format&fit=crop&q=60&w=600&h=450',
      tags: ['HTML', 'CSS', 'JavaScript', 'Weather API'],
      github: '#',
      live: '#',
    },
    {
      title: 'Automated Result Generator',
      description: 'A Python-powered system designed to automate student result cards from Excel data, reducing manual processing errors by 90%.',
      image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=60&w=600&h=450',
      tags: ['Python', 'Pandas', 'Excel Automation'],
      github: '#',
      live: '#',
    },
    {
      title: 'Personal Premium Portfolio',
      description: 'A high-performance modern portfolio featuring glassmorphism UI, GSAP animations, and integrated Gemini AI chatbot.',
      image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=60&w=600&h=450',
      tags: ['React 19', 'Tailwind', 'GSAP', 'Firebase'],
      github: '#',
      live: '#',
    }
  ];

  const handleSeed = async () => {
    if (!confirm('This will populate your database with initial project data. Continue?')) return;
    
    try {
      const batch = seedProjects.map(proj => 
        addDoc(collection(db, 'projects'), {
          ...proj,
          createdAt: serverTimestamp()
        })
      );
      await Promise.all(batch);
      toast.success('Database seeded successfully!');
    } catch (err) {
      toast.error('Seeding failed');
    }
  };

  return (
    <div className="grid md:grid-cols-2 gap-8">
      <Card className="glass-card border-white/5 rounded-[2rem] overflow-hidden">
        <div className="bg-primary/10 p-8 flex items-center gap-6">
          <div className="w-16 h-16 bg-primary/20 rounded-2xl flex items-center justify-center">
            <Database className="text-primary h-8 w-8" />
          </div>
          <div>
            <h3 className="text-2xl font-bold">Data Maintenance</h3>
            <p className="text-sm text-primary/70">Initialize and manage system content</p>
          </div>
        </div>
        <CardContent className="p-8 space-y-6">
          <div className="space-y-2">
            <h4 className="font-bold">Seed Initial Content</h4>
            <p className="text-sm text-muted-foreground">Populate your portfolio with your core projects from the source code. Perfect for first-time setup.</p>
          </div>
          <Button onClick={handleSeed} className="w-full rounded-xl h-12 font-bold group">
            Run Database Seed <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </CardContent>
      </Card>

      <Card className="glass-card border-white/5 rounded-[2rem] bg-muted/5 opacity-50 cursor-not-allowed">
        <CardHeader className="p-8">
          <CardTitle className="flex items-center gap-2"><Settings className="h-5 w-5" /> Analytics Engine</CardTitle>
          <CardDescription>Track visitor metrics and site performance</CardDescription>
        </CardHeader>
        <CardContent className="p-8 pt-0">
          <div className="h-32 flex items-center justify-center border border-dashed border-white/10 rounded-2xl">
            <p className="text-xs font-mono uppercase tracking-[0.2em]">Module Locked</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
