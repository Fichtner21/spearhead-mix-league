import drive from 'drive-db';

export function cupTwo() {
  (async () => {
    const signedCupTwo = await drive({
      sheet: '1w_WHqCutkp_S6KveKyu4mNaG76C5dIlDwKw-A-dEOLo',
      tab: '8',
    });

    // const signedDiv = document.getElementById('signed');
    // const signedPlayers = signedCupTwo.map((entry) => entry);
    // signedPlayers.forEach((team) => {
    //   const teamDiv = document.createElement('div');
    //   teamDiv.classList.add('item');
    //   teamDiv.innerHTML += team.signed;
    //   signedDiv.appendChild(teamDiv);
    // });
  })();
}
