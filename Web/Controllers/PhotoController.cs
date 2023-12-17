using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Web.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class PhotoController : ControllerBase
	{
		[HttpPost("Product")]
		public IActionResult AddProductPhoto([FromForm] IFormFile file)
		{
			if (file != null)
			{
				string imageFolderPath = Path.Combine("wwwroot", "images", "product");

				Directory.CreateDirectory(imageFolderPath);

				string fileName = Guid.NewGuid().ToString() + Path.GetExtension(file.FileName);
				string imagePath = Path.Combine(imageFolderPath, fileName);

				using var fileStream = new FileStream(imagePath, FileMode.Create);
				file.CopyTo(fileStream);

				return Ok($"/images/product/{fileName}");
			}
			return NoContent();
		}

	}
}
/*if (!string.IsNullOrEmpty(productViewModel?.Product?.ImageUrl))
		{
			// delete the old image
			var oldImagePath =
				Path.Combine(wwwRootPath, productViewModel.Product.ImageUrl.TrimStart('\\'));

			if (System.IO.File.Exists(oldImagePath))
			{
				System.IO.File.Delete(oldImagePath);
			}

		}*/