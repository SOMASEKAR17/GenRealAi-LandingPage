import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';

import Processing from './processing';

import Mypc from '/Mypc.png';
import GoogleDrive from '/GoogleDrive.png';
import OneDrive from '/OneDrive.png';

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
const GOOGLE_API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;
const GOOGLE_SCOPE = 'https://www.googleapis.com/auth/drive.readonly';

const UploadModal = () => {
  const [dragging, setDragging] = useState(false);
  const [file, setFile] = useState(null);
  const [showProcessing, setShowProcessing] = useState(false);
  const [gisReady, setGisReady] = useState(false);
  const [pickerReady, setPickerReady] = useState(false);

  const fileInputRef = useRef(null);
  const modalRef = useRef(null);

  const [toastMessage, setToastMessage] = useState(null);

  useEffect(() => {
    gsap.fromTo(
      modalRef.current,
      { x: 200, opacity: 0 },
      { x: 0, opacity: 1, duration: 1.8, ease: 'power3.out' }
    );
  }, []);

  // === Load Google Identity and Picker APIs ===
  useEffect(() => {
    const loadGIS = () => {
      const script = document.createElement('script');
      script.src = 'https://accounts.google.com/gsi/client';
      script.onload = () => setGisReady(true);
      document.body.appendChild(script);
    };

    const loadPicker = () => {
      const script = document.createElement('script');
      script.src = 'https://apis.google.com/js/api.js';
      script.onload = () => {
        window.gapi.load('picker', () => setPickerReady(true));
      };
      document.body.appendChild(script);
    };

    loadGIS();
    loadPicker();
  }, []);

  //Paste from Clipboard
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
      e.dataTransfer.clearData();
    }
    setToastMessage("📋 File Dropped!");
  };

  const handleFileChange = (e) => {
    if (e.target.files?.length > 0) {
      setFile(e.target.files[0]);
    }
    setToastMessage("💾 File selected from your computer!");
    setTimeout(() => setToastMessage(null), 3000);
  };

  const triggerFilePicker = () => {
    fileInputRef.current?.click();
  };

  const handleGoogleDrivePick = () => {
    if (!gisReady || !pickerReady) {
      alert("Google API is still loading. Please wait a moment.");
      return;
    }

    const tokenClient = window.google.accounts.oauth2.initTokenClient({
      client_id: GOOGLE_CLIENT_ID,
      scope: GOOGLE_SCOPE,
      callback: (tokenResponse) => {
        const accessToken = tokenResponse.access_token;
        openPicker(accessToken);
      }
    });

    tokenClient.requestAccessToken();
  };

  const openPicker = (accessToken) => {
    const view = new window.google.picker.DocsView()
      .setIncludeFolders(true)
      .setSelectFolderEnabled(false);

    const picker = new window.google.picker.PickerBuilder()
      .setDeveloperKey(GOOGLE_API_KEY)
      .setOAuthToken(accessToken)
      .addView(view)
      .setCallback((data) => {
        if (data.action === window.google.picker.Action.PICKED) {
          const doc = data.docs[0];

          const fileId = doc.id;
          const fileName = doc.name;
          const fileUrl = `https://www.googleapis.com/drive/v3/files/${fileId}?alt=media`;

          fetch(fileUrl, {
            headers: {
              Authorization: `Bearer ${accessToken}`
            }
          })
            .then((res) => {
              if (!res.ok) throw new Error("Failed to download from Google Drive");
              return res.blob();
            })
            .then((blob) => {
              const downloadedFile = new File([blob], fileName, { type: blob.type });
              setFile(downloadedFile);
              setToastMessage("💾 File selected from Google Drive!");
              setTimeout(() => setToastMessage(null), 3000);
            })
            .catch((err) => {
              console.error("Drive Download Error:", err);
            });
        }
      })
      .build();

    picker.setVisible(true);
  };

  if (showProcessing) return <Processing />;

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative font-exo text-white overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-32 h-32 bg-cyan-400/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-32 right-32 w-48 h-48 bg-blue-400/10 rounded-full blur-xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-teal-400/10 rounded-full blur-xl animate-pulse delay-2000"></div>
        <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
      </div>

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
            <input
              id="file-upload"
              type="file"
              className="hidden"
              ref={fileInputRef}
              onChange={handleFileChange}
            />
          </label>
        </div>

        <div className="text-center text-slate-400 mb-6 relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-600"></div>
          </div>
          <div className="relative bg-slate-800 px-4 text-sm">or choose from</div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8 text-center">
          <div
            onClick={triggerFilePicker}
            className="bg-slate-700/50 backdrop-blur-sm border border-cyan-400/30 rounded-xl py-6 px-4 hover:border-cyan-400 hover:bg-slate-700/70 hover:scale-105 transition-all duration-300 cursor-pointer group"
          >
            <img src={Mypc} alt="My PC" className="mx-auto h-12 mb-3 group-hover:scale-110 transition-transform duration-300" />
            <p className="text-sm font-medium">My Computer</p>
          </div>

          <div
            onClick={handleGoogleDrivePick}
            className="bg-slate-700/50 backdrop-blur-sm border border-cyan-400/30 rounded-xl py-6 px-4 hover:border-cyan-400 hover:bg-slate-700/70 hover:scale-105 transition-all duration-300 cursor-pointer group"
          >
            <img src={GoogleDrive} alt="Google Drive" className="mx-auto h-12 mb-3 group-hover:scale-110 transition-transform duration-300" />
            <p className="text-sm font-medium">Google Drive</p>
          </div>

          <div className="bg-slate-700/50 backdrop-blur-sm border border-cyan-400/30 rounded-xl py-6 px-4 hover:border-cyan-400 hover:bg-slate-700/70 hover:scale-105 transition-all duration-300 cursor-pointer group">
            <img src={OneDrive} alt="One Drive" className="mx-auto h-12 mb-3 group-hover:scale-110 transition-transform duration-300" />
            <p className="text-sm font-medium">One Drive</p>
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <button
            className="bg-slate-600 hover:bg-slate-500 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105"
            onClick={() => window.location.replace('/')}
          >
            Cancel
          </button>
          <button
            className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white px-8 py-3 rounded-xl font-bold transition-all duration-300 hover:scale-105 shadow-lg"
            onClick={() => setShowProcessing(true)}
          >
            Confirm
          </button>
        </div>
      </div>

      {toastMessage && (
        <div className="fixed bottom-6 right-6 bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-6 py-3 rounded-xl shadow-2xl animate-fade-in-out z-50 backdrop-blur-sm border border-cyan-400/30">
          {toastMessage}
        </div>
      )}
    </div>
  );
};

export default UploadModal;