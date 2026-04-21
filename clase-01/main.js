
// 1. Verifica si un correo electrónico tiene un formato válido
// 2. Función que valida direcciones email usando expresiones regulares
// 3. Comprueba que el email ingresado cumple con la estructura básica
// 4. Evalúa si una cadena es un correo electrónico válido
// 5. Retorna true si el email es correcto, false si no lo es



// Function to validate email
function validateEmail(email) {
    // Regex for email validation
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(String(email).toLowerCase());
}
