import React, { useEffect, useState } from "react";
import ProfileCard from "./profileCard";

const Team = () => {
  const [isMobile, setIsMobile] = useState(false);
  const breakpoint = 768;

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < breakpoint);
    checkMobile(); // Set on first render
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, [breakpoint]);

  const founders = [
    {
      name: "xyz",
      title: "CEO, Founder",
      handle: "xyz_handle",
      contactText: "Contact Me",
      avatarUrl: "vishwajeet.jpg",
    },
    {
      name: "abc",
      title: "CTO, Co-Founder",
      handle: "abc_handle",
      contactText: "Say Hello",
      avatarUrl: "vishwajeet.jpg",
    },
    {
      name: "pqr",
      title: "CPO, Co-Founder",
      handle: "pqr_handle",
      contactText: "Reach Out",
      avatarUrl: "vishwajeet.jpg",
    },
  ];

  return (
    <div className="bg-gradient-to-tr min-h-screen from-black to-cyan-950 text-white px-6 py-16" id="team">
      {/* Founders Section */}
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Meet Our Founders</h2>
        <p className="text-sm md:text-base text-gray-300 max-w-2xl mx-auto mb-12">
          Born from a deep concern over the rise of synthetic media, our leadership combines cutting-edge innovation with a passion for truth.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8 justify-items-center">
  {founders.map((founder, index) =>
    isMobile ? (
      <div
              key={index}
              className="group w-full max-w-sm bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-xl rounded-2xl p-8 shadow-2xl text-center border border-slate-700/50 hover:border-cyan-500/50 transition-all duration-500 hover:transform hover:scale-[1.02] hover:shadow-cyan-500/10"
              style={{
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
              }}
            >
              {/* Avatar with enhanced styling */}
              <div className="relative mb-6">
                <img
                  src={founder.avatarUrl || "/api/placeholder/150/150"}
                  alt={founder.name}
                  className="relative w-28 h-28 mx-auto rounded-full object-cover border-4 border-white/20 shadow-xl backdrop-blur-sm"
                />
                
              </div>

              {/* Name and title */}
              <div className="mb-4">
                <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-cyan-200 transition-colors duration-300">
                  {founder.name}
                </h3>
                <p className="text-cyan-400 font-medium text-lg mb-1">
                  {founder.title}
                </p>
                <p className="text-slate-400 text-sm">
                  @{founder.handle}
                </p>
              </div>

              {/* Bio */}
              <p className="text-slate-300 text-sm mb-6 leading-relaxed">
                {founder.bio}
              </p>

              

              {/* Contact button */}
              <button
                onClick={() => console.log(`Contact clicked for ${founder.name}`)}
                className="w-full px-6 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 rounded-xl text-white font-semibold transition-all duration-300 shadow-lg hover:shadow-cyan-500/25 active:scale-[0.98] border border-cyan-500/20"
              >
                {founder.contactText}
              </button>

              {/* Subtle accent line */}
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>
    ) : (
      <ProfileCard
        key={index}
        name={founder.name}
        title={founder.title}
        handle={founder.handle}
        status={founder.status}
        contactText={founder.contactText}
        avatarUrl={founder.avatarUrl}
        showUserInfo={true}
        enableTilt={true}
        onContactClick={() => console.log(`Contact clicked for ${founder.name}`)}
      />
    )
  )}
</div>

      </div>

      {/* Team Section */}
      <div className="max-w-5xl h-screen/2 mx-auto mt-16">
        <div className="relative lg:h-[75%] rounded-3xl overflow-hidden">
          <img
            src="/team.jpg"
            alt="Our Team"
            className="w-full object-cover h-full"
          />
          <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
            <h3 className="text-white text-2xl md:text-3xl font-semibold">Our Team</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Team;
