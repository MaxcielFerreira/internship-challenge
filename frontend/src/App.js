import { useState } from "react";
import './App.css';

function MMC() {

  const [inicio, setInicio] = useState("");
  const [fim, setFim] = useState("");
  const [result, setResult] = useState("");


  const handleChange = (e, tipo) => {

    tipo === "inicio" ? setInicio(e.target.value) : setFim(e.target.value);

  }

  const calcularMMC = () => {

    if (inicio > 0 && fim > 0) {
      if (parseInt(fim) > parseInt(inicio)) {

        fetch("http://localhost:8000/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ inicio: parseInt(inicio), fim: parseInt(fim) })
        })
          .then(res => res.json())
          .then(data => setResult(data));
      }
      setResult("O número inicial tem que ser menor que o final")
    }
  }




  return (
    <div className="forms">

      <h2>INSTRUÇÕES</h2>
      <ul class="sem-bullets">
        <li>Máximo de intervalo permitido é 10</li>
        <li>Somente números Positivos</li>
        <li>O número do primeiro campo tem que ser menor que o outro campo</li>
      </ul>
      <input placeholder="Informe um numero inicial"
        onChange={(e) => handleChange(e, "inicio")}
        value={inicio} />
      <input placeholder="Informe um numero final"
        onChange={(e) => handleChange(e, "fim")}
        value={fim} />
      <button onClick={calcularMMC}>CALCULAR MMC</button>
      <h2 className="resultado">{result}</h2>
    </div>
  );

}

export default MMC;
