let flag = document.querySelector(".card-img-top");
let countryName = document.querySelector(".card-title");
let button = document.querySelector(".btn-primary");
let ul = document.createElement("ul");
ul.classList = 'list-group';
let cardBody = document.querySelector(".card-body");
let getCountryButton = document.querySelector(".btn-danger");


function getCountry() {


    const xhr = new XMLHttpRequest();
    const API_URL = 'https://restcountries.com/v3.1/name/poland/';


    xhr.open('GET', API_URL);

    xhr.onload = function () {

        if (xhr.status === 200) {

            let country = JSON.parse(xhr.responseText);
            let data = country[0];
            console.log(data);
            console.log(data.flags.png);
            flag.src = data.flags.png;
            countryName.innerHTML = data.altSpellings[1];

            // borders fonksiyonunu burada tanımlayın
            function borders() {
                data.borders.forEach(element => {

                    let li = document.createElement("li");
                    li.classList = 'list-group-item';
                    li.innerHTML = element;
                    ul.appendChild(li);
                    cardBody.appendChild(ul);
                });
            }
            button.addEventListener("click", borders);
        }


    }

    xhr.send();
}

getCountryButton.addEventListener("click",getCountry);
