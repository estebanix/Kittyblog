import { Link } from "react-router-dom";
import { Context } from "../Context/Context";
import { useContext } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretDown } from '@fortawesome/free-solid-svg-icons'

export default function Nav(){
    const {
        isRecent,
        loggedIn,
        adminData
      } = useContext(Context);

  
    return(
        <nav className="nav--container">
            {loggedIn ? <ul>
                <img src="./Images/nav_logo.png" />
                <li style={isRecent ? {color: "black"} : {}}><Link to="/">Recent Articles</Link></li>
                <li>About</li>
                <li style={{marginLeft: "auto"}}><Link to="/adminlist">My articles</Link></li>
                <li style={{marginLeft: "20px", color:"blue"}}><Link to="/newarticle">Create Article</Link></li>
                <div className="header--box">
                    <button><FontAwesomeIcon icon={faCaretDown} /></button>
                    <img style={{ width: "32px", height: "32px", borderRadius: "50%" }} src={adminData[0].profilePicture} />
                </div>
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