import { useState, useEffect } from 'react';
import investorService from '../services/investorService';
import { formatCurrency } from '../utils/formatters';
import './CommitmentBreakdown.css';

const CommitmentBreakdown = ({ investorId, investorName }) => {
  const [commitments, setCommitments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('');
  const [assetClasses, setAssetClasses] = useState([]);
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    if (!investorId) return;

    const fetchCommitments = async () => {
      try {
        setLoading(true);
        const data = await investorService.getInvestorCommitments(investorId, filter);
        setCommitments(data);
        
        // Extract unique asset classes if we have no filter applied
        if (!filter) {
          const uniqueAssetClasses = [...new Set(data.map(c => c.commitmentAssetClass))];
          setAssetClasses(uniqueAssetClasses);
        }
        
        // Calculate total pages based on data length and items per page
        setTotalPages(Math.max(1, Math.ceil(data.length / itemsPerPage)));
        // Reset to first page when data changes
        setCurrentPage(1);
        
        setError(null);
      } catch (err) {
        setError('Failed to load commitments. Please try again later.');
        console.error('Error fetching commitments:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCommitments();
  }, [investorId, filter]);

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
    setCurrentPage(1); // Reset to first page when filter changes
  };

  // Pagination handlers
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleItemsPerPageChange = (event) => {
    const newItemsPerPage = parseInt(event.target.value, 10);
    setItemsPerPage(newItemsPerPage);
    // Recalculate total pages and reset to first page
    setTotalPages(Math.max(1, Math.ceil(commitments.length / newItemsPerPage)));
    setCurrentPage(1);
  };

  // Calculate paginated data
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentCommitments = commitments.slice(indexOfFirstItem, indexOfLastItem);

  if (!investorId) {
    return <div className="no-investor">Select an investor to view their commitments</div>;
  }

  if (loading) {
    return <div className="loading">Loading commitments</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="commitment-breakdown">
      <div className="header">
        <h2>Commitment Details</h2>
        <div className="filter-controls">
          <label>Filter by Asset Class:</label>
          <select 
            value={filter}
            onChange={(e) => handleFilterChange(e.target.value)}
            aria-label="Filter commitments by asset class"
          >
            <option value="">All Asset Classes</option>
            {assetClasses.map(assetClass => (
              <option key={assetClass} value={assetClass}>
                {assetClass}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="pagination-controls">
        <div className="items-per-page">
          <label htmlFor="items-per-page">Items per page:</label>
          <select
            id="items-per-page"
            value={itemsPerPage}
            onChange={handleItemsPerPageChange}
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="50">50</option>
          </select>
        </div>
        
        <div className="page-info">
          {commitments.length > 0 ? 
            `Showing ${indexOfFirstItem + 1} to ${Math.min(indexOfLastItem, commitments.length)} of ${commitments.length} commitments` : 
            'No commitments found'}
        </div>
        
        <div className="page-navigation">
          <button 
            onClick={() => handlePageChange(1)} 
            disabled={currentPage === 1}
            className="page-button"
            aria-label="First page"
          >
            &laquo;
          </button>
          <button 
            onClick={() => handlePageChange(currentPage - 1)} 
            disabled={currentPage === 1}
            className="page-button"
            aria-label="Previous page"
          >
            &lsaquo;
          </button>
          
          <span className="page-indicator">Page {currentPage} of {totalPages}</span>
          
          <button 
            onClick={() => handlePageChange(currentPage + 1)} 
            disabled={currentPage === totalPages}
            className="page-button"
            aria-label="Next page"
          >
            &rsaquo;
          </button>
          <button 
            onClick={() => handlePageChange(totalPages)} 
            disabled={currentPage === totalPages}
            className="page-button"
            aria-label="Last page"
          >
            &raquo;
          </button>
        </div>
      </div>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Asset Class</th>
            <th>Amount</th>
            <th>Currency</th>
          </tr>
        </thead>
        <tbody>
          {commitments.length === 0 ? (
            <tr>
              <td colSpan="4" className="no-data">No commitments found</td>
            </tr>
          ) : (
            currentCommitments.map((commitment, index) => (
              <tr key={indexOfFirstItem + index}>
                <td>{commitment.id || (indexOfFirstItem + index + 1)}</td>
                <td>{commitment.commitmentAssetClass}</td>
                <td>
                  {formatCurrency(commitment.commitmentAmount, commitment.commitmentCurrency)}
                </td>
                <td>{commitment.commitmentCurrency}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CommitmentBreakdown;
