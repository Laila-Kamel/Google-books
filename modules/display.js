import createElement from "./DOM-utils.js";
import { createImage } from "./DOM-utils.js";
import { createDiv } from "./DOM-utils.js";

const bks = document.getElementById("books");
const searchBlock=document.querySelector(".inputText__searchBlock");


export const getBooksInfo = async (bkName) => {
 
  const response = await fetch(
    `https://www.googleapis.com/books/v1/volumes?q=${bkName}+intitle:${bkName}`
  );
  const data = await response.json();
  console.log(data);
  const items = data.items;
  return items.map((book) => {
    if(book.volumeInfo.hasOwnProperty("imageLinks"))
    return [
    book.volumeInfo.title,
    book.volumeInfo.authors,
    book.volumeInfo.description,
    book.volumeInfo.imageLinks.thumbnail,
  ]
  return [
    book.volumeInfo.title,
    book.volumeInfo.authors,
    book.volumeInfo.description,
  ]
});
 
};

export const displayBooks = (booksArr) => {
  booksArr.map((book,index) => {
    let title = book[0];
    let author = book[1];
    let desc = book[2];
    
    createDiv( "book",bks,`book${index}`);
    const bk = document.getElementById(`book${index}`);
    if(book.length==4){
      let imgsrc = book[3];
      createImage(bk, "book__img", imgsrc);
    }
    createElement("h2", title, bk, "book__title");
    if(author!=undefined){
      createElement("p", author, bk, "book__author");
    }
    if(desc!=undefined)
    createElement("p", `"${desc}"`, bk, "book__description");
    
  });
};

export const displayTitles = (booksArr) => {
  booksArr.map((book) => {
    let title = book[0];
   createElement("button", title, searchBlock, "searchBlock__btn");
 
  });
};



export default getBooksInfo;


