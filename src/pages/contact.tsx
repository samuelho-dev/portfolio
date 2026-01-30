import React, { useState } from 'react';
import { Form } from '../../types/types';

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
  const [submit, setSubmit] = useState(false);

  const handleForm = (e: any) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (!validate(form)) return;
    try {
      fetch('/api/mail', {
        method: 'POST',
        body: JSON.stringify(form),
      }).then(() => setSubmit(true));
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div className="flex min-h-max w-full items-center justify-center">
      <div className="tileShadow flex w-full flex-col items-center gap-20 rounded-3xl bg-custom-yellow py-4 md:w-1/2">
        {!submit ? (
          <div className="w-5/6">
            <form className="flex w-full flex-col justify-center gap-2">
              <label htmlFor="name" className="mt-8 font-light text-black">
                Full name
                <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                onChange={handleForm}
                className="border-b bg-transparent py-2 pl-4 font-light text-black ring-custom-royal-blue focus:rounded-md focus:outline-none focus:ring-1"
              />

              <label htmlFor="email" className="mt-4 font-light text-black">
                E-mail<span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                name="email"
                onChange={handleForm}
                className="border-b bg-transparent py-2 pl-4 font-light text-black ring-custom-royal-blue focus:rounded-md focus:outline-none focus:ring-1"
              />

              <label htmlFor="subject" className="mt-4 font-light text-black">
                Subject<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="subject"
                onChange={handleForm}
                className="border-b bg-transparent py-2 pl-4 font-light text-black ring-custom-royal-blue focus:rounded-md focus:outline-none focus:ring-1"
              />

              <label
                htmlFor="message"
                onChange={handleForm}
                className="mt-4 font-light text-black"
              >
                Message<span className="text-red-500">*</span>
              </label>
              <textarea
                name="message"
                className="border-b bg-transparent py-2 pl-4 font-light text-black ring-custom-royal-blue focus:rounded-md focus:outline-none focus:ring-1"
                onChange={handleForm}
              ></textarea>
              <div className="flex justify-end ">
                <button
                  type="submit"
                  className="rounded-2xl bg-custom-red px-2 text-custom-white"
                  onClick={handleSubmit}
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div>Submitted</div>
        )}
      </div>
    </div>
  );
}

export default Contact;
