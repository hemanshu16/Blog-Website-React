// import logo from './logo.svg';
import React, { useState } from 'react';
import './App.css';
import AddNewBlog from './Components/AddNewBlog';
import Navbar from './Components/Navbar';
import TrandingBlogs from './Components/TrandingSection.js';
import Blogs from './Components/Blogs';
import Profile from './Components/profile';
import BlogView from './Components/BlogView';
import BlogViewCategory from './Components/BlogViewCategory';
import BlogViewUser from './Components/BlogViewUser';
function App() {
  const [login,setLogin] = useState(false);
  const [component,setComponent] = useState({name : ""});
  React.useEffect(()=>{
    const value = localStorage.getItem("islogged");
    if(value !== undefined && value === "1")
    {
      setLogin(true);
    }
  },[]);
  return (
    
    <div>
    
      <>
        <Navbar login={login} setLogin={setLogin} setComponent={setComponent}/>
        {(component.name === "" || component.name=="home" ) &&  <TrandingBlogs setComponent={setComponent}/>}
        {component.name === "category" && <BlogViewCategory  value={component.value} setComponent={setComponent}/>}
        {component.name === "blogView" && <BlogView blog={component.blog} />}
        {component.name === "blogViewUser" && <BlogViewUser blog={component.blog} />}
        {component.name === "addnewblog" && <AddNewBlog />}
        {component.name === "profile" && <Profile />}
        {component.name === "update" && <AddNewBlog blog={component.blog} />}
         {component.name === "bloglist" && <Blogs setComponent={setComponent} />}
      </>
      </div>
  );
}
 
export default App;
