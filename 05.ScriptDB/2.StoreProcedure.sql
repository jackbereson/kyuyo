USE [KyuyoSystem]
GO
-- =============================================FUNCTION=============================================
-- =============================================
-- Author: SonVH
-- Create date: 12-October-2016
-- Description:	Split string function
-- =============================================
IF EXISTS (SELECT * FROM sys.objects WHERE type = 'TF' AND OBJECT_ID = OBJECT_ID('dbo.STRING_SPLIT'))
DROP FUNCTION [dbo].[STRING_SPLIT]
GO

SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE FUNCTION [dbo].[STRING_SPLIT] 
        (    
           @Input NVARCHAR(MAX),
           @Character CHAR(1)
          )
            RETURNS @Output TABLE (
            Item NVARCHAR(1000)
          )
        AS
        BEGIN

      DECLARE @StartIndex INT, @EndIndex INT
      SET @StartIndex = 1
      IF SUBSTRING(@Input, LEN(@Input) - 1, LEN(@Input)) <> @Character
      BEGIN
            SET @Input = @Input + @Character
      END

      WHILE CHARINDEX(@Character, @Input) > 0
      BEGIN
            SET @EndIndex = CHARINDEX(@Character, @Input)

            INSERT INTO @Output(Item)
            SELECT SUBSTRING(@Input, @StartIndex, @EndIndex - 1)

            SET @Input = SUBSTRING(@Input, @EndIndex + 1, LEN(@Input))
      END

      RETURN
END
GO


-- =============================================STORE PROCEDURE=============================================
-- =============================================
-- Author:		thanthv
-- Create date: 20160929
-- Description:	GetAuthorityMenu
-- =============================================

IF EXISTS (SELECT * FROM sys.objects WHERE type = 'P' AND OBJECT_ID = OBJECT_ID('dbo.GetAuthorityMenu'))
DROP PROCEDURE [dbo].[GetAuthorityMenu]
GO

SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[GetAuthorityMenu]
	-- Add the parameters for the stored procedure here
	@EmployeeNo varchar(max) = null
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	SELECT 
		S.CD AS ScreenId,
		S.REMARK AS ScreenName,
		S.CHAR_VALUE_1 AS Url,
		A.SCREEN_ACCESSES AS AccessLevel,
	    CAST (S.NUM_VALUE_1 AS INT) AS AllowView,
		CAST (S.NUM_VALUE_3 AS INT) AS [Type],
		S.CHAR_VALUE_3 AS ShowFlag
	FROM 
		dbo.TB_M_SYSTEM S,
		dbo.KY_AUTHORITY A
	WHERE 
		
		S.CATEGORY = 'SCREEN_ID'
	AND A.EMPLOYEE_NO = @EmployeeNo
	AND A.SCREEN_ACCESSES like '%' +S.CD + '%'
	AND S.ACTIVE_FLAG = '1'
	
	ORDER BY S.LIST_ORDER

END
GO
/****** Object:  StoredProcedure [dbo].[GetEmployeeAuthority]    Script Date: 2016/10/11 11:32:03 AM ******/
IF EXISTS (SELECT * FROM sys.objects WHERE type = 'P' AND OBJECT_ID = OBJECT_ID('dbo.GetEmployeeAuthority'))
DROP PROCEDURE [dbo].[GetEmployeeAuthority]
GO

SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[GetEmployeeAuthority]
	-- Add the parameters for the stored procedure here
	@CompanyId int
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	SELECT 
		B.ID AS Id
	   ,A.EMPLOYEE_NO AS EmployeeNo
	   ,A.EMPLOYEE_NAME AS EmployeeName
	   ,B.SCREEN_ACCESSES AS ScreenAccess
	   ,B.UPDATED_DT AS UpdatedDt
	FROM
		KY_EMPLOYEE_MASTER A
	   ,KY_AUTHORITY B
	WHERE
		A.EMPLOYEE_NO =	B.EMPLOYEE_NO
	AND A.COMPANY_ID = @CompanyId
	AND A.UPDATED_DT = ( SELECT MAX(C.UPDATED_DT) 
						 FROM KY_EMPLOYEE_MASTER C 
						 WHERE 
							 C.EMPLOYEE_NO = A.EMPLOYEE_NO
						 AND C.COMPANY_ID = @CompanyId
						 AND C.DELETE_FLAG = '0')
	AND A.DELETE_FLAG = '0'


