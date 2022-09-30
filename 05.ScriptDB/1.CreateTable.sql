USE MASTER
GO

IF EXISTS (SELECT name FROM master.dbo.sysdatabases WHERE name = N'KyuyoSystem')
	DROP DATABASE KyuyoSystem
GO

CREATE DATABASE KyuyoSystem

GO

USE KyuyoSystem
GO

SET NOCOUNT ON;
GO

--------------------------------------------------------------------------------------------------------
CREATE TABLE TB_M_SYSTEM(
	ID INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
	COMPANY_CD VARCHAR(20) NOT NULL,
	CATEGORY VARCHAR(50) NOT NULL,
	CD VARCHAR(50) NOT NULL,
	VALUE NVARCHAR(100) NULL,
	CHAR_VALUE_1 NVARCHAR(100) NULL,
	CHAR_VALUE_2 NVARCHAR(100) NULL,
	CHAR_VALUE_3 NVARCHAR(100) NULL,
	NUM_VALUE_1 NUMERIC(10, 2) NULL,
	NUM_VALUE_2 NUMERIC(10, 2) NULL,
	NUM_VALUE_3 NUMERIC(10, 2) NULL,
	REMARK NVARCHAR(200) NULL,
	LIST_ORDER NUMERIC(2, 0) NULL,
	ACTIVE_FLAG CHAR(1) NOT NULL,
	CREATED_DT DATETIME NULL,
	CREATED_BY VARCHAR(20) NULL,
	UPDATED_DT DATETIME NULL,
	UPDATED_BY VARCHAR(20) NULL,
	CONSTRAINT UNIQUE_SYSTEM UNIQUE (COMPANY_CD, CATEGORY, CD)
)

GO
--------------------------------------------------------------------------------------------------------
CREATE TABLE TB_M_COMPANY(
	ID INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
	COMPANY_CD VARCHAR(20) NOT NULL,
	COMPANY_NAME NVARCHAR(100) NOT NULL,
	ADDRESS NVARCHAR(200) NULL,
	COMPANY_TAX_CODE VARCHAR(20) NULL,
	ACTIVE_FLAG CHAR(1) NOT NULL,
	PAYROLL_STATUS CHAR(1) NOT NULL,
	STANDAR_WORKING_DAYS NUMERIC(2, 0) NOT NULL,
	COMPANY_AREA NUMERIC(2, 0) NOT NULL,
	CREATED_DT DATETIME NULL,
	CREATED_BY VARCHAR(20) NULL,
	UPDATED_DT DATETIME NULL,
	UPDATED_BY VARCHAR(20) NULL,
	CONSTRAINT UNIQUE_COMPANY UNIQUE (COMPANY_CD)
)

GO

--------------------------------------------------------------------------------------------------------
CREATE TABLE TB_M_DEPARTMENT(
	ID INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
	DEPT_CD VARCHAR(20) NOT NULL,
	DEPT_NAME NVARCHAR(100) NOT NULL,
	COMPANY_CD VARCHAR(20) NOT NULL,
	ACTIVE_FLAG CHAR(1) NOT NULL,
	CREATED_DT DATETIME NULL,
	CREATED_BY VARCHAR(20) NULL,
	UPDATED_DT DATETIME NULL,
	UPDATED_BY VARCHAR(20) NULL,
	CONSTRAINT UNIQUE_DEPARTMENT UNIQUE (DEPT_CD, COMPANY_CD, ACTIVE_FLAG)
)

GO

--------------------------------------------------------------------------------------------------------
CREATE TABLE TB_M_EMP_DEPT(
	ID INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
	COMPANY_CD VARCHAR(20) NOT NULL,
	DEPT_CD VARCHAR(20) NOT NULL,
	DEPT_NAME NVARCHAR(100) NOT NULL,
	EMPLOYEE_NO VARCHAR(20) NOT NULL,
	TITLE NVARCHAR(100) NULL,
	START_DT DATE NOT NULL,
	MAIN_FLAG CHAR(1) NOT NULL,
	DELETE_FLAG CHAR(1) NULL,
	INACTIVE_DT DATE NULL,
	CREATED_DT DATETIME NULL,
	CREATED_BY VARCHAR(20) NULL,
	UPDATED_DT DATETIME NULL,
	UPDATED_BY VARCHAR(20) NULL
)

