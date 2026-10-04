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
    <div className="mx-10 flex justify-between">
      <ChevronLeft
        className="text-tertiary cursor-pointer hover:text-white transition-colors duration-300"
        onClick={(): void => navigate(-1)}
      />
      <House
        className={twMerge(
          'text-tertiary cursor-pointer hover:text-white transition-colors duration-300',
          isCurrentRouteHome ? 'text-white' : '',
        )}
        onClick={handleHomeClick}
      />
      <ChevronRight
        className="text-tertiary cursor-pointer hover:text-white transition-colors duration-300"
        onClick={(): void => navigate(1)}
      />
    </div>
  );
};

export default NavButtons;
