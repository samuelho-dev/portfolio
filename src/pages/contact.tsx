import React, { useState } from 'react';

function validate(form) {
  if (!form.name) {
    alert('Name is a required field');
    return false;
  }
  if (!form.email) {
    alert('Name is a required field');
    return false;
  }
  if (!form.subject) {
    alert('Name is a required field');
    return false;
  }
  if (!form.message) {
    alert('Name is a required field');
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

  const handleForm = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    console.log('hello');
    e.preventDefault();
    if (!validate(form)) return;
    try {
      await fetch('/api/mail', {
        method: 'POST',
        body: JSON.stringify(form),
      });
      setSubmit(true);
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="flex h-full w-1/2 flex-col items-center gap-20 rounded-3xl bg-customYellow p-4">
        <h1 className="max-w-fit rounded-3xl bg-customBlue px-4">Contact Me</h1>
        {!submit ? (
          <div className="w-1/2">
            <form className="flex w-full flex-col justify-center gap-2">
              <label htmlFor="name" className="mt-8 font-light text-black">
                Full name
                <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                onChange={handleForm}
                className="border-b bg-transparent py-2 pl-4 font-light text-black ring-customOrange focus:rounded-md focus:outline-none focus:ring-1"
              />

              <label htmlFor="email" className="mt-4 font-light text-black">
                E-mail<span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                name="email"
                onChange={handleForm}
                className="border-b bg-transparent py-2 pl-4 font-light text-black ring-customOrange focus:rounded-md focus:outline-none focus:ring-1"
              />

              <label htmlFor="subject" className="mt-4 font-light text-black">
                Subject<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="subject"
                onChange={handleForm}
                className="border-b bg-transparent py-2 pl-4 font-light text-black ring-customOrange focus:rounded-md focus:outline-none focus:ring-1"
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
                className="border-b bg-transparent py-2 pl-4 font-light text-black ring-customOrange focus:rounded-md focus:outline-none focus:ring-1"
                onChange={handleForm}
              ></textarea>
              <div className="flex justify-end ">
                <button
                  type="submit"
                  className="rounded-2xl bg-customRed px-2 text-customWhite"
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