GO
--------------------------------------------------------------------------------------------------------
CREATE TABLE TB_R_WORKING_TIME(
	WORKING_TIME_CD INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
	COMPANY_CD VARCHAR(20) NOT NULL,
	EMPLOYEE_NO VARCHAR(10) NOT NULL,
	REVISION NUMERIC(2, 0) NULL,
	DEPT_CD VARCHAR(20) NULL,
	WORKING_TITLE VARCHAR(5) NULL,
	WORKING_DATE DATE NOT NULL,
	ACT_IN_TIME VARCHAR(4) NULL,
	ACT_OUT_TIME VARCHAR(4) NULL,
	WORKING_TIME NUMERIC(4, 2) NULL,
	ABSENCE_TIME NUMERIC(4, 2) NULL,
	TOTAL_OT_TIME NUMERIC(4, 2) NULL,
	LATE_OT_TIME NUMERIC(4, 2) NULL,
	TOTAL_LATE_TIME NUMERIC(4, 2) NULL,
	DEDUCTED_UNPAID NUMERIC(4, 2) NULL,
	DEDUCTED_PAID NUMERIC(4, 2) NULL,
	ATTENDANCE_TYPE CHAR(1) NULL,
	WORKING_TYPE CHAR(1) NULL,
	SPECIAL_TYPE VARCHAR(10) NULL,
	REMARK NVARCHAR(200) NULL,
	DEDUCTED_NON_WORK_PLAN NUMERIC(4, 2) NULL,
	DEDUCTED_NON_WORK_ACTUAL NUMERIC(4, 2) NULL,
	MAIN_SHIFT CHAR(1) NULL,
	CURRENT_SHIFT CHAR(1) NULL,
	STD_IN_TIME VARCHAR(5) NULL,
	STD_OUT_TIME VARCHAR(5) NULL,
	STD_WORK_HOUR NUMERIC(4, 2) NULL,
	STATUS CHAR(1) NULL,
	CONFIRMED_BY VARCHAR(20) NULL,
	WITHDRAWN_BY VARCHAR(20) NULL,
	CREATED_DT DATE NULL,
	CONFIRMED_DT DATE NULL,
	WITHDRAWN_DT DATE NULL,
	UPDATED_DT DATE NULL,
	CONSTRAINT UNIQUE_WORKING_TIME UNIQUE (COMPANY_CD, EMPLOYEE_NO, REVISION, WORKING_DATE)
)

GO
--------------------------------------------------------------------------------------------------------
CREATE TABLE KY_POLICY_MASTER(
	ID INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
	POLICY_CD VARCHAR(10) NOT NULL,
	POLICY_NAME NVARCHAR(200) NOT NULL,
	POLICY_TYPE CHAR(1) NOT NULL,
	GROUP_NAME NVARCHAR(200) NULL,
	LIMIT_STEP NUMERIC(11, 2) NULL,
	NUM_VALUE NUMERIC(11, 2) NULL,
	CHAR_VALUE NVARCHAR(200) NULL,
	UNIT CHAR(1) NULL,
	LIMIT_STEP_UNIT CHAR(1) NULL,
	ITEM_REF VARCHAR(10) NULL,
	EFFECTIVE_DT DATE NOT NULL,
	DELETE_FLAG CHAR(1) NULL,
	ALLOW_EDIT CHAR(1) NULL,
	CREATED_DT DATETIME NULL,
	CREATED_BY VARCHAR(20) NULL,
	UPDATED_DT DATETIME NULL,
	UPDATED_BY VARCHAR(20) NULL
)

GO
--------------------------------------------------------------------------------------------------------
CREATE TABLE KY_SPECIAL_INSURANCE_MASTER(
	ID INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
	ABSENCE_NO VARCHAR(10) NOT NULL,
	ABSENCE_DESCIPTION NVARCHAR(200) NOT NULL,
	INSU_RATE NVARCHAR(100) NOT NULL,
	EFFECTIVE_DT DATE NOT NULL,
	DELETE_FLAG CHAR(1) NULL,
	CREATED_DT DATETIME NULL,
	CREATED_BY VARCHAR(20) NULL,
	UPDATED_DT DATETIME NULL,
	UPDATED_BY VARCHAR(20) NULL
)

GO
--------------------------------------------------------------------------------------------------------
CREATE TABLE KY_ALLOWANCE_MASTER(
	ID INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
	COMPANY_ID INT NOT NULL,
	ALLOWANCE_CD VARCHAR(10) NOT NULL,
	ALLOWANCE_NAME NVARCHAR(200) NOT NULL,
	GROUP_CD VARCHAR(10) NOT NULL,
	GROUP_NAME NVARCHAR(200) NULL,
	VALUE_OFFICAL NUMERIC(11, 1) NOT NULL,
	VALUE_PROB NUMERIC(11, 1) NOT NULL,
	UNIT CHAR(1) NOT NULL,
	ALLOWANCE_FLG CHAR(1) NULL,
	EFFECTIVE_DT DATE NOT NULL,
	DELETE_FLAG CHAR(1) NULL,
	CREATED_DT DATETIME NULL,
	CREATED_BY VARCHAR(20) NULL,
	UPDATED_DT DATETIME NULL,
	UPDATED_BY VARCHAR(20) NULL
)

