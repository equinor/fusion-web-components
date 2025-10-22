import { css } from 'lit';

export const codeHighlighterStyles = css`
  /* Basic code block styling */
  pre {
    background-color: #f5f5f5;
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
    background-color: #f5f5f5;
    padding: 0.125rem 0.25rem;
    border-radius: 0.125rem;
    font-size: 0.9em;
  }

  /* Prism.js syntax highlighting styles */
  .token.comment,
  .token.prolog,
  .token.doctype,
  .token.cdata {
    color: #708090;
  }

  .token.punctuation {
    color: #999;
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
    color: #905;
  }

  .token.selector,
  .token.attr-name,
  .token.string,
  .token.char,
  .token.builtin,
  .token.inserted {
    color: #690;
  }

  .token.operator,
  .token.entity,
  .token.url,
  .language-css .token.string,
  .style .token.string {
    color: #9a6e3a;
    background: hsla(0, 0%, 100%, 0.5);
  }

  .token.atrule,
  .token.attr-value,
  .token.keyword {
    color: #07a;
  }

  .token.function,
  .token.class-name {
    color: #dd4a68;
  }

  .token.regex,
  .token.important,
  .token.variable {
    color: #e90;
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
