import { useState, useEffect } from 'react';
import { database } from '../firebase';
import { ref, push, remove, update, onValue } from 'firebase/database';
import { uploadToCloudinary } from '../utils/cloudinaryUpload';
import { toast } from 'react-hot-toast';

const GalleryAdmin = () => {
  const [gallery, setGallery] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ title: '', image: null });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    const galleryRef = ref(database, 'gallery');
    const unsubscribe = onValue(galleryRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const parsed = Object.keys(data).map(key => ({ id: key, ...data[key] }));
        setGallery(parsed);
      } else {
        setGallery([]);
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

      const galleryData = {
        title: formData.title,
        image: imageUrl || '',
        createdAt: new Date().toISOString()
      };

      if (editingId) {
        await update(ref(database, `gallery/${editingId}`), galleryData);
        toast.success('Image updated successfully');
      } else {
        await push(ref(database, 'gallery'), galleryData);
        toast.success('Image added successfully');
      }
      
      setFormData({ title: '', image: null });
      setEditingId(null);
    } catch (error) {
      toast.error('Operation failed');
    }
    setLoading(false);
  };

  const handleDelete = async (id) => {
    if(window.confirm('Are you sure you want to delete this image?')) {
      await remove(ref(database, `gallery/${id}`));
      toast.success('Image deleted');
    }
  };

  const handleEdit = (item) => {
    setFormData({ title: item.title || '', image: item.image });
    setEditingId(item.id);
  };

  return (
    <div>
      <div className="mb-10">
        <span className="text-luxury-gold font-black tracking-[0.4em] uppercase text-[10px] mb-2 block">Management</span>
        <h1 className="text-4xl font-black text-charcoal tracking-tighter">Manage <span className="text-luxury-gold italic">Gallery</span></h1>
      </div>
      
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-[2rem] shadow-luxury border border-charcoal/5 mb-12 space-y-6">
        <h3 className="font-black tracking-widest uppercase text-xs text-charcoal mb-4 border-b border-gray-100 pb-4">{editingId ? 'Edit Image' : 'Add New Image'}</h3>
        <div className="grid grid-cols-1 gap-6">
          <input type="text" placeholder="Image Title" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="px-5 py-4 bg-[#FDFBF7] rounded-xl w-full text-sm font-medium focus:outline-none focus:ring-2 focus:ring-luxury-gold/50 transition-all" required />
          
          <div className="bg-[#FDFBF7] p-5 rounded-xl border border-gray-100">
            <span className="text-[10px] font-black uppercase tracking-widest text-charcoal mb-4 block">Image Source</span>
            <div className="flex flex-col md:flex-row gap-4 items-center">
              <input type="file" onChange={e => setFormData({...formData, image: e.target.files[0]})} className="w-full md:w-auto text-sm font-medium file:mr-4 file:py-3 file:px-6 file:rounded-full file:border-0 file:text-[10px] file:font-black file:uppercase file:tracking-widest file:bg-charcoal file:text-white hover:file:bg-black cursor-pointer" accept="image/*" />
              <span className="text-[10px] font-black tracking-widest text-gray-400 uppercase">OR</span>
              <input type="url" placeholder="Paste Direct Image URL" value={typeof formData.image === 'string' ? formData.image : ''} onChange={e => setFormData({...formData, image: e.target.value})} className="px-5 py-3 bg-white rounded-lg w-full text-sm font-medium focus:outline-none border border-gray-100" />
            </div>
          </div>
        </div>
        <div className="flex gap-4 pt-2">
          <button type="submit" disabled={loading} className="px-8 py-4 bg-charcoal text-white font-black rounded-full uppercase tracking-widest text-[10px] hover:bg-black transition-colors">
            {loading ? 'Processing...' : editingId ? 'Update Image' : 'Publish Image'}
          </button>
          {editingId && (
            <button type="button" onClick={() => { setEditingId(null); setFormData({title: '', image: null}) }} className="px-8 py-4 bg-gray-200 text-charcoal font-black rounded-full uppercase tracking-widest text-[10px] hover:bg-gray-300 transition-colors">
              Cancel
            </button>
          )}
        </div>
      </form>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8">
        {gallery.map(item => (
          <div key={item.id} className="bg-white rounded-[2rem] shadow-luxury border border-charcoal/5 overflow-hidden group">
            <div className="relative h-48 overflow-hidden">
              <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
            </div>
            <div className="p-5">
              <h3 className="font-black text-sm mb-4 text-charcoal line-clamp-1">{item.title}</h3>
              <div className="flex gap-2">
                <button onClick={() => handleEdit(item)} className="flex-1 py-2 bg-[#FDFBF7] rounded-xl text-[9px] font-black uppercase tracking-widest text-charcoal hover:bg-luxury-gold hover:text-white transition-colors">Edit</button>
                <button onClick={() => handleDelete(item.id)} className="flex-1 py-2 bg-red-50 text-red-600 rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-red-500 hover:text-white transition-colors">Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GalleryAdmin;
