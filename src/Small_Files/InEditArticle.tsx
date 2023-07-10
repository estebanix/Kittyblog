import { useState, useContext, useRef } from "react";
import { Context } from "../Context/Context";

export default function InEditArticle() {
  const { currentBlogData, setCurrentBlogData, blogData, setBlogData } = useContext(
    Context
  );
  const [title, setTitle] = useState(currentBlogData.title);
  const [image, setImage] = useState(currentBlogData.img);
  const [content, setContent] = useState(currentBlogData.shortDes);

  const fileInputRef = useRef(null);

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

  const handleUploadNew = () => {
    fileInputRef.current.value = null;
    fileInputRef.current.click();
  };

  const handleDeleteImage = () => {
    setImage("");
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
      <div className="inadminlist--smallbox smallbox--edirarticle">
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
        {image ? (
          <>
            <img
              src={image}
              alt="Selected"
              style={{ height: "74px", margin: "auto" }}
            />
            <div style={{display:"flex", justifyContent:"space-between", width:"200px"}}>
                <button style={{backgroundColor:"transparent", color:"blue"}} onClick={handleUploadNew}>Upload a new</button>
                <button style={{backgroundColor:"transparent", color:"red"}}  onClick={handleDeleteImage}>Delete</button>
            </div>
          </>
        ) : (
          <>
            <input
              ref={fileInputRef}
              type="file"
              style={{ display: "none" }}
              onChange={handleImageChange}
            />
            <button onClick={handleUploadNew}>Upload an Image</button>
          </>
        )}
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
