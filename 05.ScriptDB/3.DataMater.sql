﻿USE [KyuyoSystem]
GO
SET IDENTITY_INSERT [dbo].[KY_ALLOWANCE_MASTER] ON 

INSERT [dbo].[KY_ALLOWANCE_MASTER] ([ID], [COMPANY_ID], [ALLOWANCE_CD], [ALLOWANCE_NAME], [GROUP_CD], [GROUP_NAME], [VALUE_OFFICAL], [VALUE_PROB], [UNIT], [ALLOWANCE_FLG], [EFFECTIVE_DT], [DELETE_FLAG], [CREATED_DT], [CREATED_BY], [UPDATED_DT], [UPDATED_BY]) VALUES (3, 4, N'N2', N'N2', N'0', N'ChungChi', CAST(0.0 AS Numeric(11, 1)), CAST(0.0 AS Numeric(11, 1)), N'0', NULL, CAST(N'2016-01-01' AS Date), N'0', NULL, NULL, NULL, NULL)
INSERT [dbo].[KY_ALLOWANCE_MASTER] ([ID], [COMPANY_ID], [ALLOWANCE_CD], [ALLOWANCE_NAME], [GROUP_CD], [GROUP_NAME], [VALUE_OFFICAL], [VALUE_PROB], [UNIT], [ALLOWANCE_FLG], [EFFECTIVE_DT], [DELETE_FLAG], [CREATED_DT], [CREATED_BY], [UPDATED_DT], [UPDATED_BY]) VALUES (4, 4, N'SQL', N'SQL Server', N'0', N'ChungChi', CAST(0.0 AS Numeric(11, 1)), CAST(0.0 AS Numeric(11, 1)), N'0', NULL, CAST(N'2016-01-01' AS Date), N'0', NULL, NULL, NULL, NULL)
SET IDENTITY_INSERT [dbo].[KY_ALLOWANCE_MASTER] OFF
SET IDENTITY_INSERT [dbo].[KY_EMPLOYEE_MASTER] ON 

INSERT [dbo].[KY_EMPLOYEE_MASTER] ([ID], [COMPANY_ID], [EMPLOYEE_NO], [EMPLOYEE_NO_PE], [EMPLOYEE_NAME], [EMPLOYEE_NAME_FULL], [USER_CD], [PASSWORD], [ABSENCE_NOT_PAY_BF], [ABSENCE_NOT_PAY_AT], [ADDRESS], [ADDRESS_EFFECTIVE_DT], [WORK_PLACE], [WORK_PLACE_EFFECTIVE_DT], [EMAIL], [EMAIL_EFFECTIVE_DT], [NATIONALITY], [CONTINENTS], [IDENTITY_PASSPORT], [PERSONAL_TAX_CODE], [UNIVERSITY], [QUALIFICATION], [LEVEL], [LEVEL_EFFECTIVE_DT], [LEVEL_GROUP], [LEVEL_GROUP_EFFECTIVE_DT], [PHONE_NO], [CONTRACT_TYPE], [CONTRACT_TYPE_EFFECTIVE_DT], [EMERGENCY_PHONE_NO], [EMPLOYEE_TYPE], [EMP_TYPE_EFFECTIVE_DT], [GENDER], [BIRTH_DT], [ENTRY_DT], [STANDARD_HOURS], [STANDARD_HOURS_EFFECTIVE_DT], [QUIT_DT], [CONTRACT_FORM], [CONTRACT_FORM_EFECTIVE_DT], [PROBATION_END_DT], [EXCHANGE_RATE_SOCIAL_INSU_SAL], [INSURANCE], [INSURANCE_EFFECTIVE_DT], [INSURANCE_UNION_MONTH], [INSURANCE_CODE], [HOSPITAL], [HOSPITAL_EFECTIVE_DT], [PIT], [PIT_EFFECTIVE_DT], [CERTIFICATE_LIST], [LABOUR_UNION_DT], [DELETE_FLAG], [CREATED_DT], [CREATED_BY], [UPDATED_DT], [UPDATED_BY]) VALUES (2, 4, N'001', N'026', N'Tran Van Thanh', N'Trần Văn Thành', N'thanhtv', N'202cb962ac59075b964b07152d234b70', NULL, NULL, N'537 Phạm Văn Đồng', NULL, NULL, NULL, N'thanhtv@aureole-it.vn', NULL, N'Việt Nam', N'M', N'233164913', N'123456', N'DH Bach Khoa', N'Dai Hoc', N'R2', NULL, N'LD', NULL, NULL, NULL, NULL, NULL, N'FT', NULL, N'M', CAST(N'1994-06-05' AS Date), CAST(N'2016-04-01' AS Date), CAST(8.0 AS Numeric(3, 1)), NULL, NULL, NULL, NULL, NULL, CAST(0.0 AS Numeric(11, 1)), NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, N'0', NULL, NULL, CAST(N'2016-10-21 16:10:46.003' AS DateTime), N'001')
INSERT [dbo].[KY_EMPLOYEE_MASTER] ([ID], [COMPANY_ID], [EMPLOYEE_NO], [EMPLOYEE_NO_PE], [EMPLOYEE_NAME], [EMPLOYEE_NAME_FULL], [USER_CD], [PASSWORD], [ABSENCE_NOT_PAY_BF], [ABSENCE_NOT_PAY_AT], [ADDRESS], [ADDRESS_EFFECTIVE_DT], [WORK_PLACE], [WORK_PLACE_EFFECTIVE_DT], [EMAIL], [EMAIL_EFFECTIVE_DT], [NATIONALITY], [CONTINENTS], [IDENTITY_PASSPORT], [PERSONAL_TAX_CODE], [UNIVERSITY], [QUALIFICATION], [LEVEL], [LEVEL_EFFECTIVE_DT], [LEVEL_GROUP], [LEVEL_GROUP_EFFECTIVE_DT], [PHONE_NO], [CONTRACT_TYPE], [CONTRACT_TYPE_EFFECTIVE_DT], [EMERGENCY_PHONE_NO], [EMPLOYEE_TYPE], [EMP_TYPE_EFFECTIVE_DT], [GENDER], [BIRTH_DT], [ENTRY_DT], [STANDARD_HOURS], [STANDARD_HOURS_EFFECTIVE_DT], [QUIT_DT], [CONTRACT_FORM], [CONTRACT_FORM_EFECTIVE_DT], [PROBATION_END_DT], [EXCHANGE_RATE_SOCIAL_INSU_SAL], [INSURANCE], [INSURANCE_EFFECTIVE_DT], [INSURANCE_UNION_MONTH], [INSURANCE_CODE], [HOSPITAL], [HOSPITAL_EFECTIVE_DT], [PIT], [PIT_EFFECTIVE_DT], [CERTIFICATE_LIST], [LABOUR_UNION_DT], [DELETE_FLAG], [CREATED_DT], [CREATED_BY], [UPDATED_DT], [UPDATED_BY]) VALUES (3, 4, N'002', N'027', N'Duong Thi Nga Huyen', N'Dương Thị Nga Huyền', N'huyendtn', N'202cb962ac59075b964b07152d234b70', NULL, NULL, NULL, NULL, NULL, NULL, N'huyendtn@aureole-it.vn', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, N'FT', NULL, N'F', NULL, NULL, CAST(8.0 AS Numeric(3, 1)), NULL, NULL, NULL, NULL, NULL, CAST(0.0 AS Numeric(11, 1)), NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, N'0', NULL, NULL, CAST(N'2016-10-21 16:10:46.003' AS DateTime), N'001')
SET IDENTITY_INSERT [dbo].[KY_EMPLOYEE_MASTER] OFF
SET IDENTITY_INSERT [dbo].[TB_M_COMPANY] ON 

