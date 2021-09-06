export async function newRanking() {
  async function getPlayers(name) {
    const sheets_url_players = `https://sheets.googleapis.com/v4/spreadsheets/1w_WHqCutkp_S6KveKyu4mNaG76C5dIlDwKw-A-dEOLo/values/${name}!B1:E7?key=AIzaSyD6eJ4T-ztIfyFn-h2oDAGTnNNYhNRziLU`;
    const res = await fetch(sheets_url_players);
    const json = await res.json();
    return json;
  }

  async function getPlayers2(name) {
    const sheets_url_players = `https://sheets.googleapis.com/v4/spreadsheets/1w_WHqCutkp_S6KveKyu4mNaG76C5dIlDwKw-A-dEOLo/values/${name}?key=AIzaSyD6eJ4T-ztIfyFn-h2oDAGTnNNYhNRziLU`;
    const res = await fetch(sheets_url_players);
    const json = await res.json();
    return json;
  }

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

  const playersTab = await getPlayers2('Players');

  const newPlayersList = await getPlayers('TeamSelectionOne');

  const batchRowValues = newPlayersList.values;

  const team1ID1toShow = document.getElementById('team1ID1');
  const team1ID2toShow = document.getElementById('team1ID2');
  const team2ID1toShow = document.getElementById('team2ID1');
  const team2ID2toShow = document.getElementById('team2ID2');

  const cumulativeTeam1ID1 = Number(parseFloat(batchRowValues[6][1]).toFixed(2));
  const cumulativeTeam2ID1 = Number(parseFloat(batchRowValues[6][3]).toFixed(2));

  const cumulativeDivTeam1ID1 = document.getElementById('cumulativeTeam1ID1');
  const cumulativeDivTeam2ID1 = document.getElementById('cumulativeTeam2ID1');

  const chanceT1ID1 = document.getElementById('chanceT1ID1');
  const chanceT2ID1 = document.getElementById('chanceT2ID1');

  cumulativeDivTeam1ID1.innerHTML = 'Cumulative: ' + cumulativeTeam1ID1;
  cumulativeDivTeam2ID1.innerHTML = 'Cumulative: ' + cumulativeTeam2ID1;

  const chanceOfWinTeam2ID1 = 1 / (1 + 10 ** ((cumulativeTeam1ID1 - cumulativeTeam2ID1) / 400));
  const chanceOfWinTeam1ID1 = 1 / (1 + 10 ** ((cumulativeTeam2ID1 - cumulativeTeam1ID1) / 400));

  const chanceT1ID1a = Number(parseFloat(chanceOfWinTeam1ID1 * 100));
  const chanceT2ID1a = Number(parseFloat(chanceOfWinTeam2ID1 * 100));

  const chanceT1Id1toShow = floorPrecised(chanceT1ID1a, 2) + ' %';
  const chanceT2Id1toShow = Math.round((chanceT2ID1a + Number.EPSILON) * 100) / 100 + ' %';

  chanceT1ID1.innerHTML = chanceT1Id1toShow;
  chanceT2ID1.innerHTML = chanceT2Id1toShow;

  if (chanceT1Id1toShow > chanceT2Id1toShow) {
    chanceT1ID1.classList.add('chance-win');
    chanceT2ID1.classList.add('chance-lose');
  } else if (chanceT1Id1toShow < chanceT2Id1toShow) {
    chanceT2ID1.classList.add('chance-win');
    chanceT1ID1.classList.add('chance-lose');
  }

  function floorPrecised(number, precision) {
    const power = Math.pow(10, precision);
    return Math.floor(number * power) / power;
  }

  const rows = [];
  for (let i = 1; i < batchRowValues.length; i++) {
    const rowObject = {};
    for (let j = 0; j < batchRowValues[i].length; j++) {
      rowObject[batchRowValues[0][j]] = batchRowValues[i][j];
    }
    rows.push(rowObject);
  }
  // console.log('rows => ', rows);

  const playerValues2 = playersTab.values;
  const rowsPlayers2 = [];
  for (let i = 1; i < playerValues2.length; i++) {
    const rowObject2 = {};
    for (let j = 0; j < playerValues2[i].length; j++) {
      rowObject2[playerValues2[0][j]] = playerValues2[i][j];
    }
    rowsPlayers2.push(rowObject2);
  }
  // console.log('rowsPlayers => ', rowsPlayers2);

  let team1ID1 = '';
  for (let i = 1; i < 6; i++) {
    team1ID1 += `
    <div class="player">
      <div class="preelo">${batchRowValues[i][1]}</div>
      <div class="name">${addPlayerLinkHome2(batchRowValues[i][0], rowsPlayers2)}</div>
      <div class="score">${addPlayerPos2(batchRowValues[i][0], rowsPlayers2)}</div>
      <div class="postelo"></div>
    </div>`;
  }

  let team2ID1 = '';
  for (let i = 1; i < 6; i++) {
    team2ID1 += `
      <div class="player">
        <div class="preelo">${batchRowValues[i][3]}</div>
        <div class="name">${addPlayerLinkHome2(batchRowValues[i][2], rowsPlayers2)}</div>
        <div class="score">${addPlayerPos2(batchRowValues[i][2], rowsPlayers2)}</div>
        <div class="postelo"></div>
      </div>`;
  }

  team1ID1toShow.innerHTML = team1ID1;
  team2ID1toShow.innerHTML = team2ID1;
}
