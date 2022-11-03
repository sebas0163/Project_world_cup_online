import { faker } from '@faker-js/faker';
import { Stage } from '../../models/stage';
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