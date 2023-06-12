

function clear(alert){
  const bidamount=document.getElementById("bidamount");
  if(alert){
    bidamount.value='';
  }

}//this function is for clearing the input field
const urlParams = new URLSearchParams(window.location.search);
const bookid = urlParams.get('bid');
const submit = document.getElementById("submit");
submit.addEventListener("click", (event) => {
  event.preventDefault();
const uid=localStorage.getItem("uid");
const bidamount=document.getElementById("bidamount").value;
const data={
  uid:uid,
  bidamount:bidamount,
  bookid:bookid

}
fetch("/home/bookdetail", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(data),
})
  .then((response) => {
    return response.json();
  })
  .then((responseData)=>{
    let alert1=responseData.alert1;
    let alert2=responseData.alert2;
    let alert3=responseData.alert3;
    let alert4=responseData.alert4;
    let success=responseData.success;
    if(alert3){
      alert(`OOPS!!! Please place your Bid in between 7AM-8PM`);
      clear(alert3);
    }
    if(alert4){
      alert(`OOPS!!! Please place your Bid in between 7AM-8PM`);
      clear(alert4);
    }
    if(alert1){
        let halfproposedprice=responseData.halfproposedprice;
        console.log(halfproposedprice);
        alert(`Bidding amount atleast above the ₹${halfproposedprice}`)
        clear(alert1);
    }
    if(alert2){
        let maxbidamount=responseData.maxbidamount;
        console.log(maxbidamount);
        alert(`Bidding amount should be greater than ₹${maxbidamount}`);
        clear(alert2);
    }
    if(responseData.success){
        const output=document.getElementById("output")
        let out="";
        for(let row of responseData.result4)
        {
              out+=`
              <td>${row.bidid}</td>
              <td>${row.bidamount}</td>
              `
        }
        alert("bidded successfully");
        output.outerHTML=out;
        clear(success)
    }
  })
})