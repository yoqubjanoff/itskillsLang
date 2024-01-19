import React, { useEffect } from 'react';
import { Button } from '../../generics';
import Left from '../../../assets/icons/x close.svg';
import LockImg from '../../../assets/img/pochta.png';
import { useNavigate } from 'react-router-dom';
import Gmail from '../../../assets/img/gmail.png';
import { connect } from 'react-redux';
import { Wrapper } from './style';
const Forgot = ({ sentEmail }) => {
	const navigate = useNavigate();
	const { email, forgotPassword } = sentEmail;
	useEffect(() => {
		if (!email) navigate('/register');
	}, []);
	return (
		<Wrapper className="w-full h-screen flex items-center justify-center">
			<div className="w-[540px] h-[620px] p-[40px] pt-[50px] flex flex-col justify-between items-center bg-white rounded-[32px]">
				<div className="flex flex-col w-full items-center gap-[5px]">
					<div className="w-full flex justify-end">
						<img
							src={Left}
							width={28}
							height={28}
							style={{ cursor: 'pointer' }}
							onClick={() => navigate('/signin')}
						/>
					</div>
					<div className="w-full flex justify-center">
						<img src={LockImg} width={120} height={120} className="mb-[30px]" />
					</div>
					<p className="text-[#18181B] text-[32px] font-[800] text-center mb-[10px] max-[450px]:text-[24px]">
						Emailingizni tekshiring
					</p>
					{forgotPassword ? (
						<p className="text-[#52525B] text-[16px] font-[500] text-center max-[450px]:text-[14px]">
							Parolingizni tiklash bo’yicha ko’rsatmalarni
						</p>
					) : (
						<p className="text-[#52525B] text-[16px] font-[500] text-center max-[450px]:text-[14px]">
							Profilingizni tasdiqlash uchun linkni
						</p>
					)}

					<div className="w-full flex justify-center">
						<p className="text-[#2563EB] text-[16px] font-[500] text-center max-[450px]:text-[14px]">
							{email || ''}
						</p>
						<p className="text-[#52525B] text-[16px] font-[500] text-center max-[450px]:text-[14px]">
							ga jo’natdik.
						</p>
					</div>
				</div>
				<a href={`https://mail.google.com/`} target="_blank" className="w-full">
					<Button
						type="primary"
						radius={'12px'}
						height={'52px'}
						width={'100%'}
						padding={'12px 32px'}
						bgcolor={'#2563EB'}
						margin={'16px 0 0 0'}
						htmlType="submit"
					>
						<div className="flex gap-[10px]">
							<img src={Gmail} width={24} height={24} />
							<p className="text-[#fff] text-[16px] font-[600]">
								Gmailni ochish
							</p>
						</div>
					</Button>
				</a>
			</div>
		</Wrapper>
	);
};

const mapStateToProps = (state) => ({
	sentEmail: state.generalReducer.sentEmail,
});

export default connect(mapStateToProps, null)(Forgot);
