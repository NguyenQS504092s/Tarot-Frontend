'use client'; // Mark as a Client Component because it uses hooks (useState)

import React, { useState } from 'react';
import Link from 'next/link';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    // TODO: Implement actual API call to backend /api/users/login
    console.log('Login attempt with:', { email, password });
    // Simulate API call delay and potential error
    await new Promise(resolve => setTimeout(resolve, 1000));
    // Example error handling:
    // setError('Email hoặc mật khẩu không chính xác.');

    setLoading(false);
    // TODO: Handle successful login (e.g., save token, redirect)
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
              disabled={loading}
              className={`bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {loading ? 'Đang xử lý...' : 'Đăng Nhập'}
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
