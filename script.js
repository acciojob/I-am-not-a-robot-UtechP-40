document.addEventListener("DOMContentLoaded", () => {
  const images = [
    { class: "img1", url: "https://picsum.photos/id/237/200/300" },
    { class: "img2", url: "https://picsum.photos/seed/picsum/200/300" },
    { class: "img3", url: "https://picsum.photos/200/300?grayscale" },
    { class: "img4", url: "https://picsum.photos/200/300/" },
    { class: "img5", url: "https://picsum.photos/200/300.jpg" },
  ];

  const imageContainer = document.getElementById("image-container");
  const resetButton = document.getElementById("reset");
  const verifyButton = document.getElementById("verify");
  const para = document.getElementById("para");

  let selectedImages = [];
  let repeatedImageClass = "";

  function shuffleImages() {
    const shuffledImages = [...images];
    const randomIndex = Math.floor(Math.random() * images.length);
    repeatedImageClass = images[randomIndex].class;
    shuffledImages.push(images[randomIndex]);
    shuffledImages.sort(() => Math.random() - 0.5);
    return shuffledImages;
  }

  function renderImages() {
    const shuffledImages = shuffleImages();
    imageContainer.innerHTML = "";
    shuffledImages.forEach((img) => {
      const imgElement = document.createElement("img");
      imgElement.src = img.url;
      imgElement.className = img.class;
      imgElement.addEventListener("click", handleImageClick);
      imageContainer.appendChild(imgElement);
    });
  }

  function handleImageClick(event) {
    const imgClass = event.target.className;
    if (selectedImages.includes(event.target)) return;

    selectedImages.push(event.target);
    event.target.classList.add("selected");

    if (selectedImages.length === 1) {
      resetButton.style.display = "block";
    } else if (selectedImages.length === 2) {
      verifyButton.style.display = "block";
    }
  }

  function resetState() {
    selectedImages.forEach((img) => img.classList.remove("selected"));
    selectedImages = [];
    resetButton.style.display = "none";
    verifyButton.style.display = "none";
    para.textContent = "";
  }

  function verifySelection() {
    if (selectedImages.length === 2) {
      const [first, second] = selectedImages;
      if (first.className === second.className) {
        para.textContent = "You are a human. Congratulations!";
      } else {
        para.textContent = "We can't verify you as a human. You selected the non-identical tiles.";
      }
      verifyButton.style.display = "none";
    }
  }

  resetButton.addEventListener("click", resetState);
  verifyButton.addEventListener("click", verifySelection);

  renderImages();
});
