import { Chart } from 'chart.js';
import { annotations } from 'chartjs-plugin-annotation';
import drive from 'drive-db';
import _ from 'lodash';

import { rankingInfo } from './ranking';

export function chartsSite() {
  (async () => {
    // Load the data from the Drive Spreadsheet
    const db = await drive('1w_WHqCutkp_S6KveKyu4mNaG76C5dIlDwKw-A-dEOLo');

    const historyRanking = await drive({
      sheet: '1w_WHqCutkp_S6KveKyu4mNaG76C5dIlDwKw-A-dEOLo',
      tab: '4',
    });

    const listPlayers = await drive({
      sheet: '1w_WHqCutkp_S6KveKyu4mNaG76C5dIlDwKw-A-dEOLo',
      tab: '1',
    });

    // console.log(listPlayers);

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
    const arrJimPos = [];
    // const arrZielonyPos = [];

    // for (const key in myArrOfObjects) {
    //   if (myArrOfObjects.hasOwnProperty(key)) {
    //     // console.log(key + ' -> ' + JSON.stringify(myArrOfObjects[key]));
    //     const objInArr = myArrOfObjects[key];
    //     for (const key2 in objInArr) {
    //       if (objInArr.hasOwnProperty(key2)) {
    //         //  console.log(key2 + ' -> ' + JSON.stringify(objInArr[key2]));
    //         const elemOfObj = objInArr[key2];
    //         // console.log(elemOfObj);
    //         arrTomPos.push(elemOfObj);
    //       }
    //     }
    //   }
    // }

    function destructObj(obj, arr) {
      for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
          // console.log(key + ' -> ' + JSON.stringify(myArrOfObjects[key]));
          const objInArr = obj[key];
          for (const key2 in objInArr) {
            if (objInArr.hasOwnProperty(key2)) {
              //  console.log(key2 + ' -> ' + JSON.stringify(objInArr[key2]));
              const elemOfObj = objInArr[key2];
              // console.log(elemOfObj);
              arr.push(elemOfObj);
            }
          }
        }
      }
    }

    destructObj(historyRanking, arrJimPos);
    // destructObj(historyRanking, arrZielonyPos);
    // console.log('BELUŚ', arrBelusPos);

    function getAllIndexes(arr, val) {
      const indexes = [];
      let i = -1;
      while ((i = arr.indexOf(val, i + 1)) !== -1) {
        indexes.push(i + 4); // postELO
      }
      return indexes;
    }

    // const indexes = getAllIndexes(arrTomPos, 'Tom');
    // console.log('INDEXES', indexes);

    const indexesJim = getAllIndexes(arrJimPos, 'jim');
    const jimStreakArr = [];
    // console.log('INDEXES Jim', indexesJim);

    // const indexesZielony = getAllIndexes(arrZielonyPos, 'zielony');
    // const zielonyStreakArr = [];

    // const tomStreakArr = [];
    // if (arrTomPos.includes('Tom')) {
    //   arrTomPos.forEach(function (el, index) {
    //     index += 1;
    //     // console.log('INDEX: ' + index + ' EL: ' + el);
    //     // console.log('INDEXES FROM FOREACH ');
    //     indexes.forEach(function (founded, i) {
    //       // console.log('FOUNDED: ' + founded + ' INDEX -> ' + i);
    //       if (Number(index) === Number(founded)) {
    //         // console.log('EL!!! -> ' + el);
    //         const tomStreak = Number(el);
    //         tomStreakArr.push(tomStreak);
    //       }
    //     });
    //   });
    // }

    function findAllStrikes(playerName, ind, arrIn, arrOut) {
      if (arrIn.includes(playerName)) {
        arrIn.forEach(function (el, index) {
          index += 1;
          // console.log('INDEX: ' + index + ' EL: ' + el);
          // console.log('INDEXES FROM FOREACH ');
          ind.forEach(function (founded, i) {
            // console.log('FOUNDED: ' + founded + ' INDEX -> ' + i);
            if (Number(index) === Number(founded)) {
              // console.log('EL!!! -> ' + el);
              const foundedStreak = Number(el);
              arrOut.push(foundedStreak);
            }
          });
        });
      }
    }

    findAllStrikes('jim', indexesJim, arrJimPos, jimStreakArr);
    // findAllStrikes('zielony', indexesZielony, arrZielonyPos, zielonyStreakArr);

    // tomStreakArr.unshift(1000);
    jimStreakArr.push(1000);
    // zielonyStreakArr.push(1000);

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

    // const reverseTomsArr = tomStreakArr.reverse();
    const reverseJimArr = jimStreakArr.reverse();
    const countJimWars = [];
    const countZielonyWars = [];

    for (let i = 0; i < reverseJimArr.length; i++) {
      countJimWars.push(i);
    }

    // for (let i = 0; i < zielonyStreakArr.length; i++) {
    //   countZielonyWars.push(i);
    // }

    // console.log('COUNT JIM WARS: ', countJimWars);

    // function drawCtx(countUserWars, userStreakArr) {
    // const playerCtx = listPlayers.map((entry) => entry);
    // playerCtx.forEach(function (name, index) {

    // });
    // }
    // zielonyStreakArr.reverse();
    // drawCtx(countZielonyWars, zielonyStreakArr);

    // const ctx = document.getElementById('myChart').getContext('2d');
    // const chart = new Chart(ctx, {
    //   // The type of chart we want to create
    //   type: 'line',

    //   // The data for our dataset
    //   data: {
    //     labels: countZielonyWars,
    //     datasets: [
    //       {
    //         label: 'Jim',
    //         // backgroundColor: 'rgb(255, 99, 132)',
    //         borderColor: '#ffffc0',
    //         data: reverseJimArr,
    //         lineTension: 0,
    //       },
    //       {
    //         label: 'Zielony',
    //         borderColor: 'green',
    //         data: zielonyStreakArr.reverse(),
    //         lineTension: 0,
    //       },
    //     ],
    //   },

    //   // Configuration options go here
    //   options: {
    //     elements: {
    //       line: {
    //         tension: 0,
    //       },
    //     },
    //     scales: {
    //       xAxes: [
    //         {
    //           scaleLabel: {
    //             display: true,
    //             labelString: 'LICZBA WOJEN',
    //           },
    //         },
    //       ],
    //       yAxes: [
    //         {
    //           scaleLabel: {
    //             display: true,
    //             labelString: 'RANKING',
    //           },
    //         },
    //       ],
    //     },
    //     annotation: {
    //       drawTime: 'afterDatasetsDraw',
    //       annotations: [
    //         {
    //           id: 'hline1',
    //           type: 'line',
    //           mode: 'horizontal',
    //           scaleID: 'y-axis-0',
    //           value: 950,
    //           borderColor: 'red',
    //           borderDash: [10, 5],
    //           label: {
    //             backgroundColor: 'red',
    //             content: '950',
    //             enabled: true,
    //           },
    //         },
    //         {
    //           id: 'hline3',
    //           type: 'line',
    //           mode: 'horizontal',
    //           scaleID: 'y-axis-0',
    //           value: 1000,
    //           borderColor: 'red',
    //           borderWidth: 3,
    //           // borderDash: [10, 5],
    //           label: {
    //             backgroundColor: 'red',
    //             content: '1000',
    //             enabled: true,
    //           },
    //         },
    //         {
    //           id: 'hline2',
    //           type: 'line',
    //           mode: 'horizontal',
    //           scaleID: 'y-axis-0',
    //           value: 1050,
    //           borderColor: 'red',
    //           borderDash: [10, 5],
    //           label: {
    //             backgroundColor: 'red',
    //             content: '1050',
    //             enabled: true,
    //           },
    //         },
    //         {
    //           id: 'hline4',
    //           type: 'line',
    //           mode: 'horizontal',
    //           scaleID: 'y-axis-0',
    //           value: 1100,
    //           borderColor: 'orange',
    //           borderDash: [10, 5],
    //           label: {
    //             backgroundColor: 'orange',
    //             content: '1100',
    //             enabled: true,
    //           },
    //         },
    //         {
    //           id: 'hline5',
    //           type: 'line',
    //           mode: 'horizontal',
    //           scaleID: 'y-axis-0',
    //           value: 1150,
    //           borderColor: 'lightgreen',
    //           borderDash: [10, 5],
    //           label: {
    //             backgroundColor: 'green',
    //             content: '1150',
    //             enabled: true,
    //           },
    //         },
    //       ],
    //     },
    //   },
    // });
  })();
}
