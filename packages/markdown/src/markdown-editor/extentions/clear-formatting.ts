import { EditorState, Transaction } from 'prosemirror-state';
import { Mark, Node } from 'prosemirror-model';

import { collectNodesOfType, collectNodesOfTypes, liftNode } from '../utils/prosemirror-utils';

/**
 * Clears all formatting from the current selection in the editor.
 *
 * This function removes all marks, handles list items, resets block nodes,
 * and clears any stored marks within the selected range. If changes are made,
 * the provided dispatch function is called with the updated transaction.
 *
 * @param state - The current editor state.
 * @param dispatch - Optional function to dispatch the transaction if changes are made.
 * @returns `true` if any formatting was cleared and changes were made; otherwise, `false`.
 */
export function clearAllFormatting(state: EditorState, dispatch?: (tr: Transaction) => void): boolean {
  const paragraphType = state.schema.nodes.paragraph;

  if (!paragraphType) {
    console.warn('Paragraph node not found in schema');
    return false;
  }

  const { from, to } = state.selection;
  const tr = state.tr;

  // Apply each transformation in sequence
  const transformations = [removeAllMarks, handleListItems, handleBlockNodes, clearStoredMarks];

  const result = transformations.reduce(
    (acc, transformation) => {
      const { transaction, hasChanges } = transformation(acc.transaction, state, from, to);
      return {
        transaction,
        hasChanges: acc.hasChanges || hasChanges,
      };
    },
    { transaction: tr, hasChanges: false },
  );

  // Dispatch the transaction if changes were made and dispatch is provided
  if (dispatch && result.hasChanges) {
    dispatch(result.transaction);
  }

  return result.hasChanges;
}

/**
 * Removes all marks (formatting) from nodes within the specified range in the editor state.
 *
 * Iterates through all nodes between the `from` and `to` positions in the document,
 * removing any marks found on those nodes. Returns an object containing the updated
 * transaction and a boolean indicating whether any changes were made.
 *
 * @param tr - The current ProseMirror transaction to apply mark removals to.
 * @param state - The current editor state.
 * @param from - The starting position of the range to clear formatting from.
 * @param to - The ending position of the range to clear formatting from.
 * @returns An object with the updated transaction and a flag indicating if changes were made.
 */
function removeAllMarks(
  tr: Transaction,
  state: EditorState,
  from: number,
  to: number,
): { transaction: Transaction; hasChanges: boolean } {
  let hasChanges = false;

  state.doc.nodesBetween(from, to, (node, pos) => {
    if (node.marks.length > 0) {
      node.marks.forEach((mark: Mark) => {
        tr.removeMark(pos, pos + node.nodeSize, mark.type);
      });
      hasChanges = true;
    }
    return true;
  });

  return { transaction: tr, hasChanges };
}

/**
 * Handles the removal of list formatting from all list items within a given selection range.
 *
 * This function finds all nodes of type `list_item` within the specified range (`from` to `to`)
 * in the editor state, and lifts each list item node out of its parent list structure.
 * The nodes are processed in reverse order to prevent position shifts during transformation.
 *
 * @param tr - The current ProseMirror transaction to apply changes to.
 * @param state - The current editor state.
 * @param from - The start position of the selection.
 * @param to - The end position of the selection.
 * @returns An object containing the updated transaction and a boolean indicating if any changes were made.
 */
function handleListItems(
  tr: Transaction,
  state: EditorState,
  from: number,
  to: number,
): { transaction: Transaction; hasChanges: boolean } {
  let hasChanges = false;
  const listItemType = state.schema.nodes.list_item;

  if (!listItemType) {
    return { transaction: tr, hasChanges };
  }

  // Find and collect all list items within the selection
  const listItemPositions = collectNodesOfType(state, from, to, listItemType);

  // Process in reverse order to avoid position shifts
  listItemPositions.reverse().forEach(({ pos, node }) => {
    const result = liftNode(tr, pos, node);
    tr = result.transaction;
    hasChanges = hasChanges || result.hasChanges;
  });

  return { transaction: tr, hasChanges };
}

/**
 * Handle block nodes (headings, code blocks, blockquotes)
 */
/**
 * Processes block nodes within a given selection range in the editor state,
 * converting certain block types to paragraphs or lifting blockquotes.
 *
 * - Converts block nodes of type 'heading', 'code_block', or similar to paragraphs
 *   if their content is entirely inline (excluding blockquotes).
 * - Lifts the content of blockquotes out of the blockquote node.
 * - Processes nodes in reverse order to avoid position shifts during transformation.
 *
 * @param tr - The current ProseMirror transaction to apply changes to.
 * @param state - The current editor state.
 * @param from - The start position of the selection.
 * @param to - The end position of the selection.
 * @returns An object containing the updated transaction and a boolean indicating if any changes were made.
 */
function handleBlockNodes(
  tr: Transaction,
  state: EditorState,
  from: number,
  to: number,
): { transaction: Transaction; hasChanges: boolean } {
  let hasChanges = false;
  const paragraphType = state.schema.nodes.paragraph;

  // Get relevant block node types
  const blockNodeTypes = ['heading', 'code_block', 'blockquote']
    .map((name) => state.schema.nodes[name])
    .filter(Boolean);

  if (blockNodeTypes.length === 0) {
    return { transaction: tr, hasChanges };
  }

  // Find and collect all block nodes within the selection
  const blockPositions = collectNodesOfTypes(state, from, to, blockNodeTypes);

  // Process in reverse order to avoid position shifts
  blockPositions.reverse().forEach(({ pos, node }) => {
    const isBlockquote = node.type === state.schema.nodes.blockquote;
    const allInline = node.content.content.every((child: Node) => child.isInline);

    if (allInline && !isBlockquote) {
      // Convert to paragraph if content is inline (exclude blockquotes)
      tr.setNodeMarkup(pos, paragraphType);
      hasChanges = true;
    } else if (isBlockquote) {
      // Lift blockquote content
      const result = liftNode(tr, pos, node);
      tr = result.transaction;
      hasChanges = hasChanges || result.hasChanges;
    }
  });

  return { transaction: tr, hasChanges };
}

/**
 * Clears any stored marks from the given ProseMirror transaction.
 *
 * This function checks if the transaction has any stored marks and, if so,
 * removes them by setting the stored marks to an empty array. It returns
 * an object containing the (possibly updated) transaction and a boolean
 * indicating whether any changes were made.
 *
 * @param tr - The ProseMirror transaction to clear stored marks from.
 * @returns An object containing the updated transaction and a flag indicating if changes were made.
 */
function clearStoredMarks(tr: Transaction): { transaction: Transaction; hasChanges: boolean } {
  const hasStoredMarks = tr.storedMarks && tr.storedMarks.length > 0;

  if (hasStoredMarks) {
    tr = tr.setStoredMarks([]);
  }

  return {
    transaction: tr,
    hasChanges: hasStoredMarks || false,
  };
}
