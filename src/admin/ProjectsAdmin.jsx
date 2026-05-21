import { useState, useEffect } from 'react';
import { database } from '../firebase';
import { ref, push, remove, update, onValue } from 'firebase/database';
import { uploadToCloudinary } from '../utils/cloudinaryUpload';
import { toast } from 'react-hot-toast';

const generateSlug = (title) => {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

const ProjectsAdmin = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    image: null,
    location: '',
    owner: '',
    description: '',
    extraImage1: null,
    extraImage2: null,
    extraImage3: null,
    clientImage: null
  });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    const projectsRef = ref(database, 'projects');
    const unsubscribe = onValue(projectsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const parsed = Object.keys(data).map(key => ({ id: key, ...data[key] }));
        setProjects(parsed);
      } else {
        setProjects([]);
      }
    });
    return () => unsubscribe();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    let imageUrl = formData.image;
    let extraImageUrl1 = formData.extraImage1;
    let extraImageUrl2 = formData.extraImage2;
    let extraImageUrl3 = formData.extraImage3;
    let clientImageUrl = formData.clientImage;
    
    try {
      if (typeof formData.image !== 'string' && formData.image) {
         imageUrl = await uploadToCloudinary(formData.image);
      }
      if (typeof formData.extraImage1 !== 'string' && formData.extraImage1) {
         extraImageUrl1 = await uploadToCloudinary(formData.extraImage1);
      }
      if (typeof formData.extraImage2 !== 'string' && formData.extraImage2) {
         extraImageUrl2 = await uploadToCloudinary(formData.extraImage2);
      }
      if (typeof formData.extraImage3 !== 'string' && formData.extraImage3) {
         extraImageUrl3 = await uploadToCloudinary(formData.extraImage3);
      }
      if (typeof formData.clientImage !== 'string' && formData.clientImage) {
         clientImageUrl = await uploadToCloudinary(formData.clientImage);
      }

      const projectData = {
        title: formData.title,
        image: imageUrl || '',
        location: formData.location || '',
        owner: formData.owner || '',
        description: formData.description || '',
        extraImage1: extraImageUrl1 || '',
        extraImage2: extraImageUrl2 || '',
        extraImage3: extraImageUrl3 || '',
        clientImage: clientImageUrl || '',
        slug: generateSlug(formData.title),
        createdAt: new Date().toISOString()
      };

      if (editingId) {
        await update(ref(database, `projects/${editingId}`), projectData);
        toast.success('Project updated successfully');
      } else {
        await push(ref(database, 'projects'), projectData);
        toast.success('Project added successfully');
      }
      
      setFormData({
        title: '',
        image: null,
        location: '',
        owner: '',
        description: '',
        extraImage1: null,
        extraImage2: null,
        extraImage3: null,
        clientImage: null
      });
      setEditingId(null);
    } catch (error) {
      console.error(error);
      toast.error(error.message || 'Operation failed');
    }
    setLoading(false);
  };

  const handleDelete = async (id) => {
    if(window.confirm('Are you sure you want to delete this project?')) {
      await remove(ref(database, `projects/${id}`));
      toast.success('Project deleted');
    }
  };

  const handleEdit = (project) => {
    setFormData({
      title: project.title,
      image: project.image || null,
      location: project.location || '',
      owner: project.owner || '',
      description: project.description || '',
      extraImage1: project.extraImage1 || null,
      extraImage2: project.extraImage2 || null,
      extraImage3: project.extraImage3 || null,
      clientImage: project.clientImage || null
    });
    setEditingId(project.id);
  };

  return (
    <div>
      <div className="mb-10">
        <span className="text-luxury-gold font-black tracking-[0.4em] uppercase text-[10px] mb-2 block">Management</span>
        <h1 className="text-4xl font-black text-charcoal tracking-tighter">Manage <span className="text-luxury-gold italic">Projects</span></h1>
      </div>
      
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-[2rem] shadow-luxury border border-charcoal/5 mb-12 space-y-6">
        <h3 className="font-black tracking-widest uppercase text-xs text-charcoal mb-4 border-b border-gray-100 pb-4">{editingId ? 'Edit Project' : 'Add New Project'}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <input type="text" placeholder="Project Title" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="px-5 py-4 bg-[#FDFBF7] rounded-xl w-full text-sm font-medium focus:outline-none focus:ring-2 focus:ring-luxury-gold/50 transition-all md:col-span-2" required />
          <input type="text" placeholder="Location" value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})} className="px-5 py-4 bg-[#FDFBF7] rounded-xl w-full text-sm font-medium focus:outline-none focus:ring-2 focus:ring-luxury-gold/50 transition-all" />
          <input type="text" placeholder="Owner Name" value={formData.owner} onChange={e => setFormData({...formData, owner: e.target.value})} className="px-5 py-4 bg-[#FDFBF7] rounded-xl w-full text-sm font-medium focus:outline-none focus:ring-2 focus:ring-luxury-gold/50 transition-all" />
          
          <div className="bg-[#FDFBF7] p-5 rounded-xl border border-gray-100 md:col-span-2">
            <span className="text-[10px] font-black uppercase tracking-widest text-charcoal mb-4 block">Client Avatar Image</span>
            <div className="flex flex-col md:flex-row gap-4 items-center">
              <input type="file" onChange={e => setFormData({...formData, clientImage: e.target.files[0]})} className="w-full md:w-auto text-sm font-medium file:mr-4 file:py-3 file:px-6 file:rounded-full file:border-0 file:text-[10px] file:font-black file:uppercase file:tracking-widest file:bg-charcoal file:text-white hover:file:bg-black cursor-pointer" accept="image/*" />
              <span className="text-[10px] font-black tracking-widest text-gray-400 uppercase">OR</span>
              <input type="url" placeholder="Paste Direct Avatar Image URL" value={typeof formData.clientImage === 'string' ? formData.clientImage : ''} onChange={e => setFormData({...formData, clientImage: e.target.value})} className="px-5 py-3 bg-white rounded-lg w-full text-sm font-medium focus:outline-none border border-gray-100" />
            </div>
          </div>

          <textarea placeholder="Description" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="px-5 py-4 bg-[#FDFBF7] rounded-xl w-full md:col-span-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-luxury-gold/50 transition-all" rows="4" />
          
          <div className="bg-[#FDFBF7] p-5 rounded-xl border border-gray-100 md:col-span-2">
            <span className="text-[10px] font-black uppercase tracking-widest text-charcoal mb-4 block">Main Image Source</span>
            <div className="flex flex-col md:flex-row gap-4 items-center">
              <input type="file" onChange={e => setFormData({...formData, image: e.target.files[0]})} className="w-full md:w-auto text-sm font-medium file:mr-4 file:py-3 file:px-6 file:rounded-full file:border-0 file:text-[10px] file:font-black file:uppercase file:tracking-widest file:bg-charcoal file:text-white hover:file:bg-black cursor-pointer" accept="image/*" />
              <span className="text-[10px] font-black tracking-widest text-gray-400 uppercase">OR</span>
              <input type="url" placeholder="Paste Direct Image URL" value={typeof formData.image === 'string' ? formData.image : ''} onChange={e => setFormData({...formData, image: e.target.value})} className="px-5 py-3 bg-white rounded-lg w-full text-sm font-medium focus:outline-none border border-gray-100" />
            </div>
          </div>

          <div className="bg-[#FDFBF7] p-5 rounded-xl border border-gray-100">
            <span className="text-[10px] font-black uppercase tracking-widest text-charcoal mb-4 block">Additional Image 1</span>
            <div className="flex flex-col gap-3">
              <input type="file" onChange={e => setFormData({...formData, extraImage1: e.target.files[0]})} className="w-full text-sm font-medium file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-[9px] file:font-black file:uppercase file:tracking-widest file:bg-charcoal file:text-white hover:file:bg-black cursor-pointer" accept="image/*" />
              <input type="url" placeholder="Paste Direct Image URL" value={typeof formData.extraImage1 === 'string' ? formData.extraImage1 : ''} onChange={e => setFormData({...formData, extraImage1: e.target.value})} className="px-4 py-2 bg-white rounded-lg w-full text-xs font-medium focus:outline-none border border-gray-100" />
            </div>
          </div>

          <div className="bg-[#FDFBF7] p-5 rounded-xl border border-gray-100">
            <span className="text-[10px] font-black uppercase tracking-widest text-charcoal mb-4 block">Additional Image 2</span>
            <div className="flex flex-col gap-3">
              <input type="file" onChange={e => setFormData({...formData, extraImage2: e.target.files[0]})} className="w-full text-sm font-medium file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-[9px] file:font-black file:uppercase file:tracking-widest file:bg-charcoal file:text-white hover:file:bg-black cursor-pointer" accept="image/*" />
              <input type="url" placeholder="Paste Direct Image URL" value={typeof formData.extraImage2 === 'string' ? formData.extraImage2 : ''} onChange={e => setFormData({...formData, extraImage2: e.target.value})} className="px-4 py-2 bg-white rounded-lg w-full text-xs font-medium focus:outline-none border border-gray-100" />
            </div>
          </div>

          <div className="bg-[#FDFBF7] p-5 rounded-xl border border-gray-100 md:col-span-2">
            <span className="text-[10px] font-black uppercase tracking-widest text-charcoal mb-4 block">Additional Image 3</span>
            <div className="flex flex-col gap-3">
              <input type="file" onChange={e => setFormData({...formData, extraImage3: e.target.files[0]})} className="w-full text-sm font-medium file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-[9px] file:font-black file:uppercase file:tracking-widest file:bg-charcoal file:text-white hover:file:bg-black cursor-pointer" accept="image/*" />
              <input type="url" placeholder="Paste Direct Image URL" value={typeof formData.extraImage3 === 'string' ? formData.extraImage3 : ''} onChange={e => setFormData({...formData, extraImage3: e.target.value})} className="px-4 py-2 bg-white rounded-lg w-full text-xs font-medium focus:outline-none border border-gray-100" />
            </div>
          </div>
        </div>
        <div className="flex gap-4 pt-2">
          <button type="submit" disabled={loading} className="px-8 py-4 bg-charcoal text-white font-black rounded-full uppercase tracking-widest text-[10px] hover:bg-black transition-colors">
            {loading ? 'Processing...' : editingId ? 'Update Project' : 'Publish Project'}
          </button>
          {editingId && (
            <button type="button" onClick={() => { setEditingId(null); setFormData({ title: '', image: null, location: '', owner: '', description: '', extraImage1: null, extraImage2: null, extraImage3: null, clientImage: null }) }} className="px-8 py-4 bg-gray-200 text-charcoal font-black rounded-full uppercase tracking-widest text-[10px] hover:bg-gray-300 transition-colors">
              Cancel
            </button>
          )}
        </div>
      </form>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {projects.map(p => (
          <div key={p.id} className="bg-white rounded-[2rem] shadow-luxury border border-charcoal/5 overflow-hidden group">
            <div className="relative h-56 overflow-hidden">
              <img src={p.image} alt={p.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
            </div>
            <div className="p-6">
              <h3 className="font-black text-xl mb-6 text-charcoal line-clamp-1">{p.title}</h3>
              <div className="flex gap-3">
                <button onClick={() => handleEdit(p)} className="flex-1 py-3 bg-[#FDFBF7] rounded-xl text-[10px] font-black uppercase tracking-widest text-charcoal hover:bg-luxury-gold hover:text-white transition-colors">Edit</button>
                <button onClick={() => handleDelete(p.id)} className="flex-1 py-3 bg-red-50 text-red-600 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-red-500 hover:text-white transition-colors">Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectsAdmin;
