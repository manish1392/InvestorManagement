import { useState, useEffect } from 'react';
import investorService from '../services/investorService';
import { formatCurrency, formatDate } from '../utils/formatters';
import './InvestorList.css';

const InvestorList = ({ onSelectInvestor }) => {
  const [investors, setInvestors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchInvestors = async () => {
      try {
        setLoading(true);
        const data = await investorService.getInvestors();
        setInvestors(data);
        
        // Calculate total pages based on data length and items per page
        setTotalPages(Math.max(1, Math.ceil(data.length / itemsPerPage)));
        
        setError(null);
      } catch (err) {
        setError('Failed to load investors. Please try again later.');
        console.error('Error fetching investors:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchInvestors();
  }, [itemsPerPage]); // Refetch when items per page changes
  
  // Pagination handlers
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleItemsPerPageChange = (event) => {
    const newItemsPerPage = parseInt(event.target.value, 10);
    setItemsPerPage(newItemsPerPage);
    // Reset to first page
    setCurrentPage(1);
  };

  // Calculate paginated data
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentInvestors = investors.slice(indexOfFirstItem, indexOfLastItem);

  if (loading) {
    return <div className="loading">Loading investors</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="investor-list">
      <div className="pagination-controls">
        <div className="items-per-page">
          <label htmlFor="investors-per-page">Investors per page:</label>
          <select
            id="investors-per-page"
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
          {investors.length > 0 ? 
            `Showing ${indexOfFirstItem + 1} to ${Math.min(indexOfLastItem, investors.length)} of ${investors.length} investors` : 
            'No investors found'}
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
            <th>Investor Name</th>
            <th>Type</th>
            <th>Country</th>
            <th>Date Added</th>
            <th>Total Commitment</th>
          </tr>
        </thead>
        <tbody>
          {investors.length === 0 ? (
            <tr>
              <td colSpan="5" className="no-data">No investors found</td>
            </tr>
          ) : (
            currentInvestors.map((investor) => (
              <tr 
                key={investor.name} 
                onClick={() => onSelectInvestor(investor.name, investor.name)}
                className="investor-row"
              >
                <td>{investor.name}</td>
                <td>{investor.type}</td>
                <td>{investor.country}</td>
                <td>{formatDate(investor.dateAdded)}</td>
                <td>{formatCurrency(investor.totalCommitment)}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default InvestorList;
