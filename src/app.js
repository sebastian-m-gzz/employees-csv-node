const csv = require('./csv');

/*
  Gets the entry with the given index.
  @param {int} index - The index of the entry to retrieve.
  @return {string} - The corresponding data, else undefined. 
*/
const getFullData = async (index) => {
  let json = await csv.getJson();
  let entry = json.filter(e => e.id == index);
  return entry[0];
}

/*
  Gets the column from the entry with the given index.
  @param {int} index - The index of the entry to retrieve.
  @param {string} column - The column to retrieve.
  @return {string} - The corresponding data, else undefined. 
*/
const getData = async (index, column) => {
  let json = await csv.getJsonById(index);
  return json[column];
}

/*
  Determines if a variable is of certain type.
  @param {any} value - The variable to check the type.
  @param {stirng} type - The type to check if matches.
*/
const isOfType = (value, type) => {
  let fullType = Object.prototype.toString.call(value);
  let trueType = fullType.substring(
    fullType.indexOf(" ") + 1, 
    fullType.indexOf("]"));
  return trueType === type;
}

/*
  Executes the application.
*/
const executeApp = async () => {
  let args = process.argv.slice(2);
  let index = parseInt(args[0]);
  let column = args[1];
  if(index != undefined) {
    if(column!= undefined) {
      let data = await getData(index, column);
      console.log(data);
    } else {
      let data = await getFullData(index);
      console.log(data);
    }
  } else {
    console.log(`Could not understard the index value '${index}', please try again.`)
  }
};

/* ============ Entry point of application ============ */
executeApp();
