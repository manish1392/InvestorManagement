import { useParams, useLocation, Link } from 'react-router-dom';
import CommitmentBreakdown from '../components/CommitmentBreakdown';
import ErrorBoundary from '../components/ErrorBoundary';
import './InvestorDetailPage.css';

function InvestorDetailPage() {
  const { id } = useParams();
  const location = useLocation();
  const investorName = location.state?.investorName || 'Investor';

  return (
    <div className="investor-detail-page">
      <div className="page-header">
        <Link to="/" className="back-link">
          <span className="back-icon">←</span> Back to Home
        </Link>
        <div className="investor-title">
          <h2>{investorName}</h2>
          <div className="investor-subtitle">Investment Commitment Analysis</div>
        </div>
      </div>
      
      
      <div className="page-content">
        <ErrorBoundary>
          <CommitmentBreakdown investorId={id} investorName={investorName} />
        </ErrorBoundary>
      </div>
    </div>
  );
}

export default InvestorDetailPage;
