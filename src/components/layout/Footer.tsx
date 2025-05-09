import React from 'react'; // Add React import

export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-gray-800 text-gray-400 py-4 mt-8">
      <div className="container mx-auto px-4 text-center text-sm">
        &copy; {currentYear} Tarot World. All rights reserved. |
        <a href="/privacy-policy" className="hover:text-white ml-2">Privacy Policy</a> |
        <a href="/terms-of-service" className="hover:text-white ml-2">Terms of Service</a>
      </div>
    </footer>
  );
}
