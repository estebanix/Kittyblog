import './App.css'
import ContextProvider from './Context/Context';
import { Routes, Route } from 'react-router-dom';
import ArticleList from './Big_Files/ArticleList.tsx';
import ArticleDetail from './Big_Files/ArticleDetail.tsx';
import Login from './Big_Files/Login.tsx';
import AdminList from './Big_Files/AdminList.tsx';
import NewArticle from './Big_Files/NewArticle.tsx';
import EditArticle from './Big_Files/EditArticle.tsx';


function App() {
  return (
    <main>
      <ContextProvider>
        <Routes>
            <Route path="/" element={<ArticleList />} />
            <Route path="/:id" element={<ArticleDetail />} />
            <Route path="/login" element={<Login />} />
            <Route path="/adminlist" element={<AdminList />} />
            <Route path='/newarticle' element={<NewArticle />} />
            <Route path='/editarticle' element={<EditArticle />} />
        </Routes>
      </ContextProvider>
    </main>
  )
}

export default App
