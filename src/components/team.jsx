import React from "react";
import ProfileCard from "./ProfileCard";

const Team = () => {
  const founders = [
    {
      name: "xyz",
      title: "CEO, Founder",
      handle: "xyz_handle",
      status: "Online",
      contactText: "Contact Me",
      avatarUrl: "",
    },
    {
      name: "xyz",
      title: "CEO, Co-Founder",
      handle: "xyz_handle",
      status: "Online",
      contactText: "Contact Me",
      avatarUrl: "",
    },
    {
      name: "xyz",
      title: "CEO, Co-Founder",
      handle: "xyz_handle",
      status: "Online",
      contactText: "Contact Me",
      avatarUrl: "",
    },
  ];

  return (
    <div className="bg-gradient-to-tr from-black to-cyan-950 text-white px-6 py-16" id="team">
      {/* Founders Section */}
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Meet Our Founders</h2>
        <p className="text-sm md:text-base text-gray-300 max-w-2xl mx-auto mb-12">
          Born from a deep concern over the rise of synthetic media, our leadership combines cutting-edge innovation with a passion for truth.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 justify-items-center">
          {founders.map((founder, index) => (
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
          ))}
        </div>
      </div>

      {/* Team Section */}
      <div className="max-w-5xl  h-screen mx-auto mt-16">
        <div className="relative h-[75%] rounded-3xl overflow-hidden">
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
