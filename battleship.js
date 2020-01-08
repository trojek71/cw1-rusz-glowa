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
console.log("message", messageArea);
