import React, {useState,useEffect} from "react";
import parse from 'html-react-parser';


export default function BlogView(props)
{  
    const[blog,setBlog] = useState(props.blog);
    const[message, setMessage] = useState({
        message : "",
        visible : false
    })
    const[formdata,setFormdata] = useState({
        name:"",
        issue:""
    })
    const[formdata1,setFormdata1] = useState({
        name:"",
        comment:""
    })
    const[liked,setLike] = useState(false);
    function handleformdata(e)
    {
        setFormdata(old => {
            return {
                ...old,
                [e.target.name] : e.target.value
            }
        })
        console.log(formdata);
    }
    function handleformdata1(e)
    {
        setFormdata1(old => {
            return {
                ...old,
                [e.target.name] : e.target.value
            }
        })
        console.log(formdata1);
    }
    function handleLike()
    {
        if(liked)
        {
            addLike(-1);
        }
        else{
            addLike(1);
        }
        setLike(old => !old);
    }
    async function addLike(count)
    {
        const response = await fetch("http://localhost:8080/blogs/addLike", {
            method: "POST",
            mode: "cors",
            headers: {
              "Content-Type": "application/json",
            },
            body :JSON.stringify({
                blogid : blog._id,
                count : count
            }),
            
          });
          response.json().then((data) => {
               let mes = "";
               if(liked)
               {
                mes = "Like is Removed";
               }
               else{
                mes = "Lke is Added";
               }
               setMessage({
                message : mes,
                visible : true
           });
              setBlog(old => {
                return {
                    ...old,
                    likes : liked ? old.likes-1 : old.likes+1
                }
              })
                
          }).catch(e => {
            
            setMessage({
                 message : "Some Thing Went Wrong",
                 visible : true
            });
          })
    }
    async function addComment()
    {
        const response = await fetch("http://localhost:8080/blogs/addComment", {
            method: "POST",
            mode: "cors",
            headers: {
              "Content-Type": "application/json",
            },
            body :JSON.stringify({
                blogid : blog._id,
                comment : formdata1
            }),
            
          });
          response.json().then((data) => {
            
            setMessage({
                message : "Comment Added Successfully.",
                visible : true
           });
          
           setBlog(old =>{
                return {...old, comments : [...old.comments,{...formdata1,date : new Date()}]}
           })
           setFormdata1({name:"",comment:""});
          }).catch(e => {
            
            setMessage({
                 message : "Some Thing Went Wrong",
                 visible : true
            });
          })
    }
    async function addIssue()
    {
        const response = await fetch("http://localhost:8080/blogs/addIssue", {
            method: "POST",
            mode: "cors",
            headers: {
              "Content-Type": "application/json",
            },
            body :JSON.stringify({
                blogid : blog._id,
                issue : formdata
            }),
            
          });
          response.json().then((data) => {
            
            setMessage({
                message : "Issue Sended Successfully.",
                visible : true
           });
          
           setBlog(old =>{
                return {...old, issues : [...old.issues,formdata]}
           })
           setFormdata({name:"",issue:""});
          }).catch(e => {
            
            setMessage({
                 message : "Some Thing Went Wrong",
                 visible : true
            });
          })
    }
    async function addView()
    {
        const response = await fetch("http://localhost:8080/blogs/addView", {
            method: "POST",
            mode: "cors",
            headers: {
              "Content-Type": "application/json",
            },
            body :JSON.stringify({
                blogid : blog._id
            }),
            
          });
          response.json().then((data) => {
            
            
                
          }).catch(e => {
            
            setMessage({
                 message : "Some Thing Went Wrong",
                 visible : true
            });
          })
    }
    useEffect(()=>{
        addView();
       // setBlog(props.blog);
    },[]);
    function closeToast()
    {
        setMessage({message : "", visible : false});
    }
    let comments = blog.comments.map(comment => {
        if(comment.name !== undefined){
        return <> <div className="row">
        <div className="col-md-7"> <h5>{comment.name}</h5></div>
        <div className="col-md-5"> <h6>{new Date(comment.date).toDateString()}</h6></div>
    
    </div>
    <p>{comment.comment}</p>
    <hr/></>; }
      else{
        return <></>;
      }
    });
    return (
        <>
        {blog &&
        <>
        <div className="row" Style="width:70%; margin-left:15%; margin-top:15px; padding-bottom:15px; border-bottom:1px solid black" >
            <div className="col-md-2" Style="display:flex; align-items:center; justify-content:center; ">
                <img width="80" height="80" src={blog.author_img} alt="Not Found" />
            </div>
            <div className="col-md-8" >
                
                <div className="row" >
                    <h3>{blog.author_name}</h3>
                </div>
                
                <div className="row">
                     <p>{blog.author_desc}</p>
                </div>
            </div>
        </div>

        <div className="row" Style="width:70%; margin-left:15%; margin-top:15px; padding-bottom:5px;">
           <h1>{blog.title}</h1>
        </div>
        <div className="row" Style="width:70%; margin-left:15%; margin-top:15px;">
           <h4>{blog.description}</h4>
        </div>
        <div className="row" Style="width:70%; margin-left:15%; margin-top:15px; padding-bottom:5px;" >
            <div className="col-md-12" Style="display:flex; align-items:center; justify-content:center; ">
            <img src={blog.headerimglink} alt="Image Not Found" Style="max-height:500px;" />
        </div>
        </div>
        <div className="row" Style="width:70%; margin-left:15%; margin-top:15px; padding-bottom:5px;">
        <div> { parse(blog.content) } </div>
        </div>
        <center>
        <div className="position-fixed bottom-0 p-3" Style=" left: 50%;
    position: fixed;
    transform: translate(-50%, 0px);" >
      <div id="liveToast" className="toast show" role="alert" aria-live="assertive" aria-atomic="true" Style="box-shadow: 0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22);">
        <div className="toast-header" Style="text-align:center; height:40px;">
         
          <strong className="me-auto" Style="text-align:center;  left: 50%; width:90%; 
    position: fixed;
    transform: translate(-50%, 0px); font-size:17px;">  
              
              <i className="fa-solid fa-eye "></i>&nbsp; {blog.Views} | &nbsp;
              <i className="fa-regular fa-comment" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight"></i>&nbsp; {blog.comments.length -1} | &nbsp;
              <i className="fa-regular fa-thumbs-up" onClick={handleLike}></i>&nbsp; {blog.likes} |&nbsp;
              <i className="fa-solid fa-info" data-bs-toggle="modal" data-bs-target="#exampleModal10"></i>&nbsp; {blog.issues.length -1}
              
            </strong>
            
          
        </div>
        
      </div>
    </div></center>
       </>}

    <div className="position-fixed bottom-0 end-0 p-3" >
  <div id="liveToast" className={message.visible ? "toast show" : "toast hide"} role="alert" aria-live="assertive" aria-atomic="true">
    <div className="toast-header">
      
      <strong className="me-auto"> {message.visible && message.message}</strong>
      
      <button type="button" className="btn-close" data-bs-dismiss="toast" aria-label="Close" onClick={closeToast}></button>
    </div>
    
  </div>
</div>
<div className="modal fade" id="exampleModal10" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog modal-dialog-centered">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">Write Issue</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
      <div className="mb-3">
    <label for="exampleInputEmail1" className="form-label">Name</label>
    <input type="text" className="form-control"  aria-describedby="emailHelp" name="name" onChange={handleformdata} value={formdata.name}  />
   
  </div>
  <div className="mb-3">
    <label for="exampleInputEmail1" className="form-label">About Issue</label>
    <textarea className="form-control" onChange={handleformdata} value={formdata.issue} name="issue"></textarea>
   
  </div>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
        <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={addIssue} >Send</button>
      </div>
    </div>
  </div>
</div>


<div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
  <div class="offcanvas-header">
    <h5 id="offcanvasRightLabel">Comments</h5>
    <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
  </div>
  <div class="offcanvas-body">
  <div className="mb-3">
    <label for="exampleInputEmail1" className="form-label">Name</label>
    <input type="text" className="form-control"  aria-describedby="emailHelp" name="name" onChange={handleformdata1} value={formdata1.name}  />
   
  </div>
  <div className="mb-3">
    <label for="exampleInputEmail1" className="form-label">Comment</label>
    <textarea className="form-control" onChange={handleformdata1} value={formdata1.comment} name="comment"></textarea>
   
  </div>
  <button type="button" className="btn btn-primary" onClick={addComment} >Add</button>
  <div Style="margin-top:15px">
    {comments}
   
  </div>
  </div>
</div>
        </>
    );
    
}