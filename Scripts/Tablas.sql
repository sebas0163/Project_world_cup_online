CREATE TABLE TOURNAMENT (
					Id INT IDENTITY(1,1) NOT NULL,
					CodeTournament VARCHAR(6) NOT NULL,
					[Name] VARCHAR(30) NOT NULL,
					StartDate DATE NOT NULL,
					EndDate DATE NOT NULL,
					Rules VARCHAR(1000),
					[Type] VARCHAR (50)

);
CREATE TABLE STAGE(
					Id INT IDENTITY(1,1) NOT NULL,
					[Name] VARCHAR (30) NOT NULL,
					Tournament_ID VARCHAR (6) NOT NULL
);
CREATE TABLE [MATCH](
					Id INT IDENTITY(1,1) NOT NULL,
					Stadium VARCHAR (50) NOT NULL,
					StartDateTime DATETIME NOT NULL, 
					Tournament_ID VARCHAR(6) NOT NULL,
					Stage_ID INT NOT NULL,
					[State] VARCHAR(20) NOT NULL,
					Score VARCHAR (10) NOT NULL,
					HomeId  INT NOT NULL,
					VisitId INT NOT NULL
);
CREATE TABLE TEAM(
				Id INT IDENTITY(1,1) NOT NULL,
				[Type] VARCHAR(50) NOT NULL,
				[Name] VARCHAR(100) NOT NULL
);
CREATE TABLE PLAYER(
				Id INT IDENTITY(1,1) NOT NULL,
				[Name] VARCHAR(50) NOT NULL,
				BirthDate DATE NOT NULL,
				Age INT NOT NULL,
				Rol VARCHAR(50) NOT NULL
);
CREATE TABLE PLAYER_TEAM(
						Id_Team INT NOT NULL,
						Id_Player INT NOT NULL
);
CREATE TABLE COMPETE(
					Id_Team INT NOT NULL,
					TournamentCode VARCHAR(6) NOT NULL
);

CREATE TABLE [USER](
					Id INT IDENTITY(1,1) NOT NULL,
					[Name] VARCHAR(100) NOT NULL,
					NickName VARCHAR(25) NOT NULL UNIQUE,
					Email VARCHAR(50) NOT NULL UNIQUE,
					[Password] [VARBINARY](max) NOT NULL,
					Birthdate DATE NOT NULL
);
CREATE TABLE PREDICTION (
						Id INT IDENTITY (1,1) NOT NULL,
						Home_Score INT NOT NULL,
						Visit_Score INT NOT NULL,
						Best_player INT NOT NULL,
						Id_user INT NOT NULL,
						Id_match INT NOT NULL,
						Id_Winner INT NOT NULL
);

CREATE TABLE PLAYERS_PREDICTION(
						Id INT IDENTITY(1,1) NOT NULL,
						Player_Id INT NOT NULL,
						Goals INT NULL,
						Assists INT NULL,
						Id_prediction INT NOT NULL
);
CREATE TABLE RESULT(
					Id INT IDENTITY(1,1) NOT NULL,
					Home_Score INT NOT NULL,
					Visit_Score INT NOT NULL,
					Best_player INT NOT NULL,
					Id_match INT NOT NULL UNIQUE,
					Id_Winner INT NOT NULL
);
CREATE TABLE PLAYERS_RESULTS(
					Id INT IDENTITY(1,1) NOT NULL,
					Player_Id INT NOT NULL,
					Goals INT NULL,
					Assists INT NULL,
					Id_result INT NOT NULL
);
CREATE TABLE [GROUP](
				Code VARCHAR(12) NOT NULL,
				[Name] VARCHAR(25) NOT NULL,
				Tournament_code VARCHAR(6) NOT NULL
);
CREATE TABLE USER_GROUP(
				Group_code VARCHAR(12) NOT NULL,
				[User_ID] INT NOT NULL
);

CREATE TABLE USER_TOURNAMENT_POINTS(
				Tournament_ID VARCHAR(6) NOT NULL,
				[User_Id] INT NOT NULL,
				Point INT NULL
);
CREATE TABLE [ADMIN](
				Email VARCHAR(50) NOT NULL,
				[Password] [VARBINARY](max) NOT NULL
);


ALTER TABLE [USER]
ADD CONSTRAINT IDUSER_PK PRIMARY KEY (Id);

ALTER TABLE TOURNAMENT
ADD CONSTRAINT IDTORNEO_PK PRIMARY KEY(CodeTournament);

ALTER TABLE STAGE
ADD CONSTRAINT IDFASE_TORNEO_FK FOREIGN KEY (Tournament_ID)
REFERENCES TOURNAMENT(CodeTournament),
CONSTRAINT IDFASE_PK PRIMARY KEY (Id);

ALTER TABLE TEAM
ADD CONSTRAINT ID_TEAM_PK PRIMARY KEY (Id);

