import {Traceable} from './domain'
import trace from './trace'


/**
 * Creates a Traceable that is resolved with an array of results when all of the provided Traceables
 * resolve, or rejected when any Traceable is rejected.
 * @param values An array of Traceables.
 * @returns A new Traceable.
 */
function all<T1, T2, T3, T4, T5, T6, T7, T8, T9, T10>(values: readonly [T1 | Traceable<T1>, T2 | Traceable<T2>, T3 | Traceable<T3>, T4 | Traceable<T4>, T5 | Traceable<T5>, T6 | Traceable<T6>, T7 | Traceable<T7>, T8 | Traceable<T8>, T9 | Traceable<T9>, T10 | Traceable<T10>], name?: string): Traceable<[T1, T2, T3, T4, T5, T6, T7, T8, T9, T10]>;

/**
 * Creates a Traceable that is resolved with an array of results when all of the provided Traceables
 * resolve, or rejected when any Traceable is rejected.
 * @param values An array of Traceables.
 * @returns A new Traceable.
 */
function all<T1, T2, T3, T4, T5, T6, T7, T8, T9>(values: readonly [T1 | Traceable<T1>, T2 | Traceable<T2>, T3 | Traceable<T3>, T4 | Traceable<T4>, T5 | Traceable<T5>, T6 | Traceable<T6>, T7 | Traceable<T7>, T8 | Traceable<T8>, T9 | Traceable<T9>], name?: string): Traceable<[T1, T2, T3, T4, T5, T6, T7, T8, T9]>;

/**
 * Creates a Traceable that is resolved with an array of results when all of the provided Traceables
 * resolve, or rejected when any Traceable is rejected.
 * @param values An array of Traceables.
 * @returns A new Traceable.
 */
function all<T1, T2, T3, T4, T5, T6, T7, T8>(values: readonly [T1 | Traceable<T1>, T2 | Traceable<T2>, T3 | Traceable<T3>, T4 | Traceable<T4>, T5 | Traceable<T5>, T6 | Traceable<T6>, T7 | Traceable<T7>, T8 | Traceable<T8>], name?: string): Traceable<[T1, T2, T3, T4, T5, T6, T7, T8]>;

/**
 * Creates a Traceable that is resolved with an array of results when all of the provided Traceables
 * resolve, or rejected when any Traceable is rejected.
 * @param values An array of Traceables.
 * @returns A new Traceable.
 */
function all<T1, T2, T3, T4, T5, T6, T7>(values: readonly [T1 | Traceable<T1>, T2 | Traceable<T2>, T3 | Traceable<T3>, T4 | Traceable<T4>, T5 | Traceable<T5>, T6 | Traceable<T6>, T7 | Traceable<T7>], name?: string): Traceable<[T1, T2, T3, T4, T5, T6, T7]>;

/**
 * Creates a Traceable that is resolved with an array of results when all of the provided Traceables
 * resolve, or rejected when any Traceable is rejected.
 * @param values An array of Traceables.
 * @returns A new Traceable.
 */
function all<T1, T2, T3, T4, T5, T6>(values: readonly [T1 | Traceable<T1>, T2 | Traceable<T2>, T3 | Traceable<T3>, T4 | Traceable<T4>, T5 | Traceable<T5>, T6 | Traceable<T6>], name?: string): Traceable<[T1, T2, T3, T4, T5, T6]>;

/**
 * Creates a Traceable that is resolved with an array of results when all of the provided Traceables
 * resolve, or rejected when any Traceable is rejected.
 * @param values An array of Traceables.
 * @returns A new Traceable.
 */
function all<T1, T2, T3, T4, T5>(values: readonly [T1 | Traceable<T1>, T2 | Traceable<T2>, T3 | Traceable<T3>, T4 | Traceable<T4>, T5 | Traceable<T5>], name?: string): Traceable<[T1, T2, T3, T4, T5]>;

/**
 * Creates a Traceable that is resolved with an array of results when all of the provided Traceables
 * resolve, or rejected when any Traceable is rejected.
 * @param values An array of Traceables.
 * @returns A new Traceable.
 */
function all<T1, T2, T3, T4>(values: readonly [T1 | Traceable<T1>, T2 | Traceable<T2>, T3 | Traceable<T3>, T4 | Traceable<T4>], name?: string): Traceable<[T1, T2, T3, T4]>;

/**
 * Creates a Traceable that is resolved with an array of results when all of the provided Traceables
 * resolve, or rejected when any Traceable is rejected.
 * @param values An array of Traceables.
 * @returns A new Traceable.
 */
function all<T1, T2, T3>(values: readonly [T1 | Traceable<T1>, T2 | Traceable<T2>, T3 | Traceable<T3>], name?: string): Traceable<[T1, T2, T3]>;

/**
 * Creates a Traceable that is resolved with an array of results when all of the provided Traceables
 * resolve, or rejected when any Traceable is rejected.
 * @param values An array of Traceables.
 * @returns A new Traceable.
 */
function all<T1, T2>(values: readonly [T1 | Traceable<T1>, T2 | Traceable<T2>], name?: string): Traceable<[T1, T2]>;

/**
 * Creates a Traceable that is resolved with an array of results when all of the provided Traceables
 * resolve, or rejected when any Traceable is rejected.
 * @param values An array of Traceables.
 * @returns A new Traceable.
 */
function all<T>(values: readonly (T | Traceable<T>)[], name?: string): Traceable<T[]>;
function all<T>(values: readonly (T | Traceable<T>)[], name?: string): Traceable<T[]> {
    return trace(Promise.all(values), name, values.map(d => trace(d)))
}

export default all