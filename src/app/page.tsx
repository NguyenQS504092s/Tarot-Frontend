import React from 'react'; // Keep React import if needed, though often implicit now

export default function HomePage() {
  // Replace the default content with our simple welcome message
  return (
    <div>
      <h1 className="text-3xl font-bold text-center text-purple-800 mb-6">
        Chào mừng đến với Tarot World
      </h1>
      <p className="text-lg text-center text-gray-700">
        Khám phá ý nghĩa các lá bài, thử các trải bài khác nhau, hoặc nhận một lượt đọc bài cá nhân.
      </p>
      {/* More content will be added later */}
    </div>
  );
}
