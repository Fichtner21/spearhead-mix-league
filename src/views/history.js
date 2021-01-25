import drive from 'drive-db';
import $ from 'jquery';
import firebase from 'firebase';
import timeago from 'timeago';

export function history() {
  (async () => {
    // Load the data from the Drive Spreadsheet
    const historyMatches = await drive({
      sheet: '1w_WHqCutkp_S6KveKyu4mNaG76C5dIlDwKw-A-dEOLo',
      tab: '4',
    });

    const playersTab = await drive({
      sheet: '1w_WHqCutkp_S6KveKyu4mNaG76C5dIlDwKw-A-dEOLo',
      tab: '1',
    });

    const inactivePlayers = await drive({
      sheet: '1w_WHqCutkp_S6KveKyu4mNaG76C5dIlDwKw-A-dEOLo',
      tab: '7',
    });

    historyMatches.reverse();

    const teams = historyMatches.map((entry) => entry);

    const newObj = teams.map((obj) => {
      return {
        ...obj,
        t1p1preelo: Number(parseFloat(obj.t1p1preelo, 10).toFixed(2) === 'NaN') ? ' - ' : Number(parseFloat(obj.t1p1preelo, 10).toFixed(2)),
        t1p1postelo: Number(parseFloat(obj.t1p1postelo, 10).toFixed(2) === 'NaN')
          ? ' - '
          : Number(parseFloat(obj.t1p1postelo, 10).toFixed(2)),
        t1p2preelo: Number(parseFloat(obj.t1p2preelo, 10).toFixed(2) === 'NaN') ? ' - ' : Number(parseFloat(obj.t1p2preelo, 10).toFixed(2)),
        t1p2postelo: Number(parseFloat(obj.t1p2postelo, 10).toFixed(2) === 'NaN')
          ? ' - '
          : Number(parseFloat(obj.t1p2postelo, 10).toFixed(2)),
        t1p3preelo: Number(parseFloat(obj.t1p3preelo, 10).toFixed(2) === 'NaN') ? ' - ' : Number(parseFloat(obj.t1p3preelo, 10).toFixed(2)),
        t1p3postelo: Number(parseFloat(obj.t1p3postelo, 10).toFixed(2) === 'NaN')
          ? ' - '
          : Number(parseFloat(obj.t1p3postelo, 10).toFixed(2)),
        t1p4preelo: Number(parseFloat(obj.t1p4preelo, 10).toFixed(2) === 'NaN') ? ' - ' : Number(parseFloat(obj.t1p4preelo, 10).toFixed(2)),
        t1p4postelo: Number(parseFloat(obj.t1p4postelo, 10).toFixed(2) === 'NaN')
          ? ' - '
          : Number(parseFloat(obj.t1p4postelo, 10).toFixed(2)),
        t1p5preelo: Number(parseFloat(obj.t1p5preelo, 10).toFixed(2) === 'NaN') ? ' - ' : Number(parseFloat(obj.t1p5preelo, 10).toFixed(2)),
        t1p5postelo: Number(parseFloat(obj.t1p5postelo, 10).toFixed(2) === 'NaN')
          ? ' - '
          : Number(parseFloat(obj.t1p5postelo, 10).toFixed(2)),
        t1p6preelo: Number(parseFloat(obj.t1p6preelo, 10).toFixed(2) === 'NaN') ? ' - ' : Number(parseFloat(obj.t1p6preelo, 10).toFixed(2)),
        t1p6postelo: Number(parseFloat(obj.t1p6postelo, 10).toFixed(2) === 'NaN')
          ? ' - '
          : Number(parseFloat(obj.t1p6postelo, 10).toFixed(2)),
        t1p7preelo: Number(parseFloat(obj.t1p7preelo, 10).toFixed(2) === 'NaN') ? ' - ' : Number(parseFloat(obj.t1p7preelo, 10).toFixed(2)),
        t1p7postelo: Number(parseFloat(obj.t1p7postelo, 10).toFixed(2) === 'NaN')
          ? ' - '
          : Number(parseFloat(obj.t1p7postelo, 10).toFixed(2)),
        t2p1preelo: Number(parseFloat(obj.t2p1preelo, 10).toFixed(2) === 'NaN') ? ' - ' : Number(parseFloat(obj.t2p1preelo, 10).toFixed(2)),
        t2p1postelo: Number(parseFloat(obj.t2p1postelo, 10).toFixed(2) === 'NaN')
          ? ' - '
          : Number(parseFloat(obj.t2p1postelo, 10).toFixed(2)),
        t2p2preelo: Number(parseFloat(obj.t2p2preelo, 10).toFixed(2) === 'NaN') ? ' - ' : Number(parseFloat(obj.t2p2preelo, 10).toFixed(2)),
        t2p2postelo: Number(parseFloat(obj.t2p2postelo, 10).toFixed(2) === 'NaN')
          ? ' - '
          : Number(parseFloat(obj.t2p2postelo, 10).toFixed(2)),
        t2p3preelo: Number(parseFloat(obj.t2p3preelo, 10).toFixed(2) === 'NaN') ? ' - ' : Number(parseFloat(obj.t2p3preelo, 10).toFixed(2)),
        t2p3postelo: Number(parseFloat(obj.t2p3postelo, 10).toFixed(2) === 'NaN')
          ? ' - '
          : Number(parseFloat(obj.t2p3postelo, 10).toFixed(2)),
        t2p4preelo: Number(parseFloat(obj.t2p4preelo, 10).toFixed(2) === 'NaN') ? ' - ' : Number(parseFloat(obj.t2p4preelo, 10).toFixed(2)),
        t2p4postelo: Number(parseFloat(obj.t2p4postelo, 10).toFixed(2) === 'NaN')
          ? ' - '
          : Number(parseFloat(obj.t2p4postelo, 10).toFixed(2)),
        t2p5preelo: Number(parseFloat(obj.t2p5preelo, 10).toFixed(2) === 'NaN') ? ' - ' : Number(parseFloat(obj.t2p5preelo, 10).toFixed(2)),
        t2p5postelo: Number(parseFloat(obj.t2p5postelo, 10).toFixed(2) === 'NaN')
          ? ' - '
          : Number(parseFloat(obj.t2p5postelo, 10).toFixed(2)),
        t2p6preelo: Number(parseFloat(obj.t2p6preelo, 10).toFixed(2) === 'NaN') ? ' - ' : Number(parseFloat(obj.t2p6preelo, 10).toFixed(2)),
        t2p6postelo: Number(parseFloat(obj.t2p6postelo, 10).toFixed(2) === 'NaN')
          ? ' - '
          : Number(parseFloat(obj.t2p6postelo, 10).toFixed(2)),
        t2p7preelo: Number(parseFloat(obj.t2p7preelo, 10).toFixed(2) === 'NaN') ? ' - ' : Number(parseFloat(obj.t2p7preelo, 10).toFixed(2)),
        t2p7postelo: Number(parseFloat(obj.t2p7postelo, 10).toFixed(2) === 'NaN')
          ? ' - '
          : Number(parseFloat(obj.t2p7postelo, 10).toFixed(2)),
      };
    });

    let value = '';

    const playerFromTab = playersTab.map((entry) => entry);
    function addPlayerLink(player) {
      let convertedPlayer = '';
      playerFromTab.forEach((el) => {
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

    const lastMatch = document.getElementById('last-match');

    let lastMatchInfo = `<div class="last">Last match: #${teams.length} `;
    lastMatchInfo += `<div class="last-match-timestamp"> ${teams[0].timestamp}</div>`;
    lastMatchInfo += `<div class="last-match-team">`;
    lastMatchInfo += `<div class="last-match-player last-match-t1-player">    
    <div class="name">${addPlayerLink(teams[0].t1p1name)}</div>
    <div class="score">${teams[0].t1p1score}</div>    
    <div class="difference-last">${Number(parseFloat(teams[0].t1p1postelo - teams[0].t1p1preelo).toFixed(2))}</div>
    </div>`;
    lastMatchInfo += `${
      teams[0].t1p2name
        ? `<div class="last-match-player last-match-t1-player">    
    <div class="name">${addPlayerLink(teams[0].t1p2name)}</div>
    <div class="score">${teams[0].t1p2score}</div>    
    <div class="difference-last">${Number(parseFloat(teams[0].t1p2postelo - teams[0].t1p2preelo).toFixed(2))}</div>
    </div>`
        : ''
    }`;
    lastMatchInfo += `${
      teams[0].t1p3name
        ? `<div class="last-match-player last-match-t1-player">    
    <div class="name">${addPlayerLink(teams[0].t1p3name)}</div>
    <div class="score">${teams[0].t1p3score}</div>    
    <div class="difference-last">${Number(parseFloat(teams[0].t1p3postelo - teams[0].t1p3preelo).toFixed(2))}</div>
    </div>`
        : ''
    }`;
    lastMatchInfo += `${
      teams[0].t1p4name
        ? `<div class="last-match-player last-match-t1-player">    
    <div class="name">${addPlayerLink(teams[0].t1p4name)}</div>
    <div class="score">${teams[0].t1p4score}</div>    
    <div class="difference-last">${Number(parseFloat(teams[0].t1p4postelo - teams[0].t1p4preelo).toFixed(2))}</div>
    </div>`
        : ''
    }`;
    lastMatchInfo += `${
      teams[0].t1p5name
        ? `<div class="last-match-player last-match-t1-player">    
    <div class="name">${addPlayerLink(teams[0].t1p5name)}</div>
    <div class="score">${teams[0].t1p5score}</div>    
    <div class="difference-last">${Number(parseFloat(teams[0].t1p5postelo - teams[0].t1p5preelo).toFixed(2))}</div>
    </div>`
        : ''
    }`;
    lastMatchInfo += `${
      teams[0].t1p6name
        ? `<div class="last-match-player last-match-t1-player">    
    <div class="name">${addPlayerLink(teams[0].t1p6name)}</div>
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
    <div class="name">${addPlayerLink(teams[0].t2p1name)}</div>
    <div class="score">${teams[0].t2p1score}</div>    
    <div class="difference-last">${
      teams[0].t2p1preelo ? Number(parseFloat(teams[0].t2p1postelo - teams[0].t2p1preelo).toFixed(2)) : ''
    }</div>
    </div>`;
    lastMatchInfo += `${
      teams[0].t2p2name
        ? `<div class="last-match-player last-match-t2-player">    
    <div class="name">${addPlayerLink(teams[0].t2p2name)}</div>
    <div class="score">${teams[0].t2p2score}</div>    
    <div class="difference-last">${Number(parseFloat(teams[0].t2p2postelo - teams[0].t2p2preelo).toFixed(2))}</div>
    </div>`
        : ''
    }`;
    lastMatchInfo += `${
      teams[0].t2p3name
        ? `<div class="last-match-player last-match-t2-player">    
    <div class="name">${addPlayerLink(teams[0].t2p3name)}</div>
    <div class="score">${teams[0].t2p3score}</div>    
    <div class="difference-last">${Number(parseFloat(teams[0].t2p3postelo - teams[0].t2p3preelo).toFixed(2))}</div>
    </div>`
        : ''
    }`;
    lastMatchInfo += `${
      teams[0].t2p4name
        ? `<div class="last-match-player last-match-t2-player">    
    <div class="name">${addPlayerLink(teams[0].t2p4name)}</div>
    <div class="score">${teams[0].t2p4score}</div>    
    <div class="difference-last">${Number(parseFloat(teams[0].t2p4postelo - teams[0].t2p4preelo).toFixed(2))}</div>
    </div>`
        : ''
    }`;
    lastMatchInfo += `${
      teams[0].t2p5name
        ? `<div class="last-match-player last-match-t2-player">    
    <div class="name">${addPlayerLink(teams[0].t2p5name)}</div>
    <div class="score">${teams[0].t2p5score}</div>    
    <div class="difference-last">${Number(parseFloat(teams[0].t2p5postelo - teams[0].t2p5preelo).toFixed(2))}</div>
    </div>`
        : ''
    }`;
    lastMatchInfo += `${
      teams[0].t2p6name
        ? `<div class="last-match-player last-match-t2-player">    
    <div class="name">${addPlayerLink(teams[0].t2p6name)}</div>
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

    const playerInactiveTag = inactivePlayers.map((entry) => entry);
    function getFromInactive(player) {
      let mockInactive = '';
      playerInactiveTag.forEach((el) => {
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

    // console.log(newObj[4]);

    newObj.forEach((match, i) => {
      value += `<div class="warmatch ${match.video ? `match` : `nomatch-video`}" id="match${newObj.length - i}">          
          <div class="date">
            <div class="matchId" id="matchId-${newObj.length - i}">
              <a href="#match-${newObj.length - i}">#${newObj.length - i}</a></div>
            <div class="dateDetail">${match.timestamp}</div>            
              ${
                match.video
                  ? `<a href="#match-${
                      newObj.length - i
                    }" title="Watch movie from match."><div class="matchVideo"><i class="fas fa-film"></i></div></a>`
                  : ''
              }  
            <div class="comment-info comment-info${newObj.length - i}" data-war="${newObj.length - i}"></div>                     
          </div>          
          <div class="team">
            <div class="roudswon1">${match.t1roundswon}</div>
            <div class="players">

              <div class="player">
                <div class="preelo">${match.t1p1preelo}</div>
                <div class="name">${addPlayerLink(match.t1p1name) ? addPlayerLink(match.t1p1name) : getFromInactive(match.t1p1name)}</div>
                <div class="score">${match.t1p1score}</div>
                <div class="postelo">${match.t1p1postelo}</div>
                <div class="difference">${Number(parseFloat(match.t1p1postelo - match.t1p1preelo).toFixed(2))}
                </div>
              </div>

              <div class="player">
                <div class="preelo">${match.t1p2preelo}</div>
                <div class="name">${addPlayerLink(match.t1p2name) ? addPlayerLink(match.t1p2name) : getFromInactive(match.t1p2name)}</div>
                <div class="score">${match.t1p2score}</div>
                <div class="postelo">${match.t1p2postelo}</div>
                <div class="difference">${
                  Number(parseFloat(match.t1p2postelo - match.t1p2preelo).toFixed(2) === 'NaN')
                    ? ''
                    : Number(parseFloat(match.t1p2postelo - match.t1p2preelo).toFixed(2))
                }
                </div>
              </div>

              <div class="player">
                <div class="preelo">${match.t1p3preelo}</div>
                <div class="name">${addPlayerLink(match.t1p3name) ? addPlayerLink(match.t1p3name) : getFromInactive(match.t1p3name)}</div>
                <div class="score">${match.t1p3score}</div>
                <div class="postelo">${match.t1p3postelo}</div>
                <div class="difference">${
                  Number(parseFloat(match.t1p3postelo - match.t1p3preelo).toFixed(2) === 'NaN')
                    ? ''
                    : Number(parseFloat(match.t1p3postelo - match.t1p3preelo).toFixed(2))
                }
                </div>
              </div>

              <div class="player">
                <div class="preelo">${match.t1p4preelo}</div>
                <div class="name">${addPlayerLink(match.t1p4name) ? addPlayerLink(match.t1p4name) : getFromInactive(match.t1p4name)}</div>
                <div class="score">${match.t1p4score}</div>
                <div class="postelo">${match.t1p4postelo}</div>
                <div class="difference">${
                  Number(parseFloat(match.t1p4postelo - match.t1p4preelo).toFixed(2) === 'NaN')
                    ? ''
                    : Number(parseFloat(match.t1p4postelo - match.t1p4preelo).toFixed(2))
                }
                </div>
              </div>

              <div class="player">
                <div class="preelo">${match.t1p5preelo}</div>
                <div class="name">${addPlayerLink(match.t1p5name) ? addPlayerLink(match.t1p5name) : getFromInactive(match.t1p5name)}</div>
                <div class="score">${match.t1p5score}</div>
                <div class="postelo">${match.t1p5postelo}</div>
                <div class="difference">${
                  Number(parseFloat(match.t1p5postelo - match.t1p5preelo).toFixed(2) === 'NaN')
                    ? ''
                    : Number(parseFloat(match.t1p5postelo - match.t1p5preelo).toFixed(2))
                }
                </div>
              </div>
              ${
                match.t1p6name
                  ? `<div class="player">
                <div class="preelo">${match.t1p6preelo}</div>
                <div class="name">${addPlayerLink(match.t1p6name) ? addPlayerLink(match.t1p6name) : getFromInactive(match.t1p6name)}</div>
                <div class="score">${match.t1p6score}</div>
                <div class="postelo">${match.t1p6postelo}</div>
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
                  <div class="preelo">${match.t1p7preelo}</div>
                  <div class="name">${addPlayerLink(match.t1p7name) ? addPlayerLink(match.t1p7name) : getFromInactive(match.t1p7name)}</div>
                  <div class="score">${match.t1p7score}</div>
                  <div class="postelo">${match.t1p7postelo}</div>
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
                <div class="preelo">${match.t2p1preelo}</div>
                <div class="name">${addPlayerLink(match.t2p1name) ? addPlayerLink(match.t2p1name) : getFromInactive(match.t2p1name)}</div>
                <div class="score">${match.t2p1score}</div>
                <div class="postelo">${match.t2p1postelo}</div>
                <div class="difference">${
                  Number(parseFloat(match.t2p1postelo - match.t2p1preelo).toFixed(2) === 'NaN')
                    ? ''
                    : Number(parseFloat(match.t2p1postelo - match.t2p1preelo).toFixed(2))
                }
                </div>
              </div>
              <div class="player">    
                <div class="preelo">${match.t2p2preelo}</div>
                <div class="name">${addPlayerLink(match.t2p2name) ? addPlayerLink(match.t2p2name) : getFromInactive(match.t2p2name)}</div>
                <div class="score">${match.t2p2score}</div>
                <div class="postelo">${match.t2p2postelo}</div>
                <div class="difference">${
                  Number(parseFloat(match.t2p2postelo - match.t2p2preelo).toFixed(2) === 'NaN')
                    ? ''
                    : Number(parseFloat(match.t2p2postelo - match.t2p2preelo).toFixed(2))
                }
                </div>
              </div>
              <div class="player">
                <div class="preelo">${match.t2p3preelo}</div>
                <div class="name">${addPlayerLink(match.t2p3name) ? addPlayerLink(match.t2p3name) : getFromInactive(match.t2p3name)}</div>
                <div class="score">${match.t2p3score}</div>
                <div class="postelo">${match.t2p3postelo}</div>
                <div class="difference">${
                  Number(parseFloat(match.t2p3postelo - match.t2p3preelo).toFixed(2) === 'NaN')
                    ? ''
                    : Number(parseFloat(match.t2p3postelo - match.t2p3preelo).toFixed(2))
                }
                </div>
              </div>
              <div class="player">
                <div class="preelo">${match.t2p4preelo}</div>
                <div class="name">${addPlayerLink(match.t2p4name) ? addPlayerLink(match.t2p4name) : getFromInactive(match.t2p4name)}</div>
                <div class="score">${match.t2p4score}</div>
                <div class="postelo">${match.t2p4postelo}</div>
                <div class="difference">${
                  Number(parseFloat(match.t2p4postelo - match.t2p4preelo).toFixed(2) === 'NaN')
                    ? ''
                    : Number(parseFloat(match.t2p4postelo - match.t2p4preelo).toFixed(2))
                }
                </div>
              </div>
              <div class="player">
                <div class="preelo">${match.t2p5preelo}</div>
                <div class="name">${addPlayerLink(match.t2p5name) ? addPlayerLink(match.t2p5name) : getFromInactive(match.t2p5name)}</div>
                <div class="score">${match.t2p5score}</div>
                <div class="postelo">${match.t2p5postelo}</div>
                <div class="difference">${
                  Number(parseFloat(match.t2p5postelo - match.t2p5preelo).toFixed(2) === 'NaN')
                    ? ''
                    : Number(parseFloat(match.t2p5postelo - match.t2p5preelo).toFixed(2))
                }
                </div>
              </div> 
              ${
                match.t2p6name
                  ? `<div class="player">
                      <div class="preelo">${match.t2p6preelo}</div>
                      <div class="name">${
                        addPlayerLink(match.t2p6name) ? addPlayerLink(match.t2p6name) : getFromInactive(match.t2p6name)
                      }</div>
                      <div class="score">${match.t2p6score}</div>
                      <div class="postelo">${match.t2p6postelo}</div>
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
                        <div class="preelo">${match.t2p7preelo}</div>
                        <div class="name">${
                          addPlayerLink(match.t2p7name) ? addPlayerLink(match.t2p7name) : getFromInactive(match.t2p7name)
                        }</div>
                        <div class="score">${match.t2p7score}</div>
                        <div class="postelo">${match.t2p7postelo}</div>
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
                ? `<div class="thumbnail" id="thumbnail-${newObj.length - i}"><iframe 
            id="ytplayer-${newObj.length - i}"
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
    });

    document.getElementById('matches').innerHTML = value;

    const ourMatches = document.getElementById('our-matches2');

    ourMatches.innerHTML = ` ${teams.length}`;

    const mainApp2 = document.getElementById('app');
    newObj.forEach((war, i) => {
      const warCard = document.createElement('div');
      warCard.classList.add('container', 'view', 'hidden', 'warcard');
      warCard.setAttribute('id', `match-${newObj.length - i}`);
      const warCardWrapper = document.createElement('div');
      warCardWrapper.classList.add('wrapper');
      warCard.appendChild(warCardWrapper);
      const warCardDetail = document.createElement('div');
      warCardDetail.classList.add('match-detail');
      warCardDetail.dataset.match = `${newObj.length - i}`;
      warCardDetail.innerHTML += `<div class="match-details">
      <div class="">Match #${newObj.length - i}</div> 
      <div class="info">Info: ${war.info}</div>
        <div class="match-single">
          <div class="date">
              <div class="matchId" id="matchId-${newObj.length - i}">
                <a href="#match-${newObj.length - i}">#${newObj.length - i}</a></div>
              <div class="dateDetail">${war.timestamp}</div>            
                ${
                  war.video
                    ? `<a href="#match-${
                        newObj.length - i
                      }" title="Watch movie from match."><div class="matchVideo"><i class="fas fa-film"></i></div></a>`
                    : ''
                }  
              <div class="comment-info comment-info${newObj.length - i}" data-war="${newObj.length - i}"></div>                     
          </div>
          <div class="team">
            <div class="roudswon1">${war.t1roundswon}</div>
            <div class="players">            
              <div class="player">
                <div class="preelo">${war.t1p1preelo}</div>
                <div class="name">${addPlayerLink(war.t1p1name)}</div>
                <div class="score">${war.t1p1score}</div>
                <div class="postelo">${war.t1p1postelo}</div>
                <div class="difference">${Number(parseFloat(war.t1p1postelo - war.t1p1preelo).toFixed(2))}</div>
              </div>
              <div class="player">
                <div class="preelo">${war.t1p2preelo}</div>
                <div class="name">${addPlayerLink(war.t1p2name)}</div>
                <div class="score">${war.t1p2score}</div>
                <div class="postelo">${war.t1p2postelo}</div>
                <div class="difference">${Number(parseFloat(war.t1p2postelo - war.t1p2preelo).toFixed(2))}</div>
              </div>
              <div class="player">
                <div class="preelo">${war.t1p3preelo}</div>
                <div class="name">${addPlayerLink(war.t1p3name)}</div>
                <div class="score">${war.t1p3score}</div>
                <div class="postelo">${war.t1p3postelo}</div>
                <div class="difference">${
                  Number(parseFloat(war.t1p3postelo - war.t1p3preelo).toFixed(2))
                    ? Number(parseFloat(war.t1p3postelo - war.t1p3preelo).toFixed(2))
                    : ''
                }
                </div>
              </div>
              <div class="player">
                <div class="preelo">${war.t1p4preelo}</div>
                <div class="name">${addPlayerLink(war.t1p4name)}</div>
                <div class="score">${war.t1p4score}</div>
                <div class="postelo">${war.t1p4postelo}</div>
                <div class="difference">${
                  Number(parseFloat(war.t1p4postelo - war.t1p4preelo).toFixed(2))
                    ? Number(parseFloat(war.t1p4postelo - war.t1p4preelo).toFixed(2))
                    : ''
                }</div>
              </div>
              <div class="player">
                <div class="preelo">${war.t1p5preelo}</div>
                <div class="name">${addPlayerLink(war.t1p5name)}</div>
                <div class="score">${war.t1p5score}</div>
                <div class="postelo">${war.t1p5postelo}</div>
                <div class="difference">${
                  Number(parseFloat(war.t1p5postelo - war.t1p5preelo).toFixed(2))
                    ? Number(parseFloat(war.t1p5postelo - war.t1p5preelo).toFixed(2))
                    : ''
                }</div>
              </div>
              ${
                war.t1p6name
                  ? `<div class="player">
                <div class="preelo">${war.t1p6preelo}</div>
                <div class="name">${addPlayerLink(war.t1p6name)}</div>
                <div class="score">${war.t1p6score}</div>
                <div class="postelo">${war.t1p6postelo}</div>
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
                <div class="preelo">${war.t1p7preelo}</div>
                <div class="name">${addPlayerLink(war.t1p7name)}</div>
                <div class="score">${war.t1p7score}</div>
                <div class="postelo">${war.t1p7postelo}</div>
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
              <div class="preelo">${war.t2p1preelo}</div>
              <div class="name">${addPlayerLink(war.t2p1name)}</div>
              <div class="score">${war.t2p1score}</div>
              <div class="postelo">${war.t2p1postelo}</div>
              <div class="difference">${Number(parseFloat(war.t2p1postelo - war.t2p1preelo).toFixed(2))}
              </div>
            </div>
            <div class="player">
              <div class="preelo">${war.t2p2preelo}</div>
              <div class="name">${addPlayerLink(war.t2p2name)}</div>
              <div class="score">${war.t2p2score}</div>
              <div class="postelo">${war.t2p2postelo}</div>
              <div class="difference">${
                Number(parseFloat(war.t2p2postelo - war.t2p2preelo).toFixed(2))
                  ? Number(parseFloat(war.t2p2postelo - war.t2p2preelo).toFixed(2))
                  : ''
              }
              </div>
            </div>
            <div class="player">
              <div class="preelo">${war.t2p3preelo}</div>
              <div class="name">${addPlayerLink(war.t2p3name)}</div>
              <div class="score">${war.t2p3score}</div>
              <div class="postelo">${war.t2p3postelo}</div>
              <div class="difference">${
                Number(parseFloat(war.t2p3postelo - war.t2p3preelo).toFixed(2))
                  ? Number(parseFloat(war.t2p3postelo - war.t2p3preelo).toFixed(2))
                  : ''
              }
              </div>
            </div>
            <div class="player">
              <div class="preelo">${war.t2p4preelo}</div>
              <div class="name">${addPlayerLink(war.t2p4name)}</div>
              <div class="score">${war.t2p4score}</div>
              <div class="postelo">${war.t2p4postelo}</div>
              <div class="difference">${
                Number(parseFloat(war.t2p4postelo - war.t2p4preelo).toFixed(2))
                  ? Number(parseFloat(war.t2p4postelo - war.t2p4preelo).toFixed(2))
                  : ''
              }
              </div>
            </div>
            <div class="player">
              <div class="preelo">${war.t2p5preelo}</div>
              <div class="name">${addPlayerLink(war.t2p5name)}</div>
              <div class="score">${war.t2p5score}</div>
              <div class="postelo">${war.t2p5postelo}</div>
              <div class="difference">${
                Number(parseFloat(war.t2p5postelo - war.t2p5preelo).toFixed(2))
                  ? Number(parseFloat(war.t2p5postelo - war.t2p5preelo).toFixed(2))
                  : ''
              }
              </div>
            </div>
            ${
              war.t2p6name
                ? `<div class="player">
              <div class="preelo">${war.t2p6preelo}</div>
              <div class="name">${addPlayerLink(war.t2p6name)}</div>
              <div class="score">${war.t2p6score}</div>
              <div class="postelo">${war.t2p6postelo}</div>
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
              <div class="preelo">${war.t2p7preelo}</div>
              <div class="name">${addPlayerLink(war.t2p7name)}</div>
              <div class="score">${war.t2p7score}</div>
              <div class="postelo">${war.t2p7postelo}</div>
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

    $.getScript('https://www.gstatic.com/firebasejs/3.4.0/firebase.js', function () {
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

      newObj.forEach((warComment, ind) => {
        const warCardWrapper = document.querySelectorAll('.match-detail');

        const commentMatch = document.createElement('div');
        commentMatch.classList.add('comment-match');
        commentMatch.dataset.match = `${newObj.length - ind}`;

        const commentForm = document.createElement('form');
        commentForm.setAttribute(`id`, `comment${newObj.length - ind}`);
        commentForm.classList.add('comment-form');
        commentMatch.appendChild(commentForm);

        const labelMessage = document.createElement('label');
        labelMessage.setAttribute('for', 'message');
        labelMessage.innerHTML = 'Message*';
        commentForm.appendChild(labelMessage);

        const textareaMessage = document.createElement('textarea');
        textareaMessage.setAttribute('id', `message${newObj.length - ind}`);
        textareaMessage.required = true;
        commentForm.appendChild(textareaMessage);

        const labelName = document.createElement('label');
        labelName.setAttribute('for', 'name');
        labelName.innerHTML = 'Name*';
        commentForm.appendChild(labelName);

        const inputName = document.createElement('input');
        inputName.setAttribute('type', 'text');
        inputName.setAttribute('id', `name${newObj.length - ind}`);
        inputName.required = true;
        commentForm.appendChild(inputName);

        const labelEmail = document.createElement('label');
        labelEmail.setAttribute('for', 'email');
        labelEmail.innerHTML = 'E-mail';
        commentForm.appendChild(labelEmail);

        const inputEmail = document.createElement('input');
        inputEmail.setAttribute('type', 'text');
        inputEmail.setAttribute('id', `email${newObj.length - ind}`);
        commentForm.appendChild(inputEmail);

        const inputSubmit = document.createElement('input');
        inputSubmit.setAttribute('type', 'submit');
        inputSubmit.setAttribute('value', 'Post Comment');
        inputSubmit.setAttribute('id', `submit-${newObj.length - ind}`);
        commentForm.appendChild(inputSubmit);

        const commentsContainer = document.createElement('div');
        commentsContainer.setAttribute('id', `comments-container${newObj.length - ind}`);
        commentsContainer.classList.add('comments-container');
        commentMatch.appendChild(commentsContainer);

        const postComments = rootRef.child(`postComments${newObj.length - ind}`);
        const linkComment = window.location.pathname;
        const pathkey = decodeURI(linkComment.replace(new RegExp('\\/|\\.', 'g'), '_'));

        const postRef = postComments.child(pathkey);

        warCardWrapper.forEach((el, i) => {
          if (el.dataset.match === commentMatch.dataset.match) {
            el.appendChild(commentMatch);
          }
        });

        $(`#comment${newObj.length - ind}`).submit(function () {
          JSON.parse(
            JSON.stringify(
              postRef.push().set({
                name: $(`#name${newObj.length - ind}`).val(),
                message: $(`#message${newObj.length - ind}`).val(),
                email: $(`#email${newObj.length - ind}`).val(),
                postedAt: firebase.database.ServerValue.TIMESTAMP,
              }),
            ),
          );
          $('input[type=text], textarea').val('');
          return false;
        });

        postRef.on('child_added', function (snapshot) {
          const newComment = snapshot.val();
          let html = `<div class='comment comment${newObj.length - ind}' data-comment='${newObj.length - ind}'>`;
          html += '<div class="comment--left">';
          html += '<h4><a href="mailto:' + newComment.email + '">' + newComment.name + '</a></h4>';
          // html += "<div class='profile-image'><img src='https://www.gravatar.com/avatar/" + newComment.email + "?s100&d=retro'/></div>";
          html += "<span class='date'>" + $.timeago(newComment.postedAt) + '</span></div>';
          html += '<div class="comment--right">' + newComment.message + '</div></div>';
          $(`#comments-container${newObj.length - ind}`).prepend(html);
          const countComments = document.querySelectorAll(`.comment${newObj.length - ind}`);
          document.querySelector(`.comment-info${newObj.length - ind}`).innerHTML = `<a title="Leave a comment to match #${
            newObj.length - ind
          }" href="#match-${newObj.length - ind}"><div class="counter-comments">${
            countComments.length
          }</div><div class="counter-icon"><i class="far fa-comment-dots"></i></div></a>`;
        });
      });
    });

    const matchNodeList = document.querySelectorAll('.match');
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
    for (let i = 0; i < matchArr.length; i++) {
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
    for (let i = 0; i < matchArr.length; i++) {
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
  })();
}
