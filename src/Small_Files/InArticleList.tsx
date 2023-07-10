import { Context } from "../Context/Context";
import { useContext } from "react";
import { Link } from "react-router-dom";
import ReactMarkdown from 'react-markdown';

interface BlogData {
  id: number;
  img: string;
  title: string;
  author: string;
  date: string;
  shortDes: string;
  comments: string;
}

export default function InArticleList() {
  const { blogData, setCurrentBlogData } = useContext(Context);

  const handleData = (dat: BlogData) => {
    setCurrentBlogData(dat);
  };

  const components = blogData.map((dat: BlogData) => {
    return (
      <div className="inarticlelist--box" key={dat.id}>
        <img src={dat.img} />
        <div className="inarticlelist--minicontainer">
          <h4>{dat.title}</h4>
          <div className="inarticlelist--minibox">
            <p>{dat.author}</p>
            <p>{dat.date}</p>
          </div>
          <ReactMarkdown className="markdown--para">
          {dat.shortDes}
        </ReactMarkdown>
          <div className="inarticlelist--minibox">
            <Link to={`/${dat.id}`} onClick={() => handleData(dat)}>
              <button>Read whole article</button>
            </Link>
            <p>{dat.comments.length} comments</p>
          </div>
        </div>
      </div>
    );
  });

  return (
    <main className="inarticle--container">
      <h3>Recent articles</h3>
      {components}
    </main>
  );
}
