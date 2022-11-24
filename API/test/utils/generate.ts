import { faker } from '@faker-js/faker';
import { Admin } from '../../models/admin';
import { Match } from '../../models/match';
import { Player } from '../../models/player';
import { Prediction } from '../../models/prediction';
import { Stage } from '../../models/stage';
import { Team } from '../../models/team';
import { Tournament } from '../../models/tournament';
import { User } from '../../models/user';

export function createRandomTeam(override = {}): Team {
    return {
        Id: faker.datatype.number(),
        Name: faker.address.city(),
        Type: "Local",
        ...override,
    };
}

export function createWrongPassword(password: string): string {
    let wrongPassword = faker.internet.password();
    while (wrongPassword === password) {
        wrongPassword = faker.internet.password();
    }
    return wrongPassword;
}

export function createRandomPlayer(override = {}): Player {
    return {
        Id: faker.datatype.number(),
        Name: faker.name.firstName(),
        BirthDate: faker.date.past().toISOString().split('T')[0],
        Age: faker.datatype.number(),
        Rol: faker.name.jobTitle(),
        ...override,
    };
}

export function createRandomPrediction(override = {}): Prediction {
    return {
        Id: faker.datatype.number(),
        Home_Score: faker.datatype.number({ min: 0, max: 3 }),
        Visit_Score: faker.datatype.number({ min: 0, max: 3 }),
        Best_player: faker.datatype.number(),
        Id_user: faker.datatype.number(),
        Id_match: faker.datatype.number(),
        Id_Winner: faker.datatype.number(),
        ...override,
    };
}

export function addRandomTeamToTournament(): { Id_Team: number, TournamentCode: string } {
    const team: Team = createRandomTeam();
    const tournament: Tournament = createRandomTournament();
    const result: { Id_Team: number, TournamentCode: string } =
        { Id_Team: team.Id, TournamentCode: tournament.CodeTournament };
    return result;
}

export function addTeamsToRandomTournament(tournament: Tournament, n_teams: number): Team[] {
    const teams: Team[] = generateTeamsData(n_teams);
    const addTeams: { Id_Team: number, TournamentCode: string }[] = [];
    teams.forEach((team) => {
        addTeams.push({ Id_Team: team.Id, TournamentCode: tournament.CodeTournament });
    });
    if (teams.length == addTeams.length) {
        return teams;
    } else {
        return [];
    }
}

export function createGoalPrediction(Goal_Scorer: string, Attendee: string, override = {}): { Goal_Scorer: string, Attendee: string } {
    return {
        Goal_Scorer,
        Attendee,
        ...override,
    };
}

export function createRandomTournament(override = {}): Tournament {
    return {
        Id: faker.datatype.number(),
        CodeTournament: faker.datatype.string(6),
        Name: faker.address.city(),
        StartDate: faker.date.past().toString(),
        EndDate: faker.date.future().toString(),
        Rules: faker.lorem.paragraph(),
        Type: "Local" || "Selecciones",
        ...override,
    };
}

export function createRandomStage(override = {}): Stage {
    return {
        Id: faker.datatype.number(),
        Name: faker.address.city(),
        Tournament_ID: faker.datatype.string(6),
        ...override,
    };
}

export function createRandomStageForTournament(Tournament_ID: string, override = {}): Stage {
    return {
        Id: faker.datatype.number(),
        Name: faker.address.city(),
        Tournament_ID: Tournament_ID,
        ...override,
    };
}

export function createRandomMatch(tournamentId: number, stageId: number, override = {}): Match {
    return {
        Id: faker.datatype.number(),
        Stadium: faker.address.city(),
        StartDateTime: faker.date.past().toString(),
        State: "Pendiente",
        Score: "0-0",
        Tournament_ID: tournamentId.toString(),
        Stage_ID: stageId,
        HomeId: faker.datatype.number(),
        VisitId: faker.datatype.number(),
        ...override,
    };
}

export function createRandomUser(override = {}): User {
    return {
        Id: faker.datatype.number(),
        Name: faker.name.firstName(),
        Email: faker.internet.email(),
        Password: faker.internet.password(),
        Birthdate: faker.date.past().toString(),
        Nickname: faker.internet.userName(),
        ...override,
    }
}

export function generateSingleMatch(): Match {
    return {
        Id: faker.datatype.number(),
        Stadium: faker.address.city(),
        StartDateTime: faker.date.past().toString(),
        State: "Pendiente",
        Score: "0-0",
        Tournament_ID: "TR0001",
        Stage_ID: 1,
        HomeId: 1,
        VisitId: 2
    };
}

