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
        public const string Role_Company = "PharmaCompany";
        public const string Role_Admin = "Admin";
        public const string Role_Pharmacist = "Pharmacist";

        public const string ProductStatusConfirmed = "Підтверджено";
        public const string ProductStatusUnderConsideration = "На розгляді";
        public const string ProductStatusRejected = "Відхилено";

		public const string ResirvationStatusConfirmed = "Підтверджено";
		public const string ReservationStatusWaiting = "В очікуванні";
		public const string ReservationStatusCanceled = "Скасовано";
		public const string ReservationStatusFinished = "Завершено";
	}
}
