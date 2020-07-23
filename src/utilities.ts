const reduce = <T, U>(
    dependencies: (t: T) => T[],
    f: (acc: U, a: T) => U,
    init: U
): (_: T) => U => {
    const visited = new Set<T>()
    const helper = (
        acc: U,
        t: T
    ): U => {
        if (!visited.has(t)) {
            visited.add(t)
            return dependencies(t).reduce(helper, f(acc, t))
        }
        return acc
    }
    return t => helper(init, t)
}

const map = <T, U>(
    dependencies: (t: T) => T[],
    f: (a: T) => U
): (_: T) => U[] => reduce<T, U[]>(dependencies, (acc, a) => [...acc, f(a)], [])

const namer = <T>(getCandidateName: (_: T) => string): ((_: T) => string) => {
    const names = new Map<string, T>()
    const addName = (d: T, name: string, attempt: number): string => {
        const usedName = attempt === 0 ? name : `${name}_${attempt}`
        const currentOwner = names.get(usedName)
        if ((currentOwner ?? d) === d) {
            names.set(usedName, d)
            return usedName
        } else {
            return addName(d, name, attempt + 1)
        }
    }
    return d => addName(d, getCandidateName(d), 0)
}

const ranks = <T>(dependencies: (_: T) => T[]): (_: T) => Map<T, number> => {
    const helper = (
        t: T,
        visited: Map<T, number>,
        depth: number
    ): Map<T, number> => {
        visited.set(t, depth)
        dependencies(t).forEach(d => {
            const newDepth = depth + 1
            if (visited.has(d)) visited.set(
                d,
                Math.max(newDepth, visited.get(d) ?? 0)
            )
            else helper(d, visited, newDepth)
        })
        return visited
    }
    return t => helper(t, new Map(), 0)
}

const groupBy = <T, K extends string | number | symbol>(
    by: (_: T) => K
) => (
    items: T[]
): Map<K, T[]> => items.reduce<Map<K, T[]>>((acc, a) => {
    const key = by(a)
    acc.set(
        key,
        [...(acc.get(key) ?? []), a]
    )
    return acc
}, new Map())




export {
    ranks,
    groupBy,
    map,
    namer,
    reduce
}