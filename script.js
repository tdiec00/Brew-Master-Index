// https://wger.de/api/v2/?format=json
async function fetchInfo() {
  const url = `https://api.punkapi.com/v2/beers?page=2&per_page=80`;
  const res = await axios.get(url);
  console.log(res.data)
}
fetchInfo();