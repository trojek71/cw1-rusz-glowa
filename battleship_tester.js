// Aby użyć tego pliku muisz pozostacic pliki widoku, modelu i kontrolera
// we właściwym miejscu, a jednocześnie umieścić w komentarzach wszystkich
// fragmenty kodu za wyjątkiem tego, który chcesz przetestować. Sugeruję,
// żebyś skorzystał z komentarzy blokowych:
/* 
   tu jest umieszczony kod
*/
// aby umieścić w komentarzach większe fragmenty kodu.

// Testoy widoku.
var view = {
  displayMessage: function(msg) {
    var messageArea = document.getElementById("messageArea");
    messageArea.innerHTML = msg;
  },

  displayHit: function(location) {
    var cell = document.getElementById(location);
    cell.setAttribute("class", "hit");
  },

  displayMiss: function(location) {
    var cell = document.getElementById(location);
    cell.setAttribute("class", "miss");
  }
};

// Testy modelu.

var model = {
  boardSize: 7,
  numShips: 3,
  shipLength: 3,
  shipsSunk: 0,

  ships: [
    { locations: ["06", "16", "26"], hits: ["", "", ""] },
    { locations: ["24", "34", "44"], hits: ["", "", ""] },
    { locations: ["10", "11", "12"], hits: ["", "", ""] }
  ],

  fire: function(guess) {
    for (var i = 0; i < this.numShips; i++) {
      var ship = this.ships[i];
      var index = ship.locations.indexOf(guess);

      if (index >= 0) {
        ship.hits[index] = "hit";
        view.displayHit(guess);
        view.displayMessage("TRAFIONY!");

        if (this.isSunk(ship)) {
          view.displayMessage("Zatopiłeś mój okręt!");
          this.shipsSunk++;
        }
        return true;
      }
    }
    view.displayMiss(guess);
    view.displayMessage("Spudłowałeś.");
    return false;
  },

  isSunk: function(ship) {
    for (var i = 0; i < this.shipLength; i++) {
      if (ship.hits[i] !== "hit") {
        return false;
      }
    }
    return true;
  },

  generateShipLocations: function() {
    var locations;
    for (var i = 0; i < this.numShips; i++) {
      do {
        locations = this.generateShip();
      } while (this.collision(locations));
      this.ships[i].locations = locations;
    }
    console.log("Tablica okrętów: ");
    console.log(this.ships);
  },

  generateShip: function() {
    var direction = Math.floor(Math.random() * 2);
    var row, col;

    if (direction === 1) {
      // W poziomie.
      row = Math.floor(Math.random() * this.boardSize);
      col = Math.floor(Math.random() * (this.boardSize - this.shipLength));
    } else {
      // W pionie.
      row = Math.floor(Math.random() * (this.boardSize - this.shipLength));
      col = Math.floor(Math.random() * this.boardSize);
    }

    var newShipLocations = [];
    for (var i = 0; i < this.shipLength; i++) {
      if (direction === 1) {
        newShipLocations.push(row + "" + (col + i));
      } else {
        newShipLocations.push(row + i + "" + col);
      }
    }
    return newShipLocations;
  },

  collision: function(locations) {
    for (var i = 0; i < this.numShips; i++) {
      var ship = this.ships[i];
      for (var j = 0; j < locations.length; j++) {
        if (ship.locations.indexOf(locations[j]) >= 0) {
          return true;
        }
      }
    }
    return false;
  }
};

/*
model.fire("53"); // pudło

model.fire("06"); // trafienie
model.fire("16"); // trafienie
model.fire("26"); // trafienie

model.fire("34"); // trafienie
model.fire("24"); // trafienie
model.fire("44"); // trafienie

model.fire("12"); // trafienie
model.fire("11"); // trafienie
model.fire("10"); // trafienie
*/

// Testy funkcji parseGuess
function parseGuess(guess) {
  var alphabet = ["A", "B", "C", "D", "E", "F", "G"];

  if (guess === null || guess.length !== 2) {
    alert("Ups, proszę wpisać literę i cyfrę.");
  } else {
    var row = alphabet.indexOf(guess.charAt(0));
    var column = guess.charAt(1);

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

/*
console.log("Testyjemy funkcję parseGuess");
console.log(parseGuess("A0"));
console.log(parseGuess("B6"));
console.log(parseGuess("G3"));
console.log(parseGuess("H0")); // nieprawidłowe
console.log(parseGuess("A7")); // nieprawidłowe
*/

// Testy kontrolera

var controller = {
  guesses: 0,

  processGuess: function(guess) {
    var location = parseGuess(guess);
    if (location) {
      this.guesses++;
      var hit = model.fire(location);
      if (hit && model.shipsSunk === model.numShips) {
        view.displayMessage(
          "Zatopiłeś wszystkie moje okręty, w " + this.guesses + " próbach."
        );
      }
    }
  }
};

function parseGuess(guess) {
  var alphabet = ["A", "B", "C", "D", "E", "F", "G"];

  if (guess === null || guess.length !== 2) {
    alert("Ups, proszę wpisać literę i cyfrę.");
  } else {
    var row = alphabet.indexOf(guess.charAt(0));
    var column = guess.charAt(1);

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

// Na planszy powinny być widoczne trzy okręty, jedno pudło oraz
// komunikat Zatopiłeś wszystkie moje okręty w 10 próbach.
/*
controller.processGuess("A0"); // pudło

controller.processGuess("A6"); // trafienie
controller.processGuess("B6"); // trafienie
controller.processGuess("C6"); // trafienie

controller.processGuess("C4"); // trafienie
controller.processGuess("D4"); // trafienie
controller.processGuess("E4"); // trafienie

controller.processGuess("B0"); // trafienie
controller.processGuess("B1"); // trafienie
controller.processGuess("B2"); // trafienie
*/
