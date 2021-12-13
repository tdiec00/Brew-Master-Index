// https://wger.de/api/v2/?format=json
// async function fetchInfo() {
//   const url = `https://api.punkapi.com/v2/beers?page=2&per_page=80`;
//   const res = await axios.get(url);
//   console.log(res.data)
// }
// fetchInfo();



async function getBeers() {
  let beers = [];

  for (let i = 1; i < 5; i++) {
    let url = `https://api.punkapi.com/v2/beers?page=${i}&per_page=80`
    let res = await axios.get(`${url}`);
    let currentBeers = res.data;
    beers = [...beers, ...currentBeers];
    console.log(beers);
  }
}
getBeers();

