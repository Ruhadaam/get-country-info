
let information = document.getElementById("information");

function getCountry(e) {
    try {
        const xhr = new XMLHttpRequest();
        const API_URL = `https://restcountries.com/v3.1/name/${e}/`;
        xhr.open('GET', API_URL);

        xhr.onload = function () {
            if (xhr.status === 200) {
                try {
                    information.innerHTML = `     <div class="card bg-light mb-3" style="width: 70rem;">

                    <div class="card-header">About Selected Country</div>   
                    <div class="card-body">
                        <h5 class="card-title"></h5>
                       
                        <div class="card">
                            <img class="card-img-top" src="..." alt="Flag">     
                        </div>
                        
                        <a href="#" class="btn btn-primary m-2">Komşu Ülkeleri göster</a>
                    </div>
                    <hr>
                </div>`;
                let infoLi = document.createElement("li");
                let infoUl = document.createElement("ul");

                    let countryName = document.querySelector(".card-title");
                    let button = document.querySelector(".btn-primary");
                    let ul = document.createElement("ul");
                    ul.classList = 'list-group ';
                    let cardBody = document.querySelector(".card-body");
                    let flag = document.querySelector(".card-img-top");
                    let country = JSON.parse(xhr.responseText);
                    let data = country[0];

                    flag.src = data.flags.png;
                    let selectedName = data.name.common;
                    countryName.innerHTML = selectedName;
                    Swal.fire(
                        'Success!',
                        ' ',
                        'success');

                        button.addEventListener("click", borders);
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
                    
                }
                catch (error) {
                    console.log(error);
                }
            } else {

                Swal.fire(
                    'Hata!',
                    'Ülkenin verisi mevcut değil.',
                    'error'
                );
            }
        }

        xhr.send();
    } catch (error) {
        console.log(error);
    }
}



