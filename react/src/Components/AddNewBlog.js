import React, { useState } from "react";
import Texteditor from "./Texteditor";
import "../CSS/AddNewBlog.css";
export default function AddNewBlog(props) {
  const [blog, setBlog] = useState({ title : props.blog ? props.blog.title : "",
  headerimglink:  props.blog ? props.blog.headerimglink : "https://drive.google.com/uc?export=view&id=1iXQOpP9izqsez2N6RZjR_Kod4r4f1wwV",
  category: props.blog ? props.blog.category : "",
  content:  props.blog ? props.blog.content : "",
  blogid:  props.blog ? props.blog._id : "",
  description : props.blog ? props.blog.description : ""
});

const[message, setMessage] = useState({
  message : "",
  visible : false
})

  async function Save(blogcontent) {
   console.log(blogcontent);
    let blogId = blog.blogid === "" ? "notdefine" : blog.blogid;
    console.log("blogId " + blogId);
    const response = await fetch("http://localhost:8080/blogs/add", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({ ...blogcontent, token: localStorage.getItem('jwt'), blogid: blogId }),
    });
    response.json().then((data) => {
      setBlog({...blog,blogid : data._id});
      setMessage({
        message : "Blog Saved",
        visible : true
   });
    }).catch(e => {
      setMessage({
           message : "Some Thing Went Wrong",
           visible : true
      });
    })
  }
  function closeToast()
  {
      setMessage({message : "", visible : false});
  }
  return (<>
    <div className="TextEditorWrapper">
      <Texteditor SaveBlog={Save} blog={blog} />
    </div>
    
<div className="position-fixed bottom-0 end-0 p-3" >
  <div id="liveToast" className={message.visible ? "toast show" : "toast hide"} role="alert" aria-live="assertive" aria-atomic="true">
    <div className="toast-header">
      
      <strong className="me-auto"> {message.visible && message.message}</strong>
      
      <button type="button" className="btn-close" data-bs-dismiss="toast" aria-label="Close" onClick={closeToast}></button>
    </div>
    
  </div>
</div>
  </>);
} 