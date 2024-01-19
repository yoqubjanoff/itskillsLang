import React, { useState, useEffect } from 'react';
import Add from '../../../assets/icons/add-circle.svg';
import { AndModal, AntSelect, AndModalDelete } from './style';
import { Button, Toast, CustomDatePicker } from '../../generics';
import { Input, Checkbox } from 'antd';
import request from '../../../services/api';
import Work from '../../../assets/icons/round-home-work.svg';
import { DeleteIcon } from '../../generics/genericIcons';
import moment from 'moment';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';

const Experence = ({ getMeFunc }) => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const { TextArea } = Input;
	const [id, setId] = useState(null);
	const [exp, setExp] = useState(null);
	const [isModalOpenDelete, setIsModalOpenDelete] = useState(false);
	const handleOk = () => {
		setIsModalOpen(false);
	};
	const { t } = useTranslation();

	const [data, setData] = useState({
		companyName: '',
		position: '',
		employmentType: '',
		startDate: '',
		description: '',
		endDate: null,
		iCurrentlyWorkHere: false,
	});
	const [error, setError] = useState({
		companyName: null,
		position: null,
		employmentType: null,
		startDate: null,
		endDate: null,
	});

	const options = [
		{
			id: 'FULL_TIME',
			value: 'FULL_TIME',
			label: t('w97'),
		},
		{
			id: 'PART_TIME',
			value: 'PART_TIME',
			label: t('w98'),
		},
		{
			id: 'FREELANCE',
			value: 'FREELANCE',
			label: t('w99'),
		},
		{
			id: 'CONTRACT',
			value: 'CONTRACT',
			label: t('w100'),
		},
	];

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

	const handleCancel = () => {
		setIsModalOpen(false);
		setData({
			...data,
			companyName: '',
			position: '',
			employmentType: '',
			startDate: '',
			description: '',
			endDate: null,
			iCurrentlyWorkHere: false,
		});
		setError({
			companyName: null,
			position: null,
			employmentType: null,
			startDate: null,
			endDate: null,
		});
	};

	const saveFunc = async () => {
		try {
			const response = await request.post('talent/profile/work-experiences', {
				data: {
					...data,
					endDate: data?.iCurrentlyWorkHere ? null : data?.endDate,
				},
			});
			handleCancel();
			getMeFunc.getMe();

			Toast({
				type: t('w252'),
				message: t('w185'),
			});
			getExperience();
		} catch (error) {
			Toast({
				title: error?.response?.data?.resultMsg,
				type: 'error',
			});
		}
	};

	const handleError = (callback) => {
		if (
			!data.companyName ||
			!data.position ||
			!data.employmentType ||
			!data.startDate ||
			(!data.endDate && !data.iCurrentlyWorkHere)
		) {
			setError({
				...error,
				companyName: !data.companyName && t('w186'),
				position: !data.position && t('w186'),
				startDate: !data.startDate && t('w186'),
				endDate: !data.endDate && !data.iCurrentlyWorkHere && t('w186'),
				employmentType: !data.employmentType && t('w186'),
			});
		} else {
			return callback();
		}
	};
	const submitFunction = () => {
		handleError(saveFunc);
	};
	const handleCancelDelete = () => {
		setId(null);
		setIsModalOpenDelete(false);
	};
	const deleteFunc = async () => {
		try {
			const response = await request.delete(
				`talent/profile/work-experiences/${id}`,
			);
			handleCancelDelete();
			getExperience();
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

	const getExperience = async () => {
		try {
			const res = await request.get('talent/profile/work-experiences/all');
			const newRes = res?.data?.data;
			window.scrollTo({ top: 0, behavior: 'smooth' });

			setExp(newRes);
		} catch (error) {
			console.error('Error');
		}
	};

	useEffect(() => {
		getExperience();
	}, []);
	return (
		<div className="w-full min-h-[64px] bg-white p-[20px] border border-solid border-1 border-[#E3E3E7] rounded-[16px]">
			<AndModal
				open={isModalOpen}
				onOk={handleOk}
				onCancel={handleCancel}
				centered
				maskClosable={false}
				title={t('w90')}
				footer={null}
				className="custom-border-radius-modal"
				style={{ width: '680px' }}
			>
				<div className=" w-full flex flex-col mb-[24px] gap-[5px]">
					<p className="text-[#71717A] text-[16px] font-[500]"> {t('w92')}</p>
					<Input
						placeholder={t('w93')}
						style={{ height: '52px', borderRadius: '12px' }}
						name="position"
						value={data?.position}
						onChange={onChange}
					/>
					{error.position && (
						<p className="text-[red] text-[14px] font-[600]">
							{error.position}
						</p>
					)}
				</div>
				<div className=" w-full flex flex-col mb-[24px] gap-[5px]">
					<p className="text-[#71717A] text-[16px] font-[500]">{t('w94')}</p>
					<Input
						placeholder={t('w95')}
						style={{ height: '52px', borderRadius: '12px' }}
						name="companyName"
						value={data?.companyName}
						onChange={onChange}
					/>
					{error.companyName && (
						<p className="text-[red] text-[14px] font-[600]">
							{error.companyName}
						</p>
					)}
				</div>
				<div className=" w-full flex flex-col mb-[24px] gap-[5px]">
					<p className="text-[#71717A] text-[16px] font-[500]">{t('w96')}</p>
					<AntSelect
						options={options}
						style={{ height: '52px' }}
						value={data?.employmentType}
						onSelect={(e) => {
							setData({
								...data,
								employmentType: e,
							});
							setError({
								...error,
								employmentType: null,
							});
						}}
					/>
					{error?.employmentType && (
						<p className="text-[red] text-[14px] font-[600]">
							{error?.employmentType}
						</p>
					)}
				</div>
				<div className="w-full flex flex-col mb-[24px] gap-[5px]">
					<p className="text-[#71717A] text-[16px] font-[500]">{t('w101')}</p>
					<Input
						placeholder={t('w102')}
						style={{ height: '52px', borderRadius: '12px' }}
						name="companyLocation"
						value={data?.companyLocation}
						onChange={onChange}
					/>
				</div>
				<div className="w-full flex  mb-[24px] gap-[5px]">
					<Checkbox
						checked={data?.iCurrentlyWorkHere}
						onChange={(e) =>
							setData({
								...data,
								iCurrentlyWorkHere: e?.target?.checked,
							})
						}
					/>
					<p className="text-[#18181B] text-[14px] font-[600]">{t('w103')}</p>
				</div>

				<div className=" w-full flex   gap-[20px]">
					<div className=" w-full flex flex-col  mb-[24px] gap-[5px]">
						<p className="text-[#71717A] text-[16px] font-[500]">{t('w104')}</p>
						<CustomDatePicker
							onChange={(e, a) => {
								setData({
									...data,
									startDate: moment(a).format('YYYY-MM-DD'),
								});

								setError({
									...error,
									startDate: null,
								});
							}}
							value={data?.startDate}
						/>
						{error.startDate && (
							<p className="text-[red] text-[14px] font-[600]">
								{error.startDate}
							</p>
						)}
					</div>
					<div className=" w-full flex flex-col  mb-[24px] gap-[5px]">
						<p className="text-[#71717A] text-[16px] font-[500]">{t('w105')}</p>
						<CustomDatePicker
							onChange={(e, a) => {
								setData({
									...data,
									endDate: moment(a).format('YYYY-MM-DD'),
								});

								setError({
									...error,
									endDate: null,
								});
							}}
							value={data?.endDate}
						/>
						{error.endDate && (
							<p className="text-[red] text-[14px] font-[600]">
								{error.endDate}
							</p>
						)}
					</div>
				</div>

				<div className=" w-full flex flex-col mb-[24px] gap-[5px]">
					<p className="text-[#71717A] text-[16px] font-[500]">{t('w106')}</p>
					<TextArea
						rows={6}
						placeholder={t('w107')}
						style={{ borderRadius: '12px' }}
						onChange={onChange}
						value={data?.description}
						name="description"
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
						<p className="text-[#17171B] text-[16px] font-[600]">{t('w108')}</p>
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
						<p className="text-[#fff] text-[16px] font-[600]">{t('w109')}</p>
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
						<p className="text-[#17171B] text-[16px] font-[600]">{t('w108')}</p>
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
			<div className="w-full flex justify-between items-center">
				<p className="text-[#18181B] text-[16px] font-[600] ">{t('w91')}</p>

				<img
					src={Add}
					alt="download"
					width={22}
					height={22}
					style={{ cursor: 'pointer' }}
					onClick={() => setIsModalOpen(true)}
				/>
			</div>

			{exp?.map((v, i) => (
				<div
					className="flex py-[20px] gap-[10px] items-start group relative"
					style={{ borderTop: `${i !== 0 && '1px solid #E3E3E7'}` }}
				>
					<div className="min-w-[52px] h-[52px] rounded-[8px] bg-[#F4F4F5] flex items-center justify-center">
						<img src={Work} alt="download" width={30} height={30} />
					</div>
					<div className="flex flex-col  gap-[8px] items-start">
						<div className="flex gap-[10px]">
							<p className="text-[#18181B] text-[18px] font-[600] ">
								{v?.position}
							</p>
						</div>
						<p className="text-[#18181B] text-[16px] font-[500] opacity-70">
							{`${v?.companyName} - ${v?.employmentTypeCaption}`}
						</p>
						<p className="text-[#18181B] text-[16px] font-[500] opacity-70">
							{`${moment(v?.startDate).format('yyyy MMM')} - ${
								v?.endDate
									? moment(v?.endDate || null).format('yyyy MMM')
									: moment().format('yyyy MMM')
							}`}
						</p>
						<p className="text-[#18181B] text-[16px] font-[500] opacity-70 whitespace-wrap">
							{v?.description}
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
export default connect(mapStateToProps, null)(Experence);
