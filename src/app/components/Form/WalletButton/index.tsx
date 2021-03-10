import React from 'react';
import cn from 'classnames';
import { Spinner } from '@blueprintjs/core/lib/esm/components/spinner/spinner';

export type ButtonType = 'button' | 'submit' | 'reset';

export interface ButtonProps {
  text: React.ReactNode;
  type?: ButtonType;
  className?: string;
  loading?: boolean;
  disabled?: boolean;
  onClick?: () => void;
}

export function WalletButton({
  text,
  loading,
  onClick,
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      onClick={onClick}
      className={cn(className, {
        disabled: props.disabled,
        loading: loading,
      })}
    >
      <span className="flex flex-row items-center justify-between truncate">
        <span
          className={cn(
            'flex-shrink-0 btn-loader__spinner flex flex-row items-center justify-start',
            {
              active: loading,
            },
          )}
        >
          <Spinner size={20} className="fill-current text-red" />
        </span>
        <span
          className={cn('truncate btn-loader__value', {
            active: loading,
          })}
        >
          {text}
        </span>
      </span>
    </button>
  );
}

WalletButton.defaultProps = {
  type: 'button',
  className: 'btn-wallet',
};
