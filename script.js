"use strict";
const elList = document.querySelector(".list");
const num = document.querySelector(".num-wrap");
const prevBtn = document.querySelector(".prev-btn");
const nextBtn = document.querySelector(".next-btn");
const logout = document.querySelector(".logout");
const resultNum = document.querySelector(".number__books");
const input = document.querySelector(".header__input");
const elFormInput = document.querySelector(".form__header");
const orderBy = document.querySelector(".sort__wrapper");
const bookmarkedList = document.querySelector(".bookmark__list");

let search = "harry" ;
let page = 1;
 
const bookmarks = []
console.log(bookmarks);

bookmarkedList.addEventListener("click", function(evt){
  if(evt.target.matches(".bookmark-delete-btn")){
    const bookmarkDeleteId = evt.target.dataset.bookmarkDeleteId;
    const foundBookmarkIndex = bookmarks.findIndex((bookmark) => bookmark.id === bookmarkDeleteId);
  bookmarks.splice(foundBookmarkIndex, 1);

  bookmarkedList.innerHTML = null;

  renderBookmarks(bookmarks, bookmarkedList);

  window.localStorage.setItem("bookmarks", JSON.stringify(bookmarks));

  if(bookmarks.length === 0){
    window.localStorage.removeItem("bookmarks");
  }
  renderBookmarks(bookmarks, bookmarkedList);
  }
})


const renderBookmarks = function(array, element){
  bookmarkedList.innerHTML = null;
  array.forEach(bookmark => {
    const bookmarkItem = document.createElement("li");
    const bookmarkHeading = document.createElement("h2");
    const removeBtn = document.createElement("button");

    bookmarkHeading.textContent = bookmark.volumeInfo.title;
    removeBtn.textContent = "remove"

    removeBtn.dataset.bookmarkDeleteId= bookmark.id;

    bookmarkItem.classList.add(".bookmark-item")
    removeBtn.setAttribute("class", "bookmark-delete-btn")

    element.appendChild(bookmarkItem)
    bookmarkItem.appendChild(bookmarkHeading);
    bookmarkItem.appendChild(removeBtn);
  })
}
renderBookmarks(bookmarks, bookmarkedList)


elList.addEventListener("click", function(evt){
  if(evt.target.matches(".bookmark__btn")){
    const bookmarkId = evt.target.dataset.bookmarkBtnId;

 

    const foundBookmark = books[0].find(item => item.id === bookmarkId);
    const x = bookmarks.find(e => e.id == bookmarkId);

    if(!x){
      bookmarks.push(foundBookmark)
    }
    bookmarkedList.innerHTML= null;

    window.localStorage.setItem("bookmarks", JSON.stringify(bookmarks))

    renderBookmarks(bookmarks, bookmarkedList)
  }  
});




const renderBooks = function(arr, htmlElement){


arr.forEach(book => {
    // Create element
  const newItem = document.createElement("li");
  const wrapper = document.createElement("div");
  const itemImg = document.createElement("img");
  const itemHeading = document.createElement("h3");
  const itemText = document.createElement("p");
  const itemYear = document.createElement("p");
  const bookmarkBtn = document.createElement("button");
  const infokBtn = document.createElement("button");
  const readBtn = document.createElement("button");


  bookmarkBtn.dataset.bookmarkBtnId = book.id;


//   setAtribute
 newItem.classList.add("list__item");
 wrapper.classList.add("item__wrapper");

  itemImg.setAttribute("src", book.volumeInfo.imageLinks.smallThumbnail);
  itemImg.classList.add("item__img");
  
  itemHeading.textContent = book.volumeInfo.title;
  itemHeading.classList.add("item__heading");

  itemText.textContent = book.volumeInfo.authors;
  itemText.classList.add("item__text");

  itemYear.textContent = book.volumeInfo.publishedDate;
  itemYear.classList.add("item__year");

  bookmarkBtn.textContent = "Bookmark";
  bookmarkBtn.setAttribute("class", "bookmark__btn");

  infokBtn.textContent = "MoreInfo";
  infokBtn.classList.add("info__btn");

  readBtn.textContent = "Read";
  readBtn.classList.add("read__btn");


//   appendChild
  htmlElement.appendChild(newItem);
  newItem.appendChild(wrapper);
  wrapper.appendChild(itemImg);
  wrapper.appendChild(itemHeading);
  wrapper.appendChild(itemText);
  wrapper.appendChild(itemYear);
  wrapper.appendChild(bookmarkBtn);
  wrapper.appendChild(infokBtn);
  wrapper.appendChild(readBtn);



});


}
let and = "&"


const getBooks = async function(){
    elList.innerHTML = null
   
   try{
    const request = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${search}+${page}${and}`);

    const  books = await request.json();
    console.log(books);
   renderBooks(books.items, elList)
   btns(books, num);
  
   resultNum.textContent = books.totalItems;

   } catch (err) {
    console.error(err);
  }
 
}
getBooks()
orderBy.addEventListener("click", () => {
  and = "&";
  and += "orderByNewest";
  getBooks();
})



// pagination
function btns(arr){
      for(let i = 1; i < Math.ceil(arr.totalItems / 10); i++){

        const numBtn = document.createElement("button");
        numBtn.classList.add("btns");

        numBtn.textContent = i;

        num.appendChild(numBtn);
         
        // resultNum.textContent = books.totalItems;


      }
}
prevBtn.addEventListener("click", function () {
  if (page > 1) {
    page--;
}

  getBooks();
});

  nextBtn.addEventListener("click", function () {
  page++;

  getBooks();
});
num.addEventListener("click", function(evt){


  page = evt.target.textContent;
  getBooks()

})



// input value 
elFormInput.addEventListener("submit", function(evt){
  evt.preventDefault()
  search = input.value;
  elList.innerHTML = null;
  getBooks()
})
  
// logoyt
const token = window.localStorage.getItem("token");

if (!token) {
  window.location.replace("login.html");
}

logout.addEventListener("click", function () {
  window.localStorage.removeItem("token");

  window.location.replace("login.html");
}); 


// modal
