import { Link } from "react-router-dom";
import { useContext, useEffect, useRef } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretUp, faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { Context } from "../Context/Context";

export default function Nav() {
  const {
    isRecent,
    setIsRecent,
    loggedIn,
    setLoggedIn,
    adminData,
    toogleDown,
    setToogleDown
  } = useContext(Context);

  const handleToogle = () => {
    setToogleDown((old: boolean) => !old);
  };

  const handleLogout = () => {
    setLoggedIn(false);
    setIsRecent(true);
  }

  const navRef = useRef<HTMLNavElement>(null);
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setToogleDown(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [setToogleDown]);



  return (
    <nav className="nav--container" ref={navRef}>
      {loggedIn ? (
        <ul>
          <img src="./Images/nav_logo.png" alt="Logo" />
          <li onClick={() => setIsRecent(true)} style={isRecent ? { color: "black" } : {}}>
            <Link to="/">Recent Articles</Link>
          </li>
          <li>About</li>
          <li onClick={() => setIsRecent(false)} style={!isRecent ? { color: "black", marginLeft: "auto" } : { marginLeft: "auto" }}>
            <Link to="/adminlist">My articles</Link>
          </li>
          <li style={{ marginLeft: "20px", color: "blue" }}>
            <Link to="/newarticle">Create Article</Link>
          </li>
          <div className="header--box">
            <button onClick={handleToogle}>
              <FontAwesomeIcon icon={toogleDown ? faCaretUp : faCaretDown} />
            </button>
            <img
              style={{ width: "32px", height: "32px", borderRadius: "50%" }}
              src={adminData[0].profilePicture}
              alt="Profile"
            />
            {toogleDown && (
              <div className="logout--box">
                <button onClick={handleLogout}><Link to="/">Log out</Link></button>
              </div>
            )}
          </div>
        </ul>
      ) : (
        <ul>
          <img src="./Images/nav_logo.png" alt="Logo" />
          <li onClick={() => setIsRecent(true)} style={isRecent ? { color: "black" } : {}}>
            <Link to="/">Recent Articles</Link>
          </li>
          <li>About</li>
          <li style={{ marginLeft: "auto", color: "blue" }}>
            <Link to="/login">Log in →</Link>
          </li>
        </ul>
      )}
    </nav>
  );
}
