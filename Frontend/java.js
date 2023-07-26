var form=document.getElementById('form')

form.addEventListener('submit', function(e){
 e.preventDefault()

 var url=document.getElementById('url').value

 fetch('http://localhost:3000/shorten', {
  method: 'POST',
  body: JSON.stringify({
    longUrl:url,
  }),
  headers: {
    'Content-type': 'application/json; charset=UTF-8',
  }
  })
  .then(function(response){ 
  return response.json()})
  .then(function(data)
  {     
        if(data.status===true){
      //   fetch(`http://localhost:3000/${data.url.urlCode}`,{
      //       method: 'GET',
      //       mode: "no-cors"
      //  }).then(function(response){
      //   return console.log("success")});
        document.getElementById('url').value = data.url.shortUrl;
        document.getElementById('btn').value = "Result";
      }
      else{
        document.getElementById('url').value = data.message;
      }
}).catch(error => console.log('Error:', error)); 
});