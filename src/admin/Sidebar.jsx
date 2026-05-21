import { Link, useLocation, useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/admin/login');
  };

  const navItems = [
    { name: 'Dashboard', path: '/admin' },
    { name: 'Projects', path: '/admin/projects' },
    { name: 'Gallery', path: '/admin/gallery' },
    { name: 'Reviews', path: '/admin/reviews' },
  ];

  return (
    <div className="w-64 bg-charcoal text-white min-h-screen p-6 flex flex-col fixed inset-y-0 left-0 z-50 shadow-2xl">
      <div className="mb-12">
        <h2 className="text-2xl font-black tracking-tighter">OAK <span className="text-luxury-gold italic">Admin</span></h2>
      </div>
      
      <nav className="flex-1 space-y-2">
        {navItems.map((item) => (
          <Link 
            key={item.name} 
            to={item.path}
            className={`block px-4 py-3 rounded-lg font-bold text-sm tracking-widest uppercase transition-colors ${location.pathname === item.path ? 'bg-luxury-gold text-white' : 'text-gray-400 hover:bg-white/10 hover:text-white'}`}
          >
            {item.name}
          </Link>
        ))}
      </nav>
      
      <div>
        <button 
          onClick={handleLogout}
          className="w-full text-left px-4 py-3 text-red-400 hover:bg-red-400/10 rounded-lg font-bold text-sm tracking-widest uppercase transition-colors"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
