import React from 'react';

import Lottie from 'lottie-react';

import animationData from '../../assets/lotties/loading-medical.json';
import { LandingPage } from './styles';

const SplashScreen: React.FC = () => {
  return (
    <LandingPage>
      <Lottie
        animationData={animationData}
        rendererSettings={{ preserveAspectRatio: 'xMidYMid slice' }}
        loop
        autoPlay
        height={200}
        width={200}
      />
    </LandingPage>
  );
};

export default SplashScreen;
