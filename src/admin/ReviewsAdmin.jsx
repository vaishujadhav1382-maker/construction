import { useState, useEffect } from 'react';
import { database } from '../firebase';
import { ref, push, remove, update, onValue } from 'firebase/database';
import { uploadToCloudinary } from '../utils/cloudinaryUpload';
import { toast } from 'react-hot-toast';

const ReviewsAdmin = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ name: '', role: '', message: '', rating: 5, image: null });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    const reviewsRef = ref(database, 'reviews');
    const unsubscribe = onValue(reviewsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const parsed = Object.keys(data).map(key => ({ id: key, ...data[key] }));
        setReviews(parsed);
      } else {
        setReviews([]);
      }
    });
    return () => unsubscribe();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    let imageUrl = formData.image;
    
    try {
      if (typeof formData.image !== 'string' && formData.image) {
         imageUrl = await uploadToCloudinary(formData.image);
      }

      const reviewData = {
        name: formData.name,
        role: formData.role,
        message: formData.message,
        rating: Number(formData.rating),
        image: imageUrl || '',
        createdAt: new Date().toISOString()
      };

      if (editingId) {
        await update(ref(database, `reviews/${editingId}`), reviewData);
        toast.success('Review updated successfully');
      } else {
        await push(ref(database, 'reviews'), reviewData);
        toast.success('Review added successfully');
      }
      
      setFormData({ name: '', role: '', message: '', rating: 5, image: null });
      setEditingId(null);
    } catch (error) {
      toast.error('Operation failed');
    }
    setLoading(false);
  };

  const handleDelete = async (id) => {
    if(window.confirm('Are you sure you want to delete this review?')) {
      await remove(ref(database, `reviews/${id}`));
      toast.success('Review deleted');
    }
  };

  const handleEdit = (review) => {
    setFormData({ name: review.name, role: review.role, message: review.message, rating: review.rating, image: review.image });
    setEditingId(review.id);
  };

  return (
    <div>
      <div className="mb-10">
        <span className="text-luxury-gold font-black tracking-[0.4em] uppercase text-[10px] mb-2 block">Management</span>
        <h1 className="text-4xl font-black text-charcoal tracking-tighter">Manage <span className="text-luxury-gold italic">Reviews</span></h1>
      </div>
      
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-[2rem] shadow-luxury border border-charcoal/5 mb-12 space-y-6">
        <h3 className="font-black tracking-widest uppercase text-xs text-charcoal mb-4 border-b border-gray-100 pb-4">{editingId ? 'Edit Review' : 'Add New Review'}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <input type="text" placeholder="Customer Name" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="px-5 py-4 bg-[#FDFBF7] rounded-xl w-full text-sm font-medium focus:outline-none focus:ring-2 focus:ring-luxury-gold/50 transition-all" required />
          <input type="text" placeholder="Role (e.g. CEO)" value={formData.role} onChange={e => setFormData({...formData, role: e.target.value})} className="px-5 py-4 bg-[#FDFBF7] rounded-xl w-full text-sm font-medium focus:outline-none focus:ring-2 focus:ring-luxury-gold/50 transition-all" required />
          <textarea placeholder="Message" value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} className="px-5 py-4 bg-[#FDFBF7] rounded-xl w-full md:col-span-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-luxury-gold/50 transition-all" rows="3" required />
          <input type="number" min="1" max="5" placeholder="Rating (1-5)" value={formData.rating} onChange={e => setFormData({...formData, rating: e.target.value})} className="px-5 py-4 bg-[#FDFBF7] rounded-xl w-full text-sm font-medium focus:outline-none focus:ring-2 focus:ring-luxury-gold/50 transition-all" required />
          <input type="file" onChange={e => setFormData({...formData, image: e.target.files[0]})} className="px-5 py-4 bg-[#FDFBF7] rounded-xl w-full text-sm font-medium file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-black file:uppercase file:tracking-widest file:bg-charcoal file:text-white hover:file:bg-black cursor-pointer" accept="image/*" />
        </div>
        <div className="flex gap-4 pt-2">
          <button type="submit" disabled={loading} className="px-8 py-4 bg-charcoal text-white font-black rounded-full uppercase tracking-widest text-[10px] hover:bg-black transition-colors">
            {loading ? 'Processing...' : editingId ? 'Update Review' : 'Publish Review'}
          </button>
          {editingId && (
            <button type="button" onClick={() => { setEditingId(null); setFormData({name: '', role: '', message: '', rating: 5, image: null}) }} className="px-8 py-4 bg-gray-200 text-charcoal font-black rounded-full uppercase tracking-widest text-[10px] hover:bg-gray-300 transition-colors">
              Cancel
            </button>
          )}
        </div>
      </form>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {reviews.map(r => (
          <div key={r.id} className="bg-white rounded-[2rem] shadow-luxury p-8 border border-charcoal/5 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-24 h-24 bg-luxury-gold/5 rounded-bl-[80px] -z-10 group-hover:scale-125 transition-transform duration-500"></div>
            
            <div className="flex items-center gap-5 mb-6">
              {r.image ? (
                <img src={r.image} alt={r.name} className="w-16 h-16 rounded-full object-cover shadow-md border-2 border-white" />
              ) : (
                <div className="w-16 h-16 rounded-full bg-luxury-beige flex items-center justify-center font-black text-xl text-luxury-gold">{r.name.charAt(0)}</div>
              )}
              <div>
                <h3 className="font-black text-lg text-charcoal">{r.name}</h3>
                <p className="text-[10px] text-luxury-gold uppercase tracking-widest font-bold">{r.role}</p>
              </div>
            </div>
            
            <p className="text-sm text-slate-500 italic mb-8 leading-relaxed line-clamp-3">"{r.message}"</p>
            
            <div className="flex justify-between items-center mt-auto border-t border-gray-50 pt-6">
              <span className="text-charcoal text-xs font-black tracking-widest">★ {r.rating} / 5</span>
              <div className="flex gap-2">
                <button onClick={() => handleEdit(r)} className="px-4 py-2 bg-[#FDFBF7] rounded-lg text-[9px] font-black uppercase tracking-widest text-charcoal hover:bg-luxury-gold hover:text-white transition-colors">Edit</button>
                <button onClick={() => handleDelete(r.id)} className="px-4 py-2 bg-red-50 text-red-600 rounded-lg text-[9px] font-black uppercase tracking-widest hover:bg-red-500 hover:text-white transition-colors">Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewsAdmin;
