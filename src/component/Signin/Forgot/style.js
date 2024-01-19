import styled from 'styled-components';
import Img from '../../../assets/img/verify-fon.png';

export const Wrapper = styled.div`
	background-repeat: 'no-repeat';
	background-size: 'cover';
	@media (min-width: 600px) {
		background: url(${Img});
	}
`;
