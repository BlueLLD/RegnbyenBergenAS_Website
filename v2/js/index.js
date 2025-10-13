/**@type {Object<string,string>} */
const languages = data

let current_language = localStorage.getItem("language") || "no"

var highlight_translated_elements = parseStringToBoolean(localStorage.getItem("highlight")) || false

/**
 * @param {(element:HTMLElement,key:String,text:String)=>void} callback 
 * @param {String} ln 
 */
function forAllTranslatables(callback,ln){
    for(const [key,text] of Object.entries(languages[ln || current_language])){
        document.querySelectorAll(`[data-translation-key=${key}]`).forEach(element=>{
            callback(element,key,text)
        })
    }
}

function toggleHighlight(){   
    highlight_translated_elements = !highlight_translated_elements  
    localStorage.setItem("highlight",parseBooleanToString(highlight_translated_elements)) 
    highlight(highlight_translated_elements)
}

function highlight(state){
    forAllTranslatables(el=>el.style.color = state ? "red" : "")
}

function findMissingKeys(){
    for(const element of document.querySelectorAll(`[data-translation-key]`)){
        const translation_key = element.getAttribute("data-translation-key")
        for(const [language,translations] of Object.entries(languages)){
            if(translations[translation_key] == undefined || translations[translation_key] == ""){
                console.log(`Missing translation for ${translation_key} on ${language}` )
            }
        }
    }
}


function loadLanguage(ln){
    localStorage.setItem("language",ln)
    forAllTranslatables((el,_,text)=>{
        if(text == "") {
            el.style.color = "red"
            return
        }
        const sub_query = el.getAttribute("data-on-sub-elements")
        if(sub_query){
            el.querySelectorAll(sub_query).forEach(el=>{
                el.innerHTML = text
                highlight_translated_elements && (el.style.color = "green")
            })
            return
        }
        el.innerHTML = text
        highlight_translated_elements && (el.style.color = "green")
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
loadLanguage(current_language)
findMissingKeys()