
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
        // step-2: create an element where each phone will be added
        const phoneElement = document.createElement("div");
        phoneElement.classList.add("col");
        // step-3: set the innerHTMl to display every single phone
        phoneElement.innerHTML = `
            <div class="card p-3 text-center bg-success text-white" style="height: 300px;">
                <img src="${phone.image}" class="card-img-top w-50 m-auto p-2 rounded-md" alt="...">
                <div class="card-body">
                    <h3 class="card-title"> ${phone.phone_name} </h3>
                    <h4>Brand: ${phone.brand} </h4>
                </div>
            </div>
        `;
        // step-4: append the single phone to the phones container
        phoneContainer.appendChild(phoneElement);
    });
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