ALTER TABLE [MATCH]
ADD CONSTRAINT IDPARTIDO_TORNEO_FK FOREIGN KEY (Tournament_ID)
REFERENCES TOURNAMENT(CodeTournament),
CONSTRAINT IDPARTIDO_FASE_FK FOREIGN KEY (Stage_ID)
REFERENCES STAGE(Id),
CONSTRAINT HOMEFK FOREIGN KEY (HomeId)
REFERENCES TEAM(Id),
CONSTRAINT VISITFK FOREIGN KEY (VisitId)
REFERENCES TEAM(Id),
CONSTRAINT IDPARTIDO_PK PRIMARY KEY (Id);


ALTER TABLE PLAYER
ADD CONSTRAINT IDPLAYER_PK PRIMARY KEY (Id);

ALTER TABLE PLAYER_TEAM
ADD CONSTRAINT TEAMFK_P_T FOREIGN KEY (Id_Team)
REFERENCES TEAM(Id),
CONSTRAINT PLAYERFK FOREIGN KEY (Id_Player)
REFERENCES PLAYER(Id),
CONSTRAINT PLAYER_TEAM_PK PRIMARY KEY (Id_Team, Id_Player);

ALTER TABLE COMPETE
ADD CONSTRAINT TEAMFK_C FOREIGN KEY (Id_Team)
REFERENCES TEAM(Id),
CONSTRAINT TOURNFK FOREIGN KEY (TournamentCode)
REFERENCES TOURNAMENT(CodeTournament),
CONSTRAINT COMPETEPK PRIMARY KEY (Id_Team, TournamentCode);

ALTER TABLE PREDICTION
ADD CONSTRAINT BESTPLAYER_FK FOREIGN KEY (Best_player)
REFERENCES PLAYER(Id),
CONSTRAINT USERFK FOREIGN KEY(Id_user)
REFERENCES [USER](Id),
CONSTRAINT MATCH_FK FOREIGN KEY (Id_match)
REFERENCES [MATCH](Id),
CONSTRAINT WINNER_FK FOREIGN KEY(Id_Winner)
REFERENCES TEAM(Id),
CONSTRAINT PREDICTION_PK PRIMARY KEY (Id),
CONSTRAINT ID_USERMATCH UNIQUE(Id_match, Id_user);

ALTER TABLE PLAYERS_PREDICTION
ADD CONSTRAINT GOAL_SCORER_FK FOREIGN KEY(Player_Id)
REFERENCES PLAYER(Id),
CONSTRAINT PREDICTION_FK FOREIGN KEY(Id_prediction)
REFERENCES PREDICTION(Id),
CONSTRAINT GOALPREDICTION_PK PRIMARY KEY(Id);

ALTER TABLE RESULT
ADD CONSTRAINT BESTPLAYER_R_FK FOREIGN KEY (Best_player)
REFERENCES PLAYER(Id),
CONSTRAINT MATCH_R_FK FOREIGN KEY (Id_match)
REFERENCES [MATCH](Id),
CONSTRAINT WINNER_R_FK FOREIGN KEY(Id_Winner)
REFERENCES TEAM(Id),
CONSTRAINT RESULT_PK PRIMARY KEY (Id);

ALTER TABLE PLAYERS_RESULTS
ADD CONSTRAINT GOAL_SCORER_R_FK FOREIGN KEY(Player_Id)
REFERENCES PLAYER(Id),
CONSTRAINT RESULT_FK FOREIGN KEY(Id_result)
REFERENCES RESULT(Id),
CONSTRAINT PLAYERESULT_PK PRIMARY KEY(Id);

ALTER TABLE [GROUP]
ADD CONSTRAINT TOURNAMENT_G_FK FOREIGN KEY (Tournament_code)
REFERENCES TOURNAMENT(CodeTournament),
CONSTRAINT GROUP_PK PRIMARY KEY (Code);

ALTER TABLE [USER_GROUP]
ADD CONSTRAINT GROUP_CODE_FK FOREIGN KEY (Group_code)
REFERENCES [GROUP](Code),
CONSTRAINT USER_G_FK FOREIGN KEY ([User_ID])
REFERENCES [USER](Id),
CONSTRAINT GROUP_USER_PK PRIMARY KEY (Group_code,[User_ID]);

ALTER TABLE USER_TOURNAMENT_POINTS
ADD CONSTRAINT TOURNAMENT_P_FK FOREIGN KEY (Tournament_ID)
REFERENCES TOURNAMENT(CodeTournament),
CONSTRAINT USER_POINT_FK FOREIGN KEY ([User_Id])
REFERENCES [USER](Id),
CONSTRAINT POINTS_PK PRIMARY KEY (Tournament_ID, [User_Id]);

ALTER TABLE [ADMIN]
ADD CONSTRAINT ADMIN_PK PRIMARY KEY (Email);