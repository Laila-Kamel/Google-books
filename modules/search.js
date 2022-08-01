
  export const searchWord=(frm)=>{
    const formDta = new FormData(frm);
    const bookName = formDta.get("book");
    return bookName;
}




  export default searchWord;