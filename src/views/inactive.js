import drive from 'drive-db';
import { Chart } from 'chart.js';
import $ from 'jquery';

export function inactivePlayers() {
  (async () => {
    const players = await drive({
      sheet: '1w_WHqCutkp_S6KveKyu4mNaG76C5dIlDwKw-A-dEOLo',
      tab: '7',
    });

    const historyRanking4 = await drive({
      sheet: '1w_WHqCutkp_S6KveKyu4mNaG76C5dIlDwKw-A-dEOLo',
      tab: '4',
    });

    const historyRanking47 = await drive({
      sheet: '1w_WHqCutkp_S6KveKyu4mNaG76C5dIlDwKw-A-dEOLo',
      tab: '7',
    });

    // console.log(historyRanking47);

    // const ourPlayers = document.getElementById('our-players');
    // ourPlayers.innerHTML += `<span>Active users</span><i class="fas fa-users"></i> ${historyRanking47.length}`;

    function sumOfFrags(name) {
      const arrNameFrags = [];

      function destructObjFrags(obj, arr) {
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

      destructObjFrags(historyRanking4, arrNameFrags);

      function getIndexesFrags(arr, val) {
        const indexes = [];
        let i = -1;
        while ((i = arr.indexOf(val, i + 1)) !== -1) {
          indexes.push(i + 3); // frags
        }
        return indexes;
      }

      const indexesFragsName = getIndexesFrags(arrNameFrags, name);
      const nameFragsOut = [];

      function foundAllStrikes(username, ind, arrIn, arrOut) {
        if (arrIn.includes(username)) {
          arrIn.forEach(function (el, index) {
            index += 1;
            ind.forEach(function (founded, i) {
              if (Number(index) === Number(founded)) {
                const foundedStreak = Number(el);
                arrOut.push(foundedStreak);
              }
            });
          });
        }
      }

      foundAllStrikes(name, indexesFragsName, arrNameFrags, nameFragsOut);
      let nameFragsOutExist = '';
      if (Array.isArray(nameFragsOut) && nameFragsOut.length) {
        nameFragsOutExist = nameFragsOut.reduce((a, b) => a + b);
      } else {
        nameFragsOutExist = 0;
      }

      return nameFragsOutExist;
    }

    function minMaxFrags(name) {
      const arrNameFrags = [];

      function destructObjFrags(obj, arr) {
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

      destructObjFrags(historyRanking4, arrNameFrags);

      function getIndexesFrags(arr, val) {
        const indexes = [];
        let i = -1;
        while ((i = arr.indexOf(val, i + 1)) !== -1) {
          indexes.push(i + 3); // frags
        }
        return indexes;
      }

      const indexesFragsName = getIndexesFrags(arrNameFrags, name);
      const nameFragsOut = [];

      function foundAllStrikes(username, ind, arrIn, arrOut) {
        if (arrIn.includes(username)) {
          arrIn.forEach(function (el, index) {
            index += 1;
            ind.forEach(function (founded, i) {
              if (Number(index) === Number(founded)) {
                const foundedStreak = Number(el);
                arrOut.push(foundedStreak);
              }
            });
          });
        }
      }

      foundAllStrikes(name, indexesFragsName, arrNameFrags, nameFragsOut);

      return nameFragsOut;
    }

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

      destructObjRanks(historyRanking4, arrNameRanks);

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

    function lenOfLongIncSubArr(arr, n) {
      let max = 1;
      let len = 1;

      for (let i = 1; i < n; i++) {
        if (arr[i] >= arr[i - 1]) {
          len++;
        } else {
          if (max < len) {
            max = len;
            break;
          }
        }
      }

      if (max < len) {
        max = len;
      }

      return max;
    }

    function searchPlayerWars(name) {
      const exampleArr = [];
      function searchPlayerKeyNameWar(nameKey, myArray) {
        for (let i = 0; i < myArray.length; i++) {
          if (myArray[i].t1p1name === nameKey) {
            exampleArr.push(myArray[i]);
          } else if (myArray[i].t1p2name === nameKey) {
            exampleArr.push(myArray[i]);
          } else if (myArray[i].t1p3name === nameKey) {
            exampleArr.push(myArray[i]);
          } else if (myArray[i].t1p4name === nameKey) {
            exampleArr.push(myArray[i]);
          } else if (myArray[i].t1p5name === nameKey) {
            exampleArr.push(myArray[i]);
          } else if (myArray[i].t1p6name === nameKey) {
            exampleArr.push(myArray[i]);
          } else if (myArray[i].t2p1name === nameKey) {
            exampleArr.push(myArray[i]);
          } else if (myArray[i].t2p2name === nameKey) {
            exampleArr.push(myArray[i]);
          } else if (myArray[i].t2p3name === nameKey) {
            exampleArr.push(myArray[i]);
          } else if (myArray[i].t2p4name === nameKey) {
            exampleArr.push(myArray[i]);
          } else if (myArray[i].t2p5name === nameKey) {
            exampleArr.push(myArray[i]);
          } else if (myArray[i].t2p6name === nameKey) {
            exampleArr.push(myArray[i]);
          }
        }
        return exampleArr;
      }

      const resultObject = searchPlayerKeyNameWar(name, historyRanking4);
      const warIDs = [];
      resultObject.forEach((elem) => {
        warIDs.push(elem.idwar);
      });
      const showIDwars = warIDs.join(', ');
      return showIDwars;
    }

    const lastWar = document.getElementById('lastWar_inactive');

    function findPlayerLastWar(name, obj) {
      const findeLastWar = obj.filter((item) => JSON.stringify(item).includes(name)).pop();
      let findLastTimeStamp = '';
      let newTimestampElem = '';
      if (findeLastWar) {
        findLastTimeStamp = findeLastWar.timestamp;
        newTimestampElem = new Date(findLastTimeStamp).toLocaleDateString('pl-PL', { hour: '2-digit', minute: '2-digit' });
      } else if (findeLastWar === 'undefined') {
        findLastTimeStamp = 'No match';
      } else {
        findLastTimeStamp = 'No match';
      }
      return newTimestampElem;
    }

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

    const playersCompared = players.map((entry) => entry);
    const playersCompArr = [];
    playersCompared.forEach((name) => {
      // console.log('NAME: ', name);
      const playerToCompare = { comparePlayerName: name.playername, compareUserName: name.username };
      // console.log('playerToCompare', playerToCompare);
      playersCompArr.push(playerToCompare);
    });

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
      fragContDiv.innerHTML += `<div class="frag-item">Sum of Frags: <span class="frag-value">${sumOfFrags(name.username)}</span></div>
      <div class="frag-item">Highest ranking: <span class="frag-value">${Math.max(...rankHistory(name.username))}</span></div>
      <div class="frag-item">Current ranking: <span class="frag-value">${name.ranking}</span></div>
      <div class="frag-item">Lowest ranking: <span class="frag-value">${Math.min(...rankHistory(name.username))}</span></div>`;
      fragCont.appendChild(fragContDiv);

      const fragAvarage = document.createElement('div');
      fragAvarage.classList.add('streak', 'frag-avarage');
      inDeCont.appendChild(fragAvarage);

      const fragAvarageDiv = document.createElement('div');
      fragAvarageDiv.classList.add('frag-avarage');
      fragAvarageDiv.innerHTML += `<div class="frag-item">Highest frags per war: <span class="frag-value frag-high">${Math.max(
        ...minMaxFrags(name.username),
      )}</span><img src="./assets/high.png"></div><div class="frag-item">Avarage frags per war: <span class="frag-value frag-avarage">${(
        sumOfFrags(name.username) / name.warcount
      ).toFixed(
        2,
      )}</span><img src="./assets/avarage.png"></div><div class="frag-item">Lowest frags per war: <span class="frag-value frag-low">${Math.min(
        ...minMaxFrags(name.username),
      )}</span><img src="./assets/low.png"></div>${
        name.due ? `<div class="frag-item">Inactive due:<span class="frag-value">${name.due}</span></div>` : ''
      }</div><div class="frag-item">ID wars: <span class="frag-value">${searchPlayerWars(name.username)}</span></div>`;
      fragAvarage.appendChild(fragAvarageDiv);

      //   // const comparePlayer = document.createElement('div');
      //   // comparePlayer.classList.add('frag-avarage');
      //   // fragAvarage.appendChild(comparePlayer);
      //   // const comparePlayerSelect = document.createElement('select');
      //   // comparePlayerSelect.setAttribute('name', 'comparePlayers');
      //   // comparePlayerSelect.setAttribute('id', 'comparePlayers');
      //   // // comparePlayerSelect.setAttribute('onclick', 'valSelected()');

      //   // comparePlayer.appendChild(comparePlayerSelect);
      //   // const compareInfo = document.createElement('option');
      //   // compareInfo.setAttribute('value', '');
      //   // compareInfo.innerHTML += '--Select to compare--';
      //   // comparePlayerSelect.appendChild(compareInfo);

      //   // playersCompArr.forEach((item) => {
      //   //   const newOptCompare = document.createElement('option');
      //   //   newOptCompare.setAttribute('value', `${item.compareUserName}`);

      //   //   newOptCompare.innerHTML += `${item.comparePlayerName}`;
      //   //   comparePlayerSelect.appendChild(newOptCompare);
      //   // });

      //   // for (let i = 0; i < playersCompArr.length; i++) {
      //   //   const optionCompare = document.createElement('option');
      //   //   optionCompare.setAttribute('value', `${playersCompArr[i].compareUserName}`);
      //   //   optionCompare.innerHTML += `${playersCompArr[i].comparePlayerName}`;
      //   //   comparePlayerSelect.appendChild(optionCompare);
      //   // }

      //   // function valSelected() {
      //   //   const selectedPlayer = document.getElementById('comparePlayers');
      //   //   const selectedToDisplay = selectedPlayer.options[selectedPlayer.selectedIndex].text;
      //   //   console.log('selected Players', selectedToDisplay);
      //   //   return selectedToDisplay;
      //   // }

      const playerCardDivChart = document.createElement('canvas');
      playerCardDivChart.setAttribute('id', `chart-${name.username}`);
      playerCardWrapper.appendChild(playerCardDivChart);
      mainApp.appendChild(playerCardDiv);
      function enableRoute() {
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
      enableRoute();
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
      switch (nat.nationality) {
        case 'EU': {
          nat.nationality = `<img src="/assets/flags/_e.gif">`;
          break;
        }
        case 'PL': {
          nat.nationality = `<img src="/assets/flags/pl.gif">`;
          break;
        }
        case 'EG': {
          nat.nationality = `<img src="/assets/flags/EG.gif">`;
          break;
        }
        case 'NL': {
          nat.nationality = `<img src="/assets/flags/nl.gif">`;
          break;
        }
        case 'RU': {
          nat.nationality = `<img src="/assets/flags/RU.gif">`;
          break;
        }
        case 'RO': {
          nat.nationality = `<img src="/assets/flags/ro.gif">`;
          break;
        }
        case 'FR': {
          nat.nationality = `<img src="/assets/flags/fr.gif">`;
          break;
        }
        case 'UK': {
          nat.nationality = `<img src="/assets/flags/uk.gif">`;
          break;
        }
        case 'BE': {
          nat.nationality = `<img src="/assets/flags/be.gif">`;
          break;
        }
        case 'GR': {
          nat.nationality = `<img src="/assets/flags/gr.gif">`;
          break;
        }
        case 'DE': {
          nat.nationality = `<img src="/assets/flags/de.gif">`;
          break;
        }
        case 'ES': {
          nat.nationality = `<img src="/assets/flags/es.gif">`;
          break;
        }
        case 'PT': {
          nat.nationality = `<img src="/assets/flags/pt.gif">`;
          break;
        }
        default:
          console.log('Nie pasuje');
      }
      item.innerHTML += nat.nationality;
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
      fragItem.innerHTML += sumOfFrags(frag.username);
      frags.appendChild(fragItem);
    });

    const wars = players.map((entry) => entry.warcount);
    wars.forEach(function (matches) {
      const warItem = document.createElement('div');
      warItem.classList.add('item');
      warItem.innerHTML += matches;
      warCount.appendChild(warItem);
    });

    function countWars(name) {
      const playerWars = [];
      const playerRankHistory = rankHistory(name);
      playerRankHistory.forEach((war, index) => {
        playerWars.push(index);
      });
      // Skip first el of array because is based rank 1000.
      // playerWars.shift();
      return playerWars;
    }

    // const lastPlayedWar = historyRanking4.pop();
    // const lastWarWrapper = document.createElement('div');
    // lastWarWrapper.classList.add('list__item');
    // const lastWarList = document.createElement('ul');
    // const lastWarItem = document.createElement('li');
    // console.log(lastPlayedWar);
    // const lastWarValues = `<div class="last-match">
    //   <div>#ID ${historyRanking4.length + 1}</div>
    //   <div>${lastPlayedWar.timestamp}</div>

    //     <div>${lastPlayedWar.t1p1preelo} </div>
    //     <div>${lastPlayedWar.t1p1name} </div>
    //     <div>${lastPlayedWar.t1p1score} </div>
    //     <div>${lastPlayedWar.t1p1postelo} </div>

    //     <div>${lastPlayedWar.t1p2preelo} </div>
    //     <div>${lastPlayedWar.t1p2name} </div>
    //     <div>${lastPlayedWar.t1p2score} </div>
    //     <div>${lastPlayedWar.t1p2postelo} </div>

    //     <div>${lastPlayedWar.t1p3preelo} </div>
    //     <div>${lastPlayedWar.t1p3name} </div>
    //     <div>${lastPlayedWar.t1p3score} </div>
    //     <div>${lastPlayedWar.t1p3postelo} </div>

    //     <div>${lastPlayedWar.t1p4preelo} </div>
    //     <div>${lastPlayedWar.t1p4name} </div>
    //     <div>${lastPlayedWar.t1p4score} </div>
    //     <div>${lastPlayedWar.t1p4postelo} </div>

    //     <div>${lastPlayedWar.t1p5preelo} </div>
    //     <div>${lastPlayedWar.t1p5name} </div>
    //     <div>${lastPlayedWar.t1p5score} </div>
    //     <div>${lastPlayedWar.t1p5postelo} </div>

    //   <div>${lastPlayedWar.t1roundswon} </div>
    //   <div>${lastPlayedWar.t2roundswon} </div>

    //     <div>${lastPlayedWar.t2p1preelo} </div>
    //     <div>${lastPlayedWar.t2p1name} </div>
    //     <div>${lastPlayedWar.t2p1score} </div>
    //     <div>${lastPlayedWar.t2p1postelo} </div>

    //     <div>${lastPlayedWar.t2p2preelo} </div>
    //     <div>${lastPlayedWar.t2p2name} </div>
    //     <div>${lastPlayedWar.t2p2score} </div>
    //     <div>${lastPlayedWar.t2p2postelo} </div>

    //     <div>${lastPlayedWar.t2p3preelo} </div>
    //     <div>${lastPlayedWar.t2p3name} </div>
    //     <div>${lastPlayedWar.t2p3score} </div>
    //     <div>${lastPlayedWar.t2p3postelo} </div>

    //     <div>${lastPlayedWar.t2p4preelo} </div>
    //     <div>${lastPlayedWar.t2p4name} </div>
    //     <div>${lastPlayedWar.t2p4score} </div>
    //     <div>${lastPlayedWar.t2p4postelo} </div>

    //     <div>${lastPlayedWar.t2p5preelo} </div>
    //     <div>${lastPlayedWar.t2p5name} </div>
    //     <div>${lastPlayedWar.t2p5score} </div>
    //     <div>${lastPlayedWar.t2p5postelo} </div>

    // </div>`;

    // lastWarWrapper.innerHTML = lastWarValues;
    // document.getElementById('list').appendChild(lastWarWrapper);

    historyRanking47.forEach((userNameInStreak) => {
      const increaseDiv = document.getElementById(`increase-${userNameInStreak.username}`);
      const playerInStreak = lenOfLongIncSubArr(rankHistory(userNameInStreak.username), rankHistory(userNameInStreak.username).length);
      // console.log('PLAYER STREAK: ', playerInStreak);
      increaseDiv.innerHTML += `<div class="frag-item">Longest increase streak: <span class="frag-value">${playerInStreak}</span><i class="fas fa-arrow-up"></i></div>`;
    });

    historyRanking47.forEach((nameUser) => {
      const ctx = document.getElementById(`chart-${nameUser.username}`).getContext('2d');
      const chart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: countWars(nameUser.username),
          datasets: [
            {
              label: nameUser.playername,
              borderColor: '#ffffc0',
              data: rankHistory(nameUser.username),
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
  })();
}
