import React from 'react';
import { Image, Header } from 'semantic-ui-react';

function NotFoundPage({ href }: {href: string}): JSX.Element {
  return (
    <Header as="h2" icon textAlign="center">
      <Header.Content>
        Page not found click on image to go to default page
      </Header.Content>
      <Image
        src="/404-error-icon-7.jpeg"
        as="a"
        href={href}
        target="_blank"
        centered
        circular
        fluid
      />
    </Header>
  );
}

export default NotFoundPage;
