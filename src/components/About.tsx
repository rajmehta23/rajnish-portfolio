import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from './ui/card';
import { GraduationCap, MapPin, Target, User, Award, ShieldCheck } from 'lucide-react';

export default function About() {
  const [imageError, setImageError] = useState(false);
  const timeline = [
    { year: '2024 - 2027', title: 'Bachelor of Computer Applications (BCA)', institution: "St. Xavier's College of Management & Technology", description: 'Ranked 1st in University/College internal rankings for the first academic year.' },
    { year: '2022 - 2024', title: 'Higher Secondary Education (CBSE 12th)', institution: 'Gyandeep High School', description: 'Science stream with a strong focus on Mathematics and Physics.' },
  ];

  return (
    <section id="about" className="container mx-auto px-6">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">About Me</h2>
        <div className="h-1.5 w-24 bg-primary mx-auto rounded-full" />
      </div>

      <div className="grid lg:grid-cols-12 gap-12 items-center">
        {/* Left Column: Image and Highlights */}
        <motion.div
          className="lg:col-span-5 space-y-8"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <div className="relative group w-full mx-auto lg:mx-0">
            <div className="absolute -inset-4 bg-primary/15 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            <div className="relative rounded-3xl overflow-hidden border-2 border-primary/20 bg-muted aspect-[4/5] shadow-2xl flex items-center justify-center p-0">
              {!imageError ? (
                <img 
                  src="about_me_image.jpeg"
                  alt="Rajnish Kumar" 
                  className="w-full h-full object-cover transition-all duration-700 hover:scale-110"
                  onError={() => setImageError(true)}
                />
              ) : (
                <div className="flex flex-col items-center text-primary/40 p-4 text-center">
                  <User size={64} strokeWidth={1} />
                  <p className="text-xs mt-2 opacity-50 uppercase tracking-tighter">Image Unavailable</p>
                </div>
              )}
              <div className="absolute bottom-6 left-6 right-6 p-6 glass rounded-2xl border border-white/10 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                    <Award size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm">Merit Certificate Holder</h4>
                    <p className="text-xs text-muted-foreground">St. Xavier's College Patna</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
             <Card className="glass-card border-white/5 hover:border-primary/20 transition-colors">
               <CardContent className="pt-6">
                 <div className="flex items-center gap-2 mb-2 text-primary font-bold">
                    <MapPin size={16} /> <span className="text-xs uppercase tracking-wider">Origin</span>
                 </div>
                 <p className="text-sm font-medium">Patna, Bihar, India</p>
               </CardContent>
             </Card>
             <Card className="glass-card border-white/5 hover:border-primary/20 transition-colors">
               <CardContent className="pt-6">
                 <div className="flex items-center gap-2 mb-2 text-primary font-bold">
                    <ShieldCheck size={16} /> <span className="text-xs uppercase tracking-wider">Status</span>
                 </div>
                 <p className="text-sm font-medium">Available for Internships</p>
               </CardContent>
             </Card>
          </div>
        </motion.div>

        {/* Right Column: Text and Education */}
        <div className="lg:col-span-7 space-y-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl font-display font-bold mb-6 flex items-center gap-3">
              <User className="text-primary" /> Passionate Developer
            </h3>
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              I'm <span className="text-foreground font-bold italic">Rajnish Kumar</span>, a dedicated Computer Applications student who believes in the intersection of elegant design and robust logic. Currently in my 2nd year of BCA, I have consistently balanced academic excellence with hands-on project building.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
               I specialize in creating professional web experiences that solve real problems. My journey at <span className="text-primary font-bold">St. Xavier's</span> has been marked by a strong commitment to learning modern technologies like React, Node.js, and Python-based automation.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl font-display font-bold mb-8 flex items-center gap-3">
              <GraduationCap className="text-primary" /> Academic Timeline
            </h3>
            <div className="space-y-10 relative before:absolute before:left-[17px] before:top-2 before:bottom-2 before:w-0.5 before:bg-primary/20">
              {timeline.map((item, index) => (
                <div key={index} className="relative pl-14">
                  <div className="absolute left-0 top-1.5 w-9 h-9 rounded-full bg-black flex items-center justify-center border-2 border-primary shadow-[0_0_15px_rgba(var(--primary),0.3)] z-10" />
                  <div className="space-y-1">
                    <p className="text-primary font-mono text-sm tracking-widest uppercase">{item.year}</p>
                    <h4 className="text-2xl font-bold tracking-tight">{item.title}</h4>
                    <p className="text-muted-foreground font-medium">{item.institution}</p>
                    <p className="text-muted-foreground/70 text-sm max-w-lg italic">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
