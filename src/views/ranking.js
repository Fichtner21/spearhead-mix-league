import drive from 'drive-db';
import _ from 'lodash';
import { Chart } from 'chart.js';
import $ from 'jquery';

export function rankingInfo() {
  (async () => {
    // Load the data from the Drive Spreadsheet
    const db = await drive('1w_WHqCutkp_S6KveKyu4mNaG76C5dIlDwKw-A-dEOLo');

    const historyRanking = await drive({
      sheet: '1w_WHqCutkp_S6KveKyu4mNaG76C5dIlDwKw-A-dEOLo',
      tab: '4',
    });

    const historyRanking2 = await drive({
      sheet: '1w_WHqCutkp_S6KveKyu4mNaG76C5dIlDwKw-A-dEOLo',
      tab: '1',
    });

    const ourPlayers = document.getElementById('our-players');
    ourPlayers.innerHTML += `<span>Active users</span><i class="fas fa-users"></i> ${historyRanking2.length}`;

    const myArrOfObjects = [
      {
        time: 1111,
        t1p1name: 'Tom',
        t1p1pre: '1000',
        t1p1score: '10',
        t1p1post: '990',
        t1p2name: 'Luis',
        t1p2pre: '1000',
        t1p2score: '12',
        t1p2post: '992',
        t2p1name: 'John',
        t2p1pre: '1000',
        t2p1score: '10',
        t2p1post: '1010',
        t2p2name: 'David',
        t2p2pre: '1000',
        t2p2score: '15',
        t2p2post: '1012',
        t1roundswon: '9',
        t2roundswon: '10',
      },
      {
        time: 2222,
        t1p1name: 'Tom',
        t1p1pre: '990',
        t1p1score: '1',
        t1p1post: '994',
        t1p2name: 'Alan',
        t1p2pre: '1052',
        t1p2score: '12',
        t1p2post: '1069',
        t2p1name: 'Ann',
        t2p1pre: '1000',
        t2p1score: '42',
        t2p1post: '1045',
        t2p2name: 'John',
        t2p2pre: '1010',
        t2p2score: '15',
        t2p2post: '1029',
        t1roundswon: '9',
        t2roundswon: '25',
      },
      {
        time: 3333,
        t1p1name: 'John',
        t1p1pre: '1029',
        t1p1score: '34',
        t1p1post: '1054',
        t1p2name: 'Ann',
        t1p2pre: '1045',
        t1p2score: '23',
        t1p2post: '1059',
        t2p1name: 'David',
        t2p1pre: '1012',
        t2p1score: '10',
        t2p1post: '1001',
        t2p2name: 'Tom',
        t2p2pre: '974',
        t2p2score: '5',
        t2p2post: '945',
        t1roundswon: '19',
        t2roundswon: '10',
      },
      {
        time: 4444,
        t1p1name: 'John',
        t1p1pre: '1029',
        t1p1score: '34',
        t1p1post: '1054',
        t1p2name: 'Ann',
        t1p2pre: '1045',
        t1p2score: '23',
        t1p2post: '1059',
        t2p1name: 'Tom',
        t2p1pre: '980',
        t2p1score: '10',
        t2p1post: '940',
        t2p2name: 'David',
        t2p2pre: '974',
        t2p2score: '5',
        t2p2post: '960',
        t1roundswon: '19',
        t2roundswon: '10',
      },
    ];
    const arrTomPos = [];
    const arrBelusPos = [];
    const arrZielonyPos = [];
    const arrZielonyFrags = [];
    const arrBatonFrags = [];
    const arrJimFrags = [];

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

      destructObjFrags(historyRanking, arrNameFrags);

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

      return nameFragsOut.reduce((a, b) => a + b);
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

      destructObjFrags(historyRanking, arrNameFrags);

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

    console.log('HWK', rankHistory('hwk'));
    // console.log('============>', sumOfFrags('illusion'));
    // console.log('============>', Math.min(...minMaxFrags('illusion')));
    // console.log('============>', Math.max(...minMaxFrags('illusion')));

    // tomStreakArr.reverse();
    // console.log('toms STREAK: ', tomStreakArr);
    // const subarrUp = [];
    // for (let i = 0; i < tomStreakArr.length && tomStreakArr[i + 1] > tomStreakArr[i]; i++) {
    //   subarrUp.push(tomStreakArr[i]);
    // }
    // console.log('subarrUp: ', subarrUp);

    // const subarrDown = [];
    // for (let i = 0; i < tomStreakArr.length && tomStreakArr[i + 1] < tomStreakArr[i]; i++) {
    //   subarrDown.push(tomStreakArr[i]);
    // }

    // console.log('subarrDown: ', subarrDown);

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

    for (let i = 1; i <= 2; i++) {
      for (let j = 1; j <= 2; j++) {
        // console.log(`t${j}p${i}name`);
        const tomPos = _.filter(myArrOfObjects, [`t${j}p${i}name`, 'Tom']);
        // console.log(tomPos);
        // console.log(_.find(myArrOfObjects, [`t${j}p${i}name`, 'Tom']));
        // arrTomPos.push(tomPos);
        // if (tomPos === true) {
        //   console.log(_.filter(myArrOfObjects, [`t${j}p${i}post`]));
        // }
      }
    }

    // const players = db.slice(0, 23); // pobranie pierwszych 23 graczy, do poprawy
    const players = db;

    const lastWar = document.getElementById('lastWar');

    const findBaton = historyRanking.filter((item) => JSON.stringify(item).includes('baton')).pop();
    const findZielony = historyRanking.filter((item) => JSON.stringify(item).includes('zielony')).pop();
    const findIllusion = historyRanking.filter((item) => JSON.stringify(item).includes('illusion')).pop();
    const findBelus = historyRanking.filter((item) => JSON.stringify(item).includes('belus')).pop();
    const findJosh = historyRanking.filter((item) => JSON.stringify(item).includes('josh')).pop();
    const findOprawca = historyRanking.filter((item) => JSON.stringify(item).includes('oprawca')).pop();
    const findWiggles = historyRanking.filter((item) => JSON.stringify(item).includes('wiggles')).pop();
    const findInsane = historyRanking.filter((item) => JSON.stringify(item).includes('dziadek')).pop();
    const findDts = historyRanking.filter((item) => JSON.stringify(item).includes('dts')).pop();
    const findUltra = historyRanking.filter((item) => JSON.stringify(item).includes('ultrakiller')).pop();
    const findMoses = historyRanking.filter((item) => JSON.stringify(item).includes('moses')).pop();
    const findJim = historyRanking.filter((item) => JSON.stringify(item).includes('jim')).pop();
    const findLechu = historyRanking.filter((item) => JSON.stringify(item).includes('lechu')).pop();
    const findZielak = historyRanking.filter((item) => JSON.stringify(item).includes('zielak')).pop();
    const findKapsel = historyRanking.filter((item) => JSON.stringify(item).includes('kapsel')).pop();
    const findAker = historyRanking.filter((item) => JSON.stringify(item).includes('aker')).pop();
    const findHwk = historyRanking.filter((item) => JSON.stringify(item).includes('hwk')).pop();
    const findGrabarz = historyRanking.filter((item) => JSON.stringify(item).includes('grabarz')).pop();
    const findTomas = historyRanking.filter((item) => JSON.stringify(item).includes('tomas')).pop();
    const findYourProblem = historyRanking.filter((item) => JSON.stringify(item).includes('your-problem')).pop();
    const findRyba = historyRanking.filter((item) => JSON.stringify(item).includes('ryba')).pop();
    const findKaps = historyRanking.filter((item) => JSON.stringify(item).includes('k4ps')).pop();
    const findCwieku = historyRanking.filter((item) => JSON.stringify(item).includes('cwieku')).pop();

    const username = players.map((entry) => entry.username);
    username.forEach(function (user) {
      const userItem = document.createElement('div');
      userItem.classList.add('item');
      if (user === 'baton') {
        userItem.innerHTML += findBaton.timestamp;
      } else if (user === 'zielony') {
        userItem.innerHTML += findZielony.timestamp;
      } else if (user === 'illusion') {
        userItem.innerHTML += findIllusion.timestamp;
      } else if (user === 'belus') {
        userItem.innerHTML += findBelus.timestamp;
      } else if (user === 'josh') {
        userItem.innerHTML += findJosh.timestamp;
      } else if (user === 'oprawca') {
        userItem.innerHTML += findOprawca.timestamp;
      } else if (user === 'wiggles') {
        userItem.innerHTML += findWiggles.timestamp;
      } else if (user === 'dziadek') {
        userItem.innerHTML += findInsane.timestamp;
      } else if (user === 'dts') {
        userItem.innerHTML += findDts.timestamp;
      } else if (user === 'ultrakiller') {
        userItem.innerHTML += findUltra.timestamp;
      } else if (user === 'moses') {
        userItem.innerHTML += findMoses.timestamp;
      } else if (user === 'jim') {
        userItem.innerHTML += findJim.timestamp;
      } else if (user === 'lechu') {
        userItem.innerHTML += findLechu.timestamp;
      } else if (user === 'zielak') {
        userItem.innerHTML += findZielak.timestamp;
      } else if (user === 'kapsel') {
        userItem.innerHTML += findKapsel.timestamp;
      } else if (user === 'aker') {
        userItem.innerHTML += findAker.timestamp;
      } else if (user === 'hwk') {
        userItem.innerHTML += findHwk.timestamp;
      } else if (user === 'grabarz') {
        userItem.innerHTML += findGrabarz.timestamp;
      } else if (user === 'tomas') {
        userItem.innerHTML += findTomas.timestamp;
      } else if (user === 'your-problem') {
        userItem.innerHTML += findYourProblem.timestamp;
      } else if (user === 'ryba') {
        userItem.innerHTML += findRyba.timestamp;
      } else if (user === 'k4ps') {
        userItem.innerHTML += findKaps.timestamp;
      } else if (user === 'cwieku') {
        userItem.innerHTML += findCwieku.timestamp;
      } else {
        userItem.innerHTML += 'Unknown date';
      }
      // userItem.innerHTML += `${user}`;
      lastWar.appendChild(userItem);
    });

    const playerName = document.getElementById('playerName');
    const place = document.getElementById('place');
    const ranking = document.getElementById('overall');
    const frags = document.getElementById('frags');
    const warCount = document.getElementById('warCount');
    const mainApp = document.getElementById('app');

    const player = players.map((entry) => entry);
    player.forEach(function (name, index) {
      const playerItem = document.createElement('div');
      playerItem.classList.add('item' + index, 'item');
      const playerItemLink = document.createElement('a');
      playerItemLink.setAttribute('href', `#charts-${name.username}`);
      playerItemLink.setAttribute('title', `Watch ${name.playername} profile.`);
      playerItemLink.innerHTML += name.playername;
      playerItem.appendChild(playerItemLink);
      playerName.appendChild(playerItem);
    });

    // let valueCard = '';
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
      inCont.classList.add('streak', 'increaseStreak');
      inDeCont.appendChild(inCont);
      const deCont = document.createElement('div');
      deCont.classList.add('streak', 'decreaseStreak');
      inDeCont.appendChild(deCont);

      const fragCont = document.createElement('div');
      fragCont.classList.add('streak', 'frag-cont');
      inDeCont.appendChild(fragCont);

      const fragContDiv = document.createElement('div');
      fragContDiv.classList.add('frag-sum');
      fragContDiv.innerHTML += `<div class="frag-item">Sum of Frags: <span class="frag-value">${sumOfFrags(name.username)}</span></div>`;
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
      )}</span><img src="./assets/low.png"></div>`;
      fragAvarage.appendChild(fragAvarageDiv);

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

    const places = players.map((entry) => entry.place);
    const places2 = players.map((entry) => entry);
    // console.log(places2);
    places2.forEach(function (placeObj, index) {
      const item = document.createElement('div');
      item.classList.add('item');
      item.innerHTML += ++index;
      place.appendChild(item);
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

    // function findBatonPlace(object, value) {
    //   return Object.keys(object).find((key) => object[key] === value);
    // }

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

    console.log('COUNT WARS', countWars('hwk'));

    historyRanking2.forEach((nameUser) => {
      // console.log('USERNAME', nameUser.username);
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
                  labelString: 'LICZBA WOJEN',
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
