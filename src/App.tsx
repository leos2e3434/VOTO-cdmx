import { useState, useEffect } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import Header from './Header';
import { ethers } from 'ethers';
import './App.css';

function App() {
  const [selectedOption, setSelectedOption] = useState(0);
  const [voted, setVoted] = useState(false);
  const [votes, setVotes] = useState([0, 0, 0]); // Contador de votos para cada opción

  useEffect(() => {
    // Código para obtener el conteo de votos de la cadena de bloques podría ir aquí
  }, [voted]); // Ejecutar cuando voted cambie

  async function vote() {
    if (window.ethereum) {
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract('CONTRACT_ADDRESS', Votacion.abi, signer);
      await contract.votar(selectedOption);
      setVoted(true);
      // Incrementar el contador de votos para la opción seleccionada
      const newVotes = [...votes];
      newVotes[selectedOption] += 1;
      setVotes(newVotes);
    } else {
      alert('Instala MetaMask para votar');
    }
  }

  return (
    <div className="App">
      <Header />
      <section className="voting-section">
        <h2>Sistema de Votación</h2>
        <div>
          <label>
            <input type="radio" name="option" value={0} onChange={(e) => setSelectedOption(parseInt(e.target.value))} />
            DOT
          </label>
          <label>
            <input type="radio" name="option" value={1} onChange={(e) => setSelectedOption(parseInt(e.target.value))} />
            OP
          </label>
          <label>
            <input type="radio" name="option" value={2} onChange={(e) => setSelectedOption(parseInt(e.target.value))} />
            KSM
          </label>
        </div>
        <button onClick={vote} disabled={voted}>Votar</button>
        <div>
          <p>Votos para DOT: {votes[0]}</p>
          <p>Votos para OP: {votes[1]}</p>
          <p>Votos para KSM: {votes[2]}</p>
        </div>
      </section>
    </div>
  );
}

export default App;


