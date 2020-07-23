import traceAll from './all'
import trace from './trace'
import { list, json, dot } from './show'

const line = new Array(5).fill(null).reduce(
    (acc, _, i) => acc.then(null, null, `line_${i}`),
    trace(Promise.resolve(null), 'root')
)
const T = traceAll<null>(
    Array(5).fill(null).map((_, i) => line.then(null, null, `bubble_${i}`)),
    'bubble'
)

const dags = {
    line,
    T
}


describe('visualizations', () => {
    test.each(Object.entries(dags))('it should list all the nodes in %s with their depth', (name, dag) => {
        expect(list(dag)).toMatchSnapshot()
    })

    test.each(Object.entries(dags))('it should give a json dependency tree of %s', (name, dag) => {
        expect(json(dag, true)).toMatchSnapshot()
    })

    test.each(Object.entries(dags))('it should not show the nodes of %s more than once by default', (name, dag) => {
        expect(json(dag)).toMatchSnapshot()
    })

    test.each(Object.entries(dags))('it should generate a graphviz definition for %s', (name, dag) => {
        expect(dot(dag)).toMatchSnapshot()
    })
})