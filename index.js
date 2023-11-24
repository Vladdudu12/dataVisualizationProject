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

