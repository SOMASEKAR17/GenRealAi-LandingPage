import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const NewsCarousel = () => {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollAmount = direction === "left" ? -clientWidth : clientWidth;
      scrollRef.current.scrollTo({
        left: scrollLeft + scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const newsItems = new Array(5).fill({
    title: "Combating Misinformation with Technology",
    image: "", // Replace with your actual image path
  });

  return (
    <section className="w-full bg-gradient-to-bl from-black to-cyan-950  from-30%  to-100% py-30 px-4 md:px-12">
      <div className="max-w-7xl mx-auto text-white" id="news">
        <h2 className="text-3xl font-bold mb-2">News & Insights</h2>
        <p className="text-sm text-gray-300 mb-6">
          Combating Misinformation with Technology
        </p>

        <div className="relative">
          {/* Left Button */}
          <button
            onClick={() => scroll("left")}
            className="absolute left-5 top-1/2 transform -translate-y-1/2 z-10 p-2 bg-white text-black rounded-full shadow-md"
          >
            <ChevronLeft />
          </button>

          {/* Scrollable Container */}
          <div
            ref={scrollRef}
            className="flex space-x-4 overflow-x-auto scrollbar-hide scroll-smooth"
          >
            {newsItems.map((item, index) => (
              <div
                key={index}
                className="min-w-[280px] sm:min-w-[320px] md:min-w-[350px] lg:min-w-[400px] flex-shrink-0 bg-cyan-400 rounded-lg p-3 sm:p-4"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-32 sm:h-40 md:h-48 object-cover rounded"
                />
                <p className="text-sm sm:text-base text-black font-medium mt-2 sm:mt-3">
                  {item.title}
                </p>
              </div>
            ))}
          </div>

          {/* Right Button */}
          <button
            onClick={() => scroll("right")}
            className="absolute right-5 top-1/2 transform -translate-y-1/2 z-10 p-2 bg-white text-black rounded-full shadow-md"
          >
            <ChevronRight />
          </button>
        </div>
      </div>
    </section>
  );
};

export default NewsCarousel;
