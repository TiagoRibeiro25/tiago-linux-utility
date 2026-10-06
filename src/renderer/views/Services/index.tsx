import { useEffect, useState } from 'react';
import {
  Check,
  CircleGauge,
  ExternalLink,
  Play,
  ServerCog,
  ShieldCheck,
} from 'lucide-react';
import { SERVICES, Service } from '../../data/services';

const Services: React.FC = (): React.JSX.Element => {
  const [selectedServices, setSelectedServices] = useState<Set<string>>(
    new Set(),
  );
  const [isEnabling, setIsEnabling] = useState(false);
  const [enableResult, setEnableResult] = useState<{
    success: boolean;
    message: string;
  } | null>(null);
  const [enableProgress, setEnableProgress] = useState<string[]>([]);

  useEffect(() => {
    return window.electron.services.onEnableProgress((message: string) => {
      setEnableProgress((currentProgress: string[]) => [
        ...currentProgress,
        message,
      ]);
    });
  }, []);

  const toggleService = (serviceName: string): void => {
    setSelectedServices((currentSelection) => {
      const nextSelection = new Set(currentSelection);
      if (nextSelection.has(serviceName)) {
        nextSelection.delete(serviceName);
      } else {
        nextSelection.add(serviceName);
      }
      return nextSelection;
    });
  };

  const clearSelection = (): void => setSelectedServices(new Set());

  const enableSelectedServices = async (): Promise<void> => {
    if (selectedServices.size === 0 || isEnabling) return;

    setEnableResult(null);
    setEnableProgress([]);
    setIsEnabling(true);

    try {
      const result = await window.electron.services.enable(
        Array.from(selectedServices),
      );
      setEnableResult(result);
      if (result.success) clearSelection();
    } catch (error) {
      setEnableResult({
        success: false,
        message:
          error instanceof Error
            ? error.message
            : 'The selected services could not be enabled.',
      });
    } finally {
      setIsEnabling(false);
    }
  };

  return (
    <div className="min-h-screen overflow-y-auto px-6 py-8 text-white lg:px-12 lg:py-10">
      <div className="mx-auto max-w-5xl">
        <header className="mb-8 flex flex-col gap-6 border-b border-white/10 pb-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="mb-4 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-amber-300">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-amber-300/20 bg-amber-300/10">
                <ServerCog size={17} />
              </span>
              Service manager
            </div>
            <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Keep your system ready
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-white/55 sm:text-base">
              Enable the services your setup depends on and start them now in
              one pass. Changes persist across reboots.
            </p>
          </div>

          <div className="flex items-center gap-3 self-start rounded-xl border border-white/10 bg-white/4 px-4 py-3 sm:self-end">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-300/10 text-amber-300">
              <ShieldCheck size={18} />
            </div>
            <div>
              <p className="text-2xl font-semibold leading-none">
                {selectedServices.size}
              </p>
              <p className="mt-1 text-xs text-white/45">selected services</p>
            </div>
          </div>
        </header>

        <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={clearSelection}
            disabled={selectedServices.size === 0 || isEnabling}
            className="flex h-12 cursor-pointer items-center justify-center gap-2 rounded-xl border border-white/10 px-5 text-sm font-medium text-white/60 transition-colors hover:border-white/25 hover:text-white disabled:cursor-not-allowed disabled:opacity-35"
          >
            Clear selection
          </button>
          <button
            type="button"
            onClick={enableSelectedServices}
            disabled={selectedServices.size === 0 || isEnabling}
            className="flex h-12 cursor-pointer items-center justify-center gap-2 rounded-xl bg-amber-300 px-6 text-sm font-semibold text-slate-950 transition-colors hover:bg-amber-200 disabled:cursor-not-allowed disabled:opacity-35"
          >
            <Play size={17} />
            Enable and start selected
          </button>
        </div>

        {(isEnabling || enableResult) && (
          <section
            className={`mb-8 rounded-xl border p-5 ${
              enableResult?.success
                ? 'border-emerald-300/30 bg-emerald-300/6'
                : enableResult
                  ? 'border-rose-300/30 bg-rose-300/6'
                  : 'border-amber-300/30 bg-amber-300/6'
            }`}
            aria-live="polite"
          >
            <div className="flex items-center gap-3">
              {isEnabling && (
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-amber-200/30 border-t-amber-300" />
              )}
              <h2 className="font-medium">
                {isEnabling
                  ? 'Enabling selected services...'
                  : enableResult?.success
                    ? 'Services enabled'
                    : 'Service setup failed'}
              </h2>
            </div>
            <p className="mt-2 text-sm text-white/60">
              {isEnabling
                ? 'A polkit permission dialog may appear. Keep this window open while systemctl works.'
                : enableResult?.message}
            </p>
            {enableProgress.length > 0 && (
              <div className="mt-4 max-h-32 overflow-y-auto rounded-lg bg-black/20 p-3 font-mono text-xs leading-5 text-white/50">
                {enableProgress.map((message, index) => (
                  <p key={`${message}-${index}`}>{message}</p>
                ))}
              </div>
            )}
          </section>
        )}

        <section aria-labelledby="services-heading">
          <div className="mb-4 flex items-center gap-3">
            <CircleGauge size={18} className="text-white/50" />
            <h2
              id="services-heading"
              className="text-sm font-semibold uppercase tracking-[0.16em] text-white/70"
            >
              Available services
            </h2>
            <span className="h-px flex-1 bg-white/10" />
            <span className="text-xs text-white/35">{SERVICES.length}</span>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {SERVICES.map((service: Service) => {
              const isSelected = selectedServices.has(service.serviceName);
              return (
                <label
                  key={service.serviceName}
                  className={`group flex cursor-pointer items-center gap-4 rounded-xl border p-5 transition-colors ${
                    isSelected
                      ? 'border-amber-300/50 bg-amber-300/9'
                      : 'border-white/10 bg-white/3.5 hover:border-white/25 hover:bg-white/6'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => toggleService(service.serviceName)}
                    className="peer sr-only"
                  />
                  <span
                    className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition-colors ${
                      isSelected
                        ? 'border-amber-300 bg-amber-300 text-slate-950'
                        : 'border-white/25 bg-white/5 text-transparent group-hover:border-white/50'
                    }`}
                  >
                    <Check size={14} strokeWidth={3} />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-sm font-medium text-white/90">
                      {service.label}
                    </span>
                    <span className="mt-1 block truncate font-mono text-xs text-white/35">
                      {service.serviceName}
                    </span>
                  </span>
                  <ExternalLink size={15} className="text-white/20" />
                </label>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Services;
