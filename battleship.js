let view = {
  displayMessage: function(msg) {
    var messageArea = document.getElementById("messageArea");
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

let controller = {
  guesses: 0,
  processGuess: function(guess) {
    let location = parseGuess(guess);
    if (location) {
      this.guesses++;
      let hit = model.fire(location);
      if (hit && model.shipsSunk === model.numShips) {
        view.displayMessage(
          "Zatopiłeś wszystkie moje okręty, w " + this.guesses + " próbach."
        );
      }
    }
  }
};

function parseGuess(guess) {
  let alphabet = ["A", "B", "C", "D", "E", "F", "G"];

  if (guess === null || guess.length !== 2) {
    alert("Ups, proszę wpisać literę i cyfrę.");
  } else {
    let row = alphabet.indexOf(guess.charAt(0));
    let column = guess.charAt(1);

    if (isNaN(row) || isNaN(column)) {
      alert("Ups, to nie są współrzędne!");
    } else if (
      row < 0 ||
      row >= model.boardSize ||
      column < 0 ||
      column >= model.boardSize
    ) {
      alert("Ups, pole poza planszą!");
    } else {
      return row + column;
    }
  }
  return null;
}
function handleFireButton() {
  let guessInput = document.getElementById("guessInput");
  let guess = guessInput.value;
  controller.processGuess(guess);

  guessInput.value = "";
}
window.onload = init;

function init() {
  let fireButton = document.getElementById("fireButton");
  fireButton.onclick = handleFireButton;
}

/*window.onload = init;
console.log(parseGuess("A0"));
console.log(parseGuess("B6"));
console.log(parseGuess("G3"));
console.log(parseGuess("H0")); // nieprawidłowe
console.log(parseGuess("A7")); // nieprawidłowe*/
