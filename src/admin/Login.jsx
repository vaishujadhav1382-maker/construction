import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success('Login Successful');
      navigate('/admin');
    } catch (error) {
      toast.error('Invalid Credentials or User Not Found');
      console.error(error);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-luxury-beige flex items-center justify-center p-4 relative">
      <button 
        onClick={() => navigate('/')}
        className="absolute top-8 left-8 md:top-12 md:left-12 flex items-center gap-2 text-charcoal font-black uppercase tracking-widest text-[10px] hover:text-luxury-gold transition-colors bg-white px-6 py-3 rounded-full shadow-md"
      >
        ← Back to Website
      </button>

      <div className="bg-white p-8 md:p-12 rounded-[2rem] shadow-luxury w-full max-w-md">
        <div className="text-center mb-8">
          <span className="text-luxury-gold font-black tracking-[0.4em] uppercase text-[10px] mb-2 block">Admin Access</span>
          <h2 className="text-3xl font-black text-charcoal tracking-tighter">Secure <span className="text-luxury-gold italic">Login</span></h2>
        </div>
        
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-xs font-black uppercase tracking-widest text-charcoal mb-2">Email</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-luxury-beige rounded-xl border border-transparent focus:border-luxury-gold focus:outline-none transition-colors"
              required 
            />
          </div>
          <div>
            <label className="block text-xs font-black uppercase tracking-widest text-charcoal mb-2">Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-luxury-beige rounded-xl border border-transparent focus:border-luxury-gold focus:outline-none transition-colors"
              required 
            />
          </div>
          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-charcoal text-white font-black text-xs uppercase tracking-widest py-4 rounded-xl hover:bg-black transition-colors disabled:opacity-50"
          >
            {loading ? 'Authenticating...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
