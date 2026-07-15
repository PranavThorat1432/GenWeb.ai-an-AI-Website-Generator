import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';

const Cta = ({ userData, onGetStarted, onNavigate }) => {
  return (
    <section className="relative max-w-7xl mx-auto px-6 py-20 z-10">
      <div className="relative rounded-3xl bg-gradient-to-b from-white/[0.04] to-white/[0.01] border border-white/10 px-8 py-16 md:p-20 overflow-hidden text-center backdrop-blur-md">
        {/* Glow effect inside CTA container */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center">
          <h3 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-6 leading-tight">
            Ready to bring your <br />
            <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">websites to life?</span>
          </h3>
          <p className="text-zinc-400 text-sm md:text-base leading-relaxed mb-10 max-w-md">
            Instantly generate clean code, customize using natural language, and publish with optimized cloud hosting.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 items-center">
            {!userData ? (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                onClick={onGetStarted}
                className="px-8 py-4 rounded-xl bg-white text-black font-bold text-sm cursor-pointer shadow-[0_0_30px_rgba(255,255,255,0.1)] flex items-center gap-2 hover:bg-zinc-100 transition-colors"
              >
                Get Started Free <ArrowRight size={16} />
              </motion.button>
            ) : (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onNavigate('/dashboard')}
                className="px-8 py-4 rounded-xl bg-white text-black font-bold text-sm cursor-pointer shadow-[0_0_30px_rgba(255,255,255,0.1)] flex items-center gap-2 hover:bg-zinc-100 transition-colors"
              >
                Go to Dashboard <ArrowRight size={16} />
              </motion.button>
            )}

            <button
              onClick={() => onNavigate('/pricing')}
              className="px-6 py-3 rounded-xl border border-white/20 hover:border-white/40 text-sm font-semibold cursor-pointer hover:bg-white/5 transition-all duration-200"
            >
              View Pricing Plans
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cta;
