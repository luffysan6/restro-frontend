import { useState } from "react";
import { NavLink, useNavigate } from "react-router";
import authStore from "../store/authStore";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");
  let navigate = useNavigate();
  let { Register } = authStore();

  // console.log({ email, password });
  const handleRegister = async (e) => {
    e.preventDefault();
    const res = await Register({ name, email, password });

    if (res.success) {
      navigate("/dashboard");
    }
  };
  return (
    <>
      <form onSubmit={handleRegister} className="contact-form">
        <h3
          style={{
            fontFamily: "'Bebas Neue','sans-serif'",
            fontSize: "2rem",
            letterSpacing: "1px",
          }}
        >
          Register Account
        </h3>
        <div className="flex flex-col gap-6">
          <div className="form-group">
            <label htmlFor="name">What Should we Shout For U ?</label>
            <input
              id="name"
              onChange={(e) => {
                setName(e.target.value);
              }}
              className="w-full border mt-1 bg-indigo-500/5 mb-2 border-gray-500/10 outline-none rounded py-2.5 px-3"
              type="text"
              placeholder="Name"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              className="w-full border mt-1 bg-indigo-500/5 mb-2 border-gray-500/10 outline-none rounded py-2.5 px-3"
              type="email"
              placeholder="Email"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              onChange={(e) => {
                setpassword(e.target.value);
              }}
              className="w-full border mt-1 bg-indigo-500/5 mb-7 border-gray-500/10 outline-none rounded py-2.5 px-3"
              type="text"
              placeholder="Password"
              required
            />{" "}
          </div>

          {/* <button className="w-full mb-3 bg-indigo-500 hover:bg-indigo-600 transition-all active:scale-95 py-2.5 rounded text-white font-medium">
            Create Account
          </button> */}

          <button
            className="px-8 py-4 bg-red-500 text-white font-bold text-lg uppercase tracking-widest 
                       border-6 border-red-700 shadow-[6px_6px_0px_0px_#dc2626] 
                       hover:shadow-[3px_3px_0px_0px_#dc2626] hover:-translate-x-1 hover:-translate-y-1 
                       active:shadow-[1px_1px_0px_0px_#dc2626] active:translate-x-1 active:translate-y-1 
                       transition-all duration-200"
          >
            Create Account
          </button>

          <p className="text-center mt-4">
            Already have an account?{" "}
            <NavLink className="text-blue-500 underline" to={"/login"}>
              Log In
            </NavLink>
          </p>
        </div>
      </form>
    </>
  );
};

export default Register;
