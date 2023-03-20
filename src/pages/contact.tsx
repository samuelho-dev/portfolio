import React, { useState } from 'react';

function validate(form) {
  if (!form.name) return 'Missing Name';
  if (!form.email) return 'Missing Email/Incorrect Format';
  if (!form.subject) return 'Missing Subject';
  if (!form.message) return 'Missing Message';
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
    try {
      fetch('/api/mail', {
        method: 'POST',
        body: JSON.stringify(form),
      })
        .then((res) => {
          console.log(res);
          setSubmit(true);
        })
        .catch((err) => new Error(err));
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="flex h-full  flex-col items-center gap-20 rounded-3xl bg-customYellow p-4">
        <h1 className="max-w-fit rounded-3xl bg-customBlue px-4">Contact Me</h1>
        {!submit ? (
          <form className="flex w-full flex-col justify-center gap-2">
            <label
              htmlFor="name"
              className="mt-8 font-light text-gray-500 dark:text-gray-50"
            >
              Full name<span className="text-red-500 dark:text-gray-50">*</span>
            </label>
            <input
              type="text"
              name="name"
              onChange={handleForm}
              className="border-b bg-transparent py-2 pl-4 font-light text-gray-500 ring-green-500 focus:rounded-md focus:outline-none focus:ring-1"
            />

            <label
              htmlFor="email"
              className="mt-4 font-light text-gray-500 dark:text-gray-50"
            >
              E-mail<span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              name="email"
              onChange={handleForm}
              className="border-b bg-transparent py-2 pl-4 font-light text-gray-500 ring-green-500 focus:rounded-md focus:outline-none focus:ring-1"
            />

            <label
              htmlFor="subject"
              className="mt-4 font-light text-gray-500 dark:text-gray-50"
            >
              Subject<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="subject"
              onChange={handleForm}
              className="border-b bg-transparent py-2 pl-4 font-light text-gray-500 ring-green-500 focus:rounded-md focus:outline-none focus:ring-1"
            />

            <label
              htmlFor="message"
              onChange={handleForm}
              className="mt-4 font-light text-gray-500 dark:text-gray-50"
            >
              Message<span className="text-red-500">*</span>
            </label>
            <textarea
              name="message"
              className="border-b bg-transparent py-2 pl-4 font-light text-gray-500 ring-green-500 focus:rounded-md focus:outline-none focus:ring-1"
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
        ) : null}
      </div>
    </div>
  );
}

export default Contact;
