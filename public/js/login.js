const submit = document.getElementById("submit-button");
submit.addEventListener("click", (event) => {
  event.preventDefault();
  const data = {
    username: document.getElementById("username").value,
    password: document.getElementById("password").value,
  };
  fetch("/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {
      if(data.alert1===true){
        const urlParams = new URLSearchParams(window.location.search);
        urlParams.set('uid', data.result[0].userid);
        const newUrl = "/bhome"+ '?' + urlParams.toString();
        localStorage.setItem('uid', data.result[0].userid);
        alert("Login successful");
        window.location.href = newUrl;
      }
      if (data.success===true) {
        const urlParams = new URLSearchParams(window.location.search);
        urlParams.set('uid', data.result[0].userid);
        const newUrl = "/home"+ '?' + urlParams.toString();
        localStorage.setItem('uid', data.result[0].userid);
        alert("Login successful");
        window.location.href = newUrl;
      } 
      else if(data.success===false)
      {
        alert("Please enter correct password");
        window.location.href="/";
      }
      else if(data.alert===true) {
        
        alert("User does not found");
        window.location.href="/register"
      }
    })
    .catch((error) => {
      console.log(error);
      alert("An error occurred");

    });
});
