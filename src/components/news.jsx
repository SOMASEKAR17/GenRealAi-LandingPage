import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const NewsTimeline = () => {
  const sectionRef = useRef(null);
  const horizontalRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const newsItems = [
    {
      title: "Facebook expands deepfake rules, but no full ban",
      image: "/News/news1.webp",
      date: "June 2025",
      summary: "Facebook introduces new policies to combat deepfakes while stopping short of implementing a complete ban, raising questions about platform responsibility.",
      link: "https://www.cbsnews.com/video/facebook-expands-rules-on-deepfakes-but-falls-short-of-total-ban/",
    },
    {
      title: "Meteorologist fights sextortion deepfake scams",
      image: "/News/news2.png",
      date: "May 2025",
      summary: "Weather forecaster Bree Smith battles criminals using AI-generated explicit images of her in sophisticated sextortion schemes targeting victims.",
      link: "https://www.cbsnews.com/news/deepfakes-meteorologist-bree-smith-image-doctored-sextortion-scams/",
    },
    {
      title: "Meta fails to stop sexualized AI deepfakes",
      image: "/News/news3.png",
      date: "May 2025",
      summary: "Investigation reveals Meta's platforms continue to host and spread sexualized AI-generated celebrity images despite policy promises.",
      link: "https://www.cbsnews.com/news/meta-facebook-sexualized-ai-deepfake-celebrity-images-spread/",
    },
    {
      title: "Ripple CTO warns of XRP deepfake CEO scam",
      image: "/News/news4.png",
      date: "May 2025",
      summary: "Ripple's Chief Technology Officer alerts community about fraudulent deepfake videos featuring fake CEO endorsements targeting cryptocurrency investors.",
      link: "https://example.com/ripple-scam", 
    },
    {
      title: "Elon Musk deepfakes cause billions in fraud",
      image: "/News/news5.png",
      date: "April 2025",
      summary: "AI-generated videos of Elon Musk promoting fake investment schemes have defrauded victims of billions, highlighting deepfake crime's growing impact.",
      link: "https://www.cbsnews.com/news/deepfakes-ai-fraud-elon-musk/",
    },
    {
      title: "California fights AI deepfake abuse & bias",
      image: "/News/news6.jpg",
      date: "April 2025",
      summary: "California lawmakers advance comprehensive legislation targeting AI discrimination and sexually abusive deepfakes in landmark regulatory move.",
      link: "https://www.pbs.org/newshour/politics/california-advances-measures-targeting-ai-discrimination-and-sexually-abusive-deepfakes",
    },
    {
      title: "Call for ban on AI apps making child nudes",
      image: "/News/news7.webp",
      date: "April 2025",
      summary: "Child safety advocates demand immediate prohibition of AI applications capable of generating explicit imagery of minors as abuse cases surge.",
      link: "https://www.bbc.com/news/articles/cr78pd7p42ro",
    },
  ];

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (isMobile) return;

    const section = sectionRef.current;
    const horizontal = horizontalRef.current;
    if (!section || !horizontal) return;

    const totalWidth = horizontal.scrollWidth - window.innerWidth;

    const ctx = gsap.context(() => {
      gsap.to(horizontal, {
        x: () => `-${totalWidth}px`,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${totalWidth}`,
          scrub: true,
          pin: true,
          anticipatePin: 1,
        },
      });
    }, section);

    return () => ctx.revert();
  }, [isMobile]);

  const handleCardClick = (link) => {
    window.open(link, '_blank', 'noopener,noreferrer');
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen bg-black text-white overflow-hidden"
    >
      
      {/* Header - positioned differently for mobile */}
      <div className={`absolute z-10 ${isMobile ? 'top-6 left-6' : 'top-12 left-12'}`} id="news">
        <h2 className={`font-bold text-center mb-2 ${isMobile ? 'text-2xl pt-4' : 'text-4xl pt-20'}`}>News & <span className="text-cyan-400">Insights</span></h2>
        <p className="text-sm text-gray-300">
          Combating Misinformation with Technology
        </p>
      </div>

      {isMobile ? (
        <div className="flex flex-col items-center px-4 pt-50 mb-20 space-y-6 min-h-screen">
          {/* Current News Card */}
          <div className="w-full max-w-sm bg-cyan-400 text-black rounded-2xl p-5 shadow-xl">
            <div className="w-4 h-4 bg-white border-4 border-cyan-700 rounded-full mb-4"></div>
            <img
              src={newsItems[currentIndex].image}
              alt={newsItems[currentIndex].title}
              className="w-full h-40 object-cover rounded mb-3"
            />
            <h3 className="text-base font-semibold mb-2 line-clamp-2">
              {newsItems[currentIndex].title}
            </h3>
            <p className="text-xs text-gray-700 mb-3 leading-relaxed line-clamp-3">
              {newsItems[currentIndex].summary}
            </p>
            <p className="text-xs text-gray-800 mb-4">
              {newsItems[currentIndex].date}
            </p>
            <a
              href={newsItems[currentIndex].link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block w-full text-center bg-gradient-to-r from-cyan-600 to-blue-700 text-white font-semibold py-2.5 px-4 rounded-lg shadow-lg hover:from-cyan-700 hover:to-blue-800 transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl text-sm"
            >
              Read Full Article
            </a>
          </div>

          {/* Navigation Controls */}
          <div className="flex justify-center h-[20%] items-center w-full max-w-xs gap-4 bg-black/40 backdrop-blur-sm rounded-2xl p-4 border border-cyan-400/30">
            <button
              className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-cyan-500 to-cyan-600 text-white rounded-full shadow-xl disabled:from-gray-500 disabled:to-gray-600 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-110 active:scale-95"
              onClick={() => setCurrentIndex((prev) => prev - 1)}
              disabled={currentIndex === 0}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Progress Dots */}
            <div className="flex space-x-2">
              {newsItems.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 transform hover:scale-125 ${
                    index === currentIndex 
                      ? 'bg-cyan-400 shadow-lg shadow-cyan-400/50 ring-2 ring-cyan-300/50' 
                      : 'bg-gray-500 hover:bg-gray-400 hover:shadow-md'
                  }`}
                  aria-label={`Go to news item ${index + 1}`}
                />
              ))}
            </div>

            <button
              className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-full shadow-xl disabled:from-gray-500 disabled:to-gray-600 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-110 active:scale-95"
              onClick={() => setCurrentIndex((prev) => prev + 1)}
              disabled={currentIndex === newsItems.length - 1}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Card Counter */}
          <div className="text-center text-gray-300 text-sm">
            {currentIndex + 1} of {newsItems.length}
          </div>
        </div>
      ) : (
        <div
          ref={horizontalRef}
          className="flex items-center h-full w-max space-x-12 pl-48 pt-[30vh] lg:pt-[20vh] pr-24"
        >
          {newsItems.map((item, index) => (
            <div
              key={index}
              className="min-w-[80vw] max-w-[80vw] lg:min-w-[50vw] lg:max-w-[50vw] xl:min-w-[40vw] xl:max-w-[40vw]  md:h-[60vh] bg-cyan-400 text-black rounded-lg p-6 shadow-xl cursor-pointer transform hover:scale-[1.02] transition-all duration-300 hover:shadow-2xl"
              onClick={() => handleCardClick(item.link)}
            >
              
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-[70%] object-cover rounded mb-3"
              />
              <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
              <p className="text-sm text-gray-700 mb-3 leading-relaxed">
                {item.summary}
              </p>
              <p className="text-sm text-gray-800">{item.date}</p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default NewsTimeline;