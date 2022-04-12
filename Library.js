//const{ argv } = require('process');
const {mdLinks} = require('./mdLinks.js')

const entry = process.argv;
const choose = {};
let route;

if(entry.some((x) => x === '--validate:true')){
    choose.validate = true
}
if(entry.some((x) => x === '--stats')){
    choose.stats = true
}
if(entry.some((x)=>x === '--validate:false')){
    choose.file = true
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

