import React from "react";

export default function Navbar(props) {
  const [registration, setRegistration] = React.useState(false);
  const [error, setError] = React.useState({ iserror: false, error: "" });
  const [rerror, setrError] = React.useState({ iserror: false, error: "" });
  const [name, setName] = React.useState("");
  const [toggle,setToggle] = React.useState(false);
  React.useEffect(() => {
    const value = localStorage.getItem("islogged");
    if (localStorage.getItem("name") != undefined) {
      setName(localStorage.getItem("name"));
    }
    if (value !== undefined && value === "1") {
      props.setLogin(true);
    }
  }, [props]);
  if (document.cookie.length > 0) {
    console.log(JSON.parse(document.cookie));
    props.setLogin(true);
  }
  const [formData, setFormData] = React.useState({
    email: "",
    password: "",
  });
  const [formData1, setFormData1] = React.useState({
    name: "",
    email: "",
    password: "",
  });

  function handleChange(e) {
    setFormData((oldvalue) => {
      return {
        ...oldvalue,
        [e.target.name]: e.target.value,
      };
    });
  }

  function handleChange1(e) {
    console.log(e.target.value);
    setFormData1((oldvalue) => {
      return {
        ...oldvalue,
        [e.target.name]: e.target.value,
      };
    });
  }
  async function handleData() {
    console.log(formData);
    const response = await fetch("http://localhost:8080/Login", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(formData),
    });
    response.json().then((data) => {
      if (data.error != null) {
        setError({ iserror: true, error: data.error });
      } else {
        
        props.setLogin(true);
        localStorage.setItem("islogged", "1");
        localStorage.setItem("name", data.user);
        localStorage.setItem("jwt", data.token);
        setName(data.user);
        setError({ iserror: false, error: "" });
        setrError({ iserror: false, error: "" });
        setToggle(true);
      }
    })
  }
  async function handleData1() {
    const response = await fetch("http://localhost:8080/Registration", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(formData1),
    });
    response.json().then((data) => {
      if (data.errors != null) {
        setrError({ iserror: true, error: data.errors[0].msg });
      } else {
        setRegistration(true);
      }
    })
  }
  function logout(event) {
    event.preventDefault();
    localStorage.clear("islogged");
    props.setLogin(false);
    setRegistration(false);
    setFormData({ email: "", password: "" });
    setFormData1({ name: "", email: "", password: "" });
  }
  function toggleUser()
  {
     setToggle(old => !old);
  }
  function handlecategory(e)
  {
      props.setComponent({name:"category", value:e.target.text});
  }
  return (
    <>
    <nav className="navbar navbar-expand-lg navbar-light">
      <div className="container-fluid navContainer ">
        
          <img src="./logo.png" className="Headingimg" onClick={toggleUser} alt="imgae not found" />
        
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0 navul">
            { (!props.login || toggle ) && (
              <>
                <li className="nav-item navliunderline">
                  <a className="nav-link" aria-current="page" onClick={()=>{props.setComponent({name:"home"})}} >
                    Home
                  </a>
                </li>
                <li className="nav-item navliunderline">
                  <a className="nav-link" onClick={handlecategory} >
                    Culture
                  </a>
                </li>
                <li className="nav-item navliunderline">
                  <a className="nav-link"  onClick={handlecategory}>
                    Design
                  </a>
                </li>
                
                <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Others
          </a>
          <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
            <li>  <div Style="width:500px;">
               <div className="row" Style="text-align:center;">
                 <div className="col-md-4"> <a className="nav-link" onClick={handlecategory} >Food</a></div>
                 <div className="col-md-4"> <a className="nav-link" onClick={handlecategory} >Travel</a></div>
                 <div className="col-md-4"> <a className="nav-link" onClick={handlecategory} >Health And Fitness</a></div>
               </div>
               <div className="row" Style="text-align:center;">
                 <div className="col-md-4"> <a className="nav-link" onClick={handlecategory} >LifeStyle</a></div>
                 <div className="col-md-4"> <a className="nav-link" onClick={handlecategory} >Fashion and Beauty</a></div>
                 <div className="col-md-4"> <a className="nav-link" onClick={handlecategory} >Photography</a></div>
               </div>
               <div className="row" Style="text-align:center;">
                 <div className="col-md-4"> <a className="nav-link" onClick={handlecategory} >Personal</a></div>
                 <div className="col-md-4"> <a className="nav-link" onClick={handlecategory} >DIY craft</a></div>
                 <div className="col-md-4"> <a className="nav-link" onClick={handlecategory} >Parenting</a></div>
               </div>
               <div className="row" Style="text-align:center;">
                 <div className="col-md-4"> <a className="nav-link" onClick={handlecategory} >Music</a></div>
                 <div className="col-md-4"> <a className="nav-link" onClick={handlecategory} >Business</a></div>
                 <div className="col-md-4"> <a className="nav-link" onClick={handlecategory} >Art and Design</a></div>
               </div>
               <div className="row" Style="text-align:center;">
                 <div className="col-md-4"> <a className="nav-link" onClick={handlecategory} >Book and Writing</a></div>
                 <div className="col-md-4"> <a className="nav-link" onClick={handlecategory} >Personal Finance</a></div>
                 <div className="col-md-4"> <a className="nav-link" onClick={handlecategory} >Interior Design</a></div>
               </div>
               <div className="row" Style="text-align:center;">
                 <div className="col-md-4"> <a className="nav-link" onClick={handlecategory} >Sports</a></div>
                 <div className="col-md-4"> <a className="nav-link" onClick={handlecategory} >News</a></div>
                 <div className="col-md-4"> <a className="nav-link" onClick={handlecategory} >Art and Design</a></div>
               </div>
               <div className="row" Style="text-align:center;">
                 <div className="col-md-4"> <a className="nav-link" onClick={handlecategory} >Movie</a></div>
                 <div className="col-md-4"> <a className="nav-link" onClick={handlecategory} >Religion</a></div>
                 <div className="col-md-4"> <a className="nav-link" onClick={handlecategory} >Education</a></div>
               </div>
   
  </div></li>
            
          </ul>
        </li>
                  
                
              </>
            )}
            {( props.login && !toggle )&& (
              <>
                <li className="nav-item navliunderline">
                  <a
                    className="nav-link"
                    href="Blogs"
                    onClick={(e) => {
                      e.preventDefault();
                      props.setComponent({name: "bloglist" });
                    }}
                  >
                    Your Blogs
                  </a>
                </li>
                <li className="nav-item navliunderline">
                  <a
                    className="nav-link"
                    href="Add New Blog"
                    onClick={(e) => {
                      e.preventDefault();
                      props.setComponent({name : "addnewblog" } );
                    }}
                  >
                    Add Blog
                  </a>
                </li>
                <li className="nav-item navliunderline">
                  <a
                    className="nav-link"
                    href="Add New Blog"
                    onClick={(e) => {
                      e.preventDefault();
                      props.setComponent({name : "profile" } );
                    }}
                  >
                    Profile
                  </a>
                </li>
              </>
            )}
          </ul>
          {false && 
          <form className="d-flex">
            <input
              className="form-control me-2 navTop"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button
              className="btn btn-outline-success navleft navTop"
              type="submit"
            >
              Search
            </button>
          </form>
            }
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0 ">
            {!props.login && (
              <>
                <li className="nav-item">
                  <a
                    className="btn btn-outline-success navleft navTop"
                    href="abc"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                  >
                    Login
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="btn btn-outline-success"
                    href="abc"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal1"
                  >
                    Register
                  </a>
                </li>
              </>
            )}
            {props.login && (
              <>
                
                <p >Welcome {name} </p> &nbsp; &nbsp; 
                <a
                  className="btn btn-outline-success"
                  href="abc"
                  onClick={logout}
                >
                  Logout
                </a>
              </>
            )}
          </ul>
        </div>
      </div>
    
     
    </nav>
     <div
     className="modal fade"
     id="exampleModal"
     tabindex="-1"
     aria-labelledby="exampleModalLabel"
     aria-hidden="true"
   >
     <div className="modal-dialog modal-dialog-centered">
       <div className="modal-content">
         <div className="modal-header text-center">
           <h4 className="modal-title w-100 font-weight-bold">Login</h4>
           <button type="button" className="close" data-bs-dismiss="modal">
             <span aria-hidden="true">&times;</span>
           </button>
         </div>
         {!props.login && (
           <div className="login--body">
             <div className="input--class">
               <input
                 type="text"
                 className="input--login"
                 name="email"
                 onChange={handleChange}
                 placeholder="Email Address"
                 value={formData.name}
               />
             </div>
             <div className="input--class">
               <input
                 type="password"
                 className="input--login"
                 name="password"
                 onChange={handleChange}
                 placeholder="Password"
                 value={formData.password}
               />
             </div>
             {error.iserror && (
               <h2 className="model--body--message"> {error.error} </h2>
             )}
           </div>
         )}
         {props.login && (
           <h3 className="model--body--message">Successfully Login</h3>
         )}
         <div className="modal-footer d-flex justify-content-center">
           {!props.login && (
             <button
               type="button"
               className="btn btn-info"
               onClick={handleData}
             >
               Submit
             </button>
           )}
           {props.login && (
             <button type="button" className="close" data-bs-dismiss="modal">
               close
             </button>
           )}
         </div>
       </div>
     </div>
   </div>

   <div
     className="modal fade"
     id="exampleModal1"
     tabindex="-1"
     aria-labelledby="exampleModalLabel"
     aria-hidden="true"
   >
     <div className="modal-dialog modal-dialog-centered">
       <div className="modal-content">
         <div className="modal-header text-center">
           <h4 className="modal-title w-100 font-weight-bold">Registration</h4>
           <button type="button" className="close" data-bs-dismiss="modal">
             <span aria-hidden="true">&times;</span>
           </button>
         </div>
         {!registration && (
           <div className="login--body">
             <div className="input--class">
               <input
                 type="text"
                 className="input--login"
                 name="name"
                 onChange={handleChange1}
                 placeholder="User Name"
                 value={formData1.name}
               />
             </div>

             <div className="input--class">
               <input
                 type="text"
                 className="input--login"
                 name="email"
                 onChange={handleChange1}
                 placeholder="Email Address"
                 value={formData1.email}
               />
             </div>
             <div className="input--class">
               <input
                 type="password"
                 className="input--login"
                 name="password"
                 onChange={handleChange1}
                 placeholder="Password"
                 value={formData1.password}
               />
             </div>
             {rerror.iserror && (
               <h2 className="model--body--message"> {rerror.error} </h2>
             )}
           </div>
         )}
         {registration && (
           <h3 className="model--body--message">
             Successfully Registration done
           </h3>
         )}
         <div className="modal-footer d-flex justify-content-center">
           {!registration && (
             <button
               type="button"
               className="btn btn-info"
               onClick={handleData1}
             >
               Submit
             </button>
           )}
           {registration && (
             <button type="button" className="close" data-bs-dismiss="modal">
               close
             </button>
           )}
         </div>
       </div>
     </div>
   </div>
   </>
  );
}
