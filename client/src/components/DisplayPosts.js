import React, { useState, useEffect } from 'react';
import PostCards from './PostCards';

export default function DisplayPosts({ posts, setPosts }) {
	// const [posts, setPosts] = useState([]);

	// useEffect(() => {
	// 	axios
	// 		.get('http://localhost:5000/api/posts')
	// 		.then((res) => {
	// 			console.log(res.data);
	// 			setPosts(res.data);
	// 		})
	// 		.catch((err) => {
	// 			alert(err);
	// 		});
	// }, []);
	return (
		<React.Fragment>
			{posts.map((post) => {
				return (
					<PostCards
						key={post.id}
						userName={post.user_name}
						post={post.text}
						id={post.user_id}
						allPosts
						posts={posts}
						setPosts={setPosts}
					/>
				);
			})}
		</React.Fragment>
	);
}
