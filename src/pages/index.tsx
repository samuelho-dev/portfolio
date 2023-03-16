import Game from '@/components/Game';
import SomethingWeird from '@/components/SomethingWeird';
import workJPG from '../../public/study.jpg';
import projectJPG from '../../public/project.jpg';
import Canvas from '@/game/Canvas';

import Image from 'next/image';
import React, { useState } from 'react';
import { createPortal } from 'react-dom';

function Home({ handleRoute }) {
  const [gameModal, setGameModal] = useState(false);
  const handleGameModal = () => {
    setGameModal(!gameModal);
  };
  return (
    <div className="grid grid-flow-row-dense grid-cols-3 grid-rows-2 place-items-center gap-2">
      <div className="col-span-1 row-span-1 flex flex-col justify-center align-middle">
        <div>
          <h3 className="text-white">Welcome!</h3>
          <h1 className="text-white">Take a look around</h1>
        </div>
        <SomethingWeird />
      </div>
      <div
        className="col-span-1 row-span-1 my-12 flex h-3/4 w-3/4 cursor-pointer flex-col items-center justify-center bg-customOrange "
        onClick={() => handleRoute('work-history')}
      >
        <h5>Work History</h5>
        <div className="relative h-1/2 w-2/3">
          <Image src={workJPG} alt="work jpg" fill className="object-cover" />
        </div>
      </div>
      <div className=" col-span-1 row-span-1 flex h-full w-full flex-col items-center bg-customLightPink">
        <h5>Game</h5>
        <Game handleGameModal={handleGameModal} gameModal={gameModal} />
      </div>
      <div
        className="col-span-1 row-span-1 flex h-full w-1/2 cursor-pointer flex-col items-center justify-center bg-customBlue py-5"
        onClick={() => handleRoute('projects')}
      >
        <h5>Projects</h5>
        <div className="relative w-2/3">
          <Image src={projectJPG} alt="project jpg" className="object-fill" />
        </div>
      </div>
      <div className="col-span-2 row-span-2 bg-customYellow ">
        <h5>Odd</h5>
      </div>
      {gameModal && <Canvas handleGameModal={handleGameModal} />}
    </div>
  );
}

export default Home;
