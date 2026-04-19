import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Bot, User, Sparkles, ChevronDown } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { ScrollArea } from './ui/scroll-area';
import { getGeminiResponse } from '../lib/gemini';

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    { id: '1', role: 'bot', text: "Hi! I'm Rajnish's AI assistant. Ask me anything about his skills, projects, or background!" }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = (behavior: ScrollBehavior = 'smooth') => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior });
    }
  };

  // Auto-scroll to bottom whenever messages or loading state changes
  useEffect(() => {
    scrollToBottom('smooth');
  }, [messages, isLoading, isOpen]);

  // Focus input when chatbot opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.currentTarget;
    const isAtBottom = target.scrollHeight - target.scrollTop <= target.clientHeight + 100;
    setShowScrollButton(!isAtBottom);
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = input;
    const userMsgId = Date.now().toString();
    setInput('');
    setMessages(prev => [...prev, { id: userMsgId, role: 'user', text: userMsg }]);
    setIsLoading(true);

    try {
      const historyText = messages.slice(-5).map(m => `${m.role}: ${m.text}`).join('\n');
      const response = await getGeminiResponse(userMsg, historyText);
      setMessages(prev => [...prev, { id: (Date.now() + 1).toString(), role: 'bot', text: response }]);
    } catch (error) {
      setMessages(prev => [...prev, { id: (Date.now() + 2).toString(), role: 'bot', text: "Sorry, I'm having trouble connecting right now. Please try again later!" }]);
    } finally {
      setIsLoading(false);
      setTimeout(() => inputRef.current?.focus(), 10);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="mb-4 w-[350px] md:w-[400px] h-[500px] glass-card rounded-3xl flex flex-col overflow-hidden shadow-2xl"
          >
            <div className="p-4 bg-primary text-primary-foreground flex justify-between items-center shrink-0">
              <div className="flex items-center space-x-2">
                <div className="p-1.5 bg-white/20 rounded-lg">
                  <Bot size={20} />
                </div>
                <div>
                  <p className="font-bold text-sm">Rajnish AI</p>
                  <p className="text-[10px] opacity-80 flex items-center">
                    <span className="w-1.5 h-1.5 bg-green-400 rounded-full mr-1.5 animate-pulse" />
                    Online & Ready
                  </p>
                </div>
              </div>
              <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="hover:bg-white/10">
                <X size={20} />
              </Button>
            </div>

            <div className="flex-grow overflow-hidden relative">
              <ScrollArea 
                className="h-full px-4 pt-4" 
                onScrollCapture={handleScroll}
              >
                <div className="space-y-4 pb-4">
                  {messages.map((msg) => (
                    <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} mb-2`}>
                      <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                        msg.role === 'user' 
                          ? 'bg-primary text-primary-foreground rounded-tr-none' 
                          : 'bg-muted text-foreground rounded-tl-none'
                      }`}>
                        {msg.text}
                      </div>
                    </div>
                  ))}
                  {isLoading && (
                    <div className="flex justify-start mb-4">
                      <div className="bg-muted p-3 rounded-2xl rounded-tl-none flex space-x-1">
                        <span className="w-1.5 h-1.5 bg-foreground/30 rounded-full animate-bounce" />
                        <span className="w-1.5 h-1.5 bg-foreground/30 rounded-full animate-bounce delay-75" />
                        <span className="w-1.5 h-1.5 bg-foreground/30 rounded-full animate-bounce delay-150" />
                      </div>
                    </div>
                  )}
                  <div ref={scrollRef} />
                </div>
              </ScrollArea>
              
              <AnimatePresence>
                {showScrollButton && (
                  <motion.button
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    onClick={() => scrollToBottom()}
                    className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground p-2 rounded-full shadow-lg hover:scale-110 transition-transform z-10"
                  >
                    <ChevronDown size={20} />
                  </motion.button>
                )}
              </AnimatePresence>
            </div>

            <div className="p-4 border-t bg-background/50 shrink-0">
              <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="flex space-x-2">
                <Input 
                  ref={inputRef}
                  value={input} 
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask me anything..." 
                  className="rounded-full bg-background border-none ring-1 ring-primary/20"
                />
                <Button 
                  type="submit" 
                  size="icon" 
                  className="rounded-full shrink-0"
                  disabled={isLoading || !input.trim()}
                >
                  <Send size={18} />
                </Button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Button
        onClick={() => setIsOpen(!isOpen)}
        size="lg"
        className="h-14 w-14 rounded-full shadow-lg group relative overflow-hidden"
      >
        <span className="absolute inset-0 bg-gradient-to-tr from-primary to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity" />
        {isOpen ? <X className="relative z-10" /> : <MessageSquare className="relative z-10" />}
        {!isOpen && (
          <span className="absolute -top-1 -right-1 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-primary border-2 border-background"></span>
          </span>
        )}
      </Button>
    </div>
  );
}
