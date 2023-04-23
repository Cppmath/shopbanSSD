import storage from "./ulti/storage.js";
import { dataS } from './data/data.js'

const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

const productList = $('.main-product-list')
const cartNumber = $('.header-cart-number')
const cartItemList = $('.buy-done-list')
const tienElement = $('.buy-done-total-coin')
const mainProductList = $('.main-product-list')
var data = storage.get()
    if(!data.products){
        data = dataS
        storage.set(data)
    }

// render sp
productList.innerHTML = data.products.map((product, index) => {
    return `
    <!-- product-item 0-->
    <div class="product-item" data-index = "${product.id}">
        <div class="product-modal">
            <div class="product-modal-buy" data-index="${product.id}">
                <i class="product-modal-buy-icon fa-solid fa-cart-plus"></i>
            </div>
            <div class="product-modal-show">
                <i class="product-modal-show-icon fa-solid fa-eye"></i>
            </div>
        </div>
        <div class="product-item-sale">
            -${product.sale}%
        </div>
        <img class="product-item-img" src="${product.img + '.webp'}" alt="">
        <span class="product-item-title">
            ${product.title}
        </span>
        <div class="product-item-price">
            <span class="product-item-current_price">
                ${product.price + '.000đ'}
            </span>
            <span class="product-item-before_price">
                ${product.oldPrice + '.000đ'}
            </span>
        </div>
        <div class="product-item-rate">
            <i class="product-item-rate-icon fa-solid fa-star"></i>
            <i class="product-item-rate-icon fa-solid fa-star"></i>
            <i class="product-item-rate-icon fa-solid fa-star"></i>
            <i class="product-item-rate-icon fa-solid fa-star"></i>
            <i class="product-item-rate-icon fa-solid fa-star"></i>
            <span class="product-item-rate-number">
                (${product.vote} đánh giá)
            </span>
        </div>
    </div>
    `
})
    .join('')

// render cart
function renderCart(){
    data = storage.get()
    var productsMua = 
        data.products.filter((product) => product.luotMua > 0)
            .map((product) => `
                <!-- item 0 -->
                <div class="buy-done-item" data-index="${product.id}">
                    <div class="buy-done-item-pic">
                        <img class="buy-done-item-img" src="${product.img + '.webp'}" alt="" >
                    </div>
                    <div class="buy-done-item-info">
                        <div class="buy-done-item-title">
                           ${product.title}
                        </div>
                        <span class="buy-done-item-price">
                            ${product.price + '.000đ'}
                        </span>
                        <div class="buy-done-item-btn">
                            <span class="buy-done-item-btn-distract" data-index="${product.id}">
                                -
                            </span>
                            <span class="buy-done-item-number">
                                ${product.luotMua}
                            </span>
                            <span class="buy-done-item-btn-add" data-index="${product.id}">
                                +
                            </span>
                        </div>
                    </div>
                    <div class="buy-done-item-delete" data-index="${product.id}">
                        <i class="buy-done-item-delete-icon fa-solid fa-xmark"></i>
                    </div>
                </div>
            `)          
        cartItemList.innerHTML = productsMua.join('')
    // tinh tong tien
    ;(function tinhTien() {
      let  tongTien = 
            data.products.filter(product => product.luotMua > 0)
                    .reduce((total,product) => total + product.luotMua * product.price, 0)
    tienElement.innerHTML = `${tongTien}.000đ`     
    })()

    cartNumber.innerHTML = `${data.tongLuotMua}`
    storage.set(data)
}
renderCart()

// handle click mua
mainProductList.onclick = (e) => {
    if(e.target.closest('.product-modal-buy')){
        let index = e.target.closest('.product-modal-buy').dataset.index;
        data = storage.get()     
        data.products[index].luotMua++;
        // render so luong mua
        data.tongLuotMua++;
        cartNumber.innerHTML = `${data.tongLuotMua}`
        storage.set(data)
        renderCart();
    }
}

// handle cart
cartItemList.onclick = (e) => {
    if(e.target.closest('.buy-done-item-btn-add')){
        let index = e.target.dataset.index;
        data = storage.get()     
        data.products[index].luotMua++
        data.tongLuotMua++
        cartNumber.innerHTML = `${data.tongLuotMua}`
        storage.set(data)
        renderCart()
    }
    if(e.target.closest('.buy-done-item-btn-distract')){
        let index = e.target.dataset.index;
        data = storage.get()     
        data.products[index].luotMua--
        data.tongLuotMua--
        cartNumber.innerHTML = `${data.tongLuotMua}`
        storage.set(data)
        renderCart()
    }
    if(e.target.closest('.buy-done-item-delete')){

        let index = e.target.closest('.buy-done-item-delete').dataset.index;
        data = storage.get()     
        let boLuotMua = data.products[index].luotMua;
        data.tongLuotMua = data.tongLuotMua -boLuotMua;
        cartNumber.innerHTML = `${data.tongLuotMua}`
        data.products[index].luotMua = 0;
        storage.set(data)
        renderCart()
    }
}
