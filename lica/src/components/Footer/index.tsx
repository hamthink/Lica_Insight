import { Box, Container, Typography, styled } from '@mui/material';

const FooterWrapper = styled(Container)(
  ({ theme }) => `
        margin-top: ${theme.spacing(4)};
`
);

function Footer() {
  return (
    <FooterWrapper className="footer-wrapper">
      <Box
        sx={{ display: 'flex', justifyContent: 'center' }}
        pb={4}
        display={{ xs: 'block', md: 'flex' }}
        alignItems="center"
        textAlign={{ xs: 'center', md: 'left' }}
        justifyContent="space-between"
      >
        <Typography variant="subtitle1">
          Copyright &copy; 이선생 - LiCa Insight 2023
        </Typography>
      </Box>
    </FooterWrapper>
  );
}

export default Footer;
