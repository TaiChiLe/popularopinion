import { Input } from 'antd';
import styles from './index.module.css';
import { useState } from 'react';

export default function Item25() {
  const [animeList, setAnimeList] = useState([]);

  const fetchAnimes = (event: React.ChangeEvent<HTMLInputElement>) => {
    fetch(`https://api.jikan.moe/v4/anime?letter=${event.target.value}`)
      .then((response) => response.json())
      .then((result) => setAnimeList(result.data));
    console.log(animeList);
  };

  return (
    <div className={styles.container}>
      <Input onChange={fetchAnimes}></Input>
      <ul>
        {animeList &&
          animeList.map((anime, index) => <li key={index}>{anime.title}</li>)}
      </ul>
    </div>
  );
}
