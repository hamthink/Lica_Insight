import { Box, CardMedia, styled } from '@mui/material';
import Link from 'src/components/Link';

const LogoWrapper = styled(Link)(
  ({ theme }) => `
        color: ${theme.palette.text.primary};
        padding: ${theme.spacing(0, 1, 0, 0)};
        display: flex;
        text-decoration: none;
        font-weight: ${theme.typography.fontWeightBold};

        &:hover {
          text-decoration: none;
        }
`
);

const LogoTextWrapper = styled(Box)(
  ({ theme }) => `
        padding-left: ${theme.spacing(1)};
`
);

const LogoText = styled(Box)(
  ({ theme }) => `
        font-size: ${theme.typography.pxToRem(30)};
        font-weight: ${theme.typography.fontWeightBold};
`
);

function Logo() {
  return (
    <LogoWrapper href="/">
      <CardMedia
        component="img"
        sx={{ width: 50 }}
        image="/static/images/logo/footprint.png"
        alt="LiCa LOGO"
      />
      <Box
        component="span"
        sx={{ display: { xs: 'none', sm: 'inline-block' } }}
      >
        <LogoTextWrapper>
          <LogoText>LiCa</LogoText>
        </LogoTextWrapper>
      </Box>
    </LogoWrapper>
  );
}

export default Logo;
