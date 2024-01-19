import React, { useState, useEffect } from 'react';
import { Wrapper } from './style';
import {
	LogoIcon,
	UserIcon,
	LogoutIcon,
	KeyIcon,
} from '../../component/generics/genericIcons';
import { Popup } from '../../component/generics';
import { useNavigate } from 'react-router-dom';
import { AntdSelectLanguage } from '../Navbar/style';
import { useTranslation } from 'react-i18next';
import '../../i18n';
import Uz from '../../assets/icons/uzFlag.svg';
import En from '../../assets/icons/enFlag.svg';
import Ru from '../../assets/icons/ruFlag.svg';
const Navbar = () => {
	const { Option } = AntdSelectLanguage;
	const { t, i18n } = useTranslation();
	const navigate = useNavigate();
	const [lan, setLan] = useState('');

	const optionsLangue = [
		{
			value: 'UZB',
			label: (
				<div
					className="flex items-center gap-[10px]"
					style={{
						gap: '2px',
						display: 'flex',
						height: '30px',
						alignItems: 'center',
					}}
				>
					<img
						src={Uz}
						alt="UZB"
						width={26}
						height={20}
						style={{ margin: '0 5px 0 0' }}
					/>
					<p className="middle">UZB</p>
				</div>
			),
		},
		{
			value: 'ENG',
			label: (
				<div
					className="flex items-center gap-[10px]"
					style={{
						gap: '2px',
						display: 'flex',
						height: '30px',
						alignItems: 'center',
					}}
				>
					<img
						src={En}
						alt="ENG"
						width={26}
						height={20}
						style={{ margin: '0 5px 0 0' }}
					/>
					<p className="middle">ENG</p>
				</div>
			),
		},

		{
			value: 'RUS',
			label: (
				<div
					className="flex items-center gap-[10px]"
					style={{
						gap: '2px',
						display: 'flex',
						height: '30px',
						alignItems: 'center',
					}}
				>
					<img
						src={Ru}
						alt="RU"
						width={26}
						height={20}
						style={{ margin: '0 5px 0 0' }}
					/>
					<p className="middle">RUS</p>
				</div>
			),
		},
	];
	const [open, setOpen] = useState(false);
	const closeFunc = () => {
		Popup({
			title: 'Do you want to log out ?',
			isConfirmedFunction: () => closed(),
			showCancelButton: true,
			type: 'question',
		});
	};
	const closed = () => {
		setOpen(!open);
		localStorage.removeItem('tokenAdmin');
		localStorage.removeItem('adminName');
		navigate('/admin/sign-in');
	};
	const ChangeLanguage = (e) => {
		if (e === 'UZB') {
			setLan('UZB');
			i18n?.changeLanguage('uz');
		} else if (e === 'RUS') {
			setLan('RUS');
			i18n?.changeLanguage('ru');
		} else if (e === 'ENG') {
			setLan('ENG');
			i18n?.changeLanguage('en');
		}
	};
	useEffect(() => {
		if (i18n.language === 'uz') {
			setLan('UZB');
		} else if (i18n.language === 'ru') {
			setLan('RUS');
		} else if (i18n.language === 'en') {
			setLan('ENG');
		}
	}, []);
	return (
		<Wrapper tabIndex={0} onBlur={() => setOpen(false)}>
			<LogoIcon color={'false'} width={'100px'} onClick={() => navigate('/')} />
			<div className="flex gap-[40px]">
				<AntdSelectLanguage
					onChange={ChangeLanguage}
					value={lan}
					options={optionsLangue}
					suffixIcon={''}
					style={{ height: '44px', borderRadius: '12px', width: '93px' }}
				>
					{optionsLangue?.length &&
						optionsLangue?.map((o) => {
							return (
								<Option key={o?.label} value={o?.label}>
									{o?.label}
								</Option>
							);
						})}
				</AntdSelectLanguage>

				<div className="FlexBoxAdmin" onClick={() => setOpen(!open)}>
					<div className="Box">
						<UserIcon />
					</div>
					<p>{localStorage.getItem('adminName')}</p>
				</div>
			</div>

			<Wrapper.Column open={open ? 1 : 0}>
				<Wrapper.Element
					first="true"
					onClick={() => {
						// e.stopPropagation();
						// e.nativeEvent.stopImmediatePropagation();
						navigate('/admin/change-password');
						setOpen(false);
					}}
				>
					<KeyIcon />
					{t('w178')}
				</Wrapper.Element>
				<Wrapper.Element onClick={closeFunc}>
					<LogoutIcon />
					log out
				</Wrapper.Element>
			</Wrapper.Column>
		</Wrapper>
	);
};

export default Navbar;
