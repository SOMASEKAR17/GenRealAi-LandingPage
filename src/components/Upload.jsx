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

              // Show the file name in the upload box — just like drag & drop
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
    <div className="w-screen h-screen flex items-center justify-center bg-[#0E1010] relative font-exo text-white overflow-hidden">
      <div className="absolute inset-0 w-full h-full pointer-events-none bg-[radial-gradient(ellipse_75%_140%_at_center,_#175553_0%,_transparent_50%)]" />

      <div
        ref={modalRef}
        className="relative bg-[linear-gradient(239.6deg,_#175553_-4.57%,_#062221_83.91%)] border border-cyan-400 rounded-3xl px-6 sm:px-10 md:px-12 py-8 w-[95vw] max-w-[800px] shadow-[0_0_30px_#00ffff55] z-10"
      >
        <button
          onClick={() => window.location.replace('/')}
          className="absolute top-3 right-4 text-white text-2xl font-bold hover:text-cyan-400 transition"
        >
          &times;
        </button>

        <h2 className="text-2xl font-bold mb-6 text-center">Upload your file</h2>

        <div
          onDrop={handleDrop}

          onDragOver={(e) => {
            e.preventDefault();
            setDragging(true);
          }}
          onDragLeave={() => setDragging(false)}

          className={`border-2 border-dashed rounded-xl p-6 mb-6 text-center transition-all duration-200 font-inter ${
            dragging ? 'border-[#42DED9] bg-cyan-400/10' : 'border-[#42DED9]'
          }`}
        >
          <label htmlFor="file-upload" className="cursor-pointer block">
            <div className="mb-4">
              <img src="/letter.png" alt="Upload" className="h-16 w-16 mx-auto" />
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

        <div className="text-center text-gray-300 mb-4">or</div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6 text-center">
          <div
            onClick={triggerFilePicker}
            className="border border-cyan-500 rounded-xl py-4 px-2 hover:shadow-lg hover:scale-105 transition-all duration-200 cursor-pointer"
          >
            <img src={Mypc} alt="My PC" className="mx-auto h-10 mb-2" />
            <p className="text-sm">My Computer</p>
          </div>

          <div
            onClick={handleGoogleDrivePick}
            className="border border-cyan-500 rounded-xl py-4 px-2 hover:shadow-lg hover:scale-105 transition-all duration-200 cursor-pointer"
          >

            <img src={GoogleDrive} alt="Google Drive" className="mx-auto h-10 mb-2" />
            <p className="text-sm">Google Drive</p>
          </div>
          <div className="border border-cyan-500 rounded-xl py-4 px-2 hover:shadow-lg hover:scale-105 transition-all duration-200 cursor-pointer">
            <img src={OneDrive} alt="One Drive" className="mx-auto h-10 mb-2" />
            <p className="text-sm">One Drive</p>
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <button
            className="bg-white text-black px-4 py-2 rounded-xl font-semibold hover:bg-gray-200 cursor-pointer transition"
            onClick={() => window.location.replace('/')}
          >
            Cancel
          </button>
          <button
            className="bg-cyan-500 hover:bg-cyan-600 cursor-pointer text-white px-5 py-2 rounded-xl font-bold transition"

            onClick={() => setShowProcessing(true)}

          >
            Confirm
          </button>
        </div>
      </div>
          {toastMessage && (
          <div className="fixed bottom-6 right-6 bg-cyan-500 text-white px-4 py-2 rounded-lg shadow-lg animate-fade-in-out z-50">
            {toastMessage}
          </div>
        )}
    </div>
  );
};

export default UploadModal;
