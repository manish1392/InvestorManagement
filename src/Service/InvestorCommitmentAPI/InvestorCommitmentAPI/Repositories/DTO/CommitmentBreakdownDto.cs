namespace InvestorCommitmentAPI.Repositories.DTO
{
    public class CommitmentBreakdownDto
    {
        public int Id { get; set; }
        public string CommitmentAssetClass { get; set; }
        public decimal CommitmentAmount { get; set; }
        public string CommitmentCurrency { get; set; }
    }
}
