
// get the data from API or server
const loadPhones = async (searchText) => {
    const url = await `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    const res = await fetch(url);
    const data = await res.json();
    displayPhones(data.data);
}


// Display all the Phones to the UI
const displayPhones = (phones) => {
    // step-1: get the Element where Phones will be displayd
    const phoneContainer = document.getElementById("phone-container");
    // clear the previous phone
    phoneContainer.textContent = "";
    // Send a message when there is no product displayed
    const noProduct = document.getElementById("not-found");
    if (phones.length === 0) {
        searchProcess(false)
        noProduct.classList.remove("d-none");
    }else{
        noProduct.classList.add("d-none");
        searchProcess(false)
    }

    phones.forEach(phone => {
        // console.log(phone);
        // step-2: create an element where each phone will be added
        const phoneElement = document.createElement("div");
        phoneElement.classList.add("col");
        // step-3: set the innerHTMl to display every single phone
        phoneElement.innerHTML = `
            <div class="card p-1 text-center bg-success text-white" style="height: 430px;">
                <img src="${phone.image}" class="card-img-top w-50 m-auto p-2 rounded-md" alt="...">
                <div class="card-body">
                    <h3 class="card-title"> ${phone.phone_name} </h3>
                    <h4>Brand: ${phone.brand} </h4>
                    <button onclick="loadDetails('${phone.slug}')" class="btn btn-primary mt-2"  data-bs-toggle="modal" data-bs-target="#productDetails">Show Details</button>
                </div>
            </div>
        `;
        // step-4: append the single phone to the phones container
        phoneContainer.appendChild(phoneElement);
    });
}

// show the product details
const loadDetails = async(id) => {
    const url = await `https://openapi.programming-hero.com/api/phone/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    showDetails(data.data)
}

const showDetails = (phone) => {
    const name = document.getElementById("productTitle");
    const image = document.getElementById("modal-img");
    const memory = document.getElementById("memory");
    const sensor = document.getElementById("sensor");
    const release = document.getElementById("release");
    name.innerText = phone.name;
    image.src = phone.image;
    memory.innerText = phone.mainFeatures.memory;
    sensor.innerText = "Sensor: " + phone.mainFeatures.sensors[0];
    release.innerText = phone.releaseDate;
}

// Make dynamic the searching function so that access any where;
const searchProcess = (isLoading) => {
    const searchField = document.getElementById("search-field");
    const loader = document.getElementById("loader");
    const searchText = searchField.value;
    if (isLoading) {
        loader.classList.remove("d-none");
        loadPhones(searchText);
    }else{
        loader.classList.add("d-none");
    }
}

// add search function
document.getElementById("search-btn").addEventListener("click", () => {
    searchProcess(true)
})

// add a keydown Event listener on Enter Key so that no need to press search button;
document.getElementById("search-field").addEventListener("keyup", (event) => {
    if (event.key === "Enter") {
        searchProcess(true);
    }
})


loadPhones("apple")