import { useEffect, useState } from 'react';
import {
  BriefcaseBusiness,
  Check,
  Code2,
  Gamepad2,
  Globe2,
  Headphones,
  PackagePlus,
  Search,
  SlidersHorizontal,
  Wrench,
} from 'lucide-react';
import { PACKAGES, Package, CATEGORIES, Category } from '../../data/packages';

const CATEGORY_ICONS = {
  Development: Code2,
  Games: Gamepad2,
  Internet: Globe2,
  Multimedia: Headphones,
  Office: BriefcaseBusiness,
  Utilities: Wrench,
};

const Packages: React.FC = (): React.JSX.Element => {
  const [selectedPackages, setSelectedPackages] = useState<Set<string>>(
    new Set(),
  );
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [isInstalling, setIsInstalling] = useState<boolean>(false);
  const [installResult, setInstallResult] = useState<{
    success: boolean;
    message: string;
  } | null>(null);
  const [installProgress, setInstallProgress] = useState<string[]>([]);

  useEffect(() => {
    return window.electron.packages.onInstallProgress((message: string) => {
      setInstallProgress((currentProgress: string[]) => [...currentProgress, message]);
    });
  }, []);

  const visiblePackages = PACKAGES.filter((item) => {
    const searchValue = searchTerm.toLowerCase();
    return (
      item.label.toLowerCase().includes(searchValue) ||
      item.packageName.toLowerCase().includes(searchValue)
    );
  });

  const packagesByCategory = CATEGORIES.reduce<Record<string, Package[]>>(
    (groups, category) => {
      groups[category] = visiblePackages.filter(
        (item) => item.category === category,
      );
      return groups;
    },
    {},
  );

  const togglePackage = (packageName: string): void => {
    setSelectedPackages((currentSelection) => {
      const nextSelection = new Set(currentSelection);
      if (nextSelection.has(packageName)) {
        nextSelection.delete(packageName);
      } else {
        nextSelection.add(packageName);
      }
      return nextSelection;
    });
  };

  const clearSelection = (): void => setSelectedPackages(new Set());

  const installSelectedPackages = async (): Promise<void> => {
    if (selectedPackages.size === 0 || isInstalling) return;

    setInstallResult(null);
    setInstallProgress([]);
    setIsInstalling(true);

    try {
      const result = await window.electron.packages.install(
        Array.from(selectedPackages),
      );
      setInstallResult(result);
      if (result.success) clearSelection();
    } catch (error) {
      setInstallResult({
        success: false,
        message:
          error instanceof Error
            ? error.message
            : 'The package installation could not be completed.',
      });
    } finally {
      setIsInstalling(false);
    }
  };

  return (
    <div className="min-h-screen overflow-y-auto px-6 py-8 text-white lg:px-12 lg:py-10">
      <div className="mx-auto max-w-6xl">
        <header className="mb-8 flex flex-col gap-6 border-b border-white/10 pb-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="mb-4 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-sky-300">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-sky-300/20 bg-sky-300/10">
                <PackagePlus size={17} />
              </span>
              Package manager
            </div>
            <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Build your toolkit
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-white/55 sm:text-base">
              Select the applications and tools you want to add to your system.
              The utility will handle the installation and configuration for
              you.
            </p>
          </div>

          <div className="flex items-center gap-3 self-start rounded-xl border border-white/10 bg-white/4 px-4 py-3 lg:self-end">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-sky-300/10 text-sky-300">
              <PackagePlus size={18} />
            </div>
            <div>
              <p className="text-2xl font-semibold leading-none">
                {selectedPackages.size}
              </p>
              <p className="mt-1 text-xs text-white/45">selected packages</p>
            </div>
          </div>
        </header>

        <div className="mb-8 flex flex-col gap-3 sm:flex-row">
          <label className="relative block flex-1">
            <span className="sr-only">Search packages</span>
            <Search
              size={18}
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-white/35"
            />
            <input
              type="search"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Search by package name..."
              className="h-12 w-full rounded-xl border border-white/10 bg-white/4 pl-11 pr-4 text-sm text-white outline-none transition-colors placeholder:text-white/30 focus:border-sky-300/50 focus:bg-white/7"
            />
          </label>
          <button
            type="button"
            onClick={clearSelection}
            disabled={selectedPackages.size === 0 || isInstalling}
            className="flex h-12 items-center justify-center gap-2 rounded-xl border border-white/10 px-5 text-sm font-medium text-white/60 transition-colors hover:border-white/25 hover:text-white disabled:cursor-not-allowed disabled:opacity-35 cursor-pointer"
          >
            <SlidersHorizontal size={16} />
            Clear selection
          </button>
          <button
            type="button"
            onClick={installSelectedPackages}
            disabled={selectedPackages.size === 0 || isInstalling}
            className="flex h-12 items-center justify-center gap-2 rounded-xl bg-sky-300 px-6 text-sm font-semibold text-slate-950 transition-colors hover:bg-sky-200 disabled:cursor-not-allowed disabled:opacity-35 cursor-pointer"
          >
            <PackagePlus size={17} />
            Install selected
          </button>
        </div>

        {(isInstalling || installResult) && (
          <section
            className={`mb-8 rounded-xl border p-5 ${
              installResult?.success
                ? 'border-emerald-300/30 bg-emerald-300/6'
                : installResult
                  ? 'border-rose-300/30 bg-rose-300/6'
                  : 'border-sky-300/30 bg-sky-300/6'
            }`}
            aria-live="polite"
          >
            <div className="flex items-center gap-3">
              {isInstalling && (
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-sky-200/30 border-t-sky-300" />
              )}
              <h2 className="font-medium">
                {isInstalling
                  ? 'Installing selected packages...'
                  : installResult?.success
                    ? 'Installation complete'
                    : 'Installation failed'}
              </h2>
            </div>
            <p className="mt-2 text-sm text-white/60">
              {isInstalling
                ? 'A polkit permission dialog may appear. Keep this window open while yay works.'
                : installResult?.message}
            </p>
            {installProgress.length > 0 && (
              <div className="mt-4 max-h-32 overflow-y-auto rounded-lg bg-black/20 p-3 font-mono text-xs leading-5 text-white/50">
                {installProgress.map((message, index) => (
                  <p key={`${message}-${index}`}>{message}</p>
                ))}
              </div>
            )}
          </section>
        )}

        <div className="space-y-9 pb-10">
          {CATEGORIES.map((category: Category) => {
            const categoryPackages = packagesByCategory[category];
            if (categoryPackages.length === 0) return null;

            const CategoryIcon = CATEGORY_ICONS[category];
            return (
              <section key={category} aria-labelledby={`${category}-heading`}>
                <div className="mb-4 flex items-center gap-3">
                  <CategoryIcon size={18} className="text-white/50" />
                  <h2
                    id={`${category}-heading`}
                    className="text-sm font-semibold uppercase tracking-[0.16em] text-white/70"
                  >
                    {category}
                  </h2>
                  <span className="h-px flex-1 bg-white/10" />
                  <span className="text-xs text-white/35">
                    {categoryPackages.length}
                  </span>
                </div>

                <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                  {categoryPackages.map((item) => {
                    const isSelected = selectedPackages.has(item.packageName);
                    return (
                      <label
                        key={item.packageName}
                        className={`group flex cursor-pointer items-center gap-4 rounded-xl border p-4 transition-colors ${
                          isSelected
                            ? 'border-sky-300/50 bg-sky-300/9'
                            : 'border-white/10 bg-white/3.5 hover:border-white/25 hover:bg-white/6'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => togglePackage(item.packageName)}
                          className="peer sr-only"
                        />
                        <span
                          className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition-colors ${
                            isSelected
                              ? 'border-sky-300 bg-sky-300 text-slate-950'
                              : 'border-white/25 bg-white/5 text-transparent group-hover:border-white/50'
                          }`}
                        >
                          <Check size={14} strokeWidth={3} />
                        </span>
                        <span className="min-w-0">
                          <span className="block truncate text-sm font-medium text-white/90">
                            {item.label}
                          </span>
                          <span className="mt-1 block truncate font-mono text-xs text-white/35">
                            {item.packageName}
                          </span>
                        </span>
                      </label>
                    );
                  })}
                </div>
              </section>
            );
          })}

          {visiblePackages.length === 0 && (
            <div className="rounded-xl border border-dashed border-white/15 py-16 text-center">
              <Search className="mx-auto mb-3 text-white/30" size={24} />
              <p className="text-sm text-white/60">
                No packages match that search.
              </p>
              <button
                type="button"
                onClick={() => setSearchTerm('')}
                className="mt-3 text-sm font-medium text-sky-300 hover:text-sky-200 cursor-pointer"
              >
                Clear search
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Packages;