INSERT [dbo].[TB_M_COMPANY] ([ID], [COMPANY_CD], [COMPANY_NAME], [ADDRESS], [COMPANY_TAX_CODE], [ACTIVE_FLAG], [PAYROLL_STATUS], [STANDAR_WORKING_DAYS], [COMPANY_AREA], [CREATED_DT], [CREATED_BY], [UPDATED_DT], [UPDATED_BY]) VALUES (4, N'AIT', N'Aureole Infonation Technology Inc', N'9 Đinh Tiên Hoàng', NULL, N'1', N'0', CAST(26 AS Numeric(2, 0)), CAST(10 AS Numeric(2, 0)), NULL, NULL, NULL, NULL)
INSERT [dbo].[TB_M_COMPANY] ([ID], [COMPANY_CD], [COMPANY_NAME], [ADDRESS], [COMPANY_TAX_CODE], [ACTIVE_FLAG], [PAYROLL_STATUS], [STANDAR_WORKING_DAYS], [COMPANY_AREA], [CREATED_DT], [CREATED_BY], [UPDATED_DT], [UPDATED_BY]) VALUES (6, N'ABCD', N'Aureole Business Component & Devices Inc.', NULL, NULL, N'1', N'1', CAST(26 AS Numeric(2, 0)), CAST(10 AS Numeric(2, 0)), NULL, NULL, NULL, NULL)
SET IDENTITY_INSERT [dbo].[TB_M_COMPANY] OFF
SET IDENTITY_INSERT [dbo].[TB_M_DEPARTMENT] ON 

INSERT [dbo].[TB_M_DEPARTMENT] ([ID], [DEPT_CD], [DEPT_NAME], [COMPANY_CD], [ACTIVE_FLAG], [CREATED_DT], [CREATED_BY], [UPDATED_DT], [UPDATED_BY]) VALUES (2, N'ACC001', N'Kế toán', N'AIT', N'1', NULL, NULL, CAST(N'2016-10-04 11:53:35.920' AS DateTime), N'001')
INSERT [dbo].[TB_M_DEPARTMENT] ([ID], [DEPT_CD], [DEPT_NAME], [COMPANY_CD], [ACTIVE_FLAG], [CREATED_DT], [CREATED_BY], [UPDATED_DT], [UPDATED_BY]) VALUES (3, N'SIGROUP01', N'Group 01', N'AIT', N'0', NULL, NULL, CAST(N'2016-10-04 11:55:56.967' AS DateTime), N'001')
INSERT [dbo].[TB_M_DEPARTMENT] ([ID], [DEPT_CD], [DEPT_NAME], [COMPANY_CD], [ACTIVE_FLAG], [CREATED_DT], [CREATED_BY], [UPDATED_DT], [UPDATED_BY]) VALUES (5, N'ACC002', N'Kế toán 2', N'AIT', N'0', NULL, NULL, CAST(N'2016-10-04 11:59:51.397' AS DateTime), N'001')
SET IDENTITY_INSERT [dbo].[TB_M_DEPARTMENT] OFF
SET IDENTITY_INSERT [dbo].[TB_M_EMP_DEPT] ON 

INSERT [dbo].[TB_M_EMP_DEPT] ([ID], [COMPANY_CD], [DEPT_CD], [DEPT_NAME], [EMPLOYEE_NO], [TITLE], [START_DT], [MAIN_FLAG], [DELETE_FLAG], [INACTIVE_DT], [CREATED_DT], [CREATED_BY], [UPDATED_DT], [UPDATED_BY]) VALUES (2, N'AIT', N'ACC001', N'Kế toán', N'001', NULL, CAST(N'2016-10-09' AS Date), N'1', N'0', NULL, NULL, NULL, NULL, NULL)
SET IDENTITY_INSERT [dbo].[TB_M_EMP_DEPT] OFF
SET IDENTITY_INSERT [dbo].[TB_M_SYSTEM] ON 

