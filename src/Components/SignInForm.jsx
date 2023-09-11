//Hooks
import { useState, useRef } from "react";

// Icons
import VisibleIcon from "../Icons/VisibleIcon";
import HiddenIcon from "../Icons/HiddenIcon";

//Router
import { Link, useHistory } from "react-router-dom";
import supabase from "../supabase";

import { ClipLoader } from "react-spinners";

const SignupForm = (props) => {
  const emailRef = useRef();
  const passwordRef = useRef();

  const history = useHistory();

  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);

  const toggleShowPassword = (e) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };

  const signInHandler = async (e) => {
    setLoading(true);
    e.preventDefault();

    if (!emailRef.current.value || !passwordRef.current.value) {
      return;
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email: emailRef.current.value,
      password: passwordRef.current.value,
    });

    if (error) {
      console.log(error);
    }

    if (data.user) {
      setLoading(false);
      const newUser = {
        email: data.user.email,
        id: data.user.id,
        fullname: data.user.user_metadata.fullname,
        username: data.user.user_metadata.username,
      };
      props.getUser(newUser);
      history.replace("/");
      console.log(data);
    }
  };

  return (
    <div className="bg-white text-black  rounded-lg p-20 relative">
      <h1 className="text-2xl font-medium mb-2 text-center">Welocome Back</h1>
      <p className="text-xs font-light mb-10 text-center">
        Please enter your details
      </p>
      <form onSubmit={signInHandler}>
        <div className="w-full mb-5 border-b border-black">
          <input
            ref={emailRef}
            type="text"
            placeholder="Email"
            className="inline-block w-full placeholder:text-black p-3 pl-0 text-sm focus:outline-none"
          />
        </div>
        <div className="w-full flex items-center border-b border-black">
          <input
            ref={passwordRef}
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className="inline-block w-full placeholder:text-black p-3 pl-0 text-sm focus:outline-none"
          />
          <button onClick={toggleShowPassword} className="mr-2">
            {showPassword ? <VisibleIcon /> : <HiddenIcon />}
          </button>
        </div>
      </form>
      <div className="mt-4 flex justify-between items-center text-[10px] mb-4">
        <div className="flex gap-1">
          <input type="checkbox" id="remember" />
          <label htmlFor="remeber" className="text-gray-600">
            Remember me
          </label>
        </div>
        <p className="text-gray-400 capitalize">forgot password?</p>
      </div>
      <button
        onClick={signInHandler}
        className="bg-dark flex items-center justify-center text-white w-full py-2 rounded-full border-black border-2 hover:bg-white hover:text-black transition-all duration-200"
      >
        {loading ? <ClipLoader color="#777" size={20} /> : "Sign in"}
      </button>
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-[10px]">
        Don't have an account <Link to="/sign-up">Sign Up</Link>
      </div>
    </div>
  );
};

export default SignupForm;
