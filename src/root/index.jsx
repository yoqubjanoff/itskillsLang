import { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Loader } from '../component/Loader/Loader';
import { Data } from '../utils/index';
import { SidebarData } from '../utils/admin';
const AdminView = lazy(() => import('../component/Admin'));

function Root() {
	return (
		<Suspense fallback={<Loader />}>
			<Routes>
				{Data.map(({ component: Component, path }, i) => (
					<Route path={path} element={<Component />} key={i} />
				))}
				<Route path="/admin" element={<AdminView />}>
					{SidebarData?.map(({ path, component: Component }, i) => (
						<Route path={path} element={<Component />} key={i} />
					))}
				</Route>

				<Route
					path={'*'}
					element={
						<div className="flex w-full h-screen justify-center items-center">
							<h1>404 Not found 🙁</h1>
						</div>
					}
				/>
			</Routes>
		</Suspense>
	);
}

export default Root;
