import drive from 'drive-db';
import { Chart } from 'chart.js';
import $ from 'jquery';
import { forEach } from 'lodash';

export function rankingTdm() {
  (async () => {
    // Load the data from the Drive Spreadsheet
    const playersTdm = await drive('1tcSgDUSxwrHQclfxdOKQDabZGQOAeb1E7GVTvitdfu4');

    const historyRankingTdmPlayers = await drive({
      sheet: '1tcSgDUSxwrHQclfxdOKQDabZGQOAeb1E7GVTvitdfu4',
      tab: '4',
    });

    const historyRankingTdm = await drive({
      sheet: '1tcSgDUSxwrHQclfxdOKQDabZGQOAeb1E7GVTvitdfu4',
      tab: '1',
    });

    // historyRankingTdmPlayers.reverse();
    // const ourPlayers = document.getElementById('our-players2');
    // ourPlayers.innerHTML = ` ${historyRankingTdm.length}`;

    const playersObj = await drive({
      sheet: '1w_WHqCutkp_S6KveKyu4mNaG76C5dIlDwKw-A-dEOLo',
      tab: 1,
    });

    function findPlayerCard(name) {
      let objPlayer = '';
      playersObj.forEach((el) => {
        objPlayer = el.username;
      });

      let tdmPlayer = '';
      historyRankingTdm.forEach((el) => {
        tdmPlayer = el.username;
      });

      if (objPlayer) {
        if (tdmPlayer === objPlayer) {
          name = tdmPlayer;
        }
      }

      return name;
    }

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

      destructObjFrags(historyRankingTdmPlayers, arrNameFrags);

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

      destructObjFrags(historyRankingTdmPlayers, arrNameFrags);

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

      destructObjRanks(historyRankingTdmPlayers, arrNameRanks);

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

    function searchPlayer(name) {
      const exampleArr = [];
      function searchPlayerKeyName(nameKey, myArray) {
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

      const resultObject = searchPlayerKeyName(name, historyRankingTdmPlayers);
      const warDates = [];
      resultObject.forEach((elem) => {
        warDates.push(elem.timestamp);
      });

      warDates.unshift(0);
      return warDates;
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

      const resultObject = searchPlayerKeyNameWar(name, historyRankingTdmPlayers);
      const warIDs = [];
      resultObject.forEach((elem) => {
        warIDs.push(elem.idwar);
      });
      const showIDwars = warIDs.join(', ');
      return showIDwars;
    }

    function fragsHistory(name) {
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

      destructObjRanks(historyRankingTdmPlayers, arrNameRanks);

      function getIndexesRanks(arr, val) {
        const indexes = [];
        let i = -1;
        while ((i = arr.indexOf(val, i + 1)) !== -1) {
          indexes.push(i + 3); // postELO
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
      nameRanksOut.unshift(0);

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

    function lenOfLongDecSubArr(arr, n) {
      let max = 1;
      let len = 1;
      for (let i = 1; i < n; i++) {
        if (arr[i] <= arr[i + 1]) {
          len++;
        } else {
          if (max < len) {
            max = len;
          }
        }
      }
      if (max < len) {
        max = len;
      }
      return max;
    }

    const lastWar = document.getElementById('lastWarTdm');

    function findPlayerLastWar(name) {
      const findeLastWar = historyRankingTdmPlayers.filter((item) => JSON.stringify(item).includes(name)).pop();
      let findLastTimeStamp = '';
      if (findeLastWar) {
        findLastTimeStamp = findeLastWar.timestamp;
      } else if (findeLastWar === 'undefined') {
        findLastTimeStamp = 'No match';
      } else {
        findLastTimeStamp = 'No match';
      }
      return findLastTimeStamp;
    }

    const userNameTimeStamp = playersTdm.map((entry) => entry.username);
    userNameTimeStamp.forEach((user) => {
      const userItemTimestamp = document.createElement('div');
      userItemTimestamp.classList.add('item');
      if (findPlayerLastWar(user)) {
        userItemTimestamp.innerHTML += findPlayerLastWar(user);
      } else {
        console.log('Can not find last timestamp war of: ' + user);
      }
      lastWar.appendChild(userItemTimestamp);
    });

    const playerName = document.getElementById('playerName-tdm');
    const nationality = document.getElementById('nationality-tdm');
    const place = document.getElementById('place-tdm');
    const ranking = document.getElementById('overall-tdm');
    const frags = document.getElementById('frags-tdm');
    const warCount = document.getElementById('warCount-tdm');
    const mainAppTdm = document.getElementById('app');

    const player = playersTdm.map((entry) => entry);
    player.forEach(function (name, index) {
      const playerItem = document.createElement('div');
      playerItem.classList.add('item' + index, 'item');
      const playerItemLink = document.createElement('a');
      playerItemLink.setAttribute('href', `#charts-tdm-${name.username}`);
      playerItemLink.setAttribute('title', `Watch ${name.playername} profile.`);
      playerItemLink.innerHTML += name.playername;
      playerItem.dataset.place = ++index;
      playerItem.appendChild(playerItemLink);
      playerName.appendChild(playerItem);
    });

    const playerCard = playersTdm.map((entry) => entry);
    playerCard.forEach(function (name, index) {
      const playerCardDiv = document.createElement('div');
      playerCardDiv.classList.add('container', 'view', 'hidden', 'card');
      playerCardDiv.setAttribute('id', `charts-tdm-${name.username}`);
      const playerCardWrapper = document.createElement('div');
      playerCardWrapper.classList.add('wrapper');
      playerCardDiv.appendChild(playerCardWrapper);
      playerCardWrapper.innerHTML += `<div class="frag-title"><span class="frag-name">${
        name.playername
      }</span> has played <span class="frag-name">${
        name.warcount
      }</span> TDM wars.</div><div><div class="frag-title">Check <a href="#charts-${findPlayerCard(
        name.username,
      )}"><span class="frag-name">${name.playername}</span></a> statistics in OBJ.</div>`;
      const inDeCont = document.createElement('div');
      inDeCont.classList.add('increaseDecrease');
      playerCardWrapper.appendChild(inDeCont);
      const inCont = document.createElement('div');
      inCont.classList.add('streak');
      inCont.setAttribute('id', `increase-tdm-${name.username}`);
      inDeCont.appendChild(inCont);
      const deCont = document.createElement('div');
      deCont.classList.add('streak');
      deCont.setAttribute('id', `decrease-tdm-${name.username}`);
      // deCont.innerHTML += `Clan History: ${name.clanhistory}`;
      inDeCont.appendChild(deCont);

      const clanHistoryCont = document.createElement('div');
      clanHistoryCont.classList.add('frag-item');
      clanHistoryCont.innerHTML += `Clan History: <span class="frag-value">${name.clanhistory}</span>`;
      deCont.appendChild(clanHistoryCont);

      const fragCont = document.createElement('div');
      fragCont.classList.add('streak', 'frag-cont', 'frag-cont-tdm');
      inDeCont.appendChild(fragCont);

      const fragContDiv = document.createElement('div');
      fragContDiv.classList.add('frag-sum');
      fragContDiv.innerHTML += `<div class="frag-item">Sum of Frags: <span class="frag-value">${sumOfFrags(name.username)}</span></div>
      <div class="frag-item">Highest ranking: <span class="frag-value">${Math.max(...rankHistory(name.username))}</span></div>
      <div class="frag-item">Current ranking: <span class="frag-value">${name.elotdm}</span></div>
      <div class="frag-item">Lowest ranking: <span class="frag-value">${Math.min(...rankHistory(name.username))}</span></div>`;
      fragCont.appendChild(fragContDiv);

      const fragAvarage = document.createElement('div');
      fragAvarage.classList.add('streak', 'frag-avarage');
      inDeCont.appendChild(fragAvarage);

      const fragAvarageDiv = document.createElement('div');
      fragAvarageDiv.classList.add('frag-avarage');
      fragAvarageDiv.innerHTML += `<div class="frag-item">Highest KD Ratio per war: <span class="frag-value frag-high">${Math.max(
        ...minMaxFrags(name.username),
      )}</span><img src="./assets/high.png"></div><div class="frag-item">Avarage KD Ratio per war: <span class="frag-value frag-avarage">${(
        sumOfFrags(name.username) / name.warcount
      ).toFixed(
        2,
      )}</span><img src="./assets/avarage.png"></div><div class="frag-item">Lowest KD Ratio per war: <span class="frag-value frag-low">${Math.min(
        ...minMaxFrags(name.username),
      )}</span><img src="./assets/low.png"></div><div class="frag-item">ID wars: <span class="frag-value">${searchPlayerWars(
        name.username,
      )}</span></div>`;
      fragAvarage.appendChild(fragAvarageDiv);

      const playerCardDivChart = document.createElement('canvas');
      playerCardDivChart.setAttribute('id', `chart-tdm-${name.username}`);
      playerCardWrapper.appendChild(playerCardDivChart);
      const playerCardFragsChart = document.createElement('canvas');
      playerCardFragsChart.setAttribute('id', `chart-frags-tdm-${name.username}`);
      playerCardWrapper.appendChild(playerCardFragsChart);

      mainAppTdm.appendChild(playerCardDiv);
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

    const places2 = playersTdm.map((entry) => entry);
    places2.forEach(function (placeObj, index) {
      const item = document.createElement('div');
      item.classList.add('item');
      item.innerHTML = ++index;
      place.appendChild(item);
    });

    const national = playersTdm.map((entry) => entry);
    national.forEach(function (nat) {
      const item = document.createElement('div');
      item.classList.add('item');
      switch (nat.nationality) {
        case 'EU': {
          nat.nationality = `<img src="/assets/flags/_e.gif" title="EU">`;
          break;
        }
        case 'PL': {
          nat.nationality = `<img src="/assets/flags/pl.gif" title="Poland">`;
          break;
        }
        case 'EG': {
          nat.nationality = `<img src="/assets/flags/EG.gif" title="Egypt">`;
          break;
        }
        case 'NL': {
          nat.nationality = `<img src="/assets/flags/nl.gif" title="Netherlands">`;
          break;
        }
        case 'RU': {
          nat.nationality = `<img src="/assets/flags/RU.gif" title="Russia">`;
          break;
        }
        case 'RO': {
          nat.nationality = `<img src="/assets/flags/ro.gif" title="Romania">`;
          break;
        }
        case 'FR': {
          nat.nationality = `<img src="/assets/flags/fr.gif" title="France">`;
          break;
        }
        case 'UK': {
          nat.nationality = `<img src="/assets/flags/uk.gif" title"United Kingdom">`;
          break;
        }
        case 'BE': {
          nat.nationality = `<img src="/assets/flags/be.gif" title="Belgium">`;
          break;
        }
        case 'GR': {
          nat.nationality = `<img src="/assets/flags/gr.gif" title="Greece">`;
          break;
        }
        case 'DE': {
          nat.nationality = `<img src="/assets/flags/de.gif" title="Germany">`;
          break;
        }
        case 'ES': {
          nat.nationality = `<img src="/assets/flags/es.gif" title="Spain">`;
          break;
        }
        case 'PT': {
          nat.nationality = `<img src="/assets/flags/pt.gif" title="Portugal">`;
          break;
        }
        default:
          console.log('Nie pasuje');
      }
      item.innerHTML += nat.nationality;
      nationality.appendChild(item);
    });

    const rankings = playersTdm.map((entry) => entry);
    rankings.forEach(function (elorank) {
      const eloItem = document.createElement('div');
      eloItem.classList.add('item');
      eloItem.innerHTML += elorank.elotdm;
      ranking.appendChild(eloItem);
    });

    const showFrags = playersTdm.map((entry) => entry);
    showFrags.forEach(function (frag) {
      const fragItem = document.createElement('div');
      fragItem.classList.add('item');
      fragItem.innerHTML += sumOfFrags(frag.username);
      frags.appendChild(fragItem);
    });

    const wars = playersTdm.map((entry) => entry.warcount);
    wars.forEach(function (matches) {
      const warItem = document.createElement('div');
      warItem.classList.add('item');
      warItem.innerHTML += matches;
      warCount.appendChild(warItem);
    });

    const increase = document.querySelector('.increaseStreak');
    const decrease = document.querySelector('.decreaseStreak');

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

    historyRankingTdm.forEach((userNameInStreak) => {
      const increaseDiv = document.getElementById(`increase-tdm-${userNameInStreak.username}`);
      const playerInStreak = lenOfLongIncSubArr(rankHistory(userNameInStreak.username), rankHistory(userNameInStreak.username).length);
      // console.log('PLAYER STREAK: ', playerInStreak);
      increaseDiv.innerHTML += `<div class="frag-item">Longest increase streak: <span class="frag-value">${playerInStreak}</span><i class="fas fa-arrow-up"></i></div>`;
    });

    historyRankingTdm.forEach((nameUser) => {
      const ctx = document.getElementById(`chart-tdm-${nameUser.username}`).getContext('2d');
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
    historyRankingTdm.forEach((nameUser) => {
      const ctx = document.getElementById(`chart-frags-tdm-${nameUser.username}`).getContext('2d');
      const someArr = ['a', 'b', 'c', 'd', 'e', ''];
      const chart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: searchPlayer(nameUser.username),
          datasets: [
            {
              label: 'Frags',
              id: 'frags',
              borderColor: 'green',
              backgroundColor: 'lightgreen',
              data: fragsHistory(nameUser.username),
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
                value: sumOfFrags(nameUser.username) / nameUser.warcount,
                borderColor: 'red',
                borderDash: [10, 5],
                label: {
                  backgroundColor: 'rgba(207, 0, 15, 0.5)',
                  content: sumOfFrags(nameUser.username) / nameUser.warcount + ' Avg.',
                  enabled: true,
                },
              },
            ],
          },
        },
      });
    });
  })();
}
