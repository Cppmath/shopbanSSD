import renderSP from "./index.js"
const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

export const filterBtn = $('.sidebar-filter-btn')
var rulesFilter = []


var filterSP = (product,index) => {
    for(let i = 0; i< rulesFilter.length; i++){
        if(!product.typeSP.includes(rulesFilter[i])){
            return false
        }
    };
    return true
}
filterBtn.onclick = () => {
    const rulesCheck = $$('input[name]:checked')
    console.log(rulesCheck)
    rulesCheck.forEach(ruleCheck => {
        rulesFilter.push(ruleCheck.value)
    })
    renderSP(filterSP)
    rulesFilter = []
}