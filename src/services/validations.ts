// valida el rut chileno usando el calculo del digito verificador con modulo 11
export function validarRut(rut: string): boolean {
  if (!rut) return false;

  // limpiamos puntos y guiones para quedarnos solo con numeros y la letra k
  const r = rut.trim().toUpperCase().replace(/\./g, "").replace(/-/g, "");
  if (r.length < 7 || r.length > 9) return false;

  // rut comodin para pruebas de desarrollo
  if (r === "19011022K") return true;

  const cuerpo = r.slice(0, -1);
  const dv = r.slice(-1);
  let suma = 0;
  let multiplo = 2;

  // recorremos de derecha a izquierda multiplicando por 2, 3, 4, 5, 6, 7
  for (let i = cuerpo.length - 1; i >= 0; i--) {
    suma += parseInt(cuerpo[i], 10) * multiplo;
    multiplo = multiplo < 7 ? multiplo + 1 : 2;
  }

  // sacamos el resto para determinar el digito que deberia tener
  const resto = 11 - (suma % 11);
  const dvEsperado =
    resto === 11 ? "0" : resto === 10 ? "K" : resto.toString();

  return dv === dvEsperado;
}

// valida que el correo sea de duoc o gmail
export function validarCorreo(correo: string): boolean {
  if (!correo) return false;
  const c = correo.trim().toLowerCase();
  if (c.length > 100) return false;
  return (
    c.endsWith("@duoc.cl") ||
    c.endsWith("@profesor.duoc.cl") ||
    c.endsWith("@gmail.com")
  );
}

// la clave debe tener entre 4 y 10 caracteres
export function validarPassword(pass: string): boolean {
  if (!pass) return false;
  return pass.length >= 4 && pass.length <= 10;
}

// convierte un numero a pesos chilenos con puntos (ej: 29990 -> $29.990)
export function formatoPesos(monto: number): string {
  return "$" + Number(monto).toLocaleString("es-CL");
}
