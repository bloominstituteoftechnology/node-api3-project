import React, { useState, useEffect } from 'react';
import PostCards from './PostCards';

export default function DisplayPosts({ posts, setPosts }) {
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
