import React, { useRef } from "react";




const AboutUsSection = () => {
  return (
   <section className="bg-[#0A0F1F] text-white py-16 font-sans">
      {/* Mission Statement */}
      <div className="max-w-full mx-auto text-center">
        <p className="text-xl md:text-2xl px-[10vw] leading-15 word-spacing-word text-[#C9D1D9]">
          Our mission is to assist in creating a safer, more reliable digital
          environment where trust isn’t compromised. Whether you’re moderating
          user content or safeguarding public communications,{" "}
          <span className="text-[#00D1FF] font-semibold">GenReal.ai</span> is here
          to help you lead with confidence.
        </p>
      </div>

      {/* What We Do */}
      <div className="mt-20 relative max-w-full mx-auto">
        <div className="flex justify-between">
          <h2
            className="text-4xl md:text-[5vw] pl-[10vw] font-extrabold mb-6 bg-gradient-to-t from-[#3a3a3a] to-white text-transparent bg-clip-text"
          >
            What we do
          </h2>
          <div><img src="/arrow.png" alt="" /></div>
        </div>

        

        {/* Boxed Description */}
        <div className="bg-[#1E2A38] w-[80%] mx-auto mt-20 text-[#C9D1D9] text-base md:text-lg rounded-4xl p-6  shadow-lg">
          We offer a robust suite of tools, including real-time APIs, batch
          processing systems, and a full-featured platform tailored to industries
          like fintech, media, law enforcement, and social media. Our solutions
          detect visual and audio manipulation using cutting-edge deep learning,
          enabling high-speed and high-accuracy verification of user-generated and
          public content.
        </div>
      </div>
      <div className="relative mx-auto mt-20 h-[30vw] w-[30vw]">
        <div className="textbox w-full h-full px-[5vw] py-[40%] text-xl text-center absolute z-10">The text comes here everything here will be a placeholder only for development purposes
        </div>
        <div className="rotationbox absolute z-99 bg-transparent border-10 border-r from-black to-white rounded-full h-full w-full">

        </div>
      </div>
      <div className="mt-20 relative max-w-full mx-auto">
        <div className="flex justify-between">
          <div className="mt-15"><img src="/arrowleft.png" alt="" /></div>
          
          <h2
            className="text-4xl md:text-[5vw] font-extrabold mb-6 "
          >
            What Makes<br/>
            <span className="bg-gradient-to-t from-[#3a3a3a] to-white text-transparent bg-clip-text">Us Unique</span>
          </h2>
          
        </div>

        

        {/* Boxed Description */}
        <div className="bg-[#1E2A38] w-[80%] mx-auto mt-20 text-[#C9D1D9] text-base md:text-lg rounded-4xl p-6  shadow-lg">
          We offer a robust suite of tools, including real-time APIs, batch
          processing systems, and a full-featured platform tailored to industries
          like fintech, media, law enforcement, and social media. Our solutions
          detect visual and audio manipulation using cutting-edge deep learning,
          enabling high-speed and high-accuracy verification of user-generated and
          public content.
        </div>
      </div>
    </section>
  );
};

export default AboutUsSection;
