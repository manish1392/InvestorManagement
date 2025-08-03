using System.Collections.Generic;
using System.Threading.Tasks;
using InvestorCommitmentAPI.Models;
using InvestorCommitmentAPI.Repositories.DTO;

namespace InvestorCommitmentAPI.Repositories
{
    public interface IInvestorRepository
    {
        Task<IEnumerable<InvestorSummaryDto>> GetInvestorsAsync();
        Task<IEnumerable<CommitmentBreakdownDto>> GetInvestorCommitmentsAsync(string investorName, string assetClass = null);
    }

}
