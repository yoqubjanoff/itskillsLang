import React from 'react';
import Coin from '../../../assets/icons/coin-blue.svg';
import Location from '../../../assets/icons/location-blue.svg';
import Close from '../../../assets/icons/close-circle.svg';
import { Wrapper } from './style';
import User from '../../../assets/icons/user.svg';
import { BookMarkIcon } from '../../generics/genericIcons/index.jsx';
import { useNavigate } from 'react-router-dom';
import Save from '../../../assets/icons/save-black.svg';
import SaveWhite from '../../../assets/icons/save-white.svg';

const CardEmployee = ({ data, disable, id }) => {
	const navigate = useNavigate();
	return (
		<Wrapper.CardBox
			onClick={() => !disable && navigate(`/show-profile/${data?.id}`)}
		>
			{/* {disable && (
				<BookMarkIcon
					style={{ position: 'absolute', top: '20px', right: '32px' }}
					color={'#000'}
					width={'25px'}
					height={'25px'}
				/>
			)} */}
			{id % 2 === 0 ? (
				<img
					src={Save}
					className="absolute top-[20px] right-[32px]"
					onClick={(e) => {
						e?.stopPropagation();
						console.log(e, 'eeeeee');
					}}
				/>
			) : (
				<img
					src={SaveWhite}
					className="absolute top-[20px] right-[32px]"
					onClick={(e) => {
						e?.stopPropagation();
						console.log(e, 'eeeeee');
					}}
				/>
			)}

			<Wrapper.Box>
				<Wrapper.CardImage src={data?.photoUrl || User} alt="image" />
				<Wrapper.Box
					style={{ flexDirection: 'column', overFlow: 'hidden' }}
					gap={'5px'}
					jc="center"
					margin="0 0 20px 0"
				>
					<div className="w-[150px] overflow-hidden max-[400px]:w-[100px]">
						<p className="overflow-hidden whitespace-nowrap overflow-ellipsis text-[#18181B] text-[22px] font-[700]">
							{data?.firstName}
						</p>
					</div>
					<p className="Job">{data?.subDirection}</p>
				</Wrapper.Box>
				<Wrapper.Box
					style={{ flexDirection: 'column' }}
					gap={'25px'}
					jc="center"
				>
					<Wrapper.Box gap={'8px'} ai={'center'}>
						<img
							src={Close}
							width={25}
							height={25}
							style={{ margin: '0 0 0 10px' }}
						/>
						<div className="w-[180px] overflow-hidden max-[400px]:w-[150px]">
							<p className="overflow-hidden whitespace-nowrap overflow-ellipsis text-[#18181B] text-[18px] font-[400]">
								Not verified
							</p>
						</div>
					</Wrapper.Box>
					<Wrapper.Box gap={'8px'} ai={'center'}>
						<img
							src={Location}
							width={25}
							height={25}
							style={{ margin: '0 0 0 10px' }}
						/>

						<div className="w-[180px] overflow-hidden max-[400px]:w-[150px]">
							<p className="overflow-hidden whitespace-nowrap overflow-ellipsis text-[#18181B] text-[18px] font-[400]">
								{data?.regionName || 'Toshkent'}
							</p>
						</div>
					</Wrapper.Box>
					<Wrapper.Box gap={'8px'} ai={'center'}>
						<img
							src={Coin}
							width={25}
							height={25}
							style={{ margin: '0 0 0 10px' }}
						/>

						<div className="w-[180px] overflow-hidden max-[400px]:w-[150px]">
							<p className="overflow-hidden whitespace-nowrap overflow-ellipsis text-[#18181B] text-[18px] font-[400]">
								{data?.expectedSalary
									? `${data?.expectedSalary} $`
									: 'Not Reported'}
							</p>
						</div>
					</Wrapper.Box>
				</Wrapper.Box>
			</Wrapper.Box>
		</Wrapper.CardBox>
	);
};

export default CardEmployee;
