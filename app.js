const baseURL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

let selects = document.querySelectorAll("select");
let input = document.querySelector("input");
let toSelect = document.querySelector(".to select");
let fromSelect = document.querySelector(".from select");
let btn = document.querySelector(".convert");
let swapBtn = document.querySelector(".swap");
let resultText = document.querySelector("h3");

function roundToDecimalPlace(num, places) {
    let factor = Math.pow(10, places);
    return Math.round(num * factor) / factor;
  }  

const convertCurr = async () => {
    let convertVal = input.value;
    if (convertVal === "" || convertVal < 1) {
        input.value = "1";
        convertVal = 1;
    }
    const URL = `${baseURL}/${fromSelect.value.toLowerCase()}.json`;
    let response = await fetch(URL);
    let data = await response.json();
    let rate = data[fromSelect.value.toLowerCase()][toSelect.value.toLowerCase()];
    let finalAmt = convertVal * rate;
    resultText.innerHTML = `Converted value : <b>${roundToDecimalPlace(finalAmt,2)} ${toSelect.value}</b>`;
}

selects.forEach(select => {
    for (country in countryList) {
        let optns = document.createElement("option");
        optns.innerHTML = `${countryNames[country]} (${country})`
        optns.value = country;
        if (select.name === "from" && optns.value === "USD") {
            optns.selected = "selected";
        }
        else if (select.name === "to" && optns.value === "INR") {
            optns.selected = "selected";
        }
        select.appendChild(optns);
    }

    select.addEventListener("change", (evt) => {
        let countryCode = evt.target.value;
        let country = countryList[countryCode];
        let newSrc = `https://flagsapi.com/${country}/flat/64.png`;
        let img = evt.target.parentElement.querySelector("img");
        img.src = newSrc;
        convertCurr();
    });
});

swapBtn.addEventListener("click", (evt) => {
    evt.preventDefault();
    let newValue = fromSelect.value;
    fromSelect.value = toSelect.value;
    toSelect.value = newValue;
    let newSrcTo = `https://flagsapi.com/${countryList[newValue]}/flat/64.png`;
    let newSrcFrom = `https://flagsapi.com/${countryList[fromSelect.value]}/flat/64.png`;
    let toImg = toSelect.parentElement.querySelector("img");
    let fromImg = fromSelect.parentElement.querySelector("img");
    toImg.src = newSrcTo;
    fromImg.src = newSrcFrom;
    convertCurr();
});

btn.addEventListener("click", (evt) => {
    evt.preventDefault();
    convertCurr();
});

window.addEventListener("load", () => {
    convertCurr();
});


