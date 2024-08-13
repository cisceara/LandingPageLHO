// Mobile menu ------------------------------------------------
const hamburger = document.querySelector('.hamburger');
const navbar = document.querySelector('.navbar');
const links = document.querySelectorAll('.links .link');

hamburger.addEventListener('click', function(event) {
    navbar.classList.toggle('open');
    event.stopPropagation(); 
});

links.forEach(link => {
    link.addEventListener('click', function() {
        if (navbar.classList.contains('open')) {
            navbar.classList.remove('open');
        }
    });
});

document.addEventListener('click', function(event) {
    if (!navbar.contains(event.target) && !hamburger.contains(event.target)) {
        navbar.classList.remove('open');
    }
});

// BANNERS ------------------------------------------------
let items = document.querySelectorAll('.box-banners .list .item');
let next = document.getElementById('next');
let prev = document.getElementById('prev');
let thumbnails = document.querySelectorAll('.thumbnail .item');

// parâmetros
let countItem = items.length;
let itemActive = 0;

// Próximo
next.onclick = function () {
    itemActive = itemActive + 1;
    if (itemActive >= countItem) {
        itemActive = 0;
    }
    showhome();
}
// Voltar
prev.onclick = function () {
    itemActive = itemActive - 1;
    if (itemActive < 0) {
        itemActive = countItem - 1;
    }
    showhome();
}
let refreshInterval = setInterval(() => {
    next.click();
}, 10000)
function showhome() {

    let itemActiveOld = document.querySelector('.box-banners .list .item.active');
    let thumbnailActiveOld = document.querySelector('.thumbnail .item.active');
    itemActiveOld.classList.remove('active');
    thumbnailActiveOld.classList.remove('active');

    items[itemActive].classList.add('active');
    thumbnails[itemActive].classList.add('active');

    clearInterval(refreshInterval);
    refreshInterval = setInterval(() => {
        next.click();
    }, 10000)
}

thumbnails.forEach((thumbnail, index) => {
    thumbnail.addEventListener('click', () => {
        itemActive = index;
        showhome();
    })
});

// SERVIÇOS ------------------------------------------------

var btns = document.querySelectorAll(".btn-service");
var spans = document.querySelectorAll(".close");
btns.forEach(button => {
    button.onclick = function() {
        var modalId = button.getAttribute("data-modal");
        var modal = document.getElementById(modalId);
        modal.style.display = "block";
    }
});

spans.forEach(span => {
    span.onclick = function() {
        var modal = span.closest(".modal");
        modal.style.display = "none";
    }
});

window.onclick = function(event) {
    if (event.target.classList.contains('modal')) {
        event.target.style.display = "none";
    }
};

// TÉCNICAS ANÁLITICAS ------------------------------------------------
let card = document.querySelectorAll('.box-card .card');
let action = 0;
function loadShow(){
    card[action].style.transform = `none`;
    card[action].style.zIndex = 1;
    card[action].style.filter = 'none';
    card[action].style.opacity = 1;
    
    // Direita
    let stt = 0;
    for(var i = action + 1; i < card.length; i ++){
        stt++;
        card[i].style.transform = `translateX(${300*stt}px) scale(${1 - 0.3*stt}) perspective(40px) rotateY(-1deg)`;
        card[i].style.zIndex = 0;
        card[i].style.filter = 'blur(10px)';
        card[i].style.opacity = stt > 1 ? 0 : 0.2;
    }
    stt = 0;
    // Esquerda
    for(var i = (action - 1); i >= 0; i --){
        stt++;
        card[i].style.transform = `translateX(${-300*stt}px) scale(${1 - 0.3*stt}) perspective(40px) rotateY(1deg)`;
        card[i].style.zIndex = 0;
        card[i].style.filter = 'blur(10px)';
        card[i].style.opacity = stt > 2 ? 0 : 0.2;
    }
}
loadShow();

let right = document.getElementById('right');
let left = document.getElementById('left');
right.onclick = function (){
    action = action + 1 < card.length ? action + 1 : action;
    loadShow();
}
left.onclick = function (){
    action = action - 1 >= 0 ? action - 1 : action;
    loadShow();
};

// FAQ ------------------------------------------------
const accordionContent = document.querySelectorAll(".accordion-content");
accordionContent.forEach((item, index) => {
    let header = item.querySelector(".accordion-body");
    header.addEventListener("click", () => {
        item.classList.toggle("open");

        let description = item.querySelector(".description");
        if (item.classList.contains("open")) {
            description.style.height = `${description.scrollHeight}px`;
            item.querySelector("i").classList.replace("fa-plus", "fa-minus");
        } else {
            description.style.height = "0px";
            item.querySelector("i").classList.replace("fa-minus", "fa-plus");
        }
        removeOpen(index);
    })
})

function removeOpen(index1) {
    accordionContent.forEach((item2, index2) => {
        if (index1 != index2) {
            item2.classList.remove("open");

            let des = item2.querySelector(".description");
            des.style.height = "0px";
            item2.querySelector("i").classList.replace("fa-minus", "fa-plus");
        }
    })
};


