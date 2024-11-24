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

// FORMS -------------------------------------------------
function formatarTelefone(campo) {
    let telefone = campo.value.replace(/\D/g, ""); 
    if (telefone.length > 10) {
        telefone = telefone.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
    } else if (telefone.length > 6) {
        telefone = telefone.replace(/(\d{2})(\d{4})(\d{0,4})/, "($1) $2-$3");
    } else if (telefone.length > 2) {
        telefone = telefone.replace(/(\d{2})(\d{0,5})/, "($1) $2");
    }
    campo.value = telefone;
}

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("contactForm");
    const popup = document.getElementById("popup");
    const closePopup = document.getElementById("closePopup");
    const popupMessage = document.querySelector("#popup .popup-content p");
    const loadingContainer = document.getElementById("loading-container");
    const successMessage = document.getElementById("success-message");

    form.addEventListener("submit", function (event) {
        event.preventDefault(); // Evita o comportamento padrão do formulário

        const formData = new FormData(form);

        // Exibe o spinner e a mensagem de "Enviando..."
        loadingContainer.style.display = "block";
        successMessage.style.display = "none"; // Esconde a mensagem de sucesso/erro
        popup.style.display = "flex"; // Exibe o popup

        fetch(form.action, {
            method: "POST",
            body: formData,
        })
            .then((response) => response.json())  // Trata a resposta JSON do PHP
            .then((data) => {
                if (data.status === "success") {
                    popupMessage.textContent = data.message; // Define a mensagem de sucesso
                    loadingContainer.style.display = "none"; // Esconde o spinner
                    successMessage.style.display = "block"; // Exibe a mensagem de sucesso
                    successMessage.querySelector("p").textContent = data.message; // Adiciona a mensagem de sucesso ao popup
                } else {
                    popupMessage.textContent = data.message; // Define a mensagem de erro
                    loadingContainer.style.display = "none"; // Esconde o spinner
                    successMessage.style.display = "block"; // Exibe a mensagem de erro
                    successMessage.querySelector("p").textContent = data.message; // Adiciona a mensagem de erro ao popup
                }
            })
            .catch((error) => {
                console.error("Erro:", error);
                popupMessage.textContent = "Erro ao processar a solicitação. Tente novamente.";
                loadingContainer.style.display = "none"; // Esconde o spinner
                successMessage.style.display = "block"; // Exibe a mensagem de erro
                successMessage.querySelector("p").textContent = "Erro ao processar a solicitação. Tente novamente."; // Exibe a mensagem de erro
            });
    });

    closePopup.addEventListener("click", function () {
        popup.style.display = "none"; // Fecha o popup
    });

    window.addEventListener("click", function (event) {
        if (event.target === popup) {
            popup.style.display = "none"; // Fecha o popup ao clicar fora dele
        }
    });
});


// NAVEGAÇÃO -------------------------------------------------
const backToTopButton = document.querySelector('.btn-back-to-top');

window.addEventListener('scroll', () => {
    backToTopButton.style.display = window.scrollY > 800 ? 'flex' : 'none';
});