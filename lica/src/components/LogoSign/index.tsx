import {
  Box,
  Tooltip,
  TooltipProps,
  tooltipClasses,
  styled,
  CardMedia,
  Typography
} from '@mui/material';
import Link from 'src/components/Link';

const LogoWrapper = styled(Link)(
  ({ theme }) => `
        color: ${theme.palette.text.primary};
        display: flex;
        text-decoration: none;
        width: 53px;
        margin: 0 auto;
        font-weight: ${theme.typography.fontWeightBold};
`
);

const TooltipWrapper = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.colors.alpha.trueWhite[100],
    color: theme.palette.getContrastText(theme.colors.alpha.trueWhite[100]),
    fontSize: theme.typography.pxToRem(12),
    fontWeight: 'bold',
    borderRadius: theme.general.borderRadiusSm,
    boxShadow:
      '0 .2rem .8rem rgba(7,9,25,.18), 0 .08rem .15rem rgba(7,9,25,.15)'
  },
  [`& .${tooltipClasses.arrow}`]: {
    color: theme.colors.alpha.trueWhite[100]
  }
}));

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
        color: ${theme.colors.alpha.white[70]};
`
);

function Logo() {
  return (
    <TooltipWrapper title="LiCa" arrow>
      <LogoWrapper href="/">
        <CardMedia
          component="img"
          sx={{ width: 50 }}
          image="/static/images/logo/footprint_sidebar.png"
          alt="LiCa LOGO"
        />
        <Box />
        <Box
          component="span"
          sx={{ display: { xs: 'none', sm: 'inline-block' }, mt: 0.7 }}
        >
          <LogoTextWrapper>
            <LogoText>LiCa</LogoText>
          </LogoTextWrapper>
        </Box>
      </LogoWrapper>
    </TooltipWrapper>
  );
}

export default Logo;
