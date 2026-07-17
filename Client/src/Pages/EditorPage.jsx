/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { useEffect, useRef, useState } from "react"
import { useParams, useNavigate } from "react-router-dom";
import { serverUrl } from "../App";
import { ArrowLeft, Check, Code2, Download, MessageSquare, Monitor, Rocket, Send, Share2, Sparkles, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import Editor from '@monaco-editor/react';


const EditorPage = () => {

    const {id} = useParams();
    const navigate = useNavigate();
    const [website, setWebsite] = useState(null);
    const [error, setError] = useState('');
    const [code, setCode] = useState('');
    const [messages, setMessages] = useState([]);
    const [prompt, setPrompt] = useState('');
    const [updateLoading, setUpdateLoading] = useState(false);
    const [thinkingIndex, setThinkingIndex] = useState(0);
    const [showCode, setShowCode] = useState(false);
    const [showFullPreview, setShowFullPreview]  = useState(false);
    const [showChatBox, setShowChatBox] = useState(false);
    const [copiedId, setCopiedId] = useState(null);


    const iframeRef = useRef(null);

    const thinkingSteps = [
        'Understanding your request...',
        'Planning layout changes...',
        'Improving responsiveness...',
        'Applying animations...',
        'Finalizing updates...'
    ];


    const handleUpdate = async () => {
        setUpdateLoading(true);
        if (!prompt.trim()) return;
        setMessages((msg) => [...msg, {role: 'user', content: prompt}]);
        const currentPrompt = prompt;
        setPrompt('');

        try {
            const result = await axios.post(`${serverUrl}/api/website/update/${id}`, {
                prompt: currentPrompt
            }, {
                withCredentials: true
            });
            setMessages((msg) => [...msg, {role: 'ai', content: result.data.message}]);
            setCode(result.data.code);
            setUpdateLoading(false);
            
        } catch (error) {
            console.log(error);
            setUpdateLoading(false);
        }
    };


    const handleDeploy = async () => {
        try {
            const result = await axios.get(`${serverUrl}/api/website/deploy/${website._id}`, {
                withCredentials: true
            });
            window.open(`${result.data.url}`, '_blank');
            
        } catch (error) {
            console.log(error);
        }
    };

    const handleCopy = async (site) => {
        await navigator.clipboard.writeText(site.deployedUrl);
        setCopiedId(site._id);
        setTimeout(() => setCopiedId(null), 2000);
    };

    const handleDownload = () => {
        if (!code) return;
        const blob = new Blob([code], { type: "text/html" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `${website?.title ? website.title.toLowerCase().replace(/[^a-z0-9]/g, '-') : 'index'}.html`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };


    useEffect(() => {
        if(!updateLoading) return;
        const i = setInterval(() => {
            setThinkingIndex((i) => (i + 1) % thinkingSteps?.length)
        }, 5000);

        return () => {
            clearInterval(i);
        }
    }, [updateLoading]);
    
    useEffect(() => {
        const handleGetWebsite = async () => {
            try {
                const result = await axios.get(`${serverUrl}/api/website/get/${id}`, {
                    withCredentials: true
                });
                setWebsite(result.data);
                setCode(result.data.latestCode);
                setMessages(result.data.conversation);

            } catch (error) {
                console.log(error);
                setError(error.response.data.message);
            }
        };

        handleGetWebsite();
    }, [id]);


    useEffect(() => {
        if(!iframeRef.current || !code) {
            return;
        }

        const blob = new Blob([code], {type: 'text/html'});
        const url = URL.createObjectURL(blob);
        iframeRef.current.src = url;

        return () => {
            URL.revokeObjectURL(url);
        }
    }, [code]);


    if(error) {
        return (
            <div className="h-screen flex items-center justify-center bg=black text-red-400">
                {error}
            </div>
        )
    }

    if(!website) {
        return (
            <div className="h-screen flex items-center justify-center bg=black text-white">
                Loading...
            </div>
        )
    }


    return (
        <div className="h-screen flex bg-black text-white overflow-hidden">
            <aside className="hidden lg:flex w-95 flex-col border-r border-white/10 bg-zinc-950/80 backdrop-blur-md">
                <Header/>
                <>
                    <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
                        {messages.map((msg, index) => (
                            <div
                                key={index}
                                className={`flex gap-2 max-w-[85%] ${msg.role === 'user' ? 'ml-auto justify-end' : 'mr-auto justify-start'}`}
                            >
                                {msg.role === 'ai' && (
                                    <div className="w-6 h-6 rounded-full bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center shrink-0 mt-1">
                                        <Sparkles size={11} className="text-indigo-400" />
                                    </div>
                                )}
                                <div 
                                    className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed shadow-sm
                                        ${msg.role === 'user' ? 
                                            'bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-tr-none'
                                            : 'bg-zinc-900/60 border border-zinc-800 text-zinc-200 rounded-tl-none'}
                                    `}
                                >
                                    {msg.content}
                                </div>
                            </div>
                        ))}

                        {updateLoading && (
                            <div className="flex gap-2 max-w-[85%] mr-auto items-start">
                                <div className="w-6 h-6 rounded-full bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center shrink-0 mt-1 animate-pulse">
                                    <Sparkles size={11} className="text-indigo-400" />
                                </div>
                                <div className="px-4 py-3 rounded-2xl rounded-tl-none bg-zinc-900/40 border border-zinc-800/80 text-zinc-400 text-xs flex flex-col gap-2 shadow-inner">
                                    <div className="flex items-center gap-2">
                                        <span className="flex h-2 w-2 relative">
                                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                                            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
                                        </span>
                                        <span className="font-medium animate-pulse">{thinkingSteps[thinkingIndex]}</span>
                                    </div>
                                    <div className="w-40 h-1 bg-zinc-800 rounded-full overflow-hidden">
                                        <div 
                                            className="h-full bg-gradient-to-r from-cyan-500 to-indigo-500 rounded-full animate-pulse" 
                                            style={{ width: '70%', transition: 'width 1.5s ease-in-out' }} 
                                        />
                                    </div>
                                </div>
                            </div>
                        )}

                    </div>

                    <div className="p-4 border-t border-white/10 bg-zinc-950/40">
                        <div className="relative flex items-center bg-zinc-900/60 border border-zinc-800 rounded-2xl p-1.5 focus-within:border-indigo-500/50 focus-within:shadow-[0_0_10px_rgba(99,102,241,0.15)] transition-all duration-200">
                            <input 
                                placeholder="Describe Changes..." 
                                className="flex-1 min-w-0 bg-transparent px-3 py-2 text-sm text-zinc-100 outline-none placeholder-zinc-500"
                                onChange={(e) => setPrompt(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' && !e.shiftKey) {
                                        e.preventDefault();
                                        handleUpdate();
                                    }
                                }}
                                value={prompt}
                                disabled={updateLoading}
                            />

                            <button 
                                className="p-2.5 rounded-xl bg-white text-black hover:bg-zinc-200 disabled:bg-zinc-800 disabled:text-zinc-600 transition-all duration-200 cursor-pointer flex items-center justify-center shrink-0" 
                                onClick={handleUpdate}
                                disabled={updateLoading || !prompt.trim()}
                            >
                                <Send size={14}/>
                             </button>
                        </div>
                    </div>
                </>
            </aside>
            
            <div className="flex-1 flex flex-col">
                <div className="h-14 px-4 flex justify-between items-center border-b border-white/10 bg-zinc-950/80 backdrop-blur-md">
                    <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(6,182,212,0.8)]" />
                        <span className="text-xs text-zinc-300 font-medium uppercase tracking-wider">Live Preview</span>
                    </div>
                    <div className="flex items-center gap-2">

                        {!website.deployed ? (
                            <button className="flex items-center gap-2 px-4 py-1.5 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-500 hover:from-cyan-400 hover:to-indigo-400 text-sm font-semibold transition-all duration-200 cursor-pointer hover:shadow-[0_0_15px_rgba(6,182,212,0.4)]"
                                onClick={() => handleDeploy(website._id)}
                            >
                                <Rocket size={14} className="animate-bounce" style={{ animationDuration: '3s' }} /> <span>Deploy</span>
                            </button>
                        ) : (
                            <motion.button
                                whileTap={{ scale: 0.95 }}
                                onClick={() => handleCopy(website)}
                                className={`flex items-center justify-center gap-2 px-4 py-1.5 rounded-xl text-sm font-semibold transition-all cursor-pointer ${copiedId ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-300 hover:text-white'}`}
                            >
                                {copiedId ? (
                                    <>
                                        <Check size={14}/>
                                        <span>Copied</span>
                                    </>
                                ) : (
                                    <>
                                        <Share2 size={14}/> 
                                        <span>Share Link</span>
                                    </>
                                )}
                            </motion.button>
                        )}

                        <button className="lg:hidden p-2 rounded-lg cursor-pointer text-zinc-400 hover:text-zinc-100 hover:bg-white/5 transition-all duration-200" onClick={() => setShowChatBox(true)} title="AI Assistant">
                            <MessageSquare size={16}/>
                        </button>

                        <button className="p-2 rounded-lg cursor-pointer text-zinc-400 hover:text-zinc-100 hover:bg-white/5 transition-all duration-200" onClick={() => setShowCode(!showCode)} title="View HTML Code">
                            <Code2 size={16}/>
                        </button>

                        <button className="p-2 rounded-lg cursor-pointer text-zinc-400 hover:text-zinc-100 hover:bg-white/5 transition-all duration-200" onClick={() => setShowFullPreview(!showFullPreview)} title="Open Fullscreen Preview">
                            <Monitor size={16}/> 
                        </button>

                        <button className="p-2 rounded-lg cursor-pointer text-zinc-400 hover:text-zinc-100 hover:bg-white/5 transition-all duration-200" onClick={handleDownload} title="Export index.html">
                            <Download size={16}/>
                        </button>
                    </div>
                </div>

                <div className="flex-1 p-4 bg-zinc-950 flex flex-col">
                    {/* Browser Chrome frame */}
                    <div className="flex-1 flex flex-col rounded-2xl border border-zinc-800/80 bg-zinc-900 overflow-hidden shadow-2xl">
                        {/* Browser top-bar */}
                        <div className="h-11 px-4 flex items-center justify-between bg-zinc-900 border-b border-zinc-850 select-none">
                            {/* Red, Yellow, Green mock controls */}
                            <div className="flex items-center gap-1.5 w-16">
                                <div className="w-3 h-3 rounded-full bg-[#ff5f56] hover:opacity-80 transition-opacity" />
                                <div className="w-3 h-3 rounded-full bg-[#ffbd2e] hover:opacity-80 transition-opacity" />
                                <div className="w-3 h-3 rounded-full bg-[#27c93f] hover:opacity-80 transition-opacity" />
                            </div>
                            
                            {/* Mock Address Bar */}
                            <div className="flex-1 max-w-xl mx-auto flex items-center justify-center bg-zinc-950/80 border border-zinc-800 rounded-lg py-1 px-3 gap-2 text-[11px] text-zinc-400 font-mono select-text truncate">
                                <span className="text-zinc-650">https://</span>
                                <span className="truncate">{website.deployedUrl ? website.deployedUrl.replace(/^https?:\/\//, '') : `${website.title.toLowerCase().replace(/\s+/g, '-')}.genweb.ai`}</span>
                            </div>
                            
                            <div className="w-16" /> {/* Spacer */}
                        </div>
                        
                        {/* Browser view */}
                        <iframe className="flex-1 w-full bg-white border-0" ref={iframeRef} sandbox='allow-scripts allow-same-origin allow-forms allow-popups'/>
                    </div>
                </div>
            </div>

            <AnimatePresence>
                {showCode && (
                    <motion.div
                        initial={{x: '100%'}}
                        animate={{x: 0}}
                        exit={{x: '100%'}}
                        className="fixed inset-y-0 right-0 w-full lg:w-[45%] z-9999 bg-[#1e1e1e] flex flex-col shadow-2xl border-l border-white/10"
                    >
                        <div className="h-12 px-4 flex justify-between items-center border-b border-white/10 bg-[#1e1e1e]">
                            <span className="text-sm font-medium">index.html</span>
                            <button onClick={() => setShowCode(false)} className="p-1 rounded-lg hover:bg-white/5 transition-colors cursor-pointer">
                                <X size={16} className="text-zinc-400 hover:text-white"/>
                            </button>
                        </div>
                        
                        <Editor 
                            theme="vs-dark"
                            value={code}
                            language='html'
                            onChange={(c) => setCode(c)}
                        />
                    </motion.div>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {showFullPreview && (
                    <motion.div
                        className="fixed inset-0 z-9999 bg-black"
                    >
                        <iframe className="w-full h-full bg-white border-0" srcDoc={code} sandbox='allow-scripts allow-same-origin allow-forms allow-popups'/>
                        <button onClick={() => setShowFullPreview(false)} className="absolute top-4 right-4 p-2 bg-black/70 rounded-lg hover:bg-black/90 transition-colors border border-white/10 cursor-pointer">
                            <X size={18} className="text-white"/>
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {showChatBox && (
                    <motion.div
                        initial={{y: '100%'}}
                        animate={{y: 0}}
                        exit={{y: '100%'}}
                        className="fixed inset-0 z-9999 flex flex-col bg-zinc-950"
                    >
                        <Header onclose={() => setShowChatBox(false)}/>
                        <>
                            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 bg-zinc-950">
                                {messages.map((msg, index) => (
                                    <div
                                        key={index}
                                        className={`flex gap-2 max-w-[85%] ${msg.role === 'user' ? 'ml-auto justify-end' : 'mr-auto justify-start'}`}
                                    >
                                        {msg.role === 'ai' && (
                                            <div className="w-6 h-6 rounded-full bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center shrink-0 mt-1">
                                                <Sparkles size={11} className="text-indigo-400" />
                                            </div>
                                        )}
                                        <div 
                                            className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed shadow-sm
                                                ${msg.role === 'user' ? 
                                                    'bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-tr-none'
                                                    : 'bg-zinc-900/60 border border-zinc-800 text-zinc-200 rounded-tl-none'}
                                            `}
                                        >
                                            {msg.content}
                                        </div>
                                    </div>
                                ))}

                                {updateLoading && (
                                    <div className="flex gap-2 max-w-[85%] mr-auto items-start">
                                        <div className="w-6 h-6 rounded-full bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center shrink-0 mt-1 animate-pulse">
                                            <Sparkles size={11} className="text-indigo-400" />
                                        </div>
                                        <div className="px-4 py-3 rounded-2xl rounded-tl-none bg-zinc-900/40 border border-zinc-800/80 text-zinc-400 text-xs flex flex-col gap-2 shadow-inner">
                                            <div className="flex items-center gap-2">
                                                <span className="flex h-2 w-2 relative">
                                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
                                                </span>
                                                <span className="font-medium animate-pulse">{thinkingSteps[thinkingIndex]}</span>
                                            </div>
                                            <div className="w-40 h-1 bg-zinc-800 rounded-full overflow-hidden">
                                                <div 
                                                    className="h-full bg-gradient-to-r from-cyan-500 to-indigo-500 rounded-full animate-pulse" 
                                                    style={{ width: '70%', transition: 'width 1.5s ease-in-out' }} 
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )}

                            </div>

                            <div className="p-4 border-t border-white/10 bg-zinc-950">
                                <div className="relative flex items-center bg-zinc-900/60 border border-zinc-800 rounded-2xl p-1.5 focus-within:border-indigo-500/50 focus-within:shadow-[0_0_10px_rgba(99,102,241,0.15)] transition-all duration-200">
                                    <input 
                                        placeholder="Describe Changes..." 
                                        className="flex-1 min-w-0 bg-transparent px-3 py-2 text-sm text-zinc-100 outline-none placeholder-zinc-500"
                                        onChange={(e) => setPrompt(e.target.value)}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter' && !e.shiftKey) {
                                                e.preventDefault();
                                                handleUpdate();
                                            }
                                        }}
                                        value={prompt}
                                        disabled={updateLoading}
                                    />

                                    <button 
                                        className="p-2.5 rounded-xl bg-white text-black hover:bg-zinc-200 disabled:bg-zinc-800 disabled:text-zinc-600 transition-all duration-200 cursor-pointer flex items-center justify-center shrink-0" 
                                        onClick={handleUpdate}
                                        disabled={updateLoading || !prompt.trim()}
                                    >
                                        <Send size={14}/>
                                    </button>
                                </div>
                            </div>
                        </>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )

    function Header({onclose}) {
        return (
            <div className="h-14 px-4 flex items-center justify-between border-b border-white/10 bg-zinc-950/80 backdrop-blur-md">
                <div className="flex items-center gap-2 overflow-hidden">
                    {!onclose && (
                        <button 
                            onClick={() => navigate('/dashboard')} 
                            className="flex items-center justify-center p-1.5 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-all duration-200 cursor-pointer shrink-0"
                            title="Back to Dashboard"
                        >
                            <ArrowLeft size={14}/>
                        </button>
                    )}
                    <span className="font-semibold text-sm text-zinc-100 truncate">{website.title}</span>
                </div>
                {onclose ? (
                    <button onClick={onclose} className="p-1.5 rounded-lg hover:bg-white/10 transition-colors cursor-pointer">
                        <X size={16} className="text-zinc-400 hover:text-white"/>
                    </button>
                ) : (
                    <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[10px] text-emerald-400 font-semibold uppercase tracking-wider shrink-0 select-none">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        Live
                    </div>
                )}
            </div>
        )
    }
    
}

export default EditorPage
