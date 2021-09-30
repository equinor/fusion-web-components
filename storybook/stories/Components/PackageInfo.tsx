import React from 'react';
import { Title, Subtitle, Source } from '@storybook/components';

import { styled } from '@storybook/theming';

type Package = {
  name: string;
  description: string;
  dependencies?: Record<string, string>;
  devDependencies?: Record<string, string>;
};

const Dependencies = styled.div({
  display: 'flex',
  gap: 8,
  flexWrap: 'wrap',
  margin: '1rem 0',
});

const Dependency = styled.a({
  background: '#444',
  color: '#fff',
  display: 'inline-flex',
  textDecoration: 'none',
  fontFamily: 'monospace',
  fontSize: 12,
  borderRadius: 4,
  overflow: 'hidden',
  '& span': {
    padding: '2px 8px',
  },
  '[data-version]': {},
  '[data-package]': {
    backgroundColor: 'cornflowerblue',
    whiteSpace: 'nowrap',
  },
});

export const renderDependencies = (deps: Record<string, string>) => {
  return (
    <Dependencies>
      {Object.keys(deps).map((dep) => {
        const scope = deps[dep].replace(/\^/, '');
        return (
          <Dependency key={dep} href={`https://www.npmjs.com/package/${dep}/v/${scope}`} target="_blank">
            <span data-version>{scope}</span>
            <span data-package>{dep}</span>
          </Dependency>
        );
      })}
    </Dependencies>
  );
};

export const PackageInfo = ({ pkg }: { pkg: Package }): React.ReactElement => {
  console.log(pkg.dependencies);
  return (
    <div>
      <Title>{pkg.name}</Title>
      <Subtitle>{pkg.description}</Subtitle>
      {renderDependencies(pkg.dependencies || {})}
      <Source language="sh" code={`npm i ${pkg.name}`} />
    </div>
  );
};
