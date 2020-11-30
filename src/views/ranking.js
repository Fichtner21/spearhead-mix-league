import drive from 'drive-db';
import _ from 'lodash';

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

    console.log(historyRanking2);

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
        t1p1post: '974',
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
        t2p2post: '960',
        t1roundswon: '19',
        t2roundswon: '10',
      },
    ];
    const arrTomPos = [];
    // console.log(myArrOfObjects);

    for (const key in myArrOfObjects) {
      if (myArrOfObjects.hasOwnProperty(key)) {
        // console.log(key + ' -> ' + JSON.stringify(myArrOfObjects[key]));
        const objInArr = myArrOfObjects[key];
        for (const key2 in objInArr) {
          if (objInArr.hasOwnProperty(key2)) {
            //  console.log(key2 + ' -> ' + JSON.stringify(objInArr[key2]));
            const elemOfObj = objInArr[key2];
            // console.log(elemOfObj);
            arrTomPos.push(elemOfObj);
          }
        }
      }
    }
    // console.log(arrTomPos);
    // console.log('INCLUDES', arrTomPos.includes('Tom'));

    function getAllIndexes(arr, val) {
      const indexes = [];
      let i = -1;
      while ((i = arr.indexOf(val, i + 1)) !== -1) {
        indexes.push(i + 4); // postELO
      }
      return indexes;
    }

    const indexes = getAllIndexes(arrTomPos, 'Tom');
    console.log('INDEXES', indexes);
    const tomStreakArr = [];
    if (arrTomPos.includes('Tom')) {
      // const newArry = arrTomPos.slice(arrTomPos.indexOf('Tom'), 5);
      // console.log('newArry', newArry);
      // console.log('newArryPop', newArry.pop());
      arrTomPos.forEach(function (el, index) {
        index += 1;
        console.log('INDEX: ' + index + ' EL: ' + el);
        console.log('INDEXES FROM FOREACH ');
        indexes.forEach(function (founded, i) {
          console.log('FOUNDED: ' + founded + ' INDEX -> ' + i);
          if (Number(index) === Number(founded)) {
            console.log('EL!!! -> ' + el);
            const tomStreak = Number(el);
            tomStreakArr.push(tomStreak);
          }
        });
      });
    }

    console.log('STREAK ARR', tomStreakArr);

    console.log('================');
    for (let i = 1; i <= 2; i++) {
      for (let j = 1; j <= 2; j++) {
        console.log(`t${j}p${i}name`);
        const tomPos = _.filter(myArrOfObjects, [`t${j}p${i}name`, 'Tom']);
        // console.log(tomPos);
        // console.log(_.find(myArrOfObjects, [`t${j}p${i}name`, 'Tom']));
        // arrTomPos.push(tomPos);
        // if (tomPos === true) {
        //   console.log(_.filter(myArrOfObjects, [`t${j}p${i}post`]));
        // }
      }
    }
    console.log('================');
    // console.log('arrTomPos ', arrTomPos);
    console.log('================');

    const findTom2 = myArrOfObjects.filter((item) => JSON.stringify(item).includes('Tom')).pop(); // ostatnie wystąpienie Toma
    // console.log(findTom2);

    const players = db.slice(0, 23); // pobranie pierwszych 23 graczy, do poprawy

    const lastWar = document.getElementById('lastWar');

    // console.log(historyRanking.filter((item) => JSON.stringify(item).includes('josh')).pop());
    const aaa = historyRanking.filter((item) => item);
    aaa.forEach(function (el) {
      // console.log(el);
    });

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
    const findYourProblem = historyRanking.filter((item) => JSON.stringify(item).includes('your problem')).pop();
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
      } else if (user === 'your problem') {
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
    const warCount = document.getElementById('warCount');

    const player = players.map((entry) => entry.playername);
    player.forEach(function (name, index) {
      const playerItem = document.createElement('div');
      playerItem.classList.add('item' + index, 'item');
      playerItem.innerHTML += name;
      playerName.appendChild(playerItem);
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

    // places.forEach(function (placeNumber) {
    //   const item = document.createElement('div');
    //   item.classList.add('item');
    //   item.innerHTML += placeNumber;
    //   place.appendChild(item);
    // });

    const rankings = players.map((entry) => entry.ranking);
    rankings.forEach(function (elorank) {
      const eloItem = document.createElement('div');
      eloItem.classList.add('item');
      eloItem.innerHTML += elorank;
      ranking.appendChild(eloItem);
    });

    const wars = players.map((entry) => entry.warcount);
    wars.forEach(function (matches) {
      const warItem = document.createElement('div');
      warItem.classList.add('item');
      warItem.innerHTML += matches;
      warCount.appendChild(warItem);
    });

    // console.log(findBaton.timestamp);
    // console.log(findBaton);
    function findBatonPlace(object, value) {
      return Object.keys(object).find((key) => object[key] === value);
    }
    // console.log(findBatonPlace(findBaton, 'baton'));
    // const placeBaton = findBatonPlace(findBaton, 'baton');
    // console.log(placeBaton);
    // const batonLastWarDate = 'baton.' + placeBaton;
    // console.log(batonLastWarDate);
  })();
}
