import React from 'react';
import { FaLinkedin, FaInstagram, FaYoutube } from 'react-icons/fa';
import logo from '/logoGenReal.png';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-[#124B41] to-[rgba(43,177,155,0.3)] text-white px-4 pt-6 pb-4">
      <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row justify-center md:justify-between items-center md:items-start gap-8 md:gap-x-20">
        {/* Left Section */}
        <div className="flex-1 min-w-[250px] text-center md:text-left">
          <img src={logo} alt="GenReal Logo" className="h-16 mb-3 mx-auto md:mx-0" />
          <div className="flex gap-4 text-xl mb-3 justify-center md:justify-start">
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300">
              <FaLinkedin />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300">
              <FaInstagram />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300">
              <FaYoutube />
            </a>
          </div>
          <p className="text-sm">Based in Vellore, Tamil Nadu, India</p>
        </div>

        {/* Right Section */}
        <div className="flex-1 min-w-[200px] text-center md:text-right">
          <ul className="list-none space-y-2">
            <li>
              <a href="/privacy" className="text-white hover:underline">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="/terms" className="text-white hover:underline">
                Terms of Service
              </a>
            </li>
            <li>
              <a href="/agreement" className="text-white hover:underline">
                Designer Agreement
              </a>
            </li>
            <li>
              <a href="/team" className="text-white hover:underline">
                Our Team
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Text */}
      <div className="text-center mt-6 text-sm opacity-70">
        © 2025 GenReal - All Rights Reserved
      </div>
    </footer>
  );
};

export default Footer;
