let table=document.getElementById("table");

fetch("/viewuser",{
  method:"POST"
})

    .then((response) => response.json())
    .then((result)=>{
      console.log(result);
      let placeholder=document.getElementById("output")
      console.log(placeholder);
      let out=""

      for(let row of result){
        out+=`
          <tr>
            <td>${row.userid}</td>
            <td>${row.name}</td>
            <td>${row.semester}</td>
            <td>${row.department}</td>
            <td>${row.mobile}</td>
            <td>${row.email}</td>
            <td>${row.username}</td>
           
            



        `;
      }
      placeholder.outerHTML=out;
    })
