import { useNavigate } from 'react-router';
import { twMerge } from 'tailwind-merge';

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

  return (
    <button
      type="button"
      className={twMerge(
        'cursor-pointer border rounded-md w-30 h-10 border-tertiary hover:bg-tertiary transition-colors duration-300',
        isSelected && 'bg-tertiary',
      )}
      onClick={handleClick}
    >
      {label}
    </button>
  );
};

export default NavLink;
