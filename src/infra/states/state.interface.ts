export interface StateInterface<T> {
    get(): T | T[];
    set(value: T | T[]): void;
    add(value: T): void;
    remove(id: string): void;
}