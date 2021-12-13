// https://wger.de/api/v2/?format=json
// async function fetchInfo() {
//   const url = `https://api.punkapi.com/v2/beers?page=2&per_page=80`;
//   const res = await axios.get(url);
//   console.log(res.data)
// }
// fetchInfo();

const beerList = document.querySelector(".beer-list")
const beerSelect = document.querySelector("#beer-select")

// function to retreive array of beers
async function getBeers() {
  let beers = [];

  for (let i = 1; i < 2; i++) {

    let url = `https://api.punkapi.com/v2/beers?page=${i}&per_page=80`
    let res = await axios.get(`${url}`);
    let currentBeers = res.data;
    beers = [...beers, ...currentBeers];
    // console.log(beers)
    // setBeerValues(beers);
    convertBeers(beers);
  }
}
getBeers();

// convert from object
function convertBeers(beer) {
  for (let a = 0; a < beer.length; a++) {
    let beers = beer[a].name;
    setBeerValues(beers);
  }
}


//function to set value of beer to DOM
function setBeerValues(beers) {
  let option = document.createElement("option");
  option.value = beers;
  option.innerHTML = beers;
  beerSelect.appendChild(option);
}


