export const countDuplicatesItemsArray = (value, array) => {
    let count = 0
    array.forEach(arrayValue => {
        if (arrayValue == value) {
            count++
        }
    })
    return count
}

export const removeArrayDuplicates = (array) => {
    return Array.from(new Set(array)) // Pasará el array sin datos duplicados
}

export const removeItemArray = (array, item) => {
    const index = array.indexOf(item) // Obtener el indice del elemento a eliminar
    if (index > -1) { // Si es mayor que -1 es porque ha encontrado el elemento a eliminar
        array.splice(index, 1) // Eliminar del array 
    }
    return array
}