GO

--------------------------------------------------------------------------------------------------------
CREATE TABLE KY_SALARY_FORMULA_MASTER (
	ID INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
	COMPANY_ID INT NOT NULL ,
	FORMULA_CD VARCHAR(10) NULL,
	FORMULA_NAME NVARCHAR(200) NULL,
	FORMULA_VALUE NVARCHAR(1000) NULL,
	FORMULA_TYPE CHAR(1) NULL,
	EFFECTIVE_DT DATE NOT NULL,
	DELETE_FLAG CHAR(1) NULL,
	CREATED_DT DATETIME NULL,
	CREATED_BY VARCHAR(20) NULL,
	UPDATED_DT DATETIME NULL,
	UPDATED_BY VARCHAR(20) NULL
)

GO

--------------------------------------------------------------------------------------------------------
CREATE TABLE [dbo].[KY_EMPLOYEE_MASTER](
	[ID] [int] IDENTITY(1,1) NOT NULL PRIMARY KEY,
	[COMPANY_ID] [int] NOT NULL,
	[EMPLOYEE_NO] [varchar](10) NOT NULL,
	[EMPLOYEE_NO_PE] [varchar](10) NOT NULL,
	[EMPLOYEE_NAME] [nvarchar](100) NOT NULL,
	[EMPLOYEE_NAME_FULL] [nvarchar](100) NOT NULL,
	[USER_ID] [varchar](20) NULL,
	[PASSWORD] [nvarchar](200) NULL,
	[ADDRESS] [nvarchar](200) NULL,
	[ADDRESS_EFFECTIVE_DT] [date] NULL,
	[WORK_PLACE] [nvarchar](100) NULL,
	[WORK_PLACE_EFFECTIVE_DT] [date] NULL,
	[EMAIL] [nvarchar](100) NULL,
	[EMAIL_EFFECTIVE_DT] [date] NULL,
	[NATIONALITY] [nvarchar](100) NULL,
	[CONTINENTS] [varchar](10) NULL,
	[IDENTITY_PASSPORT] [varchar](20) NULL,
	[PERSONAL_TAX_CODE] [varchar](20) NULL,
	[UNIVERSITY] [nvarchar](100) NULL,
	[QUALIFICATION] [varchar](50) NULL,
	[LEVEL] [varchar](10) NULL,
	[LEVEL_EFFECTIVE_DT] [date] NULL,
	[LEVEL_GROUP] [varchar](10) NULL,
	[LEVEL_GROUP_EFFECTIVE_DT] [date] NULL,
	[PHONE_NO] [varchar](20) NULL,
	[CONTRACT_TYPE] [varchar](20) NULL,
	[CONTRACT_TYPE_EFFECTIVE_DT] [date] NULL,
	[EMERGENCY_PHONE_NO] [varchar](20) NULL,
	[EMPLOYEE_TYPE] [char](2) NOT NULL,
	[EMP_TYPE_EFFECTIVE_DT] [date] NULL,
	[GENDER] [char](1) NULL,
	[BIRTH_DT] [date] NULL,
	[ENTRY_DT] [date] NULL,
	[STANDARD_HOURS] [numeric](3, 1) NOT NULL,
	[STANDARD_HOURS_EFFECTIVE_DT] [date] NULL,
	[QUIT_DT] [date] NULL,
	[CONTRACT_FORM] [varchar](1) NULL,
	[CONTRACT_FORM_EFECTIVE_DT] [date] NULL,
	[PROBATION_END_DT] [date] NULL,
	[EXCHANGE_RATE_SOCIAL_INSU_SAL] [numeric](11, 1) NOT NULL,
	[INSURANCE] [varchar](100) NULL,
	[INSURANCE_EFFECTIVE_DT] [date] NULL,
	[INSURANCE_UNION_MONTH] [date] NULL,
	[INSURANCE_CODE] [varchar](10) NULL,
	[HOSPITAL] [varchar](10) NULL,
	[HOSPITAL_EFECTIVE_DT] [date] NULL,
	[ABSENCE_NOT_PAY_BF] [numeric](3, 0) NULL,
	[ABSENCE_NOT_PAY_AT] [numeric](3, 0) NULL,
	[PIT] [varchar](100) NULL,
	[PIT_EFFECTIVE_DT] [date] NULL,
	[CERTIFICATE_LIST] [nvarchar](200) NULL,
	[LABOUR_UNION_DT] [date] NULL,
	[DELETE_FLAG] [char](1) NULL,
	[CREATED_DT] [datetime] NULL,
	[CREATED_BY] [varchar](20) NULL,
	[UPDATED_DT] [datetime] NULL,
	[UPDATED_BY] [varchar](20) NULL
)

