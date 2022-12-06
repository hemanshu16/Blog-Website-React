import React, { useEffect, useState } from "react";
import '../CSS/profile.css';

export default function (props) {

    
    const[profile,setProfile] = useState({
         name : "",
         email : "",
         about  : "",
         img : "",
         tempimg : "",
         oldpassword : "",
         newpassword : ""
    });
    const[message, setMessage] = useState({
        message : "",
        visible : false
    })
    async function getProfie()
    {
        const response = await fetch("http://localhost:8080/profiledetails", {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
  
        body: JSON.stringify({token: localStorage.getItem('jwt') }),
      });
      response.json().then((data) => {
             setProfile({
                ...profile,
                name : data.name,
                email : data.email,
                img : data.image,
                about : data.about
             });
            
      }).catch(e => {
        setMessage({
             message : "Some Thing Went Wrong",
             visible : true
        });
      })
    }
    useEffect( ()=>{
         
         getProfie();
         
    },[]);
    function handleImage()
    {
        setProfile(old => {
            return {
                ...old,
                img : old.tempimg
            }
        })
    }
    function handleformdata(e)
    {
        setProfile(oldprofile=> {
            return {...oldprofile, [e.target.name] : e.target.value}
        })
    }
    async function updatePassword()
    {
        const response = await fetch("http://localhost:8080/updatepassword", {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
  
        body: JSON.stringify({token: localStorage.getItem('jwt'),
                              oldpassword : profile.oldpassword,
                              newpassword : profile.newpassword
                               }),
      });
      response.json().then((data) => {
        let mess = "Password Updated";
        if(data.status === undefined)
        {
             mess = data.error;
        }
        setMessage({
           message:mess,
           visible : true
        })
            
      }).catch(e => {
        setMessage({
             message : "Some Thing Went Wrong",
             visible : true
        });
      })
    }
    async function saveProfile()
    {
        const response = await fetch("http://localhost:8080/updateprofile", {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
  
        body: JSON.stringify({token: localStorage.getItem('jwt'),
                              name:profile.name,
                              img : profile.img,
                              about : profile.about }),
      });
      response.json().then((data) => {
             let mess = "Profile Details Updated";
             if(data.status === undefined)
             {
                  mess = "Please Try Again Later";
             }
             setMessage({
                message:mess,
                visible : true
             })
            
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
    return ( <>
        <div className="Container--profile">
            <div className="item">

                <img className="profile--image" data-bs-toggle="modal" data-bs-target="#exampleModal4" src={profile.img} alt="No Image" />

            </div>
            <div className="item">
                <div className="details">
            <div className="mb-3">
    <label for="exampleInputEmail1" className="form-label">Email address</label>
    <input type="email" name="email" className="form-control" value={profile.email} aria-describedby="emailHelp" disabled/>
   
  </div>
  <div className="mb-3">
    <label for="exampleInputEmail1" className="form-label">Name</label>
    <input type="email" name="name" value={profile.name} onChange={handleformdata} className="form-control"  aria-describedby="emailHelp" />
   
  </div>
  <div className="mb-3">
    <label for="exampleInputEmail1" className="form-label" >About</label>
    <textarea  className="form-control" name="about" value={profile.about} onChange={handleformdata}></textarea>
   
  </div>
  <button type="button" className="btn btn-outline-success" onClick={saveProfile}>Save</button>&nbsp; &nbsp;
  <button type="button" className="btn btn-outline-primary" data-bs-toggle="modal" data-bs-target="#exampleModal3">Update Password</button>
  </div>
 
   </div>


<div className="modal fade" id="exampleModal3" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog modal-dialog-centered">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">Update Password</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
      <div className="mb-3">
    <label for="exampleInputEmail1" className="form-label">Old Password</label>
    <input type="password" className="form-control"  aria-describedby="emailHelp" name="oldpassword" value={profile.oldpassword} onChange={handleformdata}/>
   
  </div>
  <div className="mb-3">
    <label for="exampleInputEmail1" className="form-label">New Password</label>
    <input type="password" className="form-control"  aria-describedby="emailHelp" name="newpassword" value={profile.newpassword} onChange={handleformdata}/>
   
  </div>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
        <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={updatePassword}>Update</button>
      </div>
    </div>
  </div>
</div>
<div className="modal fade" id="exampleModal4" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog modal-dialog-centered">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">Image Link</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
      <div className="mb-3">
    <label for="exampleInputEmail1" className="form-label">Image Link</label>
    <input type="text" className="form-control"  aria-describedby="emailHelp" name="tempimg" value={profile.tempimg} onChange={handleformdata}/>
   
  </div>
  
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
        <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={handleImage}>Update</button>
      </div>
    </div>
  </div>
</div>


<div className="position-fixed bottom-0 end-0 p-3" >
  <div id="liveToast" className={message.visible ? "toast show" : "toast hide"} role="alert" aria-live="assertive" aria-atomic="true">
    <div className="toast-header">
      
      <strong className="me-auto"> {message.visible && message.message}</strong>
      
      <button type="button" className="btn-close" data-bs-dismiss="toast" aria-label="Close" onClick={closeToast}></button>
    </div>
    
  </div>
</div>
        </div>
        
</>

    );
}