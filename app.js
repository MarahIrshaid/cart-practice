"use strict"
console.log("hi");
let carts = document.querySelectorAll(".add-to-cart");


let products = [
    {
        name: 'Pink cover',
        tag: 'pinkCover',
        price: 15,
        inCart: 0
    },
    {
        name: 'Green cover',
        tag: 'greenCover',
        price: 10,
        inCart: 0
    },
    {
        name: 'Grey cover',
        tag: 'greyCover',
        price: 20,
        inCart: 0
    },

]
function onLoadCartProducts() {
    let productNumbers = localStorage.getItem('cartNumbers');

    if (productNumbers) {
        document.querySelector(".cart span").textContent = productNumbers;

    }

}

for (let index = 0; index < carts.length; index++) {
    carts[index].addEventListener('click', () => {
        cartNumbers(products[index]);
        totalCost(products[index]);
    })
}
function cartNumbers(products) {
    console.log('the product clicked is', products);
    let productNumbers = localStorage.getItem('cartNumbers');
    productNumbers = parseInt(productNumbers);
    console.log(productNumbers);
    if (productNumbers) {
        localStorage.setItem('cartNumbers', productNumbers + 1);
        document.querySelector(".cart span").textContent = productNumbers + 1;
    }
    else {
        localStorage.setItem('cartNumbers', 1);
        document.querySelector(".cart span").textContent = 1;
    }
    setItems(products);
}

function setItems(products) {
    let cartItems = localStorage.getItem("productsInCart");
    cartItems = JSON.parse(cartItems);

    if (cartItems != null) {
        if (cartItems[products.tag] == undefined) {
            cartItems = {
                ...cartItems,
                [products.tag]: products
            }
        }
        cartItems[products.tag].inCart += 1;
    } else {
        products.inCart = 1;
        cartItems = {
            [products.tag]: products
        }
    }



    localStorage.setItem("productsInCart", JSON.stringify(cartItems));
}

function totalCost(products){
    let cartCost = localStorage.getItem("totalCost");
    console.log("My cartCost is" , cartCost);
    console.log(typeof cartCost);
    if (cartCost !=null){
        cartCost =parseInt(cartCost);

        localStorage.setItem("totalCost", cartCost + products.price);
    }
    else {
        localStorage.setItem("totalCost" ,products.price);
    }
}
function displayCart(){
    let cartItems = localStorage.getItem("productsInCart");
    cartItems= JSON.parse(cartItems);
    let productContainer = document.querySelector(".products");
    let cartCost = localStorage.getItem("totalCost");

    if( cartItems && productContainer ) {
        productContainer.innerHTML = '';
        Object.values(cartItems).map( (item, index) => {
            productContainer.innerHTML += 
            `<div class="product"><ion-icon name="close-circle"></ion-icon><img src="./images/${item.tag}.jpg" />
                <span class="sm-hide">${item.name}</span>
            </div>
            <div class="price sm-hide">$${item.price},00</div>
            <div class="quantity">
                <ion-icon class="decrease " name="arrow-dropleft-circle"></ion-icon>
                    <span>${item.inCart}</span>
                <ion-icon class="increase" name="arrow-dropright-circle"></ion-icon>   
            </div>
            <div class="total">$${item.inCart * item.price},00</div>`;
        });
        productContainer.innerHTML += `
        <div class="basketTotalContainer">
            <h4 class="basketTotalTitle">Basket Total</h4>
            <h4 class="basketTotal">$${cartCost},00</h4>
        </div>`
    }
}




onLoadCartProducts();
displayCart();