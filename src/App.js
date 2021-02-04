import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import Formulario from './components/Formulario';
import Cotizacion from './components/Cotizacion';
import imagen from '../src/assets/img/cryptomonedas.png';
import axios from 'axios';
import Spinner from './components/Spinner';

const Contenedor = styled.div`
  margin: 0 auto;
  max-width: 900px;
  @media (min-width: 992px) {
    column-gap: 2rem;
    display: grid;    
    grid-template-columns: repeat(2, 1fr);
  }
`;

const Imagen = styled.img`
  margin-top: 5rem;
  max-width: 100%;
`;

const Heading = styled.h1`
  color: #fff;
  font-family: 'Bebas Neue', cursive;
  font-size: 50px;
  font-weight: 700;
  margin: 50px 0;
  text-align: left;

  &::after {
    background-color: #66a2fe;
    content: '';
    display: block;
    height: 6px;
    width: 100px;
  }
`;

const App = () => {

  const [ moneda, guardarMoneda ] = useState('');
  const [ criptomoneda, guardarCriptomoneda ] = useState('');
  const [ resultado, guardarResultado ] = useState({});
  const [ cargando, guardarCargando ] = useState(false);

  useEffect( () => {

    const cotizarCriptomoneda = async() => {

      // Evitamos la ejecución la primera vez
      if( moneda === '' ) return;

      // consultar la api para obtener la cotización
      const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${ criptomoneda }&tsyms=${ moneda }`;
      const resultado = await axios.get(url);

      guardarCargando(true);

      // Ocultar el spinner y mostrar el resultado
      setTimeout(() => {
        // cambiar el estado de cargando
        guardarCargando(false);

        // guardar cotización
        guardarResultado( resultado.data.DISPLAY[criptomoneda][moneda] );
      }, 3000);
    }
    cotizarCriptomoneda();

  }, [moneda, criptomoneda]);

  const componente = (cargando) ? <Spinner /> : <Cotizacion resultado={ resultado } />

  return (
    <Contenedor>
      <div>
        <Imagen src={ imagen } alt="Cryptocurrency Calculator" />
      </div>
      <div>
        <Heading>Cryptocurrency Calculator</Heading>
        <Formulario guardarMoneda={ guardarMoneda } guardarCriptomoneda={ guardarCriptomoneda } />
        { componente }
      </div>
    </Contenedor>
  );
}

export default App;