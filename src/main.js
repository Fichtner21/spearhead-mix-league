import $ from 'jquery';
import drive from 'drive-db';
import Cookies from 'js-cookie';
import { rankingInfo } from './views/ranking';
import { history } from './views/history';
import { filesSite } from './views/files';
import { serverSite } from './views/server';
import { chartsSite } from './views/charts';
// import Translator from './translator.js';

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
  filesSite();
  serverSite();
  chartsSite();
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

  (async () => {
    // Load the data from the Drive Spreadsheet
    const teamSelection = await drive({
      sheet: '1w_WHqCutkp_S6KveKyu4mNaG76C5dIlDwKw-A-dEOLo',
      tab: 5,
    });

    const teamSelection2 = await drive({
      sheet: '1w_WHqCutkp_S6KveKyu4mNaG76C5dIlDwKw-A-dEOLo',
      tab: 6,
    });

    const playersTab = await drive({
      sheet: '1w_WHqCutkp_S6KveKyu4mNaG76C5dIlDwKw-A-dEOLo',
      tab: 1,
    });

    const teamSel = playersTab.map((entry) => entry);
    // function playerName(name) {
    //   const arr = [];

    //   arr.push(name);
    // arr.forEach((el) => {
    //   // teamSel.forEach((player) => {
    //   console.log('PLAYER NAME: ', el.playername, ' USER NAME: ', el.username);
    //   if (el === el.username) {
    //     console.log('NASTĄPIŁA ZMIANA Z', el, ' NA: ', el.playername);
    //   } else {
    //     console.log('BEZ ZMIANY', el.username);
    //   }
    //   // });
    // });
    // }

    // console.log('WYWOŁANIE playerName()', playerName('zielony', 'jim', 'tomas', 'your-problem', 'illusion'));

    const [
      // team1 ID 1 players
      { team1players: t1p1 },
      { team1players: t1p2 },
      { team1players: t1p3 },
      { team1players: t1p4 },
      { team1players: t1p5 },
      { team1players: t1String },
      ...{ length: res2 }
    ] = teamSelection;

    const [
      // team1 ID 2 players
      { team1players: t1p1id2 },
      { team1players: t1p2id2 },
      { team1players: t1p3id2 },
      { team1players: t1p4id2 },
      { team1players: t1p5id2 },
      { team1players: t1StringId2 },
      ...{ length: team1id2 }
    ] = teamSelection2;

    const [
      // team1 ID 1 players ELO
      { elo: t1p1elo },
      { elo: t1p2elo },
      { elo: t1p3elo },
      { elo: t1p4elo },
      { elo: t1p5elo },
      { elo: t1cumulative },
      ...{ length: eloRes }
    ] = teamSelection;

    const [
      // team1 ID 2 players ELO
      { elo: t1p1eloId2 },
      { elo: t1p2eloId2 },
      { elo: t1p3eloId2 },
      { elo: t1p4eloId2 },
      { elo: t1p5eloId2 },
      { elo: t1cumulativeId2 },
      ...{ length: eloResId2 }
    ] = teamSelection2;

    const [
      // team2 ID 1 players
      { team2players: t2p1 },
      { team2players: t2p2 },
      { team2players: t2p3 },
      { team2players: t2p4 },
      { team2players: t2p5 },
      { team2players: t2String },
      ...{ length: team2p }
    ] = teamSelection;

    const [
      // team2 ID 2 players
      { team2players: t2p1id2 },
      { team2players: t2p2id2 },
      { team2players: t2p3id2 },
      { team2players: t2p4id2 },
      { team2players: t2p5id2 },
      { team2players: t2StringId2 },
      ...{ length: team2pId2 }
    ] = teamSelection2;

    const [
      // team2 ID 1 players ELO
      { elo_2: t2p1elo },
      { elo_2: t2p2elo },
      { elo_2: t2p3elo },
      { elo_2: t2p4elo },
      { elo_2: t2p5elo },
      { elo_2: t2cumulative },
      ...{ length: elo2Res }
    ] = teamSelection;

    const [
      // team2 ID 2 players ELO
      { elo_2: t2p1eloId2 },
      { elo_2: t2p2eloId2 },
      { elo_2: t2p3eloId2 },
      { elo_2: t2p4eloId2 },
      { elo_2: t2p5eloId2 },
      { elo_2: t2cumulativeId2 },
      ...{ length: elo2ResId2 }
    ] = teamSelection2;

    const team1ID1playersArr = [t1p1, t1p2, t1p3, t1p4, t1p5];
    const team1ID2playersArr = [t1p1id2, t1p2id2, t1p3id2, t1p4id2, t1p5id2];
    const team2ID1playersArr = [t2p1, t2p2, t2p3, t2p4, t2p5];
    const team2ID2playersArr = [t2p1id2, t2p2id2, t2p3id2, t2p4id2, t2p5id2];
    const team1ID1playersEloArr = [t1p1elo, t1p2elo, t1p3elo, t1p4elo, t1p5elo];
    const team1ID2playersEloArr = [t1p1eloId2, t1p2eloId2, t1p3eloId2, t1p4eloId2, t1p5eloId2];
    const team2ID1playersEloArr = [t2p1elo, t2p2elo, t2p3elo, t2p4elo, t2p5elo];
    const team2ID2playersEloArr = [t2p1eloId2, t2p2eloId2, t2p3eloId2, t2p4eloId2, t2p5eloId2];

    const cumulativeTeam1ID1 = Number(parseFloat(t1cumulative).toFixed(2));
    const cumulativeTeam1ID2 = Number(parseFloat(t1cumulativeId2).toFixed(2));
    const cumulativeTeam2ID1 = Number(parseFloat(t2cumulative).toFixed(2));
    const cumulativeTeam2ID2 = Number(parseFloat(t2cumulativeId2).toFixed(2));

    const selectionTeams = document.getElementById('selectionTeams');
    const team1ID1toShow = document.getElementById('team1ID1');
    const team1ID2toShow = document.getElementById('team1ID2');
    const team2ID1toShow = document.getElementById('team2ID1');
    const team2ID2toShow = document.getElementById('team2ID2');
    const cumulativeDivTeam1ID1 = document.getElementById('cumulativeTeam1ID1');
    const cumulativeDivTeam1ID2 = document.getElementById('cumulativeTeam1ID2');
    const cumulativeDivTeam2ID1 = document.getElementById('cumulativeTeam2ID1');
    const cumulativeDivTeam2ID2 = document.getElementById('cumulativeTeam2ID2');
    const chanceT1ID1 = document.getElementById('chanceT1ID1');
    const chanceT1ID2 = document.getElementById('chanceT1ID2');
    const chanceT2ID1 = document.getElementById('chanceT2ID1');
    const chanceT2ID2 = document.getElementById('chanceT2ID2');

    function addPlayerLinkHome(player) {
      let convertedPlayer = '';
      teamSel.forEach((el) => {
        if (player === el.username) {
          convertedPlayer = `<a href="#charts-${el.username}">${el.playername}</a>`;
        } else if (player === '') {
          // console.log('N/A player');
        } else {
          // console.log('Something went wrong.');
        }
      });
      return convertedPlayer;
    }

    function loadPopup() {
      const randomPlayer = teamSel.map((entry) => entry.username);
      const randomPlayerLink = randomPlayer[Math.floor(Math.random() * randomPlayer.length)];
      // console.log(randomPlayerLink);
      $('#app').css({ opacity: '0.2' });
      const popup = `<div class="popup"><div>Watch player</div><a href="#charts-${randomPlayerLink}" class="closeLink">${addPlayerLinkHome(
        randomPlayerLink,
      )}</a><div>statistics.</div><div class="close"><i class="far fa-window-close"></i></div></div>`;
      $('body').append(popup);

      $(document).click((event) => {
        if (!$(event.target).closest('.popup').length) {
          $('#app').css({ opacity: '1' });
          $('.popup').remove();
        }
      });

      $(document).on('click', '.close', function () {
        $('#app').css({ opacity: '1' });
        $('.popup').remove();
      });

      $(document).on('click', '.closeLink', function () {
        $('#app').css({ opacity: '1' });
        $('.popup').remove();
      });
    }
    setTimeout(() => {
      loadPopup();
    }, 1000);

    let team1ID1 = '';
    for (let i = 0; i < 5; i++) {
      team1ID1 += `
      <div class="player">
        <div class="preelo">${team1ID1playersEloArr[i]}</div>
        <div class="name">${addPlayerLinkHome(team1ID1playersArr[i])}</div>
        <div class="score"></div>
        <div class="postelo"></div>
      </div>`;
    }

    let team1ID2 = '';
    for (let i = 0; i < 5; i++) {
      team1ID2 += `
      <div class="player">
        <div class="preelo">${team1ID2playersEloArr[i]}</div>
        <div class="name">${addPlayerLinkHome(team1ID2playersArr[i])}</div>
        <div class="score"></div>
        <div class="postelo"></div>
      </div>`;
    }

    let team2ID1 = '';
    for (let i = 0; i < 5; i++) {
      team2ID1 += `
      <div class="player">
        <div class="preelo">${team2ID1playersEloArr[i]}</div>
        <div class="name">${addPlayerLinkHome(team2ID1playersArr[i])}</div>
        <div class="score"></div>
        <div class="postelo"></div>
      </div>`;
    }

    let team2ID2 = '';
    for (let i = 0; i < 5; i++) {
      team2ID2 += `
      <div class="player">
        <div class="preelo">${team2ID2playersEloArr[i]}</div>
        <div class="name">${addPlayerLinkHome(team2ID2playersArr[i])}</div>
        <div class="score"></div>
        <div class="postelo"></div>
      </div>`;
    }

    // selectionTeams.innerHTML = teamID1;
    team1ID1toShow.innerHTML = team1ID1;
    team1ID2toShow.innerHTML = team1ID2;
    team2ID1toShow.innerHTML = team2ID1;
    team2ID2toShow.innerHTML = team2ID2;
    cumulativeDivTeam1ID1.innerHTML = 'Cumulative: ' + cumulativeTeam1ID1;
    cumulativeDivTeam1ID2.innerHTML = 'Cumulative: ' + cumulativeTeam1ID2;
    cumulativeDivTeam2ID1.innerHTML = 'Cumulative: ' + cumulativeTeam2ID1;
    cumulativeDivTeam2ID2.innerHTML = 'Cumulative: ' + cumulativeTeam2ID2;
    const chanceOfWinTeam2ID1 = 1 / (1 + 10 ** ((cumulativeTeam1ID1 - cumulativeTeam2ID1) / 400));
    const chanceOfWinTeam2ID2 = 1 / (1 + 10 ** ((cumulativeTeam1ID2 - cumulativeTeam2ID2) / 400));
    const chanceOfWinTeam1ID1 = 1 / (1 + 10 ** ((cumulativeTeam2ID1 - cumulativeTeam1ID1) / 400));
    const chanceOfWinTeam1ID2 = 1 / (1 + 10 ** ((cumulativeTeam2ID2 - cumulativeTeam1ID2) / 400));
    const chanceT1ID1a = Number(parseFloat(chanceOfWinTeam1ID1 * 100));
    const chanceT1ID2a = Number(parseFloat(chanceOfWinTeam1ID2 * 100));
    const chanceT2ID1a = Number(parseFloat(chanceOfWinTeam2ID1 * 100));
    const chanceT2ID2a = Number(parseFloat(chanceOfWinTeam2ID2 * 100));
    function floorPrecised(number, precision) {
      const power = Math.pow(10, precision);
      return Math.floor(number * power) / power;
    }
    const chanceT1Id1toShow = floorPrecised(chanceT1ID1a, 2) + ' %';
    const chanceT1Id2toShow = floorPrecised(chanceT1ID2a, 2) + ' %';
    const chanceT2Id1toShow = Math.round((chanceT2ID1a + Number.EPSILON) * 100) / 100 + ' %';
    const chanceT2Id2toShow = Math.round((chanceT2ID2a + Number.EPSILON) * 100) / 100 + ' %';

    chanceT1ID1.innerHTML = chanceT1Id1toShow;
    chanceT1ID2.innerHTML = chanceT1Id2toShow;
    chanceT2ID1.innerHTML = chanceT2Id1toShow;
    chanceT2ID2.innerHTML = chanceT2Id2toShow;

    if (chanceT1Id1toShow > chanceT2Id1toShow) {
      chanceT1ID1.classList.add('chance-win');
      chanceT2ID1.classList.add('chance-lose');
    } else if (chanceT1Id1toShow < chanceT2Id1toShow) {
      chanceT2ID1.classList.add('chance-win');
      chanceT1ID1.classList.add('chance-lose');
    }

    if (chanceT1Id2toShow > chanceT2Id2toShow) {
      chanceT1ID2.classList.add('chance-win');
      chanceT2ID2.classList.add('chance-lose');
    } else if (chanceT1Id2toShow < chanceT2Id2toShow) {
      chanceT2ID2.classList.add('chance-win');
      chanceT1ID2.classList.add('chance-lose');
    }
  })();
});
