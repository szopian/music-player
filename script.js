const container = document.querySelector(".container");
const artistImage = document.querySelector(".artist");
const media = document.querySelector(".media");
const overlay = document.querySelector(".overlay");
const searchElem = document.querySelector("#search");

const getContent = (search) => {
  const url = new URL("https://itunes.apple.com/search");
  const params = { term: search, media: "musicVideo" };
  url.search = new URLSearchParams(params);
  fetch(url, { method: "POST" })
    .then((result) => result.json())
    .then((data) => {
      // console.log(data.results[0].artistViewUrl);
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
  media.classList.remove("hidden");
  toggleOverlay();
};

const closeMedia = () => {
  media.innerHTML = " ";
  toggleOverlay();
};

const toggleOverlay = () => {
  overlay.classList.toggle("blur");
  document
    .querySelectorAll(".result")
    .forEach((result) => result.classList.toggle("blur"));
};

overlay.addEventListener("click", closeMedia);

searchElem.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    getContent(searchElem.value);
    searchElem.blur();
    toggleOverlay();
  }
});
