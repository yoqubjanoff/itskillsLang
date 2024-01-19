import styled from 'styled-components';

export const Wrapper = styled.div`
	width: 100%;
	height: 100%;
	div {
		&.FlexBoxAdmin {
			display: flex;
			height: 100%;
		}
		&.ColumnBox {
			width: 100%;
			display: flex;
			flex-direction: column;
			gap: 25px;
			/* padding: 20px 0 0 20px; */
		}
		&.TagBox {
			width: 100%;
			height: 50px;
			border-radius: 100px;
			background: #f4f7f4;
			display: flex;
			align-items: center;
			padding: 4px;
			gap: 5px;
		}
	}
	p {
		&.Header {
			color: #000;
			font-size: 24px;
			font-style: normal;
			font-weight: 500;
			line-height: normal;
		}
	}
`;
