import NavbarComp from "../Components/Navbar";
import LoginComp from "../Components/Login";

const Login = () => {
  return (
    <>
      <NavbarComp />

      <div className="flex flex-wrap justify-center content-center h-screen">
        <div className="h-min">
          <LoginComp />
        </div>
      </div>
    </>
  );
};

export default Login;
