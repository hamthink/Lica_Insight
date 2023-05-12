import { useContext } from 'react';

import {
  Box,
  alpha,
  lighten,
  IconButton,
  Tooltip,
  styled,
  useTheme,
  Button,
  Link,
  Typography
} from '@mui/material';
import MenuTwoToneIcon from '@mui/icons-material/MenuTwoTone';
import { SidebarContext } from 'src/contexts/SidebarContext';
import CloseTwoToneIcon from '@mui/icons-material/CloseTwoTone';

import HeaderUserbox from './Userbox';
import Logo from '@/components/Logo';

const HeaderWrapper = styled(Box)(
  ({ theme }) => `
        height: ${theme.header.height};
        color: ${theme.header.textColor};
        padding: ${theme.spacing(0, 2)};
        right: 0;
        z-index: 6;
        background-color: ${alpha(theme.header.background, 0.95)};
        backdrop-filter: blur(3px);
        position: fixed;
        justify-content: space-between;
        width: 100%;
        @media (min-width: ${theme.breakpoints.values.lg}px) {
            left: 0;
            width: auto;
        }
`
);

function Header() {
  const { sidebarToggle, toggleSidebar } = useContext(SidebarContext);
  const theme = useTheme();

  return (
    <HeaderWrapper
      display="flex"
      alignItems="center"
      sx={{
        boxShadow:
          theme.palette.mode === 'dark'
            ? `0 1px 0 ${alpha(
                lighten(theme.colors.primary.main, 0.7),
                0.15
              )}, 0px 2px 8px -3px rgba(0, 0, 0, 0.2), 0px 5px 22px -4px rgba(0, 0, 0, .1)`
            : `0px 2px 8px -3px ${alpha(
                theme.colors.alpha.black[100],
                0.2
              )}, 0px 5px 22px -4px ${alpha(
                theme.colors.alpha.black[100],
                0.1
              )}`
      }}
    >
      <Box
        display="flex"
        justifyContent="space-between"
        flexGrow={1}
        margin="0 auto"
        maxWidth="1200px"
      >
        <Logo />
        <Box display="flex" alignItems="center">
          <Box>
            <Button
              component={Link}
              href="/user/signup"
              variant="contained"
              sx={{ ml: 2 }}
            >
              회원가입
            </Button>
            <Button
              component={Link}
              href="/user/login"
              variant="contained"
              sx={{ ml: 2 }}
            >
              로그인
            </Button>
          </Box>
          <HeaderUserbox />
          <Box
            component="span"
            sx={{
              display: { lg: 'inline-block', xs: 'inline-block' }
            }}
          >
            <Tooltip arrow title="Toggle Menu">
              <IconButton color="primary" onClick={toggleSidebar}>
                {!sidebarToggle ? (
                  <MenuTwoToneIcon fontSize="small" />
                ) : (
                  <CloseTwoToneIcon fontSize="small" />
                )}
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
      </Box>
    </HeaderWrapper>
  );
}

export default Header;
