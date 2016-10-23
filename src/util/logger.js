import { print } from 'graphql/language/printer'
import { visit } from 'graphql/language/visitor'

 /* eslint-disable no-console */
export function logRawQuery(query) {
  console.group('QUERY')
  const groupTitle = `%c Raw query`
  console.group(groupTitle, 'font-size: 12px;')
  console.log(`%c ${print(query)}`, 'color: green;')
  console.groupEnd(groupTitle)
}

export function logDiffedQuery(query) {
  const groupTitle = `%c Diffed query`
  console.group(groupTitle, 'font-size: 12px;')
  console.log(`%c ${print(query)}`, 'color: YellowGreen ;')
  console.groupEnd(groupTitle)
  console.groupEnd('QUERY')
}

export function logEachASTNode(operation) {
  console.group('AST nodes')
  console.log({ AST: operation })
  visit(operation, {
    enter(node) {
      console.group(node.kind)
      console.log(node)
      console.groupEnd(node.kind)
    }
  })
  console.groupEnd('AST nodes')
}
