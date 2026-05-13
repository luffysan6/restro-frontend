import NavbarComp from "../Components/Navbar";
import RegisterComp from "../Components/Register";

const Register = () => {
  return (
    <>
      <NavbarComp />

      <div className="flex flex-wrap justify-center content-center h-screen">
        <div className="h-min">
          <RegisterComp />
        </div>
      </div>
    </>
  );
};

export default Register;
