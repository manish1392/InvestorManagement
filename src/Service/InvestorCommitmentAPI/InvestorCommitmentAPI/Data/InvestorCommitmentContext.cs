using Microsoft.EntityFrameworkCore;
using InvestorCommitmentAPI.Models;

namespace InvestorCommitmentAPI.Data
{
    public class InvestorCommitmentContext : DbContext
    {
        public InvestorCommitmentContext(DbContextOptions<InvestorCommitmentContext> options) : base(options) { }

        public DbSet<InvestorCommitment> InvestorCommitments { get; set; }
    }
}
