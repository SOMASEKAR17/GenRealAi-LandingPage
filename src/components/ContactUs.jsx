import React, { useState } from 'react';
import { Mail, MapPin, Send, MessageCircle, Linkedin, Clock } from 'lucide-react';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [focused, setFocused] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    });
  };

  const contactInfo = [
    {
      icon: <Mail className="w-4 h-4 sm:w-5 sm:h-5" />,
      title: "Email",
      info: "genreal.ai@gmail.com",
      subInfo: "24/7 Support"
    },
    {
      icon: <Linkedin className="w-4 h-4 sm:w-5 sm:h-5" />,
      title: "LinkedIn",
      info: "https://www.linkedin.com/company/genreal-ai/",
      subInfo: "Let's connect"
    },
    {
      icon: <MapPin className="w-4 h-4 sm:w-5 sm:h-5" />,
      title: "Visit Us",
      info: "VIT Vellore",
      subInfo: "Vellore, Tamil Nadu, India"
    },
    {
      icon: <Clock className="w-4 h-4 sm:w-5 sm:h-5" />,
      title: "Response Time",
      info: "Within 2 working days",
      subInfo: "We'll get back to you soon"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0f1f] via-[#0b162c] to-[#050915] px-3 sm:px-4 md:px-8 py-4 sm:py-6 md:py-8 lg:py-12" id="contact-us">
      {/* Glow Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 sm:-top-40 -right-20 sm:-right-40 w-40 h-40 sm:w-80 sm:h-80 bg-cyan-500/20 rounded-full blur-[80px] sm:blur-[160px]" />
        <div className="absolute -bottom-20 sm:-bottom-40 -left-20 sm:-left-40 w-40 h-40 sm:w-80 sm:h-80 bg-cyan-400/20 rounded-full blur-[80px] sm:blur-[160px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 sm:w-[32rem] sm:h-[32rem] bg-cyan-500/5 rounded-full blur-[80px] sm:blur-[160px]" />
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-6 sm:mb-8 md:mb-10">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-2 sm:mb-3">
            Get In <span className="text-cyan-400">Touch</span>
          </h1>
          <p className="text-gray-400 text-sm sm:text-base md:text-lg lg:text-xl max-w-2xl mx-auto px-4">
            Have a question or want to work together? We'd love to hear from you.
          </p>
        </div>

        {/* Content */}
        <div className="grid lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {/* Contact Info */}
          <div className="space-y-3 sm:space-y-4 lg:order-2">
            {contactInfo.map((item, index) => (
              <div
                key={index}
                className="bg-[#10182f] border border-cyan-500/20 rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-5 hover:shadow-lg hover:shadow-cyan-500/10 transition-all duration-300 backdrop-blur-sm"
              >
                <div className="flex items-center space-x-3 sm:space-x-4">
                  <div className="bg-cyan-500/10 p-2 sm:p-3 rounded-full text-cyan-400 flex-shrink-0">
                    {item.icon}
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-white font-semibold text-sm sm:text-base md:text-lg">{item.title}</h3>
                    {item.title === 'LinkedIn' ? (
                      <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                        <a
                          href={item.info}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-cyan-300 font-medium text-xs sm:text-sm break-all hover:underline"
                          title={item.info}
                        >
                          LinkedIn Profile
                        </a>
                        <a
                          href={item.info}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center px-2 py-1 text-xs bg-cyan-700/30 rounded hover:bg-cyan-700/60 transition self-start"
                          title="Visit LinkedIn"
                        >
                          Visit
                        </a>
                      </div>
                    ) : (
                      <p className="text-cyan-300 font-medium text-xs sm:text-sm break-words">{item.info}</p>
                    )}
                    <p className="text-gray-500 text-xs sm:text-sm">{item.subInfo}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Form */}
          <div className="lg:col-span-2 lg:order-1">
            <div className="bg-[#0e152b] border border-cyan-500/20 rounded-2xl sm:rounded-3xl p-4 sm:p-5 md:p-6 backdrop-blur-sm">
              <div className="flex items-center space-x-3 mb-4 sm:mb-6">
                <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6 text-cyan-400" />
                <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-white">Send us a message</h2>
              </div>

              {submitted && (
                <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-green-500/10 border border-green-500/50 rounded-xl">
                  <p className="text-green-300 font-medium text-sm sm:text-base">
                    Message sent successfully! We'll get back to you soon.
                  </p>
                </div>
              )}

              <div className="space-y-4 sm:space-y-5">
                <div className="grid sm:grid-cols-2 gap-4 sm:gap-5">
                  {["firstName", "lastName"].map((field) => (
                    <div key={field}>
                      <label className="block text-gray-300 font-medium mb-2 text-sm sm:text-base capitalize">
                        {field.replace(/([A-Z])/g, " $1")}
                      </label>
                      <input
                        type="text"
                        name={field}
                        value={formData[field]}
                        onChange={handleChange}
                        onFocus={() => setFocused(field)}
                        onBlur={() => setFocused(null)}
                        required
                        className={`w-full bg-[#121c35] border rounded-lg sm:rounded-xl px-3 sm:px-4 py-2 sm:py-3 text-white text-sm sm:text-base transition-all duration-300 ${
                          focused === field
                            ? 'border-cyan-400 shadow-md shadow-cyan-400/20'
                            : 'border-slate-700 hover:border-slate-600'
                        }`}
                      />
                    </div>
                  ))}
                </div>

                <div className="grid sm:grid-cols-2 gap-4 sm:gap-5">
                  <div>
                    <label className="block text-gray-300 font-medium mb-2 text-sm sm:text-base">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      onFocus={() => setFocused('email')}
                      onBlur={() => setFocused(null)}
                      required
                      className={`w-full bg-[#121c35] border rounded-lg sm:rounded-xl px-3 sm:px-4 py-2 sm:py-3 text-white text-sm sm:text-base transition-all duration-300 ${
                        focused === 'email'
                          ? 'border-cyan-400 shadow-md shadow-cyan-400/20'
                          : 'border-slate-700 hover:border-slate-600'
                      }`}
                    />
                  </div>
                  <div>
                    <label className="block text-gray-300 font-medium mb-2 text-sm sm:text-base">Phone</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      onFocus={() => setFocused('phone')}
                      onBlur={() => setFocused(null)}
                      className={`w-full bg-[#121c35] border rounded-lg sm:rounded-xl px-3 sm:px-4 py-2 sm:py-3 text-white text-sm sm:text-base transition-all duration-300 ${
                        focused === 'phone'
                          ? 'border-cyan-400 shadow-md shadow-cyan-400/20'
                          : 'border-slate-700 hover:border-slate-600'
                      }`}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-300 font-medium mb-2 text-sm sm:text-base">Subject</label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    onFocus={() => setFocused('subject')}
                    onBlur={() => setFocused(null)}
                    required
                    className={`w-full bg-[#121c35] border rounded-lg sm:rounded-xl px-3 sm:px-4 py-2 sm:py-3 text-white text-sm sm:text-base transition-all duration-300 ${
                      focused === 'subject'
                        ? 'border-cyan-400 shadow-md shadow-cyan-400/20'
                        : 'border-slate-700 hover:border-slate-600'
                    }`}
                  />
                </div>

                <div>
                  <label className="block text-gray-300 font-medium mb-2 text-sm sm:text-base">Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    onFocus={() => setFocused('message')}
                    onBlur={() => setFocused(null)}
                    required
                    rows={3}
                    className={`w-full bg-[#121c35] border rounded-lg sm:rounded-xl px-3 sm:px-4 py-2 sm:py-3 text-white text-sm sm:text-base resize-none transition-all duration-300 ${
                      focused === 'message'
                        ? 'border-cyan-400 shadow-md shadow-cyan-400/20'
                        : 'border-slate-700 hover:border-slate-600'
                    }`}
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-cyan-600 to-cyan-400 hover:from-cyan-500 hover:to-cyan-300 text-white font-semibold py-3 sm:py-4 px-6 sm:px-8 rounded-lg sm:rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:shadow-cyan-400/25 flex items-center justify-center space-x-2 sm:space-x-3 text-sm sm:text-base"
                >
                  <Send className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span>Send Message</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;