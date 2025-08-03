import { useNavigate } from 'react-router-dom';
import InvestorList from '../components/InvestorList';
import ErrorBoundary from '../components/ErrorBoundary';
import './InvestorsPage.css';

function InvestorsPage() {
  const navigate = useNavigate();

  const handleSelectInvestor = (investorId, investorName) => {
    navigate(`/investors/${investorId}`, { state: { investorName } });
  };

  return (
    <div className="investors-page">
      <div className="page-header">
        <h2>Investors</h2>
        <p>View and manage all registered investors and their commitment totals</p>
      </div>
      <div className="page-content">
        <ErrorBoundary>
          <InvestorList onSelectInvestor={handleSelectInvestor} />
        </ErrorBoundary>
      </div>
    </div>
  );
}

export default InvestorsPage;
