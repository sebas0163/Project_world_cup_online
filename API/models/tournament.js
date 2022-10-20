class Tournament {
    constructor(
        Id, Name, StartDate, EndDate, Rules, Type) {
        this.Id = Id;
        this.Name = Name;
        this.StartDate = StartDate;
        this.EndDate = EndDate;
        this.Rules = Rules;
        this.Type = Type;
    }
}

module.exports = Tournament;