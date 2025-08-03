namespace InvestorCommitmentAPI.Repositories.DTO
{
    public class InvestorSummaryDto
    {
        public string Name { get; set; }
        public string Type { get; set; }
        public string Country { get; set; }
        public DateTime DateAdded { get; set; }
        public decimal TotalCommitment { get; set; }
    }
}
