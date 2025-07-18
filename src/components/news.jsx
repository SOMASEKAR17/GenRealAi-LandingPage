import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const NewsTimeline = () => {
  const sectionRef = useRef(null);
  const horizontalRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  const newsItems = [
    {
      title: "Facebook expands deepfake rules, but no full ban",
      image: "/News/news1.jpg",
      date: "June 2025",
      link: "https://www.cbsnews.com/video/facebook-expands-rules-on-deepfakes-but-falls-short-of-total-ban/",
    },
    {
      title: "Meteorologist fights sextortion deepfake scams",
      image: "/News/news2.jpg",
      date: "May 2025",
      link: "https://www.cbsnews.com/news/deepfakes-meteorologist-bree-smith-image-doctored-sextortion-scams/",
    },
    {
      title: "Meta fails to stop sexualized AI deepfakes",
      image: "/News/news3.jpg",
      date: "May 2025",
      link: "https://www.cbsnews.com/news/meta-facebook-sexualized-ai-deepfake-celebrity-images-spread/",
    },
    {
      title: "Ripple CTO warns of XRP deepfake CEO scam",
      image: "/News/news4.jpg",
      date: "May 2025",
      link: "https://example.com/ripple-scam", // Replace with real URL
    },
    {
      title: "Elon Musk deepfakes cause billions in fraud",
      image: "/News/news5.jpg",
      date: "April 2025",
      link: "https://www.cbsnews.com/news/deepfakes-ai-fraud-elon-musk/",
    },
    {
      title: "California fights AI deepfake abuse & bias",
      image: "/News/news6.jpg",
      date: "April 2025",
      link: "https://www.pbs.org/newshour/politics/california-advances-measures-targeting-ai-discrimination-and-sexually-abusive-deepfakes",
    },
    {
      title: "Call for ban on AI apps making child nudes",
      image: "/News/news7.jpg",
      date: "April 2025",
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

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen bg-gradient-to-bl from-black to-cyan-950 text-white overflow-hidden"
    >
      <div className="absolute top-12 left-12 z-10" id="news">
        <h2 className="text-3xl font-bold mb-2 pt-20">News & Insights</h2>
        <p className="text-sm text-gray-300">
          Combating Misinformation with Technology
        </p>
      </div>

      <div
        ref={horizontalRef}
        className={`flex items-center ${
          isMobile ? "flex-col space-y-6 px-6 py-20" : "h-full w-max space-x-12 pl-48 pr-24"
        }`}
      >
        {newsItems.map((item, index) => (
          <div
            key={index}
            className={`${
              isMobile ? "w-full" : "min-w-[40vw] max-w-[40vw]"
            } bg-cyan-400 text-black rounded-lg p-6 shadow-xl`}
          >
            <div className="w-4 h-4 bg-white border-4 border-cyan-700 rounded-full mb-4"></div>
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-48 object-cover rounded mb-3"
            />
            <h3 className="text-lg font-semibold mb-1">{item.title}</h3>
            <p className="text-sm text-gray-800 mb-2">{item.date}</p>
            <a
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-800 font-medium underline"
            >
              Read More
            </a>
          </div>
        ))}
      </div>
    </section>
  );
};

export default NewsTimeline;
