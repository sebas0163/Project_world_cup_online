import { faker } from '@faker-js/faker';
import { Team } from '../../models/team';
import { Tournament } from '../../models/tournament';

export const TEAMS: Team[] = [];

export function createRandomTeam(override = {}): Team {
    return {
        Id: faker.datatype.number(),
        Name: faker.address.city(),
        Type: "Local",
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