import { format } from 'date-fns';
import { Link } from 'react-router-dom';

const PostCard = (props) => {
  const dateUpdated = format(props.dateUpdated, 'PP');

  return (
    <div className="post-card" key={props.id}>
      <Link to={props.id}>
        <img className="card-image" src={props.image} alt="" />
      </Link>
      <div className="card-info">
        <h2 className="card-title">{props.title}</h2>
        <p className="updated-label">Written by:</p>
        <p className="date">{props.author}</p>
        <p className="updated-label">Posted on:</p>
        <p className="date">{dateUpdated}</p>
      </div>
    </div>
  );
};

export default PostCard;
