using Microsoft.AspNetCore.Mvc;

namespace Web.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class ImagesController : Controller
	{
		private readonly IWebHostEnvironment _hostingEnvironment;

		public ImagesController(IWebHostEnvironment hostingEnvironment)
		{
			_hostingEnvironment = hostingEnvironment;
		}
		[HttpGet("{folder}/{name}")]
		public IActionResult Index(string folder, string name)
		{
			var filePath = Path.Combine(_hostingEnvironment.WebRootPath, $"images/{folder}/{name}");

			if (!System.IO.File.Exists(filePath))
			{
				return NotFound();
			}

			var fileBytes = System.IO.File.ReadAllBytes(filePath);
			return File(fileBytes, "application/octet-stream");
		}
	}
}
