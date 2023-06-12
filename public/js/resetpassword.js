async function validate() {
  try {
    const password = document.getElementById("new-password");
    const confirm_password = document.getElementById("confirm-new-pw");
  
    if (password.value !== confirm_password.value) {
      alert("Passwords must match.");
      return false;
    }
    if (password.value.length < 8) {
      alert("Password should be at least 8 characters long.");
      return false;
    }
    if (password.value.search(/[0-9]/) === -1) {
      alert("Password must contain at least one number.");
      return false;
    }
    if (password.value.search(/[A-Z]/) === -1) {
      alert("Password must contain at least one uppercase letter.");
      return false;
    }
  
    return true;
  } catch (error) {
    console.log(error);
  }
}
const userid=localStorage.getItem("userid");
document.getElementById("submit").addEventListener("click", (event) => {
    event.preventDefault();
    if(validate()){
        const data={
            password:document.getElementById("new-password").value,
            userid:userid
        }
        fetch("/resetpassword", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          })
            .then((response) => response.json())
            .then((data) => {
                if(data.success) {
                  alert("password has been changed successfully");
                  localStorage.clear();
                  window.location.href="/"
                }
                else{
                alert("user is not found"); 
                window.location.href="/"
                }
              })
              .catch((error) => {
                console.log(error);
              });
        }

})