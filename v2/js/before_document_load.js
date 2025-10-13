
function parseBooleanToString(x){
    if (typeof x == "boolean")
        return String(Number(x))
}
function parseStringToBoolean(x){
    if (typeof x == "string")
        return Boolean(Number(x))
}

let use_dark_mode;
{
    const saved_use_dark_mode = parseStringToBoolean(localStorage.getItem("use_dark_mode"))
    use_dark_mode = typeof saved_use_dark_mode == "boolean" ? saved_use_dark_mode : true
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
setUseDarkMode(use_dark_mode)