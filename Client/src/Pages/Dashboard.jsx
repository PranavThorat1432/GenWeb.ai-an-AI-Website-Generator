import axios from "axios";
import { ArrowLeft, Check, Rocket, Share2, ExternalLink, Lock, Edit3, Calendar } from "lucide-react"
import { motion } from 'motion/react'
import { useEffect, useState } from "react";
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom";
import { serverUrl } from '../App';

const Dashboard = () => {

    const { userData } = useSelector((state) => state.user);

    const navigate = useNavigate();
    const [websites, setWebsites] = useState(null);
    const [loading, setLoading] = useState(false);
    const [err, setErr] = useState('');
    const [copiedId, setCopiedId] = useState(null);


    const handleDeploy = async (id) => {
        try {
            const result = await axios.get(`${serverUrl}/api/website/deploy/${id}`, {
                withCredentials: true
            });
            window.open(`${result.data.url}`, '_blank');
            setWebsites((prev) => prev.map((w) => w._id === id ? {...w, deployed: true, deployedUrl: result.data.url} : w));
            
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        const handleGetAllWebsites = async () => {
            setLoading(true);
            try {
                const result = await axios.get(`${serverUrl}/api/website/get-all`, {
                    withCredentials: true
                });
                setWebsites(result.data || []);
                setLoading(false);
                
            } catch (error) {
                console.log(error)
                setErr(error.response.data.message);
                setLoading(false);
            }
        };

        handleGetAllWebsites();
    }, []);


    const handleCopy = async (site) => {
        await navigator.clipboard.writeText(site.deployedUrl);
        setCopiedId(site._id);
        setTimeout(() => setCopiedId(null), 2000);
    };


  return (
    <div className="min-h-screen bg-[#050505] text-white relative overflow-hidden">
        {/* Ambient background glows */}
        <div className="absolute top-0 left-1/4 w-125 h-125 bg-indigo-500/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-125 h-125 bg-purple-500/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="sticky top-0 z-40 backdrop-blur-xl bg-black/50 border-b border-white/10">
            <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <button className="p-2 rounded-lg hover:bg-white/10 transition cursor-pointer" onClick={() => navigate('/')}>
                        <ArrowLeft size={16}/>
                    </button>
                    <h1 className="text-lg font-semibold">Dashboard</h1>
                </div>

                <button className="px-4 py-2 rounded-lg bg-white text-black text-sm font-semibold hover:scale-105 transition cursor-pointer" onClick={() => navigate('/generate')}>
                    + New Website
                </button>
            </div>
        </div>


        <div className="max-w-7xl mx-auto px-6 py-10 relative z-10">
            <motion.div
                initial={{y: 12, opacity: 0}}
                animate={{y: 0, opacity: 1}}
                className="mb-10"
            >
                <p className="text-sm text-zinc-400 mb-1">Welcome Back</p>
                <h1 className="text-3xl font-bold">{userData.name}</h1>
            </motion.div>

            {loading && (
                <div className="mt-24 text-center text-zinc-400">
                    Loading your websites...
                </div>
            )}

            {err && !loading && (
                <div className="mt-24 text-center text-red-400">
                    {err}
                </div>
            )}

            {websites?.length === 0 && (
                <div className="mt-24 text-center text-zinc-400">
                    You have no websites yet.
                </div>
            )}

             {!loading && !err && websites?.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
                    {websites.map((w, i) => {

                        const copied = copiedId === w._id;

                        return (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 24 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ type: "spring", stiffness: 100, damping: 15, delay: i * 0.05 }}
                                whileHover={{ 
                                    y: -8, 
                                    scale: 1.015,
                                    boxShadow: w.deployed 
                                        ? "0 20px 40px -15px rgba(16, 185, 129, 0.15)" 
                                        : "0 20px 40px -15px rgba(99, 102, 241, 0.15)"
                                }}
                                onClick={() => navigate(`/editor/${w._id}`)}
                                className="group relative rounded-2xl bg-linear-to-b from-white/4 to-white/1 border border-white/10 hover:border-white/20 overflow-hidden backdrop-blur-md transition-all duration-300 flex flex-col cursor-pointer"
                            >
                                {/* Browser Mockup Frame */}
                                <div className="relative h-44 bg-[#0a0a0a] border-b border-white/6 flex flex-col overflow-hidden">
                                    {/* Mock Browser Header */}
                                    <div className="h-8 px-4 flex items-center bg-black/40 border-b border-white/3 select-none gap-2">
                                        {/* Mac dots */}
                                        <div className="flex gap-1.5 mr-2">
                                            <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
                                            <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
                                            <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
                                        </div>
                                        {/* URL bar */}
                                        <div className="flex-1 max-w-50 mx-auto h-5 rounded bg-white/4 border border-white/6 flex items-center justify-center gap-1.5 px-2 text-[10px] text-zinc-400 font-mono">
                                            <Lock size={8} className="text-zinc-500" />
                                            <span className="truncate">{w.slug || w.title.toLowerCase().replace(/[^a-z0-9]/g, '-')}.genweb.ai</span>
                                        </div>
                                        {/* Spacer to balance */}
                                        <div className="w-13" />
                                    </div>

                                    {/* Webpage preview */}
                                    <div className="relative flex-1 bg-white overflow-hidden">
                                        <iframe 
                                            srcDoc={w.latestCode} 
                                            title={w.title}
                                            className="absolute inset-0 w-[140%] h-[140%] scale-[0.72] origin-top-left pointer-events-none bg-white transition-opacity duration-300"
                                        />
                                        {/* Card shadow overlay */}
                                        <div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 transition-colors duration-300" />
                                    </div>

                                    {/* Hover overlay for editor transition */}
                                    <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                                        <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white text-black font-semibold text-xs shadow-xl scale-95 group-hover:scale-100 transition-transform duration-300">
                                            <Edit3 size={14} />
                                            Open in Editor
                                        </div>
                                    </div>
                                    
                                    {/* Status Badge overlay */}
                                    <div className="absolute top-11 right-3 z-10">
                                        {w.deployed ? (
                                            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-semibold tracking-wider uppercase backdrop-blur-md">
                                                <span className="relative flex h-1.5 w-1.5">
                                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
                                                </span>
                                                Live
                                            </div>
                                        ) : (
                                            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-zinc-500/10 border border-zinc-500/20 text-zinc-400 text-[10px] font-semibold tracking-wider uppercase backdrop-blur-md">
                                                <span className="h-1.5 w-1.5 rounded-full bg-zinc-500"></span>
                                                Draft
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Content Section */}
                                <div className="p-5 flex flex-col gap-4 flex-1">
                                    <div className="flex flex-col gap-1">
                                        <h3 className="text-base font-bold text-white group-hover:text-indigo-400 transition-colors duration-200 line-clamp-1">
                                            {w?.title}
                                        </h3>
                                        <div className="flex items-center gap-1.5 text-xs text-zinc-400">
                                            <Calendar size={12} className="text-zinc-500" />
                                            <span>
                                                Updated {new Date(w.updatedAt).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Action Buttons with Propagation Prevented */}
                                    <div className="mt-auto">
                                        {!w.deployed ? (
                                            <button 
                                                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 text-white hover:opacity-95 shadow-md shadow-indigo-500/10 transition-all duration-200 cursor-pointer"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleDeploy(w._id);
                                                }}
                                            >
                                                <Rocket size={16} /> Deploy Site
                                            </button>
                                        ) : (
                                            <div className="grid grid-cols-2 gap-3">
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        window.open(w.deployedUrl, '_blank');
                                                    }}
                                                    className="flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl text-xs font-semibold bg-linear-to-r from-indigo-500 to-purple-500 text-white hover:opacity-95 transition-all duration-200 cursor-pointer shadow-md shadow-indigo-500/10"
                                                >
                                                    <ExternalLink size={14} /> Visit Site
                                                </button>
                                                
                                                <motion.button
                                                    whileTap={{ scale: 0.95 }}
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleCopy(w);
                                                    }}
                                                    className={`flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all duration-200 cursor-pointer ${
                                                        copied 
                                                            ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30' 
                                                            : 'bg-white/5 hover:bg-white/10 border border-white/10 text-white'
                                                    }`}
                                                >
                                                   {copied ? (
                                                        <>
                                                            <Check size={14} />
                                                            Copied
                                                        </>
                                                    ) : (
                                                        <>
                                                            <Share2 size={14} /> 
                                                            Share
                                                        </>
                                                    )}
                                                </motion.button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        )
                    })}
                </div>
            )}
        </div>
      
    </div>
  )
}

export default Dashboard
