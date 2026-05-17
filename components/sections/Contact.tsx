'use client';

import { useState, useCallback } from 'react';
import styles from './Contact.module.css';

declare global {
  interface Window {
    grecaptcha: {
      ready: (cb: () => void) => void;
      execute: (siteKey: string, options: { action: string }) => Promise<string>;
    };
  }
}

interface FormState {
  name: string;
  email: string;
  subject: string;
  message: string;
}

type Status = 'idle' | 'loading' | 'success' | 'error';

export default function Contact() {
  const [form, setForm] = useState<FormState>({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [focused, setFocused] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const getRecaptchaToken = useCallback((): Promise<string> => {
    return new Promise((resolve, reject) => {
      const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
      if (!siteKey) { reject(new Error('reCAPTCHA site key not configured')); return; }
      if (!window.grecaptcha) { reject(new Error('reCAPTCHA not loaded')); return; }
      window.grecaptcha.ready(async () => {
        try {
          const token = await window.grecaptcha.execute(siteKey, { action: 'contact_form' });
          resolve(token);
        } catch (err) { reject(err); }
      });
    });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setStatus('loading');
    setErrorMsg('');

    try {
      const recaptchaToken = await getRecaptchaToken();
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, recaptchaToken }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Something went wrong');
      setStatus('success');
      setForm({ name: '', email: '', subject: '', message: '' });
    } catch (err: unknown) {
      setStatus('error');
      setErrorMsg(err instanceof Error ? err.message : 'Failed to send message');
    }
  };

  return (
    <>
      {/* Load reCAPTCHA v3 script */}
      {/* eslint-disable-next-line @next/next/no-sync-scripts */}
      <script
        src={`https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`}
        async
        defer
      />

      <section id="contact" className={styles['contact-section']}>
        {/* ── Left Column: Texts & Links ── */}
        <div className={styles['contact-info-col']}>
          <div className="contact-eyebrow reveal">05 — Let&apos;s Connect</div>
          <h2 className={`contact-title reveal reveal-delay-1 ${styles['custom-title']}`}>
            Let&apos;s Build<br /><em>Together</em>
          </h2>
          <a href="mailto:sabin.thapa07051999@gmail.com" className="contact-email reveal reveal-delay-2">
            sabin.thapa07051999@gmail.com
          </a>

          <div className={`socials reveal reveal-delay-4 ${styles['custom-socials']}`}>
            <a href="https://linkedin.com/in/iamsabin07" className="social-link" target="_blank" rel="noreferrer">LinkedIn</a>
            <a href="tel:8622203587" className="social-link">862-220-3587</a>
            <a href="https://iamsabin07.com" className="social-link" target="_blank" rel="noreferrer">iamsabin07.com</a>
          </div>
        </div>

        {/* ── Right Column: Form ── */}
        <div className={`${styles['contact-form-wrap']} reveal reveal-delay-3`}>
          <div className={styles['contact-form-inner']}>
            {/* Decorative corner accents */}
            <span className={`${styles['form-corner']} ${styles['form-corner--tl']}`} />
            <span className={`${styles['form-corner']} ${styles['form-corner--tr']}`} />
            <span className={`${styles['form-corner']} ${styles['form-corner--bl']}`} />
            <span className={`${styles['form-corner']} ${styles['form-corner--br']}`} />

            <p className={styles['form-tagline']}>Or send a message directly</p>

            <form onSubmit={handleSubmit} noValidate>
              <div className={styles['form-row']}>
                <div 
                  className={`
                    ${styles['form-group']} 
                    ${focused === 'name' ? styles['focused'] : ''} 
                    ${form.name ? styles['filled'] : ''}
                  `}
                >
                  <label htmlFor="cf-name">Name</label>
                  <input
                    id="cf-name"
                    name="name"
                    type="text"
                    value={form.name}
                    onChange={handleChange}
                    onFocus={() => setFocused('name')}
                    onBlur={() => setFocused(null)}
                    autoComplete="name"
                    required
                  />
                  <span className={styles['input-line']} />
                </div>

                <div 
                  className={`
                    ${styles['form-group']} 
                    ${focused === 'email' ? styles['focused'] : ''} 
                    ${form.email ? styles['filled'] : ''}
                  `}
                >
                  <label htmlFor="cf-email">Email</label>
                  <input
                    id="cf-email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    onFocus={() => setFocused('email')}
                    onBlur={() => setFocused(null)}
                    autoComplete="email"
                    required
                  />
                  <span className={styles['input-line']} />
                </div>
              </div>

              <div 
                className={`
                  ${styles['form-group']} 
                  ${focused === 'subject' ? styles['focused'] : ''} 
                  ${form.subject ? styles['filled'] : ''}
                `}
              >
                <label htmlFor="cf-subject">Subject</label>
                <input
                  id="cf-subject"
                  name="subject"
                  type="text"
                  value={form.subject}
                  onChange={handleChange}
                  onFocus={() => setFocused('subject')}
                  onBlur={() => setFocused(null)}
                />
                <span className={styles['input-line']} />
              </div>

              <div 
                className={`
                  ${styles['form-group']} 
                  ${focused === 'message' ? styles['focused'] : ''} 
                  ${form.message ? styles['filled'] : ''}
                `}
              >
                <label htmlFor="cf-message">Message</label>
                <textarea
                  id="cf-message"
                  name="message"
                  rows={5}
                  value={form.message}
                  onChange={handleChange}
                  onFocus={() => setFocused('message')}
                  onBlur={() => setFocused(null)}
                  required
                />
                <span className={styles['input-line']} />
              </div>

              {/* Status messages */}
              {status === 'error' && (
                <p className={`${styles['form-status']} ${styles['form-status--error']}`}>⚠ {errorMsg}</p>
              )}
              {status === 'success' && (
                <p className={`${styles['form-status']} ${styles['form-status--success']}`}>✦ Message sent — I&apos;ll be in touch soon.</p>
              )}

              <div className={styles['form-footer']}>
                <button
                  type="submit"
                  className={`
                    btn-primary 
                    ${styles['form-submit']} 
                    ${status === 'loading' ? styles['loading'] : ''}
                  `}
                  disabled={status === 'loading'}
                >
                  <span>
                    {status === 'loading' ? 'Sending…' : 'Send Message'}
                  </span>
                  {status !== 'loading' && <span className={styles['btn-arrow']}>→</span>}
                  {status === 'loading' && <span className={styles['btn-spinner']} />}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}