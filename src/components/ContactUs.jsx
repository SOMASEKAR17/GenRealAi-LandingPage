import React, { useState, useEffect } from 'react';
import { FaLinkedin, FaInstagram, FaEnvelope } from 'react-icons/fa';

// Inject Google Fonts for Orbitron and Exo
const injectFonts = () => {
  if (!document.getElementById('orbitron-exo-fonts')) {
    const link = document.createElement('link');
    link.id = 'orbitron-exo-fonts';
    link.rel = 'stylesheet';
    link.href = 'https://fonts.googleapis.com/css2?family=Exo:wght@400;500;700&family=Orbitron:wght@700;900&display=swap';
    document.head.appendChild(link);
  }
};

const FAQ_GLOW = '#00ffff';
const FAQ_GLOW_RGBA = 'rgba(0,255,255,0.7)';
const FAQ_BG = '#000';

const styles = {
  page: {
    minHeight: '100vh',
    width: '100vw',
    position: 'relative',
    background: FAQ_BG,
    fontFamily: 'Exo, Arial, sans-serif',
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bgSplash: (top, left, size, blur, opacity = 0.22) => ({
    position: 'absolute',
    top,
    left,
    width: size,
    height: size,
    background: `radial-gradient(circle, ${FAQ_GLOW_RGBA} 0%, transparent 80%)`,
    filter: `blur(${blur}px)`,
    zIndex: 0,
    pointerEvents: 'none',
  }),
  card: {
    background: 'rgba(10, 35, 39, 0.88)',
    border: `2px solid ${FAQ_GLOW}`,
    borderRadius: 24,
    boxShadow: `0 0 12px 1px ${FAQ_GLOW}33, 0 4px 16px 0 ${FAQ_GLOW}11`,
    padding: '48px 48px',
    width: 980,
    maxWidth: '98vw',
    display: 'flex',
    flexDirection: 'row',
    gap: 64,
    alignItems: 'flex-start',
    justifyContent: 'center',
    zIndex: 2,
    position: 'relative',
    backdropFilter: 'blur(12px)',
    margin: '0 auto',
  },
  left: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
    minWidth: 260,
    maxWidth: 400,
    paddingRight: 24,
  },
  right: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 260,
    maxWidth: 420,
    textAlign: 'center',
    paddingLeft: 24,
  },
  title: {
    color: '#00ffff',
    fontSize: '2.5rem',
    fontWeight: 900,
    marginBottom: 18,
    letterSpacing: '1.5px',
    textAlign: 'center',
    fontFamily: 'Orbitron, Arial, sans-serif',
    textTransform: 'uppercase',
    textShadow: '0 0 12px #00ffff, 0 0 32px #00ffff44',
  },
  desc: {
    color: '#e3eaf0',
    fontSize: '1.13rem',
    fontWeight: 400,
    marginBottom: 32,
    lineHeight: 1.7,
    textAlign: 'center',
    fontFamily: 'Exo, Arial, sans-serif',
  },
  iconsRow: {
    display: 'flex',
    flexDirection: 'row',
    gap: 32,
    justifyContent: 'center',
    marginBottom: 32,
    marginTop: 8,
  },
  icon: {
    fontSize: 24,
    color: FAQ_GLOW,
    background: 'rgba(0,255,255,0.07)',
    borderRadius: '50%',
    boxShadow: `0 0 8px 1px ${FAQ_GLOW}33`,
    padding: 10,
    transition: 'transform 0.18s',
    cursor: 'pointer',
  },
  iconHover: {
    transform: 'scale(1.13)',
    boxShadow: `0 0 16px 3px ${FAQ_GLOW}66`,
  },
  map: {
    width: 270,
    margin: '0 auto',
    display: 'block',
    filter: `drop-shadow(0 0 32px ${FAQ_GLOW})`,
  },
  form: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: 0,
    fontFamily: 'Exo, Arial, sans-serif',
  },
  label: {
    color: '#e3eaf0',
    fontSize: '1.08rem',
    marginBottom: 6,
    marginTop: 14,
    fontWeight: 500,
    fontFamily: 'Exo, Arial, sans-serif',
    letterSpacing: '0.1px',
  },
  input: {
    width: '100%',
    padding: '16px 18px',
    marginBottom: 18,
    borderRadius: 18,
    border: `1.5px solid ${FAQ_GLOW}`,
    background: 'rgba(0,0,0,0.35)',
    color: '#fff',
    fontSize: '1.08rem',
    outline: 'none',
    transition: 'border 0.2s, box-shadow 0.2s',
    fontFamily: 'Exo, Arial, sans-serif',
    boxShadow: `inset 0 2px 12px 0 ${FAQ_GLOW}22`,
  },
  textarea: {
    width: '100%',
    padding: '16px 18px',
    marginBottom: 22,
    borderRadius: 18,
    border: `1.5px solid ${FAQ_GLOW}`,
    background: 'rgba(0,0,0,0.35)',
    color: '#fff',
    fontSize: '1.08rem',
    outline: 'none',
    resize: 'none',
    minHeight: 100,
    transition: 'border 0.2s, box-shadow 0.2s',
    fontFamily: 'Exo, Arial, sans-serif',
    boxShadow: `inset 0 2px 12px 0 ${FAQ_GLOW}22`,
  },
  checkboxRow: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: 22,
    marginTop: 2,
    fontFamily: 'Exo, Arial, sans-serif',
  },
  checkbox: {
    accentColor: FAQ_GLOW,
    width: 20,
    height: 20,
    marginRight: 10,
    borderRadius: 6,
    border: `1.5px solid ${FAQ_GLOW}`,
    outline: 'none',
    cursor: 'pointer',
  },
  checkboxLabel: {
    color: '#e3eaf0',
    fontSize: '1.05rem',
    fontWeight: 400,
    fontFamily: 'Exo, Arial, sans-serif',
  },
  button: {
    width: '100%',
    padding: '18px 0',
    borderRadius: 24,
    background: 'linear-gradient(90deg, #0a6e7a 60%, #168c8c 100%)',
    color: '#fff',
    fontWeight: 900,
    fontSize: '1.18rem',
    border: 'none',
    boxShadow: '0 2px 6px 0 #168c8c44',
    cursor: 'pointer',
    transition: 'background 0.2s, box-shadow 0.2s, transform 0.15s',
    marginTop: 12,
    letterSpacing: '0.7px',
    textTransform: 'uppercase',
    fontFamily: 'Orbitron, Arial, sans-serif',
  },
  buttonHover: {
    background: 'linear-gradient(90deg, #168c8c 0%, #0a6e7a 100%)',
    boxShadow: '0 4px 12px 0 #168c8c44',
    transform: 'translateY(-2px) scale(1.04)',
  },
  '@media (max-width: 1100px)': {
    card: {
      flexDirection: 'column',
      gap: 32,
      padding: '32px 4vw',
      width: '98vw',
      minWidth: 0,
      maxWidth: '99vw',
    },
    left: {
      maxWidth: '100%',
      minWidth: 0,
      width: '100%',
      paddingRight: 0,
    },
    right: {
      maxWidth: '100%',
      minWidth: 0,
      width: '100%',
      marginTop: 32,
      paddingLeft: 0,
    },
    map: {
      width: 180,
    },
  },
};

