
// List of variables
const beerList = document.querySelector(".beer-list")
const beerSelect = document.querySelector("#beer-select")
const searchList = document.querySelector(".search-list")
const beerData = document.querySelector(".beer-data")
const beerIng = document.querySelector(".ingredients")
let beers = [];


// function to retreive array of beers
async function getBeers() {

  for (let i = 1; i < 2; i++) {

    let url = `https://api.punkapi.com/v2/beers?page=${i}&per_page=80`
    let res = await axios.get(`${url}`);
    let currentBeers = res.data;
    beers = [...beers, ...currentBeers];
    console.log(beers)
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


// show beer data on page
function showBeerData(obj) {
  removeData();
  let beerName = obj.name;
  let newName = document.createElement("p");
  newName.innerHTML = `Beer Name: ${beerName}`;
  beerData.appendChild(newName);

  let beerDesc = obj.description;
  let newDesc = document.createElement("p");
  newDesc.innerHTML = `Description: ${beerDesc}`;
  beerData.appendChild(newDesc);
}

function showIngredients(obj) {
  removeData();


  // let hopsName = hops[i].name;
  // let newHopsName = document.createElement("p");
  // newHopsName.innerHTML = `Hops: ${hopsName}`;
  // beerIng.appendChild(newHopsName);
  // let hops = document.createElement("p");
  // newHops.innerHTML = `Hops: ${ingredients}`;
  // beerData.appendChild(newHops);

  //malt works
  let maltArr = obj.ingredients.malt;
  for (let i = 0; i < maltArr.length; i++) {
    // console.log(maltArr[i].name)
    let malt = maltArr[i].name
    let newMalt = document.createElement("p");
    newMalt.innerHTML = `Malt: ${malt}`;
    beerIng.appendChild(newMalt);
  }


  // yeast works
  let yeast = obj.ingredients.yeast;
  let newYeast = document.createElement("p");
  newYeast.innerHTML = `Yeast: ${yeast}`;
  beerIng.appendChild(newYeast);
}


//function to set value of beer to dropdown list
function setBeerValues(beers) {
  let option = document.createElement("option");
  option.value = beers;
  option.innerHTML = beers;
  beerSelect.appendChild(option);

}

// eventlistener for select beer dropdown
beerSelect.addEventListener("change", handleChange);

//function for after "change" eventlistener 
function handleChange(event) {
  // event.preventDefault();

  let displayBeer = beers.filter(beer => {
    if (beer.name == this.value) {
      return beer
    }
  })
  // console.log(displayBeer[0].name);

  // showBeerData(displayBeer[0]);
  showIngredients(displayBeer[0]);
}

function removeData() {
  beerData.innerHTML = "";
  beerIng.innerHTML = "";
}


