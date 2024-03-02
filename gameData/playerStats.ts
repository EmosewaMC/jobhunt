export interface PlayerStats {
    charisma: number;
    motivation: number;
    technicalSkills: number;
    likability: number;
}

export interface PlayerMove {
    move: string;
    pointsAllocated: PlayerStats;
} 

export interface Player {
    googleId: string;
    googleName: string;
    experience: number;
    stats: PlayerStats;
    level: number;
    moves: PlayerMove[];
    unspentPoints: number;
    friendsList: string[];
}

export function initPlayer(googleId: string, googleName: string): Player {
    return {
        googleId: googleId,
		googleName: googleName,
        experience: 0,
        stats: {
            charisma: 0,
            motivation: 0,
            technicalSkills: 0,
            likability: 0,
        },
        level: 1,
        moves: [],
        unspentPoints: 10,
        friendsList: [],
    };
}
