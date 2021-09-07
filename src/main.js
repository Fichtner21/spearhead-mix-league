import $ from 'jquery';
// import drive from 'drive-db';
import Cookies from 'js-cookie';
import Swiper from 'swiper/bundle';
import 'swiper/swiper-bundle.css';
import Accordion from 'accordion-js';
import 'offside-js/dist/offside.css';
import offside from 'offside-js';
import 'accordion-js/dist/accordion.min.css';
import { rankingInfo } from './views/ranking';
import { history } from './views/history';
import { inactivePlayers } from './views/inactive';
// import { historyTdm } from './views/history_tdm';
// import { rankingTdm } from './views/ranking_tdm';
// import { cupTwo } from './views/cup_two';
import { newRanking } from './views/new_ranking';
// import { smallStrike } from './functions/functions';
// import Translator from './translator.js';

// window.self.addEventListener('fetch', function (event) {
//   event.respondWith(
//     caches.open('mysite-cache').then(function (cache) {
//       return cache.match(event.request).then(function (response2) {
//         return (
//           response2 ||
//           fetch(event.request).then(function (response22) {
//             cache.put(event.request, response22.clone());
//             return response22;
//           })
//         );
//       });
//     }),
//   );
// });

// window.self.addEventListener('fetch', function (event) {
//   event.respondWith(caches.match(event.request));
// });

function enableRouting() {
  function setRoute() {
    $('.view').hide();

    const { hash } = window.location;

    if (hash === '') {
      $('#home').show();
    }
    $(hash).show();
  }
  setRoute();

  window.addEventListener('hashchange', setRoute);
}

