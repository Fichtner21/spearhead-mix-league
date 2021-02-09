import drive from 'drive-db';
import $ from 'jquery';

export function cup() {
  // console.log('cup working');
  // Let's wrap this in a function so that we can call it with our button.
  (async () => {
    const cupStart = await drive({
      sheet: '1w_WHqCutkp_S6KveKyu4mNaG76C5dIlDwKw-A-dEOLo',
      tab: '8',
    });
  })();
}
