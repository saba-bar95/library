// ================= BUTTONS
const newBookBtn = document.querySelector(".new-book-btn");
const addBtn = document.querySelector(".add-btn");
let statusData;

// ================= DIVS & INPUTS
const bookAdderDiv = document.querySelector(".book-adder");
const title = document.querySelector("#title");
const author = document.querySelector("#author");
const pagesDiv = document.querySelector(".pages-div");
const pages = document.querySelector("#pages");
const read = document.querySelector("#read");

// ================= PARAGRAPHS
const booksLibrary = document.querySelector(".books-library");
const tBody = document.querySelector("tbody");
const tr = document.createElement("tr");

const myLibrary = [];

function Book(title, author, read, pages) {
  this.title = title;
  this.author = author;
  this.read = read;
  this.pages = pages;
}

function displayBook(arr) {
  const tr = document.createElement("tr");
  tBody.prepend(tr);
  arr.forEach((el, i) => {
    if (arr.length - 1 !== i) return;
    else {
      for (let [key, value] of Object.entries(el)) {
        const td = document.createElement("td");
        if (value === "Not read") td.classList.add("not-read");
        if (value === "Not read" || value === "Read")
          td.classList.add("read-btn");
        if (value === "0") td.textContent = "";
        else td.textContent = value;
        tr.appendChild(td);
      }
    }
  });
  // Add functionality to not-read/read table datas
  statusData = document.querySelectorAll(".read-btn");
  statusData.forEach((el) => {
    el.addEventListener("click", function () {
      console.log(el);
      // if (el.classList.contains("not-read")) {
      //   console.log("s");
      //   el.classList.remove("not-read");
      //   el.textContent = "Read";
      //   const pageNum = prompt("How many pages have you read?");
      //   el.nextElementSibling.textContent = pageNum;
      //   return;
      // }

      // if (!el.classList.contains("not-read")) {
      //   console.log("ss");
      //   el.classList.add("not-read");
      //   el.textContent = "Not read";
      //   el.nextElementSibling.textContent = "";
      // }
    });
  });
}

// ================= EVENT LISTENERS

addBtn.addEventListener("click", function (e) {
  e.preventDefault();
  if (!title.validity.valid || !author.validity.valid) return;
  if (read.value === "Read" && pages.value === "0") {
    alert("Pages number must be higher than 0");
    return;
  }
  if (title.validity.valid && author.validity.valid) {
    const newBookObject = new Book(
      title.value,
      author.value,
      read.value,
      pages.value
    );
    myLibrary.push(newBookObject);
    displayBook(myLibrary);
    if (booksLibrary.classList.contains("hidden")) {
      booksLibrary.classList.remove("hidden");
    }
    pages.value = "0";
    title.value = author.value = "";
  }
});

newBookBtn.addEventListener("click", function () {
  if (read.value === "Read") pagesDiv.classList.remove("hidden");
  bookAdderDiv.classList.toggle("hidden");
  pages.value = "0";
  title.value = author.value = "";
});

read.addEventListener("change", function () {
  if (read.value === "Read") pagesDiv.classList.remove("hidden");
  else {
    pagesDiv.classList.add("hidden");
    pages.value = 0;
  }
});
