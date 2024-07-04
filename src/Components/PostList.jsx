import { useEffect, useContext } from 'react';
import '../styles/form.css';
import '../styles/post.css';
import PostCard from './PostCard';
import List from './List';
import Button from './Button';
import { PostContext } from './PostContext';

const PostList = () => {
  const { posts, filteredPosts, setFilteredPosts, activeCategory } =
    useContext(PostContext);

  useEffect(() => {
    if (activeCategory !== 'All') {
      setFilteredPosts(
        posts.filter((post) => {
          if (post.mythos === activeCategory) {
            return post;
          }
        }),
      );
    } else {
      setFilteredPosts(posts);
    }
  }, [activeCategory, posts]);

  return (
    <>
      <h1 className="header">{`${activeCategory} Mythology`}</h1>
      <div className="post-card-container">
        <div className="post-card-layout">
          {filteredPosts.map((post) => {
            return (
              <PostCard
                key={post._id}
                id={post._id}
                image={post.image}
                title={post.title}
                author={`${post.author.firstName} ${post.author.lastName}`}
                dateUpdated={post.dateUpdated}
                dateCreated={post.dateCreated}
                active={!post.draft}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};

export default PostList;
