const usuarios = [];
const eventos = [];
const inscricoes = [];


const formUsuario = document.getElementById("formUsuario");
const formEvento = document.getElementById("formEvento");
const formInscricao = document.getElementById("formInscricao");


const listaUsuarios = document.getElementById("listaUsuarios");
const listaEventos = document.getElementById("listaEventos");
const listaInscricoes = document.getElementById("listaInscricoes");


const usuarioSelect = document.getElementById("usuarioSelect");
const eventoSelect = document.getElementById("eventoSelect");


formUsuario.addEventListener("submit", (e) => {
  e.preventDefault();

  const usuario = {
    id: usuarios.length + 1,
    nome: document.getElementById("nome").value,
    email: document.getElementById("email").value,
    senha: document.getElementById("senha").value,
    data_cadastro: new Date()
  };

  usuarios.push(usuario);

  renderUsuarios();
  atualizarSelects();

  formUsuario.reset();
});

formEvento.addEventListener("submit", (e) => {
  e.preventDefault();

  const evento = {
    id: eventos.length + 1,
    titulo: document.getElementById("titulo").value,
    descricao: document.getElementById("descricao").value,
    data_evento: document.getElementById("data_evento").value,
    local: document.getElementById("local").value,
    capacidade_maxima: Number(document.getElementById("capacidade").value),
    status: document.getElementById("statusEvento").value
  };

  eventos.push(evento);

  renderEventos();
  atualizarSelects();

  formEvento.reset();
});

formInscricao.addEventListener("submit", (e) => {
  e.preventDefault();

  const usuarioId = Number(usuarioSelect.value);
  const eventoId = Number(eventoSelect.value);

  const jaExiste = inscricoes.find(
    (i) => i.usuario_id === usuarioId && i.evento_id === eventoId
  );

  if (jaExiste) {
    alert("Usuário já inscrito neste evento!");
    return;
  }

  const evento = eventos.find((e) => e.id === eventoId);

  const confirmados = inscricoes.filter(
    (i) => i.evento_id === eventoId && i.status === "CONFIRMADA"
  ).length;

  let status = "CONFIRMADA";

  if (confirmados >= evento.capacidade_maxima) {
    status = "LISTA_ESPERA";
  }

  const inscricao = {
    id: inscricoes.length + 1,
    usuario_id: usuarioId,
    evento_id: eventoId,
    data_inscricao: new Date(),
    status
  };

  inscricoes.push(inscricao);

  renderInscricoes();

  formInscricao.reset();
});

function renderUsuarios() {
  listaUsuarios.innerHTML = "";

  usuarios.forEach((usuario) => {
    listaUsuarios.innerHTML += `
      <div class="item">
        <h3>${usuario.nome}</h3>
        <p>${usuario.email}</p>
      </div>
    `;
  });
}

function renderEventos() {
  listaEventos.innerHTML = "";

  eventos.forEach((evento) => {
    listaEventos.innerHTML += `
      <div class="item">
        <h3>${evento.titulo}</h3>
        <p>${evento.descricao}</p>
        <p><strong>Local:</strong> ${evento.local}</p>
        <p><strong>Capacidade:</strong> ${evento.capacidade_maxima}</p>

        <span class="status">${evento.status}</span>
      </div>
    `;
  });
}

function renderInscricoes() {
  listaInscricoes.innerHTML = "";

  inscricoes.forEach((inscricao) => {
    const usuario = usuarios.find((u) => u.id === inscricao.usuario_id);
    const evento = eventos.find((e) => e.id === inscricao.evento_id);

    listaInscricoes.innerHTML += `
      <div class="item">
        <h3>${usuario.nome}</h3>
        <p><strong>Evento:</strong> ${evento.titulo}</p>
        <span class="status">${inscricao.status}</span>
      </div>
    `;
  });
}

function atualizarSelects() {
  usuarioSelect.innerHTML = "";
  eventoSelect.innerHTML = "";

  usuarios.forEach((usuario) => {
    usuarioSelect.innerHTML += `
      <option value="${usuario.id}">
        ${usuario.nome}
      </option>
    `;
  });

  eventos.forEach((evento) => {
    eventoSelect.innerHTML += `
      <option value="${evento.id}">
        ${evento.titulo}
      </option>
    `;
  });
}