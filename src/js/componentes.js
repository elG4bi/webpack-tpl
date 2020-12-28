import '../css/componentes.css';

export const saludar = (nombre) => {
    console.log('creando append');
    const h1 = document.createElement('h1');
    h1.innerHTML = `Hola, ${nombre} <br> <small>Este es un Webpack template</small>`;
    document.body.append(h1);
}