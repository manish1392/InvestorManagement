import apiClient from './apiClient';

export const investorService = {
  /**
   * Get all investors with their total commitments
   * @returns {Promise<Array>} List of investors with summary information
   */
  async getInvestors() {
    try {
      const response = await apiClient.get('/api/investors');
      return response.data;
    } catch (error) {
      console.error('Error fetching investors:', error);
      throw error;
    }
  },

  /**
   * Get commitments for a specific investor
   * @param {string} investorName - The name of the investor
   * @param {string|null} assetClass - Optional asset class filter
   * @returns {Promise<Array>} List of commitments for the investor
   */
  async getInvestorCommitments(investorName, assetClass = null) {
    try {
      let url = `/api/investors/${encodeURIComponent(investorName)}/commitments`;
      
      // Add asset class filter if provided
      if (assetClass) {
        url += `?assetClass=${encodeURIComponent(assetClass)}`;
      }
      
      const response = await apiClient.get(url);
      return response.data;
    } catch (error) {
      console.error(`Error fetching commitments for investor ${investorName}:`, error);
      throw error;
    }
  }
};

export default investorService;
