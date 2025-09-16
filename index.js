/**@type {Object<string,string>} */
const languages = data


let current_language = localStorage.getItem("language")

const england_button = document.getElementById("en")
const norway_button = document.getElementById("no")

function loadLanguage(ln){
    localStorage.setItem("language",ln)
    for(const [id,text] of Object.entries(languages[ln])){
        document.getElementById(id).innerText = text
    }
}
england_button.onclick = () => loadLanguage("en")
norway_button.onclick = () => loadLanguage("no")

loadLanguage(current_language)