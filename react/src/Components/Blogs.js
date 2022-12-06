import React, { useEffect, useState } from "react";
import "../CSS/blogs.css";
export default function Blogs(props){
     
    const[blogs,setBlogs] = useState([]);
    const[message, setMessage] = useState({
      message : "",
      visible : false
  })
    let offset = 0; 
    let allow = true;
    async function LoadMoreBlogs()
    {
      
       if(allow){
         allow = false;
         
      const response = await fetch("http://localhost:8080/blogs/GetBlogs", {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
  
        body: JSON.stringify({
          offset : offset,
          blogs : 3 ,
           token : localStorage.getItem("jwt")
            }),
      });
      response.json().then((data) => {
        
        if (data.errors != null) {
            
        } else {
          if(data.blogs.length !== 0){
          setBlogs(oldBlogs=> {
          
            return [...oldBlogs,...data.blogs];
          })
          offset = data.offset;
          console.log(offset);
        
          
        }
        else{
            
            setMessage({
              message : "All Blog Loaded",
              visible : true
         });
        }
        
        
        }
      }).catch(e => {
        setMessage({
             message : "Some Thing Went Wrong",
             visible : true
        });
      })
      allow = true;
    }
    }
    useEffect(()=>{
    
    
      LoadMoreBlogs();
      
      window.addEventListener("scroll",(e)=>{
         
         if(window.innerHeight + e.target.documentElement.scrollTop+1   >=  e.target.documentElement.scrollHeight )
         { 
            LoadMoreBlogs();
         }
      });
    }
      ,[]);
   async function handledelete(id)
    {
       setBlogs(oldBlogs => {
             let newblogs = [];
             let n = oldBlogs.length;
             for(let i=0;i<n;i++)
             {
                 if(oldBlogs[i]._id !== id)
                 {
                   newblogs.push(oldBlogs[i]);
                 }
             }
             return newblogs;
             
       })
       const response = await fetch("http://localhost:8080/blogs/delete", {
        method: "DELETE",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
  
        body: JSON.stringify({token: localStorage.getItem('jwt'), blogid:id }),
      });
      response.json().then((data) => {
        setMessage({
          message : "Blog Deleted",
          visible : true
     });
      }).catch(e => {
        setMessage({
             message : "Some Thing Went Wrong",
             visible : true
        });
      })
       
    }
    function handleUpdate(blog)
    {
     props.setComponent({name : "update", blog : blog});
    }
    const Blogs = blogs.map(blog => {
      if(blog ){
      return ( <div className="card mb-3 blog--card" >
      <div className="row g-0">
        <div className="col-md-4 headerimage">
          <img src={blog.headerimglink} className="img-fluid rounded-start" alt="..." />
        </div>
        <div className="col-md-8">
          <div className="card-body">
            <h5 className="card-title">{blog.title}</h5>
            <p className="card-text">{blog.description}</p>
            <p className="card-text"><small className="text-muted">last updated {new Date(blog.date).toDateString()}</small></p>
         
        <div className="row">
        <div className="col-md-6">
              <i className="fa-solid fa-eye "></i>&nbsp; {blog.Views} | &nbsp;
              <i className="fa-regular fa-comment"></i>&nbsp; {blog.comments.length -1} | &nbsp;
              <i className="fa-regular fa-thumbs-up" ></i>&nbsp; {blog.likes} |&nbsp;
              <i className="fa-solid fa-info"></i>&nbsp; {blog.issues.length -1}
              </div>
              <div className="col button--ud">
              <button onClick={()=> props.setComponent({
                name:"blogViewUser", blog : blog
              })}>Read</button>
            </div>
            <dic className="col button--ud">
              <button onClick={()=> handleUpdate(blog)}>Update</button>
            </dic>
            <dic className="col button--ud">
              <button onClick={()=> handledelete(blog._id)}>Delete</button>
            </dic>
          </div>
          </div>
        </div>
      </div>
    </div>
  );}
    });
    function closeToast()
    {
        setMessage({message : "", visible : false});
    }
    return (
    <>
    
    <div className="Container--main">
    <div className="Container--blogs">
    {Blogs}
    </div>
    </div>
  {/* <div className="card mb-3"  >
    <div className="row g-0">
      <div className="col-md-4 headerimage">
        <img src="https://www.shutterstock.com/image-photo/mountains-under-mist-morning-amazing-600w-1725825019.jpg" className="img-fluid rounded-start" alt="..." />
      </div>
      <div className="col-md-8">
        <div className="card-body">
          <h5 className="card-title">Card title</h5>
          <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
         
          <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>
        
        </div>
      </div>
    </div>
  </div> */}
  
  
<div className="position-fixed bottom-0 end-0 p-3" >
  <div id="liveToast" className={message.visible ? "toast show" : "toast hide"} role="alert" aria-live="assertive" aria-atomic="true">
    <div className="toast-header">
      
      <strong className="me-auto"> {message.visible && message.message}</strong>
      
      <button type="button" className="btn-close" data-bs-dismiss="toast" aria-label="Close" onClick={closeToast}></button>
    </div>
    
  </div>
</div>
  </>
  );
}