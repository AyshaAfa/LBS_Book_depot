function clear(id){
  id.value='';
}//this function is for clear one input field
function clear1(id,id){
  id.value='';
  id.value='';
}//this function is for clear two input field
const name=document.getElementById("name");
  const department=document.getElementById("department");
  const semester=document.getElementById("semester");
  const mobile=document.getElementById("phoneno");
  const email = document.getElementById("email");
  const username=document.getElementById("username");
  const password = document.getElementById("password");
  const confirm_password = document.getElementById("confirm_password");
function validate() {
  // const name=document.getElementById("name");
  // const department=document.getElementById("department");
  // const semester=document.getElementById("semester");
  // const mobile=document.getElementById("phoneno");
  // const email = document.getElementById("email");
  // const username=document.getElementById("username");
  // const password = document.getElementById("password");
  // const confirm_password = document.getElementById("confirm_password");
  const emailRegex = /^[A-Za-z0-9]+@lbscek\.ac\.in$/;
  const usernameregex=/^[A-Za-z0-9]$/;
  if(username.value==password.value){

    alert("username and password cannot be same ")
    return false;
    clear1(username,password);
  }
  if (password.value !== confirm_password.value) {
    alert("Passwords must match.");
    return false;
    clear1(password,confirm_password);
  }
  if (password.value.length < 8) {
    alert("Password should be at least 8 characters long.");
    return false;
    clear(password);
  }
  if (password.value.search(/[0-9]/) === -1) {
    alert("Password must contain at least one number.");
    return false;
    clear(password);
  }
  if (password.value.search(/[A-Z]/) === -1) {
    alert("Password must contain at least one uppercase letter.");
    return false;
    clear(password)
  }
  if (!emailRegex.test(email.value)) {
    alert("Please enter a valid LBSCEK email address.");
    return false;
    clear(email);
  }
  return true;
} //this function is for validating the input which is given by user 

document.getElementById("submit").addEventListener("click", (event) => {
  event.preventDefault();

  if (validate()) {
    const data = {
      name:document.getElementById("name").value,
      department:document.getElementById("department").value,
      semester:document.getElementById("semester").value,
      mobile:document.getElementById("phoneno").value,
      email :document.getElementById("email").value,
      username:document.getElementById("username").value,
      password : document.getElementById("password").value
    };
    fetch("/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        if(data.alert) {
          alert("username is already exist");
          clear(username);
        }
        else if(data.success){
        alert("user register is compeleted"); 
        window.location.href="/"
        }
        else 
        {
          alert("mobile number or email address is already exist");
          clear1(email,username);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }
});
