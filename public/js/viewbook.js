




  
  fetch("/home/viewbook", {
    method: "POST"
  })
    .then((response) => {
      return response.json();
    })
    .then((responseData) => {
      let upload=[]
      let name=[]
      let book=[];
      for(let i=0;i<responseData.length;i++){
        book[i]=responseData[i].bookid;
        upload[i]=`/upload/${responseData[i].upload}`
        name[i]=responseData[i].bookname
      }
      let image = document.getElementById("bid");
      let bookname=document.getElementById("bookname");
      let outputimage = "";
      let bid="";
      if (Array.isArray(responseData) && responseData.length > 0) {
        for (let i=0;i<upload.length&&i<name.length;i++) {
          {
            const urlParams = new URLSearchParams(window.location.search);
            urlParams.set('bid', book[i]);
            const newUrl = "/home/bookdetail"+ '?' + urlParams.toString();
            bid +=   `<a href=${newUrl}>`
            
          }
        }
      } else {
        out = "<p>No books found</p>";
      }


        image.outerHTML = bid;
      // bookname.outerHTML=outputbookname;
    });
  // <a href=${newUrl}>






  