GO

--------------------------------------------------------------------------------------------------------
CREATE TABLE KY_DEPENDENT (
	ID INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
	EMPLOYEE_NO VARCHAR(10) NOT NULL,
	DEPENDENT NVARCHAR(100) NULL,
	BIRTH_DT DATE,
	NUMBER VARCHAR(10) NULL,
	NUMBER_BOOK VARCHAR(10) NULL,
	REGISTER_PLACE NVARCHAR(100) NULL,
	DEPENDENT_TAX_CODE VARCHAR(20) NULL,
	IDENTITY_PASSPORT VARCHAR(20) NULL,
	RELATIONSHIP VARCHAR(50) NULL,
	NATIONALITY VARCHAR(20) NULL,
	FROM_DT DATE,
	TO_DT DATE,
	DELETE_FLAG CHAR(1) NULL,
	CREATED_DT DATETIME NULL,
	CREATED_BY VARCHAR(20) NULL,
	UPDATED_DT DATETIME NULL,
	UPDATED_BY VARCHAR(20) NULL
)

GO
--------------------------------------------------------------------------------------------------------
CREATE TABLE KY_SALARY_MASTER (
	ID INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
	[EMPLOYEE_NO] [varchar](10) NOT NULL,
	[BASIC_SALARY_OFFICAL] [numeric](11, 2) NULL,
	[BASIC_SALARY_PROBATION] [numeric](11, 2) NULL,
	[SALARY_HOUR] [numeric](11, 2) NULL,
	[SALARY_CAL_SOCIAL_INSU] [numeric](11, 2) NULL,
	[BANK_ACCOUNT] [varchar](20) NULL,
	[BANK_NAME] [nvarchar](200) NULL,
	[UNIT] [char](3) NOT NULL,
	[ALLOWANCE_LIST] [nvarchar](200) NULL,
	[OT_TYPE] [char](1) NOT NULL,
	[FORMULA_CD] [varchar](10) NOT NULL,
	[EFFECTIVE_DT] [date] NOT NULL,
	[DELETE_FLAG] [char](1) NULL,
	[CREATED_DT] [datetime] NULL,
	[CREATED_BY] [varchar](20) NULL,
	[UPDATED_DT] [datetime] NULL,
	[UPDATED_BY] [varchar](20) NULL,
	[MAIN_ID] [int] NULL,
	[HISTORY_NO] [int] NULL,
	[EXCHANGE_RATE_SOCIAL_INSU_SAL] [numeric](7, 0) NULL,
	[PRODUCT_SALARY] [varchar](1) NULL,
	[SALARY_UNIT] [varchar](3) NULL
)

GO

--------------------------------------------------------------------------------------------------------
CREATE TABLE KY_CERTIFICATE (
	ID INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
	EMPLOYEE_NO VARCHAR(10) NOT NULL,
	CERTIFICATE_NO VARCHAR(10) NOT NULL,
	CERTIFICATE_NAME NVARCHAR(200) NOT NULL,
	DATE DATE,
	CREATED_DT DATETIME NULL,
	CREATED_BY VARCHAR(20) NULL,
	UPDATED_DT DATETIME NULL,
	UPDATED_BY VARCHAR(20) NULL,
	CONSTRAINT UNIQUE_CERTIFICATE UNIQUE (EMPLOYEE_NO)
)

GO
--------------------------------------------------------------------------------------------------------
CREATE TABLE KY_LONGTERM_ABSENCE (
	ID INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
	EMPLOYEE_NO VARCHAR(10) NOT NULL,
	ABSENCE_NO VARCHAR(10) NOT NULL,
	FROM_DT DATE,
	TO_DT DATE,
	START_WORK_DT DATE,
	DELETE_FLAG CHAR(1) NULL,
	CREATED_DT DATETIME NULL,
	CREATED_BY VARCHAR(20) NULL,
	UPDATED_DT DATETIME NULL,
	UPDATED_BY VARCHAR(20) NULL
	
)

