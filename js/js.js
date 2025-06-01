function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function buscarPokemon(nome) {

    const pokebola = document.querySelector('.pokebola');
    pokebola.classList.add('active');

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
    } 
    
    catch (erro) {
      document.getElementById('resultado').innerHTML = '<p>Pokémon não encontrado.</p>';
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