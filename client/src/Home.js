import { useState, useEffect } from "react";
import BlogList from "./BlogList";
import useFetch from "./useFetch";

const Home = () => {
  const [name, setName] = useState("Stan");
  const [age, setAge] = useState(47);
  const PORT = process.env.PORT;

  const { data: blogs, isLoading, error } = useFetch(`${PORT}`);

  /* RUN EFFECTS HERE:
  -----------------------------------*/
  useEffect(() => {
    console.log("use effect run");
  }, [name]);

  const handleClickName = () => {
    setName("Alexander");
    setAge(2);
  };
  const handleClickAgain = (name) => {
    setName("Bobi");
    setAge(5);
    console.log("hello " + name);
  };

  return (
    <div className='home'>
      {error && <div>{error}</div>}
      {isLoading && <div>loading... dont wait too long</div>}
      <h2>Learn something new everyday...</h2>
      <p>my first React project</p>
      <p className='pTag-func'>
        {name} is {age} years old
      </p>
      <div className='buttons'>
        <button onClick={handleClickName}>My son</button>
        <button onClick={() => handleClickAgain("My Dog")}>My Dog</button>
        <button onClick={() => setName("Stan Tudor") + setAge(48)}>
          Full name:
        </button>
      </div>
      <div className='blog-section'>
        {blogs && <BlogList blogs={blogs} title='Blog:' />}
      </div>
    </div>
  );
};

export default Home;
