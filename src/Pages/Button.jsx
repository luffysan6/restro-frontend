import { useContext } from "react";
import { AuthContext } from "../store/AuthContext";
import authStore from "../store/authStore";

const Button = () => {
  let { user, setuser } = useContext(AuthContext);
  let { count, setcount, getcount } = authStore();
  // console.log(user);

  return (
    <div>
      <h1>Count is {count}</h1>
      {/* <button
        style={{ border: "2px solid black" }}
        onClick={() => setuser(user++)}
      >
        {user}
      </button> */}

      <button onClick={() => setcount()}>Increase </button>
      <br />
      <button onClick={() => getcount()}>Get Count</button>
    </div>
  );
};

export default Button;
