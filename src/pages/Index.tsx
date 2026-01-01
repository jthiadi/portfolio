import { Suspense } from 'react';
import { motion } from 'framer-motion';
import { RobotScene } from '@/components/RobotScene';
import { ProjectCard } from '@/components/ProjectCard';
import { Footer } from '@/components/Footer';
import { Loader2 } from 'lucide-react';
import { useGitHubRepos } from '@/hooks/use-github-repos';

const GITHUB_USERNAME = 'jthiadi';

function LoadingFallback() {
  return (
    <div className="w-full h-[450px] md:h-[550px] flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <Loader2 className="w-8 h-8 text-primary animate-spin" />
        <span className="text-muted-foreground font-display text-sm">Loading...</span>
      </div>
    </div>
  );
}

const Index = () => {
  const { repos, loading: reposLoading, error: reposError } = useGitHubRepos(GITHUB_USERNAME);
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background gradient effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/10 rounded-full blur-3xl" />
      </div>

      <main className="relative z-10">
        {/* Hero Section - Robot First */}
        <section className="pt-8 pb-4 px-6">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-center gap-2 mb-4"
          >
          </motion.div>

          {/* 3D Robot Scene */}
          <Suspense fallback={<LoadingFallback />}>
            <RobotScene />
          </Suspense>
        </section>

        {/* Name Section */}
        <section className="py-8 px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-center"
          >
            <h1 className="font-display text-4xl md:text-6xl lg:text-7xl mb-4">
              <span className="text-foreground">Justin</span>
              <span className="metal-text"> Thiadi</span>
            </h1>
            <p className="text-muted-foreground font-body text-lg md:text-xl">
              Developer • Creator • Builder
            </p>
          </motion.div>
        </section>

        {/* About Section */}
        <section id="about" className="py-16 px-6">
          <div className="container mx-auto max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="card-metal rounded-lg p-8 md:p-12 texture-kraft relative"
            >
              {/* Corner rivets */}
              <div className="absolute top-4 left-4 rivet" />
              <div className="absolute top-4 right-4 rivet" />
              <div className="absolute bottom-4 left-4 rivet" />
              <div className="absolute bottom-4 right-4 rivet" />

              <div className="flex items-center gap-4 mb-6">
                <div className="w-4 h-4 gauge-indicator" />
                <h2 className="font-display text-2xl md:text-3xl text-foreground">
                  About <span className="text-primary">Me</span>
                </h2>
              </div>

              <p className="text-muted-foreground font-body leading-relaxed mb-4">
                I'm a passionate developer who loves building things that live on the internet. 
                My interest in web development started back when I first discovered how websites work,
                and I've been hooked ever since.
              </p>
              <p className="text-muted-foreground font-body leading-relaxed">
                When I'm not coding, you can find me exploring new technologies, contributing to 
                open source, or tinkering with side projects. I believe in writing clean, 
                maintainable code and creating user experiences that just work.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-16 px-6">
          <div className="container mx-auto max-w-5xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <div className="flex items-center justify-center gap-4 mb-4">
                <div className="h-px w-12 bg-border" />
                <span className="font-display text-sm text-muted-foreground tracking-widest">PROJECTS</span>
                <div className="h-px w-12 bg-border" />
              </div>
              <h2 className="font-display text-3xl md:text-4xl text-foreground">
                Featured <span className="text-primary">Work</span>
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {reposLoading ? (
                <div className="col-span-full flex justify-center py-12">
                  <Loader2 className="w-8 h-8 text-primary animate-spin" />
                </div>
              ) : reposError ? (
                <div className="col-span-full text-center py-12 text-muted-foreground">
                  Unable to load repositories. Please check the username.
                </div>
              ) : repos.length === 0 ? (
                <div className="col-span-full text-center py-12 text-muted-foreground">
                  No repositories found.
                </div>
              ) : (
                repos.map((repo, index) => (
                  <ProjectCard
                    key={repo.id}
                    title={repo.name}
                    description={repo.description || 'No description available'}
                    tech={repo.language ? [repo.language, ...repo.topics.slice(0, 2)] : repo.topics.slice(0, 3)}
                    github={repo.html_url}
                    demo={repo.homepage || undefined}
                    stars={repo.stargazers_count}
                    forks={repo.forks_count}
                    index={index}
                  />
                ))
              )}
            </div>
          </div>
        </section>
      </main>

      <Footer 
        githubUrl="https://github.com/jthiadi" 
        linkedinUrl="https://linkedin.com/in/jthiadi" 
      />
    </div>
  );
};

export default Index;