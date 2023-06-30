import { useState } from 'react';
import Image from 'next/image';

import cls from 'classnames';
import { motion } from 'framer-motion';

import styles from './card.module.css';

const Card = (props) => {
  const {
    imgUrl = 'https://images.unsplash.com/photo-1485846234645-a62644f84728?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1159&q=80',
    size = 'medium',
    id,
    shouldScale = true,
  } = props;

  const [imgSrc, setImgSrc] = useState(imgUrl);

  const classMap = {
    large: styles.lgItem,
    medium: styles.mdItem,
    small: styles.smItem,
  };

  const handleOnError = () => {
    setImgSrc(
      'https://images.unsplash.com/photo-1485846234645-a62644f84728?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1159&q=80'
    );
  };

  const scale =
    id === 0
      ? { scaleY: 1.1 }
      : {
          scale: 1.1,
        };

  const shouldHover = shouldScale && {
    whileHover: { ...scale },
  };

  return (
    <div className={styles.container}>
      <motion.div
        {...shouldHover}
        className={cls(styles.imgMotionWrapper, classMap[size])}
      >
        <Image
          src={imgSrc}
          alt="card image"
          fill="fill"
          onError={handleOnError}
          className={styles.cardImg}
        />
      </motion.div>
    </div>
  );
};

export default Card;
