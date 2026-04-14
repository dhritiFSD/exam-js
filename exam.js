let products = JSON.parse(localStorage.getItem("products")) || [];
let editIndex = -1;

// ADD PRODUCT
function addProduct() {
    let title = document.getElementById("div1").value;
    let price = document.getElementById("div2").value;
    let image = document.getElementById("div3").value;
    let category = document.getElementById("div4").value;

    if (title === "" || price === "") {
        alert("Title and Price are required!");
        return;
    }

    let product = {
        id: Date.now(),
        title,
        price: Number(price),
        image,
        category
    };

    if (editIndex === -1) {
        products.push(product);
    } else {
        products[editIndex] = product;
        editIndex = -1;
    }

    saveData();
    clearFields();
    displayProducts();
}

// DISPLAY PRODUCTS
function displayProducts() {
    let list = document.getElementById("productList");
    list.innerHTML = "";

    let search = document.getElementById("search").value.toLowerCase();
    let filter = document.getElementById("filter").value;
    let sort = document.getElementById("sort").value;

    let filtered = products.filter(p =>
        p.title.toLowerCase().includes(search) &&
        (filter === "" || p.category === filter)
    );

    if (sort === "low") {
        filtered.sort((a, b) => a.price - b.price);
    } else if (sort === "high") {
        filtered.sort((a, b) => b.price - a.price);
    }

    filtered.forEach((p, index) => {
        let card = document.createElement("div");
        card.className = "card";

        card.innerHTML = `
            <img src="${p.image}" alt="">
            <h3>${p.title}</h3>
            <p>₹${p.price}</p>
            <p>${p.category}</p>
            <button onclick="editProduct(${index})">Edit</button>
            <button onclick="deleteProduct(${index})">Delete</button>
        `;

        list.appendChild(card);
    });
}

// DELETE
function deleteProduct(index) {
    products.splice(index, 1);
    saveData();
    displayProducts();
}

// EDIT
function editProduct(index) {
    let p = products[index];

    document.getElementById("title").value = p.title;
    document.getElementById("price").value = p.price;
    document.getElementById("image").value = p.image;
    document.getElementById("category").value = p.category;

    editIndex = index;
}

// SAVE TO LOCAL STORAGE
function saveData() {
    localStorage.setItem("products", JSON.stringify(products));
}

// CLEAR INPUT
function clearFields() {
    document.getElementById("title").value = "";
    document.getElementById("price").value = "";
    document.getElementById("image").value = "";
    document.getElementById("category").value = "";
}

// LOAD DATA ON START
displayProducts();