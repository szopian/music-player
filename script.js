const container = document.querySelector(".container");
const artistImage = document.querySelector(".artist");
const media = document.querySelector(".media");
const overlay = document.querySelector(".overlay");
const searchElm = document.querySelector("#search");

searchElm.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    getContent(searchElm.value);
  }
});

const getContent = (search) => {
  const url = new URL("https://itunes.apple.com/search");
  const params = { term: search, media: "musicVideo" };
  url.search = new URLSearchParams(params);
  fetch(url, { method: "POST" })
    .then((result) => result.json())
    .then((data) => {
      const resultHTML = data.results
        .map(
          (result) => `
        <div style="background-image: url(${result.artworkUrl100});"
        onclick="openMedia('${result.previewUrl}', '${result.trackCensoredName}')" class="result"></div>
      `
        )
        .join("");
      container.innerHTML = resultHTML;
    });
};

const openMedia = (url, title) => {
  media.innerHTML = `<video controls autoplay src="${url}"></video><p>${title}</p>`;
};
