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
--Author: Thanhtv
--Create date: 2016/11/08
--Description: Rename column USER_CD
-- =============================================

ALTER TABLE [dbo].[KY_EMPLOYEE_MASTER] DROP CONSTRAINT [UNIQUE_EMPLOYEE_MASTER]
GO

EXEC  sp_rename 'KY_EMPLOYEE_MASTER.USER_CD', 'USER_ID', 'COLUMN';

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
--Create date: 15-Nov-2016
--Description: Modify datatype
-- =============================================
ALTER TABLE KY_ALLOWANCE_MASTER
ALTER COLUMN UNIT VARCHAR(3) NOT NULL;

-- =============================================
--Author: SonVH
--Create date: 15-Nov-2016
--Description: Modify datatype
-- =============================================
ALTER TABLE KY_OTHER_PAY
ALTER COLUMN UNIT VARCHAR(3) NOT NULL;

-- =============================================
--Author: SonVH
--Create date: 15-Nov-2016
--Description: Modify datatype
-- =============================================
ALTER TABLE KY_SALARY_MASTER
ADD PRODUCT_SALARY VARCHAR(1) NULL;

ALTER TABLE KY_SALARY_MASTER
DROP COLUMN APP_FLG;

-- =============================================
--Author: SonVH
--Create date: 16-Nov-2016
--Description: Modify NOT NULL
-- =============================================
ALTER TABLE TB_R_WORKING_TIME
ALTER COLUMN REVISION  NUMERIC(2, 0) NULL;

ALTER TABLE TB_R_WORKING_TIME
ALTER COLUMN DEPT_CD VARCHAR(20) NULL;

ALTER TABLE TB_R_WORKING_TIME
ALTER COLUMN WORKING_TITLE VARCHAR(5) NULL;

-- =============================================
--Author: Tongnd	
--Create date: 16-Nov-2016
--Description: Add MAIN_ID AND HISTORY_NO
-- =============================================
ALTER TABLE KY_DEPENDENT
ADD MAIN_ID int NULL;

ALTER TABLE KY_DEPENDENT
ADD HISTORY_NO int NULL;


-- =============================================
--Author: Thanhtv	
--Create date: 16-Nov-2016
--Description: alter ACT_IN_TIME, ACT_OUT_TIME (datetime -> VARCHAR(4))
-- =============================================
ALTER TABLE TB_R_WORKING_TIME
ALTER COLUMN ACT_IN_TIME VARCHAR(4) NULL;

ALTER TABLE TB_R_WORKING_TIME
ALTER COLUMN ACT_OUT_TIME VARCHAR(4) NULL;

ALTER TABLE TB_R_WORKING_TIME_HIS
ALTER COLUMN ACT_IN_TIME VARCHAR(4) NULL;

ALTER TABLE TB_R_WORKING_TIME_HIS
ALTER COLUMN ACT_OUT_TIME VARCHAR(4) NULL;


-- =============================================
--Author: Thanhtv
--Create date: 15-Nov-2016
--Description: Modify KY_SALARY_MASTER
-- =============================================
ALTER TABLE KY_SALARY_MASTER
ADD MAIN_ID INT NULL;

ALTER TABLE KY_SALARY_MASTER
ADD HISTORY_NO INT NULL;

ALTER TABLE KY_SALARY_MASTER
ADD EXCHANGE_RATE_SOCIAL_INSU_SAL NUMERIC(7, 0) NULL;

ALTER TABLE KY_SALARY_MASTER
ALTER COLUMN BASIC_SALARY_OFFICAL NUMERIC(11, 2) NOT NULL;

ALTER TABLE KY_SALARY_MASTER
ALTER COLUMN BASIC_SALARY_PROBATION NUMERIC(11, 2) NULL;

ALTER TABLE KY_SALARY_MASTER
ALTER COLUMN SALARY_HOUR NUMERIC(11, 2) NULL;

ALTER TABLE KY_SALARY_MASTER
ALTER COLUMN SALARY_CAL_SOCIAL_INSU NUMERIC(11, 2) NULL;

ALTER TABLE KY_SALARY_MASTER
ALTER COLUMN UNIT CHAR(3) NOT NULL;

