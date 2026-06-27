import { users } from "../data/users.data.js";

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function login(request, response) {
  const { email, password } = request.body;

  if (!email || !password) {
    return response.status(400).json({
      message: "Email e senha sao obrigatorios.",
    });
  }

  if (!isValidEmail(email)) {
    return response.status(400).json({
      message: "Informe um email valido.",
    });
  }

  const user = users.find((currentUser) => currentUser.email === email);

  if (!user || user.password !== password) {
    return response.status(401).json({
      message: "Credenciais invalidas para login simulado.",
    });
  }

  return response.json({
    message: "Login simulado realizado com sucesso. Token real sera implementado em etapa futura.",
    user: {
      id: user.id,
      fullName: user.fullName,
      username: user.username,
      email: user.email,
    },
  });
}

export function register(request, response) {
  const { fullName, username, email, password, confirmPassword } = request.body;

  if (!fullName || !username || !email || !password || !confirmPassword) {
    return response.status(400).json({
      message: "Todos os campos sao obrigatorios.",
    });
  }

  if (!isValidEmail(email)) {
    return response.status(400).json({
      message: "Informe um email valido.",
    });
  }

  if (password.length < 6) {
    return response.status(400).json({
      message: "A senha precisa ter pelo menos 6 caracteres.",
    });
  }

  if (password !== confirmPassword) {
    return response.status(400).json({
      message: "Senha e confirmacao precisam ser iguais.",
    });
  }

  const emailAlreadyExists = users.some((user) => user.email === email);

  if (emailAlreadyExists) {
    return response.status(409).json({
      message: "Email ja cadastrado no ambiente simulado.",
    });
  }

  const newUser = {
    id: Date.now(),
    fullName,
    username,
    email,
    password,
    createdAt: new Date().toISOString(),
  };

  users.push(newUser);

  return response.status(201).json({
    message: "Cadastro simulado criado com sucesso. Banco real sera conectado em etapa futura.",
    user: {
      id: newUser.id,
      fullName: newUser.fullName,
      username: newUser.username,
      email: newUser.email,
    },
  });
}

export function recoverPassword(request, response) {
  const { email } = request.body;

  if (!email) {
    return response.status(400).json({
      message: "Email e obrigatorio para recuperacao de senha.",
    });
  }

  if (!isValidEmail(email)) {
    return response.status(400).json({
      message: "Informe um email valido.",
    });
  }

  return response.json({
    message: "Se este email estiver cadastrado, enviaremos instrucoes de recuperacao.",
  });
}
