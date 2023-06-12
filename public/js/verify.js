document.getElementById("submit").addEventListener("click", (event) => {
  event.preventDefault();
  const data={
    phonenumber:document.getElementById("phonenumber").value,
  }
  fetch("/verify", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
  .then((response) => response.json())
        .then((data) => {
          console.log(data);
          if(data.success) 
          {
             alert(`otp is sent to your registered number `);
             localStorage.setItem("userid",data.result[0].userid);
             window.location.href="/otpverification";
          }
            else
            {
              alert("please request for another otp")
              window.location.href="/verify";
            } 
        })
        .catch((error) => {
          console.log(error);
        });
})