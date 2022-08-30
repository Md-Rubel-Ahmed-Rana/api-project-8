
// get the data from API or server
const loadPhones = async() => {
    const url = await `https://openapi.programming-hero.com/api/phones?search=iphone`;
    const res = await fetch(url);
    const data = await res.json();
    console.log(data.data);
}




loadPhones()