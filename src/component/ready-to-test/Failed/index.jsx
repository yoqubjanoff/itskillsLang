import React from 'react';
import { Button } from '../../generics';
import Img from '../../../assets/img/failed.png';
import Info from '../../../assets/icons/info-circle.svg';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useSearch } from '../../../services/Search';

const FailedTest = () => {
	const navigate = useNavigate();
	const { t } = useTranslation();
	const query = useSearch();

	return (
		<div className="w-full h-screen flex max-[1200px]:justify-center max-[1200px]:py-[20px]">
			<div className="w-[50%]  flex flex-col justify-center px-[120px] max-[1200px]:w-[100%] max-[1200px]:items-center max-[1200px]:px-[20px]">
				<p className="w-[638px] flex text-[#18181B] font-[Vollkorn] text-[44px] font-[800] max-[1600px]:w-fit max-[1500px]:text-[32px]">
					{localStorage.getItem('i18nextLng') === 'uz'
						? `Afsuski, siz ${query.get('total')} ta testdan ${query.get(
								'correct',
						  )} ta topdingiz 🙁`
						: localStorage.getItem('i18nextLng') === 'ru'
						? `К сожалению, вам ответили ${query.get(
								'correct',
						  )} вопроса  из ${query.get('total')} 🙂`
						: `Unfortunately, you got ${query.get(
								'correct',
						  )} out of ${query.get('total')} questions 🙂`}
				</p>
				<p className="text-[#18181B] opacity-[0.7]   text-[20px] font-[400] mb-[60px] mt-[30px] max-[1500px]:w-fit">
					{t('w197')}
				</p>
				<div className="w-full flex justify-start gap-[16px] items-center mb-[40px] max-[1200px]:justify-center">
					<img src={Info} height={52} width={52} />
					<p className="max-w-[688px] text-[#18181B]  text-[18px] font-[500]  max-[520px]:text-[14px]">
						{t('w198')}
					</p>
				</div>

				<div className="w-full flex justify-start gap-[16px] max-[520px]:flex-col items-center max-[1200px]:justify-center">
					<Button
						type="primary"
						radius={'12px'}
						height={'52px'}
						width={'fit-content'}
						padding={'12px 32px'}
						bgcolor={'#2563EB'}
						margin={'16px 0 0 0'}
						onClick={() => navigate('/talent-profile')}
					>
						<p className="text-[#fff] text-[16px] font-[600]">{t('w199')}</p>
					</Button>
				</div>
			</div>

			<div
				className="w-[50%] flex flex-col items-center justify-center max-[1200px]:hidden"
				style={{
					background: `url(${Img})`,
					backgroundRepeat: 'no-repeat',
					backgroundSize: 'cover',
				}}
			></div>
		</div>
	);
};

export default FailedTest;
