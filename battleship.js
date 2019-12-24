var location1 = 3;
var location2 = 4;
var location3 = 5;
var guess;
var hits = 0;
var guesses = 0;
var isSunk = false;
while (isSunk == false) {
  guess = prompt("Podaj komórkę do sprawdzenia z zakresu 0 - 6: ");
  if (guess < 0 || guess > 6) {
    alert("Podaj prawidłowe wartości ( 0-6)");
  } else {
    guesses = guesses + 1;

    if (guess == location1 || guess == location2 || guess == location3) {
      hits = hits + 1;
      alert("TRAFIONY");

      if (hits == 3) {
        isSunk = true;
        alert("zatopiłeś mój okręt");
      }
    } else {
      alert("PUDŁO");
    }
  }
}
var stats =
  "Potrzebowałeś " +
  guesses +
  " do zatopienia," +
  "czyli twoja efektywność wynosi: "(3 / guesses) +
  ".";
alert(stats);
