export interface IMapper<T, U> {
    mapToEntity (model: T): U;
}
