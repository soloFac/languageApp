const randomVerb = () => {
  const fs = require('fs')

  try {
    const rawdata = fs.readFileSync('./quizz/french/verbs.json', 'utf8');
    let verbs = JSON.parse(rawdata)
    let verbsList = Object.keys(verbs)

    var min = 0;
    var max = verbsList.length - 1;
    let random = Math.floor(Math.random()*(max-min+1)+min);
    
    let selected = verbsList[random]

    return verbs[selected]
  } catch (err) {
    console.error(err);
    // const path = require('path')
    console.log(__dirname)
  }
}

module.exports = {
  randomVerb
}