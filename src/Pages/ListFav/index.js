import React, {useState, useEffect} from 'react';

export default function ListFav() {
  const [repositories, setRepositories] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const response = await fetch('https://api.github.com/users/gisesonia/repos');
      const data = await response.json();

      setRepositories(data);
    }
    fetchData();
  }, []);

  return (
    <ul>
      {repositories.map((repo) => (
        <li key={repo.id}>{repo.name}</li>
      ))}
    </ul>
  );
}
