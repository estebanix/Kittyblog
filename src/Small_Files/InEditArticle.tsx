

export default function InEditArticle(){
    return(
        <div className="inadminlist--container">
            <div className="inadminlist--smallbox smallbox--newarticle">
                <h1 style={{ fontSize: '40px' }}>Edit article</h1>
                <button>Publish Article</button>
            </div>
            <div className="inarticel--inputbox">
                <p style={{ fontSize: '16px' }}>Article Title</p>
                <input type="text" placeholder="Title" />
            </div>
            <div className="inarticel--imageup">
                <p style={{ fontSize: '16px' }}>Featured Image</p>
                <img
                    src={"a"}
                    alt="Selected"
                    style={{ height: '74px', margin: 'auto' }}
                />
                <input
                type="file"
                style={{ display: 'none' }}
                />
                <button>Upload an Image</button>
            </div>
            <div className="inarticle--content">
                <p style={{ fontSize: '16px' }}>Content</p>
                <textarea placeholder="Content" />
            </div>
        </div>
    );
}