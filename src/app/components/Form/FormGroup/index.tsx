import React, { useEffect, useState } from 'react';
import cn from 'classnames';
import { makeId } from 'utils/helpers';

interface FormGroupProps {
  label?: React.ReactNode;
  describe?: React.ReactNode;
  describeClassName?: string;
  id?: string;
  children: React.ReactNode;
  className?: string;
}

export function FormGroup({
  children,
  describe,
  className,
  ...props
}: FormGroupProps) {
  const [id, setId] = useState<string>(props.id || makeId());

  useEffect(() => {
    setId(prevState => props.id || prevState || makeId());
  }, [props.id]);

  return (
    <div className={cn('mb-12', className)}>
      {props.label && (
        <label
          htmlFor={id}
          className="block mb-2 text-white font-medium text-base"
        >
          {props.label}
        </label>
      )}
      <PassPropsToChildren id={id}>{children}</PassPropsToChildren>
      {describe && (
        <div
          className={cn('mt-2 text-xs font-normal', props.describeClassName)}
        >
          {describe}
        </div>
      )}
    </div>
  );
}

function PassPropsToChildren({
  children,
  id,
}: {
  children: React.ReactNode;
  id: string;
}) {
  const childrenWithProps = React.Children.map(children, child => {
    // checking isValidElement is the safe way and avoids a typescript error too
    if (React.isValidElement(child)) {
      return React.cloneElement(child, { id });
    }
    return child;
  });

  return <div>{childrenWithProps}</div>;
}