END


GO
/****** Object:  StoredProcedure [dbo].[SearchEmployee]    Script Date: 2016/10/11 11:32:03 AM ******/
IF EXISTS (SELECT * FROM sys.objects WHERE type = 'P' AND OBJECT_ID = OBJECT_ID('dbo.SearchEmployee'))
DROP PROCEDURE [dbo].[SearchEmployee]
GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		thanhtv
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[SearchEmployee] 
	-- Add the parameters for the stored procedure here
	@CompanyId int,
	@DeptCd varchar(MAX) = null,
	@EmployeeNo varchar(MAX) = null,
	@EmployeeName nvarchar(MAX) = null,
	@IncludeQuitFlag char(1) = '0',
	@EffectiveDtFrom date = null,
	@EffectiveDtTo date = null
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    SELECT
		A.ID AS Id,
		A.COMPANY_ID AS CompanyId,
		A.EMPLOYEE_NO AS EmployeeNo,
		A.EMPLOYEE_NO_PE AS EmployeeNoPE,
		A.EMPLOYEE_NAME AS EmployeeName,
		A.EMPLOYEE_NAME_FULL AS EmployeeNameFull,
		A.USER_ID AS UserId,
		A.GENDER AS Gender,
		A.EMPLOYEE_TYPE AS EmployeeType,
		C.REMARK AS EmployeeTypeName,
		A.BIRTH_DT AS BirthDt,
		A.EMAIL AS Email,
		A.[ADDRESS] AS [Address],
		A.WORK_PLACE AS WorkPlace,
		A.NATIONALITY AS Nationality,
		A.CONTINENTS AS Continents,
		A.IDENTITY_PASSPORT AS IdentityPassport,
		A.PERSONAL_TAX_CODE AS PersonalTaxCode,
		A.UNIVERSITY AS University,
		A.QUALIFICATION AS Qualification,
		A.[LEVEL] AS [Level],
		A.LEVEL_GROUP As LevelGroup,
		A.ENTRY_DT AS EntryDt,
		A.PROBATION_END_DT AS ProbationEndDt,
		A.LABOUR_UNION_DT AS LabourUnionDt,
		A.QUIT_DT AS QuitDt,
		A.CONTRACT_FORM AS ContractForm,
		A.CONTRACT_TYPE AS ContractType,
		A.PHONE_NO AS PhoneNo,
		A.EMERGENCY_PHONE_NO AS EmergencyPhoneNo,
		A.STANDARD_HOURS AS StandardHours,
		A.INSURANCE_UNION_MONTH AS InsuranceUnionMonth,
		A.INSURANCE_CODE AS InsuaranceCode,
		A.HOSPITAL AS Hospital,
		A.INSURANCE AS Insurance,
		A.PIT AS PIT,
		A.ABSENCE_NOT_PAY_BF AS AbsenceNotPayBf,
		A.ABSENCE_NOT_PAY_AT AS AbsenceNotPayAt,
		A.CERTIFICATE_LIST AS CertificateList,
		A.DELETE_FLAG AS DeleteFlag,
		A.UPDATED_DT AS UpdatedDt,
		--B.DEPT_NAME AS DeptName,
		A.EMP_TYPE_EFFECTIVE_DT AS EmpTypeEffectiveDt,
		A.EMAIL_EFFECTIVE_DT AS EmailEffectiveDt,
		A.ADDRESS_EFFECTIVE_DT AS AddressEffectiveDt,
		A.WORK_PLACE_EFFECTIVE_DT AS WorkPlaceEffectiveDt,
		A.LEVEL_EFFECTIVE_DT AS LevelEffctiveDt,
		A.LEVEL_GROUP_EFFECTIVE_DT AS LevelGroupEffectiveDt,
		A.CONTRACT_FORM_EFECTIVE_DT AS ContractFormEffectiveDt,
		A.CONTRACT_TYPE_EFFECTIVE_DT AS ContractTypeEffectiveDt,
		A.STANDARD_HOURS_EFFECTIVE_DT AS StandardHoursEffeciveDt,
		A.HOSPITAL_EFECTIVE_DT AS HospitalEffectiveDt,
		A.INSURANCE_EFFECTIVE_DT AS InsuranceEffectiveDt,
		A.PIT_EFFECTIVE_DT AS PITEffectiveDt
	FROM 
		KY_EMPLOYEE_MASTER A,
		TB_M_EMP_DEPT B,
		TB_M_SYSTEM C
	WHERE 

		A.EMPLOYEE_NO				=	B.EMPLOYEE_NO
	AND	B.MAIN_FLAG					=	'1'
	AND (B.INACTIVE_DT					IS NULL 
	  OR B.INACTIVE_DT				>	CONVERT(DATE, GETDATE()))
	AND C.COMPANY_CD				=	B.COMPANY_CD
	AND C.CATEGORY					=	'EMPLOYEE_TYPE'
	AND C.CD						=	A.EMPLOYEE_TYPE
	AND A.COMPANY_ID				=	@CompanyId
	AND (B.DEPT_CD					=	@DeptCd OR @DeptCd IS NULL)
	AND (A.QUIT_DT						IS NULL OR @IncludeQuitFlag = '1')
	AND (A.EMPLOYEE_NO					LIKE '%' + @EmployeeNo + '%' 
	  OR A.EMPLOYEE_NO_PE				LIKE '%' + @EmployeeNo + '%'
	  OR @EmployeeNo					IS NULL)
	AND (A.EMPLOYEE_NAME				LIKE '%' + @EmployeeName + '%' OR @EmployeeName IS NULL)
	AND (@EffectiveDtFrom IS NULL
	  OR A.EMP_TYPE_EFFECTIVE_DT		>=	@EffectiveDtFrom
	  OR A.EMAIL_EFFECTIVE_DT			>=	@EffectiveDtFrom
	  OR A.ADDRESS_EFFECTIVE_DT			>=	@EffectiveDtFrom
	  OR A.WORK_PLACE_EFFECTIVE_DT		>=	@EffectiveDtFrom
	  OR A.LEVEL_EFFECTIVE_DT			>=	@EffectiveDtFrom
	  OR A.LEVEL_GROUP_EFFECTIVE_DT		>=	@EffectiveDtFrom													
	  OR A.CONTRACT_FORM_EFECTIVE_DT	>=  @EffectiveDtFrom												
	  OR A.CONTRACT_TYPE_EFFECTIVE_DT	>=	@EffectiveDtFrom
	  OR A.STANDARD_HOURS_EFFECTIVE_DT  >=	@EffectiveDtFrom
	  OR A.HOSPITAL_EFECTIVE_DT			>=	@EffectiveDtFrom
	  OR A.INSURANCE_EFFECTIVE_DT		>=	@EffectiveDtFrom												
	  OR A.PIT_EFFECTIVE_DT				>=	@EffectiveDtFrom)
	AND (@EffectiveDtTo IS NULL
	  OR A.EMP_TYPE_EFFECTIVE_DT		<=	@EffectiveDtTo
	  OR A.EMAIL_EFFECTIVE_DT			<=	@EffectiveDtTo
	  OR A.ADDRESS_EFFECTIVE_DT			<=	@EffectiveDtTo
	  OR A.WORK_PLACE_EFFECTIVE_DT		<=	@EffectiveDtTo
	  OR A.LEVEL_EFFECTIVE_DT			<=	@EffectiveDtTo
	  OR A.LEVEL_GROUP_EFFECTIVE_DT		<=	@EffectiveDtTo
	  OR A.CONTRACT_FORM_EFECTIVE_DT	<=	@EffectiveDtTo
	  OR A.CONTRACT_TYPE_EFFECTIVE_DT	<=	@EffectiveDtTo
	  OR A.STANDARD_HOURS_EFFECTIVE_DT	<=	@EffectiveDtTo
	  OR A.HOSPITAL_EFECTIVE_DT			<=	@EffectiveDtTo
	  OR A.INSURANCE_EFFECTIVE_DT		<=	@EffectiveDtTo
	  OR A.PIT_EFFECTIVE_DT				<=	@EffectiveDtTo)

	ORDER BY A.USER_ID, A.UPDATED_DT

