import { IDefaultProps } from '@packages/client/types';
import { classnames } from '@packages/client/util/classnames';
import { HTMLMotionProps, motion } from 'framer-motion';
import { FC } from 'react';
import { createPortal } from 'react-dom';

interface IProps extends HTMLMotionProps<'div'> {
  selector?: string
  header?: IDefaultProps['children'];
  footer?: IDefaultProps['children']
}

export const Modal: FC<IProps> = function (props: IProps) {
  const {
    selector = 'body',
    className,
    style,
    children,
    header,
    footer,
    ...rest
  } = props;

  const container = document.querySelector(selector) as HTMLElement;

  const element = (
    <motion.div
      className={classnames(
        className,
        'tw-relative',
        'tw-flex',
        'tw-flex-col'
      )}
      style={style}
      {...rest}
    >

      <motion.div
        className={classnames(
          'tw-h-1/6'
        )}
      >
        {header}
      </motion.div>

      <motion.div className="tw-flex-1">
        {children}
      </motion.div>

      {footer && <motion.div
        className={classnames(
          'tw-h-1/6'
        )}
      >
        {footer}
      </motion.div>}

    </motion.div>
  );

  return createPortal(element, container);
};
