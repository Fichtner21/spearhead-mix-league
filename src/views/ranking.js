import drive from 'drive-db';
import { Chart } from 'chart.js';
import $ from 'jquery';
import * as ChartAnnotation from 'chartjs-plugin-annotation';

export function rankingInfo() {
  function smallStrike(name, arr) {
    const littleStrike = document.createElement('div');
    const spanStrike = document.createElement('span');
    const firstFromEnd = arr(name)[arr(name).length - 1];
    const secondFromEnd = arr(name)[arr(name).length - 2];
    const countingPoints = firstFromEnd - secondFromEnd;

    if (firstFromEnd > secondFromEnd) {
      littleStrike.classList.add('up-streak');
      spanStrike.setAttribute('data-title', `${countingPoints > 0 ? `+${countingPoints.toFixed(2)}` : ''} pc in last war`);
      littleStrike.appendChild(spanStrike);
    } else if (firstFromEnd < secondFromEnd) {
      littleStrike.classList.add('down-streak');
      spanStrike.setAttribute('data-title', `${countingPoints.toFixed(2)} pc in last war`);
      littleStrike.appendChild(spanStrike);
      // littleStrike.setAttribute('title', `${countingPoints.toFixed(2)} pc in last war`);
    } else {
      littleStrike.classList.add('draw-streak');
      spanStrike.setAttribute('data-title', `${countingPoints.toFixed(2)} pc in last war`);
      littleStrike.appendChild(spanStrike);
      // littleStrike.setAttribute('title', `${countingPoints.toFixed(2)} pc in last war`);
    }

    return littleStrike;
  }

  function findPlayerLastWar(name, obj) {
    const findeLastWar = obj.filter((item) => JSON.stringify(item).includes(name)).pop();
    let findLastTimeStamp = '';
    let newTimestampElem = '';
    if (findeLastWar) {
      findLastTimeStamp = findeLastWar.timestamp;
      newTimestampElem = new Date(findLastTimeStamp).toLocaleDateString('pl-PL', { hour: '2-digit', minute: '2-digit' });
    } else if (findeLastWar === 'undefined') {
      findLastTimeStamp = 'No match';
    } else if (findeLastWar === null) {
      findLastTimeStamp = 'No match';
    } else {
      findLastTimeStamp = 'No match';
    }
    return newTimestampElem;
  }

  function longestWinning(arr, n) {
    let max = 1;
    let len = 1;

    for (let i = 1; i < n; i++) {
      if (arr[i] > arr[i - 1]) {
        len++;
      } else {
        if (max < len) {
          max = len;
        }
        len = 1;
      }
    }

    if (max < len) {
      max = len;
    }
    return max;
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
      default:
      // console.log('Nie pasuje');
    }
    return flag;
  }

  function destructObjRanks2(obj, arr) {
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        const objInArr = obj[key];
        for (const key2 in objInArr) {
          if (objInArr.hasOwnProperty(key2)) {
            const elemOfObj = objInArr[key2];
            arr.push(elemOfObj);
          }
        }
      }
    }
  }

  function getIndexesRanks2(arr, val) {
    const indexes = [];
    let i = -1;
    while ((i = arr.indexOf(val, i + 1)) !== -1) {
      indexes.push(i + 4); // postELO
    }
    return indexes;
  }

  function getIndexesFrags2(arr, val) {
    const indexes = [];
    let i = -1;
    while ((i = arr.indexOf(val, i + 1)) !== -1) {
      indexes.push(i + 3); // frags
    }
    return indexes;
  }

  function ranksAllStrikes2(username, ind, arrIn, arrOut) {
    if (arrIn.includes(username)) {
      arrIn.forEach(function (el, index) {
        index += 1;
        ind.forEach(function (founded, i) {
          if (Number(index) === Number(founded)) {
            const foundedStreak = Number(el).toFixed(2);
            arrOut.push(Number(foundedStreak));
          }
        });
      });
    }
  }

  function rankHistory2(name, obj) {
    const arrNameRanks2 = [];
    destructObjRanks2(obj, arrNameRanks2);
    const indexesRanksName2 = getIndexesRanks2(arrNameRanks2, name);
    const nameRanksOut2 = [];
    ranksAllStrikes2(name, indexesRanksName2, arrNameRanks2, nameRanksOut2);
    nameRanksOut2.unshift(1000);
    return nameRanksOut2;
  }

  function sumOfFrags2(name, obj) {
    const arrNameFrags2 = [];
    destructObjRanks2(obj, arrNameFrags2);
    const indexesFragsName2 = getIndexesFrags2(arrNameFrags2, name);
    const nameFragsOut2 = [];
    ranksAllStrikes2(name, indexesFragsName2, arrNameFrags2, nameFragsOut2);
    let nameFragsOutExist2 = '';
    if (Array.isArray(nameFragsOut2) && nameFragsOut2.length) {
      nameFragsOutExist2 = nameFragsOut2.reduce((a, b) => a + b);
    } else {
      nameFragsOutExist2 = 0;
    }
    return nameFragsOutExist2;
  }

  function minMaxFrags2(name, obj) {
    const arrNameFrags2 = [];
    destructObjRanks2(obj, arrNameFrags2);
    const indexesFragsName2 = getIndexesFrags2(arrNameFrags2, name);
    const nameFragsOut2 = [];
    ranksAllStrikes2(name, indexesFragsName2, arrNameFrags2, nameFragsOut2);
    nameFragsOut2.unshift(0);
    return nameFragsOut2;
  }

  function countWars(name, obj) {
    const playerWarsObj = [];
    const playerRankHistory2 = rankHistory2(name, obj);
    playerRankHistory2.forEach((war, index) => {
      playerWarsObj.push(index);
    });
    return playerWarsObj;
  }

  function getNumOfPlayers(obj) {
    return obj.length;
  }

  function searchPlayerKeyName2(name, obj) {
    const searchPlayerKeyNameArr = [];
    for (let i = 0; i < obj.length; i++) {
      if (obj[i].t1p1name === name) {
        searchPlayerKeyNameArr.push(obj[i]);
      } else if (obj[i].t1p2name === name) {
        searchPlayerKeyNameArr.push(obj[i]);
      } else if (obj[i].t1p3name === name) {
        searchPlayerKeyNameArr.push(obj[i]);
      } else if (obj[i].t1p4name === name) {
        searchPlayerKeyNameArr.push(obj[i]);
      } else if (obj[i].t1p5name === name) {
        searchPlayerKeyNameArr.push(obj[i]);
      } else if (obj[i].t1p6name === name) {
        searchPlayerKeyNameArr.push(obj[i]);
      } else if (obj[i].t1p7name === name) {
        searchPlayerKeyNameArr.push(obj[i]);
      } else if (obj[i].t2p1name === name) {
        searchPlayerKeyNameArr.push(obj[i]);
      } else if (obj[i].t2p2name === name) {
        searchPlayerKeyNameArr.push(obj[i]);
      } else if (obj[i].t2p3name === name) {
        searchPlayerKeyNameArr.push(obj[i]);
      } else if (obj[i].t2p4name === name) {
        searchPlayerKeyNameArr.push(obj[i]);
      } else if (obj[i].t2p5name === name) {
        searchPlayerKeyNameArr.push(obj[i]);
      } else if (obj[i].t2p6name === name) {
        searchPlayerKeyNameArr.push(obj[i]);
      } else if (obj[i].t2p7name === name) {
        searchPlayerKeyNameArr.push(obj[i]);
      }
    }
    return searchPlayerKeyNameArr;
  }

  function searchPlayerActivity2(name, obj) {
    const resultObject = searchPlayerKeyName2(name, obj);
    const warDates = [];
    resultObject.forEach((elem) => {
      const newTimestampElem = elem.timestamp;
      warDates.push(newTimestampElem);
    });

    warDates.unshift(0);
    return warDates;
  }

  function pastMonthActivity2(name, obj) {
    const playerDates = searchPlayerActivity2(name, obj);

    const todayUnix = Date.now();
    const lastMonthEvent = new Date(new Date().setDate(new Date().getDate() - 30));
    const resultLastMonth = Date.parse(lastMonthEvent);
    const unixArr = [];

    playerDates.forEach((el) => {
      const elWar = Date.parse(el);
      let lastMonthActivity = '';

      if (elWar > resultLastMonth && elWar < todayUnix) {
        lastMonthActivity += elWar;
        unixArr.push(lastMonthActivity);
      } else {
        // console.log('nie ma takich dat');
      }
    });

    let actSquare = '';
    if (unixArr.length === 0) {
      actSquare = `<div class="green0" title="${unixArr.length} wars in last month."></div>`;
    } else if (unixArr.length > 0 && unixArr.length <= 5) {
      actSquare = `<div class="green1_5" title="${unixArr.length} wars in last month."></div>`;
    } else if (unixArr.length > 5 && unixArr.length <= 10) {
      actSquare = `<div class="green6_10" title="${unixArr.length} wars in last month."></div>`;
    } else if (unixArr.length > 10 && unixArr.length <= 20) {
      actSquare = `<div class="green11_20" title="${unixArr.length} wars in last month."></div>`;
    } else if (unixArr.length > 20 && unixArr.length <= 50) {
      actSquare = `<div class="green21_50" title="${unixArr.length} wars in last month."></div>`;
    } else if (unixArr.length > 50 && unixArr.length <= 79) {
      actSquare = `<div class="green51_100" title="${unixArr.length} wars in last month."></div>`;
    } else if (unixArr.length > 79) {
      actSquare = `<div class="green101" title="${unixArr.length} wars in last month."></div>`;
    } else {
      // console.log('reszta ma inne niz 0');
    }
    return actSquare;
  }

  function searchPlayer2(name, obj) {
    const resultObject = searchPlayerKeyName2(name, obj);
    const warDates = [];
    resultObject.forEach((elem) => {
      const oldTimestampElem = elem.timestamp;
      const newTimestampElem = new Date(oldTimestampElem).toLocaleDateString('pl-PL', { hour: '2-digit', minute: '2-digit' });

      warDates.push(newTimestampElem);
    });

    warDates.unshift(0);
    return warDates;
  }

  function searchPlayerWars2(name, obj) {
    const resultObject = searchPlayerKeyName2(name, obj);
    const warIDs = [];

    resultObject.forEach((elem) => {
      warIDs.push(elem);
    });

    const linkWars = [];
    warIDs.forEach((el) => {
      const oldTimestampEl = el.timestamp;
      const newTimestampEl = new Date(oldTimestampEl).toLocaleDateString('pl-PL', { hour: '2-digit', minute: '2-digit' });

      let linkWar = '';
      linkWar = `<a href="#match-${el.idwar}" title="Show war #${el.idwar} - ${newTimestampEl}"><span>#</span>${el.idwar}</a>`;
      linkWars.push(linkWar);
    });

    const showIDwars = linkWars.join(', ');

    return showIDwars;
  }

  (async () => {
    // Load the data from the Drive Spreadsheet

    const historyRanking = await drive({
      sheet: '1w_WHqCutkp_S6KveKyu4mNaG76C5dIlDwKw-A-dEOLo',
      tab: '4',
    });

    const players = await drive({
      sheet: '1w_WHqCutkp_S6KveKyu4mNaG76C5dIlDwKw-A-dEOLo',
      tab: '1',
    });

    const historyMatchesTdm = await drive({
      sheet: '1tcSgDUSxwrHQclfxdOKQDabZGQOAeb1E7GVTvitdfu4',
      tab: '4',
    });

    const ourPlayers = document.getElementById('our-players2');
    ourPlayers.innerHTML = getNumOfPlayers(players);

    function rankHistory(name) {
      const arrNameRanks = [];

      function destructObjRanks(obj, arr) {
        for (const key in obj) {
          if (obj.hasOwnProperty(key)) {
            const objInArr = obj[key];
            for (const key2 in objInArr) {
              if (objInArr.hasOwnProperty(key2)) {
                const elemOfObj = objInArr[key2];
                arr.push(elemOfObj);
              }
            }
          }
        }
      }

      destructObjRanks(historyRanking, arrNameRanks);

      function getIndexesRanks(arr, val) {
        const indexes = [];
        let i = -1;
        while ((i = arr.indexOf(val, i + 1)) !== -1) {
          indexes.push(i + 4); // postELO
        }
        return indexes;
      }

      const indexesRanksName = getIndexesRanks(arrNameRanks, name);
      const nameRanksOut = [];

      function ranksAllStrikes(username, ind, arrIn, arrOut) {
        if (arrIn.includes(username)) {
          arrIn.forEach(function (el, index) {
            index += 1;
            ind.forEach(function (founded, i) {
              if (Number(index) === Number(founded)) {
                const foundedStreak = Number(el).toFixed(2);
                arrOut.push(Number(foundedStreak));
              }
            });
          });
        }
      }

      ranksAllStrikes(name, indexesRanksName, arrNameRanks, nameRanksOut);

      // Every player start to play with 1000 ELO rank, so we need to put this before first value in array rank.
      nameRanksOut.unshift(1000);

      return nameRanksOut;
    }

    const lastWar = document.getElementById('lastWar');

    const userNameTimeStamp = players.map((entry) => entry.username);
    userNameTimeStamp.forEach((user) => {
      const userItemTimestamp = document.createElement('div');
      userItemTimestamp.classList.add('item');
      if (findPlayerLastWar(user, historyRanking)) {
        userItemTimestamp.innerHTML += findPlayerLastWar(user, historyRanking);
      } else {
        console.log('Can not find last timestamp war of: ' + user);
      }
      lastWar.appendChild(userItemTimestamp);
    });

    const playerName = document.getElementById('playerName');
    const nationality = document.getElementById('nationality');
    const place = document.getElementById('place');
    const ranking = document.getElementById('overall');
    const frags = document.getElementById('frags');
    const warCount = document.getElementById('warCount');
    const mainApp = document.getElementById('app');
    const pastMonth = document.getElementById('pastmonth');

    const player = players.map((entry) => entry);
    player.forEach(function (name, index) {
      const playerItem = document.createElement('div');
      playerItem.classList.add('item' + index, 'item');
      const playerItemLink = document.createElement('a');
      playerItemLink.setAttribute('href', `#charts-${name.username}`);
      playerItemLink.classList.add(`${name.username}`);

      // if (name.cup1on1edition1 === '1') {
      //   playerItemLink.setAttribute('title', `Winner in 1on1 CUP 1st Edition.`);
      //   playerItemLink.dataset.cup1on1first = 'winner';
      // } else if (name.cup1on1edition1 === '2') {
      //   playerItemLink.setAttribute('title', `2nd place in 1on1 CUP 1st Edition.`);
      //   playerItemLink.dataset.cup1on1first = 'second';
      // } else if (name.cup1on1edition1 === '3') {
      //   playerItemLink.setAttribute('title', `3rd place in 1on1 CUP 1st Edition.`);
      //   playerItemLink.dataset.cup1on1first = 'third';
      // } else {
      //   //
      // }
      // playerItemLink.setAttribute('title', `Watch ${name.playername} profile.`);
      playerItemLink.innerHTML += name.playername;

      playerItem.dataset.place = ++index;
      playerItem.appendChild(playerItemLink);
      playerItemLink.appendChild(smallStrike(name.username, rankHistory));
      playerName.appendChild(playerItem);
    });

    // const playersCompared = players.map((entry) => entry);
    // const playersCompArr = [];
    // playersCompared.forEach((name) => {
    //   // console.log('NAME: ', name);
    //   const playerToCompare = { comparePlayerName: name.playername, compareUserName: name.username };
    //   // console.log('playerToCompare', playerToCompare);
    //   playersCompArr.push(playerToCompare);
    // });

    const playerCard = players.map((entry) => entry);
    playerCard.forEach(function (name, index) {
      const playerCardDiv = document.createElement('div');
      playerCardDiv.classList.add('container', 'view', 'hidden', 'card');
      playerCardDiv.setAttribute('id', `charts-${name.username}`);
      const playerCardWrapper = document.createElement('div');
      playerCardWrapper.classList.add('wrapper');
      playerCardDiv.appendChild(playerCardWrapper);
      playerCardWrapper.innerHTML += `<div class="frag-title"><span class="frag-name">${
        name.playername
      }</span><span class="frag-name">${getPlayerFlag(name.nationality)}</span> has played <span class="frag-name">${
        name.warcount
      }</span> OBJ wars.</div>
      ${
        countWars(name.username, historyMatchesTdm).length > 1
          ? `<div class="frag-title">
      Check <a href="#charts-tdm-${name.username}"><span class="frag-name">${name.playername}</span></a> statistics in TDM.</div>`
          : ''
      }`;
      const inDeCont = document.createElement('div');
      inDeCont.classList.add('increaseDecrease');
      playerCardWrapper.appendChild(inDeCont);
      const inCont = document.createElement('div');
      inCont.classList.add('streak');
      inCont.setAttribute('id', `increase-${name.username}`);
      inDeCont.appendChild(inCont);
      const deCont = document.createElement('div');
      deCont.classList.add('streak');
      deCont.setAttribute('id', `decrease-${name.username}`);
      // deCont.innerHTML += `Clan History: ${name.clanhistory}`;
      inDeCont.appendChild(deCont);

      const clanHistoryCont = document.createElement('div');
      clanHistoryCont.classList.add('frag-item');
      clanHistoryCont.innerHTML += `Clan History: <span class="frag-value">${name.clanhistory}</span>`;
      deCont.appendChild(clanHistoryCont);

      const fragCont = document.createElement('div');
      fragCont.classList.add('streak', 'frag-cont', 'frag-cont-obj');
      inDeCont.appendChild(fragCont);

      const fragContDiv = document.createElement('div');
      fragContDiv.classList.add('frag-sum');
      fragContDiv.innerHTML += `<div class="frag-item">Sum of Frags: <span class="frag-value">${sumOfFrags2(
        name.username,
        historyRanking,
      )}</span></div>
      <div class="frag-item">Highest ranking: <span class="frag-value">${Math.max(
        ...rankHistory2(name.username, historyRanking),
      )}</span></div>
      <div class="frag-item">Current ranking: <span class="frag-value">${name.ranking}</span></div>      
      <div class="frag-item">Lowest ranking: <span class="frag-value">${Math.min(
        ...rankHistory2(name.username, historyRanking),
      )}</span></div>`;
      fragCont.appendChild(fragContDiv);

      const fragAvarage = document.createElement('div');
      fragAvarage.classList.add('streak', 'frag-avarage');
      inDeCont.appendChild(fragAvarage);

      const fragAvarageDiv = document.createElement('div');
      fragAvarageDiv.classList.add('frag-avarage');
      fragAvarageDiv.innerHTML += `<div class="frag-item">Highest frags per war: <span class="frag-value frag-high">${Math.max(
        ...minMaxFrags2(name.username, historyRanking),
      )}</span><img src="./assets/high.png"></div><div class="frag-item">Avarage frags per war: <span class="frag-value frag-avarage">${(
        sumOfFrags2(name.username, historyRanking) / name.warcount
      ).toFixed(
        2,
      )}</span><img src="./assets/avarage.png"></div><div class="frag-item">Lowest frags per war: <span class="frag-value frag-low">${Math.min(
        ...minMaxFrags2(name.username, historyRanking),
      )}</span><img src="./assets/low.png"></div><div class="frag-item wars-cont">ID wars:
     <span class="frag-value wars-id short">
      ${searchPlayerWars2(name.username, historyRanking)}</span></div>`;
      fragAvarage.appendChild(fragAvarageDiv);

      // const comparePlayer = document.createElement('div');
      // comparePlayer.classList.add('frag-avarage');
      // fragAvarage.appendChild(comparePlayer);
      // const comparePlayerSelect = document.createElement('select');
      // comparePlayerSelect.setAttribute('name', 'comparePlayers');
      // comparePlayerSelect.setAttribute('id', 'comparePlayers');
      // // comparePlayerSelect.setAttribute('onclick', 'valSelected()');

      // comparePlayer.appendChild(comparePlayerSelect);
      // const compareInfo = document.createElement('option');
      // compareInfo.setAttribute('value', '');
      // compareInfo.innerHTML += '--Select to compare--';
      // comparePlayerSelect.appendChild(compareInfo);

      // playersCompArr.forEach((item) => {
      //   const newOptCompare = document.createElement('option');
      //   newOptCompare.setAttribute('value', `${item.compareUserName}`);

      //   newOptCompare.innerHTML += `${item.comparePlayerName}`;
      //   comparePlayerSelect.appendChild(newOptCompare);
      // });

      // for (let i = 0; i < playersCompArr.length; i++) {
      //   const optionCompare = document.createElement('option');
      //   optionCompare.setAttribute('value', `${playersCompArr[i].compareUserName}`);
      //   optionCompare.innerHTML += `${playersCompArr[i].comparePlayerName}`;
      //   comparePlayerSelect.appendChild(optionCompare);
      // }

      // function valSelected() {
      //   const selectedPlayer = document.getElementById('comparePlayers');
      //   const selectedToDisplay = selectedPlayer.options[selectedPlayer.selectedIndex].text;
      //   console.log('selected Players', selectedToDisplay);
      //   return selectedToDisplay;
      // }

      const playerCardDivChart = document.createElement('canvas');
      playerCardDivChart.setAttribute('id', `chart-${name.username}`);
      playerCardWrapper.appendChild(playerCardDivChart);
      // const chartWrapper = document.createElement('div');
      // chartWrapper.classList.add('chartWrapper');
      // playerCardWrapper.appendChild(chartWrapper);
      // const chartAreaWrapper = document.createElement('div');
      // chartAreaWrapper.classList.add('chartAreaWrapper');
      // chartWrapper.appendChild(chartAreaWrapper);
      // const myChartAxis = document.createElement('canvas');
      // myChartAxis.classList.add('myChartAxis');
      // myChartAxis.width = 0;
      // myChartAxis.height = 580;
      // chartWrapper.appendChild(myChartAxis);
      // const myChart = document.createElement('canvas');
      // myChart.width = 1160;
      // myChart.height = 580;
      // myChart.setAttribute('id', `chart-frags-${name.username}`);
      // chartAreaWrapper.appendChild(myChart);

      const playerCardFragsChart = document.createElement('canvas');
      playerCardFragsChart.setAttribute('id', `chart-frags-${name.username}`);
      playerCardWrapper.appendChild(playerCardFragsChart);

      mainApp.appendChild(playerCardDiv);
      // function enableRoute() {
      //   function setRoute() {
      //     $('.view').hide();
      //     const { hash } = window.location;
      //     if (hash === '') {
      //       $('#home').show();
      //     }
      //     $(hash).show();
      //   }
      //   setRoute();
      //   window.addEventListener('hashchange', setRoute);
      // }
      // enableRoute();
    });

    const places2 = players.map((entry) => entry);
    places2.forEach(function (placeObj, index) {
      const item = document.createElement('div');
      item.classList.add('item');
      item.innerHTML = ++index;
      place.appendChild(item);
    });

    const pastMonthDiv = players.map((entry) => entry);
    pastMonthDiv.forEach(function (playerActive) {
      const playerActivity = document.createElement('div');
      playerActivity.classList.add('item');
      playerActivity.innerHTML = pastMonthActivity2(playerActive.username, historyRanking);
      pastMonth.appendChild(playerActivity);
    });

    const national = players.map((entry) => entry);
    national.forEach(function (nat) {
      const item = document.createElement('div');
      item.classList.add('item');
      item.innerHTML += getPlayerFlag(nat.nationality);
      nationality.appendChild(item);
    });

    const rankings = players.map((entry) => entry);
    rankings.forEach(function (elorank) {
      const eloItem = document.createElement('div');
      eloItem.classList.add('item');
      eloItem.innerHTML += elorank.ranking;
      ranking.appendChild(eloItem);
    });

    const showFrags = players.map((entry) => entry);
    showFrags.forEach(function (frag) {
      const fragItem = document.createElement('div');
      fragItem.classList.add('item');
      fragItem.innerHTML += sumOfFrags2(frag.username, historyRanking);
      frags.appendChild(fragItem);
    });

    const wars = players.map((entry) => entry.warcount);
    wars.forEach(function (matches) {
      const warItem = document.createElement('div');
      warItem.classList.add('item');
      warItem.innerHTML += matches;
      warCount.appendChild(warItem);
    });

    players.forEach((userNameInStreak) => {
      const increaseDiv = document.getElementById(`increase-${userNameInStreak.username}`);
      const playerInStreak = longestWinning(
        rankHistory2(userNameInStreak.username, historyRanking),
        rankHistory2(userNameInStreak.username, historyRanking).length,
      );
      // console.log('PLAYER STREAK: ', playerInStreak);
      increaseDiv.innerHTML += `<div class="frag-item">Longest increase streak: <span class="frag-value">${playerInStreak}</span><i class="fas fa-arrow-up"></i></div>`;
    });

    players.forEach((nameUser) => {
      const ctx = document.getElementById(`chart-${nameUser.username}`).getContext('2d');
      new Chart(ctx, {
        type: 'line',
        data: {
          labels: countWars(nameUser.username, historyRanking),
          datasets: [
            {
              label: nameUser.playername,
              borderColor: '#ffffc0',
              data: rankHistory2(nameUser.username, historyRanking),
              lineTension: 0,
              order: 1,
            },

            // {
            //   label: 'Frags',
            //   id: 'frags',
            //   borderColor: 'green',
            //   backgroundColor: 'green',
            //   data: fragsHistory(nameUser.username),
            //   type: 'bar',
            //   order: 2,
            // },
            // {
            //   label: 'bAtOn',
            //   borderColor: 'green',
            //   data: rankHistory('kapsel'),
            //   lineTension: 0,
            // },
          ],
        },
        options: {
          elements: {
            line: {
              tension: 0,
            },
          },
          scales: {
            xAxes: [
              {
                scaleLabel: {
                  display: true,
                  labelString: 'No. of Match',
                },
              },
            ],
            yAxes: [
              {
                scaleLabel: {
                  display: true,
                  labelString: 'RANKING',
                },
              },
            ],
          },
          annotation: {
            drawTime: 'afterDatasetsDraw',
            annotations: [
              {
                id: 'hline1',
                type: 'line',
                mode: 'horizontal',
                scaleID: 'y-axis-0',
                value: 950,
                borderColor: 'red',
                borderDash: [10, 5],
                label: {
                  backgroundColor: 'red',
                  content: '950',
                  enabled: true,
                },
              },
              {
                id: 'hline3',
                type: 'line',
                mode: 'horizontal',
                scaleID: 'y-axis-0',
                value: 1000,
                borderColor: 'red',
                borderWidth: 3,
                // borderDash: [10, 5],
                label: {
                  backgroundColor: 'red',
                  content: '1000',
                  enabled: true,
                },
              },
              {
                id: 'hline2',
                type: 'line',
                mode: 'horizontal',
                scaleID: 'y-axis-0',
                value: 1050,
                borderColor: 'red',
                borderDash: [10, 5],
                label: {
                  backgroundColor: 'red',
                  content: '1050',
                  enabled: true,
                },
              },
              // {
              //   id: 'hline4',
              //   type: 'line',
              //   mode: 'horizontal',
              //   scaleID: 'y-axis-0',
              //   value: 1100,
              //   borderColor: 'orange',
              //   borderDash: [10, 5],
              //   label: {
              //     backgroundColor: 'orange',
              //     content: '1100',
              //     enabled: true,
              //   },
              // },
              // {
              //   id: 'hline5',
              //   type: 'line',
              //   mode: 'horizontal',
              //   scaleID: 'y-axis-0',
              //   value: 1150,
              //   borderColor: 'lightgreen',
              //   borderDash: [10, 5],
              //   label: {
              //     backgroundColor: 'green',
              //     content: '1150',
              //     enabled: true,
              //   },
              // },
            ],
          },
        },
      });
    });
    players.forEach((nameUser) => {
      const ctx = document.getElementById(`chart-frags-${nameUser.username}`).getContext('2d');

      const chartF = new Chart(ctx, {
        type: 'line',
        data: {
          labels: searchPlayer2(nameUser.username, historyRanking),
          datasets: [
            {
              label: 'Frags',
              id: 'frags',
              borderColor: 'green',
              backgroundColor: 'lightgreen',
              data: minMaxFrags2(nameUser.username, historyRanking),
              type: 'bar',
              xAxisID: 'date-x-axis',
            },
          ],
        },
        options: {
          elements: {
            line: {
              tension: 0,
            },
          },
          scales: {
            xAxes: [
              {
                ticks: {
                  beginAtZero: false,
                  min: 1,
                },
                offset: true,
                id: 'date-x-axis',
                scaleLabel: {
                  display: true,
                  labelString: 'Date of match',
                },
              },
            ],
            yAxes: [
              {
                scaleLabel: {
                  display: true,
                  labelString: 'Frags per war',
                },
              },
            ],
          },
          annotation: {
            drawTime: 'afterDatasetsDraw',
            annotations: [
              {
                id: 'more-27',
                type: 'line',
                mode: 'horizontal',
                scaleID: 'y-axis-0',
                value: sumOfFrags2(nameUser.username, historyRanking) / nameUser.warcount,
                borderColor: 'orange',
                borderDash: [10, 5],
                label: {
                  fontColor: '#000',
                  backgroundColor: 'rgba(250, 190, 88, 0.7)',
                  content: (sumOfFrags2(nameUser.username, historyRanking) / nameUser.warcount).toFixed(2) + ' Avg.',
                  enabled: true,
                },
              },
              {
                id: 'more-28',
                type: 'line',
                mode: 'horizontal',
                scaleID: 'y-axis-0',
                value: 28,
                borderColor: 'red',
                borderDash: [10, 5],
                label: {
                  backgroundColor: 'rgba(207, 0, 15, 0.5)',
                  content: 'More then 1 kill per round (KDR > 1.0)',
                  enabled: true,
                },
              },
            ],
          },
        },
      });

      // new Chart(ctx).Line(chartF, {
      //   onAnimationComplete: function () {
      //     const sourceCanvas = this.chartF.ctx.canvas;
      //     const copyWidth = this.scale.xScalePaddingLeft - 5;
      //     const copyHeight = this.scale.endPoint + 5;
      //     const targetCtx = document.getElementById('myChartAxis').getContext('2d');
      //     targetCtx.canvas.width = copyWidth;
      //     targetCtx.drawImage(sourceCanvas, 0, 0, copyWidth, copyHeight, 0, 0, copyWidth, copyHeight);
      //   },
      // });
    });
  })();
}
