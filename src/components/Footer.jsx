import React from 'react';
import { FaLinkedin, FaInstagram, FaYoutube } from 'react-icons/fa';
import logo from '/logoGenReal.png';

const Footer = () => {
  return (
    <footer className="bg-[#0a1220] text-white pt-10 pb-4">
      <div className="flex flex-col md:flex-row w-full justify-between items-start">

        
        <div className="flex-1 flex flex-col items-start pl-6">
          <img src={logo} alt="GenReal Logo" className="h-14 mb-3" />
          <p className="text-xs opacity-60 mb-3">
            Based in Vellore, Tamil Nadu, India
          </p>
          <div className="flex gap-4 text-2xl">
            <a href="https://linkedin.com/company/genreal-ai" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-300"><FaLinkedin /></a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-300"><FaInstagram /></a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-300"><FaYoutube /></a>
          </div>
        </div>

        
        <div className="flex-1 flex flex-col items-center">
          <h4 className="text-cyan-300 font-bold text-lg mb-3">Company</h4>
          <ul className="space-y-2 text-center">
            <li><a href="/about" className="hover:text-cyan-300">About Us</a></li>
            <li><a href="/contact" className="hover:text-cyan-300">Contact Us</a></li>
            <li><a href="/team" className="hover:text-cyan-300">Our Team</a></li>
            <li><a href="/privacy" className="hover:text-cyan-300">Privacy Policy</a></li>
          </ul>
        </div>

        
        <div className="flex-1 flex flex-col items-end pr-6 text-right">
          <h4 className="text-cyan-300 font-bold text-lg mb-3">Contact</h4>
          <ul className="space-y-2 w-full">
            <li><span className="font-medium">Email:</span> genreal.ai@gmail.com</li>
            <li><span className="font-medium">Phone:</span> +91 7878787878</li>
          </ul>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-[#23263a] my-6 w-full" />

      {/* Bottom Copyright */}
      <div className="w-full flex justify-center text-xs opacity-80">
        © 2025 <span className="text-cyan-300 font-semibold mx-1">GenReal.AI</span> - All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;