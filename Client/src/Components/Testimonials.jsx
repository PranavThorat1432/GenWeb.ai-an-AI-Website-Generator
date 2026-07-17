import { motion } from 'motion/react';
import { Star, Quote } from 'lucide-react';

const Testimonials = () => {
  const reviews = [
    {
      name: "Alex Rivera",
      role: "Product Designer, DevFlow",
      text: "I typed in a description for a developer portal with dark neon design, and GenWeb.ai rendered it perfectly. The CSS class structure is cleaner than most templates!",
      stars: 5,
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80"
    },
    {
      name: "Sophia Vance",
      role: "Freelance Developer",
      text: "The AI chat iteration is like magic. I asked it to add a pricing accordion and align the layout grid, and it did it instantly. This has accelerated my wireframing by 10x.",
      stars: 5,
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80"
    },
    {
      name: "Marcus Chen",
      role: "Founder, LaunchKit",
      text: "We deployed 4 client mockups in one afternoon. The 1-click publishing hosting makes sharing with clients extremely straightforward. Highly recommended tool.",
      stars: 5,
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80"
    }
  ];

  return (
    <section className="relative max-w-7xl mx-auto px-6 py-24 z-10">
      {/* Background glow in center */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-purple-500/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="text-center mb-16 relative">
        <h2 className="text-xs font-semibold tracking-wider text-indigo-400 uppercase mb-3">Testimonials</h2>
        <h3 className="text-3xl md:text-5xl font-bold tracking-tight">
          What creators are <span className="bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">saying about us</span>
        </h3>
        <p className="mt-4 text-zinc-400 max-w-lg mx-auto text-base">
          Developers, founders, and designers love building with GenWeb.ai.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {reviews.map((rev, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ type: "spring", stiffness: 80, damping: 15, delay: idx * 0.1 }}
            whileHover={{ y: -6 }}
            className="group relative rounded-2xl bg-gradient-to-b from-white/[0.03] to-white/[0.01] border border-white/10 hover:border-white/20 p-8 transition-all duration-300 backdrop-blur-md flex flex-col justify-between"
          >
            <div className="absolute top-6 right-8 text-white/[0.02] group-hover:text-indigo-500/[0.05] transition-colors duration-300">
              <Quote size={56} />
            </div>

            <div>
              {/* Star ratings */}
              <div className="flex gap-1 mb-6">
                {[...Array(rev.stars)].map((_, i) => (
                  <Star key={i} size={14} className="fill-yellow-400 text-yellow-400" />
                ))}
              </div>

              <p className="text-zinc-300 text-sm leading-relaxed mb-8 relative z-10 italic">
                "{rev.text}"
              </p>
            </div>

            {/* Author layout */}
            <div className="flex items-center gap-4 mt-auto">
              <img
                src={rev.avatar}
                alt={rev.name}
                className="w-10 h-10 rounded-full border border-white/10 object-cover"
                onError={(e) => {
                  e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(rev.name)}&background=4f46e5&color=fff`;
                }}
              />
              <div className="flex flex-col">
                <span className="text-sm font-bold text-white group-hover:text-indigo-300 transition-colors duration-200">{rev.name}</span>
                <span className="text-xs text-zinc-500">{rev.role}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
