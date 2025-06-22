import React, { useState, useRef } from 'react';
import { FaCloudUploadAlt } from 'react-icons/fa';
import Mypc from '/Mypc.png';
import GoogleDrive from '/GoogleDrive.png';
import OneDrive from '/OneDrive.png';

const UploadModal = () => {
  const [dragging, setDragging] = useState(false);
  const [file, setFile] = useState(null);
  const fileInputRef = useRef(null);

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      setFile(e.dataTransfer.files[0]);
      e.dataTransfer.clearData();
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = () => {
    setDragging(false);
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const triggerFilePicker = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-black relative font-exo text-white overflow-hidden">
      {/* Radial Background Glow */}
<div className="absolute inset-0 w-full h-full pointer-events-none bg-[radial-gradient(ellipse_75%_140%_at_center,_#175553_0%,_transparent_50%)]" />
      {/* Upload Container */}
      <div
        className="bg-[linear-gradient(239.6deg,_#175553_-4.57%,_#062221_83.91%)] 
                   border border-cyan-400 rounded-3xl 
                   px-6 sm:px-10 md:px-12 py-8 
                   w-[95vw] max-w-[800px] 
                   shadow-[0_0_30px_#00ffff55] z-10"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Upload your file</h2>

        {/* Drag-and-drop area */}
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          className={`border-2 border-dashed rounded-xl p-6 mb-6 text-center transition-all duration-200 ${
            dragging ? 'border-cyan-300 bg-cyan-400/10' : 'border-cyan-400'
          }`}
        >
          <label htmlFor="file-upload" className="cursor-pointer block">
            <div className="text-4xl mb-2">
              <FaCloudUploadAlt />
            </div>
            <p className="font-semibold">
              {file ? file.name : 'Drag and drop files here'}
            </p>
            <p className="text-sm text-gray-300 mt-2">
              Supported formats: Pdf, Docx, xlsx, pptx, txt, jpeg, jpg, png <br />
              Max file size: 25MB
            </p>
            <input
              id="file-upload"
              type="file"
              className="hidden"
              ref={fileInputRef}
              onChange={handleFileChange}
            />
          </label>
        </div>

        {/* Divider */}
        <div className="text-center text-gray-300 mb-4">or</div>

        {/* Upload Options */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6 text-center">
          <div
            onClick={triggerFilePicker}
            className="border border-cyan-500 rounded-xl py-4 px-2 hover:shadow-lg hover:scale-105 transition-all duration-200 cursor-pointer"
          >
            <img src={Mypc} alt="My PC" className="mx-auto h-10 mb-2" />
            <p className="text-sm">My Computer</p>
          </div>
          <div className="border border-cyan-500 rounded-xl py-4 px-2 hover:shadow-lg hover:scale-105 transition-all duration-200 cursor-pointer">
            <img src={GoogleDrive} alt="Google Drive" className="mx-auto h-10 mb-2" />
            <p className="text-sm">Google Drive</p>
          </div>
          <div className="border border-cyan-500 rounded-xl py-4 px-2 hover:shadow-lg hover:scale-105 transition-all duration-200 cursor-pointer">
            <img src={OneDrive} alt="One Drive" className="mx-auto h-10 mb-2" />
            <p className="text-sm">One Drive</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-4">
          <button className="bg-white text-black px-4 py-2 rounded-xl font-semibold hover:bg-gray-200 transition">
            Cancel
          </button>
          <button className="bg-cyan-500 hover:bg-cyan-600 text-white px-5 py-2 rounded-xl font-bold transition">
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default UploadModal;
