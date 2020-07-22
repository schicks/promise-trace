
interface Traceable<T = unknown> extends PromiseLike<T> {
    name: string | undefined,
    dependencies: Dependencies,
    then<U, R>(
        onFulfilled?: ((_: T) => U | PromiseLike<U>) | null,
        onRejected?: ((_: T) => R | PromiseLike<R>) | null,
        name?: string
    ): Traceable<U | R>
}

type Dependencies = Traceable<unknown>[]

export {
    Traceable,
    Dependencies
}