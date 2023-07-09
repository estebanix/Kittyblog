import React, { createContext, useState, useEffect } from 'react';
import BlogDatas from '../Datas/articles.json';
import AdminDatas from '../Datas/admin.json';

export interface ContextType {
  blogData: any[];
  setBlogData: (data: any) => void;
  currentBlogData: any;
  setCurrentBlogData: (data: any) => void;
  isRecent: boolean;
  setIsRecent: (data: any) => void;
  loggedIn: boolean;
  setLoggedIn: (data: boolean) => void;
  adminData: any[];
  toogleDown: boolean;
  setToogleDown: (data: boolean) => void;
}

export const Context = createContext<ContextType>({} as ContextType);

const ContextProvider = (props: any) => {
  const [blogData, setBlogData] = useState(() => {
    const storedBlogData = localStorage.getItem('blogData');
    return storedBlogData ? JSON.parse(storedBlogData) : BlogDatas;
  });
  const [adminData, setAdminData] = useState(AdminDatas);
  const [currentBlogData, setCurrentBlogData] = useState(() => {
    const storedCurrentBlogData = localStorage.getItem('currentBlogData');
    return storedCurrentBlogData ? JSON.parse(storedCurrentBlogData) : {};
  });
  const [isRecent, setIsRecent] = useState(true);
  const [loggedIn, setLoggedIn] = useState(() => {
    const storedLoggedIn = localStorage.getItem('loggedIn');
    return storedLoggedIn ? JSON.parse(storedLoggedIn) : false;
  });
  const [toogleDown, setToogleDown] = useState(false);

  useEffect(() => {
    localStorage.setItem('blogData', JSON.stringify(blogData));
  }, [blogData]);

  useEffect(() => {
    localStorage.setItem('currentBlogData', JSON.stringify(currentBlogData));
  }, [currentBlogData]);

  useEffect(() => {
    localStorage.setItem('loggedIn', JSON.stringify(loggedIn));
  }, [loggedIn]);

  return (
    <Context.Provider
      value={{
        blogData,
        setBlogData,
        currentBlogData,
        setCurrentBlogData,
        isRecent,
        setIsRecent,
        loggedIn,
        setLoggedIn,
        adminData,
        toogleDown,
        setToogleDown,
      }}
    >
      {props.children}
    </Context.Provider>
  );
};

export default ContextProvider;
