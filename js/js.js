function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function buscarPokemon(nome) {

    const pokebola = document.querySelector('.pokebola');
    pokebola.classList.add('active');

    const erroEncontrar = document.querySelector('.cont-pokemon-nao-achado');

    await delay(2000);

    try {
      const resposta = await fetch(`https://pokeapi.co/api/v2/pokemon/${nome.toLowerCase()}`);
      const dados = await resposta.json();

      document.getElementById('img').innerHTML = `
        <img src="${dados.sprites.other.showdown.front_default}" alt="${dados.name}">`;

        document.querySelector('.dados-pokemon').innerHTML = `
            <p><strong>Nome :</strong> ${dados.name.toLowerCase()}</p>
            <p><strong>Altura :</strong> ${dados.height}</p>
            <p><strong>Peso :</strong> ${dados.weight}</p>
            <p><strong>Tipos :</strong> ${dados.types.map(t => t.type.name).join(', ')}</p>
        `;

        erroEncontrar.classList.remove('ativo');

    } 
    
    catch (erro) {
      document.getElementById('img').innerHTML = '';
      document.querySelector('.dados-pokemon').innerHTML = '';
      erroEncontrar.classList.add('ativo');
    } 

    finally {
        pokebola.classList.remove('active');
      }
  }

  function buscar() {
    const nome = document.getElementById('pokemon-nome').value;
    if (nome) {
      buscarPokemon(nome);
    }
  }

  const btnCloseError = document.querySelector('.btn-close-erro');

  btnCloseError.addEventListener('click', () => {  
    const erroEncontrar = document.querySelector('.cont-pokemon-nao-achado');

    erroEncontrar.classList.remove('ativo');
  })