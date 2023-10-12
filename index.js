const key = "NKNjrMbyiUNIybVps95hGfxUJ8yf1ZU4pjHtSqXqayY";

const searchInput = document.querySelector("#search-input");
const searchBtn = document.querySelector("#search-btn");
const showMore = document.querySelector("#search-show-more");
const parent = document.querySelector(".search-results");
const isdiv = parent.querySelector("div");

let page = 1;
let inputValue = "";

const SearchImage = async () => {
  try {
    inputValue = searchInput.value;

    URL = `https://api.unsplash.com/search/photos?page=${page}&query=${inputValue}&client_id=${key}`;
    const response = await fetch(URL);
    const data = await response.json();
    const results = data.results;

    console.log(URL);

    results.forEach((item) => {
      //add div child of parent (search-results)
      let searchResult = document.createElement("div");
      searchResult.setAttribute("class", "search-result");

      //add image
      let src = item.urls.small;
      let image = document.createElement("img");
      image.setAttribute("class", "search-image");
      image.setAttribute("src", src);

      //add link description
      let link = item.links.html;
      let description = document.createElement("a");
      description.setAttribute("class","search-description" );
      description.setAttribute("href", link);
      description.setAttribute("target", "_blank");
      description.textContent = item.alt_description;
 

      searchResult.appendChild(image);
      searchResult.appendChild(description);

      parent.appendChild(searchResult);
    });

    showMore.style.display = "block";

    // delete first child because it have a empty data
    const first = parent.firstElementChild;
    parent.removeChild(first);
  } catch (error) {
    console.log("Erreur lors de la requête :", error);
  }
};

searchBtn.addEventListener("click", (e) => {
  e.preventDefault();
  page = 1;
  if (isdiv) {
    parent.textContent = "";
    showMore.style.display = "none";
  }
  SearchImage();
});

showMore.addEventListener("click", (e) => {
  e.preventDefault();
  page++;
  SearchImage();
});
