export const getUuid = (): string => Math.random().toString(10).substr(2, 9);

export const randomInt = (max = 10 ** 9): number => Math.floor(Math.random() * max);

export const createUuidMap = <T>(items: T[], map?: Map<T, string>): Map<T, string> => {
    return items.reduce((newMap, field) => {
        newMap.set(field, map?.get(field) || getUuid());
        return newMap;
    }, new Map<T, string>());
};
