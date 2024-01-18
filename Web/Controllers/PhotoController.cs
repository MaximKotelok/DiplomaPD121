using Domain.Models;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;

namespace Web.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class PhotoController : ControllerBase
	{
		private readonly IWebHostEnvironment _hostingEnvironment;

		public PhotoController(IWebHostEnvironment hostingEnvironment)
		{
			_hostingEnvironment = hostingEnvironment;
		}
		[HttpPost("Add")]
		public IActionResult AddPhoto(string relativePath, [FromForm] IFormFile file)
		{
			if (file != null)
			{
				string imageFolderPath = Path.Combine("wwwroot/images", relativePath);

				Directory.CreateDirectory(imageFolderPath);

				string fileName = Guid.NewGuid().ToString() + Path.GetExtension(file.FileName);
				string imagePath = Path.Combine(imageFolderPath, fileName);

				using var fileStream = new FileStream(imagePath, FileMode.Create);
				file.CopyTo(fileStream);

				return Ok($"{fileName}");
			}
			return NoContent();
		}

		[HttpPost("Update")]
		public IActionResult UpdatePhoto(string relativePath, IFormFile file)
		{
			if (!relativePath.IsNullOrEmpty())
			{
				var oldImagePath =
				Path.Combine("wwwroot", "images", relativePath);

				if (System.IO.File.Exists(oldImagePath))
				{
					System.IO.File.Delete(oldImagePath);
				}
			}
			else
			{
				return NoContent();
			}
			return AddPhoto(relativePath: Path.GetDirectoryName(relativePath), file);
		}

		[HttpPost("Delete")]
		public ActionResult DeletePhoto(string relativePath)
		{
			if (!relativePath.IsNullOrEmpty())
			{
				var oldImagePath =
				Path.Combine("wwwroot/images", relativePath);

				if (System.IO.File.Exists(oldImagePath))
				{
					System.IO.File.Delete(oldImagePath);
					return Ok("Deleted");
				}
			}
			return NoContent();
		}
		
		[HttpGet("/api/images/{folder}/{name}")]
		public IActionResult GetPhoto(string folder, string name)
		{
			var filePath = Path.Combine(_hostingEnvironment.WebRootPath, $"images/{folder}/{name}");

			if (!System.IO.File.Exists(filePath))
			{
				return NotFound();
			}

			var fileBytes = System.IO.File.ReadAllBytes(filePath);
			return File(fileBytes, "application/octet-stream");
		}

		[HttpGet("/api/images/{folder}/{type}/{name}")]
		public IActionResult GetCategoryPhoto(string folder,string type, string name)
		{
			var filePath = Path.Combine(_hostingEnvironment.WebRootPath, $"images/{folder}/{type}/{name}");

			if (!System.IO.File.Exists(filePath))
			{
				return NotFound();
			}

			var fileBytes = System.IO.File.ReadAllBytes(filePath);
			return File(fileBytes, "application/octet-stream");
		}
	}
}
