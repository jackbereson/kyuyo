using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Kyuyo.Infrastructure.Utils.MapTemplate
{
    public class ImportWorkingTimeTemplate
    {
        public const int COMPANY_CD = 0;        // Mã công ty
        public const int EMPLOYEE_NO = 1;       // Mã nhân viên
        public const int WORKING_DATE = 2;      // Ngày làm việc
        public const int ACT_IN_TIME = 3;       // Giờ thực tế vào
        public const int ACT_OUT_TIME = 4;      // Giờ thực tế ra
        public const int WORKING_TIME = 5;      // Tổng thời gian làm việc
        public const int ABSENCE_TIME = 6;      // Tổng thời gian vắng
        public const int TOTAL_OT_TIME = 7;     // Tổng thời gian OT
        public const int LATE_OT_TIME = 8;      // Tổng thời gian OT khuya
        public const int TOTAL_LATE_TIME = 9;   // Tổng thời gian làm khuya
        public const int DEDUCTED_UNPAID = 10;  // Số giờ bị trừ lương
        public const int DEDUCTED_PAID = 11;    // Số ngày phép bị trừ
        public const int ATTENDANCE_TYPE = 12;  // Trạng thái làm việc
        public const int WORKING_TYPE = 13;     // Loại ngày làm việc
        public const int SPECIAL_TYPE = 14;     // Ngày đặc biệt
        public const int MAIN_SHIFT = 15;       // Ca làm việc
        public const int STD_IN_TIME = 16;      // Giờ bắt đầu làm việc tiêu chuẩn
        public const int STD_OUT_TIME = 17;     // Giờ kết thúc làm việc tiêu chuẩn
        public const int STD_WORK_HOUR = 18;    // Số giờ làm việc tiêu chuẩn
        public const int STATUS = 19;           // Trạng thái duyệt
    }
}