import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { PlusUserIcon } from '../../../component/generics/genericIcons';
import { CustomTag, CardAdmin } from '../../../component/generics';
import { Replace } from '../../../services/Replace.js';
import { useSearch } from '../../../services/Search';
import { useTranslation } from 'react-i18next';
import request from '../../../services/api';
import { Wrapper } from './style';

const AdminView = () => {
	const { t } = useTranslation();

	const [statistic, setStatistic] = useState({
		detailedTestFailedCount: 0,
		detailedTestFailedCountProportion: 0,
		detailedTestPassedCount: 0,
		detailedTestPassedCountProportion: 0,
		newRegistered: 0,
		newRegisteredProportion: 0,
		standardTestFailedCount: 0,
		standardTestFailedCountProportion: 0,
		standardTestPassedCount: 0,
		standardTestPassedCountProportion: 0,
		totalVisitsCount: 0,
		totalVisitsCountProportion: 0,
	});
	const {
		detailedTestFailedCount,
		detailedTestFailedCountProportion,
		detailedTestPassedCount,
		detailedTestPassedCountProportion,
		newRegistered,
		newRegisteredProportion,
		standardTestFailedCount,
		standardTestFailedCountProportion,
		standardTestPassedCount,
		standardTestPassedCountProportion,
		totalVisitsCount,
		totalVisitsCountProportion,
	} = statistic;
	const { search, pathname } = useLocation();

	const query = useSearch();
	const navigate = useNavigate();

	const getMe = async () => {
		if (!localStorage.getItem('adminName')) {
			try {
				const res = await request.get('admin/accounts/me');
				localStorage.setItem(
					'adminName',
					res?.data?.data?.firstName + ' ' + res?.data?.data?.lastName,
				);
			} catch (error) {
				console.log(error);
			}
		}
	};
	const getStatistic = async () => {
		if (query.get('dayOrWeekOrMonth')) {
			try {
				const res = await request.get(
					`admin/user-talents/count-stats${search || ''}`,
				);
				setStatistic(res?.data?.data);
			} catch (error) {
				console.log(error);
			}
		}
	};
	useEffect(() => {
		navigate(`${pathname}${Replace('dayOrWeekOrMonth', 'DAILY')}`);
		getMe();
	}, []);

	useEffect(() => {
		getStatistic();
	}, [search]);

	const cardData = [
		{
			id: 1,
			name: t('w228'),
			number: newRegistered,
			percent:
				newRegisteredProportion > 0
					? `+${newRegisteredProportion}%`
					: `${newRegisteredProportion}%`,
			inc: newRegisteredProportion >= 0 ? true : false,
			icon: <PlusUserIcon />,
		},
		{
			id: 2,
			name: t('w229'),
			number: totalVisitsCount,
			inc: totalVisitsCountProportion >= 0 ? true : false,
			percent:
				totalVisitsCountProportion > 0
					? `+${totalVisitsCountProportion}%`
					: `${totalVisitsCountProportion}%`,
			icon: <PlusUserIcon />,
		},
		{
			id: 1,
			name: t('w230'),
			number: standardTestPassedCount,
			inc: standardTestPassedCountProportion >= 0 ? true : false,
			percent:
				standardTestPassedCountProportion > 0
					? `+${standardTestPassedCountProportion}%`
					: `${standardTestPassedCountProportion}%`,

			icon: <PlusUserIcon />,
		},
		{
			id: 1,
			name: t('w231'),
			number: detailedTestPassedCount,
			inc: detailedTestPassedCountProportion >= 0 ? true : false,
			percent:
				detailedTestPassedCountProportion > 0
					? `+${detailedTestPassedCountProportion}%`
					: `${detailedTestPassedCountProportion}%`,
			icon: <PlusUserIcon />,
		},
		{
			id: 1,
			name: t('w232'),
			number: standardTestFailedCount,
			inc: standardTestFailedCountProportion >= 0 ? true : false,
			percent:
				standardTestFailedCountProportion > 0
					? `+${standardTestFailedCountProportion}%`
					: `${standardTestFailedCountProportion}%`,
			icon: <PlusUserIcon />,
		},
		{
			id: 1,
			name: t('w233'),
			number: detailedTestFailedCount,
			inc: detailedTestFailedCountProportion >= 0 ? true : false,
			percent:
				detailedTestFailedCountProportion > 0
					? `+${detailedTestFailedCountProportion}%`
					: `${detailedTestFailedCountProportion}%`,
			icon: <PlusUserIcon />,
		},
	];
	return (
		<Wrapper>
			<div className="FlexBox">
				<div className="ColumnBox">
					<p className="Header">{t('w213')}</p>
					<div className="TagBox">
						<CustomTag
							title={t('w225')}
							active={query.get('dayOrWeekOrMonth') === 'DAILY' ? 1 : 0}
							onClick={() =>
								navigate(`${pathname}${Replace('dayOrWeekOrMonth', 'DAILY')}`)
							}
						/>
						<CustomTag
							title={t('w226')}
							active={query.get('dayOrWeekOrMonth') === 'WEEKLY' ? 1 : 0}
							onClick={() =>
								navigate(`${pathname}${Replace('dayOrWeekOrMonth', 'WEEKLY')}`)
							}
						/>
						<CustomTag
							title={t('w227')}
							active={query.get('dayOrWeekOrMonth') === 'MONTHLY' ? 1 : 0}
							onClick={() =>
								navigate(`${pathname}${Replace('dayOrWeekOrMonth', 'MONTHLY')}`)
							}
						/>
					</div>

					<div className="Box">
						{cardData?.map(({ name, number, percent, icon, inc }, i) => (
							<CardAdmin
								key={i}
								name={name}
								number={number}
								percent={percent}
								icon={icon}
								inc={inc ? 1 : 0}
							/>
						))}
					</div>
				</div>
			</div>
		</Wrapper>
	);
};

export default AdminView;
