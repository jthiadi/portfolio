import { motion } from 'framer-motion';
import { Github, ExternalLink, Star, GitFork } from 'lucide-react';

interface ProjectCardProps {
  title: string;
  description: string;
  tech: string[];
  github: string;
  demo?: string;
  stars?: number;
  forks?: number;
  index: number;
}

export function ProjectCard({ 
  title, 
  description, 
  tech, 
  github, 
  demo, 
  stars = 0, 
  forks = 0, 
  index 
}: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="group card-metal rounded-lg p-6 hover-lift texture-kraft relative overflow-hidden"
    >
      {/* Rivets */}
      <div className="absolute top-3 left-3 rivet" />
      <div className="absolute top-3 right-3 rivet" />
      <div className="absolute bottom-3 left-3 rivet" />
      <div className="absolute bottom-3 right-3 rivet" />

      {/* Gauge indicator */}
      <div className="absolute top-4 right-12 w-6 h-6 gauge-indicator opacity-60 group-hover:opacity-100 transition-opacity" />

      <div className="relative z-10">
        <h3 className="font-display text-xl text-foreground mb-2 group-hover:text-primary transition-colors">
          {title}
        </h3>
        
        <p className="text-muted-foreground text-sm mb-4 leading-relaxed font-body">
          {description}
        </p>

        {/* Tech stack */}
        <div className="flex flex-wrap gap-2 mb-4">
          {tech.map((t) => (
            <span 
              key={t} 
              className="px-2 py-1 text-xs bg-secondary text-secondary-foreground rounded-md font-display"
            >
              {t}
            </span>
          ))}
        </div>

        {/* Stats & Links */}
        <div className="flex items-center justify-between pt-4 border-t border-border">
          <div className="flex items-center gap-4 text-muted-foreground text-sm">
            {stars > 0 && (
              <span className="flex items-center gap-1">
                <Star size={14} className="text-primary" />
                {stars}
              </span>
            )}
            {forks > 0 && (
              <span className="flex items-center gap-1">
                <GitFork size={14} />
                {forks}
              </span>
            )}
          </div>

          <div className="flex items-center gap-3">
            <a 
              href={github} 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-2 rounded-md bg-secondary hover:bg-primary hover:text-primary-foreground transition-all"
              aria-label="View on GitHub"
            >
              <Github size={18} />
            </a>
            {demo && (
              <a 
                href={demo} 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 rounded-md bg-secondary hover:bg-accent hover:text-accent-foreground transition-all"
                aria-label="View Demo"
              >
                <ExternalLink size={18} />
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}