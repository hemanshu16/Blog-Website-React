import React, { useEffect, useState } from "react";

export default function TrandingBlogs(props)
{
    const[blogs,setblogs] = useState([]);
   const[message, setMessage] = useState({
       message : "",
       visible : false
   })
   async function getblogs()
   {
       const response = await fetch("http://localhost:8080/blogs/trandingblogs", {
       method: "GET",
       mode: "cors",
       headers: {
         "Content-Type": "application/json",
       },
 
      
     });
     response.json().then((data) => {
       
        setblogs(old => [...old,...data]);
           
     }).catch(e => {
       setMessage({
            message : "Some Thing Went Wrong",
            visible : true
       });
     })
   }
   useEffect( ()=>{
        
        getblogs();
        
   },[]);
   function closeToast()
   {
       setMessage({message : "", visible : false});
   }
   const Blogs = blogs.map(blog => {
    return (  <div className="row g-0" Style="width:70%; margin-left:15%; border:1px solid black; border:none;  
    border-bottom:0.5px solid black">
      <div className="col-md-4 container--tranding" Style="display: flex;
      align-items: center; ">
        <img src={blog.headerimglink} class="img-fluid rounded-start" alt="..." />
      </div>
      <div className="col-md-8 conatiner--tranding">
        <div className="card-body">
        <div className="row">
                
                <div className="col-12 second">
                    <div className="row secondfirst">
                   
                      <div className="col-10"> <img alt="Entrepreneur's Handbook" className="trandimagecenter  " src={blog.author_img} width="20" height="20" /> 
                      <span Style="margin-left:10px;">{blog.author_name}</span>
                      </div>
                   
                   
                    </div>
                   
                   
                </div>
          <h5 className="card-title " Style="height:30px; overflow:hidden;"> {blog.title}</h5>
          <p className="card-text" Style=" height:78px; overflow:hidden;">{blog.description}</p>
          <p className="card-text"><small class="text-muted">Last updated {new Date(blog.date).toDateString()}</small></p>
         
          <div className="row">
              <div className="col-md-8">
              <i className="fa-solid fa-eye "></i>&nbsp; {blog.Views} | &nbsp;
              <i className="fa-regular fa-comment"></i>&nbsp; {blog.comments.length -1} | &nbsp;
              <i className="fa-regular fa-thumbs-up" ></i>&nbsp; {blog.likes} |&nbsp;
              <i className="fa-solid fa-info"></i> {blog.issues.length -1}
              </div>
              <div className="col button--ud">
              <button onClick={()=>{props.setComponent({name:"blogView", blog : blog});}}>Read More </button>
            </div>
            </div>
        </div>
      </div>
    </div>
  </div>
  );
   })
    return (
        <>
        <section id="Tranding">
        <div className="container-fluid ">
          <div className="row trandingcontainer2"> 
              <div className="custome1 ">
              <img  src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iNzUycHQiIGhlaWdodD0iNzUycHQiIHZlcnNpb249IjEuMSIgdmlld0JveD0iMCAwIDc1MiA3NTIiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiA8ZyBmaWxsPSIjMDA3MzM1Ij4KICA8cGF0aCBkPSJtNDA4LjY4IDM3NC41OCAxMjAuNzYtMTI0LjU1IDE5Ljg5MSAxOC45NDFjNC4yNjE3IDQuMjYxNyAxMC44OTEgNS42ODM2IDE2LjU3NCAzLjMxNjQgNS42ODM2LTEuODk0NSA5LjQ3MjctNy4xMDU1IDEwLjQxOC0xMy4yNjJsMTAuNDE4LTg5LjAzNWMwLjQ3MjY2LTQuNzM0NC0wLjk0NTMxLTkuOTQ1My00LjczNDQtMTMuMjYyLTMuNzg5MS0zLjMxNjQtOC41MjM0LTUuMjEwOS0xMy4yNjItNC4yNjE3bC04OS41MDQgMTMuNzM0Yy02LjE1NjIgMC45NDUzMS0xMC44OTEgNS4yMTA5LTEyLjc4NSAxMC44OTEtMS44OTQ1IDUuNjgzNi0wLjQ3MjY2IDEyLjMxMiA0LjI2MTcgMTYuMTAybDE5Ljg5MSAxOC45NDEtMTAyLjI5IDEwNS42MS01OC4yNTQtNTYuODI4Yy00LjczNDQtNC43MzQ0LTEwLjg5MS03LjEwNTUtMTcuNTIzLTcuNTc4MS03LjU3ODEtMC40NzI2Ni0xNS42MjkgMi4zNjcyLTIxLjMxMiA4LjA1MDhsLTEzMy4wOCAxMzcuMzRjLTkuOTQxNCAxMS4zNjMtOS40NjQ4IDI4LjQxNCAwLjk1MzEyIDM4LjgzMiAyLjgzOTggMi44Mzk4IDYuMTU2MiA0LjczNDQgOS45NDUzIDYuMTU2MiAxLjQyMTkgMC40NzI2NiAzLjMxNjQgMC45NDUzMSA1LjIxMDkgMS40MjE5IDEuNDIxOSAwIDIuODM5OCAwLjQ3MjY2IDQuMjYxNyAwLjQ3MjY2IDcuMTA1NSAwIDEzLjczNC0yLjgzOTggMTguOTQxLTguMDUwOGwxMTQuMTMtMTE4LjM5IDU4LjI1IDU2LjM1NWMxMC44OTUgMTAuNDE4IDI4LjQxNCA5Ljk0NTMgMzguODM2LTAuOTQ1MzF6Ii8+CiAgPHBhdGggZD0ibTI3NC4xOCA0OTguMThoLTgwLjAzNWMtOC41MjM0IDAtMTUuMTU2IDYuNjI4OS0xNS4xNTYgMTUuMTU2djcxLjAzOWMwIDguNTIzNCA2LjYyODkgMTUuMTU2IDE1LjE1NiAxNS4xNTZoODAuMDM1YzguNTIzNCAwIDE1LjE1Ni02LjYyODkgMTUuMTU2LTE1LjE1NnYtNzEuMDM5YzAtOC4wNTA4LTYuNjI4OS0xNS4xNTYtMTUuMTU2LTE1LjE1NnoiLz4KICA8cGF0aCBkPSJtNDI5Ljk5IDQzNC43M2gtODAuMDM1Yy04LjUyMzQgMC0xNS4xNTYgNi42Mjg5LTE1LjE1NiAxNS4xNTZsMC4wMDM5MDYgMTM0LjVjMCA4LjUyMzQgNi42Mjg5IDE1LjE1NiAxNS4xNTYgMTUuMTU2aDgwLjAzNWM4LjUyMzQgMCAxNS4xNTYtNi42Mjg5IDE1LjE1Ni0xNS4xNTZsLTAuMDAzOTA3LTEzNC45N2MwLTguMDUwOC02LjYyODktMTQuNjgtMTUuMTU2LTE0LjY4eiIvPgogIDxwYXRoIGQ9Im01ODUuOCAzNzAuNzloLTgwLjAzNWMtOC41MjM0IDAtMTUuMTU2IDYuNjI4OS0xNS4xNTYgMTUuMTU2bDAuMDAzOTA2IDE5OC40M2MwIDguNTIzNCA2LjYyODkgMTUuMTU2IDE1LjE1NiAxNS4xNTZoODAuMDM1YzguNTIzNCAwIDE1LjE1Ni02LjYyODkgMTUuMTU2LTE1LjE1NmwtMC4wMDM5MDYtMTk4LjQzYzAtOC41MjM0LTYuNjMyOC0xNS4xNTItMTUuMTU2LTE1LjE1MnoiLz4KIDwvZz4KPC9zdmc+Cg==" alt="" width="40" height="40" />
             </div>  <div className="custome2 "><span className="trandingheader"> Tranding On Readable</span>
             </div>
         
        </div>
            <div className="row trandingcontainer">
                {/* <div className="col-12 col-md-4 col-sm-6">
                   <div className="row">
                       <div className="col-3 blognumber">
                             <span >01</span>
                       </div>
                       <div className="col-9 second">
                           <div className="row secondfirst">
                          
                             <div className="col-2 "> <img alt="Entrepreneur's Handbook" className="trandimagecenter  " src="https://miro.medium.com/fit/c/20/20/1*ZpqTjur1EEzN4KzM4e-Bnw.png" width="20" height="20" /> </div>
                            <div className="col-10 "> <span>Arthur Hayes in Entrepreneur's Handbook </span></div>
                          
                           </div>
                           <div className="row">
                           <sapn className="trandseconds"> Max Bidding </sapn>
                           </div>
                           <div className="row">
                            <span className="trandsecondc"> Aug 5 ·39 min read </span>
                           </div>
                       </div>
                   </div>
                </div>
                <div className="col-12 col-md-4 col-sm-6">
                  <div className="row">
                      <div className="col-3 blognumber">
                            <span >02</span>
                      </div>
                      <div className="col-9 second">
                          <div className="row secondfirst">
                         
                            <div className="col-2 "> <img alt="Entrepreneur's Handbook" className="trandimagecenter  " src="https://miro.medium.com/fit/c/20/20/1*ZpqTjur1EEzN4KzM4e-Bnw.png" width="20" height="20" /> </div>
                           <div className="col-10 "> <span>Arthur Hayes in Entrepreneur's Handbook </span></div>
                         
                          </div>
                          <div className="row">
                          <sapn className="trandseconds"> Max Bidding </sapn>
                          </div>
                          <div className="row">
                           <span className="trandsecondc"> Aug 5 ·39 min read </span>
                          </div>
                      </div>
                  </div>
               </div>
               <div className="col-12 col-md-4 col-sm-6">
                <div className="row">
                    <div className="col-3 blognumber">
                          <span >03</span>
                    </div>
                    <div className="col-9 second">
                        <div className="row secondfirst">
                       
                          <div className="col-2 "> <img alt="Entrepreneur's Handbook" className="trandimagecenter  " src="https://miro.medium.com/fit/c/20/20/1*ZpqTjur1EEzN4KzM4e-Bnw.png" width="20" height="20" /> </div>
                         <div className="col-10 "> <span>Arthur Hayes in Entrepreneur's Handbook </span></div>
                       
                        </div>
                        <div className="row">
                        <sapn className="trandseconds"> Max Bidding </sapn>
                        </div>
                        <div className="row">
                         <span className="trandsecondc"> Aug 5 ·39 min read </span>
                        </div>
                    </div>
                </div>
             </div>
             <div className="col-12 col-md-4 col-sm-6">
              <div className="row">
                  <div className="col-3 blognumber">
                        <span >04</span>
                  </div>
                  <div className="col-9 second">
                      <div className="row secondfirst">
                     
                        <div className="col-2 "> <img alt="Entrepreneur's Handbook" className="trandimagecenter  " src="https://miro.medium.com/fit/c/20/20/1*ZpqTjur1EEzN4KzM4e-Bnw.png" width="20" height="20" /> </div>
                       <div className="col-10 "> <span>Arthur Hayes in Entrepreneur's Handbook </span></div>
                     
                      </div>
                      <div className="row">
                      <sapn className="trandseconds"> Max Bidding </sapn>
                      </div>
                      <div className="row">
                       <span className="trandsecondc"> Aug 5 ·39 min read </span>
                      </div>
                  </div>
              </div>
           </div>
           <div className="col-12 col-md-4 col-sm-6">
            <div className="row">
                <div className="col-3 blognumber">
                      <span >05</span>
                </div>
                <div className="col-9 second">
                    <div className="row secondfirst">
                   
                      <div className="col-2 "> <img alt="Entrepreneur's Handbook" className="trandimagecenter  " src="https://miro.medium.com/fit/c/20/20/1*ZpqTjur1EEzN4KzM4e-Bnw.png" width="20" height="20" /> </div>
                     <div className="col-10 "> <span>Arthur Hayes in Entrepreneur's Handbook </span></div>
                   
                    </div>
                    <div className="row">
                    <sapn className="trandseconds"> Max Bidding </sapn>
                    </div>
                    <div className="row">
                     <span className="trandsecondc"> Aug 5 ·39 min read </span>
                    </div>
                </div>
            </div>
         </div>
         <div className="col-12 col-md-4 col-sm-6">
          <div className="row">
              <div className="col-3 blognumber">
                    <span >06</span>
              </div>
              <div className="col-9 second">
                  <div className="row secondfirst">
                 
                    <div className="col-2 "> <img alt="Entrepreneur's Handbook" className="trandimagecenter  " src="https://miro.medium.com/fit/c/20/20/1*ZpqTjur1EEzN4KzM4e-Bnw.png" width="20" height="20" /> </div>
                   <div className="col-10 "> <span>Arthur Hayes in Entrepreneur's Handbook </span></div>
                 
                  </div>
                  <div className="row">
                  <sapn className="trandseconds"> Max Bidding </sapn>
                  </div>
                  <div className="row">
                   <span className="trandsecondc"> Aug 5 ·39 min read </span>
                  </div>
              </div>
          </div>
       </div> */}
      
           {Blogs}
            </div>
        </div>
      </section>
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