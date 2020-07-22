import { Traceable } from './domain'

function ranks(
    t: Traceable,
    visited: Map<Traceable, number> = new Map(),
    depth: number = 0
): Map<Traceable, number> {
    visited.set(t, depth)
    t.dependencies.forEach(d => {
        const newDepth = depth + 1
        if (visited.has(d)) visited.set(
            d,
            Math.max(newDepth, visited.get(d) ?? 0)
        )
        else ranks(d, visited, newDepth)
    })
    return visited
}

const list = (t: Traceable): string => {
    return Array.from(ranks(t).entries())
        .sort(([_, a], [__, b]) => a - b)
        .map(([{ name }, rank]) => `${name}, ${rank}`)
        .join('\n')
}

export {
    ranks,
    list
}