let dataset = [];
const countriesArray = [
    "BE", "BG", "CZ", "DK", "DE", "EE",
    "IE", "EL", "ES", "FR", "HR", "IT",
    "CY", "LV", "LT", "LU", "HU", "MT",
    "NL", "AT", "PL", "PT", "RO", "SI",
    "SK", "FI", "SE"];

const yearsArray = [
    "2000", "2001", "2002", "2003", "2004",
    "2005", "2006", "2007", "2008", "2009",
    "2010", "2011", "2012", "2013", "2014",
    "2015", "2016", "2017", "2018", "2019",
    "2020", "2021", "2022"
]

const baseUrl = `https://ec.europa.eu/eurostat/api/dissemination/statistics/1.0/data/`

const datasetCodeSV ="demo_mlexpec";
const datasetCodePIB ="sdg_08_10"; 
const datasetCodePOP ="nama_10_pe";

const format = "JSON";
const language = "EN";

console.log("Nr. Tari: " + countriesArray.length)

function getApiResultURL(datasetCode, format, language) {
    let result = baseUrl + `${datasetCode}?format=${format}&lang=${language}`;
    yearsArray.forEach(element => {
        result += `&time=${element}`
    });

    return result;
}


//link cu time
//iau fiecare tara si adaug la dataset

async function fetchSV() {
    
    countriesArray.forEach(element => {
        let apiURL = getApiResultURL(datasetCodeSV, format, language);
        let url = apiURL + `&geo=${element}`;
        fetch(url)
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            // console.log("Element " + element);
            // console.log(data);
            for(let i = 0; i < yearsArray.length; i++) {
                let entry = {};
                entry.tara = element;
                entry.an = yearsArray[i];
                entry.indicator = "SV";
                entry.valoare = data.value[i];
                console.log(entry);
                //console.log(data);
                dataset.push(entry);
            }
    
            //console.log(dataset)
        })
    })    
}


async function fetchPIB() {

    countriesArray.forEach(element => {
        let apiURL = getApiResultURL(datasetCodePIB, format, language);
        let url = apiURL + `&geo=${element}`;
        fetch(url)
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            // console.log("Element " + element);
            // console.log(data);
            for(let i = 0; i < yearsArray.length; i++) {
                let entry = {};
                entry.tara = element;
                entry.an = yearsArray[i];
                entry.indicator = "PIB";
                entry.valoare = data.value[i];
                //console.log(entry);
                // console.log(data);
                dataset.push(entry);
            }
    
            //console.log(dataset)
        })
    })    
}


async function fetchPOP() {

    countriesArray.forEach(element => {
        let apiURL = getApiResultURL(datasetCodePOP, format, language);
        let url = apiURL + `&geo=${element}`;
        fetch(url)
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            // console.log("Element " + element);
            // console.log(data);
            for(let i = 0; i < yearsArray.length; i++) {
                let entry = {}; 
                entry.tara = element;
                entry.an = yearsArray[i];
                entry.indicator = "POP";
                //console.log(`An ${yearsArray[i]} Tara ${element}`);
                //console.log(data.value);
                entry.valoare = data.value[23 + i];
                // console.log(entry);
                // console.log(data);
                dataset.push(entry);
            }
    
            //console.log(dataset)
        })
    })    
}

async function fetchDataset() {
    await fetchSV();
    await fetchPIB();
    await fetchPOP();
    console.log(dataset);
}

fetchDataset();




// fetch(baseUrl + `${datasetCodeSV}?format=${format}&lang=${language}&time=2000&time=2001&geo=RO&geo=BG`)
// .then((res) => {
//     return res.json();
// })
// .then((data) => {
//     dataset = data;
//     console.log(dataset);
// })

// fetch("./media/eurostat.json")
// .then((res) => {
//     return res.json();
// })
// .then((data) => {
//     dataset = data;
//     console.log(dataset)
// });
function filterDatasetByCountryAndIndicator(countryID, indicator){
    return dataset.filter(x => x.tara === countryID && x.indicator === indicator);
}

function filterDatasetByYear(year) {
    return dataset.filter(x => x.an === year);
}

let paginaHome;
let paginaIndicator;
let paginaAn;

function init() {
    paginaHome = document.getElementById("homePage")
    paginaIndicator = document.getElementById("filtrareIndicatorPage")
    paginaAn = document.getElementById("filtrareAnPage")
    loadPaginaHome();
    populateIndicatorList();
    populateCountryList();
    populateYearList();
}

