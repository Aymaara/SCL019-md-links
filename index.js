const path = require('path');
const colors = require('colors/safe');
const {exit} = require('process');
const {
    getstatus,
    // isFile,
    rutaAbsoluta,
    // verificarDirectorio,
    verificarMD,
    verificarRuta,
    openFile,
    stats,
    validate
} = require('./method.js');


// const readinput = require('readline').createInterface({ // crea input para que el cliente ingrese la ruta
//     input: process.stdin,
//     output: process.stdout
// })


const mdLinks = (route, choose) => {
    return new Promise((resolve) => {
      let routerinsert= route;  
      console.log(routerinsert)
            const newArray = [];

            if (verificarRuta(routerinsert)) {
                rutaAbsoluta(routerinsert) === false ? routerinsert = path.resolve(routerinsert) : routerinsert;
                // console.log(routerinsert);
            } else {
                console.log('su ruta no existe');
                exit();
            }
            // si la ruta es md
            if (verificarMD(routerinsert)) {
                openFile(routerinsert, 'utf8').then((fileUrl) => {
                    // console.log(fileUrl)
                    return fileUrl

                }).then((fileUrl) => {

                    const expRegular = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()!@:%_\+.~#?&\/\/=]*)/g;
                    const arrLinks = fileUrl.match(expRegular);
                    // console.log(arrLinks);

                    arrLinks.forEach((info) => {
                        const data = {
                            href: info,
                            file: routerinsert
                        }
                        newArray.push(data)
                    })
                    return newArray


                }).then((newArray) => {

                    const promiseArr = newArray.map((info) => getstatus(info.href))
                    return Promise.all(promiseArr);

                })
               
                
                .then((result) => {
                       if (choose.validate && choose.stats) {
                            validate(result); 
                            stats(result);
                       } else {
                           if (choose.validate) {
                                validate(result);
                                console.log(colors.green(routerinsert));
                           }
                           if (choose.stats) {
                                stats(result);
                            }
                        
                       } 
                     resolve(result);  
                })
                
      }// cierre de if es archivo md 
            
   }) //cierre promesa

 } // cierre función mdLinks


    // readinput.question('Ingresa tu ruta:', function (ruta) {
    //     let routerinsert = `${ruta}`;

    //     mdLinks(routerinsert)
    // })


exports.mdLinks=mdLinks;

 // si es carpeta
            //    if (verificarDirectorio(routerinsert)) {
            //         isFile(routerinsert).then((files) => {
            //             console.log('readdir', files)
            //             return files;
            //         }).then((files) => {
            //             const isMD = files.filter(verificarMD);
            //             const arregloPromesas = isMD.map(element => openFile(routerinsert.concat("\\", element), 'utf-8').then(archivo => {
            //                 console.log(element);
            //                 const folderMd = archivo;
            //                 console.log('acá también', folderMd)

            //                 return folderMd;

            //             }))
            //         })

            //    }
