import traceAll from './all'
import trace from './trace'
import { list } from './show'


describe('list', () => {
    test('bubble', () => {
        const root = trace(Promise.resolve(), 'root')
        const bubble = traceAll<null>(
            Array(5).fill(null).map((_, i) => root.then(null, null, String(i))),
            'bubble'
        )
        expect(list(bubble)).toMatchSnapshot()
    })

    test('line', () => {
        const lineage = new Array(5).fill(null).reduce(
            (acc, _, i) => acc.then(null, null, String(i)),
            trace(Promise.resolve(null), 'root')
        )
        expect(list(lineage)).toMatchSnapshot()
    })
})