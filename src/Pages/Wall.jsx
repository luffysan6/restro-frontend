import Button from "./Button";

const Wall = ({ data }) => {
  // console.log(data);
  return (
    <div>
      Wall
      <Button innerText={data} />
    </div>
  );
};

export default Wall;
