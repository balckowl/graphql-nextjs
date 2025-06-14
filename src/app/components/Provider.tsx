"use client"

import { client } from '@/lib/client';
import { ApolloProvider } from '@apollo/client';

const Provider = ({ children }: React.PropsWithChildren) => {
  return (
    <ApolloProvider client={client}>
      {children}
    </ApolloProvider>
  );
}
export default Provider;