END


GO

/****** Object:  StoredProcedure [dbo].[SearchDependent]    Script Date: 2016/10/19 9:29:21 AM ******/
IF EXISTS (SELECT * FROM sys.objects WHERE type = 'P' AND OBJECT_ID = OBJECT_ID('dbo.SearchDependent'))
DROP PROCEDURE [dbo].[SearchDependent]
GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		thanhtv
-- Create date: 20161014
-- Description:	M011 - [SearchDependent]
-- =============================================
CREATE PROCEDURE [dbo].[SearchDependent]
	-- Add the parameters for the stored procedure here
	@CompanyCd varchar(max),
	@DeptCd varchar(max) = null,
	@EmployeeNo varchar(max) = null,
	@EmployeeName nvarchar(max) = null
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	SELECT 
		D.ID AS Id,
		EM.EMPLOYEE_NAME AS EmployeeName,
		EM.EMPLOYEE_NO AS EmployeeNo,
		D.DEPENDENT AS Dependent,
		D.BIRTH_DT AS BirthDt,
		D.DEPENDENT_TAX_CODE AS DependentTaxCode,
		D.IDENTITY_PASSPORT AS IdPassport,
		D.NUMBER AS Number,
		D.NUMBER_BOOK AS NumberBook,
		D.RELATIONSHIP AS Relationship,
		D.NATIONALITY AS Nationality,
		D.FROM_MONTH AS FromMonth,
		D.TO_MONTH AS ToMonth,
		D.UPDATED_DT AS UpdatedDt,
		D.MAIN_ID as MainId

	FROM 
		KY_EMPLOYEE_MASTER EM,
		KY_DEPENDENT D,
		TB_M_EMP_DEPT ED
	WHERE 
		EM.EMPLOYEE_NO = D.EMPLOYEE_NO
	AND EM.EMPLOYEE_NO = ED.EMPLOYEE_NO
	AND	ED.COMPANY_CD = @CompanyCd
	AND D.MAIN_ID is null
	AND D.DELETE_FLAG = '0'
	AND ED.MAIN_FLAG = '1'
	AND (ED.DEPT_CD = @DeptCd OR @DeptCd IS NULL)
	AND (EM.EMPLOYEE_NO like '%' + @EmployeeNo + '%' OR @EmployeeNo IS NULL)
	AND (EM.EMPLOYEE_NAME like '%' + @EmployeeName + '%' OR @EmployeeName IS NULL)

	ORDER BY EM.USER_ID

