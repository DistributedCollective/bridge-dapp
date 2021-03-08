import React from 'react';
import cn from 'classnames';

interface Props {
  className?: string;
  children: React.ReactNode;
}

export function Card(props: Props) {
  return (
    <article className={cn('card', props.className)}>{props.children}</article>
  );
}
