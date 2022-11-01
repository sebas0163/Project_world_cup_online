class Tournament {
    Id: Number;
    CodeTournament: string;
    Name: string;
    StartDate: string;
    EndDate: string;
    Rules: string;
    Type: string;
    constructor(
        Id: Number, CodeTournament: string, Name: string, StartDate: string, EndDate: string, Rules: string, Type: string) {
        this.Id = Id;
        this.CodeTournament = CodeTournament;
        this.Name = Name;
        this.StartDate = StartDate;
        this.EndDate = EndDate;
        this.Rules = Rules;
        this.Type = Type;
    }
}

export default Tournament;