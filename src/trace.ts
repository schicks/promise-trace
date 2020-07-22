import { Dependencies, Traceable } from './domain'

const isTraceable = <T>(t: PromiseLike<T>): t is Traceable<T> => 'dependencies' in t
const isThenable = (t: unknown): t is PromiseLike<unknown> => t && (t as PromiseLike<unknown>).then && true

const trace = <T>(
    traceTarget: PromiseLike<T> | T,
    name?: string,
    dependencies?: Dependencies
): Traceable<T> => {
    const promise = isThenable(traceTarget)
        ? traceTarget
        : Promise.resolve(traceTarget)
    if (isTraceable(promise) && promise.name === (name ?? promise.name)) return promise
    const traced = {
        name,
        dependencies: dependencies ?? [],
        then: <U, R>(
            onFulfilled?: ((_: T) => U | PromiseLike<U>) | null,
            onRejected?: ((_: T) => R | PromiseLike<R>) | null,
            name?: string
        ): Traceable<U | R> => trace(promise.then(onFulfilled, onRejected), name, [traced])
    }
    return traced
}

export default trace