import { useEffect, useState } from 'react';
import './App.css';
import HangImage from './components/HangImage';
import { letters } from './helpers/letters';
import { getRandomWord } from './helpers/getRandomWord';

function App() {
  const [word, setWord] = useState(getRandomWord());
  const [hiddenWord, setHiddenWord] = useState('_ '.repeat(word.length));
  const [attempts, setAttempts] = useState(0);
  const [lose, setLose] = useState(false);
  const [win, setWin] = useState(false);

  useEffect(() => {
    if (attempts === 9) {
      setLose(true);
    }
  }, [attempts]);

  useEffect(() => {
    //hiddenWord.replace(/\s+/g, '')
    let currentHiddenWord = hiddenWord.split(' ').join('');
    if (currentHiddenWord === word) {
      setWin(true);
    }
  }, [hiddenWord]);

  const checkLetter = (letter: string) => {
    if (lose) return;
    if (win) return;
    if (!word.includes(letter)) {
      setAttempts(Math.min(attempts + 1, 9));
      return;
    }

    let hiddenWordArray = hiddenWord.split(' ');
    for (let i = 0; i < word.length; i++) {
      if (word[i] === letter) {
        hiddenWordArray[i] = letter;
      }
    }
    setHiddenWord(hiddenWordArray.join(' '));
  };

  const newGame = () => {
    setWord(getRandomWord());
    setHiddenWord('_ '.repeat(word.length));
    setAttempts(0);
    setLose(false);
    setWin(false);
  };

  return (
    <div className="container">
      {/*Imagenes*/}
      <HangImage imageNumber={attempts} />
      {/* Palabra oculta */}
      <h3>{hiddenWord}</h3>
      {/* Intentos */}
      <h3>Intentos {attempts}</h3>
      {/* mensaje si perdio */}
      {lose ? <p>Perdio, la palabra era: {word}</p> : ''}
      {/* mensaje si perdio */}
      {win ? <p>perfecto Gano</p> : ''}
      {/* Botones */}
      <div>
        {letters.map((letter) => (
          <button key={letter} onClick={() => checkLetter(letter)}>
            {letter}
          </button>
        ))}
      </div>
      <button onClick={newGame}>Nuevo Juego?</button>
    </div>
  );
}

export default App;
