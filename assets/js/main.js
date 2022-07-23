let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let sumbit = document.getElementById('submit');
let tbody = document.getElementById('tbody');
let btnDlate = document.getElementById("delateAll");
let search = document.getElementById('search');
let mood = "create";
let tmp;
console.log(search);

//get total

function getTotal() {

    if (price.value != '') {
        //text return number =+
        let result = (+price.value + +taxes.value + +ads.value) - +discount.value;
        total.innerHTML = result;
        total.style.background = "green";
    } else {
        total.innerHTML = "";
        total.style.background = "rgb(228, 11, 11)";
    }
}
//create product
let dataPro;
if (localStorage.product != null) {
    dataPro = JSON.parse(localStorage.product)
} else {
    dataPro = [];
}
// let dataPro = [];

sumbit.onclick = function() {
    let newPro = {
        title: title.value.toLowerCase(),
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        total: total.innerHTML,
        count: count.value,
        category: category.value.toLowerCase()
    }
    if (title.value != '' && price.value != "" && category.value != "" && count.value <= 200) {
        if (mood === "create") {
            if (newPro.count > 1) {
                for (let i = 0; i < newPro.count; i++) {
                    dataPro.push(newPro);
                }
            } else {
                dataPro.push(newPro);
            }

        } else {
            dataPro[tmp] = newPro;
            mood = "create";
            sumbit.innerHTML = "create";
            count.style.display = "block";
        }

        //save local storge
        localStorage.setItem('product', JSON.stringify(dataPro))

        clearDate();
        showDate();

    }

}

//clear inputs
function clearDate() {
    title.value = "";
    price.value = "";
    taxes.value = "";
    ads.value = "";
    discount.value = "";
    total.innerHTML = "";
    count.value = "";
    category.value = "";
}
//read

function showDate() {
    getTotal();
    let table = '';
    for (let i = 0; i < dataPro.length; i++) {
        table += `
        <tr>
        <td>${i+1}</td>
        <td>${dataPro[i].title}</td>
        <td>${dataPro[i].price}</td>
        <td>${dataPro[i].taxes}</td>
        <td>${dataPro[i].ads}</td>
        <td>${dataPro[i].discount}</td>
        <td>${dataPro[i].total}</td>
        <td>${dataPro[i].category}</td>
        <td><button id="update"onclick="update(${i})">update</button></td>
        <td><button id="delate"onclick=delateDate(${i})>Dleate</button></td>
        `;

    }
    tbody.innerHTML = table;
    if (dataPro.length > 0) {
        btnDlate.innerHTML = `<button onclick="delateAll(${dataPro.length})">Delate All</button>`
    } else {
        btnDlate.innerHTML = "";
    }
}
showDate()



//count


//delate

function delateDate(i) {
    console.log(i)
    dataPro.splice(1, i);
    localStorage.product = JSON.stringify(dataPro);
    showDate();
}

function delateAll() {
    dataPro.splice(0)
    localStorage.clear();
    showDate();


}
//update
function update(i) {
    title.value = dataPro[i].title;
    price.value = dataPro[i].price;
    taxes.value = dataPro[i].taxes;
    ads.value = dataPro[i].ads;
    discount.value = dataPro[i].discount;
    category.value = dataPro[i].category;
    count.style.display = "none";

    sumbit.innerHTML = 'update';
    mood = "update";
    tmp = i;
    getTotal();
    scroll({
        top: 0,
        behavior: 'smooth',
    })
}
//search

let searchMood = "title";

function getSearchMood(id) {

    if (id == "search_title") {
        searchMood = "title";
        // search.placeholder = "Search By Title";
    } else {
        searchMood = "category";
        // search.placeholder = "Search By Category";
    }
    search.placeholder = "Search By " + searchMood;

    search.focus();
    search.value = "";
    showDate();
}

function searchDate(value) {
    console.log(value);
    table = "";
    for (let i = 0; i < dataPro.length; i++) {
        if (searchMood == "title") {
            // for (let i = 0; i < dataPro.length; i++) {
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
                <td><button id="update"onclick="update(${i})">update</button></td>
                <td><button id="delate"onclick=delateDate(${i})>Dleate</button></td>
                `;

            }

            // }


        } else {
            // for (let i = 0; i < dataPro.length; i++) {
            if (dataPro[i].category.includes(value.toLowerCase())) {
                console.log(i);


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
                <td><button id="update"onclick="update(${i})">update</button></td>
                <td><button id="delate"onclick=delateDate(${i})>Dleate</button></td>
                `;

            }

            // }

        }

    }
    tbody.innerHTML = table;
}
//clean date