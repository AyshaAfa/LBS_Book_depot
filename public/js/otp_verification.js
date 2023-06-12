const codes=document.querySelectorAll(".code");
codes[0].focus();
codes.forEach((code,idx)=>{
    code.addEventListener("keydown",(event)=>{
        if(event.key>=0&&event.key<=9){
            codes[idx].value='';
            if (codes[idx+1]) {
                setTimeout(() => codes[idx+1].focus(),10)
            }
        } else if(event.key==='Backspace'){
            if (codes[idx-1]) {
                setTimeout(()=> codes[idx-1].focus(),10)
            }
        }
    })
})
let idx=0;
let submit=document.getElementById("submit");

submit.addEventListener("click",(event)=>{
    event.preventDefault();

    
   const data={
        number1:document.getElementById("number1").value,
        number2:document.getElementById("number2").value,
        number3:document.getElementById("number3").value,
        number4:document.getElementById("number4").value,
    }
    for(i=0;i<data.length;i++) console.log(data[i]);
    fetch("/otpverification",{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })
    .then((respone)=>respone.json())
    .then((data)=>{

        if(data.success) {
            window.location.href="/resetpassword"
        }
        else if(data.success===false){
            alert("otp is wrong");
            window.location.href="/otpverification";
        }
        if(data.success1){
            window.location.href="/verify"
        }
    })

})