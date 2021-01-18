# Spearhead Mix League
## This is simple front interface of Medal of Honor Alied Assault: Spearhead - Mix League. 

## Live: https://mohsh.ct8.pl

The graphic interface refers to the clanbase.com website. Everyone who played multiplayer games 15 years ago knew this site very well. There is one positive aspect of the coronavirus, old friends are playing Spearhead together again. To diversify the gameplay, I created a ranking game based on the ELO ranking (I use a script written by Oliver Wang). The project is extended with new functionalities. 

## New functionalities:
- Live comments system based on Firebase + front jQuery
- Marquee bar based on swiper.js
- Individual player statistics on graph using chart.js
- Modified embed iframe with attribute srcdoc (optimalized)
- Load spinners 
- Log tab (13.01.2021 - modfied elo algorithm, responsibilityFactor from 11 to 22 and outperformThreshold from 200 to 12)

## New feature
- repair longest increase and decrease streak each player
- fix ansyc functions (Last war)

## Front:
- Vanilla JS (ES6)
- jQuery
- Webpack

## Backend:
- Google sheets
- https://github.com/oliverdwang/fps-elo
- Firebase (live comments system)


## Instalacja zależności
```bash
npm install
```


## Uruchomienie serwera deweloperskiego
```bash
npm start
```


## Budowa aplikacji produkcyjnej
```bash
npm run production
```
