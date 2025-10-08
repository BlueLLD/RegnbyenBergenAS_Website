/**@type {Object<string,string>} */
const languages = data


let current_language = localStorage.getItem("language") || "no"

var highlight_translated_elements = localStorage.getItem("highlight") || false

/**
 * @param {(element:HTMLElement,key:String,text:String)=>void} callback 
 * @param {String} ln 
 */
function forAllTranslatables(callback,ln){
    for(const [key,text] of Object.entries(languages[ln || current_language])){
        document.querySelectorAll(`[translation_key=${key}]`).forEach(element=>{
            callback(element,key,text)
        })
    }
}

function toggleHighlight(){   
    highlight_translated_elements = !highlight_translated_elements  
    localStorage.setItem("highlight",highlight_translated_elements) 
    highlight(highlight_translated_elements)
}

function highlight(state){
    forAllTranslatables(el=>el.style.color = state ? "red" : "")
}


function loadLanguage(ln){
    localStorage.setItem("language",ln)
    forAllTranslatables((el,_,text)=>{
        el.innerText = text
        highlight_translated_elements && (el.style.color = "red")
    },ln)
}
function activateButtons(){
    const england_button = document.getElementById("en")
    const norway_button = document.getElementById("no")
    if(england_button && norway_button){
        england_button.onclick = () => loadLanguage("en")
        norway_button.onclick = () => loadLanguage("no")
    }
}
activateButtons()
highlight(highlight_translated_elements)