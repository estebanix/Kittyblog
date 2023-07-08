import  {createContext, useState} from "react";
import BlogDatas from "../Datas/articles.json";
import AdminDatas from "../Datas/admin.json";

export interface ContextType {
    blogData: any[];
    setBlogData: (data: any) => void;
    currentBlogData: any;
    setCurrentBlogData: (data: any) => void;
    isRecent: boolean;
    loggedIn: boolean;
    setLoggedIn: (data: boolean) => void;
    adminData: any[];
  }
  
  export const Context = createContext<ContextType>({} as ContextType);
  

const ContextProvider = (props) => {
    
    const [blogData, setBlogData] = useState(BlogDatas);
    const [adminData, setAdminData] = useState(AdminDatas)
    const [currentBlogData, setCurrentBlogData] = useState({});
    const [isRecent, setIsRecent] = useState(true);
    const [loggedIn, setLoggedIn] = useState(false);

    return(
        <Context.Provider value={{
            blogData,
            setBlogData,
            currentBlogData,
            setCurrentBlogData,
            isRecent,
            loggedIn,
            setLoggedIn,
            adminData
            }}>
            {props.children}
        </Context.Provider>
    );
}

export default ContextProvider;