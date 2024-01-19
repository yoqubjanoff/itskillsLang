import React, { useState, useEffect, useRef } from 'react';
import Add from '../../../assets/icons/add-circle.svg';
import { AndModal, AndModalDelete } from './style';
import { Button, Toast } from '../../generics';
import { DeleteIcon } from '../../generics/genericIcons';
import { Input } from 'antd';
import request from '../../../services/api';
import Example from '../../../assets/icons/example-mountain.svg';
import Link from '../../../assets/icons/link.svg';
import Upload from '../../../assets/icons/upload-award.svg';
import Sertifikat from '../../../assets/img/sertifikat.png';
import { uploadFileTalent } from '../../../services/fileUpload';
import { useTranslation } from 'react-i18next';

const Award = () => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const { TextArea } = Input;
	const inputRef = useRef(null);
	const { t } = useTranslation();

	const [awards, setAwards] = useState([]);
	const [editData, setEditData] = useState({
		caption: '',
		proofUrl: '',
		attachmentId: '',
		description: '',
		link: '',
		issuedBy: 'test',
	});

	const getAwards = async () => {
		try {
			const res = await request.get('talent/profile/awards/all');
			const newRes = res?.data?.data;
			setAwards(newRes);
			window.scrollTo({ top: 0, behavior: 'smooth' });
		} catch (error) {
			console.error('Error');
		}
	};
	const [id, setId] = useState(null);
	const [isModalOpenDelete, setIsModalOpenDelete] = useState(false);

	const [error, setError] = useState({});

	const onChange = (e) => {
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
		setIsModalOpen(false);
		setEditData({});
		setError({});
	};

	const saveFunc = async () => {
		try {
			const response = await request.post('talent/profile/awards', {
				data: editData,
			});
			handleCancel();
			Toast({
				type: t('w252'),
				message: t('w189'),
			});
			getAwards();
		} catch (error) {
			Toast({
				title: error?.response?.data?.resultMsg,
				type: 'error',
			});
		}
	};
	const handleError = (callback) => {
		if (
			!editData.caption ||
			!editData.proofUrl ||
			!editData.link ||
			!editData.description
		) {
			setError({
				...error,
				caption: !editData.caption && t('w186'),
				link: !editData.link && t('w186'),
				proofUrl: !editData.proofUrl && t('w186'),
				description: !editData.description && t('w186'),
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
			const response = await request.delete(`talent/profile/awards/${id}`);
			handleCancelDelete();
			getAwards();
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
	const UploadImage = () => {
		inputRef?.current?.click();
	};
	const changeFile = async (e) => {
		if (e?.target?.files[0]) {
			const response = await uploadFileTalent(e?.target?.files[0]);
			setEditData({
				...editData,
				proofUrl: response?.fileUrl,
				attachmentId: response?.id,
			});
			setError({
				...error,
				proofUrl: false,
			});
		}
	};
	useEffect(() => {
		getAwards();
	}, []);

	return (
		<div className="w-full min-h-[64px] bg-white p-[20px] border border-solid border-1 border-[#E3E3E7] rounded-[16px]">
			<AndModal
				open={isModalOpen}
				onOk={handleOk}
				onCancel={handleCancel}
				centered
				maskClosable={false}
				title={t('w110')}
				footer={null}
				className="custom-border-radius-modal"
				style={{ width: '680px' }}
			>
				<div className=" w-full flex flex-col mb-[24px] gap-[5px]">
					<p className="text-[#71717A] text-[16px] font-[500]">{t('w111')}</p>
					<Input
						placeholder={t('w112')}
						style={{ height: '52px', borderRadius: '12px' }}
						name="caption"
						onChange={onChange}
						value={editData?.caption}
					/>
					{error.caption && (
						<p className="text-[red] text-[14px] font-[600]">{error.caption}</p>
					)}
				</div>
				<div className=" w-full flex items-center gap-[20px]">
					<div className=" w-full flex flex-col  mb-[24px] gap-[5px]">
						<p className="text-[#71717A] text-[16px] font-[500]">{t('w113')}</p>
						<div className=" w-full flex items-center gap-[20px]">
							<Input
								placeholder={t('w114')}
								style={{ height: '52px', borderRadius: '12px' }}
								name="name"
								placeholderColor={'#71717A'}
								prefix={
									<img
										src={Example}
										alt="download"
										width={20}
										height={20}
										style={{ margin: '0 10px 0 0' }}
									/>
								}
							/>
							<div
								onClick={UploadImage}
								className="w-fit h-[52px] flex  justify-between items-center gap-[10px] 
						 px-[32px] py-[12px] border border-solid border-1 border-[#E3E3E7] rounded-[12px] cursor-pointer"
							>
								<img src={Upload} alt="download" width={24} height={24} />
								<p className="text-[#17171B] text-[16px] font-[400] ">
									{t('w115')}
								</p>
								<input
									type="file"
									accept=".png, .jpg, .jpeg"
									className="hidden"
									ref={inputRef}
									onChange={changeFile}
									id="fileId"
								/>
							</div>
						</div>
						{error.proofUrl && (
							<p className="text-[red] text-[14px] font-[600]">
								{error.proofUrl}
							</p>
						)}
					</div>
				</div>

				<div className=" w-full flex  gap-[20px]">
					<div className=" w-full flex flex-col  mb-[24px] gap-[5px]">
						<p className="text-[#71717A] text-[16px] font-[500]">{t('w116')}</p>

						<Input
							placeholder="https://"
							style={{ height: '52px', borderRadius: '12px' }}
							name="link"
							value={editData?.link}
							onChange={onChange}
							placeholderColor={'#71717A'}
							prefix={
								<img
									src={Link}
									alt="download"
									width={20}
									height={20}
									style={{ margin: '0 10px 0 0' }}
								/>
							}
						/>
						{error.link && (
							<p className="text-[red] text-[14px] font-[600]">{error.link}</p>
						)}
					</div>
				</div>

				<div className=" w-full flex flex-col mb-[24px] gap-[5px]">
					<p className="text-[#71717A] text-[16px] font-[500]">{t('w128')}</p>
					<TextArea
						rows={6}
						placeholder={t('w118')}
						style={{ borderRadius: '12px' }}
						name="description"
						value={editData?.description}
						onChange={onChange}
					/>
					{error.description && (
						<p className="text-[red] text-[14px] font-[600]">
							{error.description}
						</p>
					)}
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
						<p className="text-[#17171B] text-[16px] font-[600]">{t('w122')}</p>
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
						<p className="text-[#fff] text-[16px] font-[600]">{t('w123')}</p>
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
						<p className="text-[#17171B] text-[16px] font-[600]">{t('w135')}</p>
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
						<p className="text-[#fff] text-[16px] font-[600]"> {t('w177')}</p>
					</Button>
				</div>
			</AndModalDelete>
			<div className="w-full flex justify-between items-center">
				<p className="text-[#18181B] text-[16px] font-[600] ">{t('w110')}</p>

				<img
					src={Add}
					alt="download"
					width={22}
					height={22}
					style={{ cursor: 'pointer' }}
					onClick={() => {
						setIsModalOpen(true);
						setEditData({
							issuedBy: 'test',
						});
					}}
				/>
			</div>

			{awards?.map((v, i) => (
				<>
					{i !== 0 && (
						<div className="w-full h-[1px] bg-[#18181B] opacity-20 my-[16px]"></div>
					)}

					<div className="flex flex-col   gap-[8px] items-start mt-[20px]">
						<div className="flex gap-[10px]">
							<p className="text-[#18181B] text-[18px] font-[600] ">
								{v?.caption}
							</p>
						</div>

						{v?.link && (
							<a
								className="flex gap-[10px]"
								target="_blank"
								href={`https://${v?.link}`}
							>
								<img src={Link} alt="download" width={22} height={22} />
								<p className="text-[#18181B] text-[16px] font-[500] opacity-70 cursor-pointer whitespace-wrap">
									{v?.link}
								</p>
							</a>
						)}
					</div>
					<div className="flex py-[20px] group gap-[10px] items-start relative">
						<div className="min-w-[72px] h-[52px] rounded-[8px] bg-[#F4F4F5] flex items-center justify-center">
							<img
								src={v?.proofUrl || Sertifikat}
								alt="download"
								width={72}
								height={52}
							/>
						</div>
						<div className="flex flex-col  gap-[8px] items-start">
							<p className="text-[#18181B] text-[16px] font-[500] opacity-70 whitespace-wrap">
								{v?.description}
							</p>
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
					</div>
				</>
			))}
		</div>
	);
};

export default Award;
