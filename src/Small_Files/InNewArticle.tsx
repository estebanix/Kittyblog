import { useState, useRef, useContext } from 'react';
import { Context } from "../Context/Context";

interface newArticle {
    id: number;
    author: string;
    date: string;
    img: string;
    title: string;
    shortDes: string;
    comments: {
      id: number;
      username: string;
      comment: string;
    }[];
  }

export default function InNewArticle() {
  const { blogData, setBlogData, adminData } = useContext(Context);

  const [articleTitle, setArticleTitle] = useState('');
  const [articleImage, setArticleImage] = useState('');
  const [articleDes, setArticleDes] = useState('');
  const fileInputRef = useRef(null);

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleTitle = (e) => {
        setArticleTitle(e.target.value)
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setArticleImage(URL.createObjectURL(file));
  };

  const handleDes = (e) => {
    setArticleDes(e.target.value)
  }


  
  const handlePublish = () => {
    const lastId = blogData.length > 0 ? blogData[blogData.length - 1].id : 0;
    const newArticle: newArticle = {
      id: lastId + 1,
      author: adminData[0].username,
      date: "Now",  
      img: articleImage.replace('./Images/', ''),
      title: articleTitle,
      shortDes: articleDes,
      comments: []
    };
    setBlogData((prevBlogsData: newArticle[]) => [newArticle,...prevBlogsData]);
    setArticleTitle("");
    setArticleImage("");
    setArticleDes("");
  };
  

  return (
    <div className="inadminlist--container">
      <div className="inadminlist--smallbox smallbox--newarticle">
        <h1 style={{ fontSize: '40px' }}>Create new article</h1>
        <button onClick={handlePublish}>Publish Article</button>
      </div>
      <div className="inarticel--inputbox">
        <p style={{ fontSize: '16px' }}>Article Title</p>
        <input type="text" placeholder="Title" onChange={handleTitle} value={articleTitle} />
      </div>
      <div className="inarticel--imageup">
        <p style={{ fontSize: '16px' }}>Featured Image</p>
        {articleImage && (
          <img
            src={articleImage}
            alt="Selected"
            style={{ height: '74px', margin: 'auto' }}
          />
        )}
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: 'none' }}
          onChange={handleImageChange}
        />
        <button onClick={handleButtonClick}>Upload an Image</button>
      </div>
      <div className="inarticle--content">
        <p style={{ fontSize: '16px' }}>Content</p>
        <textarea placeholder="Content" onChange={handleDes} value={articleDes} />
      </div>
    </div>
  );
}
