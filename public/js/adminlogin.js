

const submit=document.getElementById("submit-button");
submit.addEventListener("click", (event)=>{
    event.preventDefault();
    const data ={
        username:document.getElementById("username").value ,
        password:document.getElementById("password").value ,
    }
    fetch("/adminlogin",{
        method:"post",
        headers:{
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })
    .then((response) => response.json())
    .then((data) => {
        if(data.success) {
          alert("login successfully");
          window.location.href="/adminhome"
        }
        else 
        {
          alert("invalid login"); 
          window.location.href="/adminlogin"
        }
      })
      .catch((error) => {
        console.log(error);
      });
})