using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Utility
{
    public static class SD
    {
        public const string Role_Customer = "Customer";
        public const string Role_PharmaCompany = "PharmaCompany";
        public const string Role_Admin = "Admin";
        public const string Role_Pharmacist = "Pharmacist";

        public const string ProductStatusConfirmed = "Підтверджено";
        public const string ProductStatusUnderConsideration = "На розгляді";
        public const string ProductStatusRejected = "Відхилено";

		public const string ResirvationStatusConfirmed = "Підтверджено";
		public const string ReservationStatusWaiting = "В очікуванні";
		public const string ReservationStatusCanceled = "Скасовано";
		public const string ReservationStatusFinished = "Завершено";

        public readonly static string[] OrderByNames = new string[]
        { ByName, ByNameDesc, ByPrice, ByPriceDesc }; 

        public const string ByDefault = ByName;
        public const string ByName = "А-я";
        public const string ByNameDesc = "Я-а";

		public const string ByPrice = "Дешеві";
		public const string ByPriceDesc = "Дорогі";
	}
}
