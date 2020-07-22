import { Traceable } from './domain'
import { ranks, map, namer } from './utilities'

const byDependencies = (t: Traceable) => t.dependencies

const traceableRanks = ranks(byDependencies)


const nameDependencies = (t: Traceable): Map<Traceable, string> => {
    const addName = namer<Traceable>(t => t.name ?? 'missing')
    return map(
        byDependencies,
        (d): [Traceable, string] => [
            d,
            addName(d)
        ]
    )(t).reduce((acc, [d, name]) => {
        acc.set(d, name)
        return acc
    }, new Map<Traceable, string>())
}

type JsonTree = { [key in string]?: JsonTree | string | null }

const json = (
    t: Traceable,
    verbose: boolean = false
): JsonTree => {
    const names = nameDependencies(t)
    const visited = new Set<Traceable>()
    const helper = (t: Traceable): JsonTree => {
        if (byDependencies(t).length === 0) return { [names.get(t) as string]: null }
        return byDependencies(t).reduce<JsonTree>(
            (acc, d) => {
                if (!visited.has(d) || verbose) {
                    visited.add(d)
                    return { ...acc, [names.get(d) as string]: helper(d) }
                } else return {...acc, [names.get(d) as string]: null}
            },
            {}
        )
    }
    return { [names.get(t) as string]: helper(t) }
}

const list = (t: Traceable): [string, number][] => {
    const names = nameDependencies(t)
    return Array.from(traceableRanks(t).entries())
        .sort(([_, a], [__, b]) => a - b)
        .map<[string, number]>(([d, rank]) => [names.get(d) as string, rank])
}

export {
    ranks,
    list,
    json
}