import { Link } from "react-router-dom";

const BlogList = ({ blogs, title, body, author }) => {
  return (
    <div className='blog-list'>
      <h2>{title}</h2>
      <p>{body}</p>
      <p>{author}</p>
      {blogs.map((blog) => (
        <div className='blog-preview' key={blog.id}>
          <Link to={`/blogs/${blog.id}`}>
            <h2> {blog.title} </h2>
            <p> {blog.body} </p>
            <p> {blog.author} </p>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default BlogList;
