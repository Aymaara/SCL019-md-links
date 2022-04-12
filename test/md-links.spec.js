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
} = require('../method.js');

let pathfalse= 'casa.js'
let indx = 'index.js';
let  dprub = 'deprueba.md';
let test = 'test.md';
let rabsMet = 'C:\\Users\\aymar\\Desktop\\proyectos\\SCL019-md-links\\method.js';
let readme = 'C:\\Users\\aymar\\Desktop\\proyectos\\SCL019-md-links\\README.md';
let arr = ['https://www.youtube.com/watch?v=grOjfJpqwyw/', 'https://www.youtube.com/watch?v=grOjfJpqwyw/', 'https://lms.laboratoria.la/',
      'https://github.com/Aymaara/SCL019-data-lovers/blob/main/test/data.spec.js/']


describe('la función verificarRuta', () => {
  it('devuelve true si la ruta existe', () => {
    expect(verificarRuta(dprub)).toBe(true);
  });
})

    it('devuelve false si la ruta no existe', () => {
      expect(verificarRuta(pathfalse)).toBe(false);
    });

    describe('la función rutaAbsoluta', () => {
      it('me devuelve true si la ruta es absoluta', () => {
        expect(rutaAbsoluta(readme)).toBe(true);
      });
    })
      it('devuelve false si la ruta no es absoluta', () => {
        expect(rutaAbsoluta(indx)).toBe(false);
      });

   describe('la función verificarMD', () => {
    it('me devuelve true si el archivo es md', () => {
          expect(verificarMD(test)).toBe(true);
    });
  })
    it('devuelve false si no es md', () => {
      expect(verificarMD(rabsMet)).toBe(false);
       });
      