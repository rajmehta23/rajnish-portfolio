import { Github, Linkedin, Mail, Twitter, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t bg-background/50 backdrop-blur-sm py-12">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-8">
          <div className="md:col-span-2">
            <h2 className="text-2xl font-display font-bold mb-4 tracking-tighter">
              RAJNISH<span className="text-primary">.DEV</span>
            </h2>
            <p className="text-muted-foreground mb-6 max-w-sm">
              Building futuristic digital experiences. Aspiring Software Developer 
              focused on quality, performance, and modern aesthetics.
            </p>
            <div className="flex space-x-4">
              <a href="https://github.com/rajnish-kumar-dev" target="_blank" rel="noreferrer" className="p-2 rounded-full border hover:bg-primary hover:text-primary-foreground transition-all">
                <Github size={18} />
              </a>
              <a href="https://www.linkedin.com/in/rajnish-kumar-25ab53346" target="_blank" rel="noreferrer" className="p-2 rounded-full border hover:bg-primary hover:text-primary-foreground transition-all">
                <Linkedin size={18} />
              </a>
              <a href="#" className="p-2 rounded-full border hover:bg-primary hover:text-primary-foreground transition-all">
                <Twitter size={18} />
              </a>
              <a href="mailto:rajnishkumarschool911@gmail.com" className="p-2 rounded-full border hover:bg-primary hover:text-primary-foreground transition-all">
                <Mail size={18} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="/" className="hover:text-primary transition-colors">Home</a></li>
              <li><a href="/blog" className="hover:text-primary transition-colors">Blog</a></li>
              <li><a href="/#projects" className="hover:text-primary transition-colors">Projects</a></li>
              <li><a href="/#skills" className="hover:text-primary transition-colors">Skills</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold mb-4">Contact</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Patna, Bihar, India</li>
              <li>rajnishkumarschool911@gmail.com</li>
              <li>+91 91131 69121</li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Rajnish Kumar. All rights reserved.</p>
          <p className="flex items-center">
            Made with <Heart size={14} className="mx-1 text-red-500 fill-red-500" /> in Patna
          </p>
        </div>
      </div>
    </footer>
  );
}
