import { useLocation } from 'react-router';
import cachyOSIcon from '../../../../assets/icons/CachyOS.svg';
import { NAVIGATION_LINKS, NavigationLink } from '../../navigation';
import NavLink from './NavLink';
import NavButtons from './NavButtons';
import { FolderGit2 } from 'lucide-react';

const Navbar: React.FC = (): React.JSX.Element => {
  const location = useLocation();
  const currentPath = location.pathname;

  const handleGitClick = (): void => {
    window.open('https://github.com/TiagoRibeiro25', '_blank');
  };

  return (
    <nav className="fixed flex flex-col w-50 h-full overflow-y-auto">
      <div className="mt-5 mb-8 flex flex-col items-center">
        <img width={100} src={cachyOSIcon} alt="CachyOS" />
        <h1 className="text-2xl">CachyOS</h1>
      </div>
      <NavButtons isCurrentRouteHome={currentPath === '/'} />
      <div className="my-6 flex flex-col items-center space-y-5">
        {NAVIGATION_LINKS.map(
          (link: NavigationLink) =>
            !link.hidden && (
              <NavLink
                key={link.path}
                path={link.path}
                label={link.name}
                isSelected={currentPath === link.path}
              />
            ),
        )}
      </div>
      <div className="mt-auto flex justify-center items-center p-5">
        <FolderGit2
          className="text-tertiary hover:text-white transition-colors duration-300 cursor-pointer"
          onClick={handleGitClick}
        />
      </div>
    </nav>
  );
};

export default Navbar;