GO
--------------------------------------------------------------------------------------------------------
CREATE TABLE KY_SALARY_RESULT (
	[ID] [int] IDENTITY(1,1) NOT NULL PRIMARY KEY,
	[COMPANY_ID] [int] NOT NULL,
	[DEPT_CD] [varchar](20) NULL,
	[EMPLOYEE_NO] [varchar](10) NOT NULL,
	[YEAR_MONTH] [varchar](6) NOT NULL,
	[HISTORY_NO] [numeric](1, 0) NULL,
	[YEAR_MONTH_RECEIVE] [varchar](6) NOT NULL,
	[DATE_FROM] [date] NULL,
	[DATE_TO] [date] NULL,
	[PROBATION_SALARY] [numeric](11, 2) NULL,
	[OFFICAL_SALARY] [numeric](11, 2) NULL,
	[SALARY_UNIT] [varchar](3) NULL,
	[SALARY_ALLOWANCE_PIT] [numeric](11, 1) NULL,
	[HOURLY_PRICE_PROB] [numeric](8, 1) NULL,
	[HOURLY_PRICE_OFFI] [numeric](8, 1) NULL,
	[AMOUNT_DEDUCTED_PROB] [numeric](11, 1) NULL,
	[AMOUNT_DEDUCTED_OFFI] [numeric](11, 1) NULL,
	[AMOUNT_DEDUCTED_SUMARY] [numeric](11, 1) NULL,
	[OT_SUMARY] [numeric](11, 1) NULL,
	[TOTAL_AMOUNT] [numeric](11, 1) NULL,
	[MEMBER_FEE] [numeric](8, 0) NULL,
	[STATUS] [varchar](50) NULL,
	[LATE_NIGHT_ALLOWANCE_PROB] [numeric](11, 1) NULL,
	[LATE_NIGHT_ALLOWANCE_OFFI] [numeric](11, 1) NULL,
	[SOCIAL_INSU_AMOUNT] [numeric](10, 0) NULL,
	[HEALTH_INSU_AMOUNT] [numeric](10, 0) NULL,
	[UMEMPLOYEE_INSU_AMOUNT] [numeric](10, 0) NULL,
	[INCOME_BEFORE_TAX] [numeric](11, 1) NULL,
	[OT_NOT_PIT] [numeric](11, 1) NULL,
	[FAMILY_ALLOWANCES] [numeric](10, 0) NULL,
	[TAX_INCOME] [numeric](11, 1) NULL,
	[CAL_TAX_INCOME] [numeric](11, 1) NULL,
	[PIT] [numeric](11, 1) NULL,
	[NOT_INCLUDED_TAX_INCOME] [numeric](11, 1) NULL,
	[TOTAL_PAY] [numeric](11, 1) NULL,
	[APP_FLG] [char](1) NULL,
	[SEVERANCE_ALLOWANCE] [numeric](11, 1) NULL,
	[START_DT_CAL_SAL] [date] NULL,
	[END_DT_CAL_SAL] [date] NULL,
	[OT_ALLOWANCE] [numeric](11, 1) NULL,
	[OTHER] [numeric](11, 2) NULL,
	[OTHER_UNIT] [varchar](3) NULL,
	[OTHER_REMARK] [nvarchar](210) NULL,
	[SABBTICAL_100] [numeric](2, 0) NULL,
	[SABBTICAL_300] [numeric](2, 0) NULL,
	[AMOUNT_SABBTICAL_100] [numeric](11, 1) NULL,
	[AMOUNT_SABBTICAL_300] [numeric](11, 1) NULL,
	[CREATED_DT] [datetime] NULL,
	[CREATED_BY] [varchar](20) NULL,
	[UPDATED_DT] [datetime] NULL,
	[UPDATED_BY] [varchar](20) NULL
)

GO
--------------------------------------------------------------------------------------------------------
CREATE TABLE KY_OTHER_PAY (
	ID INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
	SALARY_RESULT_ID INT NOT NULL,
	PAY_TYPE CHAR(1) NOT NULL,
	PAY_DESC NVARCHAR(200) NOT NULL,
	VALUE NUMERIC(11, 1) NOT NULL,
	UNIT CHAR(1) NOT NULL,
	YEAR_MONTH VARCHAR(6) NOT NULL,
	ARREA_YEAR_MONTH VARCHAR(6) NULL,
	REMARK NVARCHAR(200) NULL,
	ALLOWED_CASE VARCHAR(10) NULL,
	DELETE_FLAG CHAR(1) NULL,
	DISTRIBUTION_FLAG CHAR(1) NULL,
	NUMBER_MONTHS NUMERIC(2, 0) NULL,
	CREATED_DT DATETIME NULL,
	CREATED_BY VARCHAR(20) NULL,
	UPDATED_DT DATETIME NULL,
	UPDATED_BY VARCHAR(20) NULL
	
)

