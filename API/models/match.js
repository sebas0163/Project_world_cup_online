class Match {
    constructor(Id, Stadium, Team1, Team2, StartDateTime, State, Score, Tournament_ID, Stage_ID) {
        this.Id = Id;
        this.Stadium = Stadium;
        this.Team1 = Team1;
        this.Team2 = Team2;
        this.StartDateTime = StartDateTime;
        this.State = State;
        this.Score = Score;
        this.Tournament_ID = Tournament_ID;
        this.Stage_ID = Stage_ID;
    }
}

module.exports = Match;