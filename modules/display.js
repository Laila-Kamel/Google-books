import createElement from "./DOM-utils.js";
import { createImage } from "./DOM-utils.js";
import { createDiv } from "./DOM-utils.js";

const bks = document.getElementById("books");
const searchBlock = document.querySelector(".inputText__searchBlock");

export const getBooksInfo = async (bkName) => {
  // bkName = bkName.split(" ").join("+");
  console.log(bkName);
  const response = await fetch(
    `https://www.googleapis.com/books/v1/volumes?q=${bkName}+intitle:${bkName}`
  );
  const data = await response.json();
  console.log(data);
  const items = data.items;
  return items.map((book) => {
    if (book.volumeInfo.hasOwnProperty("imageLinks"))
      return [
        book.volumeInfo.title,
        book.volumeInfo.authors,
        book.volumeInfo.description,
        book.id,
        book.volumeInfo.imageLinks.thumbnail,
      ];
    return [
      book.volumeInfo.title,
      book.volumeInfo.authors,
      book.volumeInfo.description,
      book.id,
    ];
  });
};

export const displayBooks = async (term) => {
  const booksArr = await getBooksInfo(term);
  booksArr.map((book, index) => {
    let title = book[0];
    let author = book[1];
    let desc = book[2];
    let bookID = book[3];

    createDiv("book", bks, bookID);
    const bk = document.getElementById(bookID);
    if (book.length == 5) {
      let imgsrc = book[4];
      createImage(bk, "book__img", imgsrc);
    }
    createElement("h2", title, bk, "book__title");
    if (author != undefined) {
      createElement("p", author, bk, "book__author");
    }
    if (desc != undefined)
      createElement("p", `"${desc}"`, bk, "book__description");
      booksInformationOnClick()
  });
  
};

// export const displayBooks = (booksArr) => {
//   booksArr.map((book,index) => {
//     let title = book[0];
//     let author = book[1];
//     let desc = book[2];

//     createDiv( "book",bks,`book${index}`);
//     const bk = document.getElementById(`book${index}`);
//     if(book.length==4){
//       let imgsrc = book[3];
//       createImage(bk, "book__img", imgsrc);
//     }
//     createElement("h2", title, bk, "book__title");
//     if(author!=undefined){
//       createElement("p", author, bk, "book__author");
//     }
//     if(desc!=undefined)
//     createElement("p", `"${desc}"`, bk, "book__description");

//   });
// };

export const displayTitles = async (wrd) => {
  const booksArr = await getBooksInfo(wrd);
  booksArr.map((book) => {
    let title = book[0];
    createElement("button", title, searchBlock, "searchBlock__btn");
  });
};

export const getBookById = async (id) => {
  const response = await fetch(
    `https://www.googleapis.com/books/v1/volumes/${id}`
  );
  const data = await response.json();
  console.log(data);
  return data;
};

export const displayBookByID = (bookInfo) => {
  // const bookInfo=await getBookById(id);
  const bookInfoArr = [];
  bookInfoArr.push(bookInfo.volumeInfo.title);
  bookInfoArr.push(bookInfo.volumeInfo.publisher);
  bookInfoArr.push(bookInfo.volumeInfo.publishedDate);
  bookInfoArr.push(bookInfo.volumeInfo.averageRating);
  bookInfoArr.push(bookInfo.saleInfo.country);
  // return bookInfoArr;
  let modalTitle = document.getElementById("exampleModalLabel");
  const modalBody = document.querySelector(".modal-body");
  modalTitle.innerHTML=bookInfo.volumeInfo.title;
  while(modalBody.firstChild){
modalBody.removeChild(modalBody.firstChild)
  }
 createElement("p",`Publisher: ${bookInfo.volumeInfo.publisher}`,modalBody)
 createElement("p",`Published Date: ${bookInfo.volumeInfo.publishedDate}`,modalBody)
 createElement("p",`Average Rating: ${bookInfo.volumeInfo.averageRating}`,modalBody)
 createElement("p",`Country: ${bookInfo.saleInfo.country}`,modalBody)
};

export const booksInformationOnClick=()=>{

  const booksCards=document.querySelectorAll(".book__title");
  for (let i = 0; i < booksCards.length; i++) {
    booksCards[i].addEventListener("click", (e) => {
      
      console.log(e.target.parentElement.id);
      let bookID=e.target.parentElement.id;
      // getBookById(bookID).then(displayBookByID)
      displayBookByID(bookID)
    });
  }
}

export const displayDataIntoModal = (bkInfoArr) => {};
export default getBooksInfo;
