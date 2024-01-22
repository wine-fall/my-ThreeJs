export type ArrayToUnion<T extends any[]> = T extends [infer F, ...infer R] ? F | ArrayToUnion<[...R]> : []