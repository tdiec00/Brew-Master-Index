
// List of variables
const beerList = document.querySelector(".beer-list")
const beerSelect = document.querySelector("#beer-select")
const searchList = document.querySelector(".search-list")
const beerName = document.querySelector(".beer-name")
const beerDesc = document.querySelector(".beer-description")
const hopsList = document.querySelector(".hops");
const maltList = document.querySelector(".malt")
const yeastList = document.querySelector(".yeast")
const favList = document.querySelector(".favorites")
const favButton = document.querySelector(".favButton")
let beers = [];


// function to retreive array of beers
async function getBeers() {

  for (let i = 1; i < 4; i++) {

    let url = `https://api.punkapi.com/v2/beers?page=${i}&per_page=80`
    let res = await axios.get(`${url}`);
    let currentBeers = res.data;
    beers = [...beers, ...currentBeers];
    console.log(beers)
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

// show beer name on page
function showBeerName(obj) {
  let beerNameDisplay = obj.name;
  let newName = document.createElement("h2");
  newName.innerHTML = `${beerNameDisplay}`;
  beerName.appendChild(newName);
}

function showBeerAbv(obj) {
  let beerAbvDisplay = obj.abv;
  let newAbv = document.createElement("h2");
  newAbv.innerHTML = `${beerAbvDisplay}%`;
  beerName.appendChild(newAbv);
}

// show beer description on page
function showBeerDesc(obj) {
  let beerDescDisplay = obj.description;
  let newDesc = document.createElement("p");
  newDesc.innerHTML = `${beerDescDisplay}`;
  beerDesc.appendChild(newDesc);
}

// shows malt on page
function showMalt(obj) {
  //malt works
  let maltArr = obj.ingredients.malt;
  for (let i = 0; i < maltArr.length; i++) {
    // console.log(maltArr[i].name)
    let malt = maltArr[i].name
    let newMalt = document.createElement("li");
    newMalt.innerHTML = `${malt}`;
    maltList.appendChild(newMalt);
  }
}
//shows yeast on page
function showYeast(obj) {
  // yeast works
  let yeast = obj.ingredients.yeast;
  let newYeast = document.createElement("li");
  newYeast.innerHTML = `${yeast}`;
  yeastList.appendChild(newYeast);
}

// adds hops on page
function showHops(obj) {
  let hopsName = obj;
  hopsName.forEach(obj => {
    let newHops = document.createElement("li");
    newHops.innerHTML = `${obj}`;
    hopsList.appendChild(newHops);
  })
}

// adds beer name to favorite list
function addFavList(obj) {
  let newFav = obj;
  noDupFavs(newFav)
  let addFav = document.createElement("li");
  addFav.innerHTML = `${newFav}`;
  favList.appendChild(addFav);

}

//function to set value of beer to dropdown list
function setBeerValues(beers) {
  let option = document.createElement("option");
  option.value = beers;
  option.innerHTML = beers;
  beerSelect.appendChild(option);

}

// this function removes  duplicate values from the favorites list
function noDupFavs(favBeer) {
  // let favListElements = favList;
  let favListElements = favList.getElementsByTagName("li")
  for (let i = 0; i < favListElements.length; i++) {
    let currentList = favListElements[i].innerText
    // console.log(favListElements[0]);
    // console.log(favBeer);
    if (currentList == favBeer) {
      favListElements[i].remove();
    }
  }
}


// eventlistener for select beer dropdown
beerSelect.addEventListener("change", handleChange);
// eventlistener for click on fav button
favButton.addEventListener("click", handleFavList)


//function for after "change" eventlistener 
function handleChange(event) {
  removeData();
  let displayBeer = beers.filter(beer => {
    if (beer.name == this.value) {
      return beer
    }
  })
  // console.log(displayBeer[0].name);
  showBeerName(displayBeer[0]);
  showBeerAbv(displayBeer[0]);
  showBeerDesc(displayBeer[0]);
  showYeast(displayBeer[0])
  showMalt(displayBeer[0])
  removeDups(displayBeer[0]);
}




// function for "click" eventlistener
function handleFavList(event) {
  event.preventDefault();
  let favBeer = beerName.firstElementChild.innerHTML
  addFavList(favBeer);
}



// remove data before populating next choice
function removeData() {
  beerName.innerHTML = "";
  beerDesc.innerHTML = "";
  hopsList.innerHTML = "";
  yeastList.innerHTML = "";
  maltList.innerHTML = "";

}


