import React, { useState, useEffect } from 'react';
import { Wrapper, AntSelect } from '../NewHome/SearchEmploye/style';
import Search from '../../assets/icons/search-normal.svg';
import request from '../../services/api/hr-request';
import Card from '../NewHome/SearchEmploye/card';
import { useNavigate, useLocation } from 'react-router-dom';
import Navbar from '../Navbar';
import Setting from '../../assets/icons/setting.svg';
import { Toast, Button } from '../generics';
import CardComponent from '../NewHome/Partners/card';
import { Popover } from 'antd';
import { AntSelectFilter } from './style';
const Explore = () => {
	const navigate = useNavigate();
	const { search } = useLocation();
	const [data, setData] = useState([]);
	const [subDirection, setSubDirection] = useState([]);
	const [direction, setDirection] = useState([]);
	const [regions, setRegions] = useState([]);
	const [languages, setLanguages] = useState([]);
	const [directionCaption, setDirectionCaption] = useState('');
	const [subDirectionCaption, setSubDirectionCaption] = useState('');
	const [regionCaption, setRegionCaption] = useState('');
	const [languageCaption, setLanguageCaption] = useState('');
	const [salaryCaption, setSalaryCaption] = useState('');
	const getDirection = async () => {
		try {
			const res = await request.get('hr/directions/all');
			setDirection(res?.data?.data);
		} catch (error) {
			console.error('Error');
		}
	};

	const getLanguages = async () => {
		try {
			const res = await request.get('hr/languages/all');
			setLanguages(res?.data?.data);
		} catch (error) {
			console.error('Error');
		}
	};
	const getRegions = async () => {
		try {
			const res = await request.get('hr/regions/all');
			setRegions(res?.data?.data);
		} catch (error) {
			console.error('Error');
		}
	};

	const salaryOptions = [
		{
			id: 1000,
			caption: '1000 $',
		},
		{
			id: 2000,
			caption: '2000 $',
		},
		{
			id: 3000,
			caption: '3000 $',
		},
		{
			id: 4000,
			caption: '4000 $',
		},
		{
			id: 5000,
			caption: '5000 $',
		},
	];

	const optionsDirection = direction.map((v) => {
		return {
			id: v?.id,
			value: v?.id,
			label: v?.caption,
			sub: v?.subDirections,
		};
	});

	const optionsLanguage = languages.map((v) => {
		return {
			id: v?.id,
			value: v?.id,
			label: v?.caption,
		};
	});
	// const optionsLanguage = languages.map((v) => {
	// 	return {
	// 		id: v?.id,
	// 		value: v?.id,
	// 		label: v?.caption,
	// 	};
	// });

	const getTalents = async () => {
		try {
			const res = await request.get(`hr/explore${search || ''}`);
			// setTotalElements(res?.data?.pagination?.totalElements);
			setData(res?.data?.data);
		} catch (error) {
			Toast({
				message: error?.response?.data?.resultMsg,
				type: 'error',
			});
		}
	};
	const content = (
		<div className="flex flex-col gap-[16px] w-[340px] h-[552px] max-[450px]:w-[270px]">
			<div className=" w-full flex flex-col  gap-[5px]">
				<p className="text-[#71717A] text-[16px] font-[500]">Yo’nalish</p>

				<AntSelectFilter
					options={optionsDirection}
					style={{ height: '52px' }}
					onChange={(e, opt) => {
						setDirectionCaption(opt?.label);
						setSubDirection(opt?.sub);
					}}
				/>
			</div>
			<div className=" w-full flex flex-col  gap-[5px]">
				<p className="text-[#71717A] text-[16px] font-[500]">
					Ichki yo’nalish bo’yicha
				</p>
				<AntSelectFilter
					style={{ height: '52px' }}
					options={subDirection}
					onChange={(e, opt) => {
						setSubDirectionCaption(opt?.caption);
					}}
				/>
			</div>
			<div className=" w-full flex flex-col  gap-[5px]">
				<p className="text-[#71717A] text-[16px] font-[500]">
					Joylashuv bo’yicha
				</p>
				<AntSelectFilter
					onChange={(e, opt) => {
						setRegionCaption(opt?.caption);
					}}
					style={{ height: '52px' }}
					options={regions}
				/>
			</div>
			<div className=" w-full flex flex-col  gap-[5px]">
				<p className="text-[#71717A] text-[16px] font-[500]">Til bo’yicha</p>
				<AntSelectFilter
					style={{ height: '52px' }}
					onChange={(e, opt) => {
						setLanguageCaption(opt?.caption);
					}}
					options={optionsLanguage}
				/>
			</div>
			<div className=" w-full flex flex-col mb-[10px] gap-[5px]">
				<p className="text-[#71717A] text-[16px] font-[500]">Masimum maosh</p>
				<AntSelectFilter options={salaryOptions} style={{ height: '52px' }} />
			</div>
			<div className="flex w-full justify-end gap-[5px]">
				<Button
					type="danger"
					radius={'12px'}
					height={'32px'}
					padding={'6px 18px'}
					bgcolor={'#DC2626'}
					width={'fit-content'}
				>
					<p className="text-[#fff] text-[14px] font-[600]">Tozalash</p>
				</Button>
				<Button
					type="default"
					radius={'12px'}
					height={'32px'}
					width={'fit-content'}
					padding={'6px 18px'}
					bgcolor={'#2563EB'}
				>
					<p className="text-[#fff] text-[14px] font-[600]">Saqlash</p>
				</Button>
			</div>
		</div>
	);
	useEffect(() => {
		getDirection();
		getTalents();
		getRegions();
		getLanguages();
	}, []);
	return (
		<Wrapper>
			<Navbar />
			<p className="font-[Vollkorn] text-[#18181B] text-[34px] font-[600] max-[450px]:text-[22px] mt-[120px] ">
				Mutaxasislarni toping
			</p>
			<Wrapper.SearchBox>
				<img
					src={Search}
					alt="Search"
					width={32}
					height={32}
					style={{ opacity: '0.2' }}
				/>
				<AntSelect
					showSearch
					placeholder="Soha bo’yicha qidiring "
					style={{ width: '100%', border: 'none', height: '100%' }}
					options={optionsDirection}
					optionFilterProp="children"
					filterOption={(input, option) =>
						(option?.label ?? '').includes(input)
					}
					filterSort={(optionA, optionB) =>
						(optionA?.label ?? '')
							.toLowerCase()
							.localeCompare((optionB?.label ?? '').toLowerCase())
					}
					onSelect={(e, opt) => navigate('/explore')}
				/>

				<Popover content={content} trigger="click" placement="bottomRight">
					<img
						src={Setting}
						alt="Setting"
						width={32}
						height={32}
						style={{ cursor: 'pointer' }}
					/>
				</Popover>
			</Wrapper.SearchBox>
			<p className="category">Yoki sohani tanlang...</p>
			<Wrapper.CategoryBox style={{ margin: '0 0 100px 0' }}>
				{subDirection?.map((v, i) => (
					<CardComponent data={v} key={i} />
				))}
			</Wrapper.CategoryBox>
			<div className="w-full flex justify-center mt-[50px] ">
				<div className="max-w-[1800px] flex flex-wrap gap-[20px] justify-center ">
					{data?.map((v, i) => (
						<Card data={v} id={i} key={i} />
					))}
				</div>
			</div>
		</Wrapper>
	);
};

export default Explore;
