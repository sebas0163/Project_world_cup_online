class Tournament {
    constructor(
        Id, CodeTournament, Name, StartDate, EndDate, Rules, Type) {
        this.Id = Id;
        this.CodeTournament = CodeTournament;
        this.Name = Name;
        this.StartDate = StartDate;
        this.EndDate = EndDate;
        this.Rules = Rules;
        this.Type = Type;
    }
}

module.exports = Tournament;