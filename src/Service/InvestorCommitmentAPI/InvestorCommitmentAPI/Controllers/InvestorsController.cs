using InvestorCommitmentAPI.Repositories;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace InvestorCommitmentAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class InvestorsController : ControllerBase
    {
        private readonly IInvestorRepository _repository;
        public InvestorsController(IInvestorRepository repository)
        {
            _repository = repository;
        }

        [HttpGet]
        public async Task<IActionResult> GetInvestors()
        {
            var investors = await _repository.GetInvestorsAsync();
            return Ok(investors);
        }

        [HttpGet("{name}/commitments")]
        public async Task<IActionResult> GetInvestorCommitments(string name, [FromQuery] string assetClass = null)
        {
            var commitments = await _repository.GetInvestorCommitmentsAsync(name, assetClass);
            return Ok(commitments);
        }
    }
}