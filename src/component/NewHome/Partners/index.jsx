import React from 'react';
import { Wrapper } from './style';
import {
	GreenUserIcon,
	TojIcon,
	GreenBagIcon,
} from '../../generics/genericIcons';
import Rek1 from '../../../assets/img/chatting.png';
import Rek2 from '../../../assets/img/with.png';
import blend from '../../../assets/icons/blend.svg';
import briefcase from '../../../assets/icons/briefcase.svg';
import cup from '../../../assets/icons/cup.svg';
import statusup from '../../../assets/icons/statusup.svg';
import Rene from '../../../assets/img/rene.png';
import Cup from '../../../assets/icons/cup2.svg';
import Crown from '../../../assets/icons/crown.svg';
import Coin from '../../../assets/icons/coin.svg';
import Global from '../../../assets/icons/global.svg';
import sharp1 from '../../../assets/icons/shapeWhy1.svg';
import sharp2 from '../../../assets/icons/shapeWhy2.svg';
import sharp3 from '../../../assets/icons/shapeWhy3.svg';
import Shield from '../../../assets/img/shield.png';
import Portal from '../../../assets/icons/Portal.svg';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';

const HeroSection = ({ userData }) => {
	const navigate = useNavigate();
	const { t } = useTranslation();

	return (
		<Wrapper>
			<Wrapper.BoxCard>
				<p className="my-[40px] text-[#18181B] text-[28px] font-[600] max-[450px]:text-[20px]">
					{t('w16')}
				</p>

				<Wrapper.Center>
					<Wrapper.CardWhy url={sharp1}>
						<TojIcon
							position="absolute"
							top={'32px'}
							right={'32px'}
							color="#000"
						/>
						<Wrapper.Column>
							<p className="text-[#18181B] text-[20px] font-[600] ">
								{t('w17')}
							</p>
							<p className="Desc">{t('w18')}</p>
						</Wrapper.Column>
					</Wrapper.CardWhy>

					<Wrapper.CardWhy url={sharp2}>
						<GreenBagIcon
							position="absolute"
							top={'32px'}
							right={'32px'}
							color="#000"
						/>
						<Wrapper.Column>
							<p className="text-[#18181B] text-[20px] font-[600] ">
								{t('w19')}
							</p>
							<p className="Desc">{t('w20')}</p>
						</Wrapper.Column>
					</Wrapper.CardWhy>

					<Wrapper.CardWhy url={sharp3}>
						<GreenUserIcon
							position="absolute"
							top={'32px'}
							right={'32px'}
							color="#000"
						/>
						<Wrapper.Column>
							<p className="text-[#18181B] text-[20px] font-[600] ">
								{t('w21')}
							</p>
							<p className="Desc">{t('w22')}</p>
						</Wrapper.Column>
					</Wrapper.CardWhy>
				</Wrapper.Center>
			</Wrapper.BoxCard>
			<Wrapper.Box height={'600px'} ai={'center'} className="rek">
				<Wrapper.Rek1
					onClick={() =>
						userData?.standardTestScore > 60
							? navigate('/ready-test-detailed')
							: navigate('/ready-test-standart')
					}
				>
					<p className="TitleR">{t('w23')}</p>
					<p className="DescR">{t('w24')}</p>
					<Wrapper.Rek1Image src={Rek1} />
				</Wrapper.Rek1>
				<Wrapper.Rek2
					onClick={() =>
						userData?.standardTestScore > 60
							? navigate('/ready-test-detailed')
							: navigate('/ready-test-standart')
					}
				>
					<p className="TitleR">{t('w25')}</p>
					<p className="DescR">{t('w26')}</p>
					<Wrapper.Rek2Image src={Rek2} />
				</Wrapper.Rek2>
			</Wrapper.Box>
			<p
				className="text-[28px] font-[600] text-[#18181B]"
				style={{ margin: '0 0 60px 0px' }}
			>
				{t('w27')}
			</p>
			<Wrapper.Box
				height={'80px'}
				ai={'center'}
				style={{ gap: '43px', margin: '0 0 60px 0' }}
				className="why"
			>
				<Wrapper.Box gap={'15px'}>
					<Wrapper.IconBox>
						<img src={blend} alt="blend" width={20} height={20} />
					</Wrapper.IconBox>
					<Wrapper.Box width={'200px'}>
						<p className="DescT">{t('w28')}</p>
					</Wrapper.Box>
				</Wrapper.Box>
				{/*  */}
				<Wrapper.Box gap={'15px'}>
					<Wrapper.IconBox>
						<img src={statusup} alt="blend" width={20} height={20} />
					</Wrapper.IconBox>
					<Wrapper.Box width={'200px'}>
						<p className="DescT">{t('w29')}</p>
					</Wrapper.Box>
				</Wrapper.Box>

				<Wrapper.Box gap={'15px'}>
					<Wrapper.IconBox>
						<img src={briefcase} alt="blend" width={20} height={20} />
					</Wrapper.IconBox>
					<Wrapper.Box width={'200px'}>
						<p className="DescT">{t('w30')}</p>
					</Wrapper.Box>
				</Wrapper.Box>

				<Wrapper.Box gap={'15px'}>
					<Wrapper.IconBox>
						<img src={cup} alt="blend" width={20} height={20} />
					</Wrapper.IconBox>
					<Wrapper.Box width={'200px'}>
						<p className="DescT">{t('w31')}</p>
					</Wrapper.Box>
				</Wrapper.Box>
			</Wrapper.Box>
			<Wrapper.Box
				jc={'space-between'}
				height={'666px'}
				width={'1277px'}
				className="why"
			>
				<Wrapper.Box
					gap={'30px'}
					width={'552px'}
					ai={'start'}
					style={{
						flexDirection: 'column',
						justifyContent: 'center',
						height: '570px',
						flexWrap: 'nowrap',
					}}
					className="why"
				>
					<Wrapper.Box width={'445px'} className="why">
						<p className="Title1">{t('w32')}</p>
					</Wrapper.Box>
					<Wrapper.Box width={'552px'} className="why">
						<p className="Title2">{t('w33')}</p>
					</Wrapper.Box>
					<Wrapper.Box width={'552px'} gap={'12px'} className="why">
						<Wrapper.BorderBox>
							<Wrapper.CupBox>
								<img src={Cup} alt="blend" width={20} height={20} />
							</Wrapper.CupBox>
							<p className="Title3">{t('w34')}</p>
						</Wrapper.BorderBox>
						<Wrapper.BorderBox>
							<Wrapper.CrownBox>
								<img src={Crown} alt="blend" width={20} height={20} />
							</Wrapper.CrownBox>
							<p className="Title3">{t('w35')}</p>
						</Wrapper.BorderBox>
					</Wrapper.Box>
					<Wrapper.Box width={'552px'} gap={'12px'} className="why">
						<Wrapper.BorderBox>
							<Wrapper.CoinBox>
								<img src={Coin} alt="blend" width={20} height={20} />
							</Wrapper.CoinBox>
							<p className="Title3">{t('w36')}</p>
						</Wrapper.BorderBox>
						<Wrapper.BorderBox>
							<Wrapper.GlobalBox>
								<img src={Global} alt="blend" width={20} height={20} />
							</Wrapper.GlobalBox>
							<p className="Title3">{t('w37')}</p>
						</Wrapper.BorderBox>
					</Wrapper.Box>
				</Wrapper.Box>
				<Wrapper.WhyImgBox>
					<img
						src={Portal}
						alt="Portal"
						width={36}
						height={36}
						style={{ position: 'absolute', left: '32px', bottom: '47px' }}
					/>
					<img
						src={Portal}
						alt="Portal"
						width={36}
						height={36}
						style={{ position: 'absolute', right: '78px', top: '98px' }}
					/>
					<img
						src={Portal}
						alt="Portal"
						width={46}
						height={46}
						style={{ position: 'absolute', right: '32px', bottom: '175px' }}
					/>

					<Wrapper.ReneImg src={Rene} />
					<Wrapper.Trusted>
						<img src={Shield} alt="blend" width={20} height={20} />
						100% Trusted
					</Wrapper.Trusted>
				</Wrapper.WhyImgBox>
			</Wrapper.Box>{' '}
		</Wrapper>
	);
};

const mapStateToProps = (state) => ({
	userData: state?.generalReducer?.userData,
});
export default connect(mapStateToProps, null)(HeroSection);
