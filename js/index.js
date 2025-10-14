/**@type {Object<string,string>} */
const languages = data

function parseBooleanToString(x){
    if (typeof x == "boolean")
        return String(Number(x))
}
function parseStringToBoolean(x){
    if (typeof x == "string")
        return Boolean(Number(x))
}


let current_language = localStorage.getItem("language") || "no"

var highlight_translated_elements = parseStringToBoolean(localStorage.getItem("highlight")) || false

let use_dark_mode;
{
    const saved_use_dark_mode = parseStringToBoolean(localStorage.getItem("use_dark_mode"))
    use_dark_mode = typeof saved_use_dark_mode == "boolean" ? saved_use_dark_mode : true
}

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
    findMissingKeys()
    if(!highlight_translated_elements) forAllTranslatables(el=>el.style.color = "")
}


function findMissingKeys(){
    for(const element of document.querySelectorAll(`[data-translation-key]`)){
        const translation_key = element.getAttribute("data-translation-key")
        for(const [language,translations] of Object.entries(languages)){
            if(translations[translation_key] == undefined || translations[translation_key] == ""){
                console.log(`Missing translation for ${translation_key} on ${language}` )
                if(highlight_translated_elements){
                    element.style.color = "yellow"
                    if(current_language == language)
                        element.style.color = "red"
                }
            }else if(highlight_translated_elements){
                element.style.color = "green"
            }
        }
    }
}


function loadLanguage(ln){
    localStorage.setItem("language",ln)
    current_language = ln
    forAllTranslatables((el,_,text)=>{
        if(text == "") return
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
    findMissingKeys()
}
function activateButtons(){
    const england_button = document.getElementById("en")
    const norway_button = document.getElementById("no")
    if(england_button && norway_button){
        england_button.onclick = () => loadLanguage("en")
        norway_button.onclick = () => loadLanguage("no")
    }
}

function setUseDarkMode(v){
    use_dark_mode = v

    light_style_sheet.disabled = use_dark_mode
    dark_style_sheet.disabled = !use_dark_mode
    localStorage.setItem("use_dark_mode",parseBooleanToString(v))
}

const style_sheets = [...document.styleSheets]
const dark_style_sheet = style_sheets.find(v=>v.href.includes("dark.css"))
const light_style_sheet = style_sheets.find(v=>v.href.includes("light.css"))



document.addEventListener("DOMContentLoaded",()=>{
    activateButtons()
    loadLanguage(current_language)
    findMissingKeys()
    setUseDarkMode(use_dark_mode)
})