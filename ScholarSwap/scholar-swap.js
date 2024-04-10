if (document.readyState == 'loading') { //makes sure page is loaded before script runs
    document.addEventListener('DOMContentLoaded', ready)
}
else {
    ready()
}

function ready() {
    var removeCartItemButtons = document.getElementsByClassName('remove-btn');

    for (var i = 0; i < removeCartItemButtons.length; i++) {
        var button = removeCartItemButtons[i]

        button.addEventListener('click', removeCartItem)
    }

    var quantityInputs = document.getElementsByClassName('cart-quantity-input')
    for (var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i]
        input.addEventListener('change', quantityChanged) //any time quantity is changed
    }

    var addToCartButtons = document.getElementsByClassName('add-to-cart-btn')
    for (var i = 0; i < addToCartButtons.length; i++) {
        var button = addToCartButtons
        button.addEventListener('click', addToCartClicked)
    }
}

function quantityChanged(event) {
    var input = event.target
    //check validity
    if (isNaN(input.value || input.value <= 0)) {
        input.value = 1 //lowest possible quantity
        updateCartTotal()
    }
}

//remove item from cart
function removeCartItem(event) {
    var buttonClicked = event.target
    buttonClicked.parentElement.parentElement.remove() //removes the div that contains the item in cart
    updateCartTotal()

}

//update total items and price
function updateCartTotal() {
    var cartItemContainer = document.getElementsByClassName('cart-items')[0]
    var cartRows = cartItemContainer.getElementsByClassName('cart-row')

    var total = 0

    for (var i = 0; i < cartRows.length; i++) {
        var cartRow = cartRows[i]
        var priceElement = cartRow.getElementsByClassName('cart-price')[0]
        var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')
        var price = parse.Float(priceElement.innerText.replace('$', ''))//gets the price of item removing the $ sign and converting to float 
        var quantity = quantityElement.value
        total += price * quantity

    }

    total = Math.round(total * 100) / 100
    document.getElementsByClassName('cart-total-price')[0].innerText = '$' + total //updates total price displayed 
}

function addToCartClicked(event) {
    var button = event.target
    var book = button.parentElement
    var title = book.getElementsByClassName('book-card-title')[0].innerText
    var price = book.getElementsByClassName('book-card-price')[0].innerText
    var imageSrc = book.getElementsByClassName('book-card-img')[0].src
    addItemToCart(title, price, imageSrc)
}

function addItemToCart(title, price, imageSrc) {
    var cartRow = document.createElement('div')
    cartRow.classList.add('cart-row')
    var cartItems = document.getElementsByClassName('cart-content')
    var cartItemNames = cartItems.getElementsByClassName('cart-item-title')
    for (var i = 0; i < cartItemNames.length; i++) {
        if (cartItemNames[i].innerText == title) { //item already added to cart
            alert('This book has already been added to your cart.')
            return
        }
    }
    var cartRowContents = `<div class="cart-item cart-column">
    <img class="cart-item-image" src="${imageSrc}" width="100" height="100">
    <span class="cart-item-title">${title}</span>
</div>
<span class="cart-price cart-column">${price}</span>
<div class="cart-quantity cart-column">
    <input class="cart-quantity-input" type="number" value="1">
    <button class="remove-btn" type="button">REMOVE</button>
</div>`
    cartRow.innerHTML = cartRowContents
    cartItems.append(cartRow) //adds div of new cart item
    cartItemNames.getElementsByClassName('remove-btn')[0].addEventListener(click,removeCartItem)
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change',quantityChanged)
}
