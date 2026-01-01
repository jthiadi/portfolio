import { Github, Linkedin } from 'lucide-react';
import { motion } from 'framer-motion';

interface FooterProps {
  githubUrl: string;
  linkedinUrl: string;
}

export function Footer({ githubUrl, linkedinUrl }: FooterProps) {
  return (
    <footer className="border-t border-border py-12 mt-20">
      <div className="container mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="flex flex-col items-center gap-6"
        >
          {/* Decorative gauge */}
          <div className="flex items-center gap-4">
            <div className="w-3 h-3 gauge-indicator animate-pulse-glow" />
            <span className="font-display text-muted-foreground text-sm tracking-wider">
              CONNECT
            </span>
            <div className="w-3 h-3 gauge-indicator animate-pulse-glow" />
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-6">
            <motion.a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-5 py-3 rounded-lg bg-card border border-border hover:border-primary hover:bg-secondary transition-all group"
              aria-label="GitHub Profile"
            >
              <Github size={22} className="text-foreground group-hover:text-primary transition-colors" />
              <span className="font-display text-sm text-foreground group-hover:text-primary transition-colors">
                GitHub
              </span>
            </motion.a>

            <motion.a
              href={linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-5 py-3 rounded-lg bg-card border border-border hover:border-accent hover:bg-secondary transition-all group"
              aria-label="LinkedIn Profile"
            >
              <Linkedin size={22} className="text-foreground group-hover:text-accent transition-colors" />
              <span className="font-display text-sm text-foreground group-hover:text-accent transition-colors">
                LinkedIn
              </span>
            </motion.a>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}