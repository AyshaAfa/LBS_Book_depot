const yes=document.getElementById("yes")
const no=document.getElementById("no")
const currentTime=new Date().toLocaleDateString()
yes.addEventListener(click,(event)=>{
    event.preventDefault();
    const data={
        paymentreceived:true,
        paymentdate:currentTime
    }
    fetch("/home/mybooks/bookdetail/confirm", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
      .then((response) => response.json())
})