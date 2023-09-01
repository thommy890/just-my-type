let sentences = [
    'ten ate neite ate nee enet ite ate inet ent eate',
    'Too ato too nOt enot one totA not anot tOO aNot',
    'oat itain oat tain nate eate tea anne inant nean',
    'itant eate anot eat nato inate eat anot tain eat',
    'nee ene ate ite tent tiet ent ine ene ete ene ate'
  ];
  let currentSentenceIndex = 0;
  let sentence = sentences[currentSentenceIndex];
  let currentIndex = 0;
  let numberOfMistakes = 0;
  let startTime = null;
  
  const specialCharsMap = {
    '1': '!',
    '2': '@',
    '3': '#',
    '4': '$',
    '5': '%',
    '6': '^',
    '7': '&',
    '8': '*',
    '9': '(',
    '0': ')',
    '-': '_',
    '=': '+',
    '[': '{',
    ']': '}',
    '\\': '|',
    ';': ':',
    '\'': '"',
    ',': '<',
    '.': '>',
    '/': '?'
  };
  
  function resetGame() {
    sentence = sentences[currentSentenceIndex];
    currentIndex = 0;
    numberOfMistakes = 0;
    startTime = null;
    document.getElementById('sentence').innerHTML = sentence.split('').map((char, index) => `<span id="char${index}">${char}</span>`).join('');
    document.querySelectorAll('.highlight').forEach(el => el.classList.remove('highlight'));
    document.getElementById('message').innerHTML = "";
  }
  
  document.addEventListener('DOMContentLoaded', function () {
    resetGame();
  
    document.addEventListener('keydown', function (event) {
      if (event.key === 'Shift') {
        toggleShift(true);
        return;
      }
  
      if (startTime === null) {
        startTime = new Date();
      }
  
      const key = event.key;
      const keyElement = document.querySelector(`.key[data-key='${key.toLowerCase()}']`);
  
      if (['Shift', 'Tab', 'Backspace', 'Control'].includes(key)) {
        event.preventDefault();
      }
  
      const isCorrect = key === sentence[currentIndex];
  
      if (isCorrect) {
        document.getElementById(`char${currentIndex}`).classList.add('highlight');
        keyElement.innerHTML = `<span style="color:green;">&#10004;</span>`;
        currentIndex++;
  
        if (currentIndex === sentence.length) {
          const endTime = new Date();
          const minutes = (endTime - startTime) / 60000;
          const wpm = Math.round(sentence.split(' ').length / minutes - 2 * numberOfMistakes);
  
          document.getElementById('message').innerHTML = `Well done! Your WPM is ${wpm}.`;
  
          setTimeout(() => {
            if (confirm('Would you like to play again?')) {
              currentSentenceIndex++;
              if (currentSentenceIndex >= sentences.length) {
                document.getElementById('message').innerHTML = "Congratulations! You've completed all sentences.";
                currentSentenceIndex = 0;
              }
              resetGame();
            }
          }, 2000);
        }
      } else {
        numberOfMistakes++;
        keyElement.innerHTML = `<span style="color:red;">&#10006;</span>`;
      }
  
      toggleShift(event.shiftKey);
    });
  
    document.addEventListener('keyup', function (event) {
      if (event.key === 'Shift') {
        toggleShift(false);
        return;
      }
  
      const key = event.key.toLowerCase();
      const keyElement = document.querySelector(`.key[data-key='${key}']`);
      if (keyElement) {
        keyElement.textContent = key;
      }
  
      toggleShift(event.shiftKey);
    });
  });
  
  function toggleShift(isShiftPressed) {
    document.querySelectorAll('.key').forEach(keyElement => {
      const key = keyElement.getAttribute('data-key');
      if (key >= 'a' && key <= 'z') {
        keyElement.textContent = isShiftPressed ? key.toUpperCase() : key.toLowerCase();
      }
      if (specialCharsMap[key]) {
        keyElement.textContent = isShiftPressed ? specialCharsMap[key] : key;
      }
    });
  }
  