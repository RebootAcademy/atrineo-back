export const transformData = (coordinatesString) => {
  // Extract the coordinates within the parentheses
  const coordinatesSubstring = coordinatesString.substring(coordinatesString.indexOf('(') + 1, coordinatesString.lastIndexOf(')')).replace(/[()]/g, '')

  // Split the coordinates into pairs of values
  const pairs = coordinatesSubstring.split(',').map(pair => pair.trim())

  // Create an array of arrays with coordinate pairs
  return pairs.map(pair => {
    const [lng, lat] = pair.split(' ').map(parseFloat)
    return [lng, lat]
  })
}