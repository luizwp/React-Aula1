import React, { useState } from 'react';

function App() {
  const [nome, setNome] = useState('');
  const [idade, setIdade] = useState('');
  const [linguagem, setLinguagem] = useState('');
  const [apresentacao, setApresentacao] = useState('');

  const [saudacoes, setSaudacoes] = useState([]);
  const [editIndex, setEditIndex] = useState(null); // Para rastrear o índice em edição

  const handleSubmit = (e) => {
    e.preventDefault();

    const novaSaudacao = { nome, idade, linguagem, apresentacao };

    if (editIndex !== null) {
      // Se estiver editando, atualiza o registro existente
      const atualizadasSaudacoes = [...saudacoes];
      atualizadasSaudacoes[editIndex] = novaSaudacao;
      setSaudacoes(atualizadasSaudacoes);
      setEditIndex(null); // Reseta o índice de edição
    } else {
      // Caso contrário, adiciona uma nova saudação
      setSaudacoes([...saudacoes, novaSaudacao]);
    }

    // Limpa os campos do formulário
    setNome('');
    setIdade('');
    setLinguagem('');
    setApresentacao('');
  };

  const handleEdit = (index) => {
    const saudacao = saudacoes[index];
    setNome(saudacao.nome);
    setIdade(saudacao.idade);
    setLinguagem(saudacao.linguagem);
    setApresentacao(saudacao.apresentacao);
    setEditIndex(index); // Define o índice do item sendo editado
  };

  const handleDelete = (index) => {
    const filtradasSaudacoes = saudacoes.filter((_, i) => i !== index);
    setSaudacoes(filtradasSaudacoes);
  };

  return (
    <div className="app-container">
      <h1>Cadastro de Desenvolvedores</h1>
      <form onSubmit={handleSubmit} className="form-container">
        <div className="form-group">
          <label>Nome: </label>
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
            className="input-field"
          />
        </div>
        <div className="form-group">
          <label>Idade: </label>
          <input
            type="number"
            value={idade}
            onChange={(e) => setIdade(e.target.value)}
            required
            className="input-field"
          />
        </div>
        <div className="form-group">
          <label>Linguagem: </label>
          <input
            type="text"
            value={linguagem}
            onChange={(e) => setLinguagem(e.target.value)}
            required
            className="input-field"
          />
        </div>
        <div className="form-group">
          <label>Apresentação: </label>
          <textarea
            value={apresentacao}
            onChange={(e) => setApresentacao(e.target.value)}
            required
            className="input-field"
          />
        </div>
        <button type="submit" className="submit-button">
          {editIndex !== null ? 'Atualizar' : 'Registrar'}
        </button>
      </form>

      <div className="saudacoes-container">
        {saudacoes.map((saudacao, index) => (
          <div key={index} className="saudacao-card">
            <Saudacao
              nome={saudacao.nome}
              idade={saudacao.idade}
              Linguagem={saudacao.linguagem}
              apresentação={saudacao.apresentacao}
            />
            <div className="action-buttons">
              <button onClick={() => handleEdit(index)} className="edit-button">Editar</button>
              <button onClick={() => handleDelete(index)} className="delete-button">Excluir</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Componente Saudacao que exibe os dados enviados
function Saudacao(props) {
  return (
    <div>
      <h2>Seja bem-vindo {props.nome}</h2>
      <Dados idade={props.idade} Linguagem={props.Linguagem} apresentação={props.apresentação} />
    </div>
  );
}

// Componente Dados que exibe as informações detalhadas
function Dados(props) {
  return (
    <div>
      <h3>Idade: {props.idade} anos</h3>
      <h3>Linguagem: {props.Linguagem}</h3>
      <p>{props.apresentação}</p>
    </div>
  );
}

export default App;
