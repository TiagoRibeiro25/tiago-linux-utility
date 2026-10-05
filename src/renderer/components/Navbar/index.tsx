import { useLocation } from 'react-router';
import cachyOSIcon from '../../../../assets/icons/CachyOS.svg';
import { NAVIGATION_LINKS, NavigationLink } from '../../navigation';
import NavLink from './NavLink';
import NavButtons from './NavButtons';
import { ExternalLink, FolderGit2 } from 'lucide-react';

const Navbar: React.FC = (): React.JSX.Element => {
  const location = useLocation();
  const currentPath = location.pathname;

  const handleGitClick = (): void => {
    window.open('https://github.com/TiagoRibeiro25/tiago-linux-utility', '_blank');
  };

  return (
    <nav className="fixed flex h-full w-50 flex-col overflow-y-auto border-r border-white/5 bg-primary px-3 py-4">
      <div className="mb-8 flex items-center gap-3 px-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 p-1.5">
          <img src={cachyOSIcon} alt="CachyOS" />
        </div>
        <div>
          <h1 className="text-sm font-semibold tracking-wide">CachyOS</h1>
          <p className="mt-0.5 text-[10px] uppercase tracking-[0.16em] text-white/35">
            Linux utility
          </p>
        </div>
      </div>
      <NavButtons isCurrentRouteHome={currentPath === '/'} />
      <div className="mb-3 mt-8 px-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/30">
        Workspace
      </div>
      <div className="flex flex-col gap-1">
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
      <div className="mt-auto border-t border-white/5 px-3 pt-4">
        <button
          type="button"
          title="Open GitHub Repository"
          aria-label="Open GitHub Repository"
          className="flex w-full cursor-pointer items-center justify-between rounded-lg px-3 py-2 text-white/35 transition-colors hover:bg-white/5 hover:text-white/80"
          onClick={handleGitClick}
        >
          <span className="flex items-center gap-3 text-xs font-medium">
            <FolderGit2 size={17} />
            GitHub Repository
          </span>
          <ExternalLink size={13} />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
