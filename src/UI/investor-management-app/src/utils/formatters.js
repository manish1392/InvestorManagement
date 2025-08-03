/**
 * Format number with denomination (B, M, K)
 * @param {number} value - The number to format
 * @returns {string} - Formatted string with denomination (e.g., "5.89B", "10.75M", "15.57K")
 */
export const formatNumberWithDenomination = (value) => {
  if (value >= 1e9) {
    return `${(value / 1e9).toFixed(2)}B`;
  } else if (value >= 1e6) {
    return `${(value / 1e6).toFixed(2)}M`;
  } else if (value >= 1e3) {
    return `${(value / 1e3).toFixed(2)}K`;
  } else {
    return value.toFixed(2);
  }
};

/**
 * Format currency for display with denomination
 * @param {number} amount - The amount to format
 * @param {string} currency - The currency code (GBP, USD, EUR, etc.)
 * @returns {string} - Formatted currency string with denomination
 */
export const formatCurrency = (amount, currency = 'GBP') => {
  const formattedValue = formatNumberWithDenomination(amount);
  const currencySymbol = 
    currency === 'USD' ? '$' : 
    currency === 'GBP' ? '£' : 
    currency === 'EUR' ? '€' : 
    currency;
  
  return `${currencySymbol}${formattedValue}`;
};

/**
 * Format date for display
 * @param {string} dateString - The date string to format
 * @returns {string} - Formatted date string
 */
export const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-GB', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};
