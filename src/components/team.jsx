import React from "react";

const TeamSection = () => {
  const founders = [
    { name: "xyz", title: "CEO, Founder", imgSrc: "" },
    { name: "xyz", title: "CEO, Founder", imgSrc: "" },
    { name: "xyz", title: "CEO, Founder", imgSrc: "" },
  ];

  return (
    <div className="bg-gradient-to-bl from-black to-cyan-950  from-30%  to-100% text-white px-6 py-16" id="team">
      {/* Founders Section */}
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Meet Our Founders</h2>
        <p className="text-sm md:text-base text-gray-300 max-w-2xl mx-auto mb-12">
          Born from a deep concern over the rise of synthetic media, our leadership combines cutting-edge innovation with a passion for truth.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 justify-items-center">
          {founders.map((founder, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className="md:w-[20vw] md:h-[20vw] lg:w-[15vw] lg:h-[15vw] sm:w-[40vw] sm:h-[40vw] w-[50vw] h-[50vw] rounded-md overflow-hidden bg-gray-800 flex items-center justify-center">
                <img
                  src={founder.imgSrc}
                  alt={`Founder ${index + 1}`}
                  className="w-full h-full"
                />
              </div>
              <p className="mt-4 font-medium">{founder.name}</p>
              <p className="text-sm text-gray-400">{founder.title}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Team Section */}
      <div className="max-w-5xl mx-auto mt-16">
        <div className="relative  overflow-hidden">
          <img
            src="/team.png"
            alt="Our Team"
            className="w-full object-cover h-full "
          />
          <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
            <h3 className="text-white text-2xl md:text-3xl font-semibold">Our Team</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamSection;
