import { css } from 'lit';

export const codeHighlighterStyles = css`
  /* General markdown content styling */
  #content {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
    line-height: 1.6;
    color: var(--eds-color-text-neutral-strong);
  }

  #content h1,
  #content h2,
  #content h3,
  #content h4,
  #content h5,
  #content h6 {
    margin: 1.5rem 0 1rem 0;
    font-weight: 600;
    line-height: 1.25;
  }

  #content h1 {
    font-size: 2rem;
    border-bottom: 1px solid var(--eds-color-border-neutral-subtle);
    padding-bottom: 0.3rem;
  }

  #content h2 {
    font-size: 1.5rem;
    border-bottom: 1px solid var(--eds-color-border-neutral-subtle);
    padding-bottom: 0.3rem;
  }

  #content h3 {
    font-size: 1.25rem;
  }

  #content h4 {
    font-size: 1rem;
  }

  #content h5 {
    font-size: 0.875rem;
  }

  #content h6 {
    font-size: 0.85rem;
    color: var(--eds-color-text-neutral-subtle);
  }

  #content p {
    margin: 1rem 0;
  }

  #content ul,
  #content ol {
    margin: 1rem 0;
    padding-left: 2rem;
  }

  #content li {
    margin: 0.25rem 0;
  }

  #content blockquote {
    margin: 1rem 0;
    padding: 0 1rem;
    color: var(--eds-color-text-neutral-subtle);
    border-left: 0.25rem solid var(--eds-color-border-neutral-subtle);
  }

  #content hr {
    height: 0.25rem;
    margin: 2rem 0;
    background-color: var(--eds-color-bg-neutral-fill-muted-default);
    border: 0;
  }

  #content img {
    max-width: 100%;
    height: auto;
    border-radius: 0.25rem;
  }

  #content a {
    color: var(--eds-color-text-link);
    text-decoration: none;
  }

  #content a:hover {
    text-decoration: underline;
  }

  /* Basic code block styling */
  pre {
    background-color: var(--eds-color-bg-neutral-fill-muted-default);
    border-radius: 0.25rem;
    padding: 1rem;
    overflow-x: auto;
    margin: 1rem 0;
  }

  code {
    font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
    font-size: 0.875rem;
    line-height: 1.4;
  }

  pre code {
    background: none;
    padding: 0;
  }

  /* Inline code styling */
  :not(pre) > code {
    background-color: var(--eds-color-bg-neutral-fill-muted-default);
    padding: 0.125rem 0.25rem;
    border-radius: 0.125rem;
    font-size: 0.9em;
  }

  /* Prism.js syntax highlighting styles */
  .token.comment,
  .token.prolog,
  .token.doctype,
  .token.cdata {
    color: var(--eds-color-text-neutral-subtle);
  }

  .token.punctuation {
    color: var(--eds-color-text-neutral-subtle);
  }

  .token.namespace {
    opacity: 0.7;
  }

  .token.property,
  .token.tag,
  .token.boolean,
  .token.number,
  .token.constant,
  .token.symbol,
  .token.deleted {
    color: var(--eds-color-text-danger-strong);
  }

  .token.selector,
  .token.attr-name,
  .token.string,
  .token.char,
  .token.builtin,
  .token.inserted {
    color: var(--eds-color-text-success-strong);
  }

  .token.operator,
  .token.entity,
  .token.url,
  .language-css .token.string,
  .style .token.string {
    color: var(--eds-color-text-warning-strong);
  }

  .token.atrule,
  .token.attr-value,
  .token.keyword {
    color: var(--eds-color-text-info-strong);
  }

  .token.function,
  .token.class-name {
    color: var(--eds-color-text-accent-strong);
  }

  .token.regex,
  .token.important,
  .token.variable {
    color: var(--eds-color-text-warning-subtle);
  }

  .token.important,
  .token.bold {
    font-weight: bold;
  }

  .token.italic {
    font-style: italic;
  }

  .token.entity {
    cursor: help;
  }
`;
