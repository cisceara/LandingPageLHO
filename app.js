// MOBILE MENU ----------------------------------------------
const hamburger = document.querySelector('.hamburger');
const navbar = document.querySelector('.navbar');
const links = document.querySelectorAll('.links .link');

hamburger.addEventListener('click', function (event) {
    navbar.classList.toggle('open');
    event.stopPropagation();
});

links.forEach(link => {
    link.addEventListener('click', function () {
        if (navbar.classList.contains('open')) {
            navbar.classList.remove('open');
        }
    });
});

document.addEventListener('click', function (event) {
    if (!navbar.contains(event.target) && !hamburger.contains(event.target)) {
        navbar.classList.remove('open');
    }
});

// BANNERS ---------------------------------------------------
let items = document.querySelectorAll('.box-banners .list .item');
let next = document.getElementById('next');
let prev = document.getElementById('prev');
let thumbnails = document.querySelectorAll('.thumbnail .item');

let countItem = items.length;
let itemActive = 0;

// Próximo item
next.onclick = function () {
    itemActive = (itemActive + 1) % countItem;
    showhome();
};

// Item anterior
prev.onclick = function () {
    itemActive = (itemActive - 1 + countItem) % countItem;
    showhome();
};

// Troca automática de banners
let refreshInterval = setInterval(() => next.click(), 9000);

function showhome() {
    let itemActiveOld = document.querySelector('.box-banners .list .item.active');
    let thumbnailActiveOld = document.querySelector('.thumbnail .item.active');

    itemActiveOld.classList.remove('active');
    thumbnailActiveOld.classList.remove('active');

    items[itemActive].classList.add('active');
    thumbnails[itemActive].classList.add('active');

    clearInterval(refreshInterval);
    refreshInterval = setInterval(() => next.click(), 9000);
}

// Evento para thumbnails
thumbnails.forEach((thumbnail, index) => {
    thumbnail.addEventListener('click', () => {
        itemActive = index;
        showhome();
    });
});

// PROMOÇÃO --------------------------------------------------
var TxtType = function (el, toRotate, period) {
    this.toRotate = toRotate;
    this.el = el;
    this.loopNum = 0;
    this.period = parseInt(period, 10) || 2000;
    this.txt = '';
    this.tick();
    this.isDeleting = false;
};

TxtType.prototype.tick = function () {
    var i = this.loopNum % this.toRotate.length;
    var fullTxt = this.toRotate[i];

    this.txt = this.isDeleting
        ? fullTxt.substring(0, this.txt.length - 1)
        : fullTxt.substring(0, this.txt.length + 1);

    this.el.innerHTML = '<span class="wrap">' + this.txt + '</span>';

    var delta = 200 - Math.random() * 200;
    if (this.isDeleting) delta /= 2;

    if (!this.isDeleting && this.txt === fullTxt) {
        delta = this.period;
        this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
        this.isDeleting = false;
        this.loopNum++;
        delta = 500;
    }

    setTimeout(() => this.tick(), delta);
};

window.onload = function () {
    var elements = document.getElementsByClassName('typewrite');
    for (var i = 0; i < elements.length; i++) {
        var toRotate = elements[i].getAttribute('data-type');
        var period = elements[i].getAttribute('data-period');
        if (toRotate) {
            new TxtType(elements[i], JSON.parse(toRotate), period);
        }
    }

    var css = document.createElement("style");
    css.type = "text/css";
    css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid #fff }";
    document.body.appendChild(css);
};

// SERVIÇOS --------------------------------------------------
var btns = document.querySelectorAll(".btn-service");
var spans = document.querySelectorAll(".close");

btns.forEach(button => {
    button.onclick = function () {
        var modalId = button.getAttribute("data-modal");
        var modal = document.getElementById(modalId);
        modal.style.display = "block";
    };
});

spans.forEach(span => {
    span.onclick = function () {
        var modal = span.closest(".modal");
        modal.style.display = "none";
    };
});

window.onclick = function (event) {
    if (event.target.classList.contains('modal')) {
        event.target.style.display = "none";
    }
};

// TÉCNICAS ANALÍTICAS ----------------------------------------
let card = document.querySelectorAll('.box-card .card');
let action = 1;

function loadShow() {
    // Ativo
    card[action].style.transform = `none`;
    card[action].style.zIndex = 1;
    card[action].style.filter = 'none';
    card[action].style.opacity = 1;

    // Direita
    let stt = 0;
    for (var i = action + 1; i < card.length; i++) {
        stt++;
        card[i].style.transform = `translateX(${300 * stt}px) scale(${1 - 0.3 * stt}) perspective(40px) rotateY(-1deg)`;
        card[i].style.zIndex = 0;
        card[i].style.filter = 'blur(10px)';
        card[i].style.opacity = stt > 1 ? 0 : 0.2;
    }

    // Esquerda
    stt = 0;
    for (var i = action - 1; i >= 0; i--) {
        stt++;
        card[i].style.transform = `translateX(${-300 * stt}px) scale(${1 - 0.3 * stt}) perspective(40px) rotateY(1deg)`;
        card[i].style.zIndex = 0;
        card[i].style.filter = 'blur(10px)';
        card[i].style.opacity = stt > 2 ? 0 : 0.2;
    }
}
loadShow();

let right = document.getElementById('right');
let left = document.getElementById('left');

right.onclick = function () {
    action = Math.min(action + 1, card.length - 1);
    loadShow();
};

left.onclick = function () {
    action = Math.max(action - 1, 0);
    loadShow();
};

// FAQ -------------------------------------------------------
const accordionContent = document.querySelectorAll(".accordion-content");

accordionContent.forEach((item, index) => {
    let header = item.querySelector(".accordion-body");
    header.addEventListener("click", () => {
        item.classList.toggle("open");

        let description = item.querySelector(".description");
        description.style.height = item.classList.contains("open")
            ? `${description.scrollHeight}px`
            : "0px";

        let icon = item.querySelector("i");
        icon.classList.toggle("fa-plus");
        icon.classList.toggle("fa-minus");

        removeOpen(index);
    });
});

function removeOpen(index1) {
    accordionContent.forEach((item, index2) => {
        if (index1 !== index2) {
            item.classList.remove("open");

            let description = item.querySelector(".description");
            description.style.height = "0px";

            let icon = item.querySelector("i");
            icon.classList.replace("fa-minus", "fa-plus");
        }
    });
}

// NAVEGAÇÃO -------------------------------------------------
const backToTopButton = document.querySelector('.btn-back-to-top');

window.addEventListener('scroll', () => {
    backToTopButton.style.display = window.scrollY > 800 ? 'flex' : 'none';
});