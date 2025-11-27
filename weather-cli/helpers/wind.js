export const getWindDirection = (deg) => {
    const dirs = [
        'North (N)',
        'North-East (NE)',
        'East (E)',
        'South-East (SE)',
        'South (S)',
        'South-West (SW)',
        'West (W)',
        'North-West (NW)'
    ];

    const index = Math.round(deg / 45) % 8;
    return `${deg}° → ${dirs[index]}`;
};