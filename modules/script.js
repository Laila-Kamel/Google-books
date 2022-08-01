import getBooksInfo from "./display.js"
import searchWord from "./search.js"
import { displayBooks,displayTitles} from "./display.js";

const form = document.getElementById("bookForm");
const books = document.getElementById("books");
let inputField = document.querySelector(".inputText__input");
const searchBlock=document.querySelector(".inputText__searchBlock");

const display=async(bName)=>{
  const data= await getBooksInfo(bName);
  return displayBooks(data);
}
display("potter");


form.addEventListener("submit", (e) => {
  e.preventDefault();
  while(searchBlock.firstChild){
    searchBlock.removeChild(searchBlock.firstChild)
   }

  let bookName=searchWord(form);
const booksDisplayedArr=books.childNodes.length;
if(booksDisplayedArr>1){
  console.log(books.hasChildNodes());
  while(books.firstChild){
    books.removeChild(books.firstChild)
  }
  // books.removeChild(books.children);
}
  getBooksInfo(bookName).then(books=>displayBooks(books))
});

let searchWd="";
  inputField.addEventListener("keyup",()=>{
    searchWd=inputField.value;
    console.log(searchWd);
   while(searchBlock.firstChild){
    searchBlock.removeChild(searchBlock.firstChild)
   }
    getBooksInfo(searchWd).then(data=>displayTitles(data)).then(putSelectedTitleInInputField)
  
  });

const putSelectedTitleInInputField=()=>{
  const blkBtnText=document.querySelectorAll(".searchBlock__btn");
  for(let i=0;i<blkBtnText.length;i++){

  //  let searchWdIg=new RegExp('('+searchWd+')','gi')
// let searchWdUpper=searchWd.toUpperCase();
// const regextest=new RegExp('('+searchWd+')','gi')
// // let matchingWrd=searchWd.match(/('+searchWd+'),gi/)
// let matchingWrd=searchWd.match(regextest)

// console.log(matchingWrd);
//     blkBtnText[i].innerHTML= blkBtnText[i].innerHTML.replace(searchWd,`<span>${searchWd}</span>`);
    
//     blkBtnText[i].innerHTML= blkBtnText[i].innerHTML.replace(searchWdUpper,`<span>${searchWdUpper}</span>`);

//     blkBtnText[i].innerHTML= blkBtnText[i].innerHTML.replace(matchingWrd,`<span>${matchingWrd}</span>`);

 

//     console.log(blkBtnText[i].innerHTML);

  blkBtnText[i].addEventListener("click",(e)=>{
    console.log(e.target.innerHTML); 
    
    inputField.value="";
    inputField.value=e.target.innerHTML;
    searchBlock.style.display="none";
    getBooksInfo(/(`${inputField.value}`)/).then(data=>displayTitles(data))
    })
    
}
}

