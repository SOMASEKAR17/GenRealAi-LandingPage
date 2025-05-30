import React from "react";

const AboutUsSection = () => {
  return (
    <section className="bg-gradient-to-br from-black to-cyan-950  text-white pb-10 pt-30 px-6 md:px-20">
      <div className="max-w-5xl mx-auto">
        <p className="text-lg md:text-xl font-semibold leading-loose">
          We aim to build a safer digital world where trust is <strong>verifiable</strong>. Whether you're protecting customer onboarding, moderating user content, or safeguarding public communications, <span className="text-cyan-400 font-semibold">GenReal.ai</span> helps you stay ahead of deepfake threats.
        </p>

        <div className="flex flex-col md:flex-row items-center gap-6 mt-12">
          <div className="min-w-[120px] min-h-[120px] border-2 border-cyan-400 rounded-full flex items-center justify-center text-cyan-400 font-bold text-center">
            What We Do
          </div>
          <div className="border-2 border-cyan-400 rounded-xl p-4 leading-relaxed max-w-xl">
            We offer a robust suite of tools, including real-time APIs, batch processing systems, and a full-featured platform tailored to industries like fintech, media, law enforcement, and social media. Our solutions detect visual and audio manipulation using cutting-edge deep learning, enabling high-speed and high-accuracy verification of user-generated and public content.
          </div>
        </div>

        <div className="text-center text-[10vw] md:text-5xl font-bold text-cyan-100 mt-18 mb-6">
          See beyond the surface. Spot Deepfakes easily.
        </div>

        <div className="flex flex-col md:flex-row-reverse mt-20 items-center md:mr-10 gap-6">
          <div className="min-w-[120px] min-h-[120px] border-2 border-cyan-400 rounded-full flex items-center justify-center text-cyan-400 font-bold text-center">
            What Makes <br /> Us Unique
          </div>
          <div className="border-2 border-cyan-400 rounded-xl p-4 leading-relaxed max-w-xl">
            We offer a robust suite of tools, including real-time APIs, batch processing systems, and a full-featured platform tailored to industries like fintech, media, law enforcement, and social media. Our solutions detect visual and audio manipulation using cutting-edge deep learning, enabling high-speed and high-accuracy verification of user-generated and public content.
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUsSection;
