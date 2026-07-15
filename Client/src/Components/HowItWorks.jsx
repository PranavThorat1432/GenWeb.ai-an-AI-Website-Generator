import { motion } from 'motion/react';
import { Terminal, Cpu, Edit3, Rocket } from 'lucide-react';

const HowItWorks = () => {
  const steps = [
    {
      number: "01",
      icon: <Terminal className="text-indigo-400" size={20} />,
      title: "Write a Prompt",
      subtitle: "Describe your concept",
      description: "Type a short description like 'Landing page for a crypto portfolio tracker with neon blue highlights and glassmorphic pricing cards.'"
    },
    {
      number: "02",
      icon: <Cpu className="text-purple-400" size={20} />,
      title: "AI Generates Code",
      subtitle: "Instant styling & markup",
      description: "Watch the generative engine write structured code, style it using modern Tailwind utilities, and render a live frame in under 30 seconds."
    },
    {
      number: "03",
      icon: <Edit3 className="text-pink-400" size={20} />,
      title: "Customize & Refine",
      subtitle: "Fine-tune with ease",
      description: "Iterate by prompting the AI to modify sections, colors, images, or adjust code directly inside the built-in IDE console."
    },
    {
      number: "04",
      icon: <Rocket className="text-emerald-400" size={20} />,
      title: "Deploy Live",
      subtitle: "Publish to the world",
      description: "Push the deploy button to host your custom site on secure servers. Copy your live shareable link with one click."
    }
  ];

  return (
    <section className="relative max-w-7xl mx-auto px-6 py-24 z-10 overflow-hidden">
      {/* Background glow side elements */}
      <div className="absolute right-0 top-1/4 w-[400px] h-[400px] bg-purple-500/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute left-0 bottom-1/4 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="text-center mb-20">
        <h2 className="text-xs font-semibold tracking-wider text-indigo-400 uppercase mb-3">Workflow</h2>
        <h3 className="text-3xl md:text-5xl font-bold tracking-tight">
          How it works in <span className="bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">4 simple steps</span>
        </h3>
        <p className="mt-4 text-zinc-400 max-w-xl mx-auto text-base">
          From description to live URL in under a minute. Here is a breakdown of the production pipeline.
        </p>
      </div>

      <div className="relative">
        {/* Connection Line (Desktop only) */}
        <div className="hidden lg:block absolute top-[92px] left-[12.5%] right-[12.5%] h-0.5 bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-emerald-500/20 z-0" />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 relative z-10">
          {steps.map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              className="flex flex-col items-center text-center group"
            >
              {/* Step indicator node */}
              <div className="relative mb-6">
                <div className="w-16 h-16 rounded-full bg-[#0b0b0b] border border-white/10 flex items-center justify-center group-hover:border-indigo-500/50 transition-colors duration-300 shadow-xl">
                  {step.icon}
                </div>
                {/* Glowing step label badge */}
                <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-indigo-500 text-white font-bold text-xs flex items-center justify-center border border-black shadow-[0_0_15px_rgba(99,102,241,0.5)]">
                  {step.number}
                </div>
              </div>

              <div className="flex flex-col gap-2 px-4">
                <span className="text-[10px] uppercase tracking-wider text-indigo-400 font-semibold">{step.subtitle}</span>
                <h4 className="text-lg font-bold text-white group-hover:text-indigo-300 transition-colors duration-200">{step.title}</h4>
                <p className="text-sm text-zinc-400 leading-relaxed mt-2">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
