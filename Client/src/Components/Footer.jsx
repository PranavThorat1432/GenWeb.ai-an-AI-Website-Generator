import { useNavigate } from 'react-router-dom';
import { MessageSquare, Globe } from 'lucide-react';

const Footer = () => {
  const navigate = useNavigate();

  const footerLinks = {
    Product: [
      { name: "Features", path: "/#features" },
      { name: "Pricing", path: "/pricing" },
      { name: "Dashboard", path: "/dashboard" }
    ],
    Resources: [
      { name: "Documentation", path: "#" },
      { name: "API Reference", path: "#" },
      { name: "Status Page", path: "#" }
    ],
    Legal: [
      { name: "Privacy Policy", path: "#" },
      { name: "Terms of Service", path: "#" },
      { name: "Cookie Settings", path: "#" }
    ]
  };

  const handleLinkClick = (path) => {
    if (path.startsWith("/#")) {
      navigate("/");
      setTimeout(() => {
        const id = path.split("#")[1];
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    } else if (path !== "#") {
      navigate(path);
      window.scrollTo(0, 0);
    }
  };

  return (
    <footer className="relative border-t border-white/10 bg-black/40 backdrop-blur-md z-10 w-full">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 mb-12">
          {/* Logo & Tagline column */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <div className="flex items-center gap-2 text-xl font-bold text-white cursor-pointer" onClick={() => navigate('/')}>
              <Globe className="text-indigo-400" size={20} />
              <span>GenWeb.ai</span>
            </div>
            <p className="text-zinc-400 text-sm leading-relaxed max-w-sm">
              Instantly generate, edit, and launch professional, responsive websites using generative AI prompt compilers.
            </p>
            {/* Social Icons */}
            <div className="flex gap-4 mt-2">
              <a href="#" aria-label="GitHub" className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-zinc-400 hover:text-white hover:border-white/20 transition-all duration-200">
                <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                  <path d="M9 18c-4.51 2-5-2-7-2" />
                </svg>
              </a>
              <a href="#" aria-label="Twitter" className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-zinc-400 hover:text-white hover:border-white/20 transition-all duration-200">
                <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                </svg>
              </a>
              <a href="#" aria-label="Discord / Support" className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-zinc-400 hover:text-white hover:border-white/20 transition-all duration-200">
                <MessageSquare size={16} />
              </a>
            </div>
          </div>

          {/* Categorized Link columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title} className="flex flex-col gap-4">
              <h4 className="text-sm font-bold text-white tracking-wider uppercase">{title}</h4>
              <ul className="flex flex-col gap-2.5">
                {links.map((link) => (
                  <li key={link.name}>
                    <button
                      onClick={() => handleLinkClick(link.path)}
                      className="text-sm text-zinc-400 hover:text-white transition-colors duration-200 cursor-pointer text-left"
                    >
                      {link.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom copyright segment */}
        <div className="pt-8 border-t border-white/6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <span>&copy; {new Date().getFullYear()} GenWeb.ai. All rights reserved.</span>
          <div className="flex gap-6">
            <span className="hover:text-zinc-400 cursor-pointer">Security</span>
            <span className="hover:text-zinc-400 cursor-pointer">Sitemap</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
