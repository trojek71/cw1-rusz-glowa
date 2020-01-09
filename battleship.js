let model = {
  boardSize: 7,
  numShips: 3,
  shpsLenght: 3,
  shipSunk: 0,
  ships: [
    { locations: [31, 41, 51], hits: ["", "", ""] },
    { locations: [14, 24, 34], hits: ["", "hit", ""] },
    { locations: [00, 01, 02], hits: ["hit", "", ""] }
  ]
};
let view = {
  // ta metoda  wymaga  podania łańcucha z  komunikatem
  // i wyświetla  go w obszarze  komunikatu
  displaymessage: function(msg) {
    let messageArea = document.getElementById("messageArea");
    messageArea.innerHTML = msg;
  },
  displayHit: function(location) {
    let cell = document.getElementById(location);
    cell.setAttribute("class", "hit");
  },
  displayMiss: function(location) {
    let cell = document.getElementById(location);
    cell.setAttribute("class", "miss");
  }
};
view.displayHit("00");
view.displaymessage("coś nie działa");
