export const timeSet = (ms)=>{
    return new Promise((r) => {setTimeout(r, ms)})
}

export const clearLog = ()=> {
    return new Promise((r) => {console.clear(), r()})
}
