import React from "react";
 

 import arrow from '/arrow.png';
 import arrowLeft from '/arrowleft.png';
 import aboutUsImage from '/about-ellipse.png';
 

 const AboutUsSection = () => {
   return (
     <section className="bg-[#0A0F1F] text-white py-16 font-sans overflow-hidden">
       {/* Mission Statement (Paragraph on top) */}
       <div className="max-w-full mx-auto text-center mb-20">
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
           <div><img src={arrow} alt="Arrow pointing right" /></div>
         </div>
 

         {/* Boxed Description */}
         <div className="bg-[#1E2A38] w-[80%] mx-auto mt-20 text-[#C9D1D9] text-base md:text-lg rounded-4xl p-6 shadow-lg">
           We offer a robust suite of tools, including real-time APIs, batch
           processing systems, and a full-featured platform tailored to industries
           like fintech, media, law enforcement, and social media. Our solutions
           detect visual and audio manipulation using cutting-edge deep learning,
           enabling high-speed and high-accuracy verification of user-generated and
           public content.
         </div>
       </div>
 

       {/* Image for the circular design */}
       <div
         className="relative mx-auto mt-20 flex justify-center items-center"
         style={{ width: 'min(30vw, 400px)', height: 'min(30vw, 400px)' }}
       >
         <img
           src={aboutUsImage}
           alt="See beyond the surface. Spot Deepfakes easily."
           className="w-full h-full object-contain"
         />
       </div>
 

       {/* The paragraph below (now always visible) */}
       <div className="mt-20 relative max-w-full mx-auto">
         <div className="flex justify-between">
           <div className="mt-15"><img src={arrowLeft} alt="Arrow pointing left" /></div>
 

           <h2 className="text-4xl md:text-[5vw] font-extrabold mb-6 ">
             What Makes<br/>
             <span className="bg-gradient-to-t from-[#3a3a3a] to-white text-transparent bg-clip-text">Us Unique</span>
           </h2>
         </div>
 

         {/* Boxed Description for "What Makes Us Unique" */}
         <div className="bg-[#1E2A38] w-[80%] mx-auto mt-20 text-[#C9D1D9] text-base md:text-lg rounded-4xl p-6 shadow-lg">
           Our unique approach combines cutting-edge deep learning models with a focus on real-world applicability.
           We prioritize speed, accuracy, and ease of integration, ensuring our clients can rapidly deploy and
           effectively combat the evolving threat of deepfakes and manipulated content across various digital platforms.
           This paragraph is now always visible.
         </div>
       </div>
     </section>
   );
 };
 

 export default AboutUsSection;