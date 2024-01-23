// Custom setter function to lowercase the entire word
const toLowercase = (value) => value.toLowerCase();

// Custom setter function to capitalize the first letter
const capitalizeWords = value => (
  value.toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
);

module.exports = { 
  toLowercase,
  capitalizeWords
}