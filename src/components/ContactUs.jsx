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
      icon: <Mail className="w-5 h-5" />,
      title: "Email",
      info: "hello@company.com",
      subInfo: "24/7 Support"
    },
    {
      icon: <Linkedin className="w-5 h-5" />,
      title: "LinkedIn",
      info: "linkedin.com/in/yourprofile",
      subInfo: "Let's connect"
    },
    {
      icon: <MapPin className="w-5 h-5" />,
      title: "Visit Us",
      info: "123 Business District",
      subInfo: "New York, NY 10001"
    },
    {
      icon: <Clock className="w-5 h-5" />,
      title: "Response Time",
      info: "Within 2 working days",
      subInfo: "We'll get back to you soon"
    }
  ];

  return (
    <div className="bg-gradient-to-b from-[#0a0f1f] via-[#0b162c] to-[#050915] px-4 md:px-8 py-12 min-h-screen">
      {/* Glow Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-cyan-500/20 rounded-full blur-[160px]" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-400/20 rounded-full blur-[160px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[32rem] h-[32rem] bg-cyan-500/5 rounded-full blur-[160px]" />
      </div>

      <div className="relative max-w-6xl mx-auto h-full">
        {/* Heading */}
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-3">
            Get In <span className="text-cyan-400">Touch</span>
          </h1>
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto">
            Have a question or want to work together? We'd love to hear from you.
          </p>
        </div>

        {/* Content */}
        <div className="grid lg:grid-cols-3 gap-8 h-full">
          {/* Contact Info */}
          <div className="flex flex-col justify-between space-y-6">
            {contactInfo.map((item, index) => (
              <div
                key={index}
                className="bg-[#10182f] border border-cyan-500/20 rounded-2xl p-6 hover:shadow-md hover:shadow-cyan-500/10 transition-all flex-1 flex items-center"
              >
                <div className="flex items-center space-x-4 w-full">
                  <div className="bg-cyan-500/10 p-3 rounded-full text-cyan-400 flex-shrink-0">
                    {item.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-white font-semibold text-lg">{item.title}</h3>
                    <p className="text-cyan-300 font-medium break-words">{item.info}</p>
                    <p className="text-gray-500 text-sm">{item.subInfo}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Form */}
          <div className="lg:col-span-2 flex flex-col">
            <div className="bg-[#0e152b] border border-cyan-500/20 rounded-3xl p-6 md:p-10 flex-1">
              <div className="flex items-center space-x-3 mb-6">
                <MessageCircle className="w-6 h-6 text-cyan-400" />
                <h2 className="text-2xl font-bold text-white">Send us a message</h2>
              </div>

              {submitted && (
                <div className="mb-6 p-4 bg-green-500/10 border border-green-500/50 rounded-xl">
                  <p className="text-green-300 font-medium">
                    Message sent successfully! We'll get back to you soon.
                  </p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6 h-full flex flex-col">
                <div className="grid md:grid-cols-2 gap-6">
                  {["firstName", "lastName"].map((field) => (
                    <div key={field}>
                      <label className="block text-gray-300 font-medium mb-2 capitalize">
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
                        className={`w-full bg-[#121c35] border rounded-xl px-4 py-3 text-white transition-all duration-300 ${
                          focused === field
                            ? 'border-cyan-400 shadow-md shadow-cyan-400/20'
                            : 'border-slate-700 hover:border-slate-600'
                        }`}
                      />
                    </div>
                  ))}
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-300 font-medium mb-2">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      onFocus={() => setFocused('email')}
                      onBlur={() => setFocused(null)}
                      required
                      className={`w-full bg-[#121c35] border rounded-xl px-4 py-3 text-white transition-all duration-300 ${
                        focused === 'email'
                          ? 'border-cyan-400 shadow-md shadow-cyan-400/20'
                          : 'border-slate-700 hover:border-slate-600'
                      }`}
                    />
                  </div>
                  <div>
                    <label className="block text-gray-300 font-medium mb-2">Phone (Optional)</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      onFocus={() => setFocused('phone')}
                      onBlur={() => setFocused(null)}
                      className={`w-full bg-[#121c35] border rounded-xl px-4 py-3 text-white transition-all duration-300 ${
                        focused === 'phone'
                          ? 'border-cyan-400 shadow-md shadow-cyan-400/20'
                          : 'border-slate-700 hover:border-slate-600'
                      }`}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-300 font-medium mb-2">Subject</label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    onFocus={() => setFocused('subject')}
                    onBlur={() => setFocused(null)}
                    required
                    className={`w-full bg-[#121c35] border rounded-xl px-4 py-3 text-white transition-all duration-300 ${
                      focused === 'subject'
                        ? 'border-cyan-400 shadow-md shadow-cyan-400/20'
                        : 'border-slate-700 hover:border-slate-600'
                    }`}
                  />
                </div>

                <div className="flex-1 flex flex-col">
                  <label className="block text-gray-300 font-medium mb-2">Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    onFocus={() => setFocused('message')}
                    onBlur={() => setFocused(null)}
                    required
                    className={`w-full bg-[#121c35] border rounded-xl px-4 py-3 text-white resize-none transition-all duration-300 flex-1 min-h-[120px] ${
                      focused === 'message'
                        ? 'border-cyan-400 shadow-md shadow-cyan-400/20'
                        : 'border-slate-700 hover:border-slate-600'
                    }`}
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-cyan-600 to-cyan-400 hover:from-cyan-500 hover:to-cyan-300 text-white font-semibold py-4 px-8 rounded-xl transition-transform duration-300 transform hover:scale-105 hover:shadow-xl hover:shadow-cyan-400/25 flex items-center justify-center space-x-3"
                >
                  <Send className="w-5 h-5" />
                  <span>Send Message</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;