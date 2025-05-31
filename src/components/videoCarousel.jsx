import React, { useEffect, useRef, useState } from 'react'
import replayImg from "/replay.svg";
import playImg from "/play.svg";
import pauseImg from "/pause.svg";
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from "gsap/all";
import gsap from 'gsap'

gsap.registerPlugin(ScrollTrigger);

const highlightFirstVideo = "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";
const highlightSecondVideo = "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4";
const highlightThirdVideo = "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4";
const highlightFourthVideo = "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4";

export const hightlightsSlides = [
  {
    id: 1,
    textLists: [
      "Understanding Deepfakes",
      "Advanced AI Technology",
      "Detection Methods",
    ],
    video: highlightFirstVideo,
    videoDuration: 4,
  },
  {
    id: 2,
    textLists: ["Real vs Fake", "How to identify", "deepfake content"],
    video: highlightSecondVideo,
    videoDuration: 5,
  },
  {
    id: 3,
    textLists: [
      "Prevention techniques",
      "for creating and sharing",
      "authentic media",
    ],
    video: highlightThirdVideo,
    videoDuration: 2,
  },
  {
    id: 4,
    textLists: ["Ethical considerations", "and responsible AI use"],
    video: highlightFourthVideo,
    videoDuration: 3.63,
  },
];

