import { Link } from "react-router-dom";
import { Context } from "../Context/Context";
import { useContext } from "react";

export default function Nav(){
    const {
        isRecent,
        loggedIn
      } = useContext(Context);

    return(
        <nav className="nav--container">
            {loggedIn ? <ul>
                <img src="./Images/nav_logo.png" />
                <li style={isRecent ? {color: "black"} : {}}><Link to="/">Recent Articles</Link></li>
                <li>About</li>
                <li style={{marginLeft: "auto"}}><Link to="/adminlist">My articles</Link></li>
                <li style={{marginLeft: "20px", color:"blue"}}><Link to="/newarticle">Create Article</Link></li>
            </ul> :
            <ul>
                <img src="./Images/nav_logo.png" />
                <li style={isRecent ? {color: "black"} : {}}><Link to="/">Recent Articles</Link></li>
                <li>About</li>
                <li style={{marginLeft: "auto", color: "blue"}}><Link to="/login">Log in →</Link></li>
            </ul>}
        </nav>
    );
}