import { useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import Comments from './Comments';
import { PostContext } from './PostContext';
import { format } from 'date-fns';

const PostDetail = () => {
  const { postId } = useParams();
  const { posts } = useContext(PostContext);
  const [postDetails, setPostDetails] = useState(() => {
    const data = JSON.parse(localStorage.getItem('postDetails'));
    if (data) {
      if (data._id === postId) {
        return data;
      } else {
        localStorage.removeItem('postDetails');
      }
    }
    const post = posts.find((post) => {
      if (post._id === postId) {
        localStorage.setItem('postDetails', JSON.stringify(post));
        return post;
      }
    });
    return post;
  });

  return (
    <div className="post-layout">
      <div className="post-info">
        <p className="post-info-label">Written by:</p>
        <p className="post-info-value">{`${postDetails.author.firstName} ${postDetails.author.lastName}`}</p>
        <p className="post-info-label">Posted on:</p>
        <p className="post-info-value">
          {format(postDetails.dateUpdated, 'PP')}
        </p>
      </div>
      <div className="post-contents">
        <img className="post-image" src={postDetails.image} alt="hello" />
        <h1 className="post-title">{postDetails.title}</h1>
        <main
          className="post-body"
          dangerouslySetInnerHTML={{ __html: postDetails.body }}
        ></main>
      </div>
      <Comments
        postDetails={postDetails}
        setPostDetails={setPostDetails}
        postId={postId}
      />
    </div>
  );
};

export default PostDetail;
