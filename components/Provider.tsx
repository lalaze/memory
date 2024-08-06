'use client';

import { showSession } from '@/store';
import { Provider } from 'jotai';
import { useHydrateAtoms } from 'jotai/utils';
import { Session } from 'next-auth';
import React from 'react';

type Props = {
  initialState: Session | null;
  children: React.ReactNode;
};

function StateWrapper({ initialState, children }: Props) {
  useHydrateAtoms([[showSession, initialState]]);

  return children;
}

export default function JotaiProvider({ initialState, children }: Props) {
  return (
    <Provider>
      <StateWrapper initialState={initialState}>{children}</StateWrapper>
    </Provider>
  );
}
