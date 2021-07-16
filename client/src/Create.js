import { useState } from "react";
import { useHistory } from "react-router-dom";

const Create = () => {
  const PORT = process.env.PORT;
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [author, setAuthor] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    const blog = { title, body, author };
    // console.log(blog);

    /* POST Request 
    --------------------------*/
    setIsLoading(true);
    fetch(`http://localhost:${PORT} + /blogs`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(blog),
    }).then(() => {
      console.log("new blog added");
      setIsLoading(false);
      // history.go()
      history.push("/");
    });
  };

  return (
    <div className='create'>
      <h2>Add new blog</h2>
      <p>React Links - Controlled Input(forms)</p>
      <form onSubmit={handleSubmit}>
        <label>Blog Title</label>
        <input
          type='text'
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label>Blog content</label>
        <textarea
          required
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />
        <label>Blog author:</label>
        <select value={author} onChange={(e) => setAuthor(e.target.value)}>
          <option value='admin'>admin</option>
          <option value='guest'>guest</option>
        </select>

        {!isLoading && <button>Add blog</button>}
        {isLoading && <button disabled>Adding blog...</button>}

        <h2>blog view:</h2>
        <h4>{title}</h4>
        <p>{body}</p>
        <p> {author}</p>
      </form>
    </div>
  );
};

export default Create;
