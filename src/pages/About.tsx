import React from 'react';
import { Mail, Linkedin, Cpu, Award } from 'lucide-react';
import SEO from '../components/SEO';
import { SectionTitle } from '../components/ui/SectionTitle';
import { GlassCard } from '../components/ui/GlassCard';

export const About: React.FC = () => {
  const team = [
    {
      name: 'Dr. Elena Rostova',
      role: 'Chief Technology Officer & Founder',
      bio: 'Dr. Rostova leads the gantry motion systems and material research laboratory. Previously a Senior Robotics Researcher at Munich Technical University, she holds 14 patents in closed-loop thermal control systems and high-temperature polymer extrusion.',
      email: 'e.rostova@coredocklab.com',
      linkedin: 'https://linkedin.com',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400&h=400',
      stats: '14+ Patents'
    },
    {
      name: 'Marcus Vance',
      role: 'Lead Software Architect & Co-Founder',
      bio: 'Marcus designs the low-latency firmware and secure fleet telemetry APIs. With over 12 years of experience in aerospace control loops, RTOS execution, and embedded software systems, he ensures sub-50µm structural gantry alignment.',
      email: 'm.vance@coredocklab.com',
      linkedin: 'https://linkedin.com',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400&h=400',
      stats: '12+ Years Exp'
    }
  ];

  return (
    <div className="space-y-12">
      <SEO
        title="About Our Founders"
        description="Meet the core engineering team behind Coredock Lab's industrial additive manufacturing gantries."
      />

      <SectionTitle
        title="Engineering Pioneers"
        tagline="Core Team"
        subtitle="We build high-precision thermal enclosures and water-cooled extrusion systems designed for aerospace, defense, and high-performance engineering polymers."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {team.map((person) => (
          <GlassCard key={person.name} className="flex flex-col h-full group p-6 border-border-primary/80 hover:border-brand-primary/40 transition-all duration-300 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-brand-primary/5 rounded-full blur-2xl pointer-events-none group-hover:bg-brand-primary/10 transition-all duration-300"></div>
            
            <div className="flex flex-col items-center text-center sm:text-left sm:flex-row gap-6 mb-6">
              <div className="relative flex-shrink-0">
                <img
                  src={person.avatar}
                  alt={person.name}
                  className="w-24 h-24 rounded-lg object-cover border border-border-primary/80 group-hover:border-brand-primary/50 transition-all duration-300"
                />
                <span className="absolute -bottom-2 -right-2 px-2 py-0.5 rounded bg-bg-surface border border-border-primary text-[8px] font-mono text-brand-primary font-bold uppercase tracking-wider">
                  {person.stats}
                </span>
              </div>

              <div className="space-y-2">
                <h3 className="font-outfit font-bold text-lg text-text-primary group-hover:text-brand-primary transition-all duration-300">
                  {person.name}
                </h3>
                <span className="text-[10px] font-mono text-text-muted uppercase tracking-widest block font-semibold">
                  {person.role}
                </span>
                
                <div className="flex justify-center sm:justify-start gap-2.5 pt-1">
                  <a
                    href={`mailto:${person.email}`}
                    className="p-1.5 rounded bg-bg-surface border border-border-primary text-text-secondary hover:text-white hover:border-brand-primary transition-all duration-200"
                    title="Send Email"
                  >
                    <Mail className="w-3.5 h-3.5" />
                  </a>
                  <a
                    href={person.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="p-1.5 rounded bg-bg-surface border border-border-primary text-text-secondary hover:text-white hover:border-brand-primary transition-all duration-200"
                    title="LinkedIn Profile"
                  >
                    <Linkedin className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>

            <p className="text-xs text-text-secondary leading-relaxed mt-auto border-t border-border-primary/60 pt-4">
              {person.bio}
            </p>

            <div className="flex gap-4 mt-6 pt-4 border-t border-border-primary/60">
              <div className="flex items-center gap-1.5 text-[9px] text-text-muted font-mono uppercase">
                <Cpu className="w-3 h-3 text-brand-primary" />
                <span>Motion Controls</span>
              </div>
              <div className="flex items-center gap-1.5 text-[9px] text-text-muted font-mono uppercase">
                <Award className="w-3 h-3 text-brand-primary" />
                <span>Aerospace SLA</span>
              </div>
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
};

export default About;
