import { useState } from 'react';
import type { Form } from '../../types/types';

function validate(form: Form) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!form.name) {
    alert('Name is a required field');
    return false;
  }
  if (!form.email || !emailRegex.test(form.email)) {
    alert('Email is missing or in an invalid format.');
    return false;
  }
  if (!form.subject) {
    alert('Subject is a required field');
    return false;
  }
  if (!form.message) {
    alert('Message is a required field');
    return false;
  }
  return true;
}

function Contact() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleForm = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate(form)) return;

    setSubmitting(true);
    try {
      await fetch('/api/mail', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      setSubmitted(true);
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center px-6">
        <div className="text-center">
          <h2 className="mb-4 text-cream">Message sent</h2>
          <p className="text-text-muted">Thanks for reaching out. I&apos;ll get back to you soon.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-[60vh] items-center justify-center px-6 py-12">
      <div className="w-full max-w-md">
        <h2 className="mb-8 text-cream">Get in touch</h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <label htmlFor="name" className="caption text-text-muted">
              Name <span className="text-accent-primary">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={form.name}
              onChange={handleForm}
              className="border-b border-border bg-transparent px-0 py-2 text-cream placeholder:text-text-muted focus:border-cream focus:outline-none"
              placeholder="Your name"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="caption text-text-muted">
              Email <span className="text-accent-primary">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={form.email}
              onChange={handleForm}
              className="border-b border-border bg-transparent px-0 py-2 text-cream placeholder:text-text-muted focus:border-cream focus:outline-none"
              placeholder="you@example.com"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="subject" className="caption text-text-muted">
              Subject <span className="text-accent-primary">*</span>
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={form.subject}
              onChange={handleForm}
              className="border-b border-border bg-transparent px-0 py-2 text-cream placeholder:text-text-muted focus:border-cream focus:outline-none"
              placeholder="What's this about?"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="message" className="caption text-text-muted">
              Message <span className="text-accent-primary">*</span>
            </label>
            <textarea
              id="message"
              name="message"
              value={form.message}
              onChange={handleForm}
              rows={4}
              className="resize-none border-b border-border bg-transparent px-0 py-2 text-cream placeholder:text-text-muted focus:border-cream focus:outline-none"
              placeholder="Your message..."
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="btn-primary mt-4 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {submitting ? 'Sending...' : 'Send message'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Contact;
