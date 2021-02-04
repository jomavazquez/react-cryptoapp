import React, { useState } from 'react';
import styled from '@emotion/styled';

const Label = styled.label` 
	color: #fff;
	display: block;
	font-family: 'Bebas Neue', cursive;
	font-size: 2.4rem;
	font-weight: bold;
	margin-top: 2rem;
	text-transform: uppercase;
`;

const Select = styled.select`
	border: none;
	border-radius: 10px;	
	font-size: 1rem;
	display: block;
	padding: 1rem;
	width: 100%;
	-webkit-appearance: none;
`;

const useCriptomoneda = ( label, stateInicial, opciones ) => {

	// State de nuestro custom hook
	const [ state, actualizarState ] = useState(stateInicial);

	const SelectCripto = () => (
		<>
			<Label>{ label }</Label>
			<Select 
				onChange={ e => actualizarState(e.target.value) }
				value={ state }
			>
				<option value="">- Choose an option -</option>
				{
					opciones.map( opcion => (
						<option key={ opcion.CoinInfo.Id } value={ opcion.CoinInfo.Name }>{ opcion.CoinInfo.FullName }</option>
					))
				}
			</Select>
		</>
	)

	// Retornar, state, interfaz y función que modifica el state
	return [ state, SelectCripto, actualizarState ];
}

export default useCriptomoneda;