let root = document.getElementById('root');
let cartBox = document.querySelector('.cartBox');
let cartList = document.getElementById('cartlist');
let span = document.querySelector('.sp');

async function fetchApi() {
    let result = await fetch('https://fakestoreapi.com/products');
    let data = await result.json();
    return data;
}
fetchApi()
    .then((data) => {
        console.log(data);
        function displayData() {
            data.map((item) => {
                let card = document.createElement('div');
                card.classList.add('card');
                let star = '';
                let temp = Math.round(item.rating.rate);
                for (let i = 1; i <= temp; i++) {
                    star += '⭐';
                }
                card.innerHTML = `
            <img src="${item.image}" alt="">
            <h2>${item.title}</h2>
            <h3>Price:- ${Math.round(item.price * 10)} Rs.</h3>
            <h3>Category:- ${item.category}</h3>
            <h3>Rating:- ${star} </h3>
            <button onClick="addToCart(${item.id})">Add to Cart</button>`;
                root.appendChild(card);
            })
        }

        window.addToCart = (pId) => {
            // console.log(pId)
            let product = data.find((item) => item.id == pId );
            let row = document.createElement('div');
            row.classList.add('row');
            if (product) {
                row.innerHTML = `
                        <div>
                        <h2>${product.title}</h2>
                        <h2>Price:-${Math.round(product.price * 10)}</h2>
                        </div>
                        <button  onClick="removeCart(${product.id})">Remove</button>`;
                cartBox.prepend(row);
            }
            let cartItems = JSON.parse(localStorage.getItem('cart')) || [];
            cartItems.push(product);
            localStorage.setItem('cart', JSON.stringify(cartItems));

            //cart Price count and display
            let Price = cartItems.reduce((acc,current)=> acc + Math.round(current.price*10),0)
            document.getElementById('tp').innerHTML= Price;

            //Cart Item Count
            document.querySelector('.sp').innerHTML = cartItems.length;
            
        }
        window.removeCart = (index)=>{
            console.log(index)
            let cartItems = JSON.parse(localStorage.getItem('cart')) || [];
            cartItems.splice(index,1);
            localStorage.setItem('cart', JSON.stringify(cartItems));

            //Render data from local Storage after removing
            cartBox.innerHTML = '';
            let cartItem = JSON.parse(localStorage.getItem('cart')) || [];
            cartItem.map((product,index) => {
                let row = document.createElement('div');
                row.classList.add('row');
                row.innerHTML = `
            <div>
            <h2>${product.title}</h2>
            <h2>Price:-${Math.round(product.price*10)}</h2>
            </div>
            <button onClick="removeCart(${index})">Remove</button>`;
                cartBox.prepend(row);
            })
            let Price = cartItems.reduce((acc,current)=> acc + Math.round(current.price*10),0)
            let priceSection = document.createElement('div');
            priceSection.classList.add('priceSection');
            priceSection.innerHTML = `<h2>Total Price:-</h2>
            <h2 id='tp'>${Price}</h2>`;
            cartBox.after(priceSection);

            //Count Cart Item
            document.querySelector('.sp').innerHTML = cartItems.length;

            //hide span if none
            if(span.innerHTML ==0){
                span.style.display = 'none';
            }
        }

        function displayCart() {
            let cartItems = JSON.parse(localStorage.getItem('cart')) || [];
            cartItems.map((product,index) => {
                let row = document.createElement('div');
                row.classList.add('row');
                row.innerHTML = `
            <div>
            <h2>${product.title}</h2>
            <h2>Price:-${Math.round(product.price*10)}</h2>
            </div>
            <button onClick="removeCart(${index})">Remove</button>`;
                cartBox.prepend(row);
            })
            let Price = cartItems.reduce((acc,current)=> acc + Math.round(current.price*10),0)
            let priceSection = document.createElement('div');
            priceSection.classList.add('priceSection');
            priceSection.innerHTML = `<h2>Total Price:-</h2>
            <h2 id='tp'>${Price}</h2>`;
            cartBox.after(priceSection);

             //Cart Item Count
             document.querySelector('.sp').innerHTML = cartItems.length;
        }

        let flag = true;
        cartList.addEventListener('click', () => {
            if (flag) {
                cartBox.style.display = 'block';
                document.querySelector('.priceSection').style.display = 'flex'
                flag = false;
            } else {
                cartBox.style.display = 'none';
                document.querySelector('.priceSection').style.display = 'none'
                flag = true;
            }
        })
        displayData();
        displayCart();
        let cartItems = JSON.parse(localStorage.getItem('cart')) || [];
        span.innerHTML = cartItems.length;
        if(span.innerHTML ==0){
            span.style.display = 'none';
        }

    })
    .catch((err) => {
        console.log(err)
    })
