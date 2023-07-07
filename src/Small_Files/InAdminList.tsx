import { Link } from "react-router-dom";
import { Context } from "../Context/Context";
import { useContext } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons'

export default function InAdminList(){

    const { blogData, setBlogData } = useContext(Context);

    const deleteArticle = (articleId : number) => {
        const updatedBlogData = blogData.filter((article) => article.id !== articleId);
        setBlogData(updatedBlogData)
    };

    const components = blogData.map((dat) => {
        return <div className="inadminlist--line" key={dat.id}>
            <p style={{width:"20%"}}>{dat.title}</p>
            <p style={{width:"30%"}}>{dat.shortDes}</p>
            <p style={{width:"15%"}}>{dat.author}</p>
            <p style={{width:"15%"}}>{dat.comments}</p>
            <div style={{width:"10%"}}>
                <button><Link to="/editarticle"><FontAwesomeIcon icon={faPen} /></Link></button>
                <button onClick={() => deleteArticle(dat.id)}><FontAwesomeIcon icon={faTrash} /></button>
            </div>
        </div>
    })

    return(
        <div className="inadminlist--container">
            <div className="inadminlist--smallbox">
                <h1 style={{fontSize: "40px"}}>My articles</h1>
                <Link to="/newarticle"><button>Create new article</button></Link>
            </div>
            <div className="inadminlist--line bigline">
                <p style={{width:"20%"}}>Article title</p>
                <p style={{width:"35%"}}>Perex</p>
                <p style={{width:"20%"}}>Author</p>
                <p style={{width:"15%"}}># of comments</p>
                <p style={{width:"10%"}}>Actions</p>
            </div>
            {components}
        </div>
    );
}