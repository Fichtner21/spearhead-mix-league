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
  })();
}
