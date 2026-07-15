import { motion } from 'motion/react';
import { Zap, Code, Cpu, Layers, Globe, PenTool } from 'lucide-react';

const Features = () => {
  const featuresList = [
    {
      icon: <Zap className="text-amber-400" size={24} />,
      title: "AI Prompt Engine",
      description: "Describe what you want and watch the AI translate it into a fully responsive, beautiful website in seconds."
    },
    {
      icon: <Layers className="text-indigo-400" size={24} />,
      title: "Visual Code Editor",
      description: "Fine-tune and customize sections, colors, typography, and structure with our inline workspace."
    },
    {
      icon: <Code className="text-emerald-400" size={24} />,
      title: "Clean Code Output",
      description: "No bloated builders. View, copy, and export structured HTML, CSS, and component codes instantly."
    },
    {
      icon: <Globe className="text-blue-400" size={24} />,
      title: "1-Click Hosting",
      description: "Launch your creation live on the web immediately with optimized production deployment and shared domains."
    },
    {
      icon: <Cpu className="text-purple-400" size={24} />,
      title: "Responsive by Design",
      description: "Every block is built mobile-first, ensuring high performance and styling parity across all screens."
    },
    {
      icon: <PenTool className="text-rose-400" size={24} />,
      title: "AI Chat Updates",
      description: "Conversational editing allows you to ask the AI to change sections or elements block-by-block."
    }
  ];

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100, damping: 15 }
    }
  };

  return (
    <section className="relative max-w-7xl mx-auto px-6 py-24 z-10">
      {/* Background glow behind features */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-indigo-500/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="text-center mb-16 relative">
        <h2 className="text-xs font-semibold tracking-wider text-indigo-400 uppercase mb-3">Core Capabilities</h2>
        <h3 className="text-3xl md:text-5xl font-bold tracking-tight">
          Everything you need to <br />
          <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">create in minutes</span>
        </h3>
        <p className="mt-4 text-zinc-400 max-w-2xl mx-auto text-base">
          Stop writing boilerplate. GenWeb.ai handles the layout, styling, scripting, and deployment so you can focus on the vision.
        </p>
      </div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {featuresList.map((feat, idx) => (
          <motion.div
            key={idx}
            variants={cardVariants}
            whileHover={{ y: -6, scale: 1.02 }}
            className="group relative rounded-2xl bg-gradient-to-b from-white/[0.03] to-white/[0.01] border border-white/10 hover:border-white/20 p-8 transition-all duration-300 backdrop-blur-md"
          >
            {/* Glow on hover */}
            <div className="absolute inset-0 rounded-2xl bg-indigo-500/[0.02] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            
            <div className="w-12 h-12 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:border-white/20 transition-all duration-300">
              {feat.icon}
            </div>
            
            <h4 className="text-lg font-bold text-white mb-2 group-hover:text-indigo-400 transition-colors duration-200">
              {feat.title}
            </h4>
            <p className="text-sm text-zinc-400 leading-relaxed">
              {feat.description}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default Features;
