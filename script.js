
let information = document.getElementById("information");

function getCountry(e) {
    try {
        const xhr = new XMLHttpRequest();
        const API_URL = `https://restcountries.com/v3.1/name/${e}/`;
        xhr.open('GET', API_URL);

        xhr.onload = function () {
            if (xhr.status === 200) {
                try {
                    let country = JSON.parse(xhr.responseText);
                    let data = country[0];
                    information.innerHTML = `
                    <div class="card bg-light mb-3" style="width: 70rem;">
                        <div class="card-header">About Selected Country</div>
                        <div class="card-body">
                            <h5 class="card-title"></h5>
                            <div class="card">
                                <img class="card-img-top" src="..." alt="Flag">
                                <ul class="list-group">
                                    <li class="list-group-item">Capital City: ${data.capital}</li>
                                    <li class="list-group-item">Population: ${(data.population / 1000000).toFixed(1)}M</li>
                                    <li class="list-group-item">Languages: ${Object.values(data.languages)}</li>
                                </ul>
                            </div>
                            <a href="#" class="btn btn-primary m-2">Show Neighbors</a>
                        </div>
                       
                    </div> `;




                    let countryName = document.querySelector(".card-title");
                    let button = document.querySelector(".btn-primary");
                    let ul = document.createElement("ul");
                    ul.classList = 'list-group ';
                    let cardBody = document.querySelector(".card-body");
                    let flag = document.querySelectorAll(".card-img-top")[0];


                    flag.src = data.flags.png;
                    let selectedName = data.name.common;
                    countryName.innerHTML = selectedName;
                    Swal.fire(
                        'Success!',
                        ' ',
                        'success');

                    let bordersList = data.borders.toString();
                    console.log("border listesi:" + bordersList);

                    button.addEventListener("click", function () {
                        if (bordersList && bordersList.length > 0) {
                            borders(bordersList);
                        } else {
                            Swal.fire(
                                'Uyarı!',
                                'Sınır komşuları bulunmuyor.',
                                'warning'
                            );
                        }
                    });
                    

                    function borders(borderData) {

                        console.log("bağlanılanacak adres: " + borderData)
                        const xhrBorders = new XMLHttpRequest();
                        xhrBorders.open("GET", "https://restcountries.com/v3.1/alpha?codes=" + borderData);
                        try {

                            xhrBorders.onload = function () {
                                if (xhrBorders.status === 200) {

                                    let allBorderList = JSON.parse(xhrBorders.responseText);
                                    console.log(allBorderList);

                                    allBorderList.forEach(element => {
                                        console.log(element.capital[0]);





                                        let borderInfo = document.createElement("div");
                                        borderInfo.innerHTML = `
                                        <hr>
                                        <div class="card bg-light" >
                                        <div class="card-header"><h5>${element.name.common}</h5></div>
                                        <div class="card-body" style="padding:0 !important;">
                                            
                                            <div class="card">
                                                <img class="card-img-top" src="${element.flags.png}" alt="Flag">
                                                <ul class="list-group">
                                                    <li class="list-group-item">Capital City: ${element.capital[0]}</li>
                                                    <li class="list-group-item">Population:  ${(element.population / 1000000).toFixed(1)}M</li>
                                                    <li class="list-group-item">Languages: ${Object.values(element.languages)}</li>
                                                </ul>
                                            </div>
                                         
                                        </div>
                                       
                                    </div> `;
                                        cardBody.appendChild(borderInfo);
                                        /*
                                        cardBody.appendChild(ul);
                                    
                                        let li = document.createElement("li");
                                        li.classList = 'list-group-item';
                                        li.innerHTML = `${element.name.common} <hr>`;
                        
                                        ul.appendChild(li);
                                        cardBody.appendChild(ul);
                                        */
                                    });
                                }
                            }

                            xhrBorders.send();

                        } catch (error) {
                            console.log(error);
                         
                        }

                    }

                }
                catch (error) {
                    console.log(error);
                }
            } else {

                Swal.fire(
                    'Hata!',
                    'Ülkenin verisi mevcut değil',
                    'error'
                );
            }
        }

        xhr.send();
    } catch (error) {
        console.log(error);
    }
}





