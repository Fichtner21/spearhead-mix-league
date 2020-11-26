import drive from 'drive-db';

export function rankingInfo() {
  (async () => {
    // Load the data from the Drive Spreadsheet
    const db = await drive('1w_WHqCutkp_S6KveKyu4mNaG76C5dIlDwKw-A-dEOLo');

    const historyRanking = await drive({
      sheet: '1w_WHqCutkp_S6KveKyu4mNaG76C5dIlDwKw-A-dEOLo',
      tab: '4',
    });

    const myArrOfObjcts = [
      { time: 4444, a: 'Tom', b: 'Ann', c: 'John' },
      { time: 1111, a: 'Josh', b: 'Ann', c: 'Tom' },
      { time: 1000, a: 'Ann', b: 'Luc', c: 'Tom' },
      { time: 8888, a: 'Brain', b: 'Tom', c: 'Ann' },
    ];

    const findTom2 = myArrOfObjcts.filter((item) => JSON.stringify(item).includes('Tom')).pop();
    // console.log(findTom2);

    const players = db.slice(0, 23); // pobranie pierwszych 23 graczy, do poprawy
    // console.log(db);
    // console.log(players);
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
