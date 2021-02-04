import React from 'react';
import styled from '@emotion/styled';

const MensajeError = styled.p`
	background-color: #b7322c;
	color: #fff;
	font-family: 'Bebas Neue', cursive;
	font-size: 20px;
	padding: 1rem;
	text-align: center;
`;

const Error = ({ mensaje }) => {
	return (
		<MensajeError>
			{ mensaje }
		</MensajeError>
	);
}
 
export default Error;