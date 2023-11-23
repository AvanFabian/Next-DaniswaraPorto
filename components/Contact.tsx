"use client";
import { useState, useRef } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import { useLottie } from "lottie-react";
// import { EarthCanvas } from "./canvas"
import { SectionWrapper } from "../hoc";
import contactlottie from "@/public/assets/animations/contact-lottie1.json";

const RobotAnimation = () => {
  const style2 = {
    width: 400,
    height: 550,
    marginLeft: '100px',
    display: "flex",
  };

  const options = {
    animationData: contactlottie,
    loop: true,
    autoplay: true,
  };

  const { View } = useLottie(options, style2);
  return View;
};

const Contact = () => {
  const formRef = useRef<HTMLFormElement | null>(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: any) => {
    // e.target is the input field
    // name is the name of the input field
    // Below is same as const { target } = e
    const { name, value } = e.target;
    // ...form is the previous state, [name] is the input field
    // value is the value of the input field
    // [name]: value is the new state
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setLoading(true);

    const serviceId = process.env.NEXT_PUBLIC_SERVICE_ID as string;
    const templateId = process.env.NEXT_PUBLIC_TEMPLATE_ID as string;
    const publicKey = process.env.NEXT_PUBLIC_PUBLIC_KEY as string;
    const formrefCurrent = formRef.current as HTMLFormElement;

    if (!serviceId) {
      throw new Error("SERVICE_ID is not defined");
    }
    // formRef.current is the form data
    emailjs.sendForm(serviceId, templateId, formrefCurrent, publicKey).then(
      (result) => {
        setLoading(false);
        alert("Thank you for your message, I will get back to you soon.");
        setForm({
          name: "",
          email: "",
          message: "",
        });
      },
      (error) => {
        console.log(error.text);
        setLoading(false);
        alert("An error occurred, please try again.");
      }
    );
  };

  return (
    <div
      className="mt-6 lg:mt-12 lg:flex-row
     flex-col-reverse flex overflow-hidden"
    >
      {/* Contact */}
      <div className="bg-black-100 w-full lg:w-[600px] h-full p-10 rounded-2xl">
        <p className="sectionSubText">Get in touch</p>
        <h3 className="sectionHeadText">Contact.</h3>
        <form
          // ref purpose here is to get the form data
          ref={formRef}
          onSubmit={handleSubmit}
          className="mt-8 flex flex-col gap-8"
        >
          {/* below is the name input */}
          <label className="flex flex-col">
            <span
              className="text-white
             font-medium text-xs mb-4"
            >
              Your Name
            </span>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="What's your name?"
              // py is padding on y-axis, px is padding on x-axis
              className="bg-tertiary py-3 px-6
              placeholder:text-secondary
              text-white rounded-2xl outlined-none
              border-none font-medium"
            ></input>
          </label>
          {/* below is the email input */}
          <label className="flex flex-col">
            <span
              className="text-white
             font-medium mb-4"
            >
              Your Email
            </span>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="What's your email?"
              // py is padding on y-axis, px is padding on x-axis
              className="bg-tertiary py-3 px-6
              placeholder:text-secondary
              text-white rounded-2xl outlined-none
              border-none font-medium"
            ></input>
          </label>
          {/* below is the message input */}
          <label className="flex flex-col">
            <span
              className="text-white
             font-medium mb-4"
            >
              Your Message
            </span>
            <input
              type="text"
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="What do you want to say?"
              // py is padding on y-axis, px is padding on x-axis
              className="bg-tertiary py-3 px-6
              placeholder:text-secondary
              text-white rounded-2xl outlined-none
              border-none font-medium"
            ></input>
          </label>
          {/* below is the submit button */}
          <button
            type="submit"
            // w-fit purpose is to make the button width
            // fit the content
            className="bg-tertiary py-3 px-7
            outline-none w-fit text-white font-bold
            shadow-md rounded-2xl hover:bg-secondary
            hover:text-tertiary hover:font-bold"
          >
            {loading ? "Sending..." : "Send"}
          </button>
        </form>
      </div>
      {/* Robot ANimation */}
      <div
        className="hidden lg:flex items-center justify-end w-full lg:w-[50%]"
      >
        <RobotAnimation />
      </div>
    </div>
  );
};

export default SectionWrapper(Contact, 'contact')
