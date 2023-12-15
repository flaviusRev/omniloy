/** @format */

import React, { useState } from "react";
import { Input, Button, Typography } from "@material-tailwind/react";
import omniloy_logo from "./../assets/images/omniloy_logo.svg";
import login_screen from "./../assets/images/login_screen.svg";
import googleLogo from "./../assets/icons/google-icon-logo.svg";
import { supabase } from "../supabaseClient";
import toast from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";

export const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async () => {
    toast.success("Signed up initiated!");

    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });
    if (data) {
      console.log("DATA: ", data);
      toast.success("Signed up successfully!");
      navigate("/sign-in");
    }
    if (error) {
      toast.error("Signed up failed!");
    }
  };

  return (
    <div className="flex w-full h-screen bg-white overflow-hidden">
      <div className="flex-shrink-0 w-2/5 h-full">
        <img src={login_screen} alt="login" className="w-auto h-full" />
      </div>
      <div className="w-3/5 m-auto">
        <div className="max-w-md m-auto bg-white rounded-lg p-10">
          <div className="mb-8 items-start">
            <Typography
              className="text-3xl font-medium text-[#333D8E] text-left"
              placeholder={undefined}
            >
              Sign up
            </Typography>
            <Button
              variant="outlined"
              className="w-full my-4 flex justify-start items-center p-1 rounded-md"
              placeholder={undefined}
            >
              <img
                src={googleLogo}
                alt="Google"
                className="ml-3 mr-2 h-5 w-5"
              />
              Sign up with Google
            </Button>
            <hr className="my-8" />
          </div>

          <div>
            <div className="text-center mb-8 items-start">
              <img src={omniloy_logo} alt="Omniloy" className="mb-4" />
            </div>
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              <Input
                type="email"
                size="lg"
                placeholder="Email"
                onChange={handleEmailChange}
                crossOrigin={undefined}
                color="black"
              />

              <Input
                type="password"
                size="lg"
                placeholder="Password"
                onChange={handlePasswordChange}
                crossOrigin={undefined}
              />
              <Button
                className="w-full mt-4 bg-[#3E54AC]"
                type="submit"
                placeholder={undefined}
              >
                Sign up
              </Button>
            </form>
            <Typography
              variant="small"
              className="mt-2 flex justify-center"
              placeholder={undefined}
            >
              Already have an account?
              <Link to="/sign-in">
                <Typography
                  as="span"
                  variant="small"
                  color="blue"
                  className="ml-1 font-bold"
                  onClick={() => navigate("/sign-in")}
                  placeholder={undefined}
                >
                  Sign in
                </Typography>
              </Link>
            </Typography>
          </div>
        </div>
      </div>
    </div>
  );
};
