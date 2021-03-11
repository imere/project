import React, {
  FC,
  PointerEventHandler,
  useCallback,
  useState,
} from 'react';
import type { IDefaultProps } from '../types';
import { classnames } from '../util/classnames';
import { motion } from '../util/reexport';
import { Avatar } from './Avatar';
import { LoginForm } from './LoginForm';

export interface IUserInfo {
  username: string
  avatar?: string
}

export interface IUserListProps extends IDefaultProps {
  users: IUserInfo[]
  onUserEnter?(ev: React.PointerEvent, info: IUserInfo): void
  onUserLeave?(ev: React.PointerEvent, info: IUserInfo): void
}

export const userListItemClassNames = classnames(
  'tw-inline-block',
  'tw-w-24 tw-h-24',
  'tw-ml-2 tw-mr-2'
);

export const UserList: FC<IUserListProps> = function ({ users: guests, onUserEnter, onUserLeave }: IUserListProps) {
  const [translateX, setTranslateX] = useState(0);

  const handlePointerMove: PointerEventHandler = useCallback(function ({ movementX }) {
    setTranslateX(translateX - movementX);
  }, [translateX]);

  const handlePointerLeave: PointerEventHandler = useCallback(function () {
    setTranslateX(0);
  }, []);


  return (
    <motion.div
      style={{ willChange: 'transform' }}
      animate={{ translateX: translateX / 5 }}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      <UserListInternal
        users={guests}
        onPointerEnter={onUserEnter}
        onPointerLeave={onUserLeave}
      />
      <div className={classnames(userListItemClassNames)}>
        <LoginForm />
      </div>
    </motion.div>
  );
};

interface UserListInternalProps {
  users: IUserInfo[]
  onPointerEnter?(ev: React.PointerEvent, user: IUserInfo): void
  onPointerLeave?(ev: React.PointerEvent, user: IUserInfo): void
}

function UserListInternal({ users, onPointerEnter, onPointerLeave }: UserListInternalProps) {
  const handlePointerEnter = useCallback(function (ev, user) {
    onPointerEnter?.(ev, user);
  }, [onPointerEnter]);

  const handlePointerLeave = useCallback(function (ev, user) {
    onPointerLeave?.(ev, user);
  }, [onPointerLeave]);

  return (
    <>
      {users.map(({ username, avatar }) => (
        <motion.div
          key={username}
          className={classnames(
            userListItemClassNames,
            'tw-rounded-full tw-shadow-md',
            'tw-cursor-pointer'
          )}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Avatar
            className={classnames('tw-rounded-full')}
            image={avatar}
            onPointerEnter={ev => handlePointerEnter(ev, { username, avatar })}
            onPointerLeave={ev => handlePointerLeave(ev, { username, avatar })}
          />
        </motion.div>
      ))}
    </>
  );
}
