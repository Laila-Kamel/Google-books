
export const createDiv=(divClassName,parent,id,)=>{
    const divel=document.createElement("div");
    // const element=document.createElement(type);
    // const text=document.createTextNode(str);
    // element.appendChild(text);
    // element.classList.add(className);
    // parent.appendChild(element);
    
    divel.classList.add(divClassName)
    divel.setAttribute('data-bs-toggle',"modal")
    divel.setAttribute('data-bs-target',"#exampleModal")
    divel.id=id;
    parent.appendChild(divel);
}

export const createElement=(type,str,parent,className)=>{
    const element=document.createElement(type);
    const text=document.createTextNode(str);
    element.appendChild(text);
    element.classList.add(className);
    parent.appendChild(element);
}

export const createImage=(parent,className,source)=>{
    const img=document.createElement("img");
    img.src=source;
    parent.appendChild(img)
    img.classList.add(className)
}

export default createElement;