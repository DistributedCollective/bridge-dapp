import React from 'react';
import { Spinner } from '@blueprintjs/core';
import { Card } from '../../../../components/Card';

export function LoaderCard() {
  return (
    <Card className="flex flex-col justify-center items-stretch">
      <div className="w-full flex flex-col items-center justify-center h-full">
        <Spinner size={48} className="text-white" />
      </div>
    </Card>
  );
}
