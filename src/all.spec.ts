import traceAll from './all'
import trace from './trace'


describe('multiple dependencies', () => {
    test('it should be able to maintain a graph', () => {
        const root = trace(Promise.resolve(), 'root')
        const bubble = traceAll<null>(
            Array(5).fill(null).map((_, i) => root.then(null, null, String(i))),
            'bubble'
        )
        expect(bubble.dependencies).toHaveLength(5)
        bubble.dependencies.forEach(dep => {
            expect(dep.dependencies).toHaveLength(1)
            expect(dep.dependencies[0].name).toBe('root')
        })
    })
})