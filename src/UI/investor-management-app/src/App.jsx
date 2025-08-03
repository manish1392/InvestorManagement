import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import InvestorsPage from './pages/InvestorsPage';
import InvestorDetailPage from './pages/InvestorDetailPage';
import ErrorBoundary from './components/ErrorBoundary';
import './App.css';

function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<InvestorsPage />} />
            <Route path="investors/:id" element={<InvestorDetailPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;
