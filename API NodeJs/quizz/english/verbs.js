const randomVerb = () => {
  const fs = require('fs')

  try {
    const rawdata = fs.readFileSync('./quizz/english/verbs.json', 'utf8');
    let verbs = JSON.parse(rawdata)

    var min = 0;
    var max = verbs.length - 1;
    
    var random = Math.floor(Math.random()*(max-min+1)+min);
    
    console.log(verbs[random]);
    return verbs[random]
  } catch (err) {
    console.error(err);
    // const path = require('path')
    console.log(__dirname)
  }
  
  
}

module.exports = {
  randomVerb
}