import React from 'react';


export default function Navbar() {
  const [login, setLogin] = React.useState(false);
  const [registration, setRegistration] = React.useState(false);
  const [error, setError] = React.useState({iserror : false, error : ""});
  const [rerror, setrError] = React.useState({iserror : false, error : ""});
  const [name,setName] = React.useState("");
  React.useEffect(()=>{
    const value = localStorage.getItem("islogged");
    if(value !== undefined && value === "1")
    {
      setLogin(true);
    }
  },[]);
  if (document.cookie.length > 0) {
    console.log(JSON.parse(document.cookie));
     setLogin(true);
  }
  const [formData, setFormData] = React.useState( {
    email:"",password:""
  });
  const [formData1, setFormData1] = React.useState( {
    name:"",email:"",password:""
  });
 
  function handleChange(e)
  {
    
    setFormData(oldvalue => {
      return {
        ...oldvalue,
        [e.target.name] : e.target.value
      }
    })
  }

  function handleChange1(e)
  {
    console.log(e.target.value);
    setFormData1(oldvalue => {
      return {
        ...oldvalue,
        [e.target.name] : e.target.value
      }
    })
  }
  async function  handleData()  {
    console.log(formData);
    const response = await fetch('http://localhost:8080/Login', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      
      body: JSON.stringify(formData) 
    });
    response.json().then(data=>{
      if(data.error != null)
      {
           setError({iserror:true,error:data.error});
      }
      else{
        setLogin(true);
        localStorage.setItem('islogged',"1");
        setName(data.user);
      }
    });

  }
  async function handleData1()
  {
    const response = await fetch('http://localhost:8080/Registration', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      
      body: JSON.stringify(formData1) 
    });
    response.json().then(data=>{
      if(data.errors != null)
      {
           setrError({iserror:true,error: data.errors[0].msg});
      }
      else{
        setRegistration(true);
      
      }
    });
  }
  function logout()
  {
    localStorage.clear("islogged");
  }
  return (

    <nav className="navbar navbar-expand-lg navbar-light  ">
      <div className="container-fluid navContainer " >
        <a className="navbar-brand navtitle " href="abc">Readable</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="abcnavbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0 navul">
            <li className="nav-item navliunderline">
              <a className="nav-link" aria-current="page" href="abc">Home</a>
            </li>
            <li className="nav-item navliunderline">
              <a className="nav-link" href="abc">Culture</a>
            </li>
            <li className="nav-item navliunderline">
              <a className="nav-link" href="abc">Design</a>
            </li>
            <li className="nav-item navliunderline">
              <a className="nav-link" href="abc">Other</a>
            </li>

          </ul>
          <form className="d-flex">
            <input className="form-control me-2 navTop" type="search" placeholder="Search" aria-label="Search" />
            <button className="btn btn-outline-success navleft navTop" type="submit">Search</button>
          </form>
        
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0 " >
              {!login && <>
              <li className="nav-item">
                <a className="btn btn-outline-success navleft navTop" href="abc" data-bs-toggle="modal" data-bs-target="#exampleModal">Login</a>
              </li>
              <li className="nav-item">
                <a className="btn btn-outline-success" href="abc"  data-bs-toggle="modal" data-bs-target="#exampleModal1">Register</a>
              </li></>
              }
              { 
                login && <> <p>Welcome {name} </p>
                <a className="btn btn-outline-success" href="abc"  onClick={logout}>Logout</a>
                </>
              }
            </ul>
          
        </div>
      </div>
      {/* <!-- Button trigger modal --> */}


      {/* <!-- Modal --> */}
      <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header text-center">
              <h4 className="modal-title w-100 font-weight-bold">Sign in</h4>
              <button type="button" className="close" data-bs-dismiss="modal" >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            {!login && 
            <div className="login--body">
              <div className="input--class">
                <input type="text" className="input--login" name="email" onChange={handleChange} placeholder='Email Address' value={formData.name}/></div>
              <div className="input--class">
                <input type="password" className="input--login" name="password" onChange={handleChange} placeholder='Password' value={formData.password} /></div>
            {error.iserror && <h2 className="model--body--message"> {error.error} </h2> } 
            
            </div>
            }
            {login && <h3 className="model--body--message">Successfully Login</h3>}
            <div className="modal-footer d-flex justify-content-center">
               {!login && <button type="button" className="btn btn-info" onClick={handleData}>SIgn In</button>}
               {login && <button type="button" className="close" data-bs-dismiss="modal" >
                close
              </button> }
            </div>
          </div>
        </div>
      </div>

      <div className="modal fade" id="exampleModal1" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header text-center">
              <h4 className="modal-title w-100 font-weight-bold">Sign Up</h4>
              <button type="button" className="close" data-bs-dismiss="modal" >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            {!registration && 
            <div className="login--body">
               <div className="input--class">
                <input type="text" className="input--login" name="name" onChange={handleChange1} placeholder='User Name' value={formData1.name}/></div>
            
              <div className="input--class">
                <input type="text" className="input--login" name="email" onChange={handleChange1} placeholder='Email Address' value={formData1.email}/></div>
              <div className="input--class">
                <input type="password" className="input--login" name="password" onChange={handleChange1} placeholder='Password' value={formData1.password} /></div>
            {rerror.iserror && <h2 className="model--body--message"> {rerror.error} </h2> } 
            
            </div>
            }
            {registration && <h3 className="model--body--message">Successfully Registration done</h3>}
            <div className="modal-footer d-flex justify-content-center">
               {!registration
                && <button type="button" className="btn btn-info" onClick={handleData1}>SIgn Up</button>}
               {registration && <button type="button" className="close" data-bs-dismiss="modal" >
                close
              </button> }
            </div>
          </div>
        </div>
      </div>




    </nav>

  );
}