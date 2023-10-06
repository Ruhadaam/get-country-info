class MyXhr {
    constructor() {
        this.xhr = new XMLHttpRequest();
    }

    get(url) {
        this.xhr.open("GET", url, true);

        this.xhr.onload = () => {
            if (this.xhr.status === 200) {
                let data = JSON.parse(this.xhr.responseText);
                let selectElement = document.getElementById("countrySelect"); // select elementini al

                // data'daki her öğe için bir option oluştur ve select'e ekle
                data.forEach(element => {
                    let option = document.createElement("option");
                    option.value = element.code; 
                    option.textContent = element.name; 
                    selectElement.appendChild(option); 
                });
            }
        };

        this.xhr.send();
    }
}

const xhrInstance = new MyXhr();
xhrInstance.get("countries.json");

let selectElement = document.getElementById("countrySelect");
let getir = document.querySelector(".getir");

getir.addEventListener("click", getInfo);

function getInfo() {
    let selectedOption = selectElement.options[selectElement.selectedIndex];

    let selectedText = selectedOption.text;

    getCountry(selectedText)
   
}