// https://wger.de/api/v2/?format=json
// async function fetchInfo() {
//   const url = `https://api.punkapi.com/v2/beers?page=2&per_page=80`;
//   const res = await axios.get(url);
//   console.log(res.data)
// }
// fetchInfo();

const beerList = document.querySelector(".beer-list")
const beerSelect = document.querySelector("#beer-select")
const searchList = document.querySelector(".search-list")
const beerData = document.querySelector(".beer-data")
let beers = [];
// function to retreive array of beers
async function getBeers() {
  

  for (let i = 1; i < 2; i++) {

    let url = `https://api.punkapi.com/v2/beers?page=${i}&per_page=80`
    let res = await axios.get(`${url}`);
    let currentBeers = res.data;
    beers = [...beers, ...currentBeers];
    console.log(beers)
    storeArr(beers);
    // setBeerValues(beers);
    convertBeers(beers);
  }
}
getBeers();

// store in array
function storeArr(beers) {
  arr = beers
  return arr;
}

// convert from object
function convertBeers(beer) {
  for (let a = 0; a < beer.length; a++) {
    let beers = beer[a].name;
    setBeerValues(beers);
  }
}

// show beer data on page
function showBeerData(obj) {

  let beerName = obj.name;
  let newName = document.createElement("p");
  newName.innerHTML = `Beer Name: ${beerName}`;
  beerData.appendChild(newName);

  let beerDesc = obj.description;
  let newDesc = document.createElement("p");
  newDesc.innerHTML = `Description: ${beerDesc}`;
  beerData.appendChild(newDesc);
    
  }
  

//function to set value of beer to DOM
function setBeerValues(beers) {
  let option = document.createElement("option");
  option.value = beers;
  option.innerHTML = beers;
  beerSelect.appendChild(option);

}
beerSelect.addEventListener("change", handleChange);

function handleChange(event) {
  event.preventDefault();
  // console.log(beerSelect.value);
  // console.log(this.value)
  let displayBeer = beers.filter(beer=> {
    if (beer.name == this.value) {
      return beer
    }
  })
  // console.log(displayBeer[0].name);

  showBeerData(displayBeer[0]);
}
// search function for submit tab
// function handleSearch(event) {
//   event.preventDefault();
//   console.log(searchList.value);
//   let listValue = searchList.value;
//   searchList.value = "";
  
// }



