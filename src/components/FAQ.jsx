import React, { useState } from 'react';
import { FaChevronDown } from 'react-icons/fa';

const faqs = [
  { question: 'What does GenReal.ai do?', answer: 'Not yet decided.' },
  { question: 'Why use GenReal.ai?', answer: 'Not yet decided.' },
  { question: 'What are the pricing options?', answer: 'Not yet decided.' },
  { question: 'When do I use GenReal.ai?', answer: 'Not yet decided.' },
];

const styles = {
  section: {
    width: '100vw',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'radial-gradient(ellipse at center, rgba(11, 151, 132, 0.708) 0%, rgba(0,255,255,0.12) 8%, rgba(0,40,50,0.18) 14%, rgba(10,30,35,0.65) 18%, rgba(5,15,20,0.92) 22%, #01080d 32%, #000b10 100%)',
    color: '#e3eaf0',
    margin: 0,
    padding: 0,
  },
  title: {
    color: '#fff',
    fontSize: '2.8rem',
    fontWeight: 800,
    marginBottom: 48,
    letterSpacing: '2.5px',
    textAlign: 'center',
    marginTop: 60,
  },
  box: {
    background: '#000b10',
    border: '2.5px solid #00ffff',
    borderRadius: 24,
    boxShadow: '0 0 32px 4px #00ffff44',
    padding: '32px 0 32px 0',
    width: 950,
    maxWidth: '99vw',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    justifyContent: 'center',
  },
  item: {
    background: '#000',
    padding: '28px 40px',
    borderBottom: '1.5px solid #00ffff',
    transition: 'background 0.2s',
  },
  itemLast: {
    borderBottom: 'none',
  },
  row: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    cursor: 'pointer',
  },
  question: {
    color: '#fff',
    fontSize: '1.25rem',
    fontWeight: 500,
    letterSpacing: '0.2px',
  },
  icon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
    height: 40,
    borderRadius: '50%',
    background: '#fff',
    color: '#222e36',
    fontSize: '1.5rem',
    border: 'none',
    boxShadow: '0 2px 8px rgba(0,255,255,0.10)',
    transition: 'transform 0.25s',
  },
  iconOpen: {
    transform: 'rotate(180deg)',
  },
  answer: {
    color: '#b0bec5',
    fontSize: '1.08rem',
    padding: '18px 0 0 0',
    background: '#000',
    transition: 'max-height 0.2s, opacity 0.2s',
    width: '100%',
    display: 'block',
  },
};

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = idx => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <div style={styles.section}>
      <h2 style={styles.title}>Frequently Asked Questions</h2>
      <div style={styles.box}>
        {faqs.map((faq, idx) => (
          <div
            key={idx}
            style={{
              ...styles.item,
              ...(idx === faqs.length - 1 ? styles.itemLast : {}),
            }}
          >
            <div style={styles.row} onClick={() => toggleFAQ(idx)}>
              <p style={styles.question}>{faq.question}</p>
              <span
                style={{
                  ...styles.icon,
                  ...(openIndex === idx ? styles.iconOpen : {}),
                }}
              >
                <FaChevronDown />
              </span>
            </div>
            {openIndex === idx && (
              <p style={styles.answer}>{faq.answer}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ; 