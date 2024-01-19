import React, { useState, useEffect } from 'react';
import Bg from '../../assets/img/footer.png';
import Image from '../../assets/img/about.png';
import Footer from '../Footer';
import Navbar from '../Navbar';
import { AntCollapse } from './style';
import request from '../../services/api';
import { useTranslation } from 'react-i18next';

const About = () => {
	const [data, setData] = useState([]);
	const { i18n, t } = useTranslation();

	const getFaq = async () => {
		try {
			const res = await request.get(`base/FAQ?lan=${i18n.language || 'uz'}`);
			setData(res?.data?.data);
		} catch (error) {
			console.error('Error:', error);
		}
	};
	useEffect(() => {
		getFaq();
	}, [i18n.language]);

	return (
		<div className="w-full flex flex-col items-center">
			<Navbar />
			<div
				className="w-full h-[370px] flex justify-center items-center max-[450px]:h-[200px] max-[450px]:mt-[100px]"
				style={{
					background: `url(${Bg})`,
					backgroundPosition: 'center',
					backgroundSize: 'cover',
					backgroundRepeat: 'no-repeat',
				}}
			>
				<p className="text-[#18181B] font-[Vollkorn] text-[66px] font-[600] max-[740px]:text-[36px]">
					{t('w170')}
				</p>
			</div>

			<div className="flex gap-[50px] my-[60px] max-[450px]:mt-[30px] max-[450px]:mb-[60px] max-[1470px]:flex-col max-[1470px]:text-center max-[1470px]:items-center">
				<div className="flex flex-col gap-[16px] w-[673px] max-h-[370px] max-[740px]:w-[90%] max-[740px]:text-center ">
					<p className="text-[#18181B] font-[Vollkorn] text-[36px] font-[600] text-left">
						{t('w171')}
					</p>
					<div className="flex gap-[16px] max-h-[370px]">
						<p className="text-[#18181B]  text-[18px] font-[400] text-left">
							{t('w39')}
						</p>
					</div>
				</div>

				<div
					className="w-[673px] h-[370px] rounded-[24px] max-[740px]:w-[90%]"
					style={{
						background: `url(${Image})`,
						backgroundPosition: 'center',
						backgroundSize: 'cover',
						backgroundRepeat: 'no-repeat',
					}}
				></div>
			</div>
			<div className="w-full flex justify-center p-[20px] max-[450px]:text-left">
				<p className="text-[#18181B] font-[Vollkorn] text-[24px] font-[600] mb-[20px] max-[450px]:text-[18px]">
					{t('w249')}
				</p>
			</div>

			<div className="flex flex-col mb-[100px] w-full items-center">
				{data?.map((v, i) => (
					<AntCollapse
						items={[
							{
								key: i,
								label: (
									<p className="text-[#18181B]  text-[20px] font-[500] ">
										{v?.title}
									</p>
								),
								children: (
									<p className="text-[#18181B]  text-[16px] font-[500] ">
										{v?.content}
									</p>
								),
							},
						]}
						expandIconPosition="end"
					/>
				))}
			</div>

			<Footer />
		</div>
	);
};

export default About;
