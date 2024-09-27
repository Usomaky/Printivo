import React from "react";
import Link from "../link";

const SignUpComplete = () => {
  return (
    <section className="c-checkout__status mx-auto flex">
      <div>
        <h3 className="font-dm text-2xl mb-3 text-green-dark">
          One More Step!
        </h3>
        <div className="text-blue-dark">
          <p className="font-sf--reg text-sm">
            Thank you for joining our user community, kindly check your email to
            confirm your membership and start enjoying our members only benefits
          </p>
        </div>
        <Link to="/">
          <button className="py-3 mt-6 hidden md:inline-block input-rounded px-14 bg-green-dark text-white font-15 font-sf">
            Return Home
          </button>
        </Link>
      </div>
    </section>
  );
};

export default SignUpComplete;