INSERT [dbo].[TB_M_SYSTEM] ([ID], [COMPANY_CD], [CATEGORY], [CD], [VALUE], [CHAR_VALUE_1], [CHAR_VALUE_2], [CHAR_VALUE_3], [NUM_VALUE_1], [NUM_VALUE_2], [NUM_VALUE_3], [REMARK], [LIST_ORDER], [ACTIVE_FLAG], [CREATED_DT], [CREATED_BY], [UPDATED_DT], [UPDATED_BY]) VALUES (1, N'0000000000', N'SCREEN_ID', N'M020', NULL, N'Department', N'0', N'1', CAST(1.00 AS Numeric(10, 2)), CAST(0.00 AS Numeric(10, 2)), NULL, N'Bộ phận', CAST(1 AS Numeric(2, 0)), N'1', CAST(N'2016-09-29 10:32:41.333' AS DateTime), N'batch', CAST(N'2016-09-29 10:32:41.333' AS DateTime), N'batch')
INSERT [dbo].[TB_M_SYSTEM] ([ID], [COMPANY_CD], [CATEGORY], [CD], [VALUE], [CHAR_VALUE_1], [CHAR_VALUE_2], [CHAR_VALUE_3], [NUM_VALUE_1], [NUM_VALUE_2], [NUM_VALUE_3], [REMARK], [LIST_ORDER], [ACTIVE_FLAG], [CREATED_DT], [CREATED_BY], [UPDATED_DT], [UPDATED_BY]) VALUES (6, N'0000000000', N'SCREEN_ID', N'M009', NULL, N'Employee', N'0', N'1', CAST(1.00 AS Numeric(10, 2)), CAST(0.00 AS Numeric(10, 2)), NULL, N'Nhân viên', CAST(1 AS Numeric(2, 0)), N'1', CAST(N'2016-09-29 10:32:41.333' AS DateTime), N'batch', CAST(N'2016-09-29 10:32:41.333' AS DateTime), N'batch')
INSERT [dbo].[TB_M_SYSTEM] ([ID], [COMPANY_CD], [CATEGORY], [CD], [VALUE], [CHAR_VALUE_1], [CHAR_VALUE_2], [CHAR_VALUE_3], [NUM_VALUE_1], [NUM_VALUE_2], [NUM_VALUE_3], [REMARK], [LIST_ORDER], [ACTIVE_FLAG], [CREATED_DT], [CREATED_BY], [UPDATED_DT], [UPDATED_BY]) VALUES (7, N'0000000000', N'SCREEN_ID', N'M007', NULL, N'Allowance', N'0', N'1', CAST(1.00 AS Numeric(10, 2)), CAST(0.00 AS Numeric(10, 2)), NULL, N'Trợ cấp/phụ cấp', CAST(4 AS Numeric(2, 0)), N'1', CAST(N'2016-09-29 10:32:41.333' AS DateTime), N'batch', CAST(N'2016-09-29 10:32:41.333' AS DateTime), NULL)
INSERT [dbo].[TB_M_SYSTEM] ([ID], [COMPANY_CD], [CATEGORY], [CD], [VALUE], [CHAR_VALUE_1], [CHAR_VALUE_2], [CHAR_VALUE_3], [NUM_VALUE_1], [NUM_VALUE_2], [NUM_VALUE_3], [REMARK], [LIST_ORDER], [ACTIVE_FLAG], [CREATED_DT], [CREATED_BY], [UPDATED_DT], [UPDATED_BY]) VALUES (8, N'0000000000', N'SCREEN_ID', N'M005', NULL, N'Policy', N'0', N'1', CAST(1.00 AS Numeric(10, 2)), CAST(0.00 AS Numeric(10, 2)), NULL, N'Chính sách', CAST(4 AS Numeric(2, 0)), N'1', CAST(N'2016-09-29 10:32:41.333' AS DateTime), N'batch', CAST(N'2016-09-29 10:32:41.333' AS DateTime), NULL)
INSERT [dbo].[TB_M_SYSTEM] ([ID], [COMPANY_CD], [CATEGORY], [CD], [VALUE], [CHAR_VALUE_1], [CHAR_VALUE_2], [CHAR_VALUE_3], [NUM_VALUE_1], [NUM_VALUE_2], [NUM_VALUE_3], [REMARK], [LIST_ORDER], [ACTIVE_FLAG], [CREATED_DT], [CREATED_BY], [UPDATED_DT], [UPDATED_BY]) VALUES (9, N'0000000000', N'SCREEN_ID', N'M006', NULL, N'SpecialInsurance', N'0', N'1', CAST(1.00 AS Numeric(10, 2)), CAST(0.00 AS Numeric(10, 2)), NULL, N'Tham gia BH trong trường hợp đặc biệt', CAST(4 AS Numeric(2, 0)), N'1', CAST(N'2016-09-29 10:32:41.333' AS DateTime), N'batch', CAST(N'2016-09-29 10:32:41.333' AS DateTime), NULL)
INSERT [dbo].[TB_M_SYSTEM] ([ID], [COMPANY_CD], [CATEGORY], [CD], [VALUE], [CHAR_VALUE_1], [CHAR_VALUE_2], [CHAR_VALUE_3], [NUM_VALUE_1], [NUM_VALUE_2], [NUM_VALUE_3], [REMARK], [LIST_ORDER], [ACTIVE_FLAG], [CREATED_DT], [CREATED_BY], [UPDATED_DT], [UPDATED_BY]) VALUES (11, N'0000000000', N'SCREEN_ID', N'M011', NULL, N'Dependent', N'1', N'1', CAST(1.00 AS Numeric(10, 2)), CAST(1.00 AS Numeric(10, 2)), NULL, N'Thông tin người phụ thuộc', CAST(2 AS Numeric(2, 0)), N'1', NULL, NULL, NULL, NULL)
INSERT [dbo].[TB_M_SYSTEM] ([ID], [COMPANY_CD], [CATEGORY], [CD], [VALUE], [CHAR_VALUE_1], [CHAR_VALUE_2], [CHAR_VALUE_3], [NUM_VALUE_1], [NUM_VALUE_2], [NUM_VALUE_3], [REMARK], [LIST_ORDER], [ACTIVE_FLAG], [CREATED_DT], [CREATED_BY], [UPDATED_DT], [UPDATED_BY]) VALUES (14, N'0000000000', N'SCREEN_ID', N'M013', NULL, N'AbsenceNotPay', N'1', N'1', CAST(1.00 AS Numeric(10, 2)), CAST(1.00 AS Numeric(10, 2)), NULL, N'Thông tin nhân viên nghỉ không lương', CAST(3 AS Numeric(2, 0)), N'1', NULL, NULL, NULL, NULL)
INSERT [dbo].[TB_M_SYSTEM] ([ID], [COMPANY_CD], [CATEGORY], [CD], [VALUE], [CHAR_VALUE_1], [CHAR_VALUE_2], [CHAR_VALUE_3], [NUM_VALUE_1], [NUM_VALUE_2], [NUM_VALUE_3], [REMARK], [LIST_ORDER], [ACTIVE_FLAG], [CREATED_DT], [CREATED_BY], [UPDATED_DT], [UPDATED_BY]) VALUES (15, N'AIT', N'EMPLOYEE_TYPE', N'FT', NULL, NULL, NULL, NULL, NULL, NULL, NULL, N'Fulltime', CAST(1 AS Numeric(2, 0)), N'1', NULL, NULL, NULL, NULL)
INSERT [dbo].[TB_M_SYSTEM] ([ID], [COMPANY_CD], [CATEGORY], [CD], [VALUE], [CHAR_VALUE_1], [CHAR_VALUE_2], [CHAR_VALUE_3], [NUM_VALUE_1], [NUM_VALUE_2], [NUM_VALUE_3], [REMARK], [LIST_ORDER], [ACTIVE_FLAG], [CREATED_DT], [CREATED_BY], [UPDATED_DT], [UPDATED_BY]) VALUES (16, N'AIT', N'EMPLOYEE_TYPE', N'PT', NULL, NULL, NULL, NULL, NULL, NULL, NULL, N'Part time', CAST(2 AS Numeric(2, 0)), N'1', NULL, NULL, NULL, NULL)
INSERT [dbo].[TB_M_SYSTEM] ([ID], [COMPANY_CD], [CATEGORY], [CD], [VALUE], [CHAR_VALUE_1], [CHAR_VALUE_2], [CHAR_VALUE_3], [NUM_VALUE_1], [NUM_VALUE_2], [NUM_VALUE_3], [REMARK], [LIST_ORDER], [ACTIVE_FLAG], [CREATED_DT], [CREATED_BY], [UPDATED_DT], [UPDATED_BY]) VALUES (19, N'AIT', N'EMPLOYEE_TYPE', N'PN', NULL, NULL, NULL, NULL, NULL, NULL, NULL, N'Partner', CAST(3 AS Numeric(2, 0)), N'1', NULL, NULL, NULL, NULL)
INSERT [dbo].[TB_M_SYSTEM] ([ID], [COMPANY_CD], [CATEGORY], [CD], [VALUE], [CHAR_VALUE_1], [CHAR_VALUE_2], [CHAR_VALUE_3], [NUM_VALUE_1], [NUM_VALUE_2], [NUM_VALUE_3], [REMARK], [LIST_ORDER], [ACTIVE_FLAG], [CREATED_DT], [CREATED_BY], [UPDATED_DT], [UPDATED_BY]) VALUES (20, N'AIT', N'WORKING_PLACE', N'HCM', NULL, NULL, NULL, NULL, NULL, NULL, NULL, N'Hồ Chí Minh', CAST(3 AS Numeric(2, 0)), N'1', NULL, NULL, NULL, NULL)
INSERT [dbo].[TB_M_SYSTEM] ([ID], [COMPANY_CD], [CATEGORY], [CD], [VALUE], [CHAR_VALUE_1], [CHAR_VALUE_2], [CHAR_VALUE_3], [NUM_VALUE_1], [NUM_VALUE_2], [NUM_VALUE_3], [REMARK], [LIST_ORDER], [ACTIVE_FLAG], [CREATED_DT], [CREATED_BY], [UPDATED_DT], [UPDATED_BY]) VALUES (21, N'AIT', N'WORKING_PLACE', N'HN', NULL, NULL, NULL, NULL, NULL, NULL, NULL, N'Hà Nội', CAST(1 AS Numeric(2, 0)), N'1', NULL, NULL, NULL, NULL)
INSERT [dbo].[TB_M_SYSTEM] ([ID], [COMPANY_CD], [CATEGORY], [CD], [VALUE], [CHAR_VALUE_1], [CHAR_VALUE_2], [CHAR_VALUE_3], [NUM_VALUE_1], [NUM_VALUE_2], [NUM_VALUE_3], [REMARK], [LIST_ORDER], [ACTIVE_FLAG], [CREATED_DT], [CREATED_BY], [UPDATED_DT], [UPDATED_BY]) VALUES (22, N'AIT', N'WORKING_PLACE', N'DN', NULL, NULL, NULL, NULL, NULL, NULL, NULL, N'Đà Nẵng', CAST(2 AS Numeric(2, 0)), N'1', NULL, NULL, NULL, NULL)
INSERT [dbo].[TB_M_SYSTEM] ([ID], [COMPANY_CD], [CATEGORY], [CD], [VALUE], [CHAR_VALUE_1], [CHAR_VALUE_2], [CHAR_VALUE_3], [NUM_VALUE_1], [NUM_VALUE_2], [NUM_VALUE_3], [REMARK], [LIST_ORDER], [ACTIVE_FLAG], [CREATED_DT], [CREATED_BY], [UPDATED_DT], [UPDATED_BY]) VALUES (25, N'0000000000', N'CONTINENTS', N'A', NULL, NULL, NULL, NULL, NULL, NULL, NULL, N'Châu Á', CAST(1 AS Numeric(2, 0)), N'1', NULL, NULL, NULL, NULL)
INSERT [dbo].[TB_M_SYSTEM] ([ID], [COMPANY_CD], [CATEGORY], [CD], [VALUE], [CHAR_VALUE_1], [CHAR_VALUE_2], [CHAR_VALUE_3], [NUM_VALUE_1], [NUM_VALUE_2], [NUM_VALUE_3], [REMARK], [LIST_ORDER], [ACTIVE_FLAG], [CREATED_DT], [CREATED_BY], [UPDATED_DT], [UPDATED_BY]) VALUES (26, N'0000000000', N'CONTINENTS', N'AU', NULL, NULL, NULL, NULL, NULL, NULL, NULL, N'Châu Âu', CAST(2 AS Numeric(2, 0)), N'1', NULL, NULL, NULL, NULL)
INSERT [dbo].[TB_M_SYSTEM] ([ID], [COMPANY_CD], [CATEGORY], [CD], [VALUE], [CHAR_VALUE_1], [CHAR_VALUE_2], [CHAR_VALUE_3], [NUM_VALUE_1], [NUM_VALUE_2], [NUM_VALUE_3], [REMARK], [LIST_ORDER], [ACTIVE_FLAG], [CREATED_DT], [CREATED_BY], [UPDATED_DT], [UPDATED_BY]) VALUES (27, N'0000000000', N'CONTINENTS', N'M', NULL, NULL, NULL, NULL, NULL, NULL, NULL, N'Châu Mỹ', CAST(3 AS Numeric(2, 0)), N'1', NULL, NULL, NULL, NULL)
INSERT [dbo].[TB_M_SYSTEM] ([ID], [COMPANY_CD], [CATEGORY], [CD], [VALUE], [CHAR_VALUE_1], [CHAR_VALUE_2], [CHAR_VALUE_3], [NUM_VALUE_1], [NUM_VALUE_2], [NUM_VALUE_3], [REMARK], [LIST_ORDER], [ACTIVE_FLAG], [CREATED_DT], [CREATED_BY], [UPDATED_DT], [UPDATED_BY]) VALUES (28, N'0000000000', N'CONTINENTS', N'P', NULL, NULL, NULL, NULL, NULL, NULL, NULL, N'Châu Phi', CAST(4 AS Numeric(2, 0)), N'1', NULL, NULL, NULL, NULL)
INSERT [dbo].[TB_M_SYSTEM] ([ID], [COMPANY_CD], [CATEGORY], [CD], [VALUE], [CHAR_VALUE_1], [CHAR_VALUE_2], [CHAR_VALUE_3], [NUM_VALUE_1], [NUM_VALUE_2], [NUM_VALUE_3], [REMARK], [LIST_ORDER], [ACTIVE_FLAG], [CREATED_DT], [CREATED_BY], [UPDATED_DT], [UPDATED_BY]) VALUES (29, N'0000000000', N'CONTINENTS', N'U', NULL, NULL, NULL, NULL, NULL, NULL, NULL, N'Châu Úc', CAST(5 AS Numeric(2, 0)), N'1', NULL, NULL, NULL, NULL)
INSERT [dbo].[TB_M_SYSTEM] ([ID], [COMPANY_CD], [CATEGORY], [CD], [VALUE], [CHAR_VALUE_1], [CHAR_VALUE_2], [CHAR_VALUE_3], [NUM_VALUE_1], [NUM_VALUE_2], [NUM_VALUE_3], [REMARK], [LIST_ORDER], [ACTIVE_FLAG], [CREATED_DT], [CREATED_BY], [UPDATED_DT], [UPDATED_BY]) VALUES (30, N'AIT', N'LEVEL', N'R1', NULL, NULL, NULL, NULL, NULL, NULL, NULL, N'Rank 1', CAST(1 AS Numeric(2, 0)), N'1', NULL, NULL, NULL, NULL)
INSERT [dbo].[TB_M_SYSTEM] ([ID], [COMPANY_CD], [CATEGORY], [CD], [VALUE], [CHAR_VALUE_1], [CHAR_VALUE_2], [CHAR_VALUE_3], [NUM_VALUE_1], [NUM_VALUE_2], [NUM_VALUE_3], [REMARK], [LIST_ORDER], [ACTIVE_FLAG], [CREATED_DT], [CREATED_BY], [UPDATED_DT], [UPDATED_BY]) VALUES (33, N'AIT', N'LEVEL', N'R2', NULL, NULL, NULL, NULL, NULL, NULL, NULL, N'Rank 2', CAST(2 AS Numeric(2, 0)), N'1', NULL, NULL, NULL, NULL)
INSERT [dbo].[TB_M_SYSTEM] ([ID], [COMPANY_CD], [CATEGORY], [CD], [VALUE], [CHAR_VALUE_1], [CHAR_VALUE_2], [CHAR_VALUE_3], [NUM_VALUE_1], [NUM_VALUE_2], [NUM_VALUE_3], [REMARK], [LIST_ORDER], [ACTIVE_FLAG], [CREATED_DT], [CREATED_BY], [UPDATED_DT], [UPDATED_BY]) VALUES (34, N'AIT', N'LEVEL', N'R3', NULL, NULL, NULL, NULL, NULL, NULL, NULL, N'Rank 3', CAST(3 AS Numeric(2, 0)), N'1', NULL, NULL, NULL, NULL)
INSERT [dbo].[TB_M_SYSTEM] ([ID], [COMPANY_CD], [CATEGORY], [CD], [VALUE], [CHAR_VALUE_1], [CHAR_VALUE_2], [CHAR_VALUE_3], [NUM_VALUE_1], [NUM_VALUE_2], [NUM_VALUE_3], [REMARK], [LIST_ORDER], [ACTIVE_FLAG], [CREATED_DT], [CREATED_BY], [UPDATED_DT], [UPDATED_BY]) VALUES (36, N'AIT', N'LEVEL_GROUP', N'LD', N'Leader', NULL, NULL, NULL, NULL, NULL, NULL, NULL, CAST(1 AS Numeric(2, 0)), N'1', NULL, NULL, NULL, NULL)
INSERT [dbo].[TB_M_SYSTEM] ([ID], [COMPANY_CD], [CATEGORY], [CD], [VALUE], [CHAR_VALUE_1], [CHAR_VALUE_2], [CHAR_VALUE_3], [NUM_VALUE_1], [NUM_VALUE_2], [NUM_VALUE_3], [REMARK], [LIST_ORDER], [ACTIVE_FLAG], [CREATED_DT], [CREATED_BY], [UPDATED_DT], [UPDATED_BY]) VALUES (37, N'AIT', N'LEVEL_GROUP', N'MG', N'Manager', NULL, NULL, NULL, NULL, NULL, NULL, NULL, CAST(2 AS Numeric(2, 0)), N'1', NULL, NULL, NULL, NULL)
INSERT [dbo].[TB_M_SYSTEM] ([ID], [COMPANY_CD], [CATEGORY], [CD], [VALUE], [CHAR_VALUE_1], [CHAR_VALUE_2], [CHAR_VALUE_3], [NUM_VALUE_1], [NUM_VALUE_2], [NUM_VALUE_3], [REMARK], [LIST_ORDER], [ACTIVE_FLAG], [CREATED_DT], [CREATED_BY], [UPDATED_DT], [UPDATED_BY]) VALUES (42, N'AIT', N'CONTRACT_TYPE', N'L', N'Có thời hạn', NULL, NULL, NULL, NULL, NULL, NULL, NULL, CAST(1 AS Numeric(2, 0)), N'1', NULL, NULL, NULL, NULL)
INSERT [dbo].[TB_M_SYSTEM] ([ID], [COMPANY_CD], [CATEGORY], [CD], [VALUE], [CHAR_VALUE_1], [CHAR_VALUE_2], [CHAR_VALUE_3], [NUM_VALUE_1], [NUM_VALUE_2], [NUM_VALUE_3], [REMARK], [LIST_ORDER], [ACTIVE_FLAG], [CREATED_DT], [CREATED_BY], [UPDATED_DT], [UPDATED_BY]) VALUES (43, N'AIT', N'CONTRACT_TYPE', N'U', N'Không có thời hạn', NULL, NULL, NULL, NULL, NULL, NULL, NULL, CAST(2 AS Numeric(2, 0)), N'1', NULL, NULL, NULL, NULL)
INSERT [dbo].[TB_M_SYSTEM] ([ID], [COMPANY_CD], [CATEGORY], [CD], [VALUE], [CHAR_VALUE_1], [CHAR_VALUE_2], [CHAR_VALUE_3], [NUM_VALUE_1], [NUM_VALUE_2], [NUM_VALUE_3], [REMARK], [LIST_ORDER], [ACTIVE_FLAG], [CREATED_DT], [CREATED_BY], [UPDATED_DT], [UPDATED_BY]) VALUES (44, N'AIT', N'INSU_CODE', N'I1', N'Insu Type 1', NULL, NULL, NULL, NULL, NULL, NULL, NULL, CAST(1 AS Numeric(2, 0)), N'1', NULL, NULL, NULL, NULL)
INSERT [dbo].[TB_M_SYSTEM] ([ID], [COMPANY_CD], [CATEGORY], [CD], [VALUE], [CHAR_VALUE_1], [CHAR_VALUE_2], [CHAR_VALUE_3], [NUM_VALUE_1], [NUM_VALUE_2], [NUM_VALUE_3], [REMARK], [LIST_ORDER], [ACTIVE_FLAG], [CREATED_DT], [CREATED_BY], [UPDATED_DT], [UPDATED_BY]) VALUES (45, N'AIT', N'INSU_CODE', N'I2', N'Insu Type 2', NULL, NULL, NULL, NULL, NULL, NULL, NULL, CAST(2 AS Numeric(2, 0)), N'1', NULL, NULL, NULL, NULL)
INSERT [dbo].[TB_M_SYSTEM] ([ID], [COMPANY_CD], [CATEGORY], [CD], [VALUE], [CHAR_VALUE_1], [CHAR_VALUE_2], [CHAR_VALUE_3], [NUM_VALUE_1], [NUM_VALUE_2], [NUM_VALUE_3], [REMARK], [LIST_ORDER], [ACTIVE_FLAG], [CREATED_DT], [CREATED_BY], [UPDATED_DT], [UPDATED_BY]) VALUES (47, N'AIT', N'CONTRACT_FORM', N'0', N'Không có HĐ', NULL, NULL, NULL, NULL, NULL, NULL, NULL, CAST(1 AS Numeric(2, 0)), N'1', NULL, NULL, NULL, NULL)
INSERT [dbo].[TB_M_SYSTEM] ([ID], [COMPANY_CD], [CATEGORY], [CD], [VALUE], [CHAR_VALUE_1], [CHAR_VALUE_2], [CHAR_VALUE_3], [NUM_VALUE_1], [NUM_VALUE_2], [NUM_VALUE_3], [REMARK], [LIST_ORDER], [ACTIVE_FLAG], [CREATED_DT], [CREATED_BY], [UPDATED_DT], [UPDATED_BY]) VALUES (48, N'AIT', N'CONTRACT_FORM', N'1', N'HĐ dưới 3 tháng', NULL, NULL, NULL, NULL, NULL, NULL, NULL, CAST(2 AS Numeric(2, 0)), N'1', NULL, NULL, NULL, NULL)
INSERT [dbo].[TB_M_SYSTEM] ([ID], [COMPANY_CD], [CATEGORY], [CD], [VALUE], [CHAR_VALUE_1], [CHAR_VALUE_2], [CHAR_VALUE_3], [NUM_VALUE_1], [NUM_VALUE_2], [NUM_VALUE_3], [REMARK], [LIST_ORDER], [ACTIVE_FLAG], [CREATED_DT], [CREATED_BY], [UPDATED_DT], [UPDATED_BY]) VALUES (49, N'AIT', N'CONTRACT_FORM', N'2', N'HĐ dưới 2 tháng', NULL, NULL, NULL, NULL, NULL, NULL, NULL, CAST(3 AS Numeric(2, 0)), N'1', NULL, NULL, NULL, NULL)
INSERT [dbo].[TB_M_SYSTEM] ([ID], [COMPANY_CD], [CATEGORY], [CD], [VALUE], [CHAR_VALUE_1], [CHAR_VALUE_2], [CHAR_VALUE_3], [NUM_VALUE_1], [NUM_VALUE_2], [NUM_VALUE_3], [REMARK], [LIST_ORDER], [ACTIVE_FLAG], [CREATED_DT], [CREATED_BY], [UPDATED_DT], [UPDATED_BY]) VALUES (51, N'AIT', N'ADMIN_USER', N'001', NULL, N'thanhtv', NULL, NULL, NULL, NULL, NULL, NULL, NULL, N'1', NULL, NULL, NULL, NULL)
INSERT [dbo].[TB_M_SYSTEM] ([ID], [COMPANY_CD], [CATEGORY], [CD], [VALUE], [CHAR_VALUE_1], [CHAR_VALUE_2], [CHAR_VALUE_3], [NUM_VALUE_1], [NUM_VALUE_2], [NUM_VALUE_3], [REMARK], [LIST_ORDER], [ACTIVE_FLAG], [CREATED_DT], [CREATED_BY], [UPDATED_DT], [UPDATED_BY]) VALUES (22, N'AIT', N'LONGTERM_ABSENCE', N'NVR', N'NVR', N'NVR', N'0', N'1', CAST(1.00 AS Numeric(10, 2)), NULL, NULL, N'Nghỉ việc riêng', CAST(5 AS Numeric(2, 0)), N'1', CAST(N'2016-10-25T00:00:00.000' AS DateTime), N'sonvh', CAST(N'2016-10-25T00:00:00.000' AS DateTime), N'sonvh')
INSERT [dbo].[TB_M_SYSTEM] ([ID], [COMPANY_CD], [CATEGORY], [CD], [VALUE], [CHAR_VALUE_1], [CHAR_VALUE_2], [CHAR_VALUE_3], [NUM_VALUE_1], [NUM_VALUE_2], [NUM_VALUE_3], [REMARK], [LIST_ORDER], [ACTIVE_FLAG], [CREATED_DT], [CREATED_BY], [UPDATED_DT], [UPDATED_BY]) VALUES (23, N'AIT', N'LONGTERM_ABSENCE', N'NTS', N'NTS', N'NTS', N'0', N'1', CAST(1.00 AS Numeric(10, 2)), NULL, NULL, N'Nghỉ thai sản', CAST(5 AS Numeric(2, 0)), N'1', CAST(N'2016-10-25T00:00:00.000' AS DateTime), N'sonvh', CAST(N'2016-10-25T00:00:00.000' AS DateTime), N'sonvh')
INSERT [dbo].[TB_M_SYSTEM] ([ID], [COMPANY_CD], [CATEGORY], [CD], [VALUE], [CHAR_VALUE_1], [CHAR_VALUE_2], [CHAR_VALUE_3], [NUM_VALUE_1], [NUM_VALUE_2], [NUM_VALUE_3], [REMARK], [LIST_ORDER], [ACTIVE_FLAG], [CREATED_DT], [CREATED_BY], [UPDATED_DT], [UPDATED_BY]) VALUES (24, N'AIT', N'LONGTERM_ABSENCE', N'NPN', N'NPN', N'NPN', N'0', N'1', CAST(1.00 AS Numeric(10, 2)), NULL, NULL, N'Nghỉ phép năm', CAST(5 AS Numeric(2, 0)), N'1', CAST(N'2016-10-25T00:00:00.000' AS DateTime), N'sonvh', CAST(N'2016-10-25T00:00:00.000' AS DateTime), N'sonvh')
INSERT [dbo].[TB_M_SYSTEM] ([ID], [COMPANY_CD], [CATEGORY], [CD], [VALUE], [CHAR_VALUE_1], [CHAR_VALUE_2], [CHAR_VALUE_3], [NUM_VALUE_1], [NUM_VALUE_2], [NUM_VALUE_3], [REMARK], [LIST_ORDER], [ACTIVE_FLAG], [CREATED_DT], [CREATED_BY], [UPDATED_DT], [UPDATED_BY]) VALUES (25, N'AIT', N'LONGTERM_ABSENCE', N'NOD', N'NOD', N'NOD', N'0', N'1', CAST(1.00 AS Numeric(10, 2)), NULL, NULL, N'Nghỉ ốm đau', CAST(5 AS Numeric(2, 0)), N'1', CAST(N'2016-10-25T00:00:00.000' AS DateTime), N'sonvh', CAST(N'2016-10-25T00:00:00.000' AS DateTime), N'sonvh')
INSERT [dbo].[TB_M_SYSTEM] ([ID], [COMPANY_CD], [CATEGORY], [CD], [VALUE], [CHAR_VALUE_1], [CHAR_VALUE_2], [CHAR_VALUE_3], [NUM_VALUE_1], [NUM_VALUE_2], [NUM_VALUE_3], [REMARK], [LIST_ORDER], [ACTIVE_FLAG], [CREATED_DT], [CREATED_BY], [UPDATED_DT], [UPDATED_BY]) VALUES (26, N'AIT', N'LONGTERM_ABSENCE', N'NDC', N'NDC', N'NDC', N'0', N'1', CAST(1.00 AS Numeric(10, 2)), NULL, NULL, N'Nghỉ đám cưới', CAST(5 AS Numeric(2, 0)), N'1', CAST(N'2016-10-25T00:00:00.000' AS DateTime), N'sonvh', CAST(N'2016-10-25T00:00:00.000' AS DateTime), N'sonvh')
INSERT [dbo].[TB_M_SYSTEM] ([ID], [COMPANY_CD], [CATEGORY], [CD], [VALUE], [CHAR_VALUE_1], [CHAR_VALUE_2], [CHAR_VALUE_3], [NUM_VALUE_1], [NUM_VALUE_2], [NUM_VALUE_3], [REMARK], [LIST_ORDER], [ACTIVE_FLAG], [CREATED_DT], [CREATED_BY], [UPDATED_DT], [UPDATED_BY]) VALUES (27, N'AIT', N'LONGTERM_ABSENCE', N'NDT', N'NDT', N'NDT', N'0', N'1', CAST(1.00 AS Numeric(10, 2)), NULL, NULL, N'Nghỉ đám tang', CAST(5 AS Numeric(2, 0)), N'1', CAST(N'2016-10-25T00:00:00.000' AS DateTime), N'sonvh', CAST(N'2016-10-25T00:00:00.000' AS DateTime), N'sonvh')
INSERT [dbo].[TB_M_SYSTEM] ([ID], [COMPANY_CD], [CATEGORY], [CD], [VALUE], [CHAR_VALUE_1], [CHAR_VALUE_2], [CHAR_VALUE_3], [NUM_VALUE_1], [NUM_VALUE_2], [NUM_VALUE_3], [REMARK], [LIST_ORDER], [ACTIVE_FLAG], [CREATED_DT], [CREATED_BY], [UPDATED_DT], [UPDATED_BY]) VALUES (28, N'AIT', N'LONGTERM_ABSENCE', N'NCT', N'NCT', N'NCT', N'0', N'1', CAST(1.00 AS Numeric(10, 2)), NULL, NULL, N'Nghỉ công tác', CAST(5 AS Numeric(2, 0)), N'1', CAST(N'2016-10-25T00:00:00.000' AS DateTime), N'sonvh', CAST(N'2016-10-25T00:00:00.000' AS DateTime), N'sonvh')
INSERT [dbo].[TB_M_SYSTEM] ([ID], [COMPANY_CD], [CATEGORY], [CD], [VALUE], [CHAR_VALUE_1], [CHAR_VALUE_2], [CHAR_VALUE_3], [NUM_VALUE_1], [NUM_VALUE_2], [NUM_VALUE_3], [REMARK], [LIST_ORDER], [ACTIVE_FLAG], [CREATED_DT], [CREATED_BY], [UPDATED_DT], [UPDATED_BY]) VALUES (12, N'0000000000', N'FOREIGN_CUR', N'0', N'VND', N'VND', N'0', N'1', CAST(1.00 AS Numeric(10, 2)), NULL, NULL, N'VND', CAST(4 AS Numeric(2, 0)), N'1', CAST(N'2016-09-29T10:32:41.333' AS DateTime), N'batch', CAST(N'2016-09-29T10:32:41.333' AS DateTime), NULL)
INSERT [dbo].[TB_M_SYSTEM] ([ID], [COMPANY_CD], [CATEGORY], [CD], [VALUE], [CHAR_VALUE_1], [CHAR_VALUE_2], [CHAR_VALUE_3], [NUM_VALUE_1], [NUM_VALUE_2], [NUM_VALUE_3], [REMARK], [LIST_ORDER], [ACTIVE_FLAG], [CREATED_DT], [CREATED_BY], [UPDATED_DT], [UPDATED_BY]) VALUES (13, N'0000000000', N'FOREIGN_CUR', N'1', N'USD', N'USD', N'0', N'1', CAST(1.00 AS Numeric(10, 2)), NULL, NULL, N'USD', CAST(4 AS Numeric(2, 0)), N'1', CAST(N'2016-09-29T10:32:41.333' AS DateTime), N'batch', CAST(N'2016-09-29T10:32:41.333' AS DateTime), NULL)
INSERT [dbo].[TB_M_SYSTEM] ([ID], [COMPANY_CD], [CATEGORY], [CD], [VALUE], [CHAR_VALUE_1], [CHAR_VALUE_2], [CHAR_VALUE_3], [NUM_VALUE_1], [NUM_VALUE_2], [NUM_VALUE_3], [REMARK], [LIST_ORDER], [ACTIVE_FLAG], [CREATED_DT], [CREATED_BY], [UPDATED_DT], [UPDATED_BY]) VALUES (14, N'0000000000', N'FOREIGN_CUR', N'2', N'JPY', N'JPY', N'0', N'1', CAST(1.00 AS Numeric(10, 2)), NULL, NULL, N'JPY', CAST(4 AS Numeric(2, 0)), N'1', CAST(N'2016-09-29T10:32:41.333' AS DateTime), N'batch', CAST(N'2016-09-29T10:32:41.333' AS DateTime), NULL)
SET IDENTITY_INSERT [dbo].[TB_M_SYSTEM] OFF

