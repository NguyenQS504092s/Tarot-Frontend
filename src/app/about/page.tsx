import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Giới Thiệu - Tarot World',
  description: 'Tìm hiểu thêm về Tarot World và sứ mệnh của chúng tôi.',
};

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-purple-800 mb-6 text-center">Về Chúng Tôi</h1>
      <div className="prose prose-lg max-w-3xl mx-auto bg-white p-6 md:p-8 rounded-lg shadow-md">
        <p>
          Chào mừng bạn đến với Tarot World! Chúng tôi là một đội ngũ đam mê về Tarot và mong muốn chia sẻ kiến thức,
          sự hướng dẫn và những hiểu biết sâu sắc mà Tarot có thể mang lại cho cuộc sống của bạn.
        </p>
        <h2 className="text-purple-700">Sứ Mệnh Của Chúng Tôi</h2>
        <p>
          Sứ mệnh của Tarot World là cung cấp một không gian trực tuyến đáng tin cậy, dễ tiếp cận và giàu thông tin
          cho tất cả mọi người, từ những người mới bắt đầu tìm hiểu về Tarot cho đến những reader có kinh nghiệm.
          Chúng tôi tin rằng Tarot là một công cụ mạnh mẽ để tự khám phá, phát triển cá nhân và tìm kiếm sự rõ ràng
          trong những thời điểm không chắc chắn.
        </p>
        <h2 className="text-purple-700">Những Gì Chúng Tôi Cung Cấp</h2>
        <ul>
          <li>Thông tin chi tiết về ý nghĩa của 78 lá bài Tarot.</li>
          <li>Hướng dẫn về các kiểu trải bài phổ biến và cách tự thực hiện.</li>
          <li>Bài viết blog sâu sắc về các chủ đề liên quan đến Tarot, tâm linh và phát triển bản thân.</li>
          <li>(Trong tương lai) Các tính năng tương tác để bạn có thể tự trải bài trực tuyến.</li>
          <li>(Trong tương lai) Thông tin về tử vi và chiêm tinh học.</li>
        </ul>
        <h2 className="text-purple-700">Đội Ngũ</h2>
        <p>
          Chúng tôi là một nhóm nhỏ gồm các nhà phát triển, người viết nội dung và những người yêu Tarot. Chúng tôi cam kết
          mang đến cho bạn những nội dung chất lượng và một trải nghiệm người dùng tuyệt vời.
        </p>
        <p>
          Cảm ơn bạn đã ghé thăm Tarot World!
        </p>
      </div>
    </div>
  );
}
