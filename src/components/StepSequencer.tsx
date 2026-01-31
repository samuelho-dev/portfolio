import { useEffect, useRef, useState } from 'react';
import * as Tone from 'tone';
import { Sampler, Transport } from 'tone';
import { FiPlay, FiPause } from 'react-icons/fi';

const hiHat = '/sounds/NAMI_Hi-Hat_Armani.mp3';
const Snare = '/sounds/RL_-_Razor_Snare.mp3';
const Kick = '/sounds/Slappy_Kick_35.mp3';
const Bongo = '/sounds/SD3_BONGO33.mp3';

const notes = [hiHat, Snare, Kick, Bongo];
const drumLabels = ['HAT', 'SNR', 'KCK', 'PRC'];

type GridMode = '8n' | '16n';

interface GridNote {
  key: string;
  note: string;
  isActive: boolean;
}

const makeGrid = (noteList: string[], steps: number): GridNote[][] => {
  return noteList.map((note, i) => {
    return Array.from({ length: steps }, () => ({
      key: `C${3 + i}`,
      note,
      isActive: false,
    }));
  });
};

const PAD_SIZE = 44;
const PAD_GAP = 6;

function StepSequencer() {
  const [loaded, setLoaded] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [tempo, setTempo] = useState(120);
  const [currentStep, setCurrentStep] = useState(-1);
  const [gridMode, setGridMode] = useState<GridMode>('8n');
  const stepSequencer = useRef<Tone.Sampler | null>(null);

  const stepCount = gridMode === '8n' ? 8 : 16;
  const [grid, setGrid] = useState<GridNote[][]>(() => makeGrid(notes, 8));
  const gridRef = useRef(grid);
  const beatRef = useRef(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gridRef.current = grid;
  }, [grid]);

  const handleGridModeChange = () => {
    const newMode = gridMode === '8n' ? '16n' : '8n';

    if (playing) {
      Tone.Transport.cancel();
      Tone.Transport.stop();
      setPlaying(false);
    }

    beatRef.current = 0;
    setCurrentStep(-1);
    setGridMode(newMode);

    const newStepCount = newMode === '8n' ? 8 : 16;
    setGrid((prevGrid) => {
      return prevGrid.map((row) => {
        return Array.from({ length: newStepCount }, (_, stepIdx) => ({
          key: row[0].key,
          note: row[0].note,
          isActive: stepIdx < row.length ? row[stepIdx].isActive : false,
        }));
      });
    });

    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft = 0;
    }
  };

  useEffect(() => {
    stepSequencer.current = new Sampler(
      { C3: hiHat, C4: Snare, C5: Kick, C6: Bongo },
      {
        onload: () => setLoaded(true),
        onerror: () => setLoaded(false),
      }
    ).toDestination();

    return () => {
      Tone.Transport.cancel();
      Tone.Transport.stop();
    };
  }, []);

  const handleLoop = () => {
    const currentStepCount = gridRef.current[0]?.length || 8;
    const noteValue = currentStepCount === 16 ? '16n' : '8n';

    const repeat = (time: number) => {
      gridRef.current.forEach((row) => {
        const note = row[beatRef.current];
        if (note?.isActive) {
          stepSequencer.current?.triggerAttackRelease(note.key, noteValue, time);
        }
      });
      setCurrentStep(beatRef.current);
      beatRef.current = (beatRef.current + 1) % currentStepCount;
    };

    Transport.bpm.value = tempo;
    Transport.scheduleRepeat(repeat, noteValue);
  };

  const handlePlay = async () => {
    if (!loaded) return;

    await Tone.start();
    Tone.getDestination().volume.rampTo(-10, 0.001);

    if (playing) {
      Tone.Transport.cancel();
      Tone.Transport.stop();
      beatRef.current = 0;
      setCurrentStep(-1);
      setPlaying(false);
    } else {
      handleLoop();
      Tone.Transport.start();
      setPlaying(true);
    }
  };

  const handleNoteClick = (rowIdx: number, noteIdx: number) => {
    setGrid((prevGrid) => {
      const newGrid = prevGrid.map((row, rIdx) =>
        row.map((note, nIdx) => {
          if (rIdx === rowIdx && nIdx === noteIdx) {
            return { ...note, isActive: !note.isActive };
          }
          return note;
        })
      );
      return newGrid;
    });
  };

  const handleTempoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTempo = parseInt(e.target.value, 10);
    if (!isNaN(newTempo) && newTempo >= 60 && newTempo <= 200) {
      setTempo(newTempo);
      Transport.bpm.value = newTempo;
    }
  };

  const gridWidth = stepCount * PAD_SIZE + (stepCount - 1) * PAD_GAP;

  return (
    <div className="relative w-full max-w-lg">
      {/* Main Container */}
      <div className="overflow-hidden rounded-2xl border border-white/[0.08] bg-[#18181b]">
        {/* Header - Minimal */}
        <div className="flex items-center justify-between border-b border-white/[0.06] px-4 py-3">
          <div className="flex items-center gap-3">
            {/* Play Button */}
            <button
              onClick={handlePlay}
              disabled={!loaded}
              className={`group flex h-10 w-10 items-center justify-center rounded-full transition-all duration-150 ${
                playing
                  ? 'bg-orange-500 text-white shadow-[0_0_20px_rgba(249,115,22,0.3)]'
                  : 'bg-white/[0.06] text-white/50 hover:bg-white/[0.1] hover:text-white'
              } ${!loaded ? 'cursor-not-allowed opacity-40' : ''}`}
              aria-label={playing ? 'Pause' : 'Play'}
            >
              {playing ? (
                <FiPause className="h-4 w-4" />
              ) : (
                <FiPlay className="ml-0.5 h-4 w-4" />
              )}
            </button>

            {/* Status dot */}
            <div className="flex items-center gap-2">
              <div
                className={`h-1.5 w-1.5 rounded-full transition-colors ${
                  !loaded ? 'bg-white/20' : playing ? 'bg-orange-500 animate-pulse' : 'bg-emerald-500'
                }`}
              />
              <span className="text-xs font-medium text-white/40">
                {!loaded ? 'Loading' : playing ? 'Playing' : 'Ready'}
              </span>
            </div>
          </div>

          {/* BPM */}
          <div className="flex items-center gap-1.5">
            <input
              type="number"
              min={60}
              max={200}
              value={tempo}
              onChange={handleTempoChange}
              className="seq-bpm-input w-10 bg-transparent text-right text-sm font-semibold tabular-nums text-white focus:outline-none"
              aria-label="Tempo"
            />
            <span className="text-[0.65rem] font-medium uppercase tracking-wider text-white/30">
              bpm
            </span>
          </div>
        </div>

        {/* Grid Area */}
        <div className="relative px-4 py-4">
          <div className="flex gap-2">
            {/* Labels */}
            <div className="flex w-8 flex-shrink-0 flex-col pt-4" style={{ gap: PAD_GAP }}>
              {drumLabels.map((label, i) => (
                <div
                  key={i}
                  className="flex items-center justify-end"
                  style={{ height: PAD_SIZE }}
                >
                  <span
                    className="seq-label text-[0.6rem] font-bold uppercase tracking-wider"
                    data-row={i}
                  >
                    {label}
                  </span>
                </div>
              ))}
            </div>

            {/* Scrollable Grid */}
            <div className="relative flex-1 overflow-hidden">
              {/* Scroll fade indicator for 16th mode */}
              {gridMode === '16n' && (
                <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-8 bg-gradient-to-l from-[#18181b] to-transparent" />
              )}

              <div
                ref={scrollContainerRef}
                className="seq-scroll-hide overflow-x-auto"
              >
                <div style={{ width: gridWidth }}>
                  {/* Step dots */}
                  <div className="mb-2 flex" style={{ gap: PAD_GAP }}>
                    {Array.from({ length: stepCount }, (_, i) => (
                      <div
                        key={i}
                        className="flex justify-center"
                        style={{ width: PAD_SIZE }}
                      >
                        <div
                          className={`h-1 w-1 rounded-full transition-all duration-75 ${
                            currentStep === i
                              ? 'bg-white shadow-[0_0_6px_rgba(255,255,255,0.8)]'
                              : 'bg-white/15'
                          }`}
                        />
                      </div>
                    ))}
                  </div>

                  {/* Pads */}
                  <div className="flex flex-col" style={{ gap: PAD_GAP }}>
                    {grid.map((row, rowIdx) => (
                      <div key={rowIdx} className="flex" style={{ gap: PAD_GAP }}>
                        {row.map((note, noteIdx) => (
                          <button
                            key={`${rowIdx}-${noteIdx}`}
                            disabled={!loaded}
                            onClick={() => handleNoteClick(rowIdx, noteIdx)}
                            data-row={rowIdx}
                            style={{ width: PAD_SIZE, height: PAD_SIZE }}
                            className={`seq-pad flex-shrink-0 rounded-lg border transition-all duration-75 ${
                              note.isActive
                                ? 'active border-transparent'
                                : 'border-white/[0.08] bg-white/[0.03] hover:border-white/[0.15] hover:bg-white/[0.06]'
                            } ${currentStep === noteIdx ? 'current-step' : ''} ${
                              !loaded ? 'cursor-not-allowed opacity-40' : 'cursor-pointer'
                            }`}
                            aria-label={`${drumLabels[rowIdx]} step ${noteIdx + 1}`}
                          />
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer - Step count toggle */}
        <div className="flex items-center justify-end border-t border-white/[0.06] px-4 py-2.5">
          <button
            onClick={handleGridModeChange}
            className="flex items-center gap-1.5 rounded-full bg-white/[0.05] px-3 py-1.5 text-[0.65rem] font-semibold uppercase tracking-wider text-white/50 transition-all hover:bg-white/[0.08] hover:text-white/70"
          >
            <span className="tabular-nums">{stepCount}</span>
            <span>steps</span>
            <svg
              className="h-3 w-3 text-white/30"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default StepSequencer;
