import React, { useState } from 'react';
import Google from '../../../assets/icons/google.svg';
import Linkedin from '../../../assets/icons/linkedin.svg';
import Facebook from '../../../assets/icons/facebook.svg';
import { Button } from '../../generics';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { Input, Checkbox } from 'antd';
import Img from '../../../assets/img/regImg.png';
import { useNavigate } from 'react-router-dom';
import request from '../../../services/api/index';
import { Toast } from '../../generics';
import { useTranslation } from 'react-i18next';
import OneID from '../../../assets/icons/One_ID 1.svg';

const TalentRegister = () => {
	const navigate = useNavigate();
	const { t } = useTranslation();

	const [state, setState] = useState({
		email: '',
		password: '',
	});
	const { email, password } = state;

	const [error, setError] = useState({
		email: false,
		password: false,
	});

	const handleError = (callback) => {
		if (!email || !password) {
			setError({
				...error,
				email: !email && t('w186'),
				password: !password && t('w186'),
			});
		} else {
			return callback();
		}
	};

	const submitFunction = () => {
		handleError(loginFunction);
	};

	const loginFunction = async () => {
		try {
			const response = await request.post('talent/auth/sign-in', {
				data: {
					...state,
				},
			});
			localStorage.setItem('token', response?.data?.data?.accessToken);
			localStorage.removeItem('token-hr');
			Toast({
				message: t('w209'),
				type: t('w252'),
			});
			navigate('/talent-profile');
		} catch (error) {
			Toast({
				message: error?.response?.data?.resultMsg,
				type: 'error',
			});
		}
	};
	const handleChange = (e) => {
		setState({
			...state,
			[e.target.name]: e.target?.value,
		});
		setError({
			...error,
			[e.target.name]: false,
		});
	};
	return (
		<div className="w-full h-screen flex max-[768px]:justify-center">
			<div className="w-[50%]  flex flex-col items-center justify-center max-[768px]:w-[100%] p-[10px]">
				<p className=" text-[#18181B] text-center text-[28px] font-[700] max-[768px]:w-[100%] p-[10px]">
					{t('w209')} ✨
				</p>

				<p className="leading-[35px] text-center my-[8px]">{t('w210')}</p>
				<div className="flex gap-[16px] mb-[24px] max-[400px]:w-full max-[400px]:flex-col items-center">
					<div
						className="flex h-[44px] px-[16px] justify-center items-center gap-[5px] border border-solid
					border-[#D4D4D8] shadow-[0px 1px 2px 0px rgba(15, 15, 16, 0.05);] rounded-[12px]  cursor-pointer w-[116px]
					max-[400px]:w-[90%]"
					>
						<img src={Google} height={20} width={20} />
						<p className="text-[#18181B] text-[16px] font-[500]"> Google</p>
					</div>

					<div
						className="flex h-[44px] px-[16px] justify-center items-center gap-[5px] border border-solid
					border-[#D4D4D8] shadow-[0px 1px 2px 0px rgba(15, 15, 16, 0.05);] rounded-[12px] cursor-pointer w-[116px]
					max-[400px]:w-[90%]"
					>
						<img src={OneID} height={20} width={64} />
					</div>

					<div
						className="flex h-[44px] px-[16px] justify-center items-center gap-[5px] border border-solid
					border-[#D4D4D8] shadow-[0px 1px 2px 0px rgba(15, 15, 16, 0.05);] rounded-[12px] cursor-pointer w-[116px]
					max-[400px]:w-[90%]"
					>
						<img src={Linkedin} height={20} width={20} />
						<p className="text-[#18181B] text-[16px] font-[500]"> Linkedin</p>
					</div>
				</div>
				<div className="w-[375px] flex items-center gap-[4px] mb-[24px] max-[400px]:w-[90%]">
					<div className="h-[1px] w-full bg-[#D4D4D8]"></div>
					<p className="text-[#18181B] text-[16px] font-[500]">{t('w61')}</p>
					<div className="h-[1px] w-full bg-[#D4D4D8]"></div>
				</div>

				<div className="w-[375px] flex flex-col gap-[6px] mb-[16px] max-[400px]:w-[90%]">
					<p className="text-[#18181B] text-[16px] font-[500]"> {t('w154')}</p>

					<Input
						placeholder={t('w155')}
						style={{ height: '52px', borderRadius: '12px' }}
						onChange={handleChange}
						value={email}
						name="email"
					/>
					{error.email && (
						<p className="text-[red] text-[14px] font-[600]">{error.email}</p>
					)}
				</div>
				<div className="w-[375px] flex flex-col gap-[8px] mb-[10px] max-[400px]:w-[90%]">
					<p className="text-[#18181B] text-[16px] font-[500]">{t('w156')}</p>

					<Input.Password
						placeholder={t('w157')}
						style={{
							height: '52px',
							borderRadius: '12px',
						}}
						iconRender={(visible) =>
							visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
						}
						onChange={handleChange}
						value={password}
						name="password"
					/>
					{error.password && (
						<p className="text-[red] text-[14px] font-[600]">
							{error.password}
						</p>
					)}
					<div className="flex justify-between">
						<div className="flex gap-[10px] items-center">
							<Checkbox />
							<p className="text-[#18181B] text-[14px] font-[600]">
								{t('w62')}
							</p>
						</div>
						<p
							onClick={() => navigate('/forgot-password')}
							className="text-blue-500 text-[14px] font-[600]  cursor-pointer hover:underline"
						>
							{t('w63')}
						</p>
					</div>

					<Button
						type="primary"
						radius={'12px'}
						height={'52px'}
						width={'100%'}
						padding={'12px 32px'}
						bgcolor={'#2563EB'}
						margin={'16px 0 0 0'}
						htmlType="submit"
						onClick={submitFunction}
					>
						<p className="text-[#fff] text-[16px] font-[600]">{t('w64')}</p>
					</Button>
				</div>
				<div className="w-full flex justify-center gap-[10px] my-[15px]">
					<p className="text-gray-700 text-[14px] font-[600]">{t('w65')}</p>
					<p
						onClick={() => navigate('/register')}
						className="text-blue-500 text-[14px] font-[600]  cursor-pointer hover:underline"
					>
						{t('w66')}
					</p>
				</div>
			</div>

			<div
				className="w-[50%] flex flex-col items-center justify-center max-[768px]:hidden"
				style={{
					background: `url(${Img})`,
					backgroundRepeat: 'no-repeat',
					backgroundSize: 'cover',
				}}
			></div>
		</div>
	);
};

export default TalentRegister;
