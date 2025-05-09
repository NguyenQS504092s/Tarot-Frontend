import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Về Tarot World - Sứ Mệnh & Tầm Nhìn',
  description: 'Khám phá sứ mệnh, tầm nhìn và những giá trị cốt lõi mà Tarot World mang đến cho cộng đồng yêu Tarot tại Việt Nam và trên toàn cầu.',
};

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-purple-800 mb-8 text-center">Khám Phá Tarot World</h1>
      
      <div className="prose prose-lg max-w-3xl mx-auto bg-white p-6 md:p-8 rounded-lg shadow-md space-y-6">
        <p className="text-xl italic text-gray-700">
          Chào mừng bạn đến với Tarot World – không gian trực tuyến dành riêng cho những ai muốn khám phá chiều sâu và sự huyền bí của Tarot. Chúng tôi tin rằng Tarot không chỉ là một bộ bài, mà là một công cụ mạnh mẽ để thấu hiểu bản thân, tìm kiếm sự rõ ràng và định hướng trên hành trình cuộc sống.
        </p>

        <h2 className="text-3xl font-semibold text-purple-700 !mt-10 border-b-2 border-purple-200 pb-2">Sứ Mệnh Của Chúng Tôi</h2>
        <p>
          Trong bối cảnh thị trường dịch vụ Tarot trực tuyến toàn cầu đang phát triển mạnh mẽ, với giá trị dự kiến đạt hàng tỷ đô la và tốc độ tăng trưởng kép hàng năm ấn tượng (CAGR ~3.5-9.4%), Tarot World ra đời với sứ mệnh trở thành một nguồn tài nguyên đáng tin cậy, dễ tiếp cận và giàu thông tin cho cộng đồng yêu Tarot tại Việt Nam và vươn ra thế giới. 
        </p>
        <p>
          Chúng tôi nhận thấy sự quan tâm ngày càng tăng đối với tâm linh và các hình thức hướng dẫn thay thế. Đồng thời, chúng tôi cũng hiểu rõ những thách thức như sự hoài nghi và nhu cầu xây dựng niềm tin trong lĩnh vực này. Vì vậy, sứ mệnh của Tarot World là:
        </p>
        <ul className="list-disc list-inside space-y-2">
          <li>Cung cấp nội dung chất lượng cao, chính xác và hướng đến người dùng, thể hiện rõ ràng Kinh nghiệm, Chuyên môn, Tính thẩm quyền và Độ tin cậy (E-E-A-T).</li>
          <li>Tạo ra một trải nghiệm người dùng (UX) vượt trội: trực quan, dễ điều hướng, tốc độ tải trang nhanh và thân thiện trên mọi thiết bị, đặc biệt là di động.</li>
          <li>Giúp người dùng, từ người mới bắt đầu đến những reader có kinh nghiệm, dễ dàng tìm thấy thông tin họ cần thông qua việc tối ưu hóa công cụ tìm kiếm (SEO) một cách bài bản và có đạo đức.</li>
          <li>Bình thường hóa và nâng cao hiểu biết đúng đắn về Tarot như một công cụ phát triển cá nhân và tự suy ngẫm.</li>
        </ul>

        <h2 className="text-3xl font-semibold text-purple-700 !mt-10 border-b-2 border-purple-200 pb-2">Những Gì Tarot World Mang Đến</h2>
        <p>
          Để thực hiện sứ mệnh của mình, Tarot World tập trung vào việc xây dựng và cung cấp:
        </p>
        <ul className="list-disc list-inside space-y-2">
          <li><strong>Kiến thức Tarot Chuyên sâu:</strong> Giải nghĩa chi tiết 78 lá bài, phân tích các kiểu trải bài phổ biến, và các bài viết blog chuyên đề về lịch sử, biểu tượng, và ứng dụng Tarot trong cuộc sống.</li>
          <li><strong>Thiết kế Ưu tiên Người dùng:</strong> Giao diện website được thiết kế để tạo cảm giác chào đón, tin cậy, với màu sắc hài hòa, hình ảnh chất lượng và điều hướng trực quan. Chúng tôi cam kết tối ưu hóa Core Web Vitals và khả năng truy cập.</li>
          <li><strong>Nội dung Tối ưu SEO:</strong> Chúng tôi thực hiện nghiên cứu từ khóa kỹ lưỡng và áp dụng các chiến lược SEO tiên tiến để đảm bảo nội dung của Tarot World dễ dàng được tìm thấy trên Google, đáp ứng đúng ý định tìm kiếm của người dùng.</li>
          <li><strong>Cộng đồng (Dự kiến):</strong> Trong tương lai, chúng tôi mong muốn xây dựng một cộng đồng nơi người dùng có thể chia sẻ, học hỏi và cùng nhau phát triển trên hành trình Tarot.</li>
          <li><strong>Dịch vụ Tarot (Dự kiến):</strong> Các tính năng tương tác cho phép tự trải bài và kết nối với các Tarot reader chuyên nghiệp.</li>
        </ul>

        <h2 className="text-3xl font-semibold text-purple-700 !mt-10 border-b-2 border-purple-200 pb-2">Định Vị Trong Thị Trường Tarot Online</h2>
        <p>
          Thị trường Tarot trực tuyến rất đa dạng, từ các nền tảng lớn lâu đời đến các dịch vụ chuyên biệt và ứng dụng AI mới nổi. Tarot World hướng đến việc kết hợp chiều sâu kiến thức truyền thống với công nghệ hiện đại và thiết kế lấy người dùng làm trung tâm. Chúng tôi không chỉ cung cấp thông tin mà còn mong muốn xây dựng một không gian học hỏi và thực hành Tarot đáng tin cậy.
        </p>
        <p>
          Cảm ơn bạn đã đồng hành cùng Tarot World. Chúng tôi rất vui được chia sẻ hành trình này với bạn!
        </p>
      </div>
    </div>
  );
}
