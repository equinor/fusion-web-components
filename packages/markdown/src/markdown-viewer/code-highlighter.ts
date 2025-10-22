import * as Prism from 'prismjs';

// Import additional language definitions
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-csharp';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-yaml';

export { codeHighlighterStyles } from './code-highlighter.styles';

/**
 * Highlights code blocks within a given element using Prism.js
 * @param element - The DOM element containing code blocks to highlight
 */
export async function highlightCodeBlocks(element: Element): Promise<void> {
  const codeBlocks = element.querySelectorAll('pre code');

  for (const codeBlock of codeBlocks) {
    // Get the language from the class or try to detect it
    const className = codeBlock.className;
    const [, language] = className.match(/language-(\w+)/) || [];

    // Skip highlighting if no language is specified
    if (!language) {
      continue;
    }

    // Apply Prism highlighting
    try {
      // Use Prism.highlight with the code content and language
      const code = codeBlock.textContent || '';
      const highlightedCode = Prism.highlight(code, Prism.languages[language] || Prism.languages.javascript, language);
      codeBlock.innerHTML = highlightedCode;
    } catch (error) {
      // If highlighting fails, just keep the original code
      console.warn('Failed to highlight code block:', error);
    }
  }
}
