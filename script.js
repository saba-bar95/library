// ================= BUTTONS
const newBookBtn = document.querySelector(".new-book-btn");
const addBtn = document.querySelector(".add-btn");
let statusData;
let deleteBtns;

// ================= DIVS & INPUTS
const bookAdderDiv = document.querySelector(".book-adder");
const booksLibrary = document.querySelector(".books-library");
const title = document.querySelector("#title");
const author = document.querySelector("#author");
const pagesDiv = document.querySelector(".pages-div");
const pages = document.querySelector("#pages");
const read = document.querySelector("#read");
const tBody = document.querySelector("tbody");
const tr = document.createElement("tr");

const myLibrary = [];
const defaultLibrary = [
  {
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    read: "Read",
    pages: 600,
    remove: "",
  },
  {
    title: "The Adventures of Huckleberry Finn",
    author: "Mark Twain",
    read: "Read",
    pages: 500,
    remove: "",
  },
  {
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    read: "Not read",
    pages: "",
    remove: "",
  },
];

displayBook(defaultLibrary);

function Book(title, author, read, pages, remove) {
  this.title = title;
  this.author = author;
  this.read = read;
  this.pages = pages;
  this.remove = remove;
}

function displayBook(arr) {
  arr.forEach((el, i) => {
    if (
      arr.length - 1 !== i &&
      Object.getPrototypeOf(arr[i]) === Book.prototype
    ) {
      return;
    } else {
      const tr = document.createElement("tr");
      tBody.prepend(tr);
      for (let [key, value] of Object.entries(el)) {
        const td = document.createElement("td");
        if (value === "Not read") td.classList.add("not-read");
        if (value === "Not read" || value === "Read") {
          td.classList.add("read-btn");
        }
        if (
          (value === "Not read" || value === "Read") &&
          Object.getPrototypeOf(arr[i]) === Book.prototype
        ) {
          td.classList.add("new-btn");
        }
        if (
          (value === "Not read" || value === "Read") &&
          Object.getPrototypeOf(arr[i]) !== Book.prototype
        ) {
          td.classList.add("default-btn");
        }
        if (value === "0") td.textContent = "";
        else td.textContent = value;
        tr.appendChild(td);
        let removeBtn;
        if (key === "remove") {
          removeBtn = document.createElement("button");
          removeBtn.textContent = "Delete";
          removeBtn.classList.add("remove-btn");
          td.appendChild(removeBtn);
        }
      }
    }
  });
  statusData = document.querySelectorAll(".read-btn");
  statusDataChange(statusData);
  deleteBtns = document.querySelectorAll(".remove-btn");
  deleteRow(deleteBtns);
}

// Add functionality to not-read/read table datas
function statusDataChange(arr) {
  arr.forEach((el, i) => {
    if (el !== arr[0] && arr[i].classList.contains("new-btn")) return;
    if (arr[i].classList.contains("default-btn") && myLibrary.length > 0)
      return;
    if (
      arr.length > defaultLibrary.length &&
      !arr[i].classList.contains("new-btn")
    )
      return;
    else {
      el.addEventListener("click", function () {
        if (el.classList.contains("not-read")) {
          el.classList.remove("not-read");
          el.textContent = "Read";
          let pageNum = +prompt("How many pages have you read?");
          while (isNaN(pageNum) || pageNum === 0) {
            pageNum = +prompt(
              "How many pages have you read? (please enter only number)"
            );
          }
          el.nextElementSibling.textContent = pageNum;
          return;
        }
        if (!el.classList.contains("not-read")) {
          el.classList.add("not-read");
          el.textContent = "Not read";
          el.nextElementSibling.textContent = "";
        }
      });
    }
  });
}

function deleteRow(arr) {
  arr.forEach((el) => {
    if (el !== arr[0] && arr.length > defaultLibrary.length) return;
    el.addEventListener("click", function () {
      el.parentElement.parentElement.remove();
    });
  });
}

// ================= EVENT LISTENERS

addBtn.addEventListener("click", function (e) {
  e.preventDefault();
  if (!title.validity.valid || !author.validity.valid) {
    alert("Please, fill all the fields");
    return;
  }
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