const VideoCarousel = () => {
  const videoRef = useRef([]);
  const videoSpanRef = useRef([]);
  const videoDivRef = useRef([]);

  const [video, setVideo] = useState({
    isEnd: false,
    StartPlay: false,
    videoId: 0,
    isLastVideo: false,
    isPlaying: false,
  });

  const [loadedData, setLoadedData] = useState([]);
  const { isEnd, isLastVideo, StartPlay, videoId, isPlaying } = video;

  useGSAP(() => {
    gsap.to('#slider', {
      transform: `translateX(${-100 * videoId}%)`,
      duration: 2,
      ease: "power2.inOut"
    });
    gsap.to("#video", {
      scrollTrigger: {
        trigger: "#video",
        toggleActions: "restart none none none",
      },
      onComplete: () => {
        setVideo((pre) => ({
          ...pre,
          StartPlay: true,
          isPlaying: true,
        }));
      }
    });
  }, [isEnd, videoId]);

  useEffect(() => {
    let anim;
    let animUpdate;
  
    const span = videoSpanRef.current[videoId];
    const div = videoDivRef.current[videoId];
    let currentProgress = 0;
  
    if (span) {
      anim = gsap.to(span, {
        onUpdate: () => {
          const progress = Math.ceil(anim.progress() * 100);
  
          if (progress !== currentProgress) {
            currentProgress = progress;
  
            gsap.to(div, {
              width:
                window.innerWidth < 760
                  ? "10vw"
                  : window.innerWidth < 1200
                  ? "10vw"
                  : "4vw",
            });
  
            gsap.to(span, {
              width: `${currentProgress}%`,
              backgroundColor: "white",
            });
          }
        },
        onComplete: () => {
          if (isPlaying) {
            gsap.to(div, { width: "12px" });
            gsap.to(span, { backgroundColor: "#afafaf" });
          }
        },
      });
  
      if (videoId === 0) {
        anim.restart();
      }
  
      // ✅ Safe ticker callback
      animUpdate = () => {
        const videoEl = videoRef.current[videoId];
        const slide = hightlightsSlides[videoId];
  
        if (videoEl && slide) {
          anim.progress(videoEl.currentTime / slide.videoDuration);
        }
      };
  
      // ✅ Add ticker if playing
      if (isPlaying) {
        gsap.ticker.add(animUpdate);
      }
    }
  
    // ✅ Clean up the ticker
    return () => {
      if (animUpdate) {
        gsap.ticker.remove(animUpdate);
      }
    };
  }, [videoId, StartPlay, isPlaying]);

  useEffect(() => {
    if (loadedData.length > 3) {
      if (!isPlaying) {
        videoRef.current[videoId].pause();
      } else {
        StartPlay && videoRef.current[videoId].play();
      }
    }
  }, [StartPlay, videoId, isPlaying, loadedData]);

  const handleProcess = (type, i) => {
    switch (type) {
      case "video-end":
        setVideo((pre) => ({ ...pre, isEnd: true, videoId: i + 1 }));
        break;
      case "video-last":
        setVideo((pre) => ({ ...pre, isLastVideo: true }));
        break;
      case "video-reset":
        setVideo((pre) => ({ ...pre, videoId: 0, isLastVideo: false }));
        break;
      case "pause":
      case "play":
        setVideo((pre) => ({ ...pre, isPlaying: !pre.isPlaying }));
        break;
      default:
        return video;
    }
  };

  const handleLoadedMetaData = (i, e) =>
    setLoadedData((pre) => [...pre, e]);

  return (
    <div className="w-full rounded-2xl border border-white/10 p-4 sm:p-6 bg-slate-950/80 backdrop-blur-lg shadow-[0_0_40px_#00000040]">
      <div className="relative flex items-center overflow-hidden">
        {hightlightsSlides.map((list, i) => (
          <div key={list.id} id="slider" className="min-w-full flex justify-center">
            <div className="video-carousel_container relative w-full max-w-5xl">
              {/* Centered video box */}
              <div className="w-full h-[40vh] sm:h-[50vh] md:h-[65vh] flex items-center justify-center rounded-3xl overflow-hidden">
                <video
                  id="video"
                  playsInline
                  preload="auto"
                  muted
                  className="w-full h-full object-cover pointer-events-none"
                  ref={(el) => (videoRef.current[i] = el)}
                  onPlay={() =>
                    setVideo((pre) => ({ ...pre, isPlaying: true }))
                  }
                  onEnded={() =>
                    i !== 3
                      ? handleProcess("video-end", i)
                      : handleProcess("video-last")
                  }
                  onLoadedMetadata={(e) => handleLoadedMetaData(i, e)}
                >
                  <source src={list.video} type="video/mp4" />
                </video>
              </div>

              <div className="absolute top-4 sm:top-10 left-6 sm:left-[5%] z-10">
                {list.textLists.map((text, i) => (
                  <p key={i} className="text-base sm:text-xl md:text-2xl font-medium text-white drop-shadow-lg">
                    {text}
                  </p>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Indicator dots */}
      <div className="relative flex items-center justify-center mt-8 sm:mt-10 flex-wrap gap-y-3">
        <div className="flex items-center justify-center py-4 px-6 sm:px-7 backdrop-blur-md border border-slate-600/30 rounded-full flex-wrap">
          {videoRef.current.map((_, i) => (
            <span
              key={i}
              ref={(el) => (videoDivRef.current[i] = el)}
              className={`mx-2 w-3 h-3 ${i === videoId ? "bg-white" : "bg-gray-200"} rounded-full relative cursor-pointer transition-colors`}
              onClick={() => {
                setVideo((pre) => ({
                  ...pre,
                  videoId: i,
                  isPlaying: true,
                  isLastVideo: i === hightlightsSlides.length - 1,
                }));
              }}
            >
              <span
                className="absolute h-full w-full rounded-full"
                ref={(e) => (videoSpanRef.current[i] = e)}
              />
            </span>
          ))}
        </div>

        <button className="ml-4 p-3 backdrop-blur-md border border-slate-600/30 rounded-full hover:bg-white/10 transition-colors">
          <img
            src={isLastVideo ? replayImg : !isPlaying ? playImg : pauseImg}
            alt={isLastVideo ? "replay" : !isPlaying ? "play" : "pause"}
            className="w-6 h-6"
            onClick={
              isLastVideo
                ? () => handleProcess("video-reset")
                : !isPlaying
                ? () => handleProcess("play")
                : () => handleProcess("pause")
            }
          />
        </button>
      </div>
    </div>
  );
};

export default VideoCarousel;
