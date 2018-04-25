let path = require("path");
let uploadImages = require("./upload");

const drag = document.querySelector(".drag");

window.ondragover = function(e) {
  e.preventDefault();
  drag.classList.add("drag-hover");
  console.log("dragging");
  return false;
};

window.ondragleave = drag.ondragend = () => {
  drag.classList.remove("drag-hover");
  return false;
};

window.ondrop = e => {
  e.preventDefault();
  drag.classList.remove("drag-hover");
  let file = e.dataTransfer.files[0];
  uploadImages(file.path, file.type);
  return false;
};
