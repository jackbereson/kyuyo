using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Kyuyo.Infrastructure.Utils.MapTemplate
{
    public class DependentTemplate
    {
        // No
        public static int NO_INDEX = 0;
        //private const string NO_VIETNAMESE = "STT";
        //private const string NO_ENGLISH = "NO";

        // EmployeeName
        public static int EMPLOYEE_NAME_INDEX = 1;
        //private const string EMPLOYEE_NAME_VIETNAMESE = "Tên nhân viên";
        //private const string EMPLOYEE_NAME_ENGLISH = "EMPLOYEE_NAME";

        // PERSONAL_TAX_CODE
        public static int PERSONAL_TAX_CODE_INDEX = 2;
        //private const string PERSONAL_TAX_CODE_VIETNAMESE = "MST của người nộp thuế";
        //private const string PERSONAL_TAX_CODE_ENGLISH = "PERSONAL_TAX_CODE";

        // DEPENDENT
        public static int DEPENDENT_INDEX = 3;
        //private const string DEPENDENT_VIETNAMESE = "Họ và tên người phụ thuộc";
        //private const string DEPENDENT_ENGLISH = "DEPENDENT";

        // BIRTH_DT
        public static int BIRTH_DT_INDEX = 4;
        //private const string BIRTH_DT_VIETNAMESE = "Ngày sinh người phụ thuộc";
        //private const string BIRTH_DT_ENGLISH = "BIRTH_DT";

        // DEPENDENT_TAX_CODE
        public static int DEPENDENT_TAX_CODE_INDEX = 5;
        //private const string DEPENDENT_TAX_CODE_VIETNAMESE = "MST của người phụ thuộc";
        //private const string DEPENDENT_TAX_CODE_ENGLISH = "DEPENDENT_TAX_CODE";

        // NATIONALITY
        public static int NATIONALITY_INDEX = 6;
        //private const string NATIONALITY_VIETNAMESE = "Mã Quốc tịch của người phụ thuộc";
        //private const string NATIONALITY_ENGLISH = "NATIONALITY";

        // NATIONALITY_NAME
        public static int NATIONALITY_NAME_INDEX = 7;
        //private const string NATIONALITY_NAME_VIETNAMESE = "Quốc tịch của người phụ thuộc";
        //private const string NATIONALITY_NAME_ENGLISH = "NATIONALITY_NAME";

        // IDENTITY_PASSPORT
        public static int IDENTITY_PASSPORT_INDEX = 8;
        //private const string IDENTITY_PASSPORT_VIETNAMESE = "CMND/Hộ chiếu người phụ thuộc";
        //private const string IDENTITY_PASSPORT_ENGLISH = "IDENTITY_PASSPORT";

        // RELATIONSHIP
        public static int RELATIONSHIP_INDEX = 9;
        //private const string RELATIONSHIP_VIETNAMESE = "Mã Quan hệ với người nộp thuế";
        //private const string RELATIONSHIP_ENGLISH = "RELATIONSHIP";

        // RELATIONSHIP_NAME
        public static int RELATIONSHIP_NAME_INDEX = 10;
        //private const string RELATIONSHIP_NAME_VIETNAMESE = "Quan hệ với người nộp thuế";
        //private const string RELATIONSHIP_NAME_ENGLISH = "RELATIONSHIP_NAME";

        // NUMBER
        public static int NUMBER_INDEX = 11;
        //private const string NUMBER_VIETNAMESE = "Số";
        //private const string NUMBER_ENGLISH = "NUMBER";

        // NUMBER_BOOK
        public static int NUMBER_BOOK_INDEX = 12;
        //private const string NUMBER_BOOK_VIETNAMESE = "Quyển số";
        //private const string NUMBER_BOOK_ENGLISH = "NUMBER_BOOK";

        // REG_COUNTRY
        public static int REG_COUNTRY_INDEX = 13;
        //private const string REG_COUNTRY_VIETNAMESE = "Mã Quốc gia";
        //private const string REG_COUNTRY_ENGLISH = "REG_COUNTRY";

        // REG_COUNTRY_NAME
        public static int REG_COUNTRY_NAME_INDEX = 14;
        //private const string REG_COUNTRY_NAME_VIETNAMESE = "Quốc gia";
        //private const string REG_COUNTRY_NAME_ENGLISH = "REG_COUNTRY_NAME";

        // REG_CITY
        public static int REG_CITY_INDEX = 15;
        //private const string REG_CITY_VIETNAMESE = "Mã Tỉnh/Thành phố";
        //private const string REG_CITY_ENGLISH = "REG_CITY";

        // REG_CITY_NAME
        public static int REG_CITY_NAME_INDEX = 16;
        //private const string REG_CITY_NAME_VIETNAMESE = "Tỉnh/Thành phố";
        //private const string REG_CITY_NAME_ENGLISH = "REG_CITY_NAME";

        // REG_DISTRICT
        public static int REG_DISTRICT_INDEX = 17;
        //private const string REG_DISTRICT_VIETNAMESE = "Mã Quận/Huyện";
        //private const string REG_DISTRICT_ENGLISH = "REG_DISTRICT";

        // REG_DISTRICT_NAME
        public static int REG_DISTRICT_NAME_INDEX = 18;
        //private const string REG_DISTRICT_NAME_VIETNAMESE = "Quận/Huyện";
        //private const string REG_DISTRICT_NAME_ENGLISH = "REG_DISTRICT_NAME";

        // REG_WARD
        public static int REG_WARD_INDEX = 19;
        //private const string REG_WARD_VIETNAMESE = "Mã Phường/Xã";
        //private const string REG_WARD_ENGLISH = "REG_WARD";

        // REG_WARD_NAME
        public static int REG_WARD_NAME_INDEX = 20;
        //private const string REG_WARD_NAME_VIETNAMESE = "Phường/Xã";
        //private const string REG_WARD_NAME_ENGLISH = "REG_WARD_NAME";

        // FROM_MONTH
        public static int FROM_MONTH_INDEX = 21;
        //private const string FROM_MONTH_VIETNAMESE = "Từ tháng";
        //private const string FROM_MONTH_ENGLISH = "FROM_MONTH";

        // TO_MONTH
        public static int TO_MONTH_INDEX = 22;
        //private const string TO_MONTH_VIETNAMESE = "Đến tháng";
        //private const string TO_MONTH_ENGLISH = "TO_MONTH";

        // Get list of Column
        //public Dictionary<int, BonusExcel> dicBonusExcel { get; set; }

        // Constructor
        public DependentTemplate()
        {
            //this.dicBonusExcel = new Dictionary<int, BonusExcel>();
            // No
            //BonusExcel bonus1 = new BonusExcel();
            //bonus1.Index = NO_INDEX;
            //bonus1.VietNamese = NO_VIETNAMESE;
            //bonus1.English = NO_ENGLISH;
           // dicBonusExcel.Add(NO_INDEX, bonus1);

            // EmployeeName  
            //bonus1 = new BonusExcel();
            //bonus1.Index = EMPLOYEE_NAME_INDEX;
            //bonus1.VietNamese = EMPLOYEE_NAME_VIETNAMESE;
            //bonus1.English = EMPLOYEE_NAME_ENGLISH;
            //dicBonusExcel.Add(EMPLOYEE_NAME_INDEX, bonus1);

            // PERSONAL_TAX_CODE
           // bonus1 = new BonusExcel();
            //bonus1.Index = PERSONAL_TAX_CODE_INDEX;
            //bonus1.VietNamese = PERSONAL_TAX_CODE_VIETNAMESE;
            //bonus1.English = PERSONAL_TAX_CODE_ENGLISH;
            //dicBonusExcel.Add(PERSONAL_TAX_CODE_INDEX, bonus1);

            // DEPENDENT
            //bonus1 = new BonusExcel();
            //bonus1.Index = DEPENDENT_INDEX;
            //bonus1.VietNamese = DEPENDENT_VIETNAMESE;
            //bonus1.English = DEPENDENT_ENGLISH;
            //dicBonusExcel.Add(DEPENDENT_INDEX, bonus1);

            // BIRTH_DT
           // bonus1 = new BonusExcel();
            //bonus1.Index = BIRTH_DT_INDEX;
            //bonus1.VietNamese = BIRTH_DT_VIETNAMESE;
            //bonus1.English = BIRTH_DT_ENGLISH;
            //dicBonusExcel.Add(BIRTH_DT_INDEX, bonus1);

            // DEPENDENT_TAX_CODE
            //bonus1 = new BonusExcel();
            //bonus1.Index = DEPENDENT_TAX_CODE_INDEX;
            //bonus1.VietNamese = DEPENDENT_TAX_CODE_VIETNAMESE;
            //bonus1.English = DEPENDENT_TAX_CODE_ENGLISH;
            //dicBonusExcel.Add(DEPENDENT_TAX_CODE_INDEX, bonus1);

            // NATIONALITY
            //bonus1 = new BonusExcel();
            //bonus1.Index = NATIONALITY_INDEX;
            //bonus1.VietNamese = NATIONALITY_VIETNAMESE;
            //bonus1.English = NATIONALITY_ENGLISH;
            //dicBonusExcel.Add(NATIONALITY_INDEX, bonus1);


            // NATIONALITY_NAME
            //bonus1 = new BonusExcel();
            //bonus1.Index = NATIONALITY_NAME_INDEX;
            //bonus1.VietNamese = NATIONALITY_NAME_VIETNAMESE;
            //bonus1.English = NATIONALITY_NAME_ENGLISH;
            //dicBonusExcel.Add(NATIONALITY_NAME_INDEX, bonus1);


            // IDENTITY_PASSPORT
            //bonus1 = new BonusExcel();
            //bonus1.Index = IDENTITY_PASSPORT_INDEX;
            //bonus1.VietNamese = IDENTITY_PASSPORT_VIETNAMESE;
            //bonus1.English = IDENTITY_PASSPORT_ENGLISH;
            //dicBonusExcel.Add(IDENTITY_PASSPORT_INDEX, bonus1);


            // RELATIONSHIP
            //bonus1 = new BonusExcel();
            //bonus1.Index = RELATIONSHIP_INDEX;
            //bonus1.VietNamese = RELATIONSHIP_VIETNAMESE;
            //bonus1.English = RELATIONSHIP_ENGLISH;
            //dicBonusExcel.Add(RELATIONSHIP_INDEX, bonus1);

            // RELATIONSHIP_NAME
           // bonus1 = new BonusExcel();
            //bonus1.Index = RELATIONSHIP_NAME_INDEX;
            //bonus1.VietNamese = RELATIONSHIP_NAME_VIETNAMESE;
            //bonus1.English = RELATIONSHIP_NAME_VIETNAMESE;
           // dicBonusExcel.Add(RELATIONSHIP_NAME_INDEX, bonus1);


            // NUMBER
            //bonus1 = new BonusExcel();
            //bonus1.Index = NUMBER_INDEX;
            //bonus1.VietNamese = NUMBER_VIETNAMESE;
            //bonus1.English = NUMBER_ENGLISH;
            //dicBonusExcel.Add(NUMBER_INDEX, bonus1);


            // NUMBER_BOOK
            //bonus1 = new BonusExcel();
            //bonus1.Index = NUMBER_BOOK_INDEX;
            //bonus1.VietNamese = NUMBER_BOOK_VIETNAMESE;
            //bonus1.English = NUMBER_BOOK_ENGLISH;
            //dicBonusExcel.Add(NUMBER_BOOK_INDEX, bonus1);


            // REG_COUNTRY
            //bonus1 = new BonusExcel();
            //bonus1.Index = REG_COUNTRY_INDEX;
            //bonus1.VietNamese = REG_COUNTRY_VIETNAMESE;
            //bonus1.English = REG_COUNTRY_ENGLISH;
            //dicBonusExcel.Add(REG_COUNTRY_INDEX, bonus1);

            //// REG_COUNTRY_NAME
            //bonus1 = new BonusExcel();
            ////bonus1.Index = REG_COUNTRY_NAME_INDEX;
            ////bonus1.VietNamese = REG_COUNTRY_NAME_VIETNAMESE;
            ////bonus1.English = REG_COUNTRY_NAME_ENGLISH;
            //dicBonusExcel.Add(REG_COUNTRY_NAME_INDEX, bonus1);



            //// REG_CITY
            //bonus1 = new BonusExcel();
            ////bonus1.Index = REG_CITY_INDEX;
            ////bonus1.VietNamese = REG_CITY_VIETNAMESE;
            ////bonus1.English = REG_CITY_ENGLISH;
            //dicBonusExcel.Add(REG_CITY_INDEX, bonus1);

            //// REG_CITY_NAME
            //bonus1 = new BonusExcel();
            ////bonus1.Index = REG_CITY_NAME_INDEX;
            ////bonus1.VietNamese = REG_CITY_NAME_VIETNAMESE;
            ////bonus1.English = REG_CITY_NAME_ENGLISH;
            //dicBonusExcel.Add(REG_CITY_NAME_INDEX, bonus1);


            //// REG_DISTRICT
            //bonus1 = new BonusExcel();
            ////bonus1.Index = REG_DISTRICT_INDEX;
            ////bonus1.VietNamese = REG_DISTRICT_VIETNAMESE;
            ////bonus1.English = REG_DISTRICT_ENGLISH;
            //dicBonusExcel.Add(REG_DISTRICT_INDEX, bonus1);


            //// REG_DISTRICT_NAME
            //bonus1 = new BonusExcel();
            ////bonus1.Index = REG_DISTRICT_NAME_INDEX;
            ////bonus1.VietNamese = REG_DISTRICT_NAME_VIETNAMESE;
            ////bonus1.English = REG_DISTRICT_NAME_ENGLISH;
            //dicBonusExcel.Add(REG_DISTRICT_NAME_INDEX, bonus1);


            //// REG_WARD
            //bonus1 = new BonusExcel();
            ////bonus1.Index = REG_WARD_INDEX;
            ////bonus1.VietNamese = REG_WARD_VIETNAMESE;
            ////bonus1.English = REG_WARD_ENGLISH;
            //dicBonusExcel.Add(REG_WARD_INDEX, bonus1);


            //// REG_WARD_NAME
            //bonus1 = new BonusExcel();
            ////bonus1.Index = REG_WARD_NAME_INDEX;
            ////bonus1.VietNamese = REG_WARD_NAME_VIETNAMESE;
            ////bonus1.English = REG_WARD_NAME_ENGLISH;
            //dicBonusExcel.Add(REG_WARD_NAME_INDEX, bonus1);


            //// FROM_MONTH
            //bonus1 = new BonusExcel();
            ////bonus1.Index = FROM_MONTH_INDEX;
            ////bonus1.VietNamese = FROM_MONTH_VIETNAMESE;
            ////bonus1.English = FROM_MONTH_ENGLISH;
            //dicBonusExcel.Add(FROM_MONTH_INDEX, bonus1);


            //// TO_MONTH
            //bonus1 = new BonusExcel();
            ////bonus1.Index = TO_MONTH_INDEX;
            ////bonus1.VietNamese = TO_MONTH_VIETNAMESE;
            ////bonus1.English = TO_MONTH_ENGLISH;
            //dicBonusExcel.Add(TO_MONTH_INDEX, bonus1);
        }
    }
}