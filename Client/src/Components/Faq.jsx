import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown } from 'lucide-react';

const Faq = () => {
  const [activeIdx, setActiveIdx] = useState(null);

  const faqs = [
    {
      q: "How does the AI builder write the website?",
      a: "It translates your plain-text prompts into styled semantic HTML code block-by-block. The CSS is powered by modern Tailwind CSS, ensuring readability and flexibility."
    },
    {
      q: "Can I copy or export the generated code?",
      a: "Yes. The visual editor gives you full access to the live code window. You can view, edit in real-time, copy components, or export the entire design."
    },
    {
      q: "Who owns the generated websites and code?",
      a: "You do. You have 100% ownership of the generated designs and code. You are free to use it for personal projects, commercial applications, or client handoffs."
    },
    {
      q: "Can I connect custom domains to my live site?",
      a: "By default, GenWeb.ai generates a secure subdomain under genweb.ai. Premium plans will soon support mapping custom DNS records to your deployed sites."
    },
    {
      q: "How do credits work in GenWeb.ai?",
      a: "Generating a new website or performing major design requests consumes a small amount of credits. You can purchase additional credits anytime from our Pricing page."
    }
  ];

  const toggleAccordion = (idx) => {
    setActiveIdx(activeIdx === idx ? null : idx);
  };

  return (
    <section className="relative max-w-4xl mx-auto px-6 py-24 z-10">
      {/* Ambient background glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-indigo-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="text-center mb-16">
        <h2 className="text-xs font-semibold tracking-wider text-indigo-400 uppercase mb-3">Support</h2>
        <h3 className="text-3xl md:text-5xl font-bold tracking-tight">
          Frequently Asked <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">Questions</span>
        </h3>
        <p className="mt-4 text-zinc-400 max-w-lg mx-auto text-base">
          Have questions? We've got answers. Explore how our AI compiler functions.
        </p>
      </div>

      <div className="flex flex-col gap-4">
        {faqs.map((faq, idx) => {
          const isOpen = activeIdx === idx;
          return (
            <div
              key={idx}
              className="rounded-2xl bg-gradient-to-b from-white/[0.03] to-white/[0.01] border border-white/10 overflow-hidden transition-all duration-300"
            >
              <button
                className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-white/[0.02] transition-colors duration-200 cursor-pointer"
                onClick={() => toggleAccordion(idx)}
              >
                <span className="text-sm md:text-base font-bold text-white group-hover:text-indigo-300">
                  {faq.q}
                </span>
                <motion.div
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="text-zinc-400"
                >
                  <ChevronDown size={18} />
                </motion.div>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                  >
                    <div className="px-6 pb-6 pt-1 text-sm text-zinc-400 border-t border-white/[0.04] leading-relaxed">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Faq;
