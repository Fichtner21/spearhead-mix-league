import drive from 'drive-db';
import { Chart } from 'chart.js';
import $ from 'jquery';

export async function inactivePlayers() {
  async function getInactive(name) {
    const sheets_url = `https://sheets.googleapis.com/v4/spreadsheets/1w_WHqCutkp_S6KveKyu4mNaG76C5dIlDwKw-A-dEOLo/values/${name}?key=AIzaSyD6eJ4T-ztIfyFn-h2oDAGTnNNYhNRziLU`;
    const res = await fetch(sheets_url);
    const json = await res.json();
    return json;
  }

  const newInactive = await getInactive('Inactive');
  const batchRowValues = newInactive.values;
  const players = [];
  const historyRanking47 = [];
  for (let i = 1; i < batchRowValues.length; i++) {
    const rowObject = {};
    for (let j = 0; j < batchRowValues[i].length; j++) {
      rowObject[batchRowValues[0][j]] = batchRowValues[i][j];
    }
    players.push(rowObject);
    historyRanking47.push(rowObject);
  }

  const newMatchHistory = await getInactive('Match+History');
  const batchRowValuesHistory = newMatchHistory.values;
  const historyRanking4 = [];
  for (let i = 1; i < batchRowValuesHistory.length; i++) {
    const rowObject = {};
    for (let j = 0; j < batchRowValuesHistory[i].length; j++) {
      rowObject[batchRowValuesHistory[0][j]] = batchRowValuesHistory[i][j];
    }
    historyRanking4.push(rowObject);
  }
  // }

  // export function inactivePlayers() {
  // (async () => {
  // const players = await drive({
  //   sheet: '1w_WHqCutkp_S6KveKyu4mNaG76C5dIlDwKw-A-dEOLo',
  //   tab: '7',
  // });

  // const historyRanking4 = await drive({
  //   sheet: '1w_WHqCutkp_S6KveKyu4mNaG76C5dIlDwKw-A-dEOLo',
  //   tab: '4',
  // });

  // const historyRanking47 = await drive({
  //   sheet: '1w_WHqCutkp_S6KveKyu4mNaG76C5dIlDwKw-A-dEOLo',
  //   tab: '7',
  // });

  const lastWar = document.getElementById('lastWar_inactive');

  const userNameTimeStamp = players.map((entry) => entry.username);
  userNameTimeStamp.forEach((user) => {
    const userItemTimestamp = document.createElement('div');
    userItemTimestamp.classList.add('item');
    if (findPlayerLastWar(user, historyRanking4)) {
      userItemTimestamp.innerHTML += findPlayerLastWar(user, historyRanking4);
    } else {
      console.log('Can not find last timestamp war of: ' + user);
    }
    lastWar.appendChild(userItemTimestamp);
  });

  const playerName = document.getElementById('playerName_inactive');
  const nationality = document.getElementById('nationality_inactive');
  const place = document.getElementById('place_inactive');
  const ranking = document.getElementById('overall_inactive');
  const frags = document.getElementById('frags_inactive');
  const warCount = document.getElementById('warCount_inactive');
  const mainApp = document.getElementById('app');

  const player = players.map((entry) => entry);
  player.forEach(function (name, index) {
    const playerItem = document.createElement('div');
    playerItem.classList.add('item');
    const playerItemLink = document.createElement('a');
    playerItemLink.setAttribute('href', `#charts-${name.username}`);
    playerItemLink.setAttribute('title', `Watch ${name.playername} profile.`);
    playerItemLink.innerHTML += name.playername;
    playerItem.appendChild(playerItemLink);
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
    playerCardWrapper.innerHTML += `<div class="frag-title"><span class="frag-name">${name.playername}</span> has played <span class="frag-name">${name.warcount}</span> wars.</div>`;
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
    fragCont.classList.add('streak', 'frag-cont');
    inDeCont.appendChild(fragCont);

    const fragContDiv = document.createElement('div');
    fragContDiv.classList.add('frag-sum');
    fragContDiv.innerHTML += `<div class="frag-item">Sum of Frags: <span class="frag-value">${sumOfFrags2(
      name.username,
      historyRanking4,
    )}</span></div>
      <div class="frag-item">Highest ranking: <span class="frag-value">${Math.max(
        ...rankHistory2(name.username, historyRanking4),
      )}</span></div>
      <div class="frag-item">Current ranking: <span class="frag-value">${name.ranking}</span></div>
      <div class="frag-item">Lowest ranking: <span class="frag-value">${Math.min(
        ...rankHistory2(name.username, historyRanking4),
      )}</span></div>`;
    fragCont.appendChild(fragContDiv);

    const fragAvarage = document.createElement('div');
    fragAvarage.classList.add('streak', 'frag-avarage');
    inDeCont.appendChild(fragAvarage);

    const fragAvarageDiv = document.createElement('div');
    fragAvarageDiv.classList.add('frag-avarage');
    fragAvarageDiv.innerHTML += `<div class="frag-item">Highest frags per war: <span class="frag-value frag-high">${Math.max(
      ...minMaxFrags2(name.username, historyRanking4),
    )}</span><img src="./assets/high.png"></div><div class="frag-item">Avarage frags per war: <span class="frag-value frag-avarage">${(
      sumOfFrags2(name.username, historyRanking4) / name.warcount
    ).toFixed(
      2,
    )}</span><img src="./assets/avarage.png"></div><div class="frag-item">Lowest frags per war: <span class="frag-value frag-low">${Math.min(
      ...minFrags(name.username, historyRanking4),
    )}</span><img src="./assets/low.png"></div>${
      name.due ? `<div class="frag-item">Inactive due:<span class="frag-value">${name.due}</span></div>` : ''
    }</div><div class="frag-item">ID wars: <span class="frag-value">${searchPlayerWars2(name.username, historyRanking4)}</span></div>`;
    fragAvarage.appendChild(fragAvarageDiv);

    // const playerCardFragsChart = document.createElement('canvas');
    // playerCardFragsChart.setAttribute('id', `chart-frags-${name.username}`);
    // playerCardWrapper.appendChild(playerCardFragsChart);

    // const playerCardDivChart = document.createElement('canvas');
    // playerCardDivChart.setAttribute('id', `chart-${name.username}`);
    // playerCardWrapper.appendChild(playerCardDivChart);
    // mainApp.appendChild(playerCardDiv);

    const playerCardDivChart = document.createElement('canvas');
    playerCardDivChart.setAttribute('id', `chart-${name.username}`);
    playerCardWrapper.appendChild(playerCardDivChart);
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
    item.innerHTML += ++index;
    place.appendChild(item);
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
    fragItem.innerHTML += sumOfFrags2(frag.username, historyRanking4);
    frags.appendChild(fragItem);
  });

  const wars = players.map((entry) => entry.warcount);
  wars.forEach(function (matches) {
    const warItem = document.createElement('div');
    warItem.classList.add('item');
    warItem.innerHTML += matches;
    warCount.appendChild(warItem);
  });

  historyRanking47.forEach((userNameInStreak) => {
    const increaseDiv = document.getElementById(`increase-${userNameInStreak.username}`);
    const playerInStreak = longestWinning(
      rankHistory2(userNameInStreak.username, historyRanking4),
      rankHistory2(userNameInStreak.username, historyRanking4).length,
    );
    increaseDiv.innerHTML += `<div class="frag-item">Longest increase streak: <span class="frag-value">${playerInStreak}</span><i class="fas fa-arrow-up"></i></div>`;
  });

  historyRanking47.forEach((nameUser) => {
    const ctx = document.getElementById(`chart-${nameUser.username}`).getContext('2d');
    const chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: countWars(nameUser.username, historyRanking4),
        datasets: [
          {
            label: nameUser.playername,
            borderColor: '#ffffc0',
            data: rankHistory2(nameUser.username, historyRanking4),
            lineTension: 0,
          },
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
  // historyRanking4.forEach((nameUser) => {
  //   const ctx = document.getElementById(`chart-frags-${nameUser.username}`).getContext('2d');

  //   const chartF = new Chart(ctx, {
  //     type: 'line',
  //     data: {
  //       labels: searchPlayer2(nameUser.username, historyRanking4),
  //       datasets: [
  //         {
  //           label: 'Frags',
  //           id: 'frags',
  //           borderColor: 'green',
  //           backgroundColor: 'lightgreen',
  //           data: minMaxFrags2(nameUser.username, historyRanking4),
  //           type: 'bar',
  //           xAxisID: 'date-x-axis',
  //         },
  //       ],
  //     },
  //     options: {
  //       elements: {
  //         line: {
  //           tension: 0,
  //         },
  //       },
  //       scales: {
  //         xAxes: [
  //           {
  //             ticks: {
  //               beginAtZero: false,
  //               min: 1,
  //             },
  //             offset: true,
  //             id: 'date-x-axis',
  //             scaleLabel: {
  //               display: true,
  //               labelString: 'Date of match',
  //             },
  //           },
  //         ],
  //         yAxes: [
  //           {
  //             scaleLabel: {
  //               display: true,
  //               labelString: 'Frags per war',
  //             },
  //           },
  //         ],
  //       },
  //       annotation: {
  //         drawTime: 'afterDatasetsDraw',
  //         annotations: [
  //           {
  //             id: 'more-27',
  //             type: 'line',
  //             mode: 'horizontal',
  //             scaleID: 'y-axis-0',
  //             value: sumOfFrags2(nameUser.username, historyRanking4) / nameUser.warcount,
  //             borderColor: 'orange',
  //             borderDash: [10, 5],
  //             label: {
  //               fontColor: '#000',
  //               backgroundColor: 'rgba(250, 190, 88, 0.7)',
  //               content: (sumOfFrags2(nameUser.username, historyRanking4) / nameUser.warcount).toFixed(2) + ' Avg.',
  //               enabled: true,
  //             },
  //           },
  //           {
  //             id: 'more-28',
  //             type: 'line',
  //             mode: 'horizontal',
  //             scaleID: 'y-axis-0',
  //             value: 28,
  //             borderColor: 'red',
  //             borderDash: [10, 5],
  //             label: {
  //               backgroundColor: 'rgba(207, 0, 15, 0.5)',
  //               content: 'More then 1 kill per round (KDR > 1.0)',
  //               enabled: true,
  //             },
  //           },
  //         ],
  //       },
  //     },
  //   });

  //   // new Chart(ctx).Line(chartF, {
  //   //   onAnimationComplete: function () {
  //   //     const sourceCanvas = this.chartF.ctx.canvas;
  //   //     const copyWidth = this.scale.xScalePaddingLeft - 5;
  //   //     const copyHeight = this.scale.endPoint + 5;
  //   //     const targetCtx = document.getElementById('myChartAxis').getContext('2d');
  //   //     targetCtx.canvas.width = copyWidth;
  //   //     targetCtx.drawImage(sourceCanvas, 0, 0, copyWidth, copyHeight, 0, 0, copyWidth, copyHeight);
  //   //   },
  //   // });
  // });
  // })();

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

  // function cupAchivments(string) {
  //   if ('1') {
  //     playerItemLink.setAttribute('title', `Winner in 1on1 CUP 1st Edition.`);
  //     playerItemLink.dataset.cup1on1first = 'winner';
  //   } else if ('2') {
  //     playerItemLink.setAttribute('title', `2nd place in 1on1 CUP 1st Edition.`);
  //     playerItemLink.dataset.cup1on1first = 'second';
  //   } else if ('3') {
  //     playerItemLink.setAttribute('title', `3rd place in 1on1 CUP 1st Edition.`);
  //     playerItemLink.dataset.cup1on1first = 'third';
  //   } else {
  //     //
  //   }
  // }

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

  function minFrags(name, obj) {
    const arrNameFrags2 = [];
    destructObjRanks2(obj, arrNameFrags2);
    const indexesFragsName2 = getIndexesFrags2(arrNameFrags2, name);
    const nameFragsOut2 = [];
    ranksAllStrikes2(name, indexesFragsName2, arrNameFrags2, nameFragsOut2);
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
}
