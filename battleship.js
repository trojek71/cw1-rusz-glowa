let model = {
  boardSize: 7,
  numShips: 3,
  shipLenght: 3,
  shipSunk: 0,
  ships: [
    { locations: [31, 41, 51], hits: ["", "", ""] },
    { locations: [14, 24, 34], hits: ["", "hit", ""] },
    { locations: [00, 01, 02], hits: ["hit", "", ""] }
  ],
  fire: function(guess) {
    for (let i = 0; i < this.numShips; i++) {
      let ship = this.ships[i];
      let index = ship.locations.indexOf(guess);
      if (index >= 0) {
        ship.hits[index] = "hit";
        view.displayHit(guess);
        view.displayMessage("TRAFIONY");
        if (this.isSunk(ship)) {
          view.displayMessage("ZATOPIŁEŚ OKRĘT");
          this.shipSunk++;
        }
        return true;
      }
    }
    view.displayMiss(guess);
    view.displayMessage("PUDŁO");
    return false;
  },
  isSunk: function(ship) {
    for (let i; i < this.shipLenght; i++) {
      if (ship.hits[i] !== "hits") {
        return false;
      }
      return true;
    }
  }
};
let view = {
  // ta metoda  wymaga  podania łańcucha z  komunikatem
  // i wyświetla  go w obszarze  komunikatu
  displayMessage: function(msg) {
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
model.fire("00");
