import { Context } from "../Context/Context";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons'

interface BlogData {
    id: number;
    img: string;
    title: string;
    author: string;
    date: string;
    shortDes: string;
    comments: CommentData[];
  }
  
  interface CommentData {
    id: number;
    img: string;
    username: string;
    time: string;
    comment: string;
    likes: number;
  }

  interface newComment {
    id: number;
    img: string;
    title: string;
    shortDes: string;
    comments: {
      id: number;
      username: string;
      comment: string;
    }[];
  }

export default function InArticleDetail() {
  const { id, title, author, date, img, shortDes, comments } = useContext(Context).currentBlogData;
  const { blogData, setCurrentBlogData, loggedIn, adminData } = useContext(Context);

  const [likes, setLikes] = useState(comments.map((comment: CommentData) => comment.likes));
  const [newComment, setNewComment] = useState("");

  const relatedArticles = blogData.filter((article) => {
    return article.id !== id;
  });

  const components = relatedArticles.map((dat) => {
    return (
      <div key={dat.id}>
        <Link to={`/${dat.id}`} onClick={() => handleData(dat)}>
          <div className="related--article-box">
            <h5>{dat.title}</h5>
            <p>{dat.shortDes}</p>
          </div>
        </Link>
      </div>
    );
  });

  const handleData = (dat: BlogData) => {
    setCurrentBlogData(dat);
  };

  const handleIncreaseLikes = (index: number) => {
    const updatedLikes = [...likes];
    updatedLikes[index] += 1;
    setLikes(updatedLikes);
  };
  
  const handleDecreaseLikes = (index: number) => {
    const updatedLikes = [...likes];
    if (updatedLikes[index] > 0) {
      updatedLikes[index] -= 1;
      setLikes(updatedLikes);
    }
  };

  const handleComment = (e) => {
        setNewComment(e.target.value)
  }

  const handlePublicComm = () => {
    const newCom = {
        id: Date.now(),
        img: adminData[0].profilePicture,
        username: adminData[0].username,
        comment: newComment,
        time: "Now",
        likes: 0
    }
    setLikes([0, ...likes]);
    setCurrentBlogData((prevData) => ({
      ...prevData,
      comments: [newCom ,...prevData.comments]
    }));
    setNewComment("")
  }

  return (
    <main className="inarticle--container detail">
      <div className="inarticledetail--bigbox">
        <h1 style={{ fontSize: "40px" }}>{title}</h1>
        <div style={{ margin: "20px 0", color: "#6C757D", fontSize: "14px" }} className="inarticlelist--minibox">
          <p>{author}</p>
          <p>{date}</p>
        </div>
        <div className="inarticledetail--imgbox" style={{ backgroundImage: `url(${img})`, marginBottom: "30px" }}></div>
        <p className="markdown--para">{shortDes}</p>
        <p className="markdown--para">{shortDes}</p>
        <p className="markdown--para">{shortDes}</p>
        <div className="comments--container">
          <h2 style={{ marginBottom: "20px" }}>Comments({comments.length})</h2>
          {loggedIn && 
            <div className="comment--minibox">
                <img style={{ width: "50px", height: "50px", borderRadius: "50%" }} src={adminData[0].profilePicture} />
                <input onChange={handleComment} type="text" placeholder="Join the discussion" value={newComment} />
                <button onClick={handlePublicComm}>try</button>
            </div>
          }
          {comments.map((comment: CommentData, index: number) => (
            <div className="comment--minibox" key={comment.id}>
              <img style={{ width: "50px", height: "50px", borderRadius: "50%" }} src={comment.img} />
              <div className="comment--miniright">
                <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
                  <p style={{ fontSize: "16px", fontWeight: "600" }}>{comment.username}</p>
                  <p style={{ fontSize: "14px", fontWeight: "200", color: "#6C757D" }}>{comment.time}</p>
                </div>
                <p>{comment.comment}</p>
                <div style={{ display: "flex", alignItems: "center" }}>
                <p>{likes[index] > 0 ? `+${likes[index]}` : '0'}</p>
                  <span style={{ margin: "0 5px", color: "#6C757D" }}>|</span>
                  <button className="comment--btn" onClick={() => handleIncreaseLikes(index)}>
                    <FontAwesomeIcon icon={faChevronUp} />
                  </button>
                  <span style={{ margin: "0 5px", color: "#6C757D" }}>|</span>
                  <button className="comment--btn" onClick={() => handleDecreaseLikes(index)}>
                    <FontAwesomeIcon icon={faChevronDown} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="inarticledetail--smallbox">
        <h2 style={{ fontSize: "24px", marginBottom: "35px" }}>Related articles</h2>
        {components}
      </div>
    </main>
  );
}

