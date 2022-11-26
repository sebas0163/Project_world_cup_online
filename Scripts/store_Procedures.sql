CREATE PROCEDURE assignPoints @Prediction_Id INT, @Result_Id INT, @Tournament_Id VARCHAR(6)
AS
BEGIN
	PRINT @Prediction_Id
	
	DECLARE @n INT = 0
	DECLARE @a INT = 0
	DECLARE @b INT = 0
	DECLARE @Points INT = 0

	DECLARE @home_goals_p INT
	DECLARE @visit_goals_p INT
	DECLARE @winner_id_p INT
	DECLARE @best_player_p INT
	DECLARE @user_id_p INT

	DECLARE @home_goals_r INT
	DECLARE @visit_goals_r INT
	DECLARE @winner_id_r INT
	DECLARE @best_player_r INT

	SELECT @a = IsNULL(SUM(pr.Goals),0)
	FROM
	(SELECT * FROM PLAYERS_RESULTS
	WHERE Id_result = @Result_Id) as pr
	INNER JOIN 
	(SELECT * FROM PLAYERS_PREDICTION
	WHERE Id_prediction = @Prediction_Id) as pp
	ON pr.Player_Id = pp.Player_Id AND pr.Goals >= pp.Goals

	SELECT @b = IsNull(SUM(pr.Assists), 0)
	FROM
	(SELECT * FROM PLAYERS_RESULTS
	WHERE Id_result = @Result_Id) as pr
	INNER JOIN 
	(SELECT * FROM PLAYERS_PREDICTION
	WHERE Id_prediction = @Prediction_Id) as pp
	ON pr.Player_Id = pp.Player_Id AND pr.Assists >= pp.Assists


	SELECT @home_goals_p = Home_Score, @visit_goals_p = Visit_Score, 
	@winner_id_p = Id_Winner, @best_player_p = Best_player, @user_id_p = Id_user
	FROM PREDICTION
	WHERE Id = @Prediction_Id

	SELECT @home_goals_r = Home_Score, @visit_goals_r = Visit_Score, 
	@winner_id_r = Id_Winner, @best_player_r = Best_player
	FROM RESULT
	WHERE Id = @Result_Id
	

	IF @home_goals_p = @home_goals_r AND @visit_goals_p = @visit_goals_r
	BEGIN
		SET @n = @n+1
		SET @Points = @Points + 10
	END
	
	IF @winner_id_p = @winner_id_r
	BEGIN
		SET @n = @n+1
		SET @Points = @Points + 10
	END

	IF @best_player_p = @best_player_r
	BEGIN
		SET @n = @n+1
		SET @Points = @Points + 10
	END

	SET @Points = ( @Points + 5 * @a + 5 * @b )* (1+(@n-1)*0.25)

	BEGIN TRY
		 INSERT INTO USER_TOURNAMENT_POINTS
		 VALUES(@Tournament_Id, @user_id_p, @Points)
	END TRY
	BEGIN CATCH
		 UPDATE USER_TOURNAMENT_POINTS
		 SET Point = Point + @Points
		 WHERE [User_Id] = @user_id_p AND Tournament_ID = @Tournament_Id
	END CATCH
	
	PRINT 'points'
	PRINT @Points
	
END
GO

CREATE PROCEDURE assignResults @Result_Id INT, @Tournament_Id VARCHAR(6)
AS
BEGIN
	DECLARE @PredictionId int

	DECLARE MY_CURSOR CURSOR 
	  LOCAL STATIC READ_ONLY FORWARD_ONLY
	FOR 
	
	SELECT DISTINCT Id 
	FROM PREDICTION
	WHERE Id_match = (SELECT Id_match FROM RESULT WHERE Id = @Result_Id)
	OPEN MY_CURSOR
	FETCH NEXT FROM MY_CURSOR INTO @PredictionId
	
	
	WHILE @@FETCH_STATUS = 0
	BEGIN 
		--Do something with Id here
		
		
		EXEC assignPoints @PredictionId, @Result_Id, @Tournament_Id
		FETCH NEXT FROM MY_CURSOR INTO @PredictionId
	END
	CLOSE MY_CURSOR
	DEALLOCATE MY_CURSOR
	
END
GO

CREATE PROCEDURE InsertGroup @userId INT, @groupId VARCHAR(12)
AS 
BEGIN TRAN
	 IF EXISTS(
		SELECT [User_ID]
		FROM USER_GROUP
		WHERE [User_ID] =@userId
	 )
	 BEGIN
		ROLLBACK TRAN
	 END;
	 ELSE
	 BEGIN
	  INSERT INTO USER_GROUP VALUES (@userId, @groupId)
	 END;


--EXEC assignResults 7, 'xb2Yxh'
