let dataset;
fetch("./media/eurostat.json")
.then((res) => {
    return res.json();
})
.then((data) => {
    dataset = data;
    console.log(dataset)
});
function filterDatasetByCountryAndIndicator(countryID, indicator){
    return dataset.filter(x => x.tara === countryID && x.indicator === indicator);
}

function filterDatasetByYear(year) {
    return dataset.filter(x => x.an === year);
}

