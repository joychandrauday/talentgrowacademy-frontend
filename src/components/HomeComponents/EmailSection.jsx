import React from "react";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";

const EmailSection = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => console.log(data);

  return (
    <div className="md:my-10 px-4">
      <p className="text-center font-semibold italic">Customer Care</p>
      <h1 className="text-center mt-5 font-bold text-[#2B6777] md:text-[50px] text-2xl">
        We are here to help you
      </h1>

      <div className="md:my-5 flex justify-center">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full md:mx-20 p-6 bg-base-100 rounded-xl "
        >
          {/* Name Field */}
          <div className="form-control mb-4">
            <input
              type="text"
              placeholder="Enter your name"
              {...register("name", { required: "Name is required" })}
              className="input shadow w-full"
            />
            {errors.name && (
              <span className="text-red-500 text-sm">
                {errors.name.message}
              </span>
            )}
          </div>

          {/* Subject Field */}
          <div className="form-control mb-4">
            <input
              type="text"
              placeholder="Enter subject"
              {...register("subject", { required: "Subject is required" })}
              className="input shadow w-full"
            />
            {errors.subject && (
              <span className="text-red-500 text-sm">
                {errors.subject.message}
              </span>
            )}
          </div>

          {/* Email Field */}
          <div className="form-control mb-4">
            <input
              type="email"
              placeholder="Enter your email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Invalid email format",
                },
              })}
              className="input input-bordered w-full"
            />
            {errors.email && (
              <span className="text-red-500 text-sm">
                {errors.email.message}
              </span>
            )}
          </div>

          {/* Message Field */}
          <div className="form-control mb-4">
            <textarea
              placeholder="Your message..."
              {...register("message", { required: "Message is required" })}
              className="textarea textarea-bordered w-full"
            ></textarea>
            {errors.message && (
              <span className="text-red-500 text-sm">
                {errors.message.message}
              </span>
            )}
          </div>

          {/* Submit Button */}
          <div className="form-control mt-6">
            <button
              type="submit"
              className="btn bg-[#2B6777] text-white w-full"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Empty PropTypes declaration
EmailSection.propTypes = {};

export default EmailSection;
