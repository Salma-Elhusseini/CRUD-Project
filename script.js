// defines vars
const title = document.getElementById("title");
const price = document.getElementById("price");
const ads = document.getElementById("ads");
const taxes = document.getElementById("taxes");
const discount = document.getElementById("discount");
const total = document.getElementById("total");
const count = document.getElementById("count");
const category = document.getElementById("category");
const submit = document.getElementById("submit");

let mood = 'create';
let tmp;

// get total
function getTotal() {
    if (price.value != '') {
        let result = (+price.value + +taxes.value + +ads.value) - +discount.value;
        total.innerHTML = result;
        total.style.background = '#040';
    }
    else {
        total.innerHTML = '';
        total.style.background = 'red';
    }
}

// create product
let dataPro;

if (localStorage.product != null) {
    dataPro = JSON.parse(localStorage.product);
}
else {
    dataPro = [];
}

submit.onclick = function () {
    let newPro = {
        title: title.value,
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        total: total.innerHTML,
        count: count.value,
        category: category.value
    }

    if(title.value != '' && price.value != '' && category.value != '' && newPro.count < 100) {
        if (mood === 'create') {
            if (newPro.count > 1) {
                for (let i = 0; i < newPro.count; i++) {
                    dataPro.push(newPro);
                }
            }
            else {
                dataPro.push(newPro);
            }
        }
        else {
            dataPro[tmp] = newPro;
            mood = 'create';
            submit.innerHTML = 'Create';
            count.style.display = 'block';
        }
        clearData();
    }


    localStorage.setItem('product', JSON.stringify(dataPro));
    showData();
}

// clear data 
function clearData() {
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    discount.value = '';
    total.innerHTML = '';
    count.value = '';
    category.value = '';
}

// read
function showData() {
    getTotal();
    let table = '';
    for (let i = 0; i < dataPro.length; i++) {
        table += `
        <tr>
              <td>${i}</td>
              <td>${dataPro[i].title}</td>
              <td>${dataPro[i].price}</td>
              <td>${dataPro[i].taxes}</td>
              <td>${dataPro[i].ads}</td>
              <td>${dataPro[i].discount}</td>
              <td>${dataPro[i].total}</td>
              <td>${dataPro[i].category}</td>
              <td><button id="update" onclick="updateData(${i})">Update</button></td>
              <td><button id="delete" onclick="deleteData(${i})">Delete</button></td>
            </tr>
        `
    }
    document.getElementById('tbody').innerHTML = table;

    let BtnDeleteAll = document.getElementById("deleteAll");
    if (dataPro.length > 0) {
        BtnDeleteAll.innerHTML = `
        <button onclick="deleteAll()">Delete All (${dataPro.length})</button>
        `
    }
    else {
        BtnDeleteAll.innerHTML = '';
    }
}
showData();

// delete
function deleteData(i) {
    dataPro.splice(i, 1);
    localStorage.product = JSON.stringify(dataPro);
    showData();
}

function deleteAll() {
    localStorage.clear();
    dataPro.splice(0);
    showData();
}

// update
function updateData(i) {
    title.value = dataPro[i].title;
    price.value = dataPro[i].price;
    taxes.value = dataPro[i].taxes;
    ads.value = dataPro[i].ads;
    discount.value = dataPro[i].discount;
    category.value = dataPro[i].category;
    getTotal();
    count.style.display = 'none';
    submit.innerHTML = "Update";

    mood = 'update';
    tmp = i;
    scroll({
        top: 0,
        behavior: 'smooth'
    })
}

// search
let searchMood = 'title';

function getSearchMood(id) {
    let search = document.getElementById('search');
    if (id === 'searchTitle') {
        searchMood = 'title';
    }
    else {
        searchMood = 'category';
    }
    search.placeholder = 'Search by ' + searchMood;
    search.focus();
    search.value = '';
    showData();
}

function searchData(value) {
    let table = '';
    if (searchMood === 'title') {
        for (let i = 0; i < dataPro.length; i++) {
            if (dataPro[i].title.includes(value.toLowerCase())) {
                table += `
              <tr>
              <td>${i}</td>
              <td>${dataPro[i].title}</td>
              <td>${dataPro[i].price}</td>
              <td>${dataPro[i].taxes}</td>
              <td>${dataPro[i].ads}</td>
              <td>${dataPro[i].discount}</td>
              <td>${dataPro[i].total}</td>
              <td>${dataPro[i].category}</td>
              <td><button id="update" onclick="updateData(${i})">Update</button></td>
              <td><button id="delete" onclick="deleteData(${i})">Delete</button></td>
            </tr>
        `;
            }
        }
    }
    else {
        for (let i = 0; i < dataPro.length; i++) {
            if (dataPro[i].category.includes(value.toLowerCase())) {
                table += `
              <tr>
              <td>${i}</td>
              <td>${dataPro[i].title}</td>
              <td>${dataPro[i].price}</td>
              <td>${dataPro[i].taxes}</td>
              <td>${dataPro[i].ads}</td>
              <td>${dataPro[i].discount}</td>
              <td>${dataPro[i].total}</td>
              <td>${dataPro[i].category}</td>
              <td><button id="update" onclick="updateData(${i})">Update</button></td>
              <td><button id="delete" onclick="deleteData(${i})">Delete</button></td>
            </tr>
        `;
            }
        }
    }
    document.getElementById('tbody').innerHTML = table;
}