GO

--------------------------------------------------------------------------------------------------------
CREATE TABLE KY_WORKINGTIME_TOTAL (
	ID INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
	EMPLOYEE_NO VARCHAR(10) NOT NULL,
	YEAR_MONTH VARCHAR(6) NOT NULL,
	FROM_DATE VARCHAR(10) NOT NULL,
	TO_DATE VARCHAR(10) NOT NULL,
	DEPT_CD VARCHAR(10) NOT NULL,
	STD_WORK_HOUR NUMERIC(3,1) NOT NULL,
	PROB_DAYS NUMERIC(2,0) NOT NULL,
	OFFI_DAYS NUMERIC(2,0) NOT NULL,
	WORKING_TIME NUMERIC(5,2) NOT NULL,
	ABSENCE NUMERIC(5,2) NOT NULL,
	PROB_ABSENCE NUMERIC(5,2) NOT NULL,
	CREATED_DT DATETIME NULL,
	CREATED_BY VARCHAR(20) NULL,
	UPDATED_DT DATETIME NULL,
	UPDATED_BY VARCHAR(20) NULL,
	CONSTRAINT UNIQUE_WORKINGTIME_TOTAL UNIQUE (EMPLOYEE_NO, YEAR_MONTH, FROM_DATE, DEPT_CD)
)

GO

--------------------------------------------------------------------------------------------------------
CREATE TABLE KY_OVERTIME_TOTAL (
	ID INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
	WORKING_TIME_ID INT NOT NULL,
	OT_HOURS_PROB NUMERIC(5,2) NOT NULL,
	OT_HOURS_OFFI NUMERIC(5,2) NOT NULL,
	OT_TYPE INT NOT NULL,
	CREATED_DT DATETIME NULL,
	CREATED_BY VARCHAR(20) NULL,
	UPDATED_DT DATETIME NULL,
	UPDATED_BY VARCHAR(20) NULL
	
)

GO

--------------------------------------------------------------------------------------------------------
CREATE TABLE KY_ALLOWANCE_RESULT (
	ID INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
	EMPLOYEE_NO VARCHAR(10) NOT NULL,
	ALLOWANCE_CD  VARCHAR(10) NOT NULL,
	YEAR_MONTH  VARCHAR(6) NOT NULL,
	ALLOWANCE_PROB NUMERIC(11,1) NULL,
	ALLOWANCE_OFFI NUMERIC(11,1) NULL,
	TYPE_FLG CHAR(1) NULL,
	CREATED_DT DATETIME NULL,
	CREATED_BY VARCHAR(20) NULL,
	UPDATED_DT DATETIME NULL,
	UPDATED_BY VARCHAR(20) NULL,
	CONSTRAINT UNIQUE_ALLOWANCE_RESULT UNIQUE (EMPLOYEE_NO, ALLOWANCE_CD, YEAR_MONTH, TYPE_FLG)
)

GO

--------------------------------------------------------------------------------------------------------
CREATE TABLE KY_CLOSING_DATE (
	ID INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
	COMPANY_ID INT NOT NULL,
	YEAR_MONTH VARCHAR(6) NOT NULL,
	CLOSING_DATE DATETIME NULL,
	CREATED_DT DATETIME NULL,
	CREATED_BY VARCHAR(20) NULL,
	UPDATED_DT DATETIME NULL,
	UPDATED_BY VARCHAR(20) NULL,
	CONSTRAINT UNIQUE_CLOSING_DATE UNIQUE (COMPANY_ID, YEAR_MONTH)
)

GO

--------------------------------------------------------------------------------------------------------
CREATE TABLE KY_AUTHORITY (
	ID INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
	EMPLOYEE_NO VARCHAR(10) NOT NULL,
	SCREEN_ACCESSES NVARCHAR(1000) NULL,
	CREATED_DT DATETIME NULL,
	CREATED_BY VARCHAR(20) NULL,
	UPDATED_DT DATETIME NULL,
	UPDATED_BY VARCHAR(20) NULL,
	CONSTRAINT UNIQUE_AUTHORITY UNIQUE (EMPLOYEE_NO)
)

GO

--------------------------------------------------------------------------------------------------------
CREATE TABLE KY_RATE (
	[ID] INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
	[MAIN_ID] [int] NULL,
	[HISTORY_NO] [int] NULL,
	[COMPANY_ID] [int] NOT NULL,
	[EXCHANGE_RATE] [numeric](7, 0) NOT NULL,
	[EFFECTIVE_DT] [date] NOT NULL,
	[RATE_TYPE] [varchar](3) NOT NULL,
	[CREATED_DT] [datetime] NULL,
	[CREATED_BY] [varchar](20) NULL,
	[UPDATED_DT] [datetime] NULL,
	[UPDATED_BY] [varchar](20) NULL
)

