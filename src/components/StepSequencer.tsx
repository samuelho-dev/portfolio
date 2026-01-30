import React, { useEffect, useRef, useState } from 'react';
import * as Tone from 'tone';
import { Sampler, Transport } from 'tone';
import hiHat from 'public/sounds/NAMI_Hi-Hat_Armani.mp3';
import Snare from 'public/sounds/RL_-_Razor_Snare.mp3';
import Kick from 'public/sounds/Slappy_Kick_35.mp3';
import Bongo from 'public/sounds/SD3_BONGO33.mp3';

const notes = [hiHat, Snare, Kick, Bongo];

const makeGrid = (notes: string[]) => {
  return notes.map((note, i) => {
    return Array.from({ length: 8 }, () => {
      return {
        key: `C${3 + i}`,
        note,
        isActive: false,
      };
    });
  });
};
function StepSequencer() {
  const [loaded, setLoaded] = useState(false);
  const [play, setPlay] = useState(false);
  const [tempo, setTempo] = useState(120);
  const stepSequencer = useRef<Tone.Sampler | null>(null);
  const [grid, setGrid] = useState(makeGrid(notes));
  useEffect(() => {
    stepSequencer.current = new Sampler(
      { C3: hiHat, C4: Snare, C5: Kick, C6: Bongo },
      {
        onload: () => setLoaded(true),
        onerror: () => setLoaded(false),
      },
    ).toDestination();
  }, []);

  let beat = 0;
  const handleLoop = () => {
    const repeat = (time: any) => {
      grid.forEach((row, rowIndex) => {
        const note = row[beat];
        if (note.isActive) {
          stepSequencer.current?.triggerAttackRelease(note.key, '8n', time);
        }
      });

      beat = (beat + 1) % 8;
    };

    Transport.bpm.value = tempo;
    Transport.scheduleRepeat(repeat, '8n');
  };

  const handlePlay = () => {
    if (loaded) {
      Tone.start();
      Tone.getDestination().volume.rampTo(-10, 0.0001);
      setLoaded(true);
    }

    if (play) {
      Tone.Transport.cancel();
      Tone.Transport.stop();
      setPlay(false);
    } else {
      handleLoop();
      Tone.Transport.start();
      setPlay(true);
    }
  };

  const handleNoteClick = (rowIdx: number, noteIdx: number) => {
    const copyGrid = [...grid];
    copyGrid[rowIdx][noteIdx].isActive = !copyGrid[rowIdx][noteIdx].isActive;
    setGrid(copyGrid);
  };

  const handleBpmChange = (e: any) => {
    setTempo(e.target.value);
  };

  return (
    <div className="akaiShadow col-span-2 row-span-2 h-fit w-fit items-center justify-between rounded-lg bg-[#D1D2C4] p-5 outline outline-2">
      <div className="flex w-full items-center justify-between gap-8 py-2">
        <h2 className="akaiShadow rounded-lg bg-black bg-opacity-10 px-2 text-xl font-extrabold tracking-tighter text-custom-red outline outline-1 outline-offset-1 outline-black md:text-3xl">
          04 BEATMAKER
        </h2>
        <div className="flex flex-col gap-2 md:flex-row">
          <div className="flex gap-2">
            <label className="whitespace-nowrap text-sm">Tempo :</label>
            <input
              aria-label="tempo"
              type="number"
              className="w-12 px-1 text-sm"
              value={tempo}
              onChange={handleBpmChange}
            />
          </div>
          <button
            onClick={handlePlay}
            className="akaiShadow rounded-lg bg-custom-red px-1 text-custom-white"
          >
            {!play ? 'Play' : 'Pause'}
          </button>
        </div>
      </div>
      <div className="my-1 flex justify-center gap-2 md:gap-4">
        <div className="flex flex-col justify-evenly gap-2 rounded-lg bg-custom-red p-2">
          {['Hat', 'Snare', 'Kick', 'Bongo'].map((drum, i) => (
            <h5
              key={i}
              className="akaiShadow rounded-md bg-custom-purple px-1 text-center text-sm md:text-lg"
            >
              {drum}
            </h5>
          ))}
        </div>
        <div className="flex flex-col justify-center ">
          {grid.map((col, rowIdx) => (
            <div key={rowIdx} className="flex gap-2 py-2 md:gap-4">
              {col.map((note, noteIdx) => (
                <button
                  disabled={!loaded}
                  aria-label="note"
                  className={`akaiShadow h-6 w-6 border border-[#78797D] md:h-8 md:w-8 ${
                    note.isActive
                      ? 'rounded-lg bg-[#78797D]'
                      : 'rounded-md bg-[#c2c3c9]'
                  }`}
                  onClick={() => handleNoteClick(rowIdx, noteIdx)}
                  key={`note-${rowIdx}-${noteIdx}`}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default StepSequencer;
