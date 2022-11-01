class Match {
    Id: Number;
    Stadium: string;
    Team1: string;
    Team2: string;
    StartDateTime: string;
    State: string;
    Score: string;
    Tournament_ID: string;
    Stage_ID: string;
    constructor(Id: Number, Stadium: string, Team1: string, Team2: string, StartDateTime: string, State: string, Score: string, Tournament_ID: string, Stage_ID: string) {
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

export default Match;