GO
--------------------------------------------------------------------------------------------------------
CREATE TABLE KY_SALARY_ARREAR_DISTRIBUTION (
	ID INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
	EMPLOYEE_NO VARCHAR(10) NOT NULL,
	YEAR_MONTH VARCHAR(6) NOT NULL,
	INCOME NUMERIC(11, 1) NOT NULL,
	DISTRIBUTION_AMOUNT NUMERIC(11, 1) NOT NULL,
	DISTRIBUTION_MONTH NUMERIC(2, 0) NOT NULL,
	REST_AMOUNT NUMERIC(11, 1) NOT NULL,
	NUMBER_MONTHS NUMERIC(2, 0) NOT NULL,
	CREATED_DT DATETIME NULL,
	CREATED_BY VARCHAR(20) NULL,
	UPDATED_DT DATETIME NULL,
	UPDATED_BY VARCHAR(20) NULL,
	CONSTRAINT UNIQUE_SALARY_ARREAR_DISTRIBUTION UNIQUE (EMPLOYEE_NO)
)

GO

--------------------------------------------------------------------------------------------------------
CREATE TABLE TB_R_WORKING_TIME_HIS(
	ID INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
	WORKING_TIME_CD INT NOT NULL,
	COMPANY_CD VARCHAR(20) NOT NULL,
	EMPLOYEE_NO VARCHAR(4) NOT NULL,
	REVISION NUMERIC(2, 0) NOT NULL,
	DEPT_CD VARCHAR(20) NOT NULL,
	WORKING_TITLE VARCHAR(5) NOT NULL,
	WORKING_DATE DATE NOT NULL,
	ACT_IN_TIME VARCHAR(4) NULL,
	ACT_OUT_TIME VARCHAR(4) NULL,
	WORKING_TIME NUMERIC(4, 2) NULL,
	ABSENCE_TIME NUMERIC(4, 2) NULL,
	TOTAL_OT_TIME NUMERIC(4, 2) NULL,
	LATE_OT_TIME NUMERIC(4, 2) NULL,
	TOTAL_LATE_TIME NUMERIC(4, 2) NULL,
	DEDUCTED_UNPAID NUMERIC(4, 2) NULL,
	DEDUCTED_PAID NUMERIC(4, 2) NULL,
	ATTENDANCE_TYPE CHAR(1) NULL,
	WORKING_TYPE CHAR(1) NULL,
	SPECIAL_TYPE VARCHAR(10) NULL,
	REMARK NVARCHAR(200) NULL,
	DEDUCTED_NON_WORK_PLAN NUMERIC(4, 2) NULL,
	DEDUCTED_NON_WORK_ACTUAL NUMERIC(4, 2) NULL,
	MAIN_SHIFT CHAR(1) NULL,
	CURRENT_SHIFT CHAR(1) NULL,
	STD_IN_TIME VARCHAR(5) NULL,
	STD_OUT_TIME VARCHAR(5) NULL,
	STD_WORK_HOUR NUMERIC(4, 2) NULL,
	STATUS CHAR(1) NULL,
	CONFIRMED_BY VARCHAR(20) NULL,
	WITHDRAWN_BY VARCHAR(20) NULL,
	CREATED_DT DATE NULL,
	CONFIRMED_DT DATE NULL,
	WITHDRAWN_DT DATE NULL,
	UPDATED_DT DATE NULL,
	CONSTRAINT UNIQUE_WORKING_TIME_HIS UNIQUE (COMPANY_CD, EMPLOYEE_NO, REVISION, WORKING_DATE)
)

--------------------------------------------------------------------------------------------------------
CREATE TABLE KY_QUANTITY_PRODUCT(
	ID INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
	COMPANY_CD VARCHAR(20) NOT NULL,
	EMPLOYEE_NO VARCHAR(10) NOT NULL,
	PRODUCT_TYPE VARCHAR(3) NULL,
	QUANTITY NUMERIC(4, 0) NULL,
	YEAR_MONTH VARCHAR(6) NOT NULL,
	CREATED_DT DATETIME NULL,
	CREATED_BY VARCHAR(20) NULL,
	UPDATED_DT DATETIME NULL,
	UPDATED_BY VARCHAR(20) NULL
)
-- =============================================MODIFY STRUCTURE=============================================

USE [KyuyoSystem]
GO

