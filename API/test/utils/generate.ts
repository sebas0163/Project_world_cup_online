import { faker } from '@faker-js/faker';
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
        Home_Score: faker.datatype.number(),
        Visit_Score: faker.datatype.number(),
        Best_player: faker.datatype.number(),
        Id_user: faker.datatype.number(),
        Id_match: faker.datatype.number(),
        ...override,
    };
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

export function createRandomStageForTournament(override = {}, Tournament_ID: string): Stage {
    return {
        Id: faker.datatype.number(),
        Name: faker.address.city(),
        Tournament_ID: Tournament_ID,
        ...override,
    };
}

export function createRandomMatch(override = {}): Match {
    return {
        Id: faker.datatype.number(),
        Stadium: faker.address.city(),
        StartDateTime: faker.date.past().toString(),
        State: "Pendiente",
        Score: "0-0",
        Tournament_ID: "TR0001",
        Stage_ID: 1,
        HomeId: faker.datatype.number(),
        VisitId: faker.datatype.number(),
        ...override,
    };
}

export function createRandomUser(override = {}): User {
    return {
        Id: faker.datatype.number(),
        Name: faker.name.firstName(),
        FirstSurname: faker.name.lastName(),
        SecondSurname: faker.name.lastName(),
        Email: faker.internet.email(),
        Password: faker.internet.password(),
        Birthdate: faker.date.past().toString(),
        Nationality: faker.address.country(),
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
            return createRandomStageForTournament({ id: i, ...override }, Tournament_ID);
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

export function generateMatchesData(n: number = 1, override = {}) {
    return Array.from(
        {
            length: n,
        },
        (_, i) => {
            return createRandomMatch({ id: i, ...override });
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

export function generateTeamWithPlayers(team: Team) {
    let teamPlayerList: { Id: number, Name: string, Team: string, Rol: string }[] = [];
    //let addList:{Id_Team:number,Id_Player:number}[] = [];
    const players = generatePlayersData(11);
    // const team = createRandomTeam();
    // players.forEach(player => {
    //     addList.push({Id_Team:team.Id,Id_Player:player.Id})
    // });
    teamPlayerList = players.map(player => {
        return { Id: player.Id, Name: player.Name, Team: team.Name, Rol: player.Rol }
    });

    return teamPlayerList;
}