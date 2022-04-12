const {existsSync, lstatSync } = require('fs');
const { readdir, readFile } = require("fs/promises")
const  path = require ( 'path' ) ;
const url = require('url');
const https = require('https')
const colors = require('colors/safe');

const verificarRuta = (routerinsert) => existsSync(routerinsert);

const verificarMD = (routerinsert) => path.extname(routerinsert) === '.md';

const rutaAbsoluta = (routerinsert) => path.isAbsolute(routerinsert); 

const verificarDirectorio = (routerinsert) => lstatSync(routerinsert).isDirectory();

const isFile = (routerinsert) => readdir(routerinsert);

const openFile = (routerinsert) => readFile(routerinsert, 'utf8');



const getstatus = (link)  => {
    return new Promise ((resolve) => {
     const options = {
        path:url.parse(link).pathname,
        hostname: url.parse(link).host,
         port:443,
         method:'HEAD'
                } 
//console.log(options);
    
const req = https.request(options, (res) => {
      const linkstatus = {
        linkname: link,
        Code: res.statusCode,
        status:`ok ${res.statusCode}`
      };
      
     console.log('1req', linkstatus);
     // console.log(`statusCode: ${res.statusCode}`)
    
    resolve(linkstatus); 
    });
        
    req.on('error', (error) => {
     console.error(error);
      const dataerr = {
        linkname: link,
        status: false
      };
      resolve(dataerr);
    });
      
      req.end() 
   
    }
);

}

function stats (infoLinks) {
  let validateLinks = 0;
  let invalidateLinks= 0;
      infoLinks.forEach((e)=> {
          if(e.status){
              validateLinks += 1;
          }else{
              invalidateLinks += 1;
          } 
      })
console.log(colors.yellow('Links encontrados:', infoLinks.length))
console.log(colors.green('Total Links Válidos:', validateLinks))
console.log(colors.red('Total Links Inválidos:', invalidateLinks))  
}

function validate (infoLinks){
  infoLinks.forEach((e)=>{
    if(e.status){
      console.log(colors.blue(`Link:${e.linkname}  Status:${e.status}`))
    } else {
      console.log(colors.red(`Link: ${e.linkname} Status: ${e.status}`));
    }
  })
}

exports.openFile = openFile;
exports. isFile = isFile;
exports.verificarRuta = verificarRuta;
exports.verificarMD = verificarMD;      
exports.rutaAbsoluta = rutaAbsoluta;
exports.verificarDirectorio = verificarDirectorio;
exports.getstatus= getstatus;
exports.stats =  stats ;
exports.validate = validate;