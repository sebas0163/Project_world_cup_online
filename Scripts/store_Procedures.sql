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

	SELECT @a = SUM(pr.Goals)
	FROM
	(SELECT * FROM PLAYERS_RESULTS
	WHERE Id_result = @Result_Id) as pr
	INNER JOIN 
	(SELECT * FROM PLAYERS_PREDICTION
	WHERE Id_prediction = @Prediction_Id) as pp
	ON pr.Player_Id = pp.Player_Id AND pr.Goals >= pp.Goals

	SELECT @b = SUM(pr.Assists)
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
	PRINT 'points'
	PRINT @Points
	PRINT 'n'
	PRINT @n
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

--EXEC assignResults 2, 'zya0a4'
