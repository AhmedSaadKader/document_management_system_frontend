import React from 'react';
import { IconButton, Menu, MenuItem } from '@mui/material';
import { AccountCircle } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

interface UserMenuProps {
  anchorEl: null | HTMLElement;
  handleMenu: (event: React.MouseEvent<HTMLElement>) => void;
  handleClose: () => void;
  handleSignOut: () => void;
}

const UserMenu: React.FC<UserMenuProps> = ({
  anchorEl,
  handleMenu,
  handleClose,
  handleSignOut,
}) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleProfileClick = () => {
    navigate('/profile');
    handleClose();
  };

  return (
    <div>
      <IconButton
        size='large'
        aria-label='account of current user'
        aria-controls='menu-appbar'
        aria-haspopup='true'
        onClick={handleMenu}
        color='inherit'
      >
        <AccountCircle />
      </IconButton>
      <Menu
        id='menu-appbar'
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleProfileClick}>
          {t('userMenu.profile')}
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleClose();
            handleSignOut();
          }}
        >
          {t('userMenu.logout')}
        </MenuItem>
      </Menu>
    </div>
  );
};

export default UserMenu;