export function generateStagesData(n: number = 1, override = {}) {
    return Array.from(
        {
            length: n,
        },
        (_, i) => {
            return createRandomStage({ id: i, ...override });
        }
    );
}

export function generateStagesForTournament(n: number = 1, Tournament_ID: string, override = {}) {
    return Array.from(
        {
            length: n,
        },
        (_, i) => {
            return createRandomStageForTournament(Tournament_ID, { id: i, ...override });
        }
    );
}

export function generateTournamentsData(n: number = 1, override = {}) {
    return Array.from(
        {
            length: n,
        },
        (_, i) => {
            return createRandomTournament({ id: i, ...override });
        }
    );
}

export function generateMatchesData(tournamentId: number, stageId: number, n: number = 1, override = {}) {
    return Array.from(
        {
            length: n,
        },
        (_, i) => {
            return createRandomMatch(tournamentId, stageId, { id: i, ...override });
        }
    );
}

export function generateTeamsData(n: number = 1, override = {}) {
    return Array.from(
        {
            length: n,
        },
        (_, i) => {
            return createRandomTeam({ id: i, ...override });
        }
    );
}

export function generateUsersData(n: number = 1, override = {}) {
    return Array.from(
        {
            length: n,
        },
        (_, i) => {
            return createRandomUser({ id: i, ...override });
        }
    );
}

export function generatePlayersData(n: number = 1, override = {}) {
    return Array.from(
        {
            length: n,
        },
        (_, i) => {
            return createRandomPlayer({ id: i, ...override });
        }
    );
}

export function createRandomAdmin(): Admin {
    return {
        Email: faker.internet.email(),
        Password: faker.internet.password()
    }
}

export function generatePredictionsData(n: number = 1, override = {}) {
    return Array.from(
        {
            length: n,
        },
        (_, i) => {
            return createRandomPrediction({ id: i, ...override });
        }
    );
}

export function generatePredictionsForUser(n: number = 1, user: User) {
    const predictions: Prediction[] = [];
    for (let i = 0; i < n; i++) {
        const prediction: Prediction = createRandomPredictionForUser(user.Id);
        predictions.push(prediction);
    }
    return predictions;
}

export function createRandomPredictionForUser(userId: number): Prediction {
    return {
        Id: faker.datatype.number(),
        Home_Score: faker.datatype.number({ min: 0, max: 3 }),
        Visit_Score: faker.datatype.number({ min: 0, max: 3 }),
        Best_player: faker.datatype.number(),
        Id_user: userId,
        Id_match: faker.datatype.number(),
        Id_Winner: faker.datatype.number()
    }
}

export function generateTeamWithPlayers(team: Team) {
    let teamPlayerList: { Id: number, Name: string, Team: string, Rol: string }[] = [];
    const players = generatePlayersData(11);
    teamPlayerList = players.map(player => {
        return { Id: player.Id, Name: player.Name, Team: team.Name, Rol: player.Rol }
    });

    return teamPlayerList;
}

function get_random(list: any) {
    return list[Math.floor(Math.random() * list.length)];
}

export function createRandomGoalList(players: Player[], Home_Score: number,
    Visit_Score: number): { Player_Id: string, Goals: string, Assists: string }[] {

    let goalList: { Player_Id: string, Goals: string, Assists: string }[] = [];
    const goalsQuantity: number = Home_Score + Visit_Score;
    const randomGoals = faker.datatype.number({ min: 0, max: goalsQuantity });
    const randomAssists = faker.datatype.number({ min: 0, max: goalsQuantity - randomGoals });

    for (let i = 0; i < goalsQuantity; i++) {
        goalList.push({
            Player_Id: players[i].Id.toString(), Goals: randomGoals.toString(),
            Assists: randomAssists.toString()
        });
    }

    return goalList;
}

export function generateRandomPrediction() {
    const randomPrediction = createRandomPrediction();
    const randomTournament = createRandomTournament();
    const randomStage = createRandomStageForTournament(randomTournament.Id.toString());
    const randomMatch = createRandomMatch(randomTournament.Id, randomStage.Id);
    const randomUser = createRandomUser();
    const randomPlayersData = generatePlayersData(6);
    //console.log(randomPlayersData);
    const bestPlayerId = randomPlayersData[faker.datatype.number({ min: 0, max: 5 })].Id;
    const randomGoalList = createRandomGoalList(randomPlayersData, randomPrediction.Home_Score,
        randomPrediction.Visit_Score);

    return {
        Home_Score: randomPrediction.Home_Score, Visit_Score: randomPrediction.Visit_Score,
        Best_player: bestPlayerId, Id_user: randomUser.Id, Id_match: randomMatch.Id,
        GoalList: randomGoalList,
        Id: randomPrediction.Id
    }
}