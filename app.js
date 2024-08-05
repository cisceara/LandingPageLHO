//BANNERS ------------------------------------------------
let items = document.querySelectorAll('.box-banners .list .item');
let next = document.getElementById('next');
let prev = document.getElementById('prev');
let thumbnails = document.querySelectorAll('.thumbnail .item');

//parâmetros
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
// Automático
let refreshInterval = setInterval(() => {
    next.click();
}, 5000)
function showhome() {

    // remover item antigo
    let itemActiveOld = document.querySelector('.box-banners .list .item.active');
    let thumbnailActiveOld = document.querySelector('.thumbnail .item.active');
    itemActiveOld.classList.remove('active');
    thumbnailActiveOld.classList.remove('active');

    // Ativar novo item
    items[itemActive].classList.add('active');
    thumbnails[itemActive].classList.add('active');

    // Limpar intervalo automátio
    clearInterval(refreshInterval);
    refreshInterval = setInterval(() => {
        next.click();
    }, 5000)
}

// Clique minicard
thumbnails.forEach((thumbnail, index) => {
    thumbnail.addEventListener('click', () => {
        itemActive = index;
        showhome();
    })
});

//ANÁLISES ------------------------------------------------
let card = document.querySelectorAll('.box-card .card');
let action = 0;
function loadShow(){
    card[action].style.transform = `none`;
    card[action].style.zIndex = 1;
    card[action].style.filter = 'none';
    card[action].style.opacity = 1;

    let stt = 0;
    for(var i = action + 1; i < card.length; i ++){
        stt++;
        card[i].style.transform = `translateX(${300*stt}px) scale(${1 - 0.2*stt}) perspective(50px) rotateY(1deg)`;
        card[i].style.zIndex = 0;
        card[i].style.filter = 'blur(10px)';
        card[i].style.opacity = stt > 1 ? 0 : 1;
    }
    stt = 0;
    for(var i = (action - 1); i >= 0; i --){
        stt++;
        card[i].style.transform = `translateX(${-300*stt}px) scale(${1 - 0.2*stt}) perspective(50px) rotateY(-1deg)`;
        card[i].style.zIndex = 0;
        card[i].style.filter = 'blur(0px)';
        card[i].style.opacity = stt > 2 ? 0 : 1;
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
}