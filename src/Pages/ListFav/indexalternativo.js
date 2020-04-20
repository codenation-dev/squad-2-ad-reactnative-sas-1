import React, {useState, useEffect} from 'react';

export default function ListFav() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(
        'https://api.github.com/users/gisesonia/repos'
      );
      const data = await response.json();
       //Não sei se ficaria certo acrescentar um favorite true aqui
      setRepositories(data);
    }
    fetchData();
  }, []);

  //Colocaria um render condicional se false esconde o favorito, está nos requisitos
  function handleFavorite(id) {
      const newrepositories = repositories.map(repo =>{
          return repo.id === id ? {...repo, favorite: false}
      });
      setRepositories(newRepositories);
  }

  return (
    <ul>
      {repositories.map((repo) => (
        <li key={repo.id}>
          {repo.name}
          <button onClick={() => handleFavorite(repo.id)}></button>
        </li>
      ))}
    </ul>
  );
}