document.addEventListener('DOMContentLoaded', () => {
  rankingInfo();
  history();
  newRanking();
  inactivePlayers();
  // historyTdm();
  // rankingTdm();
  // cupTwo();

  // smallStrike();

  // if (window.history.pushState) {
  //   window.history.pushState('', '/', window.location.pathname);
  // } else {
  //   window.location.hash = '';
  // }
  // const translator = new Translator({
  //   persist: false,
  //   languages: ['de', 'en', 'es'],
  //   defaultLanguage: 'en',
  //   detectLanguage: true,
  //   filesLocation: '/i18n',
  // });
  // translator.load();
  // document.querySelector('form').addEventListener('click', function (evt) {
  //   if (evt.target.tagName === 'INPUT') {
  //     translator.load(evt.target.value);
  //   }
  // });

  enableRouting();

  const spreadsheet_id = '1w_WHqCutkp_S6KveKyu4mNaG76C5dIlDwKw-A-dEOLo';
  const tab_name = 'players';
  const api_key = 'AIzaSyD6eJ4T-ztIfyFn-h2oDAGTnNNYhNRziLU';

  const getCookie = function (name) {
    const value = '; ' + document.cookie;
    const parts = value.split('; ' + name + '=');
    if (parts.length === 2) return parts.pop().split(';').shift();
    return name;
  };

  // Example
  const cookieVal = getCookie('contrast');

  if (cookieVal) {
    document.documentElement.classList.add(cookieVal);
  } else {
    // document.documentElement.classList.remove(cookieVal);
  }

  $('.navbar a').on('click', function () {
    $('.currentClick').removeClass('currentClick');
    $(this).addClass('currentClick');
  });

  const contrastButton = document.querySelector('.contrast__button');
  const cookieName = 'contrast';

  contrastButton.addEventListener('click', function () {
    const thisDataAction = this.dataset.action;

    if (Cookies.get(cookieName) === thisDataAction) {
      document.documentElement.classList.remove(thisDataAction);

      Cookies.set(cookieName, '');
    } else {
      document.documentElement.classList.add(thisDataAction);

      Cookies.set(cookieName, `${thisDataAction}`);
    }
  });

  offside('#nav-left-grid', {
    slidingElementsSelector: '.container',
    buttonsSelector: '#my-button',
  });

  $('.hamburger').click(function (e) {
    e.preventDefault();
    $(this).toggleClass('is-active');
  });

  new Accordion('.accordion-container');

  // setTimeout(function () {
  //   $('.slowly').fadeOut(1500);
  // }, 12000);

  // let timeleft = 10;
  // const downloadTimer = setInterval(function () {
  //   timeleft--;
  //   document.getElementById('countdown').textContent = timeleft;
  //   if (timeleft <= 0) clearInterval(downloadTimer);
  // }, 1000);

  const SwiperTop = new Swiper('.swiper--top', {
    spaceBetween: 0,
    // centeredSlides: true,
    speed: 22000,
    autoplay: {
      delay: 1,
    },
    loop: true,
    slidesPerView: 'auto',
    allowTouchMove: false,
    disableOnInteraction: true,
  });

  $('.logo').on('click', function () {
    // if (window.location.hash === '') {
    SwiperTop.autoplay.stop();
    SwiperTop.autoplay.start();
    // }
  });

  $('#play').on('click', function () {
    SwiperTop.autoplay.start();
  });

  $('#stop').on('click', function () {
    SwiperTop.autoplay.stop();
  });

  //   // function loadPopup() {
  //   //   const randomPlayer = teamSel.map((entry) => entry.username);
  //   //   const randomPlayerLink = randomPlayer[Math.floor(Math.random() * randomPlayer.length)];

  //   //   $('#app').css({ opacity: '0.2' });
  //   //   // const popup = `<div class="popup"><div>Watch player</div><a href="#charts-${randomPlayerLink}" class="closeLink">${addPlayerLinkHome(
  //   //   //   randomPlayerLink,
  //   //   // )}</a><div>statistics.</div><div class="close"><i class="far fa-window-close"></i></div></div>`;
  //   //   const popup = `<div class="popup">
  //   //     <div class="popup__sub">First CUP 1on1 </div>
  //   //     <div class="popup__sub">in MoH:SH MIX League</div>
  //   //     <div class="popup__sub">Rules:</div>
  //   //     <ol>
  //   //       <li>Register on <a href="https://discord.gg/u4MCqKSKZf">Discord <i class="fab fa-discord"></i></a> until <strong>20:00, 05.02.2021</strong></li>
  //   //       <li>CUP based rules: DOUBLE ELIMINATION (Winner and Loser Brackets)</li>
  //   //       <li>Draw pairs <strong>20:00 - 21:00, 05.02.2021</strong></li>
  //   //       <li>Players have 3 days(72hours) from selected to play their war</li>
  //   //       <li>Time play: First to 5 rounds</li>
  //   //       <li>Each round 4 minutes</li>
  //   //       <li>Maps: The Hunt, V2, The Bridge, Stlo, VSUK Abbey - each player before war start baning maps i.e:<br> Player 1 - ban Stlo, Player 2 - ban VSUK Abbey, Player 1 - chose The Bridge, Player 2 - chose V2, <br>so they play The Bridge & V2 in case of draw next map will be The Hunt.</li>
  //   //       <li>Disputes are settled by the league committee (-Illu$ioN-, KaPsEL, bAtOn).</li>
  //   //     </ol>
  //   //     <div class="popup__sub">Current lineup: <a href="#">On main page <i class="fas fa-list-ol"></i></a></div>
  //   //     <div class="popup__sub">Good Luck!</div>

  //   //   <div class="close"><i class="far fa-window-close"></i></div></div>`;
  //   //   $('body').append(popup);

  //   //   $(document).click((event) => {
  //   //     if (!$(event.target).closest('.popup').length) {
  //   //       $('#app').css({ opacity: '1' });
  //   //       $('.popup').remove();
  //   //     }
  //   //   });

  //   //   $(document).on('click', '.close', function () {
  //   //     $('#app').css({ opacity: '1' });
  //   //     $('.popup').remove();
  //   //   });

  //   //   $(document).on('click', '.popup a', function () {
  //   //     $('#app').css({ opacity: '1' });
  //   //     $('.popup').remove();
  //   //   });

  //   //   $(document).on('click', '.closeLink', function () {
  //   //     $('#app').css({ opacity: '1' });
  //   //     $('.popup').remove();
  //   //   });
  //   // }
  //   // setTimeout(() => {
  //   //   loadPopup();
  //   // }, 1000);

  //   $(document).ready(function () {
  //     $('.lds-dual-ring-rank').remove();
  //   });

  function addPlayerPos2(player, obj) {
    let playerPos = '';
    playerPos = obj.findIndex((x) => x.username === player);
    playerPos++;
    if (playerPos === 1) {
      playerPos = `<div class="item0" title="${playerPos}st in OBJ ladder" >(${playerPos})</div>`;
    } else if (playerPos === 2) {
      playerPos = `<div class="item1" title="${playerPos}nd in OBJ ladder">(${playerPos})</div>`;
    } else if (playerPos === 3) {
      playerPos = `<div class="item2" title="${playerPos}th in OBJ ladder">(${playerPos})</div>`;
    } else if (playerPos === 0) {
      playerPos = '';
    } else {
      playerPos = `<span title="${playerPos}th in OBJ ladder">(${playerPos})</span>`;
    }
    return playerPos;
  }

  function getPlayerFlag(playerFlag) {
    let flag = '';
    switch (playerFlag) {
      case 'EU': {
        flag = `<img src="/assets/flags/_e.gif" title="EU">`;
        break;
      }
      case 'PL': {
        flag = `<img src="/assets/flags/pl.gif" title="Poland">`;
        break;
      }
      case 'EG': {
        flag = `<img src="/assets/flags/EG.gif" title="Egypt">`;
        break;
      }
      case 'NL': {
        flag = `<img src="/assets/flags/nl.gif" title="Netherlands">`;
        break;
      }
      case 'RU': {
        flag = `<img src="/assets/flags/RU.gif" title="Russia">`;
        break;
      }
      case 'RO': {
        flag = `<img src="/assets/flags/ro.gif" title="Romania">`;
        break;
      }
      case 'FR': {
        flag = `<img src="/assets/flags/fr.gif" title="France">`;
        break;
      }
      case 'UK': {
        flag = `<img src="/assets/flags/uk.gif" title"United Kingdom">`;
        break;
      }
      case 'BE': {
        flag = `<img src="/assets/flags/be.gif" title="Belgium">`;
        break;
      }
      case 'GR': {
        flag = `<img src="/assets/flags/gr.gif" title="Greece">`;
        break;
      }
      case 'DE': {
        flag = `<img src="/assets/flags/de.gif" title="Germany">`;
        break;
      }
      case 'ES': {
        flag = `<img src="/assets/flags/es.gif" title="Spain">`;
        break;
      }
      case 'PT': {
        flag = `<img src="/assets/flags/pt.gif" title="Portugal">`;
        break;
      }
      case 'FI': {
        flag = `<img src="/assets/flags/fi.gif" title="Finland">`;
        break;
      }
      case 'AM': {
        flag = `<img src="/assets/flags/am.gif" title="Armenia">`;
        break;
      }
      default:
      // console.log('Nie pasuje');
    }
    return flag;
  }

  function addPlayerLinkHome2(player, obj) {
    let convertedPlayer = '';
    obj.forEach((el) => {
      if (player === el.username) {
        convertedPlayer = `<a href="#charts-${el.username}">${el.playername} ${getPlayerFlag(el.nationality)}</a>`;
      } else if (player === '') {
        // console.log('N/A player');
      } else {
        // console.log('Something went wrong.');
      }
    });
    return convertedPlayer;
  }
});
