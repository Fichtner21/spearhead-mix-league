import drive from 'drive-db';
import $ from 'jquery';
import firebase from 'firebase';
import timeago from 'timeago';
import { Chart } from 'chart.js';
import 'chartjs-plugin-labels';

export async function history() {
  async function getMatches(name) {
    const sheets_url = `https://sheets.googleapis.com/v4/spreadsheets/1w_WHqCutkp_S6KveKyu4mNaG76C5dIlDwKw-A-dEOLo/values/${name}?key=AIzaSyD6eJ4T-ztIfyFn-h2oDAGTnNNYhNRziLU`;
    const res = await fetch(sheets_url);
    const json = await res.json();
    return json;
  }

  const newMatchHistory = await getMatches('Match+History');
  const batchRowValues = newMatchHistory.values;
  const historyMatches = [];
  for (let i = 1; i < batchRowValues.length; i++) {
    const rowObject = {};
    for (let j = 0; j < batchRowValues[i].length; j++) {
      rowObject[batchRowValues[0][j]] = batchRowValues[i][j];
    }
    historyMatches.push(rowObject);
  }

  const newPlayersList = await getMatches('Players');
  const batchRowValuesPlayers = newPlayersList.values;
  const playersTab = [];
  for (let i = 1; i < batchRowValuesPlayers.length; i++) {
    const rowObjectPlayers = {};
    for (let j = 0; j < batchRowValuesPlayers[i].length; j++) {
      rowObjectPlayers[batchRowValuesPlayers[0][j]] = batchRowValuesPlayers[i][j];
    }
    playersTab.push(rowObjectPlayers);
  }

  const newInactivePlayers = await getMatches('Inactive');
  const batchRowValuesInactive = newInactivePlayers.values;
  const inactivePlayers = [];
  for (let i = 1; i < batchRowValuesInactive.length; i++) {
    const rowObjectInactive = {};
    for (let j = 0; j < batchRowValuesInactive[i].length; j++) {
      rowObjectInactive[batchRowValuesInactive[0][j]] = batchRowValuesInactive[i][j];
    }
    inactivePlayers.push(rowObjectInactive);
  }

  // const maps = historyMatches.map((a) => a.info);
  // const stlo = maps.filter((item) => item.includes('Stlo')).length;
  // const theHunt = maps.filter((item) => item.includes('The Hunt')).length;
  // const v2 = maps.filter((item) => item.includes('V2')).length;
  // const theBridge = maps.filter((item) => item.includes('The Bridge')).length;
  // const v2shleter = maps.filter((item) => item.includes('Shelter')).length;
  // const navarone = maps.filter((item) => item.includes('Navarone')).length;
  // const vsuk = maps.filter((item) => item.includes('VSUK')).length;
  // const dessau = maps.filter((item) => item.includes('Dessau1946')).length;

  // const mapsPie = document.getElementById('maps-pie').getContext('2d');
  // mapsPie.width = 1000;
  // mapsPie.height = 1000;
  // const pieChart = new Chart(mapsPie, {
  //   type: 'bar',
  //   data: {
  //     labels: ['Stlo', 'The Hunt', 'Navarone', 'V2', 'V2 Shelter', 'The Bridge', 'VSUK Abbey', 'Dessau1946'],
  //     datasets: [
  //       {
  //         backgroundColor: ['gray', 'blue', 'orange', 'pink', 'green', 'brown', 'purple', 'yellow'],
  //         data: [stlo, theHunt, navarone, v2, v2shleter, theBridge, vsuk, dessau],
  //       },
  //     ],
  //   },
  //   options: {
  //     responsive: true,
  //     maintainAspectRatio: true,
  //     plugins: {
  //       // labels: {
  //       //   render: ['label', 'percentage'],
  //       //   fontColor: 'white',
  //       //   precision: 2,
  //       // },
  //       labels: {
  //         render: 'image',
  //         textMargin: -30,
  //         images: [
  //           {
  //             src: './assets/maps/stlo.jpg',
  //             width: 200,
  //             height: 200,
  //           },
  //           {
  //             src: './assets/maps/hunt.jpg',
  //             width: 200,
  //             height: 200,
  //             textMargin: -50,
  //           },
  //           {
  //             src: './assets/maps/navarone.jpg',
  //             width: 200,
  //             height: 200,
  //           },
  //           {
  //             src: './assets/maps/v2.jpg',
  //             width: 200,
  //             height: 200,
  //           },
  //           {
  //             src: './assets/maps/v2shelter.jpg',
  //             width: 200,
  //             height: 200,
  //           },
  //           {
  //             src: './assets/maps/bridge.jpg',
  //             width: 200,
  //             height: 200,
  //           },
  //           {
  //             src: './assets/maps/vsuk.jpg',
  //             width: 200,
  //             height: 200,
  //           },
  //           {
  //             src: './assets/maps/dessau.jpg',
  //             width: 200,
  //             height: 200,
  //           },
  //         ],
  //       },
  //       // layout: {
  //       //   padding: {
  //       //     left: 0,
  //       //     right: 0,
  //       //     top: 30,
  //       //     bottom: 0,
  //       //   },
  //       // },
  //     },
  //   },
  // });

  historyMatches.reverse();

  const teams = historyMatches.map((entry) => entry);

  let value = '';

  const lastMatch = document.getElementById('last-match');

  const oldTimestampLast = teams[0].timestamp;
  const newTimestampLast = new Date(oldTimestampLast).toLocaleDateString('pl-PL', { hour: '2-digit', minute: '2-digit' });

  let lastMatchInfo = `<div class="last">Last match: #${teams.length} `;
  lastMatchInfo += `<div class="last-match-timestamp"> ${newTimestampLast}</div>`;
  lastMatchInfo += `<div class="last-match-team">`;
  lastMatchInfo += `<div class="last-match-player last-match-t1-player">    
    <div class="name">${addPlayerLink2(teams[0].t1p1name, playersTab)}</div>
    <div class="score">${teams[0].t1p1score}</div>    
    <div class="difference-last">${Number(parseFloat(teams[0].t1p1postelo - teams[0].t1p1preelo).toFixed(2))}</div>
    </div>`;
  lastMatchInfo += `${
    teams[0].t1p2name
      ? `<div class="last-match-player last-match-t1-player">    
    <div class="name">${addPlayerLink2(teams[0].t1p2name, playersTab)}</div>
    <div class="score">${teams[0].t1p2score}</div>    
    <div class="difference-last">${Number(parseFloat(teams[0].t1p2postelo - teams[0].t1p2preelo).toFixed(2))}</div>
    </div>`
      : ''
  }`;
  lastMatchInfo += `${
    teams[0].t1p3name
      ? `<div class="last-match-player last-match-t1-player">    
    <div class="name">${addPlayerLink2(teams[0].t1p3name, playersTab)}</div>
    <div class="score">${teams[0].t1p3score}</div>    
    <div class="difference-last">${Number(parseFloat(teams[0].t1p3postelo - teams[0].t1p3preelo).toFixed(2))}</div>
    </div>`
      : ''
  }`;
  lastMatchInfo += `${
    teams[0].t1p4name
      ? `<div class="last-match-player last-match-t1-player">    
    <div class="name">${addPlayerLink2(teams[0].t1p4name, playersTab)}</div>
    <div class="score">${teams[0].t1p4score}</div>    
    <div class="difference-last">${Number(parseFloat(teams[0].t1p4postelo - teams[0].t1p4preelo).toFixed(2))}</div>
    </div>`
      : ''
  }`;
  lastMatchInfo += `${
    teams[0].t1p5name
      ? `<div class="last-match-player last-match-t1-player">    
    <div class="name">${addPlayerLink2(teams[0].t1p5name, playersTab)}</div>
    <div class="score">${teams[0].t1p5score}</div>    
    <div class="difference-last">${Number(parseFloat(teams[0].t1p5postelo - teams[0].t1p5preelo).toFixed(2))}</div>
    </div>`
      : ''
  }`;
  lastMatchInfo += `${
    teams[0].t1p6name
      ? `<div class="last-match-player last-match-t1-player">    
    <div class="name">${addPlayerLink2(teams[0].t1p6name, playersTab)}</div>
    <div class="score">${teams[0].t1p6score}</div>    
    <div class="difference-last">${Number(parseFloat(teams[0].t1p6postelo - teams[0].t1p6preelo).toFixed(2))}</div>
    </div>`
      : ''
  }`;

  lastMatchInfo += `<div class="last-match-t1-score">${teams[0].t1roundswon}</div>`;
  lastMatchInfo += `</div>`;

  lastMatchInfo += `<div class="last-match-separator"> - </div>`;

  lastMatchInfo += `<div class="last-match-team">`;
  lastMatchInfo += `<div class="last-match-t2-score">${teams[0].t2roundswon}</div>`;
  lastMatchInfo += `<div class="last-match-player last-match-t2-player">    
    <div class="name">${addPlayerLink2(teams[0].t2p1name, playersTab)}</div>
    <div class="score">${teams[0].t2p1score}</div>    
    <div class="difference-last">${
      teams[0].t2p1preelo ? Number(parseFloat(teams[0].t2p1postelo - teams[0].t2p1preelo).toFixed(2)) : ''
    }</div>
    </div>`;
  lastMatchInfo += `${
    teams[0].t2p2name
      ? `<div class="last-match-player last-match-t2-player">    
    <div class="name">${addPlayerLink2(teams[0].t2p2name, playersTab)}</div>
    <div class="score">${teams[0].t2p2score}</div>    
    <div class="difference-last">${Number(parseFloat(teams[0].t2p2postelo - teams[0].t2p2preelo).toFixed(2))}</div>
    </div>`
      : ''
  }`;
  lastMatchInfo += `${
    teams[0].t2p3name
      ? `<div class="last-match-player last-match-t2-player">    
    <div class="name">${addPlayerLink2(teams[0].t2p3name, playersTab)}</div>
    <div class="score">${teams[0].t2p3score}</div>    
    <div class="difference-last">${Number(parseFloat(teams[0].t2p3postelo - teams[0].t2p3preelo).toFixed(2))}</div>
    </div>`
      : ''
  }`;
  lastMatchInfo += `${
    teams[0].t2p4name
      ? `<div class="last-match-player last-match-t2-player">    
    <div class="name">${addPlayerLink2(teams[0].t2p4name, playersTab)}</div>
    <div class="score">${teams[0].t2p4score}</div>    
    <div class="difference-last">${Number(parseFloat(teams[0].t2p4postelo - teams[0].t2p4preelo).toFixed(2))}</div>
    </div>`
      : ''
  }`;
  lastMatchInfo += `${
    teams[0].t2p5name
      ? `<div class="last-match-player last-match-t2-player">    
    <div class="name">${addPlayerLink2(teams[0].t2p5name, playersTab)}</div>
    <div class="score">${teams[0].t2p5score}</div>    
    <div class="difference-last">${Number(parseFloat(teams[0].t2p5postelo - teams[0].t2p5preelo).toFixed(2))}</div>
    </div>`
      : ''
  }`;
  lastMatchInfo += `${
    teams[0].t2p6name
      ? `<div class="last-match-player last-match-t2-player">    
    <div class="name">${addPlayerLink2(teams[0].t2p6name, playersTab)}</div>
    <div class="score">${teams[0].t2p6score}</div>    
    <div class="difference-last">${Number(parseFloat(teams[0].t2p6postelo - teams[0].t2p6preelo).toFixed(2))}</div>
    </div>`
      : ''
  }`;

  lastMatchInfo += `</div>`;
  lastMatchInfo += `</div>`; // zamkniecie .last

  lastMatch.innerHTML = lastMatchInfo;

  const diffLast = document.querySelectorAll('.difference-last');
  diffLast.forEach(function (elem) {
    if (Number(parseFloat(elem.innerHTML)) > 0) {
      elem.classList.add('won-last');
    } else if (Number(parseFloat(elem.innerHTML)) < 0) {
      elem.classList.add('lost-last');
    } else {
      // nie dodawaj nic
    }
  });

  const team1score = document.querySelector('.last-match-t1-score');
  const team2score = document.querySelector('.last-match-t2-score');

  if (team1score.innerText > team2score.innerText) {
    team1score.style.backgroundColor = 'green';
    team2score.style.backgroundColor = 'red';
  } else if (team1score.innerText < team2score.innerText) {
    team1score.style.backgroundColor = 'red';
    team2score.style.backgroundColor = 'green';
  } else {
    team1score.style.backgroundColor = 'gray';
    team2score.style.backgroundColor = 'gray';
  }

  teams.forEach((match, i) => {
    Date.prototype.removeHours = function (h) {
      this.setHours(this.getHours() - h);
      return this;
    };
    const oldTimestamp = match.timestamp;
    const newTimestamp = new Date(oldTimestamp).toLocaleDateString('pl-PL', { hour: '2-digit', minute: '2-digit' });
    if (match.timestamp !== '') {
      value += `<div class="warmatch ${match.video ? `match` : `nomatch-video`}" id="match${teams.length - i}">          
          <div class="date">
            <div class="matchId" id="matchId-${teams.length - i}">
              <a href="#match-${teams.length - i}">#${teams.length - i}</a></div>
            <div class="dateDetail">${newTimestamp}</div>            
              ${
                match.video
                  ? `<a href="#match-${
                      teams.length - i
                    }" title="Watch movie from match."><div class="matchVideo"><i class="fas fa-film"></i></div></a>`
                  : ''
              }  
            <div class="comment-info comment-info${teams.length - i}" data-war="${teams.length - i}"></div>                     
          </div>          
          <div class="team">
            <div class="roudswon1">${match.t1roundswon}</div>
            <div class="players">

              <div class="player">
                <div class="preelo">${
                  Number(parseFloat(match.t1p1preelo, 10).toFixed(2) === 'NaN')
                    ? ' - '
                    : Number(parseFloat(match.t1p1preelo, 10).toFixed(2))
                }</div>
                <div class="name">${
                  addPlayerLink2(match.t1p1name, playersTab)
                    ? addPlayerLink2(match.t1p1name, playersTab)
                    : getFromInactive2(match.t1p1name, inactivePlayers)
                }</div>
                <div class="score">${match.t1p1score}</div>
                <div class="postelo">${
                  Number(parseFloat(match.t1p1postelo, 10).toFixed(2) === 'NaN')
                    ? ' - '
                    : Number(parseFloat(match.t1p1postelo, 10).toFixed(2))
                }</div>
                <div class="difference">${Number(parseFloat(match.t1p1postelo - match.t1p1preelo).toFixed(2))}
                </div>
              </div>
              ${
                match.t1p2name
                  ? `
              <div class="player">
                <div class="preelo">${
                  Number(parseFloat(match.t1p2preelo, 10).toFixed(2) === 'NaN')
                    ? ' - '
                    : Number(parseFloat(match.t1p2preelo, 10).toFixed(2))
                }</div>
                <div class="name">${
                  addPlayerLink2(match.t1p2name, playersTab)
                    ? addPlayerLink2(match.t1p2name, playersTab)
                    : getFromInactive2(match.t1p2name, inactivePlayers)
                }</div>
                <div class="score">${match.t1p2score}</div>
                <div class="postelo">${
                  Number(parseFloat(match.t1p2postelo, 10).toFixed(2) === 'NaN')
                    ? ' - '
                    : Number(parseFloat(match.t1p2postelo, 10).toFixed(2))
                }</div>
                <div class="difference">${
                  Number(parseFloat(match.t1p2postelo - match.t1p2preelo).toFixed(2) === 'NaN')
                    ? ''
                    : Number(parseFloat(match.t1p2postelo - match.t1p2preelo).toFixed(2))
                }
                </div>
              </div>
              `
                  : ''
              }
              ${
                match.t1p3name
                  ? `
              <div class="player">
                <div class="preelo">${
                  Number(parseFloat(match.t1p3preelo, 10).toFixed(2) === 'NaN')
                    ? ' - '
                    : Number(parseFloat(match.t1p3preelo, 10).toFixed(2))
                }</div>
                <div class="name">${
                  addPlayerLink2(match.t1p3name, playersTab)
                    ? addPlayerLink2(match.t1p3name, playersTab)
                    : getFromInactive2(match.t1p3name, inactivePlayers)
                }</div>
                <div class="score">${match.t1p3score}</div>
                <div class="postelo">${
                  Number(parseFloat(match.t1p3postelo, 10).toFixed(2) === 'NaN')
                    ? ' - '
                    : Number(parseFloat(match.t1p3postelo, 10).toFixed(2))
                }</div>
                <div class="difference">${
                  Number(parseFloat(match.t1p3postelo - match.t1p3preelo).toFixed(2) === 'NaN')
                    ? ''
                    : Number(parseFloat(match.t1p3postelo - match.t1p3preelo).toFixed(2))
                }
                </div>
              </div>
              `
                  : ''
              }
              ${
                match.t1p4name
                  ? `
              <div class="player">
                <div class="preelo">${
                  Number(parseFloat(match.t1p4preelo, 10).toFixed(2) === 'NaN')
                    ? ' - '
                    : Number(parseFloat(match.t1p4preelo, 10).toFixed(2))
                }</div>
                <div class="name">${
                  addPlayerLink2(match.t1p4name, playersTab)
                    ? addPlayerLink2(match.t1p4name, playersTab)
                    : getFromInactive2(match.t1p4name, inactivePlayers)
                }</div>
                <div class="score">${match.t1p4score}</div>
                <div class="postelo">${
                  Number(parseFloat(match.t1p4postelo, 10).toFixed(2) === 'NaN')
                    ? ' - '
                    : Number(parseFloat(match.t1p4postelo, 10).toFixed(2))
                }</div>
                <div class="difference">${
                  Number(parseFloat(match.t1p4postelo - match.t1p4preelo).toFixed(2) === 'NaN')
                    ? ''
                    : Number(parseFloat(match.t1p4postelo - match.t1p4preelo).toFixed(2))
                }
                </div>
              </div>
              `
                  : ''
              }
              ${
                match.t1p5name
                  ? `
              <div class="player">
                <div class="preelo">${
                  Number(parseFloat(match.t1p5preelo, 10).toFixed(2) === 'NaN')
                    ? ' - '
                    : Number(parseFloat(match.t1p5preelo, 10).toFixed(2))
                }</div>
                <div class="name">${
                  addPlayerLink2(match.t1p5name, playersTab)
                    ? addPlayerLink2(match.t1p5name, playersTab)
                    : getFromInactive2(match.t1p5name, inactivePlayers)
                }</div>
                <div class="score">${match.t1p5score}</div>
                <div class="postelo">${
                  Number(parseFloat(match.t1p5postelo, 10).toFixed(2) === 'NaN')
                    ? ' - '
                    : Number(parseFloat(match.t1p5postelo, 10).toFixed(2))
                }</div>
                <div class="difference">${
                  Number(parseFloat(match.t1p5postelo - match.t1p5preelo).toFixed(2) === 'NaN')
                    ? ''
                    : Number(parseFloat(match.t1p5postelo - match.t1p5preelo).toFixed(2))
                }
                </div>
              </div>`
                  : ''
              }
              ${
                match.t1p6name
                  ? `<div class="player">
                <div class="preelo">${
                  Number(parseFloat(match.t1p6preelo, 10).toFixed(2) === 'NaN') ? ' ' : Number(parseFloat(match.t1p6preelo, 10).toFixed(2))
                }</div>
                <div class="name">${
                  addPlayerLink2(match.t1p6name, playersTab)
                    ? addPlayerLink2(match.t1p6name, playersTab)
                    : getFromInactive2(match.t1p6name, inactivePlayers)
                }</div>
                <div class="score">${match.t1p6score}</div>
                <div class="postelo">${
                  Number(parseFloat(match.t1p6postelo, 10).toFixed(2) === 'NaN')
                    ? ' '
                    : Number(parseFloat(match.t1p6postelo, 10).toFixed(2))
                }</div>
                <div class="difference">${
                  Number(parseFloat(match.t1p6postelo - match.t1p6preelo).toFixed(2))
                    ? Number(parseFloat(match.t1p6postelo - match.t1p6preelo).toFixed(2))
                    : ''
                }</div>
              </div>`
                  : ''
              }
              ${
                match.t1p7name
                  ? `<div class="player">
                  <div class="preelo">${
                    Number(parseFloat(match.t1p7preelo, 10).toFixed(2) === 'NaN')
                      ? ' - '
                      : Number(parseFloat(match.t1p7preelo, 10).toFixed(2))
                  }</div>
                  <div class="name">${
                    addPlayerLink2(match.t1p7name, playersTab)
                      ? addPlayerLink2(match.t1p7name, playersTab)
                      : getFromInactive2(match.t1p7name, inactivePlayers)
                  }</div>
                  <div class="score">${match.t1p7score}</div>
                  <div class="postelo">${
                    Number(parseFloat(match.t1p7postelo, 10).toFixed(2) === 'NaN')
                      ? ' - '
                      : Number(parseFloat(match.t1p7postelo, 10).toFixed(2))
                  }</div>
                  <div class="difference">${
                    Number(parseFloat(match.t1p7postelo - match.t1p7preelo).toFixed(2))
                      ? Number(parseFloat(match.t1p7postelo - match.t1p7preelo).toFixed(2))
                      : ''
                  }</div>
                </div>`
                  : ''
              }              
            </div>            
          </div> 
          <div class="team">
            <div class="roudswon2">${match.t2roundswon}</div>
            <div class="players">
               <div class="player">
                <div class="preelo">${
                  Number(parseFloat(match.t2p1preelo, 10).toFixed(2) === 'NaN')
                    ? ' - '
                    : Number(parseFloat(match.t2p1preelo, 10).toFixed(2))
                }</div>
                <div class="name">${
                  addPlayerLink2(match.t2p1name, playersTab)
                    ? addPlayerLink2(match.t2p1name, playersTab)
                    : getFromInactive2(match.t2p1name, inactivePlayers)
                }</div>
                <div class="score">${match.t2p1score}</div>
                <div class="postelo">${
                  Number(parseFloat(match.t2p1postelo, 10).toFixed(2) === 'NaN')
                    ? ' - '
                    : Number(parseFloat(match.t2p1postelo, 10).toFixed(2))
                }</div>
                <div class="difference">${
                  Number(parseFloat(match.t2p1postelo - match.t2p1preelo).toFixed(2) === 'NaN')
                    ? ''
                    : Number(parseFloat(match.t2p1postelo - match.t2p1preelo).toFixed(2))
                }
                </div>
              </div>
              ${
                match.t2p2name
                  ? `
              <div class="player">    
                <div class="preelo">${
                  Number(parseFloat(match.t2p2preelo, 10).toFixed(2) === 'NaN')
                    ? ' - '
                    : Number(parseFloat(match.t2p2preelo, 10).toFixed(2))
                }</div>
                <div class="name">${
                  addPlayerLink2(match.t2p2name, playersTab)
                    ? addPlayerLink2(match.t2p2name, playersTab)
                    : getFromInactive2(match.t2p2name, inactivePlayers)
                }</div>
                <div class="score">${match.t2p2score}</div>
                <div class="postelo">${
                  Number(parseFloat(match.t2p2postelo, 10).toFixed(2) === 'NaN')
                    ? ' - '
                    : Number(parseFloat(match.t2p2postelo, 10).toFixed(2))
                }</div>
                <div class="difference">${
                  Number(parseFloat(match.t2p2postelo - match.t2p2preelo).toFixed(2) === 'NaN')
                    ? ''
                    : Number(parseFloat(match.t2p2postelo - match.t2p2preelo).toFixed(2))
                }
                </div>
              </div>
              `
                  : ''
              } 
              ${
                match.t2p3name
                  ? `       
              <div class="player">
                <div class="preelo">${
                  Number(parseFloat(match.t2p3preelo, 10).toFixed(2) === 'NaN')
                    ? ' - '
                    : Number(parseFloat(match.t2p3preelo, 10).toFixed(2))
                }</div>
                <div class="name">${
                  addPlayerLink2(match.t2p3name, playersTab)
                    ? addPlayerLink2(match.t2p3name, playersTab)
                    : getFromInactive2(match.t2p3name, inactivePlayers)
                }</div>
                <div class="score">${match.t2p3score}</div>
                <div class="postelo">${
                  Number(parseFloat(match.t2p3postelo, 10).toFixed(2) === 'NaN')
                    ? ' - '
                    : Number(parseFloat(match.t2p3postelo, 10).toFixed(2))
                }</div>
                <div class="difference">${
                  Number(parseFloat(match.t2p3postelo - match.t2p3preelo).toFixed(2) === 'NaN')
                    ? ''
                    : Number(parseFloat(match.t2p3postelo - match.t2p3preelo).toFixed(2))
                }
                </div>
              </div>
              `
                  : ''
              } 
              ${
                match.t2p4name
                  ? `
              <div class="player">
                <div class="preelo">${
                  Number(parseFloat(match.t2p4preelo, 10).toFixed(2) === 'NaN')
                    ? ' - '
                    : Number(parseFloat(match.t2p4preelo, 10).toFixed(2))
                }</div>
                <div class="name">${
                  addPlayerLink2(match.t2p4name, playersTab)
                    ? addPlayerLink2(match.t2p4name, playersTab)
                    : getFromInactive2(match.t2p4name, inactivePlayers)
                }</div>
                <div class="score">${match.t2p4score}</div>
                <div class="postelo">${
                  Number(parseFloat(match.t2p4postelo, 10).toFixed(2) === 'NaN')
                    ? ' - '
                    : Number(parseFloat(match.t2p4postelo, 10).toFixed(2))
                }</div>
                <div class="difference">${
                  Number(parseFloat(match.t2p4postelo - match.t2p4preelo).toFixed(2) === 'NaN')
                    ? ''
                    : Number(parseFloat(match.t2p4postelo - match.t2p4preelo).toFixed(2))
                }
                </div>
              </div>
              `
                  : ''
              } 
              ${
                match.t2p5name
                  ? `
              <div class="player">
                <div class="preelo">${
                  Number(parseFloat(match.t2p5preelo, 10).toFixed(2) === 'NaN')
                    ? ' - '
                    : Number(parseFloat(match.t2p5preelo, 10).toFixed(2))
                }</div>
                <div class="name">${
                  addPlayerLink2(match.t2p5name, playersTab)
                    ? addPlayerLink2(match.t2p5name, playersTab)
                    : getFromInactive2(match.t2p5name, inactivePlayers)
                }</div>
                <div class="score">${match.t2p5score}</div>
                <div class="postelo">${
                  Number(parseFloat(match.t2p5postelo, 10).toFixed(2) === 'NaN')
                    ? ' - '
                    : Number(parseFloat(match.t2p5postelo, 10).toFixed(2))
                }</div>
                <div class="difference">${
                  Number(parseFloat(match.t2p5postelo - match.t2p5preelo).toFixed(2) === 'NaN')
                    ? ''
                    : Number(parseFloat(match.t2p5postelo - match.t2p5preelo).toFixed(2))
                }
                </div>
              </div> 
              `
                  : ''
              } 
              ${
                match.t2p6name
                  ? `<div class="player">
                      <div class="preelo">${
                        Number(parseFloat(match.t2p6preelo, 10).toFixed(2) === 'NaN')
                          ? ' - '
                          : Number(parseFloat(match.t2p6preelo, 10).toFixed(2))
                      }</div>
                      <div class="name">${
                        addPlayerLink2(match.t2p6name, playersTab)
                          ? addPlayerLink2(match.t2p6name, playersTab)
                          : getFromInactive2(match.t2p6name, inactivePlayers)
                      }</div>
                      <div class="score">${match.t2p6score}</div>
                      <div class="postelo">${
                        Number(parseFloat(match.t2p6postelo, 10).toFixed(2) === 'NaN')
                          ? ' - '
                          : Number(parseFloat(match.t2p6postelo, 10).toFixed(2))
                      }</div>
                      <div class="difference">${
                        Number(parseFloat(match.t2p6postelo - match.t2p6preelo).toFixed(2))
                          ? Number(parseFloat(match.t2p6postelo - match.t2p6preelo).toFixed(2))
                          : ''
                      }
                      </div>
                    </div>`
                  : ''
              } 
                ${
                  match.t2p7name
                    ? `<div class="player">
                        <div class="preelo">${
                          Number(parseFloat(match.t2p7preelo, 10).toFixed(2) === 'NaN')
                            ? ' - '
                            : Number(parseFloat(match.t2p7preelo, 10).toFixed(2))
                        }</div>
                        <div class="name">${
                          addPlayerLink2(match.t2p7name, playersTab)
                            ? addPlayerLink2(match.t2p7name, playersTab)
                            : getFromInactive2(match.t2p7name, inactivePlayers)
                        }</div>
                        <div class="score">${match.t2p7score}</div>
                        <div class="postelo">${
                          Number(parseFloat(match.t2p7postelo, 10).toFixed(2) === 'NaN')
                            ? ' - '
                            : Number(parseFloat(match.t2p7postelo, 10).toFixed(2))
                        }</div>
                        <div class="difference">${
                          Number(parseFloat(match.t2p7postelo - match.t2p7preelo).toFixed(2))
                            ? Number(parseFloat(match.t2p7postelo - match.t2p7preelo).toFixed(2))
                            : ''
                        }
                        </div>
                      </div>`
                    : ''
                } 
            </div>           
          </div>   
                  
            ${
              match.video
                ? `<div class="thumbnail" id="thumbnail-${teams.length - i}"><iframe 
            id="ytplayer-${teams.length - i}"
            type="text/html"
            height="100%"
            frameborder="0"
            allowfullscreen
            srcdoc="<style>*{padding:0;margin:0;overflow:hidden}html,body{height:100%}img,span{position:absolute;width:100%;top:0;bottom:0;margin:auto}span{height:1.5em;text-align:center;font:48px/1.5 sans-serif;color:white;text-shadow:0 0 0.5em black}</style><a href=https://www.youtube.com/embed/${
              match.video
            }/?autoplay=1><img src='https://img.youtube.com/vi/${match.video}/hqdefault.jpg' alt='AltTagContent'><span>▶</span></a>"
            loading="lazy"
            src="https://www.youtube.com/embed/${match.video}"
            ></iframe></div>`
                : ''
            }          
        </div>
       `;
    }
  });

  document.getElementById('matches').innerHTML = value;

  const ourMatches = document.getElementById('our-matches2');

  const lastNotEmpty = teams.findIndex((x) => x.timestamp !== '');
  const teamsLength = teams.length;
  ourMatches.innerHTML = ` ${teamsLength - lastNotEmpty}`;

  const mainApp2 = document.getElementById('app');

  // teams.forEach((war, i) => {
  //   const warCard = document.createElement('div');
  //   warCard.classList.add('container', 'view', 'hidden', 'warcard');
  //   warCard.setAttribute('id', `match-${teams.length - i}`);
  //   const warCardWrapper = document.createElement('div');
  //   warCardWrapper.classList.add('wrapper');
  //   warCard.appendChild(warCardWrapper);
  //   const warCardDetail = document.createElement('div');
  //   warCardDetail.classList.add('match-detail');
  //   warCardDetail.dataset.match = `${teams.length - i}`;
  //   const oldTimestamp = war.timestamp;
  //   const newTimestamp = new Date(oldTimestamp).toLocaleDateString('pl-PL', { hour: '2-digit', minute: '2-digit' });
  //   //
  //   const matchSingle = document.createElement('div');
  //   matchSingle.classList.add('match-single');
  //   const matchDate = document.createElement('div');
  //   matchDate.classList.add('date');
  //   matchSingle.appendChild(matchDate);
  //   const matchId = document.createElement('div');
  //   matchId.classList.add('matchId');
  //   matchId.id = `${teams.length - i}`;
  //   matchId.innerHTML += `#${teams.length - i}`;
  //   matchDate.appendChild(matchId);
  //   const matchDetail = document.createElement('div');
  //   matchDetail.classList.add('dateDetail');
  //   matchDetail.innerHTML += `${newTimestamp}`;
  //   matchDate.appendChild(matchDetail);

  //   const teamOne = document.createElement('div');
  //   teamOne.classList.add('team', 'team1');
  //   matchSingle.appendChild(teamOne);
  //   const teamOneRounds = document.createElement('div');
  //   teamOneRounds.classList.add('roundswon1');
  //   teamOneRounds.innerHTML += `${war.t1roundswon}`;
  //   teamOne.appendChild(teamOneRounds);
  //   const teamOnePlayers = document.createElement('div');
  //   teamOnePlayers.classList.add('players');
  //   teamOne.appendChild(teamOnePlayers);
  //   const teamOnePlayer = document.createElement('div');
  //   teamOnePlayer.classList.add('player');

  //   for (let k = 1; k < `war.t${k}p${k}name.length`; k++) {
  //     console.log('k ', k);
  //   }

  //   teamOnePlayers.appendChild(teamOnePlayer);
  //   mainApp2.appendChild(warCard);
  // });

  teams.forEach((war, i) => {
    const warCard = document.createElement('div');
    warCard.classList.add('container', 'view', 'hidden', 'warcard');
    warCard.setAttribute('id', `match-${teams.length - i}`);
    const warCardWrapper = document.createElement('div');
    warCardWrapper.classList.add('wrapper');
    warCard.appendChild(warCardWrapper);
    const warCardDetail = document.createElement('div');
    warCardDetail.classList.add('match-detail');
    warCardDetail.dataset.match = `${teams.length - i}`;
    const oldTimestamp = war.timestamp;
    const newTimestamp = new Date(oldTimestamp).toLocaleDateString('pl-PL', { hour: '2-digit', minute: '2-digit' });
    warCardDetail.innerHTML += `<div class="match-details">
      <div class="">Match #${teams.length - i}</div>
      <div class="info">Info: ${war.info}</div>
        <div class="match-single">
          <div class="date">
              <div class="matchId" id="matchId-${teams.length - i}">
                <a href="#match-${teams.length - i}">#${teams.length - i}</a></div>
              <div class="dateDetail">${newTimestamp}</div>
                ${
                  war.video
                    ? `<a href="#match-${
                        teams.length - i
                      }" title="Watch movie from match."><div class="matchVideo"><i class="fas fa-film"></i></div></a>`
                    : ''
                }
              <div class="comment-info comment-info${teams.length - i}" data-war="${teams.length - i}"></div>
          </div>
          <div class="team">
            <div class="roudswon1">${war.t1roundswon}</div>
            <div class="players">
              <div class="player">
                <div class="preelo">${
                  Number(parseFloat(war.t1p1preelo, 10).toFixed(2) === 'NaN') ? ' - ' : Number(parseFloat(war.t1p1preelo, 10).toFixed(2))
                }</div>
                <div class="name">${
                  addPlayerLink2(war.t1p1name, playersTab)
                    ? addPlayerLink2(war.t1p1name, playersTab)
                    : getFromInactive2(war.t1p1name, inactivePlayers)
                }</div>
                <div class="score">${war.t1p1score}</div>
                <div class="postelo">${
                  Number(parseFloat(war.t1p1postelo, 10).toFixed(2) === 'NaN') ? ' - ' : Number(parseFloat(war.t1p1postelo, 10).toFixed(2))
                }</div>
                <div class="difference">${Number(parseFloat(war.t1p1postelo - war.t1p1preelo).toFixed(2))}</div>
              </div>
              ${
                war.t1p2name
                  ? `
              <div class="player">
                <div class="preelo">${
                  Number(parseFloat(war.t1p2preelo, 10).toFixed(2) === 'NaN') ? ' - ' : Number(parseFloat(war.t1p2preelo, 10).toFixed(2))
                }</div>
                <div class="name">${
                  addPlayerLink2(war.t1p2name, playersTab)
                    ? addPlayerLink2(war.t1p2name, playersTab)
                    : getFromInactive2(war.t1p2name, inactivePlayers)
                }</div>
                <div class="score">${war.t1p2score}</div>
                <div class="postelo">${
                  Number(parseFloat(war.t1p2postelo, 10).toFixed(2) === 'NaN') ? ' - ' : Number(parseFloat(war.t1p2postelo, 10).toFixed(2))
                }</div>
                <div class="difference">${Number(parseFloat(war.t1p2postelo - war.t1p2preelo).toFixed(2))}</div>
              </div>
              `
                  : ''
              }
              ${
                war.t1p3name
                  ? `
              <div class="player">
                <div class="preelo">${
                  Number(parseFloat(war.t1p3preelo, 10).toFixed(2) === 'NaN') ? ' - ' : Number(parseFloat(war.t1p3preelo, 10).toFixed(2))
                }</div>
                <div class="name">${
                  addPlayerLink2(war.t1p3name, playersTab)
                    ? addPlayerLink2(war.t1p3name, playersTab)
                    : getFromInactive2(war.t1p3name, inactivePlayers)
                }</div>
                <div class="score">${war.t1p3score}</div>
                <div class="postelo">${
                  Number(parseFloat(war.t1p3postelo, 10).toFixed(2) === 'NaN') ? ' - ' : Number(parseFloat(war.t1p3postelo, 10).toFixed(2))
                }</div>
                <div class="difference">${
                  Number(parseFloat(war.t1p3postelo - war.t1p3preelo).toFixed(2))
                    ? Number(parseFloat(war.t1p3postelo - war.t1p3preelo).toFixed(2))
                    : ''
                }
                </div>
              </div>
              `
                  : ''
              }
              ${
                war.t1p4name
                  ? `
              <div class="player">
                <div class="preelo">${
                  Number(parseFloat(war.t1p4preelo, 10).toFixed(2) === 'NaN') ? ' - ' : Number(parseFloat(war.t1p4preelo, 10).toFixed(2))
                }</div>
                <div class="name">${
                  addPlayerLink2(war.t1p4name, playersTab)
                    ? addPlayerLink2(war.t1p4name, playersTab)
                    : getFromInactive2(war.t1p4name, inactivePlayers)
                }</div>
                <div class="score">${war.t1p4score}</div>
                <div class="postelo">${
                  Number(parseFloat(war.t1p4postelo, 10).toFixed(2) === 'NaN') ? ' - ' : Number(parseFloat(war.t1p4postelo, 10).toFixed(2))
                }</div>
                <div class="difference">${
                  Number(parseFloat(war.t1p4postelo - war.t1p4preelo).toFixed(2))
                    ? Number(parseFloat(war.t1p4postelo - war.t1p4preelo).toFixed(2))
                    : ''
                }</div>
              </div>
              `
                  : ''
              }
              ${
                war.t1p5name
                  ? `
              <div class="player">
                <div class="preelo">${
                  Number(parseFloat(war.t1p5preelo, 10).toFixed(2) === 'NaN') ? ' - ' : Number(parseFloat(war.t1p5preelo, 10).toFixed(2))
                }</div>
                <div class="name">${
                  addPlayerLink2(war.t1p5name, playersTab)
                    ? addPlayerLink2(war.t1p5name, playersTab)
                    : getFromInactive2(war.t1p5name, inactivePlayers)
                }</div>
                <div class="score">${war.t1p5score}</div>
                <div class="postelo">${
                  Number(parseFloat(war.t1p5postelo, 10).toFixed(2) === 'NaN') ? ' - ' : Number(parseFloat(war.t1p5postelo, 10).toFixed(2))
                }</div>
                <div class="difference">${
                  Number(parseFloat(war.t1p5postelo - war.t1p5preelo).toFixed(2))
                    ? Number(parseFloat(war.t1p5postelo - war.t1p5preelo).toFixed(2))
                    : ''
                }</div>
              </div>
              `
                  : ''
              }
              ${
                war.t1p6name
                  ? `<div class="player">
                <div class="preelo">${
                  Number(parseFloat(war.t1p6preelo, 10).toFixed(2) === 'NaN') ? ' - ' : Number(parseFloat(war.t1p6preelo, 10).toFixed(2))
                }</div>
                <div class="name">${
                  addPlayerLink2(war.t1p6name, playersTab)
                    ? addPlayerLink2(war.t1p6name, playersTab)
                    : getFromInactive2(war.t1p6name, inactivePlayers)
                }</div>
                <div class="score">${war.t1p6score}</div>
                <div class="postelo">${
                  Number(parseFloat(war.t1p6postelo, 10).toFixed(2) === 'NaN') ? ' - ' : Number(parseFloat(war.t1p6postelo, 10).toFixed(2))
                }</div>
                <div class="difference">${
                  Number(parseFloat(war.t1p6postelo - war.t1p6preelo).toFixed(2))
                    ? Number(parseFloat(war.t1p6postelo - war.t1p6preelo).toFixed(2))
                    : ''
                }</div>
              </div>`
                  : ''
              }
              ${
                war.t1p7name
                  ? `<div class="player">
                <div class="preelo">${
                  Number(parseFloat(war.t1p7preelo, 10).toFixed(2) === 'NaN') ? ' - ' : Number(parseFloat(war.t1p7preelo, 10).toFixed(2))
                }</div>
                <div class="name">${
                  addPlayerLink2(war.t1p7name, playersTab)
                    ? addPlayerLink2(war.t1p7name, playersTab)
                    : getFromInactive2(war.t1p7name, inactivePlayers)
                }</div>
                <div class="score">${war.t1p7score}</div>
                <div class="postelo">${
                  Number(parseFloat(war.t1p7postelo, 10).toFixed(2) === 'NaN') ? ' - ' : Number(parseFloat(war.t1p7postelo, 10).toFixed(2))
                }</div>
                <div class="difference">${
                  Number(parseFloat(war.t1p7postelo - war.t1p7preelo).toFixed(2))
                    ? Number(parseFloat(war.t1p7postelo - war.t1p7preelo).toFixed(2))
                    : ''
                }</div>
              </div>`
                  : ''
              }
            </div>
          </div>
          <div class="team">
          <div class="roudswon2">${war.t2roundswon}</div>
          <div class="players">
            <div class="player">
              <div class="preelo">${
                Number(parseFloat(war.t2p1preelo, 10).toFixed(2) === 'NaN') ? ' - ' : Number(parseFloat(war.t2p1preelo, 10).toFixed(2))
              }</div>
              <div class="name">${
                addPlayerLink2(war.t2p1name, playersTab)
                  ? addPlayerLink2(war.t2p1name, playersTab)
                  : getFromInactive2(war.t2p1name, inactivePlayers)
              }</div>
              <div class="score">${war.t2p1score}</div>
              <div class="postelo">${
                Number(parseFloat(war.t2p1postelo, 10).toFixed(2) === 'NaN') ? ' - ' : Number(parseFloat(war.t2p1postelo, 10).toFixed(2))
              }</div>
              <div class="difference">${Number(parseFloat(war.t2p1postelo - war.t2p1preelo).toFixed(2))}
              </div>
            </div>
            ${
              war.t2p2name
                ? `
            <div class="player">
              <div class="preelo">${
                Number(parseFloat(war.t2p2preelo, 10).toFixed(2) === 'NaN') ? ' - ' : Number(parseFloat(war.t2p2preelo, 10).toFixed(2))
              }</div>
              <div class="name">${
                addPlayerLink2(war.t2p2name, playersTab)
                  ? addPlayerLink2(war.t2p2name, playersTab)
                  : getFromInactive2(war.t2p2name, inactivePlayers)
              }</div>
              <div class="score">${war.t2p2score}</div>
              <div class="postelo">${
                Number(parseFloat(war.t2p2postelo, 10).toFixed(2) === 'NaN') ? ' - ' : Number(parseFloat(war.t2p2postelo, 10).toFixed(2))
              }</div>
              <div class="difference">${
                Number(parseFloat(war.t2p2postelo - war.t2p2preelo).toFixed(2))
                  ? Number(parseFloat(war.t2p2postelo - war.t2p2preelo).toFixed(2))
                  : ''
              }
              </div>
            </div>
            `
                : ''
            }
              ${
                war.t2p3name
                  ? `
            <div class="player">
              <div class="preelo">${
                Number(parseFloat(war.t2p3preelo, 10).toFixed(2) === 'NaN') ? ' - ' : Number(parseFloat(war.t2p3preelo, 10).toFixed(2))
              }</div>
              <div class="name">${
                addPlayerLink2(war.t2p3name, playersTab)
                  ? addPlayerLink2(war.t2p3name, playersTab)
                  : getFromInactive2(war.t2p3name, inactivePlayers)
              }</div>
              <div class="score">${war.t2p3score}</div>
              <div class="postelo">${
                Number(parseFloat(war.t2p3postelo, 10).toFixed(2) === 'NaN') ? ' - ' : Number(parseFloat(war.t2p3postelo, 10).toFixed(2))
              }</div>
              <div class="difference">${
                Number(parseFloat(war.t2p3postelo - war.t2p3preelo).toFixed(2))
                  ? Number(parseFloat(war.t2p3postelo - war.t2p3preelo).toFixed(2))
                  : ''
              }
              </div>
            </div>
            `
                  : ''
              }
            ${
              war.t2p4name
                ? `
            <div class="player">
              <div class="preelo">${
                Number(parseFloat(war.t2p4preelo, 10).toFixed(2) === 'NaN') ? ' - ' : Number(parseFloat(war.t2p4preelo, 10).toFixed(2))
              }</div>
              <div class="name">${
                addPlayerLink2(war.t2p4name, playersTab)
                  ? addPlayerLink2(war.t2p4name, playersTab)
                  : getFromInactive2(war.t2p4name, inactivePlayers)
              }</div>
              <div class="score">${war.t2p4score}</div>
              <div class="postelo">${
                Number(parseFloat(war.t2p4postelo, 10).toFixed(2) === 'NaN') ? ' - ' : Number(parseFloat(war.t2p4postelo, 10).toFixed(2))
              }</div>
              <div class="difference">${
                Number(parseFloat(war.t2p4postelo - war.t2p4preelo).toFixed(2))
                  ? Number(parseFloat(war.t2p4postelo - war.t2p4preelo).toFixed(2))
                  : ''
              }
              </div>
            </div>
            `
                : ''
            }
            ${
              war.t2p5name
                ? `
            <div class="player">
              <div class="preelo">${
                Number(parseFloat(war.t2p5preelo, 10).toFixed(2) === 'NaN') ? ' - ' : Number(parseFloat(war.t2p5preelo, 10).toFixed(2))
              }</div>
              <div class="name">${
                addPlayerLink2(war.t2p5name, playersTab)
                  ? addPlayerLink2(war.t2p5name, playersTab)
                  : getFromInactive2(war.t2p5name, inactivePlayers)
              }</div>
              <div class="score">${war.t2p5score}</div>
              <div class="postelo">${
                Number(parseFloat(war.t2p5postelo, 10).toFixed(2) === 'NaN') ? ' - ' : Number(parseFloat(war.t2p5postelo, 10).toFixed(2))
              }</div>
              <div class="difference">${
                Number(parseFloat(war.t2p5postelo - war.t2p5preelo).toFixed(2))
                  ? Number(parseFloat(war.t2p5postelo - war.t2p5preelo).toFixed(2))
                  : ''
              }
              </div>
            </div>
            `
                : ''
            }
            ${
              war.t2p6name
                ? `<div class="player">
              <div class="preelo">${
                Number(parseFloat(war.t2p6preelo, 10).toFixed(2) === 'NaN') ? ' - ' : Number(parseFloat(war.t2p6preelo, 10).toFixed(2))
              }</div>
              <div class="name">${
                addPlayerLink2(war.t2p6name, playersTab)
                  ? addPlayerLink2(war.t2p6name, playersTab)
                  : getFromInactive2(war.t2p6name, inactivePlayers)
              }</div>
              <div class="score">${war.t2p6score}</div>
              <div class="postelo">${
                Number(parseFloat(war.t2p6postelo, 10).toFixed(2) === 'NaN') ? ' - ' : Number(parseFloat(war.t2p6postelo, 10).toFixed(2))
              }</div>
              <div class="difference">${
                Number(parseFloat(war.t2p6postelo - war.t2p6preelo).toFixed(2))
                  ? Number(parseFloat(war.t2p6postelo - war.t2p6preelo).toFixed(2))
                  : ''
              }</div>
            </div>`
                : ''
            }
            ${
              war.t2p7name
                ? `<div class="player">
              <div class="preelo">${
                Number(parseFloat(war.t2p7preelo, 10).toFixed(2) === 'NaN') ? ' - ' : Number(parseFloat(war.t2p7preelo, 10).toFixed(2))
              }</div>
              <div class="name">${
                addPlayerLink2(war.t2p7name, playersTab)
                  ? addPlayerLink2(war.t2p7name, playersTab)
                  : getFromInactive2(war.t2p7name, inactivePlayers)
              }</div>
              <div class="score">${war.t2p7score}</div>
              <div class="postelo">${
                Number(parseFloat(war.t2p7postelo, 10).toFixed(2) === 'NaN') ? ' - ' : Number(parseFloat(war.t2p7postelo, 10).toFixed(2))
              }</div>
              <div class="difference">${
                Number(parseFloat(war.t2p7postelo - war.t2p7preelo).toFixed(2))
                  ? Number(parseFloat(war.t2p7postelo - war.t2p7preelo).toFixed(2))
                  : ''
              }</div>
            </div>`
                : ''
            }
          </div>
        </div>
      </div>`;
    const iframeMatch = `<iframe
      id="ytplayer"
      type="text/html"
      width="640"
      height="360"
      loading="lazy"
      srcdoc="<style>*{padding:0;margin:0;overflow:hidden}html,body{height:100%}img,span{position:absolute;width:100%;top:0;bottom:0;margin:auto}span{height:1.5em;text-align:center;font:48px/1.5 sans-serif;color:white;text-shadow:0 0 0.5em black}</style><a href=https://www.youtube.com/embed/${war.video}/?autoplay=1><img src='https://img.youtube.com/vi/${war.video}/hqdefault.jpg' alt='AltTagContent'><span>▶</span></a>"
      src="https://www.youtube.com/embed/${war.video}"
      frameborder="0"
      ></iframe>`;

    const videoResponsive = document.createElement('div');
    videoResponsive.classList.add('video-responsive');
    warCardDetail.appendChild(videoResponsive);
    if (war.video) {
      videoResponsive.innerHTML += iframeMatch;
    } else {
      videoResponsive.style.display = 'none';
    }
    warCardWrapper.appendChild(warCardDetail);

    mainApp2.appendChild(warCard);
    function enableRouteWar() {
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
    enableRouteWar();
  });

  // $.getScript('https://www.gstatic.com/firebasejs/3.4.0/firebase.js', function () {
  const firebaseConfig = {
    apiKey: 'AIzaSyBO4nqpO3FSeXJqHV0qYuPVRi4XLiJEujo',
    authDomain: 'spearhead-mix-league.firebaseapp.com',
    databaseURL: 'https://spearhead-mix-league-default-rtdb.europe-west1.firebasedatabase.app',
    projectId: 'spearhead-mix-league',
    storageBucket: 'spearhead-mix-league.appspot.com',
    messagingSenderId: '719531931759',
    appId: '1:719531931759:web:7fe514dce675b8e19cf59a',
    measurementId: 'G-7WB1MRGPB5',
  };

  firebase.initializeApp(firebaseConfig);

  const rootRef = firebase.database().ref();

  const mapsToPlay = ['The Hunt', 'V2', 'The Bridge', 'VSUK Abbey', 'Stlo', 'Navarone', 'Dessau', 'Stlo4', 'V2 Shelter', 'V2 Extended'];

  $('#randomMap').on('click', function () {
    const randomValue = Math.floor(Math.random() * mapsToPlay.length);
    const randMap = mapsToPlay[randomValue];
    $('#team1map').append(randMap);
  });

  const team1map = rootRef.child('team1map');
  const linkTeam1map = window.location.pathname;
  const pathkeyTeam1map = decodeURI(linkTeam1map.replace(new RegExp('\\/|\\.', 'g'), '_'));

  const postRefMapTeam1 = team1map.child(pathkeyTeam1map);

  $('#id1map').submit(function () {
    JSON.parse(
      JSON.stringify(
        postRefMapTeam1.push().set({
          duration: 30000,
          team1map: $('#team1map').val(),
          postedAt: firebase.database.ServerValue.TIMESTAMP,
        }),
      ),
    );
    $('input[type=text]').val('');
    return false;
  });

  postRefMapTeam1.on('child_added', function (snapshot) {
    const newMap1 = snapshot.val();
    const html = "<div class='mapToShow'>" + newMap1.team1map + ' - ' + new Date(newMap1.postedAt) + '</div>';
    $('#shotTeam1map').prepend(html);
    if (newMap1) {
      $('#submitBtn').prop('disabled', true);
    }
  });

  postRefMapTeam1.limitToLast(1).on('value', (snapshot) => {
    snapshot.forEach((snap) => {
      const map1 = snap.child('team1map').val();
      const shotTeam1map = $('#shotTeam1map');

      $('<div></div>').append(map1);

      $('#delMap').on('click', function () {
        postRefMapTeam1.remove();
        $('#shotTeam1map .mapToShow').remove();
        $('#submitBtn').prop('disabled', false);
      });
    });
  });

  // const nowTime = Date.now();
  // const cutoff = nowTime - 45000;
  // const old = postRefMapTeam1.orderByChild('postedAt').endAt(cutoff).limitToLast(1);
  // console.log('old => ', old);
  // const listener = old.on('child_added', function (snapshot) {
  //   console.log('snapshot => ', snapshot);
  //   const newSnap = snapshot.val();
  //   const newSnap2 = newSnap.team1map;
  //   console.log('snapshot.postRefMapTeam1 => ', newSnap2);
  //   snapshot.newSnap2.remove();
  // });

  // $('#delMap').on('click', function () {
  //   postRefMapTeam1.remove();
  // });

  teams.forEach((warComment, ind) => {
    const warCardWrapper = document.querySelectorAll('.match-detail');

    const commentMatch = document.createElement('div');
    commentMatch.classList.add('comment-match');
    commentMatch.dataset.match = `${teams.length - ind}`;

    const commentForm = document.createElement('form');
    commentForm.setAttribute(`id`, `comment${teams.length - ind}`);
    commentForm.classList.add('comment-form');
    commentMatch.appendChild(commentForm);

    const labelMessage = document.createElement('label');
    labelMessage.setAttribute('for', 'message');
    labelMessage.innerHTML = 'Message*';
    commentForm.appendChild(labelMessage);

    const textareaMessage = document.createElement('textarea');
    textareaMessage.setAttribute('id', `message${teams.length - ind}`);
    textareaMessage.required = true;
    commentForm.appendChild(textareaMessage);

    const labelName = document.createElement('label');
    labelName.setAttribute('for', 'name');
    labelName.innerHTML = 'Name*';
    commentForm.appendChild(labelName);

    const inputName = document.createElement('input');
    inputName.setAttribute('type', 'text');
    inputName.setAttribute('id', `name${teams.length - ind}`);
    inputName.required = true;
    commentForm.appendChild(inputName);

    const labelEmail = document.createElement('label');
    labelEmail.setAttribute('for', 'email');
    labelEmail.innerHTML = 'E-mail';
    commentForm.appendChild(labelEmail);

    const inputEmail = document.createElement('input');
    inputEmail.setAttribute('type', 'text');
    inputEmail.setAttribute('id', `email${teams.length - ind}`);
    commentForm.appendChild(inputEmail);

    const inputSubmit = document.createElement('input');
    inputSubmit.setAttribute('type', 'submit');
    inputSubmit.setAttribute('value', 'Post Comment');
    inputSubmit.setAttribute('id', `submit-${teams.length - ind}`);
    commentForm.appendChild(inputSubmit);

    const commentsContainer = document.createElement('div');
    commentsContainer.setAttribute('id', `comments-container${teams.length - ind}`);
    commentsContainer.classList.add('comments-container');
    commentMatch.appendChild(commentsContainer);

    const postComments = rootRef.child(`postComments${teams.length - ind}`);
    const linkComment = window.location.pathname;
    const pathkey = decodeURI(linkComment.replace(new RegExp('\\/|\\.', 'g'), '_'));

    const postRef = postComments.child(pathkey);

    warCardWrapper.forEach((el, i) => {
      if (el.dataset.match === commentMatch.dataset.match) {
        el.appendChild(commentMatch);
      }
    });

    $(`#comment${teams.length - ind}`).submit(function () {
      JSON.parse(
        JSON.stringify(
          postRef.push().set({
            name: $(`#name${teams.length - ind}`).val(),
            message: $(`#message${teams.length - ind}`).val(),
            email: $(`#email${teams.length - ind}`).val(),
            postedAt: firebase.database.ServerValue.TIMESTAMP,
          }),
        ),
      );
      $('input[type=text], textarea').val('');
      return false;
    });

    postRef.on('child_added', function (snapshot) {
      const newComment = snapshot.val();
      let html = `<div class='comment comment${teams.length - ind}' data-comment='${teams.length - ind}'>`;
      html += '<div class="comment--left">';
      html += '<h4><a href="mailto:' + newComment.email + '">' + newComment.name + '</a></h4>';
      // html += "<div class='profile-image'><img src='https://www.gravatar.com/avatar/" + newComment.email + "?s100&d=retro'/></div>";
      html += "<span class='date'>" + $.timeago(newComment.postedAt) + '</span></div>';
      html += '<div class="comment--right">' + newComment.message + '</div></div>';
      $(`#comments-container${teams.length - ind}`).prepend(html);
      const countComments = document.querySelectorAll(`.comment${teams.length - ind}`);
      document.querySelector(`.comment-info${teams.length - ind}`).innerHTML = `<a title="Leave a comment to match #${
        teams.length - ind
      }" href="#match-${teams.length - ind}"><div class="counter-comments">${
        countComments.length
      }</div><div class="counter-icon"><i class="far fa-comment-dots"></i></div></a>`;
    });
  });
  // });

  const matchNodeList = document.querySelectorAll('.warmatch.match');
  const matchArr = Array.prototype.slice.call(matchNodeList);
  for (let i = 0; i < matchArr.length; i++) {
    const resultT1 = Number(parseInt(matchArr[i].children[1].children[0].innerHTML, 10));
    const resultT2 = Number(parseInt(matchArr[i].children[2].children[0].innerHTML, 10));

    const parentResultT1 = matchArr[i].children[1];
    const parentResultT2 = matchArr[i].children[2];

    if (resultT1 > resultT2) {
      parentResultT1.classList.add('bg__green');
      parentResultT2.classList.add('bg__red');
    } else if (resultT1 < resultT2) {
      parentResultT1.classList.add('bg__red');
      parentResultT2.classList.add('bg__green');
    } else {
      parentResultT1.classList.add('bg__gray');
      parentResultT2.classList.add('bg__gray');
    }
  }

  const matchNodeListSingle = document.querySelectorAll('.match-single');
  const matchArrSingle = Array.prototype.slice.call(matchNodeListSingle);
  for (let i = 0; i < matchArrSingle.length; i++) {
    const resultT1Single = Number(parseInt(matchArrSingle[i].children[1].children[0].innerHTML, 10));
    const resultT2Single = Number(parseInt(matchArrSingle[i].children[2].children[0].innerHTML, 10));

    const parentResultT1Single = matchArrSingle[i].children[1];
    const parentResultT2Single = matchArrSingle[i].children[2];

    if (resultT1Single > resultT2Single) {
      parentResultT1Single.classList.add('bg__green');
      parentResultT2Single.classList.add('bg__red');
    } else if (resultT1Single < resultT2Single) {
      parentResultT1Single.classList.add('bg__red');
      parentResultT2Single.classList.add('bg__green');
    } else {
      parentResultT1Single.classList.add('bg__gray');
      parentResultT2Single.classList.add('bg__gray');
    }
  }

  const matchNodeListNo = document.querySelectorAll('.nomatch-video');
  const matchArrNo = Array.prototype.slice.call(matchNodeListNo);
  for (let i = 0; i < matchArrNo.length; i++) {
    const resultT1no = Number(parseInt(matchArrNo[i].children[1].children[0].innerHTML, 10));
    const resultT2no = Number(parseInt(matchArrNo[i].children[2].children[0].innerHTML, 10));

    const parentResultT1no = matchArrNo[i].children[1];
    const parentResultT2no = matchArrNo[i].children[2];

    if (resultT1no > resultT2no) {
      parentResultT1no.classList.add('bg__green');
      parentResultT2no.classList.add('bg__red');
    } else if (resultT1no < resultT2no) {
      parentResultT1no.classList.add('bg__red');
      parentResultT2no.classList.add('bg__green');
    } else {
      parentResultT1no.classList.add('bg__gray');
      parentResultT2no.classList.add('bg__gray');
    }
  }

  const diff = document.querySelectorAll('.difference');
  diff.forEach(function (elem) {
    if (Number(parseFloat(elem.innerHTML)) > 0) {
      elem.classList.add('won');
    } else if (Number(parseFloat(elem.innerHTML)) < 0) {
      elem.classList.add('lost');
    } else {
      // nie dodawaj nic
    }
  });

  const pageSize = 10;
  let incremSlide = 100;
  let startPage = 0;
  let numberPage = 0;

  const pageCount = $('.warmatch').length / pageSize;
  const totalSlidepPage = Math.floor(pageCount / incremSlide);

  for (let i = 0; i < pageCount; i++) {
    $('#pagin').append('<li><a href="#history">' + (i + 1) + '</a></li>');
    if (i > pageSize) {
      $('#pagin li').eq(i).hide();
    }
  }

  const prev = $('<li/>')
    .addClass('prev')
    .html('Prev')
    .click(function () {
      startPage -= 5;
      incremSlide -= 5;
      numberPage--;
      slide();
    });
  prev.hide();

  const next = $('<li/>')
    .addClass('next')
    .html('Next')
    .click(function () {
      startPage += 5;
      incremSlide += 5;
      numberPage++;
      slide();
    });

  $('#pagin').prepend(prev).append(next);

  $('#pagin li').first().find('a').addClass('current');

  let slide = function (sens) {
    $('#pagin li').hide();

    for (let t = startPage; t < incremSlide; t++) {
      $('#pagin li')
        .eq(t + 1)
        .show();
    }

    if (startPage === 0) {
      next.show();
      prev.hide();
    } else if (numberPage === totalSlidepPage) {
      next.hide();
      prev.show();
    } else {
      next.show();
      prev.show();
    }
  };

  const showPage = function (page) {
    $('.warmatch').hide();
    $('.warmatch').each(function (n) {
      if (n >= pageSize * (page - 1) && n < pageSize * page) $(this).show();
    });
  };

  showPage(1);
  $('#pagin li a').eq(0).addClass('current');

  $('#pagin li a').click(function () {
    $('#pagin li a').removeClass('current');
    $(this).addClass('current');
    showPage(parseInt($(this).text(), 10));
  });
  // })();

  function addPlayerLink2(player, obj) {
    let convertedPlayer = '';
    obj.forEach((el) => {
      if (player === el.username) {
        convertedPlayer = `<a href="#charts-${el.username}">${el.playername}</a>`;
      } else if (player === '') {
        // console.log('N/A player');
      } else {
        // console.log('Something went wrong.');
      }
    });
    return convertedPlayer;
  }

  function getFromInactive2(player, obj) {
    let mockInactive = '';
    obj.forEach((el) => {
      if (player === el.username) {
        mockInactive = `<a href="#charts-${el.username}">${el.playername}</a>`;
      } else if (player === '') {
        // console.log('N/A player');
      } else {
        // console.log('Something went wrong.');
      }
    });
    return mockInactive;
  }
}
