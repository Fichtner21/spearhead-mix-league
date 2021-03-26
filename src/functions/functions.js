// export function smallStrike(name, arr() {

//   const littleStrike = document.createElement('div');
//   const spanStrike = document.createElement('span');
//   const firstFromEnd = arr(name)[arr(name).length - 1];
//   const secondFromEnd = arr(name)[arr(name).length - 2];
//   const countingPoints = firstFromEnd - secondFromEnd;

//   if (firstFromEnd > secondFromEnd) {
//     littleStrike.classList.add('up-streak');
//     spanStrike.setAttribute('data-title', `${countingPoints > 0 ? `+${countingPoints.toFixed(2)}` : ''} pc in last war`);
//     littleStrike.appendChild(spanStrike);
//   } else if (firstFromEnd < secondFromEnd) {
//     littleStrike.classList.add('down-streak');
//     spanStrike.setAttribute('data-title', `${countingPoints.toFixed(2)} pc in last war`);
//     littleStrike.appendChild(spanStrike);
//     // littleStrike.setAttribute('title', `${countingPoints.toFixed(2)} pc in last war`);
//   } else {
//     littleStrike.classList.add('draw-streak');
//     spanStrike.setAttribute('data-title', `${countingPoints.toFixed(2)} pc in last war`);
//     littleStrike.appendChild(spanStrike);
//     // littleStrike.setAttribute('title', `${countingPoints.toFixed(2)} pc in last war`);
//   }

//   return littleStrike;
// }