--------------------------------------------------------------------------------------------------------
-- =============================================
--Author: SonVH
--Create date: 02-Nov-2016
--Description: Drop Table
-- =============================================
/****** Object:  Table [dbo].[KY_CERTIFICATE]    Script Date: 11/2/2016 9:05:20 AM ******/

IF OBJECT_ID('dbo.KY_CERTIFICATE', 'U') IS NOT NULL
DROP TABLE [dbo].[KY_CERTIFICATE];

/****** Object:  Table [dbo].[KY_SPECIAL_INSURANCE_MASTER]    Script Date: 11/2/2016 9:11:43 AM ******/
IF OBJECT_ID('dbo.KY_SPECIAL_INSURANCE_MASTER', 'U') IS NOT NULL
DROP TABLE [dbo].[KY_SPECIAL_INSURANCE_MASTER];

-- =============================================
--Author: SonVH
--Create date: 02-Nov-2016
--Description: Change type column from date to varchar(6)
-- =============================================
ALTER TABLE KY_DEPENDENT
DROP COLUMN REGISTER_PLACE;

ALTER TABLE KY_DEPENDENT
ADD REG_COUNTRY VARCHAR(20) NULL;

ALTER TABLE KY_DEPENDENT
ADD REG_CITY VARCHAR(20) NULL;

ALTER TABLE KY_DEPENDENT
ADD REG_DISTRICT VARCHAR(20) NULL;

ALTER TABLE KY_DEPENDENT
ADD REG_WARD VARCHAR(20) NULL;

EXEC  sp_rename 'KY_DEPENDENT.FROM_DT', 'FROM_MONTH', 'COLUMN';
EXEC  sp_rename 'KY_DEPENDENT.TO_DT', 'TO_MONTH', 'COLUMN';

ALTER TABLE KY_DEPENDENT
ALTER COLUMN FROM_MONTH VARCHAR(6) NULL;

ALTER TABLE KY_DEPENDENT
ALTER COLUMN TO_MONTH VARCHAR(6) NULL;

-- =============================================
--Author: SonVH
--Create date: 02-Nov-2016
--Description: Add column EmployeeNo
-- =============================================
ALTER TABLE KY_OTHER_PAY
DROP COLUMN SALARY_RESULT_ID;

ALTER TABLE KY_OTHER_PAY
ADD EMPLOYEE_NO VARCHAR(10) NOT NULL;

ALTER TABLE KY_OTHER_PAY
DROP COLUMN REMARK;

ALTER TABLE KY_OTHER_PAY
DROP COLUMN ALLOWED_CASE;

EXEC  sp_rename 'KY_OTHER_PAY.NUMBER_MONTHS', 'DISTRIBUTION_MONTHS', 'COLUMN';

-- =============================================
--Author: SonVH
--Create date: 11-Nov-2016
--Description: Drop column DEPT_NAME
-- =============================================
ALTER TABLE TB_M_EMP_DEPT
DROP COLUMN DEPT_NAME;

-- =============================================
--Author: SonVH
--Create date: 11-Nov-2016
--Description: Add column YEAR_MONTH
-- =============================================
ALTER TABLE TB_R_WORKING_TIME_HIS
ADD YEAR_MONTH VARCHAR(6) NOT NULL;

ALTER TABLE TB_R_WORKING_TIME_HIS
DROP COLUMN STATUS;

-- =============================================
--Author: SonVH	
--Create date: 17-Nov-2016
--Description: Add MAIN_ID AND HISTORY_NO
-- =============================================
ALTER TABLE KY_POLICY_MASTER
ADD MAIN_ID INT NULL;

ALTER TABLE KY_POLICY_MASTER
ADD HISTORY_NO INT NULL;

ALTER TABLE KY_ALLOWANCE_MASTER
ADD MAIN_ID INT NULL;

ALTER TABLE KY_ALLOWANCE_MASTER
ADD HISTORY_NO INT NULL;

ALTER TABLE KY_SALARY_FORMULA_MASTER
ADD MAIN_ID INT NULL;

ALTER TABLE KY_SALARY_FORMULA_MASTER
ADD HISTORY_NO INT NULL;

ALTER TABLE KY_LONGTERM_ABSENCE
ADD MAIN_ID INT NULL;

ALTER TABLE KY_LONGTERM_ABSENCE
ADD HISTORY_NO INT NULL;

-- =============================================
--Author: SonVH
--Create date: 21-Nov-2016
--Description: Change type column 
-- =============================================
EXEC  sp_rename 'KY_SALARY_MASTER.FORMULA_ID', 'FORMULA_CD', 'COLUMN';

ALTER TABLE KY_SALARY_MASTER
ALTER COLUMN FORMULA_CD VARCHAR(10) NOT NULL;