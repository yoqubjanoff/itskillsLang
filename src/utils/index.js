import { lazy } from 'react';
const Home = lazy(() => import('../component/NewHome'));
const Contact = lazy(() => import('../component/Contact'));
const TalentRegistration = lazy(() => import('../component/Register/Talent'));
const SigninTalent = lazy(() => import('../component/Signin/Talent'));
const Forgot = lazy(() => import('../component/Signin/Forgot'));
const Recovery = lazy(() => import('../component/Signin/Recovery'));
const ResetVerify = lazy(() => import('../component/verify/ResetPassword'));
const SentVarifation = lazy(() => import('../component/verify/SendEmail'));
const ReadyProfile = lazy(() => import('../component/ready-to-test/Ready'));
const ReadyTestStandart = lazy(() =>
	import('../component/TestSection/Standart/Ready'),
);
const ReadyTestDetailed = lazy(() =>
	import('../component/TestSection/Detailed/Ready'),
);
const TestDetailed = lazy(() =>
	import('../component/TestSection/Detailed/TakeTest'),
);
const TestStandart = lazy(() =>
	import('../component/TestSection/Standart/TakeTest'),
);
const TalentProfile = lazy(() => import('../component/Profile/Talent'));
const Explore = lazy(() => import('../component/Explore'));
const ShowProfile = lazy(() => import('../component/Profile/ShowProfile'));
const ShowPortfolio = lazy(() => import('../component/Profile/ShowPortfolio'));
const ShowPortfolioForHr = lazy(() =>
	import('../component/Profile/ShowPortfolioforHr'),
);
const FailedTest = lazy(() => import('../component/ready-to-test/Failed'));
const SuccessTest = lazy(() => import('../component/ready-to-test/Succes'));
const VerifyTalent = lazy(() => import('../component/verify/verify-talent'));
const About = lazy(() => import('../component/About'));
const AdminSigning = lazy(() => import('../component/Admin/AdminSigning'));
const AboutOne = lazy(() => import('../component/About/AboutOne'));

export const Data = [
	{
		id: 1,
		path: '/',
		component: Home,
	},
	{
		id: 2,
		path: '/register',
		component: TalentRegistration,
	},

	{
		id: 5,
		path: '/signin',
		component: SigninTalent,
	},

	{
		id: 7,
		path: '/forgot-password',
		component: Forgot,
	},

	{
		id: 8,
		path: '/reset/:id',
		component: Recovery,
	},

	{
		id: 9,
		path: '/reset-verification',
		component: ResetVerify,
	},
	{
		id: 10,
		path: '/sent-verification',
		component: SentVarifation,
	},
	{
		id: 11,
		path: '/verify/:id',
		component: VerifyTalent,
	},

	{
		id: 111,
		path: '/ready-profile',
		component: ReadyProfile,
	},
	{
		id: 12,
		path: '/ready-test-standart',
		component: ReadyTestStandart,
	},
	{
		id: 13,
		path: '/test-standart',
		component: TestStandart,
	},
	{
		id: 121,
		path: '/ready-test-detailed',
		component: ReadyTestDetailed,
	},
	{
		id: 132,
		path: '/test-detailed',
		component: TestDetailed,
	},
	{
		id: 14,
		path: '/talent-profile',
		component: TalentProfile,
	},

	{
		id: 16,
		path: '/explore',
		component: Explore,
	},
	{
		id: 17,
		path: '/show-profile/:id',
		component: ShowProfile,
	},
	{
		id: 18,
		path: '/show-portfolio/:id',
		component: ShowPortfolio,
	},
	{
		id: 18,
		path: '/portfolio/:id',
		component: ShowPortfolioForHr,
	},
	{
		id: 19,
		path: '/failed-test',
		component: FailedTest,
	},
	{
		id: 20,
		path: '/success-test',
		component: SuccessTest,
	},
	{
		id: 21,
		path: '/about',
		component: About,
	},
	{
		id: 22,
		path: '/contact',
		component: Contact,
	},
	{
		id: 188,
		path: '/admin/sign-in',
		component: AdminSigning,
	},
	{
		id: 198,
		path: '/blog/:id',
		component: AboutOne,
	},
];
