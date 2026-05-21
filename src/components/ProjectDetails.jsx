import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { database } from '../firebase';
import { ref, onValue } from 'firebase/database';
import { motion } from 'framer-motion';
import { HiArrowLeft, HiLocationMarker, HiUser, HiCalendar, HiShare, HiX } from 'react-icons/hi';
import { toast } from 'react-hot-toast';

const generateSlug = (title) => {
  if (!title) return '';
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

const ProjectDetails = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(null);

  const handleShare = async () => {
    const shareData = {
      title: project?.title || 'OAK Constructions',
      text: `Check out this amazing project: ${project?.title || 'OAK Constructions'}!`,
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(window.location.href);
        toast.success('Link copied to clipboard!');
      }
    } catch (err) {
      if (err.name !== 'AbortError') {
        try {
          await navigator.clipboard.writeText(window.location.href);
          toast.success('Link copied to clipboard!');
        } catch (clipErr) {
          console.error(clipErr);
          toast.error('Failed to copy link');
        }
      }
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    const projectsRef = ref(database, 'projects');
    const unsubscribe = onValue(projectsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const list = Object.keys(data).map(key => ({ id: key, ...data[key] }));
        const found = list.find(p => (p.slug || generateSlug(p.title)) === slug);
        setProject(found || null);
        if (found) {
          setActiveImage(found.image);
        }
      } else {
        setProject(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FDFBF7] flex flex-col items-center justify-center">
        <div className="w-12 h-12 border-2 border-luxury-gold border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-[10px] font-black tracking-[0.2em] uppercase text-luxury-gold animate-pulse">Loading Workspace...</p>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-[#FDFBF7] flex flex-col items-center justify-center px-6">
        <h2 className="text-2xl font-black text-charcoal mb-4">Project Not Found</h2>
        <p className="text-gray-500 mb-8 text-center max-w-sm">The project you are looking for does not exist or has been removed.</p>
        <button
          onClick={() => navigate('/')}
          className="px-8 py-4 bg-charcoal text-white font-black rounded-full uppercase tracking-widest text-[10px] hover:bg-black transition-colors"
        >
          Back to Homepage
        </button>
      </div>
    );
  }

  const extraImages = [project.extraImage1, project.extraImage2, project.extraImage3].filter(Boolean);
  const allImages = [project.image, ...extraImages];

  return (
    <div className="min-h-screen bg-[#FDFBF7] selection:bg-luxury-gold selection:text-white flex flex-col">
      
      {/* Top Header Navigation */}
      <header className="sticky top-0 z-50 bg-[#FDFBF7]/90 backdrop-blur-md border-b border-charcoal/5 py-4 flex-shrink-0">
        <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
          
          {/* Logo on Left Side */}
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
            <div className="w-10 h-10 overflow-hidden rounded-xl border border-luxury-gold/20">
              <img src="/logo.jpeg" alt="OAK Logo" className="w-full h-full object-cover" />
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-lg font-outfit font-black tracking-tighter uppercase text-luxury-navy">OAK</span>
              <span className="text-[7px] font-black tracking-[0.2em] uppercase text-luxury-gold mt-0.5">Constructions</span>
            </div>
          </div>

          {/* Action Buttons on Right Side */}
          <div className="flex items-center gap-4 sm:gap-6">
            {/* Desktop View Buttons */}
            <div className="hidden sm:flex items-center gap-6">
              <button
                onClick={() => navigate('/')}
                className="flex items-center gap-2 text-charcoal font-black uppercase tracking-widest text-[10px] hover:text-luxury-gold transition-colors group"
              >
                <HiArrowLeft className="text-sm transition-transform group-hover:-translate-x-1" />
                Back to Home
              </button>
              <button
                onClick={handleShare}
                className="flex items-center gap-2 text-charcoal font-black uppercase tracking-widest text-[10px] hover:text-luxury-gold transition-colors group border-l border-charcoal/10 pl-6"
              >
                <HiShare className="text-sm" />
                Share Project
              </button>
            </div>

            {/* Mobile View Buttons */}
            <div className="flex sm:hidden items-center gap-4">
              <button
                onClick={handleShare}
                aria-label="Share Project"
                className="w-9 h-9 rounded-full bg-charcoal/5 flex items-center justify-center text-charcoal hover:bg-luxury-gold hover:text-white transition-all"
              >
                <HiShare className="text-base" />
              </button>
              <button
                onClick={() => navigate('/')}
                aria-label="Back to Home"
                className="w-9 h-9 rounded-full bg-charcoal/5 flex items-center justify-center text-charcoal hover:bg-luxury-gold hover:text-white transition-all font-bold"
              >
                <HiX className="text-lg" />
              </button>
            </div>
          </div>

        </div>
      </header>

      {/* Split Screen Luxury Layout */}
      <div className="flex-1 flex flex-col lg:flex-row relative">
        
        {/* Left Side: Immersive Sticky Media Panel */}
        <div className="w-full lg:w-[45%] lg:h-[calc(100vh-73px)] lg:sticky lg:top-[73px] bg-charcoal p-6 lg:p-10 flex flex-col justify-between gap-6 border-r border-charcoal/5">
          {/* Main Showcase Image */}
          <div className="relative flex-1 rounded-[2rem] overflow-hidden shadow-2xl group min-h-[40vh] lg:min-h-0 bg-charcoal/40">
            <img
              src={activeImage}
              alt={project.title}
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
          </div>

          {/* Interactive Thumbnails Selector */}
          {allImages.length > 1 && (
            <div className="flex-shrink-0">
              <span className="text-[9px] font-black text-white/40 uppercase tracking-widest block mb-3">View Perspectives</span>
              <div className="flex gap-3 overflow-x-auto pb-1 no-scrollbar">
                {allImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(img)}
                    className={`w-20 h-14 rounded-xl overflow-hidden border-2 flex-shrink-0 transition-all ${
                      activeImage === img ? 'border-luxury-gold scale-105 shadow-md' : 'border-transparent opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="perspective thumbnail" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Side: Scrollable Editorial Description & Galleries */}
        <div className="w-full lg:w-[55%] p-6 md:p-12 lg:p-16 space-y-16">
          
          {/* Editorial Title Header */}
          <div className="space-y-4">
            <span className="text-luxury-gold font-black tracking-[0.4em] uppercase text-[9px] md:text-[10px] block">
              Architectural Concept
            </span>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-charcoal tracking-tighter leading-tight">
              {project.title}
            </h1>
            <div className="w-16 h-[2px] bg-luxury-gold pt-0.5"></div>
          </div>

          {/* Specifications Card */}
          <div className="bg-white rounded-[2rem] p-8 shadow-luxury border border-charcoal/5 flex flex-col sm:flex-row gap-8 items-center sm:items-stretch">
            
            {/* Left Column: Large Square Client Image */}
            <div className="flex-shrink-0 flex items-center justify-center">
              {project.clientImage ? (
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden border border-luxury-gold/30 shadow-sm">
                  <img src={project.clientImage} alt={project.owner} className="w-full h-full object-cover" />
                </div>
              ) : (
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-luxury-gold/10 border border-luxury-gold/30 flex items-center justify-center text-luxury-gold shadow-sm">
                  <HiUser className="text-4xl" />
                </div>
              )}
            </div>

            {/* Vertical Divider Line */}
            <div className="hidden sm:block w-[1px] bg-charcoal/10 my-1"></div>

            {/* Right Column: Stacked Location, Client, Completed Specifications */}
            <div className="flex-1 flex flex-col justify-between gap-4 w-full text-center sm:text-left py-1">
              
              {/* Location */}
              {project.location && (
                <div className="flex items-center gap-3 justify-center sm:justify-start">
                  <HiLocationMarker className="text-luxury-gold text-lg flex-shrink-0" />
                  <div className="flex flex-col leading-tight items-center sm:items-start">
                    <span className="text-[8px] font-black text-gray-400 uppercase tracking-widest">Location</span>
                    <span className="text-sm font-extrabold text-charcoal">{project.location}</span>
                  </div>
                </div>
              )}

              {/* Owner / Client */}
              {project.owner && (
                <div className="flex items-center gap-3 justify-center sm:justify-start">
                  <HiUser className="text-luxury-gold text-lg flex-shrink-0" />
                  <div className="flex flex-col leading-tight items-center sm:items-start">
                    <span className="text-[8px] font-black text-gray-400 uppercase tracking-widest">Client</span>
                    <span className="text-sm font-extrabold text-charcoal">{project.owner}</span>
                  </div>
                </div>
              )}

              {/* Completed Date */}
              <div className="flex items-center gap-3 justify-center sm:justify-start">
                <HiCalendar className="text-luxury-gold text-lg flex-shrink-0" />
                <div className="flex flex-col leading-tight items-center sm:items-start">
                  <span className="text-[8px] font-black text-gray-400 uppercase tracking-widest">Completed</span>
                  <span className="text-sm font-extrabold text-charcoal">
                    {project.createdAt ? new Date(project.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'long' }) : 'Recent'}
                  </span>
                </div>
              </div>

            </div>

          </div>

          {/* Detailed Overview */}
          <div className="space-y-6">
            <h2 className="text-lg font-black text-charcoal tracking-tight uppercase">
              Project Overview
            </h2>
            <div className="text-gray-600 leading-relaxed text-base md:text-lg border-l-2 border-luxury-gold/30 pl-6 space-y-4">
              {project.description || "No description provided for this architectural masterpiece. OAK Constructions builds with premium design elegance, standard structural integrity, and exquisite modern engineering specifications tailored to create timeless structures."}
            </div>
          </div>

          {/* Vertical Lookbook Gallery */}
          {extraImages.length > 0 && (
            <div className="space-y-10 pt-8 border-t border-charcoal/5">
              <div className="space-y-2">
                <span className="text-luxury-gold font-black tracking-[0.4em] uppercase text-[9px] block">
                  Lookbook Showcase
                </span>
                <h3 className="text-2xl font-black text-charcoal tracking-tight">
                  Design Perspectives
                </h3>
              </div>

              <div className="space-y-8">
                {extraImages.map((imgUrl, idx) => (
                  <div
                    key={idx}
                    onClick={() => setActiveImage(imgUrl)}
                    className={`group relative overflow-hidden rounded-[2rem] shadow-luxury h-[280px] md:h-[380px] border border-charcoal/5 cursor-pointer transition-all duration-500 ${
                      activeImage === imgUrl ? 'ring-2 ring-luxury-gold ring-offset-2 scale-[1.01]' : 'hover:scale-[1.01]'
                    }`}
                  >
                    <img
                      src={imgUrl}
                      alt={`${project.title} Lookbook ${idx + 1}`}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors"></div>
                    <div className="absolute bottom-6 left-6 py-2 px-4 rounded-xl bg-white/70 backdrop-blur-md border border-white/20 text-[9px] font-black uppercase text-charcoal tracking-wider opacity-0 group-hover:opacity-100 transition-opacity">
                      Perspective 0{idx + 1} • Click to Showcase
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

      </div>

    </div>
  );
};

export default ProjectDetails;
