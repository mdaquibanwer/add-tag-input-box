const ul = document.querySelector("ul"),
input = document.querySelector("input"),
tagCounter = document.querySelector("span"),
removeBtn = document.querySelector("button");


let totalTags = 10;

let tags = [];

const createTag = ()=>{
    ul.querySelectorAll("li").forEach(li=>{li.remove()});   // removing all li before adding to aavoid the duplicate;
    tags.slice().reverse().forEach(tag=>{
        let liTag = `<li>${tag} <i class="fas fa-xmark" onclick="remove(this, '${tag}')"></i></li>`;
        ul.insertAdjacentHTML("afterbegin",liTag);
    })
}
const remove = (element, tag)=>{
    let index = tags.indexOf(tag);
    tags = [...tags.slice(0,index),...tags.slice(index + 1)];
    tagCounter.innerText = totalTags - tags.length;
    element.parentElement.remove(tag);
}
const addTag = (e)=>{
    if(e.key == "Enter"){
        let tag = e.target.value.replace(/\s+/g,' '); // removing unwanted spaces
        if(tag.length > 1 && !tags.includes(tag)){
            if(tags.length < totalTags){
                tag.split(',').forEach(tag =>{
                    tags.push(tag);
                    createTag();
                    input.value ="";
                    tagCounter.innerText = totalTags - tags.length;
                })
            }
        }
    }
}
removeBtn.addEventListener("click",()=>{
    tags.length = 0;
    ul.querySelectorAll("li").forEach(li=>li.remove());
    tagCounter.innerText = totalTags - tags.length;
})
input.addEventListener("keyup",addTag);