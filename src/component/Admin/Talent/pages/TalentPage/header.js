import { Wrapper } from './style';
import { UserIcon } from '../../../../../component/generics/genericIcons';
import moment from 'moment';
import { useSearch } from '../../../../../services/Search';
import { useTranslation } from 'react-i18next';



const NameRenderer = ({ data }) => {
	return (
		<Wrapper.Flex>
			<Wrapper.BoxImg url={data?.profilePhotoUrl}>
				{!data?.profilePhotoUrl && <UserIcon />}
			</Wrapper.BoxImg>

			<p className="text-[#18181B]  overflow-hidden  overflow-ellipsis text-[16px] font-[600]">
				{data?.firstName}
			</p>
		</Wrapper.Flex>
	);
};
const Passed = ({ data }) => {
	const query = useSearch();

	const styleOne = {
		display: 'flex',
		width: '128px',
		padding: '6px 20px',
		justifyContent: 'center',
		alignItems: 'center',
		gap: '10px',
		borderRadius: '100px',
		background: 'rgba(255, 135, 0, 0.06)',
		color: ' #ff8700',
		fontSize: '14px',
		fontStyle: 'normal',
		fontWeight: '400',
		lineHeight: '21px',
	};
	return data?.isDetailedTestPassed && query.get('isDetailedTestPassed') ? (
		<Wrapper.Detailed>Detailed test</Wrapper.Detailed>
	) : data?.isStandardTestPassed ? (
		<div style={styleOne}>Standart test</div>
	) : (
		<Wrapper.NotVerify>Not verified</Wrapper.NotVerify>
	);
};

const RendererPhone = ({ data }) => {
	return <h5>{data?.phoneNumber && '+' + data?.phoneNumber}</h5>;
};

const TimeRender = ({ data }) => {
	return <h5>{moment(data?.createdAt).format('DD.MM.YYYY')}</h5>;
};
const IdRenderer = ({ id }) => {
	return <h5>#{id}</h5>;
};


export const TalentTableHeader = () => {
	const { t } = useTranslation();
  
	return [
	  {
		headerName: 'ID',
		width: '60px',
		cellRenderer: IdRenderer,
	  },
	  {
		headerName: t('w255'),
		cellRenderer: NameRenderer,
		flex: 1,
	  },
	  {
		headerName: 'Registered date',
		cellRenderer: TimeRender,
		flex: 0.4,
	  },
	  {
		headerName: 'Direction',
		field: 'directionCaption',
		flex: 0.4,
	  },
	  {
		headerName: 'Sub direction',
		field: 'subDirectionCaption',
		flex: 0.4,
	  },
	  {
		headerName: 'Passed tests',
		cellRenderer: Passed,
		flex: 1,
	  },
	  {
		headerName: 'Email address',
		field: 'email',
		flex: 1,
	  },
	  {
		headerName: 'Phone number',
		field: 'phoneNumber',
		cellRenderer: RendererPhone,
		flex: 1,
	  },
	];
  };
