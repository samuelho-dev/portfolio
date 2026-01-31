import Projects from '@/components/Projects';
import WorkHistory from '@/components/WorkHistory';

function Work() {
  return (
    <div className="flex flex-col gap-24">
      <WorkHistory />
      <Projects />
    </div>
  );
}

export default Work;
