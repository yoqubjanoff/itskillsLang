import React, { useState, useEffect, useRef } from 'react';
import Navbar from '../../Navbar';
import Footer from '../../Footer';
import download from '../../../assets/icons/Icon.svg';
import Edit from '../../../assets/icons/edit.svg';
import Calendar from '../../../assets/icons/calendar.svg';
import Cms from '../../../assets/icons/sms.svg';
import Call from '../../../assets/icons/call.svg';
import Location from '../../../assets/icons/location.svg';
import Eye from '../../../assets/icons/eye.svg';
import Copy from '../../../assets/icons/save-2.svg';
import Search from '../../../assets/icons/search-normal.svg';
import LinkTest from '../../../assets/icons/link-test.svg';
import Profile from '../../../assets/icons/profile-circle.svg';
import Example from '../../../assets/img/profile-example.png';
import { useTranslation } from 'react-i18next';
import {
	AndImage,
	AndModal,
	AntSelect,
	AntDatePicker,
	AndModalDownload,
	StyleButton,
} from './style';
import PortfolioComponent from './portfolio';
import Award from './awards';
import Education from './education';
import Language from './language';
import Salary from './salaryComponent';
// import Skills from './skills';
import Experence from './experence';
import About from './about';
import { Input, Radio } from 'antd';
import request from '../../../services/api';
import { Button, Toast, CustomDatePicker } from '../../generics';
import { useNavigate } from 'react-router-dom';
import {
	getMeFunction,
	setUserData,
} from '../../../redux/actions/generalActions';
import { connect } from 'react-redux';
import { uploadFileTalent } from '../../../services/fileUpload';
import moment from 'moment';
import Uz from '../../../assets/icons/uzFlag.svg';
import En from '../../../assets/icons/enFlag.svg';
import Ru from '../../../assets/icons/ruFlag.svg';
import { DownloadResume } from '../../../services/downloadResume/index';
const TalentProfile = ({ getMeFunction, setUserData, userData }) => {
	// Create styles
	const navigate = useNavigate();
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [openCalendar, setOpenCalendar] = useState(false);
	const [openCalendar1, setOpenCalendar1] = useState(false);
	const [openDownload, setOpenDownload] = useState(false);
	const [value, setValue] = useState('uz');
	const { t } = useTranslation();

	const showModalDownload = () => {
		setOpenDownload(true);
	};

	const handleCancelDownload = () => {
		setOpenDownload(false);
	};
	const inputRef = useRef(null);
	const [loading, setLoading] = useState(false);
	const [data, setData] = useState({
		email: '',
		birthDate: '',
		phoneNumber: '',
		regionName: '',
		aboutMe: '',
		firstName: '',
		id: '',
		profilePhotoUrl: '',
		minSalary: '',
	});
	const [error, setError] = useState({
		birthDate: null,
		phoneNumber: null,
		regionName: null,
		firstName: null,
	});

	const [editData, setEditData] = useState({});
	const UploadImage = () => {
		inputRef?.current?.click();
	};
	const onChangeFunction = (e) => {
		const { value, name } = e.target;
		setEditData({
			...editData,
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
		setError({
			...error,
			birthDate: null,
			phoneNumber: null,
			regionName: null,
			firstName: null,
		});
		setEditData({});
		setIsModalOpen(false);
	};

	const [subDirection, setSubDirection] = useState([]);
	const getDirection = async () => {
		try {
			const res = await request.get('base');
			const newRes = res?.data?.data?.filter((v) => v?.count !== '0');
			setSubDirection(newRes);
		} catch (error) {
			console.error('Error');
		}
	};
	const options = subDirection.map((v) => {
		return {
			id: v?.id,
			value: v?.id,
			label: v?.caption,
		};
	});

	const extraFooterComponent = () => (
		<div className="w-full flex gap-[10px] h-[60px] items-center justify-center">
			<Button
				radius={'12px'}
				height={'44px'}
				width={'110px'}
				padding={'12px 32px'}
				bgcolor={'#fff'}
				onClick={() => setOpenCalendar(false)}
			>
				<p className="text-[#17171B] text-[16px] font-[600]">{t('w193')}</p>
			</Button>
			<Button
				type="primary"
				radius={'12px'}
				height={'44px'}
				width={'110px'}
				padding={'12px 32px'}
				bgcolor={'#2563EB'}
				onClick={() => setOpenCalendar(false)}
			>
				<p className="text-[#fff] text-[16px] font-[600]">{t('w194')}</p>
			</Button>
		</div>
	);
	const getMe = async () => {
		try {
			const res = await request.get('talent/profile/me');
			setUserData(res?.data?.data);
			window.scrollTo({ top: 0, behavior: 'smooth' });

			setData({
				...data,
				email: res?.data?.data?.email,
				birthDate: res?.data?.data?.birthDate,
				phoneNumber: res?.data?.data?.phoneNumber,
				regionName: res?.data?.data?.regionName,
				aboutMe: res?.data?.data?.aboutMe,
				firstName: res?.data?.data?.firstName,
				id: res?.data?.data?.id,
				profilePhotoUrl: res?.data?.data?.profilePhotoUrl,
				minSalary: res?.data?.data?.minSalary,
				subDirectionCaption: res?.data?.data?.subDirectionCaption,
				subDirectionId: res?.data?.data?.subDirectionId,
				standardTestScore: res?.data?.data?.standardTestScore,
			});
			setEditData({
				...data,
				email: res?.data?.data?.email,
				birthDate: res?.data?.data?.birthDate,
				phoneNumber: res?.data?.data?.phoneNumber,
				regionName: res?.data?.data?.regionName,
				aboutMe: res?.data?.data?.aboutMe,
				firstName: res?.data?.data?.firstName,
				id: res?.data?.data?.id,
				profilePhotoUrl: res?.data?.data?.profilePhotoUrl,
				subDirectionCaption: res?.data?.data?.subDirectionCaption,
				subDirectionId: res?.data?.data?.subDirectionId,
				standardTestScore: res?.data?.data?.standardTestScore,
			});
		} catch (error) {
			console.error('Error');
		}
	};
	const handleError = (callback) => {
		if (!editData.birthDate || !editData.phoneNumber || !editData.firstName) {
			setError({
				...error,
				birthDate: !editData.birthDate && t('w186'),
				phoneNumber: !editData.phoneNumber && t('w186'),
				firstName: !editData.firstName && t('w186'),
			});
		} else {
			return callback();
		}
	};
	const submitFunction = () => {
		handleError(editContact);
	};
	const editContact = async () => {
		try {
			const response = await request.put('talent/profile/edit', {
				data: {
					...editData,
				},
			});
			setIsModalOpen(false);
			Toast({
				type: t('w252'),
				message: t('w195'),
			});
			getMe();
		} catch (error) {
			Toast({
				message: error?.response?.data?.resultMsg,
				type: 'error',
			});
		}
	};
	const changeFile = async (e) => {
		setLoading(true);
		if (e?.target?.files[0]) {
			const response = await uploadFileTalent(e?.target?.files[0]);

			setEditData({
				...editData,
				profilePhotoUrl: response?.fileUrl,
			});
			setLoading(false);
		}
	};

	const readyTest = () => {
		if (
			userData?.firstName &&
			userData?.phoneNumber &&
			userData?.birthDate &&
			userData?.userLangLevels?.length &&
			userData?.educationUserTalents?.length
		) {
			data?.standardTestScore > 60
				? navigate('/ready-test-detailed')
				: navigate('/ready-test-standart');
		} else {
			Toast({
				message: 'Please fill in your information',
				type: 'error',
			});
		}
	};

	useEffect(() => {
		getMe();
		getDirection();
		getMeFunction(getMe);
	}, []);

	const getFile = async () => {
		DownloadResume(value, userData, handleCancelDownload);
	};

	return (
		<div className="w-full  flex flex-col items-center bg-[#f4f4f5] ">
			<AndModalDownload
				open={openDownload}
				footer={null}
				onCancel={handleCancelDownload}
				centered={true}
				style={{ width: 'fit-content' }}
			>
				<div className="flex flex-col gap-[16px]">
					<div className="flex gap-[10px] ">
						<p className="text-[#18181B] text-[14px] font-[600] ">
							{t('w137')}
						</p>
						<img
							src={download}
							alt="download"
							width={20}
							height={20}
							style={{ cursor: 'pointer' }}
						/>
					</div>

					<Radio.Group value={value}>
						<div
							className="max-w-[638px] flex gap-[16px] mb-[24px]
						 max-[1000px]:flex-col max-[1000px]:gap-[22px] max-[1000px]:items-center"
						>
							<div
								onClick={() => {
									setValue('uz');
								}}
								className={`w-[240px] flex h-[44px] px-[16px] justify-between items-center gap-[5px] border border-solid
					border-[#D4D4D8] shadow-[0px 1px 2px 0px rgba(15, 15, 16, 0.05);] rounded-[12px]  cursor-pointer 
					${value === 'uz' ? 'bg-[#F4F7FE] border-[blue] border-opacity-50' : ''}
					max-[1000px]:w-[80%] `}
							>
								<div className="flex gap-[15px] items-center">
									<img src={Uz} height={20} width={20} />
									<p className="text-[#18181B] text-[16px] font-[500] text-center">
										{' '}
										O’zbekcha
									</p>
								</div>

								<Radio
									value={'uz'}
									style={{ height: 'fit-content', width: 'fit-content' }}
								/>
							</div>

							<div
								onClick={() => {
									setValue('ru');
								}}
								className={`flex h-[44px] px-[16px] justify-between items-center gap-[5px] border border-solid
					border-[#D4D4D8] shadow-[0px 1px 2px 0px rgba(15, 15, 16, 0.05);] rounded-[12px] cursor-pointer w-[240px]
					${value === 'ru' ? 'bg-[#F4F7FE] border-[blue] border-opacity-50' : ''}
					max-[1000px]:w-[80%]`}
							>
								<div className="flex gap-[15px] items-center">
									<img src={Ru} height={20} width={20} />
									<p className="text-[#18181B] text-[16px] font-[500]">
										{' '}
										Русский
									</p>
								</div>

								<Radio
									value={'ru'}
									style={{ height: 'fit-content', width: 'fit-content' }}
								/>
							</div>

							<div
								onClick={() => {
									setValue('en');
								}}
								className={`flex h-[44px] px-[16px] justify-between items-center gap-[5px] border border-solid
					border-[#D4D4D8] shadow-[0px 1px 2px 0px rgba(15, 15, 16, 0.05);] rounded-[12px] cursor-pointer w-[240px]
	${value === 'en' ? 'bg-[#F4F7FE] border-[blue] border-opacity-50' : ''}
					max-[1000px]:w-[80%]`}
							>
								<div className="flex gap-[15px] items-center">
									<img src={En} height={20} width={20} />
									<p className="text-[#18181B] text-[16px] font-[500]">
										{' '}
										English
									</p>
								</div>

								<Radio
									value={'en'}
									style={{ height: 'fit-content', width: 'fit-content' }}
								/>
							</div>
						</div>
					</Radio.Group>
					<div className="w-full flex justify-end gap-[10px]">
						<Button
							radius={'12px'}
							height={'44px'}
							width={'110px'}
							padding={'12px 32px'}
							bgcolor={'#fff'}
							onClick={handleCancelDownload}
						>
							<p className="text-[#17171B] text-[16px] font-[600]">
								Bekor qilish
							</p>
						</Button>
						<Button
							type="primary"
							radius={'12px'}
							height={'44px'}
							width={'110px'}
							padding={'12px 32px'}
							bgcolor={'#2563EB'}
							onClick={getFile}
						>
							<p className="text-[#fff] text-[16px] font-[600]">Yuklab olish</p>
						</Button>
					</div>
				</div>
			</AndModalDownload>
			<AndModal
				open={isModalOpen}
				onOk={handleOk}
				onCancel={handleCancel}
				centered
				maskClosable={false}
				title="Shaxsiy ma’lumotlar"
				footer={null}
				className="custom-border-radius-modal"
				style={{ width: '680px' }}
			>
				<div className="w-full flex flex-col items-center p-[10px] gap-[16px]">
					{loading ? (
						'Yuklanmoqda..'
					) : editData?.profilePhotoUrl ? (
						<AndImage
							width={84}
							src={editData?.profilePhotoUrl}
							height={84}
							style={{
								cursor: 'pointer',
								borderRadius: '50%',
							}}
						/>
					) : (
						<AndImage
							width={84}
							src={Profile}
							height={84}
							style={{
								cursor: 'pointer',
								borderRadius: '50%',
								opacity: '0.5',
							}}
						/>
					)}
					<input
						type="file"
						accept=".png, .jpg, .jpeg"
						className="hidden"
						ref={inputRef}
						onChange={changeFile}
						id="fileId"
					/>
					<p
						className="text-[#2563EB] text-[16px] font-[600] hover:underline cursor-pointer"
						onClick={UploadImage}
					>
						Yuklash
					</p>
				</div>

				<div className="w-full flex gap-[20px] mb-[20px]">
					<div className="w-full flex flex-col ">
						<p className="text-[#71717A] text-[16px] font-[500]">Ism</p>
						<Input
							onChange={onChangeFunction}
							style={{ height: '52px', borderRadius: '12px' }}
							name="firstName"
							value={editData?.firstName}
						/>
						{error.firstName && (
							<p className="text-[red] text-[14px] font-[600]">
								{error.firstName}
							</p>
						)}
					</div>
				</div>

				<div className="w-full flex gap-[20px] mb-[20px] ">
					<div className=" w-full flex flex-col gap-[5px]">
						<p className="text-[#71717A] text-[16px] font-[500]">Raqam</p>
						<Input
							onChange={onChangeFunction}
							style={{ height: '52px', borderRadius: '12px' }}
							name="phoneNumber"
							value={editData?.phoneNumber}
						/>
						{error.phoneNumber && (
							<p className="text-[red] text-[14px] font-[600]">
								{error.phoneNumber}
							</p>
						)}
					</div>

					<div className="w-full flex flex-col gap-[5px]">
						<p className="text-[#71717A] text-[16px] font-[500]">Email</p>
						<Input
							onChange={onChangeFunction}
							style={{ height: '52px', borderRadius: '12px' }}
							name="email"
							disabled
							value={editData?.email}
						/>
					</div>
				</div>
				<div className="w-full flex flex-col mb-[24px] gap-[5px]">
					<p className="text-[#71717A] text-[16px] font-[500]">Joylashuv</p>
					<Input
						onChange={onChangeFunction}
						style={{ height: '52px', borderRadius: '12px' }}
						name="regionName"
						value={editData?.regionName}
					/>
					{/* {error.regionName && (
						<p className="text-[red] text-[14px] font-[600]">
							{error.regionName}
						</p>
					)} */}
				</div>
				<div className=" w-full flex flex-col mb-[20px] ">
					<p className="text-[#71717A] text-[16px] font-[500]">
						Tug`ilgan sana
					</p>
					<CustomDatePicker
						onChange={(e, a) => {
							setEditData({
								...editData,
								birthDate: moment(a).format('YYYY-MM-DD'),
							});
							setError({
								...error,
								birthDate: null,
							});
						}}
						value={editData?.birthDate}
					/>
					{error.birthDate && (
						<p className="text-[red] text-[14px] font-[600]">
							{error.birthDate}
						</p>
					)}
				</div>
				<div className=" w-full flex flex-col mb-[24px] gap-[5px]">
					<p className="text-[#71717A] text-[16px] font-[500]">Soha</p>
					<AntSelect
						options={options}
						value={editData?.subDirectionCaption}
						style={{ height: '52px' }}
						onChange={(e, opt) =>
							setEditData({
								...editData,
								subDirectionCaption: opt.label,
								subDirectionId: opt.id,
							})
						}
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
						<p className="text-[#17171B] text-[16px] font-[600]">
							Bekor qilish
						</p>
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
						<p className="text-[#fff] text-[16px] font-[600]">Saqlash</p>
					</Button>
				</div>
			</AndModal>

			<Navbar />

			<div className="max-w-[1120px] flex gap-[20px] mt-[120px] mb-[50px] max-[1368px]:flex-col max-[1368px]:items-center ">
				{/* column 1 */}
				<div className="w-[689px] flex flex-col gap-[25px] max-[700px]:w-[95%] max-[700px]:px-[10px]">
					<div
						className="w-[689px] min-h-[286px] bg-white flex gap-[22px] p-[20px] flex-col 
					border border-solid border-1 border-[#E3E3E7] rounded-[16px] max-[700px]:w-full"
					>
						<div className="w-full flex justify-end">
							<div
								onClick={() => {
									setIsModalOpen(true);
									setEditData(data);
								}}
								className="flex items-center gap-[10px] cursor-pointer"
							>
								<img src={Edit} alt="download" width={20} height={20} />
								<p className="text-[#18181B] text-[16px] font-[600] ">
									{t('w67')}
								</p>
							</div>
						</div>
						<div className="w-full h-fit flex justify-between max-[450px]:flex-col max-[450px]:gap-[16px] max-[450px]:items-center">
							<div className="flex items-center gap-[10px] max-[700px]:flex-col">
								{data?.profilePhotoUrl ? (
									<AndImage
										width={64}
										src={data?.profilePhotoUrl}
										height={64}
										style={{
											cursor: 'pointer',
											borderRadius: '50%',
										}}
									/>
								) : (
									<AndImage
										width={64}
										src={Profile}
										height={64}
										style={{
											cursor: 'pointer',
											borderRadius: '50%',
											opacity: '0.5',
										}}
									/>
								)}

								<div className="flex flex-col gap-[10px] ">
									<p className="text-[#18181B] text-[24px] font-[600] max-[700px]:text-center">
										{`${data?.firstName} `}
									</p>
									<p className="text-[#18181B] text-[14px] font-[500] max-[700px]:text-center">
										{data?.subDirectionCaption || ''}
									</p>
								</div>
							</div>
						</div>
						{data?.birthDate && (
							<div className="flex gap-[10px]">
								<img src={Calendar} alt="download" width={20} height={20} />
								<p className="text-[#18181B] text-[16px] font-[600] ">
									{t('w172')}:
								</p>
								<p className="text-[#18181B] text-[16px] font-[600] opacity-60">
									{data?.birthDate}
								</p>
							</div>
						)}
						{data?.email && (
							<div className="flex gap-[10px]">
								<img src={Cms} alt="download" width={20} height={20} />
								<p className="text-[#18181B] text-[16px] font-[600] ">
									{t('w154')}:
								</p>
								<p className="text-[#18181B] text-[16px] font-[600] opacity-60">
									{data?.email}
								</p>
							</div>
						)}
						{data?.phoneNumber && (
							<div className="flex gap-[10px]">
								<img src={Call} alt="download" width={20} height={20} />
								<p className="text-[#18181B] text-[16px] font-[600] ">
									{t('w173')}:
								</p>
								<p className="text-[#18181B] text-[16px] font-[600] opacity-60">
									{data?.phoneNumber}
								</p>
							</div>
						)}
						{data?.regionName && (
							<div className="flex gap-[10px]">
								<img src={Location} alt="download" width={20} height={20} />
								<p className="text-[#18181B] text-[16px] font-[600] ">
									{t('w174')}:
								</p>
								<p className="text-[#18181B] text-[16px] font-[600] opacity-60">
									{data?.regionName}
								</p>
							</div>
						)}
					</div>
					<About data={data} />

					<div
						onClick={showModalDownload}
						className="w-full h-[44px] px-[20px] py-[12px] bg-white flex gap-[10px] border border-solid border-1 border-[#E3E3E7]
						rounded-[12px] items-center justify-between min-[1368px]:hidden cursor-pointer
						"
					>
						<p className="text-[#18181B] text-[14px] font-[600] ">
							{t('w137')}
						</p>
						<img
							src={download}
							alt="download"
							width={20}
							height={20}
							style={{ cursor: 'pointer' }}
						/>
					</div>

					<div className="w-[100%] min-h-[123px]  bg-white flex flex-col gap-[20px] p-[20px] border border-solid border-1 border-[#E3E3E7] rounded-[16px] min-[1368px]:hidden">
						<div className="w-full h-fit flex justify-between">
							<p className="text-[#18181B] text-[16px] font-[600] ">
								{t('w138')}
							</p>
							<div
								className="flex items-center gap-[10px] cursor-pointer relative min-[1368px]:hidden"
								onClick={() => setOpenCalendar(!openCalendar)}
							>
								<AntDatePicker
									open={openCalendar}
									picker="date"
									mode="month"
									renderExtraFooter={extraFooterComponent}
								/>
								<img src={Calendar} alt="download" width={20} height={20} />
								<p className="text-[#18181B] text-[16px] font-[600] ">
									{t('w139')}
								</p>
							</div>
						</div>
						<div className="w-full h-fit flex justify-between max-[420px]:flex-col max-[420px]:gap-[20px] max-[420px]:items-center">
							<div className="w-[115px] h-[39px] flex bg-[#FAFAFA] justify-center items-center gap-[10px] border border-solid border-1 border-[#E3E3E7] rounded-[12px]">
								<img src={Eye} alt="download" width={20} height={20} />
								<p className="text-[#18181B] text-[18px] font-[600] ">
									{userData?.countView || 0}
								</p>
							</div>
							<div className="w-[115px] h-[39px] flex bg-[#FAFAFA] justify-center items-center gap-[10px] border border-solid border-1 border-[#E3E3E7] rounded-[12px]">
								<img src={Copy} alt="download" width={20} height={20} />
								<p className="text-[#18181B] text-[18px] font-[600] ">
									{userData?.countSaved || 0}
								</p>
							</div>
							<div className="w-[115px] h-[39px] flex bg-[#FAFAFA] justify-center items-center gap-[10px] border border-solid border-1 border-[#E3E3E7] rounded-[12px]">
								<img src={Search} alt="download" width={20} height={20} />
								<p className="text-[#18181B] text-[18px] font-[600] ">0</p>
							</div>
						</div>
					</div>
					<Language />
					<Education />
					<Experence />
					{/* <Skills /> */}
					<Award />
					<Salary data={data} />
					<PortfolioComponent />
				</div>

				{/* column 2 */}

				<div className="w-[402px] flex flex-col gap-[20px] max-[1368px]:hidden">
					<div className="w-full flex justify-start ">
						<div
							onClick={showModalDownload}
							className="w-[293px] h-[44px] px-[20px] py-[12px] bg-white flex gap-[10px] border border-solid border-1 border-[#E3E3E7]
						rounded-[12px] items-center cursor-pointer justify-between
						"
						>
							<p className="text-[#18181B] text-[14px] font-[600] ">
								{t('w137')}
							</p>
							<img
								src={download}
								alt="download"
								width={20}
								height={20}
								style={{ cursor: 'pointer' }}
							/>
						</div>
					</div>
					<div className="w-[402px] h-[123px] bg-white flex flex-col gap-[20px] p-[20px] border border-solid border-1 border-[#E3E3E7] rounded-[16px]">
						<div className="w-full h-fit flex justify-between">
							<p className="text-[#18181B] text-[16px] font-[600] ">
								{t('w138')}
							</p>
							<div
								className="flex items-center gap-[10px] cursor-pointer relative "
								onClick={() => setOpenCalendar1(!openCalendar1)}
							>
								<AntDatePicker
									open={openCalendar1}
									picker="date"
									mode="month"
									renderExtraFooter={extraFooterComponent}
								/>
								<img src={Calendar} alt="download" width={20} height={20} />
								<p className="text-[#18181B] text-[16px] font-[600] ">
									{t('w139')}
								</p>
							</div>
						</div>
						<div className="w-full h-fit flex justify-between">
							<div className="w-[115px] h-[39px] flex bg-[#FAFAFA] justify-center items-center gap-[10px] border border-solid border-1 border-[#E3E3E7] rounded-[12px]">
								<img src={Eye} alt="download" width={20} height={20} />
								<p className="text-[#18181B] text-[18px] font-[600] ">
									{userData?.countView || 0}
								</p>
							</div>
							<div className="w-[115px] h-[39px] flex bg-[#FAFAFA] justify-center items-center gap-[10px] border border-solid border-1 border-[#E3E3E7] rounded-[12px]">
								<img src={Copy} alt="download" width={20} height={20} />
								<p className="text-[#18181B] text-[18px] font-[600] ">
									{userData?.countSaved || 0}
								</p>
							</div>
							<div className="w-[115px] h-[39px] flex bg-[#FAFAFA] justify-center items-center gap-[10px] border border-solid border-1 border-[#E3E3E7] rounded-[12px]">
								<img src={Search} alt="download" width={20} height={20} />
								<p className="text-[#18181B] text-[18px] font-[600] ">0</p>
							</div>
						</div>
					</div>
					<div className="w-[402px] h-[380px] relative flex flex-col gap-[20px] p-[20px] rounded-[16px] bg-[#22C55E]">
						<p className="text-[#fff] text-[18px] font-[400] ">{t('w140')}</p>
						<StyleButton
							onClick={readyTest}
							className="w-fit h-[40px] px-[20px] py-[15px] flex gap-[10px] items-center justify-center rounded-[10px] bg-white cursor-pointer"
						>
							<p className="text-[#18181B] text-[16px] font-[600] ">
								{t('w148')}{' '}
							</p>
							<img src={LinkTest} alt="download" width={20} height={20} />
							<img
								src={Example}
								alt="download"
								width={363}
								height={216}
								style={{
									position: 'absolute',
									bottom: '0',
									left: '5%',
									bottom: '0px',
								}}
							/>
						</StyleButton>
					</div>
				</div>

				<div
					className="w-[402px] h-[380px] relative flex flex-col gap-[20px] p-[20px] rounded-[16px] bg-[#22C55E]
				 min-[1368px]:hidden max-[420px]:w-[320px]"
				>
					<p className="text-[#fff] text-[18px] font-[400] ">{t('w140')}</p>
					<StyleButton
						onClick={readyTest}
						className="w-fit h-[33px] px-[16px] py-[4px] flex gap-[10px] items-center justify-center rounded-[10px] bg-white cursor-pointer"
					>
						<p className="text-[#18181B] text-[16px] font-[600] ">
							{t('w148')}{' '}
						</p>
						<img src={LinkTest} alt="download" width={20} height={20} />
						<div className="max-[425px]:hidden">
							<img
								src={Example}
								alt="download"
								width={363}
								height={216}
								style={{
									position: 'absolute',
									bottom: '0',
									left: '5%',
									bottom: '0px',
								}}
							/>
						</div>
						<div className="min-[425px]:hidden">
							<img
								src={Example}
								alt="download"
								width={280}
								height={206}
								style={{
									position: 'absolute',
									bottom: '0',
									left: '5%',
									bottom: '0px',
								}}
							/>
						</div>
					</StyleButton>
				</div>
			</div>

			<Footer />
		</div>
	);
};

const mapDispatchToProps = {
	getMeFunction,
	setUserData,
};
const mapStateToProps = (state) => ({
	userData: state?.generalReducer?.userData,
});
export default connect(mapStateToProps, mapDispatchToProps)(TalentProfile);
