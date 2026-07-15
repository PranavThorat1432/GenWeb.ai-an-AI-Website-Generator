import { AnimatePresence, motion } from 'motion/react';
import { useState } from 'react';
import LoginModal from '../Components/LoginModal';
import { useSelector } from 'react-redux';
import { Coins } from 'lucide-react';
import axios from 'axios';
import { serverUrl } from '../App';
import { useDispatch } from 'react-redux';
import { setUserData } from '../Redux/Slices/userSlice';
import { useNavigate } from 'react-router-dom';
import Features from '../Components/Features';
import HowItWorks from '../Components/HowItWorks';
import Testimonials from '../Components/Testimonials';
import Faq from '../Components/Faq';
import Cta from '../Components/Cta';
import Footer from '../Components/Footer';

const Home = () => {

  const [openLogin, setOpenLogin] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);
  const { userData } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.get(`${serverUrl}/api/auth/logout`, {
        withCredentials: true
      });
      dispatch(setUserData(null));
      setOpenProfile(false);

    } catch (error) {
      console.log(error);
    }
  };


  return (
    <div className="relative min-h-screen bg-[#040404] text-white overflow-hidden" >
      {/* Ambient landing page glows */}
      <div className="absolute top-[-10%] left-[-10%] w-150 h-150 bg-purple-500/10 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute top-[20%] right-[-10%] w-150 h-150 bg-indigo-500/10 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute top-[60%] left-[-20%] w-200 h-200 bg-pink-500/5 rounded-full blur-[180px] pointer-events-none" />
      {/* Header/Navbar */}
      <motion.div
        className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-black/40 border-b border-white/10"
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-lg font-semibold cursor-pointer">
            GenWeb.ai
          </div>

          <div className="flex items-center gap-5">
            <div className="hidden md:block text-sm text-zinc-400 hover:text-white cursor-pointer transition-colors duration-200" onClick={() => navigate('/pricing')}>
              Pricing
            </div>

            {userData && (
              <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-sm cursor-pointer hover:bg-white/10 transition-colors duration-200" onClick={() => navigate('/pricing')}>
                <Coins className="text-yellow-400" size={14} />
                <span className="text-zinc-300">Credits</span>
                <span>{userData.credits}</span>
                <span className='font-semibold'>+</span>
              </div>
            )}

            {!userData ? (
              <button className="px-4 py-2 rounded-lg border border-white/20 hover:bg-white/10 text-sm cursor-pointer transition-colors duration-200" onClick={() => setOpenLogin(true)}>
                Get Started
              </button>
            ) : (
              <div className="relative">
                <button className="flex items-center cursor-pointer" onClick={() => setOpenProfile(!openProfile)}>
                  <img src={userData?.avatar || `https://ui-avatars.com/api/?name=${userData?.name}`} alt="avatar" referrerPolicy='no-referrer' className="w-9 h-9 rounded-full border border-white/20 object-cover" />
                </button>

                <AnimatePresence>
                  {openProfile && (
                    <>
                      <motion.div
                        className='absolute right-0 mt-3 w-60 z-50 rounded-xl bg-[#0b0b0b] border border-white/10 shadow-2xl overflow-hidden'
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      >
                        <div className='px-4 py-3 border-b border-white/10'>
                          <p className='text-sm font-medium truncate'>{userData.name}</p>
                          <p className='text-xs text-zinc-500 truncate'>{userData.email}</p>
                        </div>

                        <button className="md:hidden w-full px-4 py-3 flex items-center gap-2 text-sm border-b border-white/10 hover:bg-white/5">
                          <Coins className="text-yellow-400" size={14} />
                          <span className="text-zinc-300">Credits</span>
                          <span>{userData.credits}</span>
                          <span className='font-semibold'>+</span>
                        </button>

                        <button className='w-full px-4 py-3 text-left text-sm hover:bg-white/5 cursor-pointer' onClick={() => navigate('/dashboard')}>
                          Dashboard
                        </button>

                        <button className='w-full px-4 py-3 text-left text-sm text-red-400 hover:bg-white/5 cursor-pointer' onClick={handleLogout}>
                          Logout
                        </button>
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>

              </div>
            )}
          </div>
        </div>
      </motion.div>

      {/* Hero Section */}
      <section className="relative pt-44 pb-32 px-6 text-center">
        
        <div className="relative z-10">
          <motion.h1
            className="text-5xl md:text-7xl font-bold tracking-tight"
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: '0.3' }}
          >
            Build Stunning Websites <br />
            <span className='bg-linear-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent'>with AI in Minutes</span>
          </motion.h1>

          <motion.p
            className="mt-8 text-lg text-zinc-400 max-w-2xl mx-auto"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: '0.3' }}
          >
            Describe your idea and let AI generate a modern,
            responsive website for you. No coding required!
          </motion.p>

          {!userData ? (
            <button className='px-10 py-4 mt-10 rounded-xl bg-white text-black font-semibold hover:scale-105 transition cursor-pointer ease-in-out duration-200' onClick={() => setOpenLogin(true)}>
              Get Started
            </button>
          ) : (
            <button className='px-10 py-4 mt-10 rounded-xl bg-white text-black font-semibold hover:scale-105 transition cursor-pointer ease-in-out duration-200' onClick={() => navigate('/dashboard')}>
              Go to Dashboard
            </button>
          )}
        </div>
      </section>

      {/* Features Section */}
      <Features />

      {/* How It Works Section */}
      <HowItWorks />

      {/* Testimonials Section */}
      <Testimonials />

      {/* FAQ Section */}
      <Faq />

      {/* CTA Section */}
      <Cta
        userData={userData}
        onGetStarted={() => setOpenLogin(true)}
        onNavigate={(path) => navigate(path)}
      />

      {/* Footer */}
      <Footer />

      {openLogin && <LoginModal open={openLogin} onClose={() => setOpenLogin(false)} />}
    </div>
  )
}

export default Home
