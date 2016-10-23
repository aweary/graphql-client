export function getNameFromSelectionSet(set) {
  return set.name.value
}

export function getArgumentValueFromSelection(selection) {
  if (!selection.arguments.length) return null
  const argsMap = {}
  selection.arguments.forEach(arg => {
    argsMap[arg.name.value] = arg.value.value
  })
  return JSON.stringify(argsMap)
}

function hasDescendantFields(field) {
  return field.selectionSet !== null
}

export function getSelectionsFromQuery(query) {
  return query.selectionSet.selections
}

export function checkForValueInResponse(
  key,
  result
) {
  if (result[key] === undefined) {
    throw new Error(
      `writeSelectionSetToStore(...): query contained field` +
      `${key} but this was not present in the response.`
    )
  }
}

export function writeSelectionSetToStore({
  storeData,
  parentId,
  selections,
  result,
  dataIdFromObject,
} : {
  store: GraphQLStoreData
}) {
  console.log({
    storeData,
    parentId,
    selections,
    result,
    dataIdFromObject,
  })
  selections.forEach(selection => {
    const selectionName = getNameFromSelectionSet(selection)
    const argsName = getArgumentValueFromSelection(selection)
    let recordName = null
    if (parentId) {
      recordName = `${parentId}.${selectionName}`
    } else {
      recordName = selectionName
    }

    if (argsName) {
      recordName = `${recordName}(${argsName})`
    }

    if (hasDescendantFields(selection)) {
      if (dataIdFromObject) {
        dataIdFromObject(selection)
      }
      writeSelectionSetToStore({
        storeData: storeData,
        parentId: recordName,
        selections: getSelectionsFromQuery(selection),
        result: result[selectionName],
      })
    } else {
      checkForValueInResponse(selectionName, result)
      storeData[recordName] = result[selectionName]
    }
  })
}
