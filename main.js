
// get the data from API or server
const loadPhones = async() => {
    const url = await `https://openapi.programming-hero.com/api/phones?search=iphone`;
    const res = await fetch(url);
    const data = await res.json();
    displayPhones(data.data);
}


// Display all the Phones to the UI
const displayPhones = (phones) => {
    // step-1: get the Element where Phones will be displayd
    const phoneContainer = document.getElementById("phone-container");
    phones.forEach(phone => {
        // step-2: create an element where each phone will be added
        const phoneElement = document.createElement("div");
        phoneElement.classList.add("col");
        // step-3: set the innerHTMl to display every single phone
        phoneElement.innerHTML = `
            <div class="card p-3 text-center bg-success text-white">
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

loadPhones()