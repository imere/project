import { AnimatePresence, motion, Transition } from 'framer-motion';
import {
  FC,
  useCallback,
} from 'react';
import styled from 'styled-components';
import { useApiBackgroundImage } from '../api/splash';
import { useApiGuestInfo } from '../api/user-info';
import { Background } from '../components/Background';
import { Loading } from '../components/icon/Loading';
import { LoginForm } from '../components/LoginForm';
import { Placeholder } from '../components/Placeholder';
import { IUserInfo, IUserListProps, UserList } from '../components/UserList';
import { useLazyState } from '../hooks/useLazyState';
import type { IDefaultProps } from '../types';

export const LandPage: FC<IDefaultProps> = function () {
  const { data: bg } = useApiBackgroundImage();
  const { data: users, isValidating: guestsLoading } = useApiGuestInfo();

  const [info, setInfo] = useLazyState<IUserInfo | null>(null);

  const handleUserEnter = useCallback<NonNullable<IUserListProps['onUserEnter']>>(function (_, info) {
    setInfo(info);
  }, [setInfo]);

  const handleUserLeave = useCallback<NonNullable<IUserListProps['onUserLeave']>>(function () {
    setInfo(null);
  }, [setInfo]);

  const username = info?.username ?? 'Guest';

  return (
    <Container>

      <Background url={bg?.file_url} />

      <div className="flex-center">
        {
          (guestsLoading && !users)
            ? <Loading className="tw-w-24 tw-h-24" />
            : (
              !users
                ? <UserList
                  users={users ?? []}
                  onUserEnter={handleUserEnter}
                  onUserLeave={handleUserLeave}
                />
                : (
                  <LoginForm />
                )
            )
        }
      </div>

      <SpacingHr />

      <Welcome>
        Welcome,&nbsp;
        <span className="tw-relative">
          <Placeholder>{username}</Placeholder>
          <AnimatePresence>
            <Text
              key={username}
              className="tw-absolute tw-left-0"
              style={{ left: '50%', translateX: '-50%' }}
            >{username}
            </Text>
          </AnimatePresence>
        </span>
      </Welcome>

    </Container>
  );
};

const Container = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
height: 100%;
`;

const SpacingHr = styled.div`
margin-top: 0.25rem;
margin-bottom: 0.25rem;
`;

const Welcome = styled.div`
display: flex;
justify-content: center;
color: ${({ theme: { $text: { primary } } }) => primary};
font-weight: 600;
`;

const transition: Transition = { duration: 0.5, easings: 'easeOut' };

const Text = styled(motion.span).attrs({
  initial: { opacity: 0.5, transition },
  animate: { opacity: 1, transition },
  exit: { opacity: 0 },
})``;
