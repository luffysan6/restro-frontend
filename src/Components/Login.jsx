import { useState } from "react";
import authStore from "../store/authStore";
import { NavLink } from "react-router";
import { useNavigate } from "react-router";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");
  const { Login } = authStore();
  const navigate = useNavigate();
  // console.log({ email, password });
  // getAuth({ email, password });
  // debugger();

  const handleLogin = async (e) => {
    e.preventDefault();
    const res = await Login({ email, password });

    if (res.success) {
      navigate("/dashboard");
    }
  };
  return (
    <>
      <form onSubmit={handleLogin} className="contact-form">
        <h3
          style={{
            fontFamily: "'Bebas Neue','sans-serif'",
            fontSize: "2rem",
            letterSpacing: "1px",
          }}
        >
          Sign IN
        </h3>
        <div className="flex flex-col gap-6">
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
              autoComplete="email"
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
              autoComplete="new-password"
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
            Login
          </button>

          <p className="text-center mt-4">
            Don't have an account?{" "}
            <NavLink className="text-blue-500 underline" to={"/register"}>
              Create Account
            </NavLink>
          </p>
        </div>
      </form>
    </>
  );
};

export default Login;
