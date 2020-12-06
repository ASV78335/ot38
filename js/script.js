'use strict';

let form = document.querySelector('.main_form');

let overlay = document.getElementById('overlay');
let callForm = document.getElementById('call');
let orderForm = document.getElementById('order');
let thanksForm = document.getElementById('thanks');

let modalClose = document.querySelectorAll('.modal_close');
let call = document.querySelector('.header_call');
let order = document.querySelector('.header_order');
let input = document.querySelectorAll('input');
let btnTop = document.querySelector('.btn_top');
let start = document.getElementById('start');

form.addEventListener('submit', function(event) {
	event.preventDefault();			// Отмена перезагрузки страницы

    let request = new XMLHttpRequest();
    //	request.open((method, url, async, login, pass);
    request.open('POST', 'mailer/smart.php');
    request.setRequestHeader('Content-type', 'application/json; charset=utf-8');

	let formData =  new FormData(form);

    let obj = {};
    formData.forEach(function(value, key) {
        obj[key] = value;
    });
    let json = JSON.stringify(obj);
    request.send(json);
  
    request.addEventListener('readystatechange', function() {
        if (request.readyState === 4 && request.status == 200) {
            console.log("OK");
            overlay.style.display = 'block';
            thanksForm.style.display = 'block';
            input.forEach(function(item) {
                item.value = "";
            });
                } else {
        console.log("Что-то пошло не так!");
        }
    });

});


call.addEventListener('click', function() {
    overlay.style.display = 'block';
    callForm.style.display = 'block';
});

order.addEventListener('click', function() {
    overlay.style.display = 'block';
    orderForm.style.display = 'block';
});

modalClose.forEach(function(item) {
    item.addEventListener('click', function() {
        callForm.style.display = 'none';
        orderForm.style.display = 'none';
        thanksForm.style.display = 'none';
        overlay.style.display = 'none';
    }) ;
});

window,addEventListener('scroll', function() {
    if (window.scrollY > 1200) {
        btnTop.style.display = 'flex';
    }
    else {
        btnTop.style.display = 'none';
    }
});

let timeOut;
function goUp() {
   let top = Math.max(document.body.scrollTop,document.documentElement.scrollTop);
   if(top > 0) {
      window.scrollBy(0,-400);
      timeOut = setTimeout('goUp()', 20);
   } else clearTimeout(timeOut);
}

btnTop.addEventListener('click', function() {
    goUp();
});

