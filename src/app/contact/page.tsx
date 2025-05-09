import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Liên Hệ - Tarot World',
  description: 'Liên hệ với chúng tôi tại Tarot World nếu bạn có bất kỳ câu hỏi hoặc phản hồi nào.',
};

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-purple-800 mb-6 text-center">Liên Hệ Với Chúng Tôi</h1>
      <div className="max-w-xl mx-auto bg-white p-6 md:p-8 rounded-lg shadow-md">
        <p className="text-gray-700 mb-6">
          Chúng tôi rất vui khi được lắng nghe từ bạn! Nếu bạn có bất kỳ câu hỏi, phản hồi, hoặc đề xuất nào,
          xin vui lòng sử dụng biểu mẫu dưới đây hoặc gửi email trực tiếp cho chúng tôi.
        </p>
        
        {/* TODO: Implement a functional contact form later */}
        <form action="#" method="POST" className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Họ và tên</label>
            <input type="text" name="name" id="name" autoComplete="name" required 
                   className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm" />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input type="email" name="email" id="email" autoComplete="email" required
                   className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm" />
          </div>
          <div>
            <label htmlFor="subject" className="block text-sm font-medium text-gray-700">Chủ đề</label>
            <input type="text" name="subject" id="subject"
                   className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm" />
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700">Nội dung</label>
            <textarea id="message" name="message" rows={4} required
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"></textarea>
          </div>
          <div>
            <button type="submit"
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500">
              Gửi Tin Nhắn
            </button>
          </div>
        </form>
        <p className="text-center text-gray-600 mt-8">
          Hoặc bạn có thể gửi email cho chúng tôi tại: <a href="mailto:contact@tarotworld.example.com" className="text-purple-600 hover:underline">contact@tarotworld.example.com</a>
        </p>
      </div>
    </div>
  );
}
