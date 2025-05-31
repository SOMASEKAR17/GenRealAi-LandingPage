import React from 'react';
import { FaLinkedin, FaInstagram, FaYoutube } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="w-full bg-gradient-to-br from-[#096459] via-[#137a74] to-[#19b6b6] text-[#cfd8dc] font-['Montserrat'] relative">
      <div className="max-w-7xl mx-auto px-8 py-10">
        <div className="flex flex-col md:flex-row justify-between gap-8">
          {/* Left Section */}
          <div className="min-w-[180px] flex-1">
            <img src="/logoGenReal.png" alt="GenReal.AI Logo" className="w-16 mb-2" />
            <div className="flex gap-4 mb-2">
              <a href="#" aria-label="LinkedIn" className="text-white bg-transparent rounded-md p-1.5 text-2xl flex items-center justify-center w-9 h-9 transition-all duration-200 hover:bg-white/10">
                <FaLinkedin />
              </a>
              <a href="#" aria-label="Instagram" className="text-white bg-transparent rounded-md p-1.5 text-2xl flex items-center justify-center w-9 h-9 transition-all duration-200 hover:bg-white/10">
                <FaInstagram />
              </a>
              <a href="#" aria-label="YouTube" className="text-white bg-transparent rounded-md p-1.5 text-2xl flex items-center justify-center w-9 h-9 transition-all duration-200 hover:bg-white/10">
                <FaYoutube />
              </a>
            </div>
            <div className="text-base">
              <p>Based in Vellore, Tamil Nadu<br />India</p>
            </div>
          </div>

          {/* Center Section */}
          <div className="min-w-[180px] flex-1">
            <ul className="space-y-3.5">
              <li className="text-[#cfd8dc] text-[1.08rem] cursor-pointer transition-colors duration-200 hover:text-white">Home</li>
              <li className="text-[#cfd8dc] text-[1.08rem] cursor-pointer transition-colors duration-200 hover:text-white">About</li>
              <li className="text-[#cfd8dc] text-[1.08rem] cursor-pointer transition-colors duration-200 hover:text-white">Features</li>
              <li className="text-[#cfd8dc] text-[1.08rem] cursor-pointer transition-colors duration-200 hover:text-white">News</li>
              <li className="text-[#cfd8dc] text-[1.08rem] cursor-pointer transition-colors duration-200 hover:text-white">Education</li>
              <li className="text-[#cfd8dc] text-[1.08rem] cursor-pointer transition-colors duration-200 hover:text-white">Frequently Asked Questions</li>
              <li className="text-[#cfd8dc] text-[1.08rem] cursor-pointer transition-colors duration-200 hover:text-white">Contact Us</li>
            </ul>
          </div>

          {/* Right Section */}
          <div className="min-w-[180px] flex-1">
            <ul className="space-y-3.5">
              <li className="text-[#cfd8dc] text-[1.08rem] cursor-pointer transition-colors duration-200 hover:text-white">Privacy Policy</li>
              <li className="text-[#cfd8dc] text-[1.08rem] cursor-pointer transition-colors duration-200 hover:text-white">Terms of Service</li>
              <li className="text-[#cfd8dc] text-[1.08rem] cursor-pointer transition-colors duration-200 hover:text-white">Designer Agreement</li>
              <li className="text-[#cfd8dc] text-[1.08rem] cursor-pointer transition-colors duration-200 hover:text-white">Our Team</li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-8 text-base text-[#cfd8dc]">
          <p>Copyright @ 2025 GenReal - All Rights Reserved</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 