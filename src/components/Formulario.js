import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from '@emotion/styled';
import Error from './Error';
import useMoneda from '../hooks/useMoneda';
import useCriptomoneda from '../hooks/useCriptomoneda';

const Boton = styled.input`
	background-color: #66a2fe;	
	border: none;
	border-radius: 10px;
	color: #fff;
	font-size: 20px;
	font-weight: bold;	
	margin-top: 20px;
	padding: 10px;
	transition: all .3s ease;
	width: 100%;
	-webkit-appearance: none;
	
	&:hover {
		background-color: #326ac0;
		cursor: pointer;
	}
`;

const Formulario = ({ guardarMoneda, guardarCriptomoneda }) => {

	// state del listado de criptomonedas
	const [ listacripto, guardarCriptomonedas ] = useState([]);

	// state para la validación
	const [ error, guardarError ] = useState(false);

	const MONEDAS = [
		{ codigo: 'USD', nombre: 'Dollar (United States)' },
		{ codigo: 'EUR', nombre: 'Euro' },
		{ codigo: 'GBP', nombre: 'Pound' },
	]

	// Utilizar useMoneda
	const [ moneda, SelectMonedas ] = useMoneda('Your coin', '', MONEDAS);

	// Utilizar Criptomoneda
	const [ criptomoneda, SelectCripto ] = useCriptomoneda('Your cryptocoin', '', listacripto);

	useEffect( () => {

		const consultarAPI = async () => {
			const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';
			const resultado = await axios.get(url);

			guardarCriptomonedas(resultado.data.Data);
		}
		consultarAPI();

	}, []);

	// cuando el usuario hace submit
	const cotizarMoneda = e => {
		e.preventDefault();

		// validar si ambos campos están llenos
		if( moneda === '' || criptomoneda === '' ){
			guardarError(true);
			return;
		}

		guardarError(false);
		
		// pasar los datos al componente proncipal
		guardarMoneda(moneda);
		guardarCriptomoneda(criptomoneda);
	}

	return (
		<form onSubmit={ cotizarMoneda }>
			{
				error ? <Error mensaje="All fields are required." /> : null
			}
			<SelectMonedas />
			<SelectCripto />
			<Boton type="submit" value="Get a quote"></Boton>
		</form>
	);
}
 
export default Formulario;