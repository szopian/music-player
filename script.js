const container = document.querySelector(".container");
const artistImage = document.querySelector(".artist");
const media = document.querySelector(".media");
const overlay = document.querySelector(".overlay");
const serchElm = document.querySelector("#search");

const getContent = (search) => {
  const url = new URL("https://itunes.apple.com/search");
  const params = { term: search, media: "musicVideo" };
  url.search = new URLSearchParams(params);
  fetch(url, { method: "POST" })
    .then((result) => result.json())
    .then((data) => {
      console.log(data);
    });
};

getContent("nirvana");
