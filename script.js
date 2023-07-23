const newBookBtn = document.querySelector(".new-book-btn");
const bookAdderDic = document.querySelector(".book-adder");

newBookBtn.addEventListener("click", function () {
  bookAdderDic.classList.toggle("hidden");
});

let myLibrary = [];

function Book() {}

function addBookToLibrary() {
  myLibrary.push("dsadas");
  myLibrary.push("sss");
}
