fetch("https://meme-api.herokuapp.com/gimme")
  .then((res) => {
    return res.json();
  })
  .then((json) => {
    console.log(json);
    document.querySelector("img").src = json.url;
    document.querySelector("h1").innerText = json.title;
  })
  .catch((err) => {
    console.log(err);
  });
