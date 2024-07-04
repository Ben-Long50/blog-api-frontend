import { useContext, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import Form from './Form';
import InputField from './InputField';
import { AuthContext } from './AuthContext';
import { format } from 'date-fns';
import '../styles/comment.css';

const Comments = (props) => {
  const [comment, setComment] = useState({
    author: '',
    body: '',
  });
  const { apiUrl } = useContext(AuthContext);

  const getAuthor = () => {
    const token = localStorage.getItem('token');
    const decodedUser = jwtDecode(token);
    return decodedUser.user;
  };

  const handleChange = (e) => {
    setComment({ body: e.target.value, author: getAuthor() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${apiUrl}/${props.postId}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(comment),
      });
      const result = await response.json();
      console.log(result);
      if (response.ok) {
        console.log('Comment submitted successfully');
        const newPostDetails = {
          ...props.postDetails,
          comments: [...props.postDetails.comments, result],
        };
        localStorage.setItem('postDetails', JSON.stringify(newPostDetails));
        props.setPostDetails(newPostDetails);
        setComment({ author: '', body: '' });
      }
    } catch (error) {
      console.error('Error submitting comment:', error);
    }
  };

  return (
    <div className="comment-contents">
      <h2 className="header">Comments</h2>
      <Form method="post" onSubmit={handleSubmit} buttonText="Add Comment">
        {props.postDetails.comments.map((comment, index) => {
          return (
            <>
              <div key={index} className="comment">
                <h4 className="comment-author">{`${comment.author.firstName} ${comment.author.lastName}`}</h4>
                <p className="comment-date">{`${format(comment.date, 'pp')} on ${format(comment.date, 'PP')}`}</p>
                <p className="comment-body">{comment.body}</p>
              </div>
              <hr className="divider" />
            </>
          );
        })}
        <InputField
          label="Comment"
          name="firstName"
          type="text"
          value={comment.body}
          onChange={handleChange}
        />
      </Form>
    </div>
  );
};

export default Comments;
