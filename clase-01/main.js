```
// 1. Verifica si un correo electrónico tiene un formato válido
// 2. Función que valida direcciones email usando expresiones regulares
// 3. Comprueba que el email ingresado cumple con la estructura básica
// 4. Evalúa si una cadena es un correo electrónico válido
// 5. Retorna true si el email es correcto, false si no lo es

function validarEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

//Los comentarios generados por Copilot varían en nivel de detalle, 
algunos son más técnicos mientras otros son más descriptivos. 
Esto demuestra que pequeñas variaciones en el texto inicial generan diferentes resultados.

// Ejemplos de uso:
// valida email prompt pobre 
function validarEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

// ejemplos de prueba:
const ejemplos = [
  "correo@ejemplo.com",      // true - formato válido
  "correo@ejemplo.com.mx",   // true - dominio con subdominio
  "usuario123@dominio.org",  // true - con números
  "nombre.apellido@co.com",  // true - con punto en nombre
  "correo@ejemplo",          // false - falta TLD
  "@ejemplo.com",            // false - falta usuario
  "correo@",                 // false - falta dominio
  "correo@.com",             // false - dominio vacío
  "correo@ejemplo.",         // false - termina en punto
  "correo@ejemplo com",      // false - espacio en blanco
  "",                        // false - vacío
];

// Probar todos los ejemplos
ejemplos.forEach(email => {
  console.log(`"${email}" → ${validarEmail(email)}`);
});

//Ahora con una promtp efectivo o mas descriptivo
//Crea una función en JavaScript que valide si un correo electrónico 
   es válido usando expresiones regulares y retorne true o false
function validarEmail(email) {
  // Expresión regular que valida formato: algo@algo.algo
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

// Ejemplos de uso:
console.log(validarEmail("correo@ejemplo.com"));   // true
console.log(validarEmail("correo@ejemplo"));       // false
console.log(validarEmail("@ejemplo.com"));         // false
console.log(validarEmail("correo@"));              // false

//El prompt pobre genera resultados más simples y menos precisos, 
mientras que el prompt efectivo produce código más completo, 
estructurado y funcional. Copilot responde mejor cuando las 
instrucciones son claras y detalladas.```



// Funcion Validar email
function validateEmail(email) {
    // Regex for email validation
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(String(email).toLowerCase());
}
