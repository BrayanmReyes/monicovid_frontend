export const emailRules = () => {
    let rules = [];
    rules.push({ required: true, message: `Ingresa tu correo electrónico` });
    rules.push({ type: 'email', message: `Ingresa un correo electrónico válido` });
    return rules; 
}

export const passwordRules = () => {
    let rules = [];
    rules.push({ required: true, message: `Ingresa tu contraseña` });
    rules.push({ min: 8, message: `La contraseña debe tener por lo menos 8 caracteres` });
    return rules;
}

export const defaultRules = (name) => {
    let rules = [];
    rules.push({ required: true, message: `Ingresa ${name}` });
    return rules; 
}

export const dniRules = () => {
    let rules = [];
    rules.push({ required: true, message: `Ingrese DNI` });
    rules.push({ pattern: '^[0-9]{8}$', message: `Ingrese DNI válido` });
    return rules;
}

export const phoneRules = () => {
    let rules = [];
    rules.push({ required: true, message: `Ingrese teléfono` });
    rules.push({ pattern: '^[0-9]{9}$', message: `Ingrese teléfono válido` });
    return rules;
}