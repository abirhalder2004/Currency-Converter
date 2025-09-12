let baseUrl = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

let dropdowns = document.querySelectorAll(".dropdown select")

let button = document.querySelector("button");

let fromCurr = document.querySelector(".from select");

let toCurr = document.querySelector(".to select");

let msg = document.querySelector(".msg");


for(let select of dropdowns ){
         for(let curr_code in countryList){
               let newOptions = document.createElement("option");
               newOptions.innerText = curr_code
               newOptions.value = curr_code
               if(select.name === "from" && curr_code === "INR"){
                              newOptions.selected = "selected";
               }else if(select.name === "to" && curr_code === "USD") {
                              newOptions.selected = "selected";
               }
               select.append(newOptions);
            };
               select.addEventListener(("change"),(response)=>{
                  updateFlag(response.target);
               });
               };


               
function updateFlag(target){
      let curr_code = target.value;
      let country_code = countryList[curr_code];
      let newSrc = `https://flagsapi.com/${country_code}/flat/64.png`;
      let img = target.parentElement.querySelector("img");
      img.src = newSrc;
}

window.addEventListener("load", ()=>{
      updateExchaneRate()
});


button.addEventListener("click", async (event)=>{
      event.preventDefault();
      updateExchaneRate();
})

async function updateExchaneRate() {
      let amount = document.querySelector("input")
      if(amount.value == "" || amount.value < 1){
            amount.value = 1
      }
      console.log(fromCurr.value, toCurr.value)
      let url = `${baseUrl}/${fromCurr.value.toLowerCase()}.json`;
      let response = await fetch(url);
      let data = await response.json();
      console.log(response);
      console.log(data)
      let rate = data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()]
      console.log(`Rate : 1 ${fromCurr.value} = ${rate} ${toCurr.value}`)
      let finalAmount = amount.value * rate;
      console.log(finalAmount)
      msg.innerText = `${amount.value} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`
}