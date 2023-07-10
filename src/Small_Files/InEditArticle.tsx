import { useState, useContext } from "react";
import { Context } from "../Context/Context";

export default function InEditArticle() {
  const { currentBlogData, setCurrentBlogData, blogData, setBlogData } = useContext(Context);
  const [title, setTitle] = useState(currentBlogData.title);
  const [image, setImage] = useState(currentBlogData.img);
  const [content, setContent] = useState(currentBlogData.shortDes);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handlePublish = () => {
    const updatedBlogData = {
      ...currentBlogData,
      title: title,
      img: image,
      shortDes: content,
    };
    setCurrentBlogData(updatedBlogData);

    const updatedBlogDataArray = blogData.map((blog) => {
      if (blog.id === currentBlogData.id) {
        return updatedBlogData;
      }
      return blog;
    });
    setBlogData(updatedBlogDataArray);

    console.log("Published article:", updatedBlogData);
  };

  return (
    <div className="inadminlist--container">
      <div className="inadminlist--smallbox smallbox--newarticle">
        <h1 style={{ fontSize: "40px" }}>Edit article</h1>
        <button onClick={handlePublish}>Publish Article</button>
      </div>
      <div className="inarticel--inputbox">
        <p style={{ fontSize: "16px" }}>Article Title</p>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={handleTitleChange}
        />
      </div>
      <div className="inarticel--imageup">
        <p style={{ fontSize: "16px" }}>Featured Image</p>
        <img
          src={image}
          alt="Selected"
          style={{ height: "74px", margin: "auto" }}
        />
        <input
          type="file"
          style={{ display: "none" }}
          onChange={handleImageChange}
        />
        <button onClick={() => document.querySelector('input[type="file"]').click()}>
          Upload an Image
        </button>
      </div>
      <div className="inarticle--content">
        <p style={{ fontSize: "16px" }}>Content</p>
        <textarea
          placeholder="Content"
          value={content}
          onChange={handleContentChange}
        />
      </div>
    </div>
  );
}
