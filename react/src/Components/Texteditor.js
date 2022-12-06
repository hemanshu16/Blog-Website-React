import React, { useEffect, useRef, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";


export default function Texteditor(props) {
  const editorRef = useRef(null);

  
  const [blog, setBlog] = useState({
    title: props.blog.title,
    headerimglink: props.blog.headerimglink   ,
    category: props.blog.category,
    content: props.blog.content,
    blogid: props.blog.blogid,
    description : props.blog.description
  });
 
  const Save = () => {
    if (editorRef.current) {
      props.SaveBlog({
        title: blog.title,
        headerimglink: blog.headerimglink,
        category: blog.category,
        content: editorRef.current.getContent(),
        blogid: blog.blogid,
        description : blog.description
      });
    }
  };
  function handledata(e) {
    setBlog(oldBlog => {
     
      return {
        ...oldBlog,
        [e.target.name]: e.target.value
      }
    });
    
  }
  return (
    <>
      <div>
        <center>
          <div className="container">
          <div className="BlogTitle">
            <input
              type="text"
              className="BlogTitleinput"
              name="title"
              value={blog.title}
              onChange={handledata}
              placeholder="Blog Title"
              aria-label="Blog Title"
            />
            </div>
            <div>
            <select class="form-select" aria-label="Default select example" value={blog.category} onChange={handledata} name="category" >
            <option >Select Blog Category</option>
            <option value="Education">Education</option>
            <option value="Food">Food</option>
            <option value="Travel">Travel</option>
            <option value="Health And Fitness">Health And Fitness</option>
            <option value="LifeStyle">LifeStyle</option>
            <option value="Fashion and Beauty">Fashion and Beauty</option>
            <option value="Photography">Photography</option>
            <option value="Personal">Personal</option>
            <option value="DIY craft">DIY craft</option>
            <option value="Parenting">Parenting</option>
            <option value="Music">Music</option>
            <option value="Business">Business</option>
            <option value="Art and Design">Art and Design</option>
            <option value="Book and Writing">Book and Writing</option>
            <option value="Personal Finance">Personal Finance</option>
            <option value="Interior Design">Interior Design</option>
            <option value="Sports">Sports</option>
            <option value="News">News</option>
            <option value="Movie">Movie</option>
            <option value="Religion">Religion</option>
            <option value="Political">Political</option>
          </select>
          </div>
          </div>
          <div className="container1">
            <div className="con1item">
            <div className="imgdesc">
          <input type="text" name="headerimglink" className="imginput" onChange={handledata} value={blog.headerimglink === "https://drive.google.com/uc?export=view&id=1iXQOpP9izqsez2N6RZjR_Kod4r4f1wwV" ? "Enter Image Url" : blog.headerimglink}/>
          <textarea className="description" name="description" onChange={handledata} value={blog.description}>
            
          </textarea>
                    </div>
          </div>
          <div className="con1item con1item2">
          {blog.headerimglink !== "" && <img src={blog.headerimglink} width="400px" height="300px" alt="provide valid url" />}
          </div>
          </div>
          <Editor
            apiKey="ucvs30a0zhhfcrzw215igwkcyjgjm8hkifvvozpbk8ycjbcf"
            onInit={(evt, editor) => (editorRef.current = editor)}
            initialValue={blog.content}
            init={{
              width: 1100,
              menubar: true,
              plugins: [
                "advlist",
                "autolink",
                "lists",
                "link",
                "image",
                "charmap",
                "preview",
                "anchor",
                "searchreplace",
                "visualblocks",
                "code",
                "fullscreen",
                "insertdatetime",
                "media",
                "table",
                "code",
                "help",
                "wordcount",
              ],
              toolbar:
                "undo redo | blocks | " +
                "bold italic forecolor | alignleft aligncenter " +
                "alignright alignjustify | bullist numlist outdent indent | " +
                "removeformat | help",
              content_style:
                "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
            }}
          />
        </center>
        <center>
          <button className="texteditorbutton" onClick={Save}>
            Save
          </button>
        </center>
      </div>
    </>
  );
}
