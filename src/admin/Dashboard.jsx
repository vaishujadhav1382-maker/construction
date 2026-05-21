import { useEffect, useState } from 'react';
import { database } from '../firebase';
import { ref, onValue } from 'firebase/database';

const Dashboard = () => {
  const [counts, setCounts] = useState({ projects: 0, gallery: 0, reviews: 0 });

  useEffect(() => {
    const refs = ['projects', 'gallery', 'reviews'];
    const unsubscribes = refs.map(key => {
      return onValue(ref(database, key), (snapshot) => {
        const data = snapshot.val();
        setCounts(prev => ({ ...prev, [key]: data ? Object.keys(data).length : 0 }));
      });
    });

    return () => unsubscribes.forEach(unsub => unsub());
  }, []);

  return (
    <div>
      <div className="mb-10">
        <span className="text-luxury-gold font-black tracking-[0.4em] uppercase text-[10px] mb-2 block">Overview</span>
        <h1 className="text-4xl font-black text-charcoal tracking-tighter">Admin <span className="text-luxury-gold italic">Dashboard</span></h1>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white p-8 rounded-[2rem] shadow-luxury border border-charcoal/5 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-luxury-gold/5 rounded-bl-[100px] -z-10 group-hover:scale-110 transition-transform duration-500"></div>
          <h3 className="text-slate-400 font-bold uppercase tracking-[0.2em] text-[10px] mb-2">Total Projects</h3>
          <p className="text-6xl font-black text-charcoal">{counts.projects}</p>
        </div>
        
        <div className="bg-white p-8 rounded-[2rem] shadow-luxury border border-charcoal/5 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-luxury-gold/5 rounded-bl-[100px] -z-10 group-hover:scale-110 transition-transform duration-500"></div>
          <h3 className="text-slate-400 font-bold uppercase tracking-[0.2em] text-[10px] mb-2">Gallery Images</h3>
          <p className="text-6xl font-black text-charcoal">{counts.gallery}</p>
        </div>
        
        <div className="bg-white p-8 rounded-[2rem] shadow-luxury border border-charcoal/5 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-luxury-gold/5 rounded-bl-[100px] -z-10 group-hover:scale-110 transition-transform duration-500"></div>
          <h3 className="text-slate-400 font-bold uppercase tracking-[0.2em] text-[10px] mb-2">Total Reviews</h3>
          <p className="text-6xl font-black text-charcoal">{counts.reviews}</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
