displayCartProduts()
//**Cart function
function openCart()
{
    const cart = document.getElementById("cartItemBox");
    cart.classList.toggle('openCart');
}


//**Add to cart
let products =[];
let carts = document.querySelectorAll('.add-cart');
let carts2 = document.querySelectorAll('.buyNow');
let cartItem= document.querySelectorAll('.cartItem');
let productImages= document.querySelectorAll('.cartItem .image');
let productName= document.querySelectorAll('.cartItem .heading h2');
for (let i=0; i<cartItem.length; i++)
{
    let itemImg = productImages[i].innerHTML;
    itemImg = itemImg.trim('/n')
    let Name = productName[i].innerText ;
    Name = Name.split(" ");
    let itemPrice = Name[1].trim()
    itemPrice = parseInt(itemPrice)
    products.push({image:itemImg,tag:Name[0],price:itemPrice,inCart:0,index:i},)
}
for (let i=0; i<carts.length; i++)
{
    carts[i].addEventListener('click',()=>
    {
       cartNumbers(products[i]);
       totalCost(products[i]);
       displayCartProduts()
    })
    carts2[i].addEventListener('click',()=>
    {
       cartNumbers(products[i]);
       totalCost(products[i]);
       displayCartProduts()
    })
}

//**Funtions to count the number of items are added in cart and update it 
function onLoadCartNumbers()
{
    //it checks whether the cart is empty or not 
    // if not then it will show the exiting number of items
    let itemNumbers = localStorage.getItem('cartNumbers');
    if (itemNumbers)
    {
        document.querySelector('#sec1 #shoppingCart span').textContent = itemNumbers;
    }
}

function cartNumbers(product)
{
    let itemNumbers = localStorage.getItem('cartNumbers');
    itemNumbers = parseInt(itemNumbers);
    if (itemNumbers)
    {
        localStorage.setItem('cartNumbers',itemNumbers+1);
        document.querySelector('#sec1 #shoppingCart span').textContent = itemNumbers + 1;
    }
    else
    {
        localStorage.setItem('cartNumbers',1);
        document.querySelector('#shoppingCart span').textContent = 1;
    }
    setItems(product);
}

function setItems(product)
{
    let cartProducts = localStorage.getItem('productsInCart');
    cartProducts = JSON.parse(cartProducts);
    let nme = product.tag.trim()
    if(cartProducts != null )
    {
        if ( cartProducts[nme] == undefined)
        {
            cartProducts ={
                ...cartProducts,
                [nme]:product
            }
        }
        cartProducts[nme].inCart += 1
    }
    else
    {
        product.inCart = 1;
        cartProducts = {
            [nme]:product
        }
    }
    localStorage.setItem("productsInCart",JSON.stringify(cartProducts));
}


function totalCost(product)
{
    let cartCost = localStorage.getItem('totalCost');
    if (cartCost != null)
    {
        cartCost = parseInt(cartCost);
        localStorage.setItem('totalCost',cartCost + product.price);
    }
    else if (cartCost == 0)
    {
        cartCost = parseInt(cartCost);
        localStorage.setItem('totalCost',cartCost + product.price);
    }
    else
    {
        localStorage.setItem('totalCost',product.price);
    }
}


function displayCartProduts()
{
    let cartProducts = localStorage.getItem('productsInCart');
    cartProducts = JSON.parse(cartProducts);
    let productContainer = document.querySelector("#itemBox");
    if (cartProducts && productContainer)
    {
        productContainer.innerHTML = ''
        Object.values(cartProducts).map(item =>
            {
                productContainer.innerHTML += `
                <div class="productContainer" id="${item.tag.trim()}">
                    <div class="productHeader">
                        <h4 class="product-title">PRODUCT</h4>
                        <h4 class="price">PRICE</h4>
                        <h4 class="quantity">QUANTITY</h4>
                        <h4 class="total">TOTAL</h4>
                        <div class="closeIcon">
                            <img src="../Icons/closeIcon.png" onclick="remove(${item.tag.trim()},${item.index})" alt="">
                        </div>
                    </div>
                    <div class="productsINCart">
                    <div class="product">
                        ${item.image}
                        <h2>${item.tag.trim()}</h2>
                    </div>
                    <div class="price">
                        <h2>Rs.${item.price}.00</h2>
                    </div>
                    <div class="quantity">
                        <h2><span ><img src="../Icons/leftArrow.png" alt="" class="minus" onclick="minus(${item.price},${item.index},${item.tag.trim()})"></span><span class="${item.index}">${item.inCart}</span><span ><img src="../Icons/rightArrow.png" alt="" class="plus" onclick="plus(${item.price},${item.index})"></span></h2>
                    </div>
                    <div class="total">
                        <h2>Rs.<span class="${item.index}">${item.inCart * item.price}</span>.00</h2>
                    </div>
                </div>
                </div>
                `
            });
    }
    else
    {
        productContainer.innerHTML = '<h1 id="h1">Your Cart is empty</h1>';
    }


    let itemNumbers = localStorage.getItem('cartNumbers');
    if(itemNumbers != null)
    {
        itemNumbers = parseInt(itemNumbers)
        document.getElementById('numberOFitems').innerText = itemNumbers;
    }
    else
    {
        document.getElementById('numberOFitems').textContent = 0;
    }



    let cartCost = localStorage.getItem('totalCost')
    if(cartCost != null)
    {
        cartCost = parseInt(cartCost);
        document.getElementById('subTotal').innerText =cartCost;
        document.getElementById('total').innerText =cartCost;
    }
    else
    {
        document.getElementById('subTotal').innerText =0;
        document.getElementById('total').innerText =0;
    }

};

