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
const ad = document.querySelector(".ad");
const infoBtn = document.querySelector(".info__btn");
const modallar = document.querySelector(".modals");
const overlay = document.querySelector(".overlay");

let search = "math" ;
let page = 1;
let bookslar = []
const bookmarks = []
const modals = []

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
    const bookmarkDiv = document.createElement("div");
    const bookmarkHeading = document.createElement("h2");
    const bookmarkAuthor = document.createElement("h3");
    const removeBtn = document.createElement("button");
    const bookmarkRead = document.createElement("a");


    bookmarkHeading.textContent = bookmark.volumeInfo.title;
    bookmarkAuthor.textContent = bookmark.volumeInfo.authors[0];
    removeBtn.textContent = "D";
    bookmarkRead.textContent = "R";

    removeBtn.dataset.bookmarkDeleteId= bookmark.id;

    bookmarkItem.classList.add("bookmark-item")
    bookmarkHeading.classList.add("bookmark-heading");
    bookmarkAuthor.classList.add("bookmark-author");
    removeBtn.setAttribute("class", "bookmark-delete-btn bookmark-delete");
    bookmarkRead.classList.add("bookmark-read")

    element.appendChild(bookmarkItem)
    bookmarkItem.appendChild(bookmarkDiv)
    bookmarkDiv.appendChild(bookmarkHeading);
    bookmarkDiv.appendChild(bookmarkAuthor);
    bookmarkItem.appendChild(removeBtn);
    bookmarkItem.appendChild(bookmarkRead);
  })
}
renderBookmarks(bookmarks, bookmarkedList)


elList.addEventListener("click", function(evt){
  if(evt.target.matches(".bookmark__btn")){
    const bookmarkId = evt.target.dataset.bookmarkBtnId;

 
    console.log(bookslar);

    const foundBookmark = bookslar.find(item => item.id === bookmarkId);
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
  const readBtn = document.createElement("a");


  bookmarkBtn.dataset.bookmarkBtnId = book.id;
  infokBtn.dataset.infoBtnId = book.id;
  // readBtn.dataset.readBtnID = book.id;


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
  readBtn.setAttribute("href", `${book.volumeInfo.previewLink}`)



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
    bookslar = books.items
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
  num.innerHTML = null;
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

  window.location.replace("index.html");
}); 


// modal
elList.addEventListener("click", function(evt){
  if(evt.target.matches(".info__btn")){
    const infoId = evt.target.dataset.infoBtnId;
    const foundInfo = bookslar.find(found => found.id === infoId);

    modallar.style.display = "block"
    
    
    modals.push(foundInfo);
    renderModal(modals,ad);
  }
})
modallar.addEventListener("click", function(evt){
  if(evt.target.matches(".x-logo")){
    modallar.style.display = "none"
  }
})
overlay.addEventListener("click", function(evt){
  
    modallar.style.display = "none"

})



const renderModal = function(array, htmlElement){
  ad.innerHTML = null
  array.forEach(info =>{
    ad.innerHTML = null
    const modalWrapper = document.createElement("div");
    const modalHeader = document.createElement("div");
    const modalX = document.createElement("img");
    const modalHeading = document.createElement("h2");
    const modalImg = document.createElement("img");
    const modalDesc = document.createElement("p");
    const modalAuthor = document.createElement("p");
    const modalYear = document.createElement("p");
    const modalPublisher = document.createElement("p");
    const modalCategory = document.createElement("p");
    const modalPage = document.createElement("p");

  modalHeader.classList.add("modal-header");
  modalX.classList.add("x-logo");
  modalHeading.classList.add("modal-heading");
  modalImg.classList.add("modal-img");
  modalDesc.classList.add("modal-desc");
  modalAuthor.classList.add("modal-author");
  modalYear.classList.add("modal-year");
  modalPublisher.classList.add("modal-publisher");
  modalCategory.classList.add("modal-category");
  modalPage.classList.add("modal-page");

   modalHeading.textContent = info.volumeInfo.title;
   modalImg.textContent = info.volumeInfo.imageLinks.thumbnail;
   modalDesc.textContent = info.volumeInfo.description;
   modalX.textContent = ` &#10006`;
   modalAuthor.textContent = `Authors: ${info.volumeInfo.authors}`;
   modalYear.textContent = `Published: ${info.volumeInfo.publishedDate}`
   modalPublisher.textContent = `Publishers:${info.volumeInfo.publisher}`
   modalCategory.textContent = `Categories:${info.volumeInfo.categories}`
   modalPage.textContent = `Pages Count:${info.volumeInfo.pageCount}`


   htmlElement.appendChild(modalWrapper);
   modalWrapper.appendChild(modalHeader);
   modalHeader.appendChild(modalHeading);
   modalHeader.appendChild(modalX);
   modalWrapper.appendChild(modalImg);
   modalWrapper.appendChild(modalDesc);
   modalWrapper.appendChild(modalAuthor);
   modalWrapper.appendChild(modalYear);
   modalWrapper.appendChild(modalPublisher);
   modalWrapper.appendChild(modalCategory);
   modalWrapper.appendChild(modalPage);
  
  })
}


// elList.addEventListener("click", function(evt){
//   if(evt.target.matches(".read__btn")){
//     const readId = evt.target.dataset.infoBtnId;
//     const founded = bookslar.find(found => found.id === readId);

//   }
// })
