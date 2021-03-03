import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Layout } from 'app/components/Layout';
import { PreDepositFlow } from '../PreDepositFlow';

export function HomePage() {
  return (
    <>
      <Helmet>
        <title>Origin</title>
      </Helmet>
      <Layout>
        <PreDepositFlow />
      </Layout>
    </>
  );
}
