import {
  ArrowUpRight,
  PackageCheck,
  ServerCog,
  SlidersHorizontal,
  Terminal,
} from 'lucide-react';
import { useNavigate } from 'react-router';

const Home: React.FC = (): React.JSX.Element => {
  const navigate = useNavigate();

  const handlePackageManagerClick = () => navigate('/packages');
  const handleServiceManagerClick = () => navigate('/services');
  const handleTweaksClick = () => navigate('/tweaks');

  return (
    <div className="min-h-screen overflow-y-auto px-8 py-10 text-white lg:px-14 lg:py-14">
      <div className="mx-auto max-w-6xl">
        <header className="flex flex-col gap-8 border-b border-white/10 pb-10 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <div className="mb-5 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-300">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-emerald-300/20 bg-emerald-300/10">
                <Terminal size={16} />
              </span>
              System utility
            </div>
            <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
              Tiago Linux Utility
            </h1>
            <p className="mt-5 max-w-xl text-base leading-7 text-white/60 sm:text-lg">
              A focused control center for keeping your Linux system ready.
              Install what you need, manage what is running, and tune the small
              things that make a big difference.
              <br />
              <br />
              This utility is designed for CachyOS, although not tested, it may
              work on other Arch-based distributions.
            </p>
          </div>

          <div className="flex shrink-0 items-center gap-3 self-start rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/70 md:self-end">
            <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.8)]" />
            Ready to configure
          </div>
        </header>

        <section className="pt-10" aria-labelledby="toolkit-heading">
          <div className="mb-5 flex items-end justify-between gap-4">
            <div>
              <p className="text-sm font-medium text-emerald-300">
                Your toolkit
              </p>
              <h2 id="toolkit-heading" className="mt-1 text-2xl font-medium">
                Make Linux feel like yours.
              </h2>
            </div>
            <span className="hidden text-sm text-white/40 sm:block">
              3 areas to explore
            </span>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <article className="group flex min-h-56 flex-col justify-between rounded-2xl border border-white/10 bg-white/4.5 p-6 transition-colors duration-300 hover:border-sky-300/40 hover:bg-sky-300/7">
              <div>
                <div className="mb-7 flex h-11 w-11 items-center justify-center rounded-xl bg-sky-300/10 text-sky-300">
                  <PackageCheck size={22} />
                </div>
                <h3 className="text-xl font-medium">Install packages</h3>
                <p className="mt-2 text-sm leading-6 text-white/50">
                  Find and add the tools your workflow needs without leaving the
                  utility.
                </p>
              </div>
              <button
                type="button"
                className="mt-7 flex items-center gap-2 text-sm font-medium text-sky-300 cursor-pointer group-hover:underline group-hover:underline-offset-4"
                onClick={handlePackageManagerClick}
              >
                Package manager{' '}
                <ArrowUpRight
                  size={16}
                  className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </button>
            </article>

            <article className="group flex min-h-56 flex-col justify-between rounded-2xl border border-white/10 bg-white/4.5 p-6 transition-colors duration-300 hover:border-amber-300/40 hover:bg-amber-300/7">
              <div>
                <div className="mb-7 flex h-11 w-11 items-center justify-center rounded-xl bg-amber-300/10 text-amber-300">
                  <ServerCog size={22} />
                </div>
                <h3 className="text-xl font-medium">Enable services</h3>
                <p className="mt-2 text-sm leading-6 text-white/50">
                  See what is active, start what is useful, and keep your system
                  in control.
                </p>
              </div>
              <button
                type="button"
                className="mt-7 flex items-center gap-2 text-sm font-medium text-amber-300 cursor-pointer group-hover:underline group-hover:underline-offset-4"
                onClick={handleServiceManagerClick}
              >
                Service manager{' '}
                <ArrowUpRight
                  size={16}
                  className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </button>
            </article>

            <article className="group flex min-h-56 flex-col justify-between rounded-2xl border border-white/10 bg-white/4.5 p-6 transition-colors duration-300 hover:border-fuchsia-300/40 hover:bg-fuchsia-300/7">
              <div>
                <div className="mb-7 flex h-11 w-11 items-center justify-center rounded-xl bg-fuchsia-300/10 text-fuchsia-300">
                  <SlidersHorizontal size={22} />
                </div>
                <h3 className="text-xl font-medium">Handle tweaks</h3>
                <p className="mt-2 text-sm leading-6 text-white/50">
                  Adjust practical system settings and shape a setup that works
                  your way.
                </p>
              </div>
              <button
                type="button"
                className="mt-7 flex items-center gap-2 text-sm font-medium text-fuchsia-300 cursor-pointer group-hover:underline group-hover:underline-offset-4"
                onClick={handleTweaksClick}
              >
                System tuning{' '}
                <ArrowUpRight
                  size={16}
                  className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </button>
            </article>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;