-- =============================================KY_POLICY_MASTER=============================================
SET IDENTITY_INSERT [dbo].[KY_POLICY_MASTER] ON 

INSERT [dbo].[KY_POLICY_MASTER] ([ID], [POLICY_CD], [POLICY_NAME], [POLICY_TYPE], [GROUP_NAME], [LIMIT_STEP], [NUM_VALUE], [CHAR_VALUE], [UNIT], [LIMIT_STEP_UNIT], [ITEM_REF], [EFFECTIVE_DT], [DELETE_FLAG], [ALLOW_EDIT], [CREATED_DT], [CREATED_BY], [UPDATED_DT], [UPDATED_BY]) VALUES (1, N'DVCD', N'Các phụ cấp/trợ cấp chịu phí ĐVCĐ', N'0', N'Đơn vị công đoàn', CAST(111.25 AS Numeric(11, 2)), CAST(10.25 AS Numeric(11, 2)), N'XXX,XXY,XYZ', N'0', N'0', N'12121212', CAST(N'2016-10-13' AS Date), N'0', N'0', CAST(N'2016-10-13T00:00:00.000' AS DateTime), N'sonvh', CAST(N'2016-10-13T00:00:00.000' AS DateTime), N'sonvh')
INSERT [dbo].[KY_POLICY_MASTER] ([ID], [POLICY_CD], [POLICY_NAME], [POLICY_TYPE], [GROUP_NAME], [LIMIT_STEP], [NUM_VALUE], [CHAR_VALUE], [UNIT], [LIMIT_STEP_UNIT], [ITEM_REF], [EFFECTIVE_DT], [DELETE_FLAG], [ALLOW_EDIT], [CREATED_DT], [CREATED_BY], [UPDATED_DT], [UPDATED_BY]) VALUES (3, N'HIP', N'Tỷ lệ BHYT cá nhân', N'0', N'Bảo hiểm y tế', CAST(13213.00 AS Numeric(11, 2)), CAST(321231.00 AS Numeric(11, 2)), N'AAA,BBB,CCC', N'1', N'1', N'AAAA', CAST(N'2016-10-14' AS Date), N'0', N'0', CAST(N'2016-10-14T00:00:00.000' AS DateTime), N'sonvh', CAST(N'2016-10-14T00:00:00.000' AS DateTime), N'sonvh')
INSERT [dbo].[KY_POLICY_MASTER] ([ID], [POLICY_CD], [POLICY_NAME], [POLICY_TYPE], [GROUP_NAME], [LIMIT_STEP], [NUM_VALUE], [CHAR_VALUE], [UNIT], [LIMIT_STEP_UNIT], [ITEM_REF], [EFFECTIVE_DT], [DELETE_FLAG], [ALLOW_EDIT], [CREATED_DT], [CREATED_BY], [UPDATED_DT], [UPDATED_BY]) VALUES (4, N'HSP', N'Tỷ lệ BHYT doanh nghiệp', N'0', N'Bảo hiểm y tế', CAST(13213.00 AS Numeric(11, 2)), CAST(321231.00 AS Numeric(11, 2)), N'AAA,BBB,CCC', N'1', N'1', N'AAAA', CAST(N'2016-10-14' AS Date), N'0', N'0', CAST(N'2016-10-14T00:00:00.000' AS DateTime), N'sonvh', CAST(N'2016-10-14T00:00:00.000' AS DateTime), N'sonvh')
INSERT [dbo].[KY_POLICY_MASTER] ([ID], [POLICY_CD], [POLICY_NAME], [POLICY_TYPE], [GROUP_NAME], [LIMIT_STEP], [NUM_VALUE], [CHAR_VALUE], [UNIT], [LIMIT_STEP_UNIT], [ITEM_REF], [EFFECTIVE_DT], [DELETE_FLAG], [ALLOW_EDIT], [CREATED_DT], [CREATED_BY], [UPDATED_DT], [UPDATED_BY]) VALUES (5, N'BHXH', N'BHXH', N'2', N'BH', NULL, NULL, NULL, NULL, NULL, NULL, CAST(N'2016-01-01' AS Date), N'0', NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[KY_POLICY_MASTER] ([ID], [POLICY_CD], [POLICY_NAME], [POLICY_TYPE], [GROUP_NAME], [LIMIT_STEP], [NUM_VALUE], [CHAR_VALUE], [UNIT], [LIMIT_STEP_UNIT], [ITEM_REF], [EFFECTIVE_DT], [DELETE_FLAG], [ALLOW_EDIT], [CREATED_DT], [CREATED_BY], [UPDATED_DT], [UPDATED_BY]) VALUES (6, N'BHYT', N'BHYT', N'2', N'BH', NULL, NULL, NULL, NULL, NULL, NULL, CAST(N'2016-01-01' AS Date), N'0', NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[KY_POLICY_MASTER] ([ID], [POLICY_CD], [POLICY_NAME], [POLICY_TYPE], [GROUP_NAME], [LIMIT_STEP], [NUM_VALUE], [CHAR_VALUE], [UNIT], [LIMIT_STEP_UNIT], [ITEM_REF], [EFFECTIVE_DT], [DELETE_FLAG], [ALLOW_EDIT], [CREATED_DT], [CREATED_BY], [UPDATED_DT], [UPDATED_BY]) VALUES (7, N'CD', N'Chi phí công đoàn', N'2', N'BH', NULL, NULL, NULL, NULL, NULL, NULL, CAST(N'2016-01-01' AS Date), N'0', NULL, NULL, NULL, NULL, NULL)

SET IDENTITY_INSERT [dbo].[KY_POLICY_MASTER] OFF

-- =============================================KY_CLOSING_DATE=============================================
SET IDENTITY_INSERT [dbo].[KY_CLOSING_DATE] ON 

INSERT [dbo].[KY_CLOSING_DATE] ([ID], [COMPANY_ID], [YEAR_MONTH], [CLOSING_DATE], [CREATED_DT], [CREATED_BY], [UPDATED_DT], [UPDATED_BY]) VALUES (1, 4, N'201611', CAST(N'2020-11-18T00:00:00.000' AS DateTime), CAST(N'2016-11-18T00:00:00.000' AS DateTime), N'sonvh', CAST(N'2016-11-18T00:00:00.000' AS DateTime), N'sonvh')
SET IDENTITY_INSERT [dbo].[KY_CLOSING_DATE] OFF


-- ============================================= 018  =============================================
USE [KyuyoSystem]
GO
SET IDENTITY_INSERT [dbo].[KY_CLOSING_DATE] ON 

INSERT [dbo].[KY_CLOSING_DATE] ([ID], [COMPANY_ID], [YEAR_MONTH], [CLOSING_DATE], [CREATED_DT], [CREATED_BY], [UPDATED_DT], [UPDATED_BY]) VALUES (1, 4, N'201611', CAST(N'2020-11-18T00:00:00.000' AS DateTime), CAST(N'2016-11-18T00:00:00.000' AS DateTime), N'sonvh', CAST(N'2016-11-18T00:00:00.000' AS DateTime), N'sonvh')
SET IDENTITY_INSERT [dbo].[KY_CLOSING_DATE] OFF
SET IDENTITY_INSERT [dbo].[TB_M_SYSTEM] ON 

INSERT [dbo].[TB_M_SYSTEM] ([ID], [COMPANY_CD], [CATEGORY], [CD], [VALUE], [CHAR_VALUE_1], [CHAR_VALUE_2], [CHAR_VALUE_3], [NUM_VALUE_1], [NUM_VALUE_2], [NUM_VALUE_3], [REMARK], [LIST_ORDER], [ACTIVE_FLAG], [CREATED_DT], [CREATED_BY], [UPDATED_DT], [UPDATED_BY]) VALUES (29, N'0000000000', N'SCREEN_ID', N'M018', NULL, N'WorkingTimeChangeRefer', N'Import dữ liệu chấm công|fa-cubes', N'1', CAST(1.00 AS Numeric(10, 2)), NULL, CAST(1.00 AS Numeric(10, 2)), N'Import chênh lệch dữ liệu chấm công', CAST(2 AS Numeric(2, 0)), N'1', NULL, NULL, NULL, NULL)
INSERT [dbo].[TB_M_SYSTEM] ([ID], [COMPANY_CD], [CATEGORY], [CD], [VALUE], [CHAR_VALUE_1], [CHAR_VALUE_2], [CHAR_VALUE_3], [NUM_VALUE_1], [NUM_VALUE_2], [NUM_VALUE_3], [REMARK], [LIST_ORDER], [ACTIVE_FLAG], [CREATED_DT], [CREATED_BY], [UPDATED_DT], [UPDATED_BY]) VALUES (30, N'AIT', N'KY_DATE', N'001', N'26', N'', N'', N'', CAST(1.00 AS Numeric(10, 2)), NULL, NULL, N'VND', CAST(4 AS Numeric(2, 0)), N'1', CAST(N'2016-09-29T10:32:41.333' AS DateTime), N'batch', CAST(N'2016-09-29T10:32:41.333' AS DateTime), NULL)
INSERT [dbo].[TB_M_SYSTEM] ([ID], [COMPANY_CD], [CATEGORY], [CD], [VALUE], [CHAR_VALUE_1], [CHAR_VALUE_2], [CHAR_VALUE_3], [NUM_VALUE_1], [NUM_VALUE_2], [NUM_VALUE_3], [REMARK], [LIST_ORDER], [ACTIVE_FLAG], [CREATED_DT], [CREATED_BY], [UPDATED_DT], [UPDATED_BY]) VALUES (31, N'AIT', N'START_DT_CAL_SAL', N'001', NULL, NULL, NULL, NULL, CAST(9.00 AS Numeric(10, 2)), NULL, NULL, NULL, NULL, N'1', NULL, NULL, NULL, NULL)
SET IDENTITY_INSERT [dbo].[TB_M_SYSTEM] OFF
SET IDENTITY_INSERT [dbo].[TB_R_WORKING_TIME_HIS] ON 

INSERT [dbo].[TB_R_WORKING_TIME_HIS] ([ID], [WORKING_TIME_CD], [COMPANY_CD], [EMPLOYEE_NO], [REVISION], [DEPT_CD], [WORKING_TITLE], [WORKING_DATE], [ACT_IN_TIME], [ACT_OUT_TIME], [WORKING_TIME], [ABSENCE_TIME], [TOTAL_OT_TIME], [LATE_OT_TIME], [TOTAL_LATE_TIME], [DEDUCTED_UNPAID], [DEDUCTED_PAID], [ATTENDANCE_TYPE], [WORKING_TYPE], [SPECIAL_TYPE], [REMARK], [DEDUCTED_NON_WORK_PLAN], [DEDUCTED_NON_WORK_ACTUAL], [MAIN_SHIFT], [CURRENT_SHIFT], [STD_IN_TIME], [STD_OUT_TIME], [STD_WORK_HOUR], [CONFIRMED_BY], [WITHDRAWN_BY], [CREATED_DT], [CONFIRMED_DT], [WITHDRAWN_DT], [UPDATED_DT], [YEAR_MONTH]) VALUES (2, 1, N'AIT', N'001', CAST(1 AS Numeric(2, 0)), N'ACC001', N'ABCDC', CAST(N'2016-11-28' AS Date), N'8', N'17', CAST(8.00 AS Numeric(4, 2)), CAST(0.00 AS Numeric(4, 2)), CAST(0.00 AS Numeric(4, 2)), CAST(0.00 AS Numeric(4, 2)), CAST(0.00 AS Numeric(4, 2)), CAST(0.00 AS Numeric(4, 2)), CAST(0.00 AS Numeric(4, 2)), N'C', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, N'201611')
INSERT [dbo].[TB_R_WORKING_TIME_HIS] ([ID], [WORKING_TIME_CD], [COMPANY_CD], [EMPLOYEE_NO], [REVISION], [DEPT_CD], [WORKING_TITLE], [WORKING_DATE], [ACT_IN_TIME], [ACT_OUT_TIME], [WORKING_TIME], [ABSENCE_TIME], [TOTAL_OT_TIME], [LATE_OT_TIME], [TOTAL_LATE_TIME], [DEDUCTED_UNPAID], [DEDUCTED_PAID], [ATTENDANCE_TYPE], [WORKING_TYPE], [SPECIAL_TYPE], [REMARK], [DEDUCTED_NON_WORK_PLAN], [DEDUCTED_NON_WORK_ACTUAL], [MAIN_SHIFT], [CURRENT_SHIFT], [STD_IN_TIME], [STD_OUT_TIME], [STD_WORK_HOUR], [CONFIRMED_BY], [WITHDRAWN_BY], [CREATED_DT], [CONFIRMED_DT], [WITHDRAWN_DT], [UPDATED_DT], [YEAR_MONTH]) VALUES (3, 2, N'AIT', N'001', CAST(1 AS Numeric(2, 0)), N'ACC001', N'ABCDC', CAST(N'2016-11-29' AS Date), N'8', N'17', CAST(8.00 AS Numeric(4, 2)), CAST(0.00 AS Numeric(4, 2)), CAST(0.00 AS Numeric(4, 2)), CAST(0.00 AS Numeric(4, 2)), CAST(0.00 AS Numeric(4, 2)), CAST(0.00 AS Numeric(4, 2)), CAST(0.00 AS Numeric(4, 2)), N'C', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, N'201611')
INSERT [dbo].[TB_R_WORKING_TIME_HIS] ([ID], [WORKING_TIME_CD], [COMPANY_CD], [EMPLOYEE_NO], [REVISION], [DEPT_CD], [WORKING_TITLE], [WORKING_DATE], [ACT_IN_TIME], [ACT_OUT_TIME], [WORKING_TIME], [ABSENCE_TIME], [TOTAL_OT_TIME], [LATE_OT_TIME], [TOTAL_LATE_TIME], [DEDUCTED_UNPAID], [DEDUCTED_PAID], [ATTENDANCE_TYPE], [WORKING_TYPE], [SPECIAL_TYPE], [REMARK], [DEDUCTED_NON_WORK_PLAN], [DEDUCTED_NON_WORK_ACTUAL], [MAIN_SHIFT], [CURRENT_SHIFT], [STD_IN_TIME], [STD_OUT_TIME], [STD_WORK_HOUR], [CONFIRMED_BY], [WITHDRAWN_BY], [CREATED_DT], [CONFIRMED_DT], [WITHDRAWN_DT], [UPDATED_DT], [YEAR_MONTH]) VALUES (4, 3, N'AIT', N'001', CAST(1 AS Numeric(2, 0)), N'ACC001', N'ABCDC', CAST(N'2016-12-04' AS Date), N'8', N'17', CAST(8.00 AS Numeric(4, 2)), CAST(0.00 AS Numeric(4, 2)), CAST(0.00 AS Numeric(4, 2)), CAST(0.00 AS Numeric(4, 2)), CAST(0.00 AS Numeric(4, 2)), CAST(0.00 AS Numeric(4, 2)), CAST(0.00 AS Numeric(4, 2)), N'C', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, N'201611')
SET IDENTITY_INSERT [dbo].[TB_R_WORKING_TIME_HIS] OFF