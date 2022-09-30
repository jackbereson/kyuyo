using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Kyuyo.Infrastructure.Utils.MapTemplate
{
    public class SalaryTemplate
    {
        public const int STT = 0;                           // STT
        public const int EMPLOYEE_NO = 1;                   // Mã nhân viên
        public const int BASIC_SALARY_OFFICAL = 3;          // Lương cơ bản chính thức
        public const int BASIC_SALARY_PROBATION = 4;        // Lương thử việc
        public const int SALARY_CAL_SOCIAL_INSU = 5;        // Lương tính BHXH
        public const int EXCHANGE_RATE_SOCIAL_INSU_SAL = 6; // Tỷ giá lương tính BHXH
        public const int SALARY_HOUR = 7;                   // Đơn giá lương giờ
        public const int UNIT = 8;                          // Đơn vị tiền lương
        public const int BANK_ACCOUNT = 9;                  // Số tài khoản ngân hàng
        public const int BANK_NAME = 10;                    // Tên ngân hàng
        public const int SALARY_UNIT = 11;                  // Đơn vị tiền trả lương
        public const int PRODUCT_SALARY = 12;               // Lương theo sản phẩm
        public const int ALLOWANCE = 13;                    // Các phụ cấp được nhận
        public const int ALLOWANCE_START_DATE = 14;         // Ngày bắt đầu phụ cấp
        public const int ALLOWANCE_END_DATE = 15;           // Ngày kết thúc phụ cấp
        public const int OT_TYPE = 16;                      // Loại nhóm nhận OT
        public const int FORMULA_CD = 17;                   // Công thức tính lương
        public const int EFFECTIVE_DT = 18;                 // Ngày áp dụng
    }

    public class SalaryNewTemplate
    {
        public const int STT = 0;                           // STT
        public const int EMPLOYEE_NO = 1;                   // Mã nhân viên
        public const int EMPLOYEE_NAME = 2;                 // Mã nhân viên
        public const int BASIC_SALARY_OFFICAL = 3;          // Lương cơ bản chính thức
        public const int SALARY_CAL_SOCIAL_INSU = 4;        // Lương tính BHXH
        public const int UNIT = 5;                          // Đơn vị tiền lương
        public const int SALARY_UNIT = 6;                   // Đơn vị tiền trả lương
        public const int ALLOWANCE = 7;                     // Các phụ cấp được nhận
        public const int ALLOWANCE_START_DATE = 8;          // Ngày bắt đầu phụ cấp
        public const int ALLOWANCE_END_DATE = 9;            // Ngày kết thúc phụ cấp
        public const int OT_TYPE = 10;                      // Loại nhóm nhận OT
        public const int EFFECTIVE_DT = 11;                 // Ngày áp dụng
    }

}