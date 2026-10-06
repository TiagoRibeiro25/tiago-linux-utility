import {
  ArrowUpRight,
  Code2,
  FolderGit2,
  Heart,
  PackageCheck,
  ServerCog,
  SlidersHorizontal,
  Terminal,
} from 'lucide-react';

const About: React.FC = (): React.JSX.Element => {
  const openExternal = (url: string): void => {
    window.open(url, '_blank');
  };

  return (
    <div className="min-h-screen overflow-y-auto px-8 py-10 text-white lg:px-14 lg:py-14">
      <div className="mx-auto max-w-5xl">
        <header className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/4 p-8 sm:p-10">
          <div className="absolute right-8 top-8 text-white/10 sm:right-12 sm:top-10">
            <Terminal size={112} strokeWidth={1} />
          </div>
          <div className="relative max-w-2xl">
            <div className="mb-5 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-sky-300">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-sky-300/20 bg-sky-300/10">
                <Code2 size={17} />
              </span>
              About the utility
            </div>
            <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
              Tiago Linux Utility
            </h1>
            <p className="mt-5 max-w-xl text-base leading-7 text-white/60 sm:text-lg">
              A focused control center for keeping your Linux system ready.
              Install what you need, manage what is running, and tune the small
              things that make a big difference.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() =>
                  openExternal(
                    'https://github.com/TiagoRibeiro25/tiago-linux-utility',
                  )
                }
                className="flex cursor-pointer items-center gap-2 rounded-lg bg-white px-4 py-2.5 text-sm font-semibold text-slate-950 transition-colors hover:bg-sky-100"
              >
                <FolderGit2 size={17} />
                View repository
                <ArrowUpRight size={15} />
              </button>
              <button
                type="button"
                onClick={() =>
                  openExternal('https://github.com/TiagoRibeiro25')
                }
                className="flex cursor-pointer items-center gap-2 rounded-lg border border-white/15 px-4 py-2.5 text-sm font-medium text-white/75 transition-colors hover:border-white/30 hover:text-white"
              >
                Tiago Ribeiro
                <ArrowUpRight size={15} />
              </button>
            </div>
          </div>
        </header>

        <section className="mt-10" aria-labelledby="capabilities-heading">
          <div className="mb-5 flex items-end justify-between gap-4">
            <div>
              <p className="text-sm font-medium text-sky-300">What it does</p>
              <h2
                id="capabilities-heading"
                className="mt-1 text-2xl font-medium"
              >
                Small controls, less friction.
              </h2>
            </div>
            <Heart size={18} className="text-rose-300/70" />
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <article className="rounded-xl border border-white/10 bg-white/3.5 p-5">
              <PackageCheck className="text-sky-300" size={21} />
              <h3 className="mt-5 font-medium">Package setup</h3>
              <p className="mt-2 text-sm leading-6 text-white/50">
                Select the tools you need and install them through yay with a
                visible progress flow.
              </p>
            </article>
            <article className="rounded-xl border border-white/10 bg-white/3.5 p-5">
              <ServerCog className="text-amber-300" size={21} />
              <h3 className="mt-5 font-medium">Service control</h3>
              <p className="mt-2 text-sm leading-6 text-white/50">
                Enable and start system services together, with polkit handling
                administrator access.
              </p>
            </article>
            <article className="rounded-xl border border-white/10 bg-white/3.5 p-5">
              <SlidersHorizontal className="text-fuchsia-300" size={21} />
              <h3 className="mt-5 font-medium">Useful tweaks</h3>
              <p className="mt-2 text-sm leading-6 text-white/50">
                Apply focused system adjustments while keeping each command
                visible before it runs.
              </p>
            </article>
          </div>
        </section>

        <footer className="mt-10 flex flex-col gap-3 border-t border-white/10 pt-5 text-sm text-white/40 sm:flex-row sm:items-center sm:justify-between">
          <p>
            Built by <span className="text-white/70">Tiago Ribeiro</span> for a
            more personal Linux setup.
          </p>
          <button
            type="button"
            onClick={() => openExternal('https://github.com/TiagoRibeiro25')}
            className="flex w-fit cursor-pointer items-center gap-2 text-white/50 transition-colors hover:text-white"
          >
            <FolderGit2 size={16} />
            @TiagoRibeiro25
          </button>
        </footer>
      </div>
    </div>
  );
};

export default About;
