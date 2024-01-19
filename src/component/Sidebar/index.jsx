import React from 'react';
import { Wrapper } from './style';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Sidebar = () => {
	const { pathname } = useLocation();
	const navigate = useNavigate();
	const { t } = useTranslation();

	const Data = [
		{
			id: 1,
			title: t('w213'),
			path: '/admin',
		},
		{
			id: 2,
			title: t('w214'),
			path: '/admin/talents',
		},
		{
			id: 3,
			title: t('w215'),
			path: '/admin/call',
		},

		{
			id: 5,
			title: t('w216'),
			path: '/admin/faq',
		},

		{
			id: 49,
			title: t('w217'),
			path: '/admin/courses',
		},

		{
			id: 6,
			title: t('w218'),
			path: '/admin/blog',
		},

		{
			id: 7,
			title: t('w219'),
			path: '/admin/test',
		},
		{
			id: 71,
			title: t('w220'),
			path: '/admin/directions',
		},

		{
			id: 9,
			title: t('w221'),
			path: '/admin/users',
		},

		{
			id: 16,
			title: t('w222'),
			path: '/admin/logo',
		},

		{
			id: 181,
			path: '/admin/contact',
			title: t('w223'),
		},

		{
			id: 185,
			path: '/admin/social',
			title: t('w224'),
		},
	];
	return (
		<Wrapper>
			{Data?.map(
				({ title, path, hidden, disable }, i) =>
					!hidden && (
						<Wrapper.Flex
							className="FlexBox"
							onClick={() => !disable && navigate(path)}
							active={pathname === path}
							key={i}
							disable={disable ? 1 : 0}
						>
							<Wrapper.Title>{title}</Wrapper.Title>
						</Wrapper.Flex>
					),
			)}
		</Wrapper>
	);
};

export default Sidebar;
