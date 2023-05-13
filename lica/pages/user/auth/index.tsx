import BaseLayout from '@/layouts/BaseLayout';
import { Box } from '@mui/material';
import { authState } from 'atoms';
import { ReactElement } from 'react';
import { useRecoilValue } from 'recoil';

function Auth() {
  const { isLoggedIn, accessToken } = useRecoilValue(authState);

  if (!isLoggedIn) {
    return <div>로그인 안됨</div>;
  }

  return (
    <Box>
      <h1>Auth Page</h1>
      <p>Access Token : {accessToken}</p>
    </Box>
  );
}

Auth.getLayout = function getLayout(page: ReactElement) {
  return <BaseLayout>{page}</BaseLayout>;
};

export default Auth;
