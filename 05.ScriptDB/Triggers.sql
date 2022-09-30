USE KyuyoSystem
GO


-- =============================================
--Author: Thanhtv	
--Create date: 17-Nov-2016
--Description: HISTORY_NO_KY_SALARY_MASTER
-- =============================================

CREATE TRIGGER HISTORY_NO_KY_SALARY_MASTER
ON dbo.KY_SALARY_MASTER AFTER INSERT
AS 
BEGIN
	DECLARE @id int;
	DECLARE @mainId int;
	DECLARE @historyNo int;
    IF (SELECT MAIN_ID FROM Inserted) IS NOT NULL 
        BEGIN 
			SELECT @id = ID, @mainId = MAIN_ID FROM Inserted; 
			SELECT @historyNo = ISNULL(MAX(HISTORY_NO), 0) FROM dbo.KY_SALARY_MASTER WHERE MAIN_ID = @mainId
			UPDATE dbo.KY_SALARY_MASTER SET HISTORY_NO = @historyNo + 1 WHERE Id = @id; 
        END
END
GO