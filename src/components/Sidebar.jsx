import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import SimpleDropdown from './global/SimpleDropdown.jsx';
import { useAuth } from '../lib/hooks/use-auth.jsx';
import { cn, firstUpperCase } from '../lib/utils.js';
import {
  TbHome2,
  TbLogout,
  TbStack2,
  TbUsers,
  TbArrowsLeftRight,
} from 'react-icons/tb';
import Image from './Image.jsx';

const links = [
  { name: 'Overview', to: '/', icon: <TbHome2 size="20" /> },
  { name: 'Collections', to: '/collections', icon: <TbStack2 size="20" /> },
  { name: 'Transactions', to: '/transactions', icon: <TbArrowsLeftRight size="20" /> },
  { name: 'Users', to: '/users', icon: <TbUsers size="20" /> },
];

const Sidebar = () => {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout(window.location.href);
  };

  const filteredLink = user.role === 'admin' ? links : links.filter((link) => link.to !== '/users' && link.to !== '/predict');

  return (
    <div className="h-screen border-r border-zinc-300 flex flex-col">
      <p className="pt-10 pb-12 px-14 text-lg inline-flex items-center">
        <Image src={"/gufaith-logo.png"} alt="logo" className="w-10 h-10" /> <span className="text-2xl font-medium italic px-1 text-blue-800">GuFaith</span>
      </p>
      <div className="flex flex-col space-y-2 flex-1 px-10">
        {filteredLink.map((link) => (
          <NavLinkItem key={link.to} link={link} />
        ))}
      </div>
      <div className="mt-auto py-4 px-6 md:px-6">
        <SimpleDropdown
          direction="right-bottom"
          trigger={
            <div
              className={cn(
                'flex items-center space-x-4 hover:bg-gray-200/50! rounded-2xl px-5 py-4 transition-all w-full'
              )}
            >
              <img
                src={`https://ui-avatars.com/api/?name=${firstUpperCase(user.firstName)} ${firstUpperCase(user.lastName)}`}
                className="w-8 h-8 rounded-full"
                alt={`${user.firstName} ${user.lastName}`}
              />
              <div className="text-left">
                <div className="leading-none">
                  {firstUpperCase(user.firstName)} {firstUpperCase(user.lastName)}
                </div>
                <div className="text-sm opacity-75 leading-none mt-1">{user.phone}</div>
              </div>
            </div>
          }
          items={[{ text: 'Logout', icon: <TbLogout size="18" />, onClick: handleLogout }]}
        />
      </div>
    </div>
  );
};

const NavLinkItem = ({ link }) => (
  <NavLink to={link.to}>
    {({ isActive }) => (
      <div
        className={cn(
          'px-6 py-3 rounded-xl transition-all duration-200 flex items-center',
          { 'bg-blue-200 font-medium': isActive },
          { 'bg-transparent hover:bg-zinc-100': !isActive }
        )}
      >
        <div className="mr-3">{link.icon}</div>
        {link.name}
      </div>
    )}
  </NavLink>
);

NavLinkItem.propTypes = {
  link: PropTypes.shape({
    to: PropTypes.string.isRequired,
    icon: PropTypes.node.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
};

export default Sidebar;
