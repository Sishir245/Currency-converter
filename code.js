// Currency converter
const BASE_URL=`https://api.exchangerate-api.com/v4/latest/`;
const dropdown = document.querySelectorAll(".dropdown select");
const fromCurr= document.querySelector(".from select");
const toCurr= document.querySelector(".to select");
let msg=document.querySelector(".msg")
msg.innerText =`1 INR = 1.6 NPR`;
const btn = document.querySelector("button");
for(let select of dropdown){
    for (let code in countryList){
        let newOption = document.createElement("option")   
        newOption.innerText= code;
        if(select.name==="from"&& code=="INR"){
            newOption.selected="selected";
        } else if(select.name==="to" && code=="NPR"){
            newOption.selected="selected";
        }
        select.append(newOption);
    }    
    select.addEventListener("change",(evt)=>{
        updateFlag(evt.target);
    });
}
const updateFlag = (element)=>{
    let code=element.value;
    let countryCode = countryList[code];
    let newSrc =`https://flagsapi.com/${countryCode}/flat/64.png`;
    let img= element.parentElement.querySelector("img");
    img.src=newSrc;
}
btn.addEventListener("click", async(evt)=>{
    evt.preventDefault();
    let amount= document.querySelector(".amount input")
    let amtVal=amount.value;
    if(amtVal===""|| amtVal<=0) {
        alert("Number should be positive number.");
        msg.innerText="";
        amtVal=0;
        amount.value="1";
    }   
    const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}`;
    let response = await fetch(URL);
    let data = await response.json();
    let rate = data.rates[toCurr.value];
    let finalAmount= amtVal * rate;
    msg.innerText=`${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
});