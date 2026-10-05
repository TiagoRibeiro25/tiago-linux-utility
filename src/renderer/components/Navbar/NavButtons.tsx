import { ChevronLeft, ChevronRight, House } from 'lucide-react';
import React from 'react';
import { useNavigate } from 'react-router';
import { twMerge } from 'tailwind-merge';

type Props = {
  isCurrentRouteHome: boolean;
};

const NavButtons: React.FC<Props> = ({
  isCurrentRouteHome,
}): React.JSX.Element => {
  const navigate = useNavigate();

  const handleHomeClick = (): void => {
    if (!isCurrentRouteHome) {
      navigate('/');
    }
  };

  return (
    <div className="flex items-center justify-between rounded-lg border border-white/5 bg-white/[0.03] px-1 py-1">
      <button
        type="button"
        title="Go back"
        aria-label="Go back"
        className="cursor-pointer rounded-md p-1 text-white/35 transition-colors hover:bg-white/10 hover:text-white"
        onClick={(): void => navigate(-1)}
      >
        <ChevronLeft size={17} />
      </button>
      <button
        type="button"
        title="Home"
        aria-label="Home"
        className={twMerge(
          'cursor-pointer rounded-md p-1 transition-colors hover:bg-white/10 hover:text-white',
          isCurrentRouteHome ? 'bg-white/10 text-white' : 'text-white/35',
        )}
        onClick={handleHomeClick}
      >
        <House size={17} />
      </button>
      <button
        type="button"
        title="Go forward"
        aria-label="Go forward"
        className="cursor-pointer rounded-md p-1 text-white/35 transition-colors hover:bg-white/10 hover:text-white"
        onClick={(): void => navigate(1)}
      >
        <ChevronRight size={17} />
      </button>
    </div>
  );
};

export default NavButtons;
