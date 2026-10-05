import { useNavigate } from 'react-router';
import { twMerge } from 'tailwind-merge';
import { CircleHelp, Cog, Package, Server, SlidersHorizontal } from 'lucide-react';

type Props = {
  path: string;
  label: string;
  isSelected: boolean;
};

const NavLink: React.FC<Props> = ({
  path,
  label,
  isSelected,
}): React.JSX.Element => {
  const navigate = useNavigate();
  const handleClick = (): void => navigate(path);
  const icons = {
    Packages: Package,
    Services: Server,
    Tweaks: SlidersHorizontal,
    About: CircleHelp,
  };
  const Icon = icons[label as keyof typeof icons] ?? Cog;

  return (
    <button
      type="button"
      className={twMerge(
        'group flex h-10 w-full cursor-pointer items-center gap-3 rounded-lg px-3 text-left text-sm font-medium transition-colors duration-200',
        isSelected
          ? 'bg-white/10 text-white shadow-sm'
          : 'text-white/45 hover:bg-white/5 hover:text-white/85',
      )}
      onClick={handleClick}
    >
      <Icon
        size={17}
        className={twMerge(
          'transition-colors',
          isSelected ? 'text-sky-300' : 'text-white/35 group-hover:text-white/70',
        )}
      />
      <span>{label}</span>
    </button>
  );
};

export default NavLink;
