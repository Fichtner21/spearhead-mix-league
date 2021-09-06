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

  console.log('playersTab', playersTab.values);

  const newPlayersList = await getPlayers('TeamSelectionOne');
  console.log('TeamSelectionOne', newPlayersList);

  const batchRowValues = newPlayersList.values;

  console.log('team 1: ', batchRowValues[1][0] + ' - ' + batchRowValues[1][1]);
  console.log('team 1: ', batchRowValues[2][0] + ' - ' + batchRowValues[2][1]);
  console.log('team 1: ', batchRowValues[3][0] + ' - ' + batchRowValues[3][1]);
  console.log('team 1: ', batchRowValues[4][0] + ' - ' + batchRowValues[4][1]);
  console.log('team 1: ', batchRowValues[5][0] + ' - ' + batchRowValues[5][1]);
  console.log('team 1: ', batchRowValues[6][0] + ' - ' + batchRowValues[6][1]);

  console.log('team 2: ', batchRowValues[1][2] + ' - ' + batchRowValues[1][3]);
  console.log('team 2: ', batchRowValues[2][2] + ' - ' + batchRowValues[2][3]);
  console.log('team 2: ', batchRowValues[3][2] + ' - ' + batchRowValues[3][3]);
  console.log('team 2: ', batchRowValues[4][2] + ' - ' + batchRowValues[4][3]);
  console.log('team 2: ', batchRowValues[5][2] + ' - ' + batchRowValues[5][3]);
  console.log('team 2: ', batchRowValues[6][2] + ' - ' + batchRowValues[6][3]);

  // for (let i = 0; i < 7; i++) {
  //   for (let j = 0; j < 2; j++) {
  //     console.log('bactchRowValues[j][j]', batchRowValues[j][i]);
  //     // console.log('BATCH =>', batchRowValues[i][j]);
  //     // console.log('LAST =>', batchRowValues[i][j].length - 1);
  //   }
  // }
  const team1ID1toShow = document.getElementById('team1ID1');
  const team1ID2toShow = document.getElementById('team1ID2');
  const team2ID1toShow = document.getElementById('team2ID1');
  const team2ID2toShow = document.getElementById('team2ID2');

  for (let i = 1; i < 6; i++) {
    console.log('team1' + batchRowValues[i][0] + ' rank: ' + batchRowValues[i][1]);
  }

  const cumulativeTeam1ID1 = batchRowValues[6][1];
  const cumulativeTeam2ID1 = batchRowValues[6][3];
  console.log('cumulative t1id1:', cumulativeTeam1ID1);
  console.log('cumulative t2id1:', cumulativeTeam2ID1);

  const rows = [];
  for (let i = 1; i < batchRowValues.length; i++) {
    const rowObject = {};
    for (let j = 0; j < batchRowValues[i].length; j++) {
      rowObject[batchRowValues[0][j]] = batchRowValues[i][j];
    }
    rows.push(rowObject);
  }
  console.log('rows => ', rows);

  const playerValues2 = playersTab.values;
  const rowsPlayers2 = [];
  for (let i = 1; i < playerValues2.length; i++) {
    const rowObject2 = {};
    for (let j = 0; j < playerValues2[i].length; j++) {
      rowObject2[playerValues2[0][j]] = playerValues2[i][j];
    }
    rowsPlayers2.push(rowObject2);
  }
  console.log('rowsPlayers => ', rowsPlayers2);

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
