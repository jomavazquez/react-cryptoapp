import React from 'react';
import styled from '@emotion/styled';

const ResultadoDiv = styled.div`
	color: #fff;
	font-family: Arial, Helvetica, sans-serif;
`;

const Info = styled.p`
	font-size: 18px;

	span {
		font-weight: bold;
		color: orange;
	}
`;

const Precio = styled.p`
	font-size: 25px;

	span {
		font-weight: bold;
	}	
`;

const Cotizacion = ({ resultado }) => {
	
	if( Object.keys(resultado).length === 0 ) return null;

	return (
		<ResultadoDiv>
			<Precio>Price: <span>{ resultado.PRICE }</span></Precio>
			<Info>Daily highest price: <span>{ resultado.HIGHDAY }</span></Info>
			<Info>Daily lowest price: <span>{ resultado.LOWDAY }</span></Info>
			<Info>Last variation (24 hours): <span>{ resultado.CHANGEPCT24HOUR }</span></Info>
			<Info>Last update: <span>{ resultado.LASTUPDATE }</span></Info>
		</ResultadoDiv>

	);
}
 
export default Cotizacion;