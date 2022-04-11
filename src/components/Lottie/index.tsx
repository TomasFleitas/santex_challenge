import { memo } from 'react';
import Lottie from 'react-lottie';
import cart from './cart.json';
import Trash from './trash.json';
import Delete from './delete.json';

/* Varios componentes Lottie (animaciones) */

const LottieC = memo(() => {
  return (
    <Lottie
      options={{
        loop: true,
        autoplay: true,
        animationData: cart,
        rendererSettings: {
          preserveAspectRatio: 'xMidYMid slice',
        },
      }}
      height={60}
      width={60}
    />
  );
});

const LottieT = memo(() => {
  return (
    <Lottie
      options={{
        loop: false,
        autoplay: true,
        animationData: Trash,
        rendererSettings: {
          preserveAspectRatio: 'xMidYMid slice',
        },
      }}
      height={20}
      width={50}
    />
  );
});

const LottieD = memo(() => {
  return (
    <Lottie
      options={{
        loop: false,
        autoplay: true,
        animationData: Delete,
        rendererSettings: {
          preserveAspectRatio: 'xMidYMid slice',
        },
      }}
      height={50}
      width={50}
    />
  );
});

export { LottieC, LottieT, LottieD };
