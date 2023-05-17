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
        padding-left: ${theme.spacing(2)};
        
`
);

const LogoText = styled(Box)(
  ({ theme }) => `
        font-size: ${theme.typography.pxToRem(30)};
        font-weight: ${theme.typography.fontWeightBold};
        margin: 0 auto;
        display: flex;
`
);

function Logo() {
  return (
    <LogoWrapper href="/">
      <Box sx={{ mt: 0.5 }}>
        <CardMedia
          component="img"
          sx={{ width: 50 }}
          image="/static/images/logo/footprint.png"
          alt="LiCa LOGO"
        />
      </Box>
      <Box
        component="span"
        sx={{ display: { xs: 'none', sm: 'inline-block' }, mt: 0.7 }}
      >
        <LogoTextWrapper>
          <LogoText>LiCa</LogoText>
        </LogoTextWrapper>
      </Box>
    </LogoWrapper>
  );
}

export default Logo;
