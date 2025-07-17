import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';

import Processing from './processing';

const UploadModal = () => {
  const [dragging, setDragging] = useState(false);
  const [file, setFile] = useState(null);
  const [showProcessing, setShowProcessing] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);
  const [linkInput, setLinkInput] = useState('');

  const fileInputRef = useRef(null);
  const modalRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      modalRef.current,
      { x: 200, opacity: 0 },
      { x: 0, opacity: 1, duration: 1.8, ease: 'power3.out' }
    );
  }, []);

  // Paste file from clipboard (optional)
  useEffect(() => {
    const handlePaste = (e) => {
      const items = e.clipboardData.items;
      for (let item of items) {
        if (item.kind === 'file') {
          const blob = item.getAsFile();
          setFile(blob);
          setToastMessage("📋 File pasted from clipboard!");
          setTimeout(() => setToastMessage(null), 3000);
          break;
        }
      }
    };
    window.addEventListener("paste", handlePaste);
    return () => window.removeEventListener("paste", handlePaste);
  }, []);

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    if (e.dataTransfer.files?.length > 0) {
      setFile(e.dataTransfer.files[0]);
      setToastMessage("📋 File Dropped!");
      setTimeout(() => setToastMessage(null), 3000);
    }
  };

  const handleConfirm = async () => {
    

    setShowProcessing(true);

   
  };

  if (showProcessing) return <Processing />;

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative font-exo text-white overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-32 h-32 bg-cyan-400/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-32 right-32 w-48 h-48 bg-blue-400/10 rounded-full blur-xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-teal-400/10 rounded-full blur-xl animate-pulse delay-2000"></div>
        <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
      </div>

      {/* Modal */}
      <div
        ref={modalRef}
        className="relative bg-slate-800/90 backdrop-blur-sm border border-cyan-400/30 rounded-3xl px-6 sm:px-10 md:px-12 py-8 w-[95vw] max-w-[800px] shadow-2xl z-10"
      >
        <button
          onClick={() => window.location.replace('/')}
          className="absolute top-3 right-4 text-white text-2xl font-bold hover:text-cyan-400 transition"
        >
          &times;
        </button>

        <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
          Upload your file
        </h2>

        {/* Dropzone */}
        <div
          onDrop={handleDrop}
          onDragOver={(e) => {
            e.preventDefault();
            setDragging(true);
          }}
          onDragLeave={() => setDragging(false)}
          className={`border-2 border-dashed rounded-xl p-8 mb-6 text-center transition-all duration-300 font-inter ${
            dragging ? 'border-cyan-400 bg-cyan-400/10 scale-105' : 'border-cyan-400/50 bg-slate-700/30'
          }`}
        >
          <label htmlFor="file-upload" className="cursor-pointer block">
            <div className="mb-4">
              <img src="/letter.png" alt="Upload" className="h-16 w-16 mx-auto opacity-80" />
            </div>
            <p className="font-semibold text-lg mb-2">
              {file ? file.name : 'Drag and drop files here'}
            </p>
            <p className="text-sm text-slate-300 mt-2 leading-relaxed">
              Supported formats: Pdf, Docx, xlsx, pptx, txt, jpeg, jpg, png <br />
              <span className="text-cyan-400">Max file size: 25MB</span>
            </p>
          </label>
        </div>

        {/* Separator */}
        <div className="text-center text-slate-400 mb-6 relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-600"></div>
          </div>
          <div className="relative bg-slate-800 px-4 text-sm">or paste a link</div>
        </div>

        {/* Link input field */}
        <div className="mb-8">
          <label htmlFor="link-input" className="block mb-2 text-sm font-semibold text-slate-300">
            Paste a link here
          </label>
          <input
            type="text"
            id="link-input"
            className="w-full px-4 py-3 rounded-xl bg-slate-700/50 text-white placeholder-slate-400 border border-cyan-400/30 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            placeholder="https://example.com/your-file"
            value={linkInput}
            onChange={(e) => setLinkInput(e.target.value)}
          />
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-4">
          <button
            className="bg-slate-600 hover:bg-slate-500 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105"
            onClick={() => window.location.replace('/')}
          >
            Cancel
          </button>
          <button
            className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white px-8 py-3 rounded-xl font-bold transition-all duration-300 hover:scale-105 shadow-lg"
            onClick={handleConfirm}
          >
            Confirm
          </button>
        </div>
      </div>

      {/* Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-6 py-3 rounded-xl shadow-2xl animate-fade-in-out z-50 backdrop-blur-sm border border-cyan-400/30">
          {toastMessage}
        </div>
      )}
    </div>
  );
};

export default UploadModal;