function minus(price,index,name)
{
    let all = document.getElementsByClassName(index);
    let num = all[0].innerText;
    let oldPrice = all[1].innerText;
    num = parseInt(num);
    oldPrice = parseInt(oldPrice);
    if (num==1)
    {
        all[0].textContent = num;
        all[1].textContent = oldPrice;
    }
    else
    {
        num -= 1
        all[0].textContent = num;
        all[1].textContent = oldPrice - price;
        let cartProducts = localStorage.getItem('productsInCart');
        cartProducts = JSON.parse(cartProducts);
        let nme = products[index].tag.trim()
        if(cartProducts != null )
        {
            if ( cartProducts[nme] == undefined)
            {
                cartProducts ={
                    ...cartProducts,
                    [nme]:products[index]
                }
            }
            cartProducts[nme].inCart -= 1
        }
        else
        {
        products[index].inCart = 1;
        cartProducts = {
                [nme]:products[index]
            }
        }
        localStorage.setItem("productsInCart",JSON.stringify(cartProducts));


        let itemNumbers = localStorage.getItem('cartNumbers');
        itemNumbers = parseInt(itemNumbers);
        itemNumbers -= 1
        localStorage.setItem('cartNumbers',itemNumbers);
        document.getElementById('numberOFitems').innerText = itemNumbers;
        document.querySelector('#shoppingCart span').textContent = itemNumbers;

        let cartCost = localStorage.getItem('totalCost')
        cartCost = parseInt(cartCost);
        cartCost -= price
        localStorage.setItem('totalCost',cartCost);
        document.getElementById('subTotal').innerText =cartCost;
        document.getElementById('total').innerText =cartCost;
    }
}

function plus(price,index)
{
  
    let all = document.getElementsByClassName(index);
    let num = all[0].innerText;
    let oldPrice = all[1].innerText;
    num = parseInt(num);
    oldPrice = parseInt(oldPrice);
    num += 1
    all[0].textContent = num;
    all[1].textContent = oldPrice + price;


    let cartProducts = localStorage.getItem('productsInCart');
    cartProducts = JSON.parse(cartProducts);
    let nme = products[index].tag.trim()
    if(cartProducts != null )
    {
        if ( cartProducts[nme] == undefined)
        {
            cartProducts ={
                ...cartProducts,
                [nme]:products[index]
            }
        }
        cartProducts[nme].inCart += 1
    }
    else
    {
        products[index].inCart = 1;
        cartProducts = {
            [nme]:products[index]
        }
    }
    localStorage.setItem("productsInCart",JSON.stringify(cartProducts));


    let itemNumbers = localStorage.getItem('cartNumbers');
    itemNumbers = parseInt(itemNumbers);
    itemNumbers += 1
    localStorage.setItem('cartNumbers',itemNumbers);
    document.getElementById('numberOFitems').innerText = itemNumbers;
    document.querySelector('#shoppingCart span').textContent = itemNumbers;

    let cartCost = localStorage.getItem('totalCost')
    cartCost = parseInt(cartCost);
    cartCost += price
    localStorage.setItem('totalCost',cartCost);
    document.getElementById('subTotal').innerText =cartCost;
    document.getElementById('total').innerText =cartCost;
}


function remove(name,index)
{  
    let all = document.getElementsByClassName(index);
    let num = all[0].innerText;
    let oldPrice = all[1].innerText;
    num = parseInt(num);
    oldPrice = parseInt(oldPrice);

    
    let cartProducts = localStorage.getItem('productsInCart'); 
    if (cartProducts == null) {
        cartProducts = []
    }
    else {
        cartProducts = JSON.parse(cartProducts);
    }
    products[index].inCart=0;
    delete cartProducts[`${name.id}`];
    name.outerHTML = "";
    localStorage.setItem("productsInCart", JSON.stringify(cartProducts));


    let itemNumbers = localStorage.getItem('cartNumbers');
    itemNumbers = parseInt(itemNumbers);
    itemNumbers -= num
    localStorage.setItem('cartNumbers',itemNumbers);
    document.getElementById('numberOFitems').innerText = itemNumbers;
    document.querySelector('#shoppingCart span').textContent = itemNumbers;
    

    let cartCost = localStorage.getItem('totalCost')
    cartCost = parseInt(cartCost);
    cartCost -= oldPrice
    localStorage.setItem('totalCost',cartCost);
    document.getElementById('subTotal').innerText =cartCost;
    document.getElementById('total').innerText =cartCost;
    
    if(itemNumbers == 0 &&  cartCost == 0)
    {
        localStorage.removeItem('productsInCart');
        localStorage.removeItem('cartNumbers');
        localStorage.removeItem('totalCost');
        let productContainer = document.querySelector("#itemBox");
        productContainer.innerHTML = '<h1 id="h1">Your Cart is empty</h1>';
    }

};
onLoadCartNumbers()