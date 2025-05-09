'use client'; 

import React, { useState, useContext } from 'react'; // Added useContext
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext'; // Import useAuth
// import { useRouter } from 'next/navigation'; // For redirect later

export default function LoginPage() {
  const { login: contextLogin, isLoading: authIsLoading } = useAuth(); // Get login function and loading state from context
  // const router = useRouter(); // For redirect later
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  // We'll use authIsLoading from context for the button's disabled state, 
  // but can keep a local loading for immediate UI feedback if desired, or just rely on authIsLoading.
  // For simplicity, let's use a local loading state for the form submission process itself.
  const [formSubmitting, setFormSubmitting] = useState(false);


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setFormSubmitting(true);
    try {
      await contextLogin(email, password);
      // If contextLogin is successful, it will set token and user in context
      // and also save token to localStorage.
      console.log('[LoginPage] Login successful via AuthContext');
      // TODO: Redirect after successful login
      // router.push('/'); // Example: redirect to homepage
    } catch (err: any) {
      console.error('[LoginPage] Login failed via AuthContext:', err);
      setError(err.message || 'Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin.');
    } finally {
      setFormSubmitting(false);
    }
  };

  return (
    <div className="flex justify-center items-center py-12">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center text-purple-800 mb-6">
          Đăng Nhập
        </h1>
        <form onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
              <span className="block sm:inline">{error}</span>
            </div>
          )}
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Nhập email của bạn"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
              Mật khẩu
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="********"
            />
            {/* Optional: Add Forgot Password link here */}
             <Link href="/forgot-password" className="inline-block align-baseline font-bold text-sm text-purple-600 hover:text-purple-800">
               Quên mật khẩu?
             </Link>
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              disabled={formSubmitting || authIsLoading} // Disable if form is submitting or auth context is loading
              className={`bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${ (formSubmitting || authIsLoading) ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {(formSubmitting || authIsLoading) ? 'Đang xử lý...' : 'Đăng Nhập'}
            </button>
            <Link href="/register" className="inline-block align-baseline font-bold text-sm text-purple-600 hover:text-purple-800">
              Chưa có tài khoản? Đăng ký
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
