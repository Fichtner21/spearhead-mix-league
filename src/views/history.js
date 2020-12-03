import drive from 'drive-db';
import $ from 'jquery';
import Valine from 'valine';

export function history() {
  (async () => {
    // Load the data from the Drive Spreadsheet
    const historyMatches = await drive({
      sheet: '1w_WHqCutkp_S6KveKyu4mNaG76C5dIlDwKw-A-dEOLo',
      tab: '4',
    });

    historyMatches.reverse();

    const teams = historyMatches.map((entry) => entry);
    console.log(teams);

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
      };
    });

    let value = '';

    newObj.forEach((match, i) => {
      // for (let j = 0; j < 5; j++) {
      const yp = 'YOUR_PROBLEM';
      const zielony = 'Zielony';

      // TEAM 1
      switch (match.t1p1name) {
        case 'ryba': {
          match.t1p1name = 'rybA';
          break;
        }
        case 'grabarz': {
          match.t1p1name = 'gRaBaRz';
          break;
        }
        case 'tomas': {
          match.t1p1name = 'Tomas';
          break;
        }
        case 'kapsel': {
          match.t1p1name = 'KaPsEL';
          break;
        }
        case 'your-problem': {
          match.t1p1name = yp;
          break;
        }
        case 'illusion': {
          match.t1p1name = '-Illu$ioN-';
          break;
        }
        case 'baton': {
          match.t1p1name = 'bAtOn';
          break;
        }
        default: {
          console.log('nickname coverted invalid');
          break;
        }
      }
      switch (match.t1p2name) {
        case 'ryba': {
          match.t1p2name = 'rybA';
          break;
        }
        case 'grabarz': {
          match.t1p2name = 'gRaBaRz';
          break;
        }
        case 'tomas': {
          match.t1p2name = 'Tomas';
          break;
        }
        case 'kapsel': {
          match.t1p2name = 'KaPsEL';
          break;
        }
        case 'your-problem': {
          match.t1p2name = yp;
          break;
        }
        case 'illusion': {
          match.t1p2name = '-Illu$ioN-';
          break;
        }
        case 'baton': {
          match.t1p2name = 'bAtOn';
          break;
        }
        case 'jim': {
          match.t1p2name = 'Jim';
          break;
        }
        case 'moses': {
          match.t1p2name = 'MoSeS';
          break;
        }
        case 'zielak': {
          match.t1p2name = 'ZielakPr0';
          break;
        }
        case 'lechu': {
          match.t1p2name = 'Lechu';
          break;
        }
        case 'k4ps': {
          match.t1p2name = 'k4ps';
          break;
        }
        case 'belus': {
          match.t1p2name = 'Belu$';
          break;
        }
        case 'zielony': {
          match.t1p2name = zielony;
          break;
        }
        case '': {
          match.t1p2name = '';
          break;
        }
        default: {
          console.log('nickname coverted invalid');
          break;
        }
      }
      switch (match.t1p3name) {
        case 'ryba': {
          match.t1p3name = 'rybA';
          break;
        }
        case 'moses': {
          match.t1p3name = 'MoSeS';
          break;
        }
        case 'grabarz': {
          match.t1p3name = 'gRaBaRz';
          break;
        }
        case 'tomas': {
          match.t1p3name = 'Tomas';
          break;
        }
        case 'kapsel': {
          match.t1p3name = 'KaPsEL';
          break;
        }
        case 'josh': {
          match.t1p3name = 'josh';
          break;
        }
        case 'your-problem': {
          match.t1p3name = yp;
          break;
        }
        case 'illusion': {
          match.t1p3name = '-Illu$ioN-';
          break;
        }
        case 'baton': {
          match.t1p3name = 'bAtOn';
          break;
        }
        case 'dts': {
          match.t1p3name = 'DtS';
          break;
        }
        case 'belus': {
          match.t1p3name = 'Belu$';
          break;
        }
        case 'jim': {
          match.t1p3name = 'Jim';
          break;
        }
        case 'hwk': {
          match.t1p3name = 'Hwk';
          break;
        }
        case 'zielony': {
          match.t1p3name = zielony;
          break;
        }
        case '': {
          match.t1p3name = '';
          break;
        }
        default: {
          console.log('nickname coverted invalid');
          break;
        }
      }
      switch (match.t1p4name) {
        case 'ryba': {
          match.t1p4name = 'rybA';
          break;
        }
        case 'grabarz': {
          match.t1p4name = 'gRaBaRz';
          break;
        }
        case 'tomas': {
          match.t1p4name = 'Tomas';
          break;
        }
        case 'kapsel': {
          match.t1p4name = 'KaPsEL';
          break;
        }
        case 'your-problem': {
          match.t1p4name = yp;
          break;
        }
        case 'illusion': {
          match.t1p4name = '-Illu$ioN-';
          break;
        }
        case 'baton': {
          match.t1p4name = 'bAtOn';
          break;
        }
        case 'dts': {
          match.t1p4name = 'DtS';
          break;
        }
        case 'zielony': {
          match.t1p4name = zielony;
          break;
        }
        case 'zielak': {
          match.t1p4name = 'ZielakPr0';
          break;
        }
        case 'moses': {
          match.t1p4name = 'MoSeS';
          break;
        }
        case 'belus': {
          match.t1p4name = 'Belu$';
          break;
        }
        case 'wiggles': {
          match.t1p4name = 'Mr.Wiggles';
          break;
        }
        case 'jim': {
          match.t1p4name = 'Jim';
          break;
        }
        case '': {
          match.t1p4name = '';
          break;
        }
        default: {
          console.log('nickname coverted invalid');
          break;
        }
      }
      switch (match.t1p5name) {
        case 'ryba': {
          match.t1p5name = 'rybA';
          break;
        }
        case 'hwk': {
          match.t1p5name = 'Hwk';
          break;
        }
        case 'grabarz': {
          match.t1p5name = 'gRaBaRz';
          break;
        }
        case 'tomas': {
          match.t1p5name = 'Tomas';
          break;
        }
        case 'kapsel': {
          match.t1p5name = 'KaPsEL';
          break;
        }
        case 'your-problem': {
          match.t1p5name = yp;
          break;
        }
        case 'illusion': {
          match.t1p5name = '-Illu$ioN-';
          break;
        }
        case 'baton': {
          match.t1p5name = 'bAtOn';
          break;
        }
        case 'dts': {
          match.t1p5name = 'DtS';
          break;
        }
        case 'zielony': {
          match.t1p5name = zielony;
          break;
        }
        case 'zielak': {
          match.t1p5name = 'ZielakPr0';
          break;
        }
        case 'belus': {
          match.t1p5name = 'Belu$';
          break;
        }
        case 'moses': {
          match.t1p5name = 'MoSeS';
          break;
        }
        case '': {
          match.t1p5name = '';
          break;
        }
        default: {
          console.log('nickname coverted invalid');
          break;
        }
      }
      // TEAM 2 //
      switch (match.t2p1name) {
        case 'ryba': {
          match.t2p1name = 'rybA';
          break;
        }
        case 'josh': {
          match.t2p1name = 'josh';
          break;
        }
        case 'zielak': {
          match.t2p1name = 'ZielakPr0';
          break;
        }
        case 'grabarz': {
          match.t2p1name = 'gRaBaRz';
          break;
        }
        case 'tomas': {
          match.t2p1name = 'Tomas';
          break;
        }
        case 'kapsel': {
          match.t2p1name = 'KaPsEL';
          break;
        }
        case 'your-problem': {
          match.t2p1name = yp;
          break;
        }
        case 'illusion': {
          match.t2p1name = '-Illu$ioN-';
          break;
        }
        case 'baton': {
          match.t2p1name = 'bAtOn';
          break;
        }
        case 'belus': {
          match.t2p1name = 'Belu$';
          break;
        }
        case 'jim': {
          match.t2p1name = 'Jim';
          break;
        }
        case 'moses': {
          match.t2p1name = 'MoSeS';
          break;
        }
        case 'hwk': {
          match.t2p1name = 'Hwk';
          break;
        }
        default: {
          console.log('nickname coverted invalid');
          break;
        }
      }
      switch (match.t2p2name) {
        case 'ryba': {
          match.t2p2name = 'rybA';
          break;
        }
        case 'wiggles': {
          match.t2p2name = 'Mr.Wiggles';
          break;
        }
        case 'jim': {
          match.t2p2name = 'Jim';
          break;
        }
        case 'zielony': {
          match.t2p2name = zielony;
          break;
        }
        case 'aker': {
          match.t2p2name = 'Aker';
          break;
        }
        case 'hwk': {
          match.t2p2name = 'Hwk';
          break;
        }
        case 'grabarz': {
          match.t2p2name = 'gRaBaRz';
          break;
        }
        case 'tomas': {
          match.t2p2name = 'Tomas';
          break;
        }
        case 'kapsel': {
          match.t2p2name = 'KaPsEL';
          break;
        }
        case 'your-problem': {
          match.t2p2name = yp;
          break;
        }
        case 'illusion': {
          match.t2p2name = '-Illu$ioN-';
          break;
        }
        case 'baton': {
          match.t2p2name = 'bAtOn';
          break;
        }
        case 'belus': {
          match.t2p2name = 'Belu$';
          break;
        }
        case 'zielak': {
          match.t2p2name = 'ZielakPr0';
          break;
        }
        case 'moses': {
          match.t2p2name = 'MoSeS';
          break;
        }
        case '': {
          match.t2p2name = '';
          break;
        }
        default: {
          console.log('nickname coverted invalid');
          break;
        }
      }
      switch (match.t2p3name) {
        case 'ryba': {
          match.t2p3name = 'rybA';
          break;
        }
        case 'aker': {
          match.t2p3name = 'Aker';
          break;
        }
        case 'hwk': {
          match.t2p3name = 'Hwk';
          break;
        }
        case 'oprawca': {
          match.t2p3name = 'Oprawca';
          break;
        }
        case 'zielak': {
          match.t2p3name = 'ZielakPr0';
          break;
        }
        case 'grabarz': {
          match.t2p3name = 'gRaBaRz';
          break;
        }
        case 'tomas': {
          match.t2p3name = 'Tomas';
          break;
        }
        case 'kapsel': {
          match.t2p3name = 'KaPsEL';
          break;
        }
        case 'your-problem': {
          match.t2p3name = yp;
          break;
        }
        case 'illusion': {
          match.t2p3name = '-Illu$ioN-';
          break;
        }
        case 'ultrakiller': {
          match.t2p3name = 'Ultrakiller';
          break;
        }
        case 'baton': {
          match.t2p3name = 'bAtOn';
          break;
        }
        case 'belus': {
          match.t2p3name = 'Belu$';
          break;
        }
        case 'zielony': {
          match.t2p3name = zielony;
          break;
        }
        case 'moses': {
          match.t2p3name = 'MoSeS';
          break;
        }
        case 'dziadek': {
          match.t2p3name = '-insaNe! >';
          break;
        }
        case '': {
          match.t2p3name = '';
          break;
        }
        default: {
          console.log('nickname coverted invalid');
          break;
        }
      }
      switch (match.t2p4name) {
        case 'ryba': {
          match.t2p4name = 'rybA';
          break;
        }
        case 'grabarz': {
          match.t2p4name = 'gRaBaRz';
          break;
        }
        case 'tomas': {
          match.t2p4name = 'Tomas';
          break;
        }
        case 'kapsel': {
          match.t2p4name = 'KaPsEL';
          break;
        }
        case 'your-problem': {
          match.t2p4name = yp;
          break;
        }
        case 'illusion': {
          match.t2p4name = '-Illu$ioN-';
          break;
        }
        case 'baton': {
          match.t2p4name = 'bAtOn';
          break;
        }
        case 'belus': {
          match.t2p4name = 'Belu$';
          break;
        }
        case 'zielony': {
          match.t2p4name = zielony;
          break;
        }
        case 'moses': {
          match.t2p4name = 'MoSeS';
          break;
        }
        case 'zielak': {
          match.t2p4name = 'ZielakPr0';
          break;
        }
        case 'lechu': {
          match.t2p4name = 'Lechu';
          break;
        }
        case '': {
          match.t2p4name = '';
          break;
        }
        default: {
          console.log('nickname coverted invalid');
          break;
        }
      }
      switch (match.t2p5name) {
        case 'ryba': {
          match.t2p2name = 'rybA';
          break;
        }
        case 'grabarz': {
          match.t2p5name = 'gRaBaRz';
          break;
        }
        case 'tomas': {
          match.t2p5name = 'Tomas';
          break;
        }
        case 'kapsel': {
          match.t2p5name = 'KaPsEL';
          break;
        }
        case 'your-problem': {
          match.t2p5name = yp;
          break;
        }
        case 'illusion': {
          match.t2p5name = '-Illu$ioN-';
          break;
        }
        case 'baton': {
          match.t2p5name = 'bAtOn';
          break;
        }
        case 'belus': {
          match.t2p5name = 'Belu$';
          break;
        }
        case 'zielony': {
          match.t2p5name = zielony;
          break;
        }
        case '': {
          match.t2p5name = '';
          break;
        }
        default: {
          console.log('nickname coverted invalid');
          break;
        }
      }
      // }

      value += `<div class="match" id="match${newObj.length - i}">          
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
          </div>
          <div class="team">
            <div class="roudswon1">${match.t1roundswon}</div>
            <div class="players">

              <div class="player">
                <div class="preelo">${match.t1p1preelo}</div>
                <div class="name">${match.t1p1name}</div>
                <div class="score">${match.t1p1score}</div>
                <div class="postelo">${match.t1p1postelo}</div>
                <div class="difference">${Number(parseFloat(match.t1p1postelo - match.t1p1preelo).toFixed(2))}
                </div>
              </div>

              <div class="player">
                <div class="preelo">${match.t1p2preelo}</div>
                <div class="name">${match.t1p2name}</div>
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
                <div class="name">${match.t1p3name}</div>
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
                <div class="name">${match.t1p4name}</div>
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
                <div class="name">${match.t1p5name}</div>
                <div class="score">${match.t1p5score}</div>
                <div class="postelo">${match.t1p5postelo}</div>
                <div class="difference">${
                  Number(parseFloat(match.t1p5postelo - match.t1p5preelo).toFixed(2) === 'NaN')
                    ? ''
                    : Number(parseFloat(match.t1p5postelo - match.t1p5preelo).toFixed(2))
                }
                </div>
              </div>
              
            </div>            
          </div> 
          <div class="team">
            <div class="roudswon2">${match.t2roundswon}</div>
            <div class="players">
               <div class="player">
                <div class="preelo">${match.t2p1preelo}</div>
                <div class="name">${match.t2p1name}</div>
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
                <div class="name">${match.t2p2name}</div>
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
                <div class="name">${match.t2p3name}</div>
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
                <div class="name">${match.t2p4name}</div>
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
                <div class="name">${match.t2p5name}</div>
                <div class="score">${match.t2p5score}</div>
                <div class="postelo">${match.t2p5postelo}</div>
                <div class="difference">${
                  Number(parseFloat(match.t2p5postelo - match.t2p5preelo).toFixed(2) === 'NaN')
                    ? ''
                    : Number(parseFloat(match.t2p5postelo - match.t2p5preelo).toFixed(2))
                }
                </div>
              </div>  
            </div>           
          </div>
        </div>
       `;
    });

    document.getElementById('matches').innerHTML = value;

    // const matchesList = document.getElementById('matches');
    // console.log('MATCHES', matchesList);
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
      warCardDetail.innerHTML += `<div class="match-details">
      <div class="">Match #${newObj.length - i}</div>
      <div class="video-responsive">
      <iframe id="ytplayer" type="text/html" width="640" height="360"
      src="https://www.youtube.com/embed/${war.video}"
      frameborder="0"/>
      </div>
      </div>`;
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

    // <form onsubmit="event.preventDefault();">
    //     <textarea name="joinDiscussion" id="joinDiscussion" cols=50 placeholder="Join the discussion"></textarea>
    //     <div id="postComment">
    //       <label>UserName:</label><input type="input" id="userName"/>
    //       <input type="button" value="Post" id="post">
    //     </div>
    //     <section id="viewComments">

    //     </section>
    //   </form>
    // (function () {
    //   function Comment(userName, text, votes, commentList) {
    //     this.userName = userName;
    //     this.text = text;
    //     this.votes = votes;
    //     this.commentList = commentList;
    //   }

    //   Comment.prototype.upvote = function () {
    //     let commentList = JSON.parse(window.localStorage.getItem('commentList')) || [];
    //     this.votes = this.votes + 1;
    //     commentList = findAndUpdateComment(commentList, this);
    //     createCommentView(commentList);
    //   };

    //   Comment.prototype.downvote = function () {
    //     let commentList = JSON.parse(window.localStorage.getItem('commentList')) || [];
    //     if (this.votes > 0) this.votes = this.votes - 1;
    //     commentList = findAndUpdateComment(commentList, this);
    //     createCommentView(commentList);
    //   };

    //   Comment.prototype.reply = function (userName, text) {
    //     const reply = new Comment(userName, text, 0, []);
    //     this.commentList.push(reply);
    //   };

    //   Comment.prototype.save = function () {
    //     const commentList = JSON.parse(window.localStorage.getItem('commentList')) || [];
    //     commentList.push(this);
    //     createCommentView(commentList);
    //   };

    //   Comment.prototype.updateReplyList = function () {
    //     let commentList = JSON.parse(window.localStorage.getItem('commentList')) || [];
    //     // search for that comment in the list
    //     commentList = findAndUpdateComment(commentList, this);
    //     createCommentView(commentList);
    //   };

    //   function findAndUpdateComment(commentList, comment) {
    //     for (let i = 0; i < commentList.length; i++) {
    //       if (commentList[i].text === comment.text && commentList[i].userName === comment.userName) commentList[i] = comment;
    //       if (commentList[i].commentList.length > 0) findAndUpdateComment(commentList[i].commentList, comment);
    //     }
    //     return commentList;
    //   }

    //   function createCommentView(commentList) {
    //     const docFrag = document.createDocumentFragment();
    //     docFrag.appendChild(showComments(commentList));
    //     document.getElementById('viewComments').innerHTML = '';
    //     document.getElementById('viewComments').appendChild(docFrag);
    //     window.localStorage.setItem('commentList', JSON.stringify(commentList));
    //   }

    //   function createComment(userName, text, votes) {
    //     const comment = new Comment(userName, text, votes, []);
    //     comment.save();
    //     return comment;
    //   }

    //   function showComments(commentList) {
    //     const mainUL = document.createElement('ul');
    //     for (let i = 0; i < commentList.length; i++) {
    //       const comment = new Comment(commentList[i].userName, commentList[i].text, commentList[i].votes, commentList[i].commentList);
    //       const li = createLi(comment, i);
    //       mainUL.appendChild(li);
    //       if (commentList[i].commentList.length > 0) {
    //         mainUL.appendChild(showComments(commentList[i].commentList));
    //       }
    //     }
    //     return mainUL;
    //   }

    //   function createLi(comment, index) {
    //     // main li element
    //     const li = document.createElement('li');

    //     // main div for the li element
    //     const mainDiv = document.createElement('div');

    //     // commentDiv which will have comment and username
    //     const commentDiv = document.createElement('div');
    //     const commentNameAndText = document.createTextNode(comment.userName + ': ' + comment.text);
    //     commentDiv.appendChild(commentNameAndText);

    //     // votes div which will have votes along with upvote and downvote
    //     const votesDiv = document.createElement('div');
    //     const votes = document.createTextNode('Votes:' + comment.votes);
    //     const upvoteBtn = document.createElement('button');
    //     upvoteBtn.innerHTML = 'Upvote';
    //     upvoteBtn.onclick = function () {
    //       comment.upvote();
    //     };
    //     const downVoteBtn = document.createElement('button');
    //     downVoteBtn.innerHTML = 'Downvote';

    //     downVoteBtn.onclick = function () {
    //       comment.downvote();
    //     };
    //     votesDiv.appendChild(votes);
    //     votesDiv.appendChild(upvoteBtn);
    //     votesDiv.appendChild(downVoteBtn);

    //     // reply username div
    //     const userNameDiv = document.createElement('div');
    //     const userName = document.createTextNode('Username:');
    //     const usernameInput = document.createElement('input');
    //     userNameDiv.appendChild(userName);
    //     userNameDiv.appendChild(usernameInput);

    //     // reply comment div
    //     const replyCommentDiv = document.createElement('div');
    //     const commentText = document.createTextNode('Comment:');
    //     const commentInput = document.createElement('input');
    //     replyCommentDiv.appendChild(commentText);
    //     replyCommentDiv.appendChild(commentInput);

    //     // reply post button which will create a new comment

    //     const postReplyBtn = document.createElement('button');
    //     postReplyBtn.innerHTML = 'POST';
    //     postReplyBtn.onclick = function () {
    //       const content = commentInput.value;
    //       const user = usernameInput.value;
    //       const reply = new Comment(user, content, 0, []);
    //       comment.commentList.push(reply);
    //       comment.updateReplyList();
    //     };

    //     // reply Div which will show up on click of reply button
    //     const replyDiv = document.createElement('div');

    //     const hiddenReplyDiv = document.createElement('div');
    //     hiddenReplyDiv.style.cssText = 'display:none';
    //     hiddenReplyDiv.appendChild(userNameDiv);
    //     hiddenReplyDiv.appendChild(replyCommentDiv);
    //     hiddenReplyDiv.appendChild(postReplyBtn);

    //     const replyBtn = document.createElement('button');
    //     replyBtn.innerHTML = 'Reply';
    //     replyBtn.onclick = function () {
    //       replyBtn.style.cssText = 'display:none';
    //       hiddenReplyDiv.style.cssText = 'display:block';
    //     };
    //     replyDiv.appendChild(replyBtn);
    //     replyDiv.appendChild(hiddenReplyDiv);

    //     mainDiv.appendChild(commentDiv);
    //     mainDiv.appendChild(votesDiv);
    //     mainDiv.appendChild(replyDiv);
    //     li.appendChild(mainDiv);
    //     return li;
    //   }

    //   document.getElementById('post').addEventListener('click', function () {
    //     const userName = document.getElementById('userName').value;
    //     const content = document.getElementById('joinDiscussion').value;
    //     createComment(userName, content, 0);
    //   });

    //   const commentList = JSON.parse(window.localStorage.getItem('commentList')) || [];
    //   if (commentList.length) createCommentView(commentList);
    // })();

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

    // const valineComments = () => {
    //   for (let i = newObj.length; i > 0; i--) {
    //     const elem = `#match${i}`;
    //     new Valine({
    //       el: `#vcomments${i}`,
    //       appId: 'GbCaRUpGLOl1IN6vCnIwMcle-MdYXbMMI',
    //       appKey: '3YW20TtAKRS89UlzqcMUPQcO',
    //       lang: 'en',
    //       path: elem.hash,
    //     });
    //   }
    // };

    // valineComments();

    const pageSize = 10;
    let incremSlide = 11;
    let startPage = 0;
    let numberPage = 0;

    const pageCount = $('.match').length / pageSize;
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
      $('.match').hide();
      $('.match').each(function (n) {
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
