import {useNavigate} from "react-router-dom"
import './post.scss'; 

const Post = ({ title, image, content,id }) => {
 
    const navigate = useNavigate();
    const handleClick = ()=>{
        navigate(`/post/${id}`);
    }
  return (
    <div className="post" onClick={handleClick}>
      {image && <img src={image} alt={title} className="post-image" />}
      <div className="post-body">
        <h3 className="post-title">{title}</h3>
        <p className="postcontent">{content}</p>
        
      </div>
    </div>
  );
};

export default Post;