END

GO

/****** Object:  StoredProcedure [dbo].[[SearchSalaryMaster]]    Script Date: 2016/11/18 10:56:55 ******/
IF EXISTS (SELECT * FROM sys.objects WHERE type = 'P' AND OBJECT_ID = OBJECT_ID('dbo.SearchSalaryMaster'))
DROP PROCEDURE [dbo].SearchSalaryMaster
GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		thanhtv
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[SearchSalaryMaster] 
	-- Add the parameters for the stored procedure here
	@CompanyId int,
	@DeptCd varchar(MAX) = null,
	@EmployeeNo varchar(MAX) = null,
	@EmployeeName nvarchar(MAX) = null,
	@EffectiveDtFrom date = null,
	@EffectiveDtTo date = null
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    SELECT
		A.ID AS Id,
		A.EMPLOYEE_NO AS EmployeeNo,
		A.BASIC_SALARY_OFFICAL AS BasicSalaryOffical,
		A.BASIC_SALARY_PROBATION AS BasicSalaryProbation,
		A.SALARY_HOUR AS SalaryHour,
		A.SALARY_CAL_SOCIAL_INSU AS SalaryCalSocialInsu,
		A.BANK_ACCOUNT AS BankAccount,
		A.BANK_NAME AS BankName,
		A.SALARY_UNIT AS SalaryUnit,
		A.UNIT AS Unit,
		A.PRODUCT_SALARY as ProductSalary,
		A.ALLOWANCE_LIST AS AllowanceList,
		A.OT_TYPE AS OTType,
		A.FORMULA_CD AS FormulaCd,
		A.EFFECTIVE_DT AS EffectiveDt,
		A.DELETE_FLAG AS DeleteFlag,
		A.CREATED_DT As CreatedDt,
		A.CREATED_BY AS CreatedBy,
		A.UPDATED_DT AS UpdatedDt,
		A.UPDATED_BY AS UpdatedBy,
		A.MAIN_ID AS MainId,
		A.HISTORY_NO AS HistoryNo,
		A.EXCHANGE_RATE_SOCIAL_INSU_SAL AS ExchangeRateSocialInsuSal,
		C.EMPLOYEE_NAME as EmployeeName
	FROM 
		KY_SALARY_MASTER A,
		TB_M_EMP_DEPT B,
		KY_EMPLOYEE_MASTER C
	WHERE 
		A.EMPLOYEE_NO =	B.EMPLOYEE_NO
	AND A.EMPLOYEE_NO =	C.EMPLOYEE_NO
	AND A.DELETE_FLAG = '0'
	AND A.MAIN_ID IS NULL
	AND (((C.EMPLOYEE_NO LIKE '%' + @EmployeeNo + '%'  
			OR C.EMPLOYEE_NO_PE LIKE '%' + @EmployeeNo + '%') 
			AND C.DELETE_FLAG = '0')
			OR @EmployeeNo IS NULL)
	AND ((B.MAIN_FLAG = '1' 
			AND (B.INACTIVE_DT IS NULL 
			OR   B.INACTIVE_DT > SYSDATETIME()) AND B.DEPT_CD = @DeptCd )
			OR   @DeptCd IS NULL)

	AND ((C.EMPLOYEE_NAME LIKE '%' + @EmployeeName + '%'  
			AND C.DELETE_FLAG = '0')
			OR @EmployeeName IS NULL)

	AND ( A.EFFECTIVE_DT >= @EffectiveDtFrom
			OR @EffectiveDtFrom IS NULL)

	AND ( A.EFFECTIVE_DT <= @EffectiveDtTo
			OR @EffectiveDtTo IS NULL)

	ORDER BY A.UPDATED_DT

