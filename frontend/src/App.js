import { Route, Routes } from "react-router-dom";
import MainLayout from "./components/MainLayout";
import HomePage from "./pages/HomePage";
import PublicProjectListPage from "./pages/PublicProjectListPage";
import PublicProjectDetailPage from "./pages/PublicProjectDetailPage";
import CsrInformationPage from "./pages/CsrInformationPage";
import BlogListPage from "./pages/BlogListPage";
import BlogDetailPage from "./pages/BlogDetailPage";
import EcosystemCompaniesPage from "./pages/EcosystemCompaniesPage";
import EcosystemNgosPage from "./pages/EcosystemNgosPage";
import NgoInformationPage from "./pages/NgoInformationPage";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
	return (
		<Routes>
			<Route element={<MainLayout />}>
				<Route path="/" element={<HomePage />} />
				<Route path="/csr-projects" element={<PublicProjectListPage />} />
				<Route path="/csr-projects/information" element={<CsrInformationPage />} />
				<Route path="/csr-projects/:id" element={<PublicProjectDetailPage />} />
				<Route path="/blog" element={<BlogListPage />} />
				<Route path="/blog/:id" element={<BlogDetailPage />} />
				<Route path="/ecosystem/companies" element={<EcosystemCompaniesPage />} />
				<Route path="/ecosystem/ngos" element={<EcosystemNgosPage />} />
				<Route path="/ecosystem/ngos-information" element={<NgoInformationPage />} />
				<Route path="*" element={<NotFoundPage />} />
			</Route>
		</Routes>
	);
}

export default App;
