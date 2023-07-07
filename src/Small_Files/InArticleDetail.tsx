import { Context } from "../Context/Context";
import { useContext } from "react";
import { Link } from "react-router-dom";

interface BlogData {
    id: number;
    img: string;
    title: string;
    author: string;
    date: string;
    shortDes: string;
    comments: number;
  }

export default function InArticleDetail(){

    const { id, title, author, date, img, shortDes, comments } = useContext(Context).currentBlogData;
    const {blogData, setCurrentBlogData} = useContext(Context);

    const relatedArticles = blogData.filter((article) => {
        return article.id !== id;
      });
      
    
    const components = relatedArticles.map((dat) => {
        return <div key={dat.id}>
            <Link to={`/${dat.id}`} onClick={() => handleData(dat)}><p>{dat.title}</p></Link>
        </div>
    })

    const handleData = (dat: BlogData) => {
        setCurrentBlogData(dat);
      };

    return(
        <main className="inarticle--container detail">
            <div className="inarticledetail--bigbox">
                <h1 style={{fontSize:"40px"}}>{title}</h1>
                <div style={{margin: "20px 0", color: "#6C757D", fontSize:"14px"}} className="inarticlelist--minibox">
                    <p>{author}</p>
                    <p>{date}</p>
                </div>
                <div className="inarticledetail--imgbox" style={{backgroundImage: `url(${img})`, marginBottom: "30px"}}></div>
                <p className="markdown--para">{shortDes}</p>
                <p className="markdown--para">{shortDes}</p>
                <p className="markdown--para">{shortDes}</p>
                <div className="comments--container">
                <h2>Comments({comments.length})</h2>    
                {comments.map((comment) => (
                    <div key={comment.id}>
                    <p>{comment.username}</p>
                    <p>{comment.comment}</p>
                    </div>
                ))}
                </div>
            </div>
            <div className="inarticledetail--smallbox">
                <h2 style={{fontSize: "24px"}}>Related articles</h2>
                {components}
            </div>
        </main>
    );
}