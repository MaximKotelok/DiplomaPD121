using Domain.Models;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Internal;
using Repository.Repository.Interfaces;
using Services.ConcreteProductService;
using Services.ProductPriceHistoryService;
using System;
using System.Collections.Generic;
using System.Data.Entity.Core.Common.CommandTrees.ExpressionBuilder;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.BackgroundTaskService
{
    public class ProductPriceHistoryBackgroundService : BackgroundService
    {
        private readonly IServiceScopeFactory _serviceScopeFactory;

        public ProductPriceHistoryBackgroundService(IServiceScopeFactory serviceScopeFactory)
        {
            _serviceScopeFactory = serviceScopeFactory;
        }

        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            while (!stoppingToken.IsCancellationRequested)
            {
                using (var scope = _serviceScopeFactory.CreateScope())
                {
                    var productService = scope.ServiceProvider.GetRequiredService<IProductService>();
                    var concreteProductService = scope.ServiceProvider.GetRequiredService<IConcreteProductService>();
                    var productPriceHistoryService = scope.ServiceProvider.GetRequiredService<IProductPriceHistoryService>();
                    var repository = scope.ServiceProvider.GetRequiredService<IRepository<HistoryDate>>();

                    DateTime currentDate = DateTime.UtcNow;

                    HistoryDate? historyDate = repository.Get((d) => d.Date.Month == currentDate.Month && d.Date.Year == currentDate.Date.Year);
                    if (historyDate == null)
                    {
                        var allConcreteProducts = concreteProductService.GetAllConcreteProducts();

                        // Group products by ProductID and calculate average price for each group
                        var uniqueProductPrices = allConcreteProducts
                            .GroupBy(p => p.ProductID)
                            .Select(group => new
                            {
                                ProductId = group.Key,
                                AveragePrice = group.Average(p => p.Price)
                            });

                        int historyDateId = GetHistoryDateIdForCurrentMonth(repository);

                        foreach (var productPrice in uniqueProductPrices)
                        {
                            var priceHistory = new ProductPriceHistory
                            {
                                ProductId = productPrice.ProductId,
                                HistoryDateId = historyDateId,
                                Price = productPrice.AveragePrice
                            };
                            productPriceHistoryService.InsertProductPriceHistory(priceHistory);
                        }
                    }
                    DateTime nextMonth = currentDate.AddMonths(1);
                    DateTime firstDayOfNextMonth = new DateTime(nextMonth.Year, nextMonth.Month, 1, 0, 0, 0, DateTimeKind.Utc);

                    TimeSpan delay = firstDayOfNextMonth - currentDate;
                    await Task.Delay(delay, stoppingToken);
                }
            }
        }


        private int GetHistoryDateIdForCurrentMonth(IRepository<HistoryDate> repository)
        {
            HistoryDate date = new HistoryDate();
            DateTime now = DateTime.Now;
            date.Date = now;
            repository.Insert(date);
            repository.SaveChanges();
            return repository.Get((d) => d.Date == now)!.Id;
        }
    }
}
