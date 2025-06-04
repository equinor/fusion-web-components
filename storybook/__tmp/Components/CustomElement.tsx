/* eslint-disable @typescript-eslint/ban-ts-comment */

import React from 'react';
import * as Schema from 'custom-elements-manifest/schema';

import { Title, Subtitle, Description, ArgsTable, ArgsTableError, ArgTypes } from 'storybook/internal/components';
import { styled } from 'storybook/theming';

const getDeclarations = (modules: Array<Schema.JavaScriptModule>): Array<Schema.Declaration> =>
  modules.reduce((acc, cur) => acc.concat(cur.declarations || []), [] as Array<Schema.Declaration>);

const getCustomElementDeclaration = (modules: Array<Schema.JavaScriptModule>): Array<Schema.CustomElement> =>
  (getDeclarations(modules) as unknown as Array<Schema.CustomElement>).filter((x) => x.customElement);

const getCustomElementModule = (
  tagName: string,
  modules: Schema.JavaScriptModule[]
): Schema.CustomElement | undefined => {
  const declarations = getCustomElementDeclaration(modules);
  const customElement = declarations.find(
    (declaration) => declaration.tagName?.toUpperCase() === tagName.toUpperCase()
  );
  return customElement;
};

type BasicDeclaration = {
  name: string;
  description?: string;
  type?: { text: string };
  default?: string;
  parameters?: Schema.Attribute[];
  privacy?: string;
};

const mapElement = <T extends BasicDeclaration>(element: T, category: string) => {
  if (element.privacy && element.privacy !== 'public') return;
  if (category === 'members') {
    category = (element as unknown as Schema.ClassMember).kind === 'field' ? 'properties' : 'methods';
  }
  return {
    [element.name]: {
      ...element,
      description: element.description,
      defaultValue: element.default,
      table: {
        category,
        type: {
          summary: element.type?.text,
        },
        jsDocTags: {
          params: element.parameters?.map((x) => ({
            name: x.name,
            description: x.type?.text || ' ',
          })),
          // @ts-ignore
          returns: { description: element.return?.type?.text },
        },
      },
    },
  };
};

const mapElements = (element: Schema.CustomElement, schema: string): ArgTypes | undefined =>
  // @ts-ignore
  (element[schema] as Array<BasicDeclaration>)?.reduce(
    (cur, value) => Object.assign(cur, mapElement(value, schema)),
    {} as ArgTypes
  ) as unknown as ArgTypes;

const Summary = styled.div({
  '& .sbdocs': {
    fontSize: 18,
    lineHeight: 1.2,
  },
});

const Header = styled.header({
  padding: 16,
  borderRadius: 16,
  boxShadow: '0px 0px 2px 1px rgba(0,0,0,.25)',
  margin: '2rem 0',
});

type CustomElementProps = { tag: string; data: Schema.Package };
export const CustomElement = (props: CustomElementProps): React.ReactElement => {
  const module = getCustomElementModule(props.tag, props.data.modules);

  if (!module) {
    return <ArgsTable error={ArgsTableError.NO_COMPONENT} />;
  }
  const rows = {
    ...mapElements(module, 'attributes'),
    ...mapElements(module, 'members'),
    ...mapElements(module, 'events'),
    ...mapElements(module, 'slots'),
    ...mapElements(module, 'cssProperties'),
  };

  return (
    <div>
      <Header>
        <Title>{module.tagName}</Title>
        <Subtitle>{module?.name}</Subtitle>
        <Summary>
          <Description markdown={module.summary || ''} />
        </Summary>
      </Header>
      <Description markdown={module.description || ''} />
      <ArgsTable rows={rows} />
    </div>
  );
};
