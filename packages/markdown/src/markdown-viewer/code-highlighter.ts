import * as Prism from 'prismjs';

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
    const languageMatch = className.match(/language-(\w+)/);
    const language = languageMatch ? languageMatch[1] : 'javascript';
    
    // Set the language class if not already set
    if (!languageMatch) {
      codeBlock.className = `language-${language}`;
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
