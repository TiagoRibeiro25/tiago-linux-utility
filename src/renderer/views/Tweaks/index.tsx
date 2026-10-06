import { useEffect, useState } from 'react';
import { Check, RefreshCw, SlidersHorizontal, WandSparkles } from 'lucide-react';
import { TWEAKS } from '../../data/tweaks';

const Tweaks: React.FC = (): React.JSX.Element => {
  const [selectedTweaks, setSelectedTweaks] = useState<Set<number>>(
    new Set(),
  );
  const [isApplying, setIsApplying] = useState(false);
  const [applyResult, setApplyResult] = useState<{
    success: boolean;
    message: string;
  } | null>(null);
  const [applyProgress, setApplyProgress] = useState<string[]>([]);

  useEffect(() => {
    return window.electron.tweaks.onApplyProgress((message: string) => {
      setApplyProgress((currentProgress: string[]) => [
        ...currentProgress,
        message,
      ]);
    });
  }, []);

  const toggleTweak = (tweakIndex: number): void => {
    setSelectedTweaks((currentSelection) => {
      const nextSelection = new Set(currentSelection);
      if (nextSelection.has(tweakIndex)) {
        nextSelection.delete(tweakIndex);
      } else {
        nextSelection.add(tweakIndex);
      }
      return nextSelection;
    });
  };

  const clearSelection = (): void => setSelectedTweaks(new Set());

  const applySelectedTweaks = async (): Promise<void> => {
    if (selectedTweaks.size === 0 || isApplying) return;

    setApplyResult(null);
    setApplyProgress([]);
    setIsApplying(true);

    try {
      const result = await window.electron.tweaks.apply(
        Array.from(selectedTweaks),
      );
      setApplyResult(result);
      if (result.success) clearSelection();
    } catch (error) {
      setApplyResult({
        success: false,
        message:
          error instanceof Error
            ? error.message
            : 'The selected tweaks could not be applied.',
      });
    } finally {
      setIsApplying(false);
    }
  };

  return (
    <div className="min-h-screen overflow-y-auto px-6 py-8 text-white lg:px-12 lg:py-10">
      <div className="mx-auto max-w-5xl">
        <header className="mb-8 flex flex-col gap-6 border-b border-white/10 pb-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="mb-4 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-fuchsia-300">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-fuchsia-300/20 bg-fuchsia-300/10">
                <SlidersHorizontal size={17} />
              </span>
              System tweaks
            </div>
            <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Tune your setup
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-white/55 sm:text-base">
              Apply focused changes that make your Linux environment more
              useful, comfortable, and ready for your workflow.
            </p>
          </div>

          <div className="flex items-center gap-3 self-start rounded-xl border border-white/10 bg-white/4 px-4 py-3 sm:self-end">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-fuchsia-300/10 text-fuchsia-300">
              <WandSparkles size={18} />
            </div>
            <div>
              <p className="text-2xl font-semibold leading-none">
                {selectedTweaks.size}
              </p>
              <p className="mt-1 text-xs text-white/45">selected tweaks</p>
            </div>
          </div>
        </header>

        <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={clearSelection}
            disabled={selectedTweaks.size === 0 || isApplying}
            className="flex h-12 cursor-pointer items-center justify-center gap-2 rounded-xl border border-white/10 px-5 text-sm font-medium text-white/60 transition-colors hover:border-white/25 hover:text-white disabled:cursor-not-allowed disabled:opacity-35"
          >
            Clear selection
          </button>
          <button
            type="button"
            onClick={applySelectedTweaks}
            disabled={selectedTweaks.size === 0 || isApplying}
            className="flex h-12 cursor-pointer items-center justify-center gap-2 rounded-xl bg-fuchsia-300 px-6 text-sm font-semibold text-slate-950 transition-colors hover:bg-fuchsia-200 disabled:cursor-not-allowed disabled:opacity-35"
          >
            <WandSparkles size={17} />
            Apply selected tweaks
          </button>
        </div>

        {(isApplying || applyResult) && (
          <section
            className={`mb-8 rounded-xl border p-5 ${
              applyResult?.success
                ? 'border-emerald-300/30 bg-emerald-300/6'
                : applyResult
                  ? 'border-rose-300/30 bg-rose-300/6'
                  : 'border-fuchsia-300/30 bg-fuchsia-300/6'
            }`}
            aria-live="polite"
          >
            <div className="flex items-center gap-3">
              {isApplying && (
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-fuchsia-200/30 border-t-fuchsia-300" />
              )}
              <h2 className="font-medium">
                {isApplying
                  ? 'Applying selected tweaks...'
                  : applyResult?.success
                    ? 'Tweaks applied'
                    : 'Tweak application failed'}
              </h2>
            </div>
            <p className="mt-2 text-sm text-white/60">
              {isApplying
                ? 'A polkit permission dialog may appear for tweaks that change system settings.'
                : applyResult?.message}
            </p>
            {applyProgress.length > 0 && (
              <div className="mt-4 max-h-32 overflow-y-auto rounded-lg bg-black/20 p-3 font-mono text-xs leading-5 text-white/50">
                {applyProgress.map((message, index) => (
                  <p key={`${message}-${index}`}>{message}</p>
                ))}
              </div>
            )}
          </section>
        )}

        <section aria-labelledby="tweaks-heading">
          <div className="mb-4 flex items-center gap-3">
            <RefreshCw size={18} className="text-white/50" />
            <h2
              id="tweaks-heading"
              className="text-sm font-semibold uppercase tracking-[0.16em] text-white/70"
            >
              Available tweaks
            </h2>
            <span className="h-px flex-1 bg-white/10" />
            <span className="text-xs text-white/35">{TWEAKS.length}</span>
          </div>

          <div className="grid gap-3 lg:grid-cols-2">
            {TWEAKS.map((tweak, tweakIndex) => {
              const isSelected = selectedTweaks.has(tweakIndex);
              return (
                <label
                  key={tweak.label}
                  className={`group flex cursor-pointer items-start gap-4 rounded-xl border p-5 transition-colors ${
                    isSelected
                      ? 'border-fuchsia-300/50 bg-fuchsia-300/9'
                      : 'border-white/10 bg-white/3.5 hover:border-white/25 hover:bg-white/6'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => toggleTweak(tweakIndex)}
                    className="peer sr-only"
                  />
                  <span
                    className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition-colors ${
                      isSelected
                        ? 'border-fuchsia-300 bg-fuchsia-300 text-slate-950'
                        : 'border-white/25 bg-white/5 text-transparent group-hover:border-white/50'
                    }`}
                  >
                    <Check size={14} strokeWidth={3} />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-sm font-medium text-white/90">
                      {tweak.label}
                    </span>
                    <span className="mt-2 block text-sm leading-6 text-white/50">
                      {tweak.description}
                    </span>
                    <span className="mt-3 block truncate font-mono text-xs text-white/30">
                      {tweak.command}
                    </span>
                  </span>
                </label>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Tweaks;