function loadPaginaIndicatori() {
    paginaHome.style.display = "none";
    paginaAn.style.display = "none";
    paginaIndicator.style.display = "block";
}

function loadPaginaAn() {
    paginaHome.style.display = "none";
    paginaAn.style.display = "block";
    paginaIndicator.style.display = "none";
}

function loadPaginaHome() {
    paginaHome.style.display = "flex";
    paginaAn.style.display = "none";
    paginaIndicator.style.display = "none";
}

function populateIndicatorList() {
    const indicatorsArray = ["PIB", "POP", "SV"];

    let selectIndicatorElement = document.getElementById("selectIndicator");
    if(selectIndicatorElement !== null) {
        indicatorsArray.forEach(x => {
            //console.log(x);
            selectIndicatorElement.innerHTML += `<option value='${x}'>${x}</option>`;
        })
    }

}

function populateCountryList(){
    const countriesArray = [
        "BE", "BG", "CZ", "DK", "DE", "EE",
        "IE", "EL", "ES", "FR", "HR", "IT",
        "CY", "LV", "LT", "LU", "HU", "MT",
        "NL", "AT", "PL", "PT", "RO", "SI",
        "SK", "FI", "SE"];
    
        countriesArray.sort((a,b) => sortArray);
    let selectCountryElement = document.getElementById("selectCountry");
    if(selectCountryElement !== null) {
        countriesArray.forEach(x => {
            selectCountryElement.innerHTML += `<option value='${x}'>${x}</option>`;
        })
    }
}

function populateYearList() {
    let selectYearElement = document.getElementById("selectYear");

    if(selectYearElement !== null) {
        for(let i = 0; i <= 22; i++) {
            selectYearElement.innerHTML += `<option value='${2022-i}'>${2022-i}</option>`
        }
    }
}

function resetTbody() {
    let oldTableBody = document.querySelector("tbody");
    let newTableBody = document.createElement('tbody');
    oldTableBody.parentNode.replaceChild(newTableBody, oldTableBody);
}

function filterYearButton() {
    let selectYearElement = document.getElementById("selectYear");
    let year = selectYearElement.value;
    let array = filterDatasetByYear(year);
    array.sort((a,b) => sortObjectArray(a,b));
    //console.log(array);
    resetTbody();

    let tableBody = document.querySelector("tbody");


    let sumaPIB = 0;
    let sumaSV = 0;
    let sumaPOP = 0;
    for(let i = 0; i < array.length; i = i + 3) {
        console.log(i + " " + array[i].tara + " " + array[i].indicator + " " + array[i].valoare);
        console.log(i+1 + " " + array[i+1].tara + " " + array[i+1].indicator + " " + array[i+1].valoare);
        console.log(i+2 + " " + array[i+2].tara + " " + array[i+2].indicator + " " + array[i+2].valoare);

        sumaSV += array[i].valoare;    
        sumaPIB += array[i+1].valoare;    
        sumaPOP += array[i+2].valoare;    
    }

    let nrTari = array.length/3;
    let mediePIB = sumaPIB / nrTari;
    let medieSV = sumaSV / nrTari;
    let mediePOP = sumaPOP / nrTari;

    let mediePIBElement = document.getElementById('mediePIB');
    mediePIBElement.innerHTML = Math.round(mediePIB * 100) / 100;
    let medieSVElement = document.getElementById('medieSV');
    medieSVElement.innerHTML = Math.round(medieSV * 100) / 100;
    let mediePOPElement = document.getElementById('mediePOP');
    mediePOPElement.innerHTML = Math.round(mediePOP * 100) / 100;

    array.sort((a, b) => sortObjectArray(a,b));
    for(let i = 0; i < array.length; i= i + 3) {
        let row = tableBody.insertRow(-1);
        //TARA
        let cell1 = row.insertCell(0);
        cell1.innerHTML = `${array[i].tara}`;

        //1
        //PIB
        let cell3 = row.insertCell(1);
        cell3.innerHTML = `${array[i+1].valoare}`;
        let raportPIB = array[i+1].valoare / mediePIB;
        if(raportPIB > 1) raportPIB = 1;
        cell3.style.background = `rgba(${256*(1-raportPIB)},${256*raportPIB},0,1)`;

        //0
        //SPERANTA DE VIATA
        let cell2 = row.insertCell(2);
        cell2.innerHTML = `${array[i].valoare}`;
            
        let raportSV = array[i].valoare / medieSV;
        if(raportSV > 1) raportSV = 1;
        cell2.style.background = `rgba(${256*(1-raportSV)},${256*raportSV},0,1)`;
        
        //2
        //POPULATIE
        let cell4 = row.insertCell(3);
        cell4.innerHTML = `${array[i+2].valoare}`;

        let raportPOP = array[i+2].valoare / mediePOP;
        if(raportPOP > 1) raportPOP = 2;
        cell4.style.background = `rgba(${256*(1-raportPOP)},${256*raportPOP},0,1)`;

    }

    console.log(array.length);

    console.log(`Suma PIB:${sumaPIB}; Suma SV:${sumaSV}; Suma Pop:${sumaPOP}`);
    console.log(`Medie PIB:${mediePIB}; Medie SV:${medieSV}; Medie POP:${mediePOP}`);

}