END



IF EXISTS (SELECT * FROM sys.objects WHERE type = 'P' AND OBJECT_ID = OBJECT_ID('dbo.SearchSalaryCalulate'))
DROP PROCEDURE [dbo].SearchSalaryCalulate
GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		thanhtv
-- Create date: 2016-12-02
-- Description:	
-- =============================================
CREATE PROCEDURE [dbo].[SearchSalaryCalulate]
	-- Add the parameters for the stored procedure here
	@companyId int = 0,
	@startDt Date = null,
	@endDt Date = null,
	@yearMonth varchar(max) = null
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	SELECT 
	A.Id,
	A.EmployeeNo,
	A.EmployeeName,
	B.Bounus,
	B.Arrear,
	A.ProbationSalary,
	A.OfficalSalary,
	A.BasicSalary,
	A.TotalPay,
	A.Other,
	A.OtherUnit,
	A.SalaryUnit,
	A.OtherRemark,
	A.Sabbtical100,
	A.Sabbtical300,
	A.Status,
	A.AppFlag,
	A.UpdatedDt
FROM
	(SELECT 
	    B.ID AS Id,
		A.USER_ID AS UserId,
		B.DATE_FROM AS DateFrom,
		A.EMPLOYEE_NAME AS EmployeeName,
		A.EMPLOYEE_NO AS EmployeeNo,
		B.PROBATION_SALARY AS ProbationSalary,
		B.OFFICAL_SALARY AS OfficalSalary,
		ISNULL(B.PROBATION_SALARY, 0) + ISNULL(B.OFFICAL_SALARY, 0) AS BasicSalary,
		B.TOTAL_PAY AS TotalPay,
		B.OTHER AS Other,
		B.SALARY_UNIT AS SalaryUnit,
		B.OTHER_UNIT AS OtherUnit,
		B.OTHER_REMARK AS OtherRemark,
		B.SABBTICAL_100 AS Sabbtical100,
		B.SABBTICAL_300 AS Sabbtical300,
		B.STATUS AS Status,
		B.APP_FLG AS AppFlag,
		B.UPDATED_DT AS UpdatedDt

	FROM 
		KY_EMPLOYEE_MASTER A LEFT JOIN KY_SALARY_RESULT B
			 ON A.EMPLOYEE_NO = B.EMPLOYEE_NO 
			AND B.HISTORY_NO = (SELECT MAX(C.HISTORY_NO)
					   FROM KY_SALARY_RESULT C
					   WHERE C.EMPLOYEE_NO = B.EMPLOYEE_NO
					   AND C.YEAR_MONTH = @yearMonth)
			AND B.YEAR_MONTH = @yearMonth
	WHERE 
		A.COMPANY_ID = @companyId
	AND A.DELETE_FLAG = '0'
	AND A.ENTRY_DT <= @endDt
	AND A.QUIT_DT IS NULL OR A.QUIT_DT >= @startDt) A

