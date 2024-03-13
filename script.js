document.addEventListener("DOMContentLoaded", function () {
  let accessKey = "OHObcEnDxKcftuYnTp0qJ5mZ3ErMg39uzaQaw5UBBJ8JPBMjL0OXnkWw"; // accessKey = "YourAccessKey"
  const searchButton = document.querySelector(".search-button");
  const showMore = document.querySelector(".show-more");
  const searchBox = document.getElementById("search-box");
  const resultContainer = document.getElementById("result-container");

  let page = 1;
  let perPage = 15;
  let temp = "";

  async function imageSearch() {
    let keyword = searchBox.value;

    const url = `https://api.pexels.com/v1/search?query=${keyword}&page=${page}&per_page=${perPage}`;
    const response = await fetch(url, {
      headers: { Authorization: accessKey },
    });

    const data = await response.json();

    console.log(data);

    const results = data.photos;
    //if new keyword then remove previous data

    if (temp != keyword) {
      console.log(temp, keyword);
      if (document.querySelector(".result-content")) {
        resultContainer.innerHTML = "";
      }
    }
    temp = keyword;

    results.forEach((element) => {
      const resultContent = document.createElement("div");
      resultContent.classList.add("result-content");
      resultContainer.appendChild(resultContent);
      //create image info tag
      const resultInfo = document.createElement("div");
      resultInfo.classList.add("result-info");
      resultContent.appendChild(resultInfo);

      resultContent.classList.add("result-content");
      //create image tag
      const image = document.createElement("img");
      const imageLink = element.url;
      const imageSrc = element.src.large;

      image.src = imageSrc;

      resultContent.appendChild(image);

      // anchor for download icon
      const anchorTagDownload = document.createElement("a");
      anchorTagDownload.setAttribute("target", "_blank");
      anchorTagDownload.href = element.url;
      resultInfo.appendChild(anchorTagDownload);

      //download icon
      let downloadIcon = document.createElement("i");
      downloadIcon.classList.add("fa-solid", "fa-eye");
      anchorTagDownload.appendChild(downloadIcon);
      //anchor tag
      const anchorTagLink = document.createElement("a");
      anchorTagLink.setAttribute("target", "_blank");
      anchorTagLink.href = element.photographer_url;
      resultInfo.appendChild(anchorTagLink);

      //create camera container
      const cameraContainer = document.createElement("div");
      cameraContainer.classList.add("camera-container");
      anchorTagLink.appendChild(cameraContainer);

      //create camera icon and add in info
      const cameraIcon = document.createElement("i");
      cameraIcon.classList.add("fa-solid", "fa-camera");
      cameraContainer.appendChild(cameraIcon);

      //paragraph for photographer
      const photographerName = document.createElement("p");
      photographerName.classList.add("photographer-name");
      photographerName.innerText = element.photographer;
      cameraContainer.appendChild(photographerName);
    });
    showMore.style.display = "block";
  }

  //On mouse click
  searchButton.addEventListener("click", function (e) {
    e.preventDefault();
    imageSearch();
  });

  // on enter key
  searchBox.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      imageSearch();
    }
  });

  showMore.addEventListener("click", function () {
    page++;
    imageSearch();
  });
});
