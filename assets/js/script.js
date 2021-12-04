var textWrapper = document.querySelector('.home .content h3');
textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

anime.timeline({loop: false})
  .add({
    targets: '.home .content h3 .letter',
    opacity: [0,1],
    easing: "easeInOutQuad",
    duration: 1250,
    delay: (el, i) => 80 * (i+1)
  }).add({
    targets: '.home .content h3',
    opacity: 1,
    duration: 520,
    easing: "easeOutExpo",
    delay: 1000
  });

new Swiper('.testimonials-slider', {
  speed: 600,
  loop: true,
  autoplay: {
    delay: 3000,
    disableOnInteraction: false
  },
  slidesPerView: 'auto',
  pagination: {
    el: '.swiper-pagination',
    type: 'bullets',
    clickable: true
  },
  breakpoints: {
    320: {
      slidesPerView: 1,
      spaceBetween: 20
    },

    1200: {
      slidesPerView: 3,
      spaceBetween: 20
    }
  }
});  

let navbar = document.querySelector('.navbar');

document.querySelector('#menu-btn').onclick = () => {
  navbar.classList.toggle('active')
}

window.onscroll = () => {
  navbar.classList.remove('active')
}

window.addEventListener('load', () => {
  AOS.init({
    duration: 1000,
    easing: 'ease-in-out',
    once: true,
    mirror: false
  })
});
  