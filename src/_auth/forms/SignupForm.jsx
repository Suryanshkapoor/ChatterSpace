import React, { useState } from "react";
import { Link } from "react-router-dom";

import loader from '../../assets/loader.svg'
import logo from "../../assets/logo.png";
import { useCreateUserAccount } from "../../react-query/queriesAndMutations";
const SignupForm = () => {
  const [accCreated, setAccCreated] = useState(false);
  
  const {mutateAsync: createUserAccount, isPending:loading } =useCreateUserAccount();

  const checkpass = () => {
    if (
      document.getElementById("password").value ===
        document.getElementById("confirm-password").value &&
      document.getElementById("password").value !== ""
    ) {
      document.getElementById("pass-check").innerHTML = "Passwords match!";
    } else {
      document.getElementById("pass-check").innerHTML =
        "Passwords doesn't match!";
    }
  };

  async function handleSubmit(e) {
    e.preventDefault();
    
    const data = new FormData(e.target);

    const values = Object.fromEntries(data.entries());

    const newUser = await createUserAccount(values);

    data.entries().value='';

    if (!newUser) {
      return;
    }else{
      setAccCreated(true);
    }
  }



  return (
    <>
      <section>
        <div className="flex flex-col items-center justify-center px-14 py-8 mx-auto md:h-screen lg:py-0">
          {accCreated && (
            <div id="toast" role="alert" className="flex items-center w-full max-w-sm p-4 mb-4 text-gray-500 bg-gray-200 rounded-lg ">
              <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-green-500 bg-green-100 rounded-lg ">
                <svg
                  className="w-5 h-5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                </svg>
                <span className="sr-only">Check icon</span>
              </div>
              <div className="ms-3 mr-3 text-sm font-normal">
                Account created successfully.
              </div>
              <Link
                to="/sign-in"
                onClick={() => setAccCreated(false)}
                className=" mx-1.5 my-1.5 font-medium bg-gray-200 text-gray-600 hover:text-blue-600 rounded-lg p-1.5 inline-flex items-center justify-center h-8 w-24"
              >
                Login Now
              </Link>
            </div>
          )}
          <span className="flex items-center mb-4 text-3xl font-bold text-violet-600">
            <img className="h-16 mr-2" src={logo} alt="logo" />
            Chatter Space
          </span>
          <div className="w-full border border-violet-950 rounded-lg bg-gray-800 md:mt-0 sm:max-w-md xl:p-0">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-white md:text-2xl">
                Create an Account
              </h1>
              <form
                className="space-y-4 md:space-y-6"
                onSubmit={(e) => handleSubmit(e)}
              >
                <div>
                  <label
                    htmlFor="name"
                    className="block mb-2 text-sm font-medium text-white"
                  >
                    User Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                    placeholder="Enter Your Full Name"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-white"
                  >
                    Your email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                    placeholder="name@company.com"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-white"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                    required
                  />
                </div>
                <div>
                  <span
                    className="text-sm font-light text-gray-300"
                    id="pass-check"
                  ></span>
                  <label
                    htmlFor="confirm-password"
                    className="block mb-2 text-sm font-medium text-white"
                  >
                    Confirm password
                  </label>
                  <input
                    onKeyUp={() => checkpass()}
                    type="password"
                    name="confirm-password"
                    id="confirm-password"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full text-white bg-violet-600 hover:bg-violet-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
                >
                  {loading ? (
                    <>
                    <img src={loader} width={25} height={25} alt="loading..." className="inline mr-2" /><span>please wait...</span>
                    </>
                  ) : (
                    "Create Account"
                  )}
                </button>
                <br />
                <p className="text-sm font-light text-gray-300 ">
                  Already have an account?{" "}
                  <Link to="/sign-in" onClick={() => setAccCreated(false)} className="text-blue-600 font-semibold ">
                    Login here
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SignupForm;
