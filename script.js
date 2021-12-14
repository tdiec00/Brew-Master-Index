
// List of variables
const beerList = document.querySelector(".beer-list")
const beerSelect = document.querySelector("#beer-select")
const searchList = document.querySelector(".search-list")
const beerData = document.querySelector(".beer-data")
const hopsList = document.querySelector(".hops");
const maltList = document.querySelector(".malt")
const yeastList = document.querySelector(".yeast")
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

// function to remove duplicates in array
function removeDups(obj) {
  let newArr = []
  // push values into new array
  let arr1 = obj.ingredients.hops
  for (let i = 0; i < arr1.length; i++) {
    arr2 = arr1[i].name;
    newArr.push(arr2)
  }
  //**found this code on youtube link "https://www.youtube.com/watch?v=dvPybpgk5Y4"**
  // removes duplicates and adds to new array
  obj = {};
  for (let i of newArr) {
    obj[i] = true;
  }
  let newArr2 = Object.keys(obj);
  showHops(newArr2);
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

// shows malt on page
function showMalt(obj) {
  //malt works
  let maltArr = obj.ingredients.malt;
  for (let i = 0; i < maltArr.length; i++) {
    // console.log(maltArr[i].name)
    let malt = maltArr[i].name
    let newMalt = document.createElement("p");
    newMalt.innerHTML = `${malt}`;
    maltList.appendChild(newMalt);
  }
}
//shows yeast on page
function showYeast(obj) {
  // yeast works
  let yeast = obj.ingredients.yeast;
  let newYeast = document.createElement("p");
  newYeast.innerHTML = `${yeast}`;
  yeastList.appendChild(newYeast);
}

// adds hops on page
function showHops(obj) {
  let hopsName = obj;
  hopsName.forEach(obj => {
    let newHops = document.createElement("p");
    newHops.innerHTML = `${obj}`;
    hopsList.appendChild(newHops);
  })
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
  removeData();
  let displayBeer = beers.filter(beer => {
    if (beer.name == this.value) {
      return beer
    }
  })
  // console.log(displayBeer[0].name);

  // showBeerData(displayBeer[0]);
  // showIngredients(displayBeer[0]);
  showYeast(displayBeer[0])
  showMalt(displayBeer[0])
  removeDups(displayBeer[0]);

}

function removeData() {
  beerData.innerHTML = "";
  hopsList.innerHTML = "";
  yeastList.innerHTML = "";
  maltList.innerHTML = "";
}