LEFT OUTER JOIN

	(SELECT 
		A.EMPLOYEE_NO AS EmployeeNo,
		SUM(CASE WHEN A.PAY_TYPE = '1' THEN ISNULL(A.VND_VALUE, A.VALUE * B.EXCHANGE_RATE) END) AS Bounus,
		SUM(CASE WHEN A.PAY_TYPE = '2' THEN ISNULL(A.VND_VALUE, A.VALUE * B.EXCHANGE_RATE) END) AS Arrear
	FROM

		(SELECT 
			A.EMPLOYEE_NO, 
			SUM(B.VALUE) AS VALUE, 
			SUM(B.VND_VALUE) AS VND_VALUE, 
			B.PAY_TYPE, 
			B.UNIT
		FROM 
			KY_EMPLOYEE_MASTER A LEFT JOIN KY_OTHER_PAY B ON A.EMPLOYEE_NO = B.EMPLOYEE_NO AND B.YEAR_MONTH = @yearMonth
		WHERE 
			A.COMPANY_ID = @companyId
		GROUP BY A.EMPLOYEE_NO, B.PAY_TYPE, B.UNIT) A

		LEFT JOIN 
	
		(SELECT TOP(1)
			A.RATE_TYPE,
			A.EXCHANGE_RATE 
		FROM KY_RATE A
		WHERE 
			A.COMPANY_ID = @companyId
		AND A.RATE_TYPE = 'USD'
		AND A.MAIN_ID IS NULL
		AND A.EFFECTIVE_DT = (SELECT MAX(B.EFFECTIVE_DT)
								FROM KY_RATE B
								WHERE 
									B.COMPANY_ID = @companyId
								AND B.RATE_TYPE = 'USD'
								AND B.MAIN_ID IS NULL
								AND B.EFFECTIVE_DT <= @endDt)
		UNION

		SELECT TOP(1)
			A.RATE_TYPE,
			A.EXCHANGE_RATE
		FROM KY_RATE A
		WHERE 
			A.COMPANY_ID = @companyId
		AND A.RATE_TYPE = 'JPY'
		AND A.MAIN_ID IS NULL
		AND A.EFFECTIVE_DT = (SELECT MAX(B.EFFECTIVE_DT)
								FROM KY_RATE B
								WHERE 
									B.COMPANY_ID = @companyId
								AND B.RATE_TYPE = 'JPY'
								AND B.MAIN_ID IS NULL
								AND B.EFFECTIVE_DT <= @endDt)
		UNION 
	
		SELECT 
			RATE_TYPE = 'VND',
			EXCHANGE_RATE = 1

		) AS B ON A.UNIT = B.RATE_TYPE

		GROUP BY A.EMPLOYEE_NO) B

	ON A.EmployeeNo = B.EmployeeNo
	ORDER BY A.UserId, A.DateFrom
END

