import { styled } from 'styled-components';

export const UserStyle = styled.div`
	padding: 1em;
	width: 100%;
	.headBox {
		justify-content: end;
		width: 100%;
		height: 50px;
		border-radius: 100px;
		background: #f4f7f4;
		display: flex;
		align-items: center;
		padding: 4px;
		gap: 5px;
		margin-bottom: 2em;
		.FlexBox {
			display: flex;
			width: 70em;
			justify-content: end;
		}
	}
	div {
		&.FlexBox {
			display: flex;
			gap: 10px;
		}
		&.ColumnBox {
			width: 100%;
			height: 95vh;
			display: flex;
			flex-direction: column;
			gap: 24px;
			padding: 20px;
			height: 100%;
		}
		&.TagBox {
			width: 100%;
			height: 50px;
			border-radius: 100px;
			background: #f4f7f4;
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 4px;
			gap: 5px;
		}
		&.Box {
			width: 100%;
			display: flex;
			flex-wrap: wrap;
			gap: 10px;
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
export const Wrapper = styled.div`
	width: 100%;
	height: 100%;
`;