const ContactUs = () => {
  useEffect(() => { injectFonts(); }, []);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [agree, setAgree] = useState(false);
  const [hover, setHover] = useState(null);
  const [buttonHover, setButtonHover] = useState(false);

  // Responsive styles
  const isMobile = window.innerWidth < 1100;
  const mergedStyles = key =>
    isMobile && styles['@media (max-width: 1100px)'] && styles['@media (max-width: 1100px)'][key]
      ? { ...styles[key], ...styles['@media (max-width: 1100px)'][key] }
      : styles[key];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!formData.name || !formData.email || !formData.message || !agree) {
      alert('Please fill out all fields and agree to the terms.');
      return;
    }
    alert('Message sent!');
    setFormData({ name: '', email: '', message: '' });
    setAgree(false);
  };

  const iconList = [
    { icon: <FaLinkedin />, label: 'LinkedIn' },
    { icon: <FaInstagram />, label: 'Instagram' },
    { icon: <FaEnvelope />, label: 'Email' },
  ];

  return (
    <div style={styles.page}>
      <div style={mergedStyles('card')}>
        <div style={mergedStyles('left')}>
          <form style={styles.form} onSubmit={handleSubmit} autoComplete="off">
            <label style={styles.label}>Name</label>
            <input
              style={styles.input}
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              autoComplete="off"
            />
            <label style={styles.label}>E-mail</label>
            <input
              style={styles.input}
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              autoComplete="off"
            />
            <label style={styles.label}>Enter description</label>
            <textarea
              style={styles.textarea}
              name="message"
              value={formData.message}
              onChange={handleChange}
              autoComplete="off"
            />
            <div style={styles.checkboxRow}>
              <input
                type="checkbox"
                checked={agree}
                onChange={e => setAgree(e.target.checked)}
                style={styles.checkbox}
                id="agree"
              />
              <label htmlFor="agree" style={styles.checkboxLabel}>
                I agree to the <span style={{ color: '#00ffff', textDecoration: 'underline', cursor: 'pointer' }}>processing</span> of the personal data provided
              </label>
            </div>
            <button
              style={buttonHover ? { ...styles.button, ...styles.buttonHover } : styles.button}
              type="submit"
              onMouseEnter={() => setButtonHover(true)}
              onMouseLeave={() => setButtonHover(false)}
            >
              Send
            </button>
          </form>
        </div>
        <div style={mergedStyles('right')}>
          <div style={styles.title}>CONTACT US</div>
          <div style={styles.desc}>
            Customer satisfaction is our top priority! Our support service is available 24/7 to assist you with any questions you may have about our Platform: not yet decided.<br /><br />
            You can contact us any way you prefer:
          </div>
          <div style={styles.iconsRow}>
            {iconList.map((item, idx) => (
              <span
                key={item.label}
                style={hover === idx ? { ...styles.icon, ...styles.iconHover } : styles.icon}
                onMouseEnter={() => setHover(idx)}
                onMouseLeave={() => setHover(null)}
                title={item.label}
              >
                {item.icon}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
