import React, { useState, useEffect } from 'react';
import { Button, Toast } from '../../generics';
import { useNavigate, useParams } from 'react-router-dom';
import { Skeleton } from 'antd';
import request from '../../../services/api/hr-request';
const VerifyHr = () => {
	const navigate = useNavigate();
	let { id } = useParams();
	const [error, setError] = useState(false);
	const getToken = async () => {
		try {
			const res = await request.get(`hr/auth/activate/${id}`);
			localStorage.setItem('token-hr', res?.data?.data?.accessToken);
			localStorage.removeItem('token');
			navigate('/hr-profile');
		} catch (error) {
			setError(true);
			Toast({
				message: error?.response?.data?.resultMsg,
				type: 'error',
			});
		}
	};
	useEffect(() => {
		getToken();
	}, []);
	return (
		<div className="w-full h-screen flex justify-center items-center">
			{error ? (
				<div className="w-fit flex flex-col gap-16px justify-center items-center ">
					<h1>Bu sahifa eskirgan 🙁</h1>
					<Button
						type="primary"
						radius={'12px'}
						height={'52px'}
						width={'fit-content'}
						padding={'12px 32px'}
						bgcolor={'#2563EB'}
						margin={'16px 0 0 0'}
						onClick={() => navigate('/')}
					>
						<p className="text-[#fff] text-[16px] font-[600]">
							Bosh sahifaga qaytish
						</p>
					</Button>
				</div>
			) : (
				<Skeleton active />
			)}
		</div>
	);
};

export default VerifyHr;
