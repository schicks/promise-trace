import trace from './trace'
import { Traceable } from './domain'

describe('adding tracing', () => {
    test('should remember a chain of dependencies', () => {
        const lineage = new Array(5).fill(null).reduce<Traceable>(
            (acc, _, i) => acc.then(null, null, String(i)),
            trace(Promise.resolve(null), 'root')
        )
        let count = 0
        let current: Traceable = lineage
        for (current = lineage; current.dependencies.length === 1; current = current.dependencies[0]) {
            count++
            expect(current.dependencies).toHaveLength(1)
            expect(current.name).toBe(String(5 - count))
        }
        expect(count).toBe(5)
        expect(current.name).toBe('root')
    })
})