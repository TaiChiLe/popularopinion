import { Image, Modal, Spin } from 'antd';
import styles from './index.module.css';
import { Card } from 'antd';
import { useEffect, useState } from 'react';
const { Meta } = Card;
export default function Item24() {
  const [animeList, setAnimeList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const fetchAnime = () => {
    fetch('https://api.jikan.moe/v4/top/anime')
      .then((response) => response.json())
      .then((result) => {
        setAnimeList(result.data);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchAnime();
  }, []);

  return (
    <div className={styles.container}>
      {loading && <Spin spinning fullscreen />}
      {!loading &&
        animeList.map((anime, index) => (
          <div>
            <Image
              onClick={showModal}
              preview={false}
              className={styles.image}
              key={index}
              src={anime.images.jpg.image_url}
            />
            <Modal
              title={anime.title}
              open={isModalOpen}
              onOk={handleOk}
              onCancel={handleCancel}
            >
              <Image
                preview={false}
                className={styles.image}
                key={index}
                src={anime.images.jpg.image_url}
              />
            </Modal>
          </div>
        ))}
    </div>
  );
}
