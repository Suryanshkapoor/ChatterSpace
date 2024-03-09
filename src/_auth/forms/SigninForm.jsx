import React from "react";
import { Link, useNavigate } from "react-router-dom";

import loader from '../../assets/loader.svg'
import logo from "../../assets/logo.png";
import { useSigninAccount } from "../../react-query/queriesAndMutations";
import { useUserContext } from "../../context/AuthContext";

const SigninForm = () => {
  const { mutateAsync: signInAccount, isPending: loading } = useSigninAccount();
  const { checkAuthUser, isLoading } = useUserContext();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    const data = new FormData(e.target);

    const values = Object.fromEntries(data.entries());

    const session = await signInAccount({
      email: values.email,
      password: values.password,
    });

    if (!session) {
      return;
    }

    const isLoggedIn = checkAuthUser();
    
      if (isLoggedIn) {
        navigate("/");
      }
  }


  

  return (
    <>
      <section>
        <div className="flex flex-col items-center justify-center px-14 py-8 mx-auto md:h-screen lg:py-0">
          <span className="flex items-center mb-4 text-3xl font-bold text-violet-600">
            <img className="h-16 mr-2 " src={logo} alt="logo" />
            Chatter Space
          </span>
          <div className="w-full border border-violet-950 rounded-2xl bg-zinc-950 md:mt-0 sm:max-w-md xl:p-0">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight -mb-7 text-white md:text-2xl">
                Login an Account
              </h1>
              <form
                onSubmit={(e) => handleSubmit(e)}
                className="space-y-4 md:space-y-6 max-w-lg mx-auto"
              >
                <br />
                <div className="mb-5">
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-white"
                  >
                    User Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 font-medium text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                    placeholder="Registered Email"
                    required
                  />
                </div>
                <div className="mb-5">
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-white"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    placeholder="Password"
                    id="password"
                    name="password"
                    className="bg-gray-50 border border-gray-300 text-gray-900 font-medium text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                    minLength="8"
                    required
                  />
                </div>
                <div className="flex items-start mb-5">
                </div>
                <button
                  type="submit"
                  className="w-full text-white bg-violet-600 hover:bg-violet-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
                >
                  {loading || isLoading ? (<>
                    <img src={loader} width={25} height={25} alt="loading..." className="inline mr-2" /><span>please wait...</span>
                    </> 
                  ) : (
                    "Log In"
                  )}
                </button>
                <p className="text-md p-4 font-normal text-gray-200">
                  Don't have an account ?{" "}
                  <Link className="text-blue-600 font-bold" to="/sign-up">
                    Sign-up
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

export default SigninForm;
