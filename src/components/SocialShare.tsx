import React, { useState } from 'react';
import { Share2, Facebook } from 'lucide-react';
import { FaWhatsapp, FaTelegramPlane } from "react-icons/fa";
import { Instagram } from 'lucide-react';

const SocialShare = ({ inline = false }) => {
  const [isOpen, setIsOpen] = useState(false);

  const socialLinks = [
    { icon: <Instagram className="w-6 h-6" />, url: "https://instagram.com/deinprofil", color: "#c32aa3", i: 0, label: "Instagram" },
    { icon: <Facebook className="w-6 h-6" />, url: "https://facebook.com/deinprofil", color: "#1877f2", i: 1, label: "Facebook" },
    { icon: <FaWhatsapp className="w-6 h-6" />, url: "https://wa.me/49157546454", color: "#25d366", i: 2, label: "WhatsApp" },
    { icon: <FaTelegramPlane className="w-6 h-6" />, url: "https://t.me/NachhilfePlus", color: "#0088cc", i: 3, label: "Telegram" },
  ];

  const radius = 140;
  const itemCount = socialLinks.length;

  // Inline version for Contact section
  if (inline) {
    return (
      <div className="relative inline-block">
        <div className="relative w-72 h-72 flex items-center justify-center">
          {/* Toggle Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`absolute w-16 h-16 rounded-full bg-white border-2 border-gray-100 flex items-center justify-center cursor-pointer transition-all duration-300 z-50 shadow-lg hover:shadow-xl ${
              isOpen ? 'border-primary' : ''
            }`}
            style={{
              transform: isOpen ? 'rotate(360deg)' : 'rotate(0deg)',
            }}
          >
            <Share2 className="w-7 h-7 text-gray-800" strokeWidth={2.5} />
          </button>

          {/* Social Icons */}
          {socialLinks.map((social) => {
            const angle = (360 / itemCount) * social.i;
            const x = Math.cos((angle * Math.PI) / 180) * radius;
            const y = Math.sin((angle * Math.PI) / 180) * radius;

            return (
              <a
                key={social.i}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute w-16 h-16 rounded-full bg-white flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-125 cursor-pointer"
                style={{
                  color: social.color,
                  transform: isOpen
                    ? `translate(${x}px, ${y}px) scale(1)`
                    : `translate(0, 0) scale(0)`,
                  transitionDelay: isOpen ? `${social.i * 50}ms` : `${(itemCount - social.i) * 50}ms`,
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget;
                  el.style.boxShadow = `0 0 0 3px ${social.color}, 0 0 0 6px white`;
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget;
                  el.style.boxShadow = '0 10px 15px rgba(0, 0, 0, 0.1)';
                }}
              >
                {social.icon}
              </a>
            );
          })}
        </div>
      </div>
    );
  }

  // Floating version for bottom right
  return (
    <div className="fixed bottom-8 right-8 z-40">
      <div className="relative w-72 h-72 flex items-center justify-center">
        {/* Toggle Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`absolute w-16 h-16 rounded-full bg-white border-2 border-gray-100 flex items-center justify-center cursor-pointer transition-all duration-300 z-50 shadow-lg hover:shadow-xl ${
            isOpen ? 'border-primary' : ''
          }`}
          style={{
            transform: isOpen ? 'rotate(360deg)' : 'rotate(0deg)',
          }}
        >
          <Share2 className="w-7 h-7 text-gray-800" strokeWidth={2.5} />
        </button>

        {/* Social Icons */}
        {socialLinks.map((social) => {
          const angle = (360 / itemCount) * social.i;
          const x = Math.cos((angle * Math.PI) / 180) * radius;
          const y = Math.sin((angle * Math.PI) / 180) * radius;

          return (
            <a
              key={social.i}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute w-16 h-16 rounded-full bg-white flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-125 cursor-pointer"
              style={{
                color: social.color,
                transform: isOpen
                  ? `translate(${x}px, ${y}px) scale(1)`
                  : `translate(0, 0) scale(0)`,
                transitionDelay: isOpen ? `${social.i * 50}ms` : `${(itemCount - social.i) * 50}ms`,
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget;
                el.style.boxShadow = `0 0 0 3px ${social.color}, 0 0 0 6px white`;
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget;
                el.style.boxShadow = '0 10px 15px rgba(0, 0, 0, 0.1)';
              }}
            >
              {social.icon}
            </a>
          );
        })}
      </div>
    </div>
  );
};

export default SocialShare;

