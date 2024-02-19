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
    experience: number;
    stats: PlayerStats;
    level: number;
    moves: PlayerMove[];
    unspentPoints: number;
    friendsList: string[];
}

export function initPlayer(googleId: string): Player {
    return {
        googleId: googleId,
        experience: 0,
        stats: {
            charisma: 0,
            motivation: 0,
            technicalSkills: 0,
            likability: 0,
        },
        level: 1,
        moves: [],
        unspentPoints: 0,
        friendsList: [],
    };
}