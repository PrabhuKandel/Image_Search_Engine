document.addEventListener("DOMContentLoaded", function () {
  let accessKey = "MkbL9EpAa_U1QPzBH-LwXH5vfB1n0WGDzUEUXZ5ABh0";
  const searchButton = document.querySelector(".search-button");
  const showMore = document.querySelector(".show-more");
  const searchBox = document.getElementById("search-box");
  const resultContainer = document.getElementById("result-container");
  const voiceIcon = document.getElementById("voice-icon");

  let page = 1;
  async function imageSearch(text = "") {
    let keyword = searchBox.value;

    if (text) {
      keyword = text;
    }
    console.log(keyword);
    const url = `https://api.unsplash.com/search/collections?page=${page}&query=${keyword}&client_id=${accessKey}`;
    const response = await fetch(url);
    const data = await response.json();
    const results = data.results;
    console.log(results);
    if (page === 1) {
      resultContainer.innerHTML = "";
    }

    results.forEach((element) => {
      const image = document.createElement("img");
      const imageLink = element.links.self;
      const imageSrc = element.cover_photo.urls.small;

      image.src = imageSrc;

      resultContainer.appendChild(image);
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
    console.log(page);
    imageSearch();
  });

  // on voice icon click event
  voiceIcon.addEventListener("click", function () {
    if ("SpeechRecognition" in window || "webkitSpeechRecognition" in window) {
      // Create a new instance of SpeechRecognition
      const recognition = new (window.SpeechRecognition ||
        window.webkitSpeechRecognition)();

      recognition.lang = "en-US"; // Set language to US English
      recognition.interimResults = true; // Show intermediate result also

      //Recording starts here
      recognition.start();

      // Add event listener for the 'result' event
      recognition.onresult = function (event) {
        console.log(event);
        const transcript = event.results[0][0].transcript;
        searchBox.value = transcript;
        imageSearch(transcript);
        // Output the transcript to the console
        console.log("Transcript:", transcript);
      };

      // Add event listener for the 'error' event
      recognition.onerror = function (event) {
        // Output the error to the console
        console.error("Speech recognition error:", event.error);
      };
    }
  });
});
