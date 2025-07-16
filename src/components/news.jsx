import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const NewsTimeline = () => {
  const sectionRef = useRef(null);
  const horizontalRef = useRef(null);

  const newsItems = new Array(5).fill({
    title: "Combating Misinformation with Technology",
    image: "", // Put a real image URL here
    date: "June 2025",
  });

  useEffect(() => {
    const section = sectionRef.current;
    const horizontal = horizontalRef.current;

    let ctx = gsap.context(() => {
      let totalWidth = horizontal.scrollWidth - window.innerWidth;

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
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen bg-gradient-to-bl from-black to-cyan-950 text-white overflow-hidden"
    >
      <div className="absolute top-12 left-12 z-10" id="news">
        <h2 className="text-3xl font-bold mb-2 pt-20">News & Insights</h2>
        <p className="text-sm text-gray-300">Combating Misinformation with Technology</p>
      </div>

      <div
        ref={horizontalRef}
        className="flex h-full items-center w-max space-x-12 pl-48 pr-24"
      >
        {newsItems.map((item, index) => (
          <div
            key={index}
            className="min-w-[40vw] max-w-[40vw] bg-cyan-400 text-black rounded-lg p-6 shadow-xl"
          >
            <div className="w-4 h-4 bg-white border-4 border-cyan-700 rounded-full mb-4"></div>
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-48 object-cover rounded mb-3"
            />
            <h3 className="text-lg font-semibold">{item.title}</h3>
            <p className="text-sm text-gray-800">{item.date}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default NewsTimeline;