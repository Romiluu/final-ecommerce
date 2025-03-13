export const password = {
    required: true,
    minLength: {
      value: 5,
      message: "El mínimo de caracteres es 6",
    },
    maxLength: {
      value: 10,
      message: "El máximo de caracteres es 10",
    },
  };
  
  export const username = {
    required: true,
    minLength: {
      value: 3,
      message: "El mínimo de caracteres es 3",
    },
    maxLength: {
      value: 8,
      message: "El máximo de caracteres es 8",
    },
  };
  
  export const email = {
    required: true,
    pattern: {
      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
      message: "Correo no válido",
    },
  };