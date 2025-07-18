import React from 'react';
import { FaLinkedin, FaInstagram, FaYoutube } from 'react-icons/fa';
import logo from '/logoGenReal.png';

const Footer = () => {
  return (
    <footer className="bg-[#0a1220] text-white pt-10 pb-6 px-4 sm:px-6 lg:px-10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-10">

        {/* Left Section */}
        <div className="flex-1 flex flex-col items-start">
          <img src={logo} alt="GenReal Logo" className="h-14 mb-4" />
          <p className="text-sm text-gray-400 mb-4">
            Based in Vellore, Tamil Nadu, India
          </p>
          <div className="flex gap-4 text-2xl">
            <a href="https://linkedin.com/company/genreal-ai" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-300"><FaLinkedin /></a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-300"><FaInstagram /></a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-300"><FaYoutube /></a>
          </div>
        </div>

        {/* Center Section */}
        <div className="flex-1 flex flex-col items-start md:items-center">
          <h4 className="text-cyan-300 font-bold text-lg mb-4">Company</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="#about" className="hover:text-cyan-300">About Us</a></li>
            <li><a href="#contact-us" className="hover:text-cyan-300">Contact Us</a></li>
            <li><a href="#team" className="hover:text-cyan-300">Our Team</a></li>
            <li><a className="hover:text-cyan-300">Privacy Policy</a></li>
          </ul>
        </div>

        {/* Right Section */}
        <div className="flex-1 flex flex-col items-start md:items-end text-sm">
          <h4 className="text-cyan-300 font-bold text-lg mb-4">Contact</h4>
          <ul className="space-y-2">
            <li><span className="font-medium">Email:</span> genreal.ai@gmail.com</li>
            <li><span className="font-medium">Phone:</span> +91 7878787878</li>
          </ul>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-[#23263a] my-6" />

      {/* Copyright */}
      <div className="text-center text-xs text-gray-400">
        © 2025 <span className="text-cyan-300 font-semibold">GenReal.AI</span> - All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
