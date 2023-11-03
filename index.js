import data from './media/eurostat.json' assert { type: 'json' }

export function filterDataset(countryID, indicator){
    return data.filter(x => x.tara === countryID && x.indicator === indicator);
}

