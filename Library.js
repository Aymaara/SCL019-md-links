//const{ argv } = require('process');
const {mdLinks} = require('./index.js')

const entry = process.argv;
const choose = {};
let route;

if(entry.some((x) => x === '--validate')){
    choose.validate = true
}
if(entry.some((x) => x === '--stats')){
    choose.stats = true
}

if (entry[0] === 'mdLinks'){
    route = entry[1];
}else{
    route = entry[2];
}

mdLinks(route, choose).then(() => {
    console.log();
}).catch((err) => {
    console.log(err.message);
  });