ALTER TABLE KY_SALARY_MASTER
ALTER COLUMN ALLOWANCE_LIST NVARCHAR(200) NULL;

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

-- =============================================
--Author: Thanhtv
--Create date: 22-Nov-2016
--Description: Change type column 
-- =============================================

ALTER TABLE KY_SALARY_MASTER
ALTER COLUMN BASIC_SALARY_OFFICAL NUMERIC(11, 2) NULL;

-- =============================================
--Author: SonVH
--Create date: 01-Dec-2016
--Description: Change type column 
-- =============================================

ALTER TABLE KY_SALARY_FORMULA_MASTER
ALTER COLUMN FORMULA_CD VARCHAR(15) NULL;

ALTER TABLE KY_SALARY_MASTER
ALTER COLUMN BASIC_SALARY_OFFICAL NUMERIC(11, 2) NULL;

ALTER TABLE KY_OTHER_PAY
ADD VND_VALUE NUMERIC(11, 2) NOT NULL DEFAULT(0);

ALTER TABLE TB_R_WORKING_TIME_HIS
ALTER COLUMN EMPLOYEE_NO VARCHAR(10) NOT NULL;

ALTER TABLE KY_WORKINGTIME_TOTAL
DROP COLUMN DEPT_CD;

ALTER TABLE KY_SALARY_RESULT
ADD COMPANY_ID INT NOT NULL;

ALTER TABLE KY_SALARY_RESULT
ADD DEPT_CD VARCHAR(20) NULL;

ALTER TABLE KY_SALARY_RESULT
ADD YEAR_MONTH_RECEIVE 	VARCHAR(6) NOT NULL;

ALTER TABLE KY_SALARY_RESULT					
ADD DATE_FROM DATE NULL;

ALTER TABLE KY_SALARY_RESULT					
ADD DATE_TO	DATE NULL;

ALTER TABLE KY_SALARY_RESULT	
ADD SALARY_UNIT VARCHAR(3) NULL;

ALTER TABLE KY_SALARY_RESULT
DROP COLUMN NUM_DAYS_ALLOWED_100;		

ALTER TABLE KY_SALARY_RESULT
DROP COLUMN NUM_DAYS_ALLOWED_200;

ALTER TABLE KY_SALARY_RESULT
DROP COLUMN YEARS_OF_SEVERANCE_ALLOWANCE;

ALTER TABLE KY_SALARY_RESULT
DROP COLUMN SITUATION_SEVERANCE_ALLOWANCE;	

ALTER TABLE KY_SALARY_RESULT	
ADD OTHER NUMERIC(11, 2) NULL;

ALTER TABLE KY_SALARY_RESULT	
ADD OTHER_UNIT VARCHAR(3) NULL;

ALTER TABLE KY_SALARY_RESULT	
ADD OTHER_REMARK NVARCHAR(210) NULL;

ALTER TABLE KY_RATE	
ADD MAIN_ID INT NULL;

ALTER TABLE KY_RATE	
ADD	HISTORY_NO INT NULL;

EXEC  sp_rename 'KY_RATE.EXCHANGE_RATE_BASIC_SAL', 'EXCHANGE_RATE', 'COLUMN';
EXEC  sp_rename 'KY_RATE.EFFECTIVE_DT_EXCHANGE_RATE_BASIC_SAL', 'EFFECTIVE_DT', 'COLUMN';

ALTER TABLE KY_RATE
DROP COLUMN EXCHANGE_RATE_JPY;

ALTER TABLE KY_RATE
DROP COLUMN EFFECTIVE_DT_EXCHANGE_RATE_JPY;

ALTER TABLE KY_RATE	
ADD	RATE_TYPE VARCHAR(3) NULL;

-- =============================================
--Author: SonVH
--Create date: 02-Dec-2016
--Description: Change type column 
-- =============================================
ALTER TABLE KY_OTHER_PAY
ALTER COLUMN VND_VALUE NUMERIC(11, 2) NULL;


-- =============================================
--Author: Thanhtv
--Create date: 06-Dec-2016
--Description: Change type column 
-- =============================================
ALTER TABLE KY_SALARY_MASTER
DROP COLUMN SALARY_TYPE;

ALTER TABLE KY_SALARY_MASTER
ADD	SALARY_UNIT VARCHAR(3) NULL;