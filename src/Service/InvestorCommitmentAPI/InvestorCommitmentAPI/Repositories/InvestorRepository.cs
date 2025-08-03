using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using InvestorCommitmentAPI.Data;
using InvestorCommitmentAPI.Models;
using InvestorCommitmentAPI.Repositories.DTO;
using Microsoft.EntityFrameworkCore;

namespace InvestorCommitmentAPI.Repositories
{
    public class InvestorRepository : IInvestorRepository
    {
        private readonly InvestorCommitmentContext _context;
        public InvestorRepository(InvestorCommitmentContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<InvestorSummaryDto>> GetInvestorsAsync()
        {
            return await _context.InvestorCommitments
                .GroupBy(ic => new { ic.InvestorName, ic.InvestorType, ic.InvestorCountry, ic.InvestorDateAdded })
                .Select(g => new InvestorSummaryDto
                {
                    Name = g.Key.InvestorName,
                    Type = g.Key.InvestorType,
                    Country = g.Key.InvestorCountry,
                    DateAdded = g.Key.InvestorDateAdded,
                    TotalCommitment = g.Sum(x => x.CommitmentAmount)
                })
                .ToListAsync();
        }

        public async Task<IEnumerable<CommitmentBreakdownDto>> GetInvestorCommitmentsAsync(string investorName, string assetClass = null)
        {
            var query = _context.InvestorCommitments.Where(ic => ic.InvestorName == investorName);
            if (!string.IsNullOrEmpty(assetClass))
            {
                query = query.Where(ic => ic.CommitmentAssetClass == assetClass);
            }
            return await query.Select(ic => new CommitmentBreakdownDto
            {
                Id = ic.Id,
                CommitmentAssetClass = ic.CommitmentAssetClass,
                CommitmentAmount = ic.CommitmentAmount,
                CommitmentCurrency = ic.CommitmentCurrency
            }).ToListAsync();
        }
    }
}