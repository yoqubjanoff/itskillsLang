import React, { useState, useEffect } from 'react';
import Add from '../../../assets/icons/add-circle.svg';
import { AndModal, AndModalDelete } from './style';
import { Button, CustomDatePicker, Toast } from '../../generics';
import { Input } from 'antd';
import Work from '../../../assets/icons/round-home-work.svg';
import moment from 'moment';
import request from '../../../services/api';
import { DeleteIcon } from '../../generics/genericIcons';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';

const Education = ({ getMeFunc }) => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const { TextArea } = Input;
	const [education, setEducation] = useState([]);
	const [id, setId] = useState(null);
	const [isModalOpenDelete, setIsModalOpenDelete] = useState(false);
	const { t } = useTranslation();

	const [data, setData] = useState({
		educationCenterName: '',
		degree: '',
		direction: '',
		startedDate: '',
		definition: '',
		endedDate: null,
	});

	const [error, setError] = useState({
		educationCenterName: null,
		degree: null,
		direction: null,
		startedDate: null,
		definition: null,
		endedDate: null,
	});

	const onChange = (e) => {
		const { value, name } = e.target;
		setData({
			...data,
			[name]: value,
		});
		setError({
			...error,
			[name]: null,
		});
	};
	const handleOk = () => {
		setIsModalOpen(false);
	};
	const handleCancel = () => {
		setIsModalOpen(false);
		setData({
			...data,
			educationCenterName: '',
			degree: '',
			direction: '',
			startedDate: '',
			definition: '',
			endedDate: null,
		});
		setError({
			educationCenterName: null,
			degree: null,
			direction: null,
			startedDate: null,
			definition: null,
			endedDate: null,
		});
	};

	const saveFunc = async () => {
		try {
			const response = await request.post('talent/profile/talent-education', {
				data,
			});
			setIsModalOpen(false);
			setData({
				...data,
				educationCenterName: '',
				degree: '',
				direction: '',
				startedDate: '',
				definition: '',
				endedDate: null,
			});
			Toast({
				type: t('w252'),
				message: t('w188'),
			});
			getEducation();
			getMeFunc.getMe();
		} catch (error) {
			Toast({
				title: error?.response?.data?.resultMsg,
				type: 'error',
			});
		}
	};
	const handleError = (callback) => {
		if (
			!data.educationCenterName ||
			!data.degree ||
			!data.direction ||
			!data.startedDate ||
			!data.endedDate
		) {
			setError({
				...error,
				educationCenterName: !data.educationCenterName && t('w186'),
				degree: !data.degree && t('w186'),
				direction: !data.direction && t('w186'),
				startedDate: !data.startedDate && t('w186'),
				endedDate: !data.endedDate && t('w186'),
			});
		} else {
			return callback();
		}
	};
	const submitFunction = () => {
		handleError(saveFunc);
	};
	const getEducation = async () => {
		try {
			const res = await request.get('talent/profile/talent-education/all');
			const newRes = res?.data?.data;
			setEducation(newRes);
			window.scrollTo({ top: 0, behavior: 'smooth' });
		} catch (error) {
			console.error('Error');
		}
	};
	const handleCancelDelete = () => {
		setId(null);
		setIsModalOpenDelete(false);
	};
	const deleteFunc = async () => {
		try {
			const response = await request.delete(
				`talent/profile/talent-education/${id}`,
			);
			handleCancelDelete();
			getEducation();
			getMeFunc.getMe();
			Toast({
				type: t('w252'),
				message: t('w187'),
			});
		} catch (error) {
			Toast({
				title: error?.response?.data?.resultMsg,
				type: 'error',
			});
		}
	};
	useEffect(() => {
		getEducation();
	}, []);

	return (
		<div className="w-full min-h-[64px] flex flex-col bg-white p-[20px] border border-solid border-1 border-[#E3E3E7] rounded-[16px]">
			<AndModal
				open={isModalOpen}
				onOk={handleOk}
				onCancel={handleCancel}
				centered
				maskClosable={false}
				title={t('w80')}
				footer={null}
				className="custom-border-radius-modal"
				style={{ width: '680px' }}
			>
				<div className=" w-full flex flex-col mb-[24px] gap-[5px]">
					<p className="text-[#71717A] text-[16px] font-[500]">{t('w79')}</p>
					<Input
						style={{ height: '52px', borderRadius: '12px' }}
						name="educationCenterName"
						value={data?.educationCenterName}
						onChange={onChange}
					/>
					{error.educationCenterName && (
						<p className="text-[red] text-[14px] font-[600]">
							{error.educationCenterName}
						</p>
					)}
				</div>
				<div className=" w-full flex flex-col mb-[24px] gap-[5px]">
					<p className="text-[#71717A] text-[16px] font-[500]">{t('w76')}</p>
					<Input
						style={{ height: '52px', borderRadius: '12px' }}
						name="degree"
						value={data?.degree}
						onChange={onChange}
					/>
					{error.degree && (
						<p className="text-[red] text-[14px] font-[600]">{error.degree}</p>
					)}
				</div>
				<div className=" w-full flex flex-col mb-[24px] gap-[5px]">
					<p className="text-[#71717A] text-[16px] font-[500]">{t('w83')}</p>
					<Input
						style={{ height: '52px', borderRadius: '12px' }}
						name="direction"
						value={data?.direction}
						onChange={onChange}
					/>
					{error.direction && (
						<p className="text-[red] text-[14px] font-[600]">
							{error.direction}
						</p>
					)}
				</div>

				<div className=" w-full flex   gap-[20px] max-[550px]:flex-col max-[550px]:mb-[24px]">
					<div className=" w-full flex flex-col  mb-[24px] gap-[5px] max-[550px]:mb-[0px]">
						<p className="text-[#71717A] text-[16px] font-[500]">{t('w84')}</p>
						<CustomDatePicker
							onChange={(e, a) => {
								setData({
									...data,
									startedDate: moment(a).format('YYYY-MM-DD'),
								});

								setError({
									...error,
									startedDate: null,
								});
							}}
							value={data?.startedDate}
						/>
						{error.startedDate && (
							<p className="text-[red] text-[14px] font-[600]">
								{error.startedDate}
							</p>
						)}
					</div>
					<div className=" w-full flex flex-col  mb-[24px] gap-[5px] max-[550px]:mb-[0px]">
						<p className="text-[#71717A] text-[16px] font-[500]">{t('w85')}</p>
						<CustomDatePicker
							value={data?.endedDate}
							onChange={(e, a) => {
								setData({
									...data,
									endedDate: moment(a).format('YYYY-MM-DD'),
								});
								setError({
									...error,
									endedDate: null,
								});
							}}
						/>
						{error.endedDate && (
							<p className="text-[red] text-[14px] font-[600]">
								{error.endedDate}
							</p>
						)}
					</div>
				</div>

				<div className=" w-full flex flex-col mb-[24px] gap-[5px]">
					<p className="text-[#71717A] text-[16px] font-[500]">{t('w86')}</p>
					<TextArea
						rows={6}
						placeholder={t('w87')}
						style={{ borderRadius: '12px' }}
						value={data?.definition}
						name="definition"
						onChange={onChange}
					/>
				</div>
				<div className="w-full flex justify-end gap-[16px]">
					<Button
						radius={'12px'}
						height={'44px'}
						width={'110px'}
						padding={'12px 32px'}
						bgcolor={'#fff'}
						margin={'16px 0 0 0'}
						onClick={() => setIsModalOpen(false)}
					>
						<p className="text-[#17171B] text-[16px] font-[600]">{t('w88')}</p>
					</Button>
					<Button
						type="primary"
						radius={'12px'}
						height={'44px'}
						width={'110px'}
						padding={'12px 32px'}
						bgcolor={'#2563EB'}
						margin={'16px 0 0 0'}
						onClick={submitFunction}
					>
						<p className="text-[#fff] text-[16px] font-[600]">{t('w89')}</p>
					</Button>
				</div>
			</AndModal>
			<AndModalDelete
				open={isModalOpenDelete}
				onCancel={handleCancelDelete}
				centered
				maskClosable={false}
				footer={null}
				className="custom-border-radius-modal"
				style={{ width: '350px' }}
				closeIcon={null}
			>
				<p className="text-[#17171B] text-[24px] font-[600] text-center mb-[20px]">
					{t('w176')}
				</p>

				<div className="w-full flex justify-end gap-[16px] max-[500px]:flex-col max-[500px]:items-center">
					<Button
						radius={'12px'}
						height={'44px'}
						width={'195px'}
						padding={'12px 32px'}
						bgcolor={'#fff'}
						margin={'16px 0 0 0'}
						onClick={handleCancelDelete}
					>
						<p className="text-[#17171B] text-[16px] font-[600]">{t('w71')}</p>
					</Button>
					<Button
						type="primary"
						danger
						radius={'12px'}
						height={'44px'}
						width={'195px'}
						padding={'12px 32px'}
						bgcolor={'#DC2626'}
						margin={'16px 0 0 0'}
						onClick={deleteFunc}
					>
						<p className="text-[#fff] text-[16px] font-[600]">{t('w177')}</p>
					</Button>
				</div>
			</AndModalDelete>
			<div className="w-full flex  justify-between items-center">
				<p className="text-[#18181B] text-[16px] font-[600] ">{t('w80')}</p>

				<img
					src={Add}
					alt="download"
					width={22}
					height={22}
					style={{ cursor: 'pointer' }}
					onClick={() => setIsModalOpen(true)}
				/>
			</div>

			{education?.map((v, i) => (
				<div
					key={i}
					className="flex py-[20px] gap-[10px] items-start relative group"
					style={{ borderTop: `${i !== 0 && '1px solid #E3E3E7'}` }}
				>
					<div className="min-w-[52px] h-[52px] rounded-[8px] bg-[#F4F4F5] flex items-center justify-center">
						<img
							src={v?.photoUrl || Work}
							alt="download"
							width={30}
							height={30}
						/>
					</div>
					<div className="flex flex-col  gap-[8px] items-start">
						<div className="flex gap-[10px] items-center">
							<p className="text-[#18181B] text-[18px] font-[600] ">
								{v?.educationCenterName}
							</p>
							<p className="text-[#18181B] text-[16px] font-[500] opacity-70">
								{`${moment(v?.startedDate).format('yyyy MMM')} - ${moment(
									v?.endedDate,
								).format('yyyy MMM')}`}
							</p>
						</div>
						<p className="text-[#18181B] text-[16px] font-[500] opacity-70">
							{v?.direction}
						</p>
						<p className="text-[#18181B] text-[16px] font-[500] opacity-70 whitespace-wrap">
							{v?.definition}
						</p>
					</div>
					<DeleteIcon
						width={'20px'}
						height={'20px'}
						stroke="red"
						className="cursor-pointer absolute right-[25px] top-[15px] hidden group-hover:block "
						onClick={() => {
							setId(v?.id);
							setIsModalOpenDelete(true);
						}}
					/>
				</div>
			))}
		</div>
	);
};

const mapStateToProps = (state) => ({
	getMeFunc: state.generalReducer.getMe,
});
export default connect(mapStateToProps, null)(Education);