function filterButton() {
    let selectCountryElement = document.getElementById("selectCountry");
    let selectIndicatorElement = document.getElementById("selectIndicator");

    let country = selectCountryElement.value;
    let indicator = selectIndicatorElement.value;
    // console.log(indicator);
    // console.log(country);
    let data = filterDatasetByCountryAndIndicator(country, indicator);
    console.log(data);
    desenareHistogramaSVG(country, indicator, data);
}

function sortObjectArray(a, b) {
    const taraA = a.tara.toUpperCase();
    const taraB = b.tara.toUpperCase();

    if(taraA < taraB) {
        return -1;
    }
    
    if(taraA > taraB){
        return 1;
    }

    return 0;
}

function sortArray(a, b) {
    const taraA = a.toUpperCase();
    const taraB = b.toUpperCase();

    if(taraA < taraB) {
        return -1;
    }
    
    if(taraA > taraB){
        return 1;
    }

    return 0;
}

function desenareHistogramaSVG(country, indicator, data) {
    let svg = document.querySelector("svg");
    let yearAxis = document.getElementById("yearsAxis");
    let valuePoints = document.getElementById("valuePoints"); 
    let valueLines = document.getElementById("valueLines"); 
    let valueText = document.getElementById("valueText"); 

    while (yearAxis.firstChild) {
        yearAxis.removeChild(yearAxis.firstChild);
    }

    while (valuePoints.firstChild) {
        valuePoints.removeChild(valuePoints.firstChild);
    }

    while (valueLines.firstChild) {
        valueLines.removeChild(valueLines.firstChild);
    }

    while (valueText.firstChild) {
        valueText.removeChild(valueText.firstChild);
    }

    let yearOffset = Math.floor((960 - 40 * 2 - 20)/data.length);
    // console.log(yearOffset);
    const f = 500 / Math.max(...data.map(x=>x.valoare));
    console.log(data[0].valoare * f);
    console.log(data[1].valoare * f);
    for(let i = 0; i < data.length; i++) {
        yearAxis.innerHTML += `<line x1="${40 + yearOffset * (i+1)}" y1="490" x2="${40 + yearOffset * (i+1)}" y2="510" stroke="black"/>`;
        yearAxis.innerHTML += `<text x="${40 + yearOffset * (i+1) - 12.5}" y="520" font-size="0.7rem">${2000 + i}</text>`;
        valuePoints.innerHTML += `<circle cx="${40 + yearOffset * (i+1)}" cy="${520 - data[i].valoare * f * 0.25}" r="2" />`
        valueText.innerHTML +=  `<text x="${40 + yearOffset * (i+1)}" y="${520 - data[i].valoare * f * 0.27}" font-size="10">${data[i].valoare}</text>` 
    }
    

    console.log(valuePoints.childNodes);
    for(let i = 0; i < valuePoints.childNodes.length - 1; i++) {
        const cx1 = valuePoints.childNodes[i].cx.animVal.value;
        const cy1 = valuePoints.childNodes[i].cy.animVal.value;
        const cx2 = valuePoints.childNodes[i+1].cx.animVal.value;
        const cy2 = valuePoints.childNodes[i+1].cy.animVal.value;
        // console.log(valuePoints.childNodes[i].cx.animVal.value);
        // console.log(valuePoints.childNodes[i].cy.animVal.value); 
        valueLines.innerHTML += `<line x1="${cx1}" x2="${cx2}" y1="${cy1}" y2="${cy2}" stroke="blue" stroke-width="1"/>`;

    }
    
    // console.log(svg);
    // console.log(yearAxis);
}


