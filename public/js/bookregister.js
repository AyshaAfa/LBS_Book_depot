const submitBtn = document.getElementById("submit");
const uid=localStorage.getItem('uid');
function uppercase(){
  
}
submitBtn.addEventListener("click", (event) => {
  event.preventDefault();
  
  
    const formdata = new FormData();
    formdata.append("imagefile", imagefile.files[0]);
    formdata.append("userid",uid);
    fetch("/home/bookregisterpicture", {
      method: "post",
      body: formdata,
    })
      .then((response) => response.json())
      .then((responseData) => {
        if (responseData.success1) {
          const uploadmax=responseData.result[responseData.result.length-1].uploadid;
          
          
          console.log(uploadmax)
          const data = {
            bookname: document.getElementById("book-name").value,
            authorname: document.getElementById("auth-name").value,
            semester: document.getElementById("semester").value,
            condition: document.getElementById("condition").value,
            purchase_date: document.getElementById("purchase-date").value,
            market_price: document.getElementById("market-price").value,
            proposed_price: document.getElementById("proposed-price").value,
            description: document.getElementById("description").value,
            userid:uid,
            uploadid:uploadmax,
          };
          fetch("/home/bookregister", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          })
            .then((response) => response.json())
            .then((data) => {
              if (data.success) {
                console.log()
                alert("book added successfully");
                window.location.href = "/home";
              } else alert("book can't be added");
            })
            .catch((error) => {
              console.log(error);
            });
        } else {
          alert("Error uploading image.");
        }
      })
      .catch((error) => console.log(error));
  }
);

