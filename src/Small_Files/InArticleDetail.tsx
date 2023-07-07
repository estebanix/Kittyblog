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

    const { id, title, author, date, img } = useContext(Context).currentBlogData;
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
                <div className="inarticledetail--imgbox" style={{backgroundImage: `url(${`./Images/${img}`})`}}></div>
            </div>
            <div className="inarticledetail--smallbox">
                <h2 style={{fontSize: "24px"}}>Related articles</h2>
                {components}
            </div>
        </main>
    );
}