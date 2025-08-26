import { liftTarget } from 'prosemirror-transform';
import { EditorState, Transaction } from 'prosemirror-state';
import { Node, NodeType } from 'prosemirror-model';

/**
 * Represents the position of a ProseMirror node within a document.
 *
 * @property pos - The numeric position of the node in the document.
 * @property node - The ProseMirror Node at the specified position.
 */
export interface NodePosition {
  pos: number;
  node: Node;
}

/**
 * Collects all nodes of a specific type within a given range in the ProseMirror document.
 *
 * @param state - The current EditorState containing the document to search.
 * @param from - The starting position of the range to search (inclusive).
 * @param to - The ending position of the range to search (exclusive).
 * @param nodeType - The NodeType to match against nodes in the document.
 * @returns An array of NodePosition objects, each containing the position and node of the matched type.
 */
export function collectNodesOfType(state: EditorState, from: number, to: number, nodeType: NodeType): NodePosition[] {
  const positions: NodePosition[] = [];

  state.doc.nodesBetween(from, to, (node, pos) => {
    if (node.type === nodeType) {
      positions.push({ pos, node });
    }
    return true;
  });

  return positions;
}

/**
 * Collects all nodes of specified types within a given range in the ProseMirror document.
 *
 * Iterates through the document nodes between the `from` and `to` positions, and returns
 * an array of objects containing the position and node for each node whose type matches
 * one of the provided `nodeTypes`.
 *
 * @param state - The current ProseMirror editor state.
 * @param from - The starting position of the range to search.
 * @param to - The ending position of the range to search.
 * @param nodeTypes - An array of node types to collect.
 * @returns An array of objects, each containing the position and node of a matching node.
 */
export function collectNodesOfTypes(
  state: EditorState,
  from: number,
  to: number,
  nodeTypes: NodeType[],
): NodePosition[] {
  const positions: NodePosition[] = [];

  state.doc.nodesBetween(from, to, (node, pos) => {
    if (nodeTypes.includes(node.type)) {
      positions.push({ pos, node });
    }
    return true;
  });

  return positions;
}

/**
 * Attempts to lift a ProseMirror node at the specified position within a transaction.
 *
 * This function resolves the given position and node size to determine the block range,
 * then tries to lift the node to its target depth if possible. If the node is successfully lifted,
 * the transaction is updated and `hasChanges` is set to true.
 *
 * @param tr - The ProseMirror transaction to apply the lift operation to.
 * @param pos - The position in the document where the node starts.
 * @param node - The ProseMirror node to be lifted.
 * @returns An object containing the (possibly updated) transaction and a boolean indicating if changes were made.
 */
export function liftNode(tr: Transaction, pos: number, node: Node): { transaction: Transaction; hasChanges: boolean } {
  let hasChanges = false;

  const $from = tr.doc.resolve(pos + 1);
  const $to = tr.doc.resolve(pos + node.nodeSize - 1);
  const range = $from.blockRange($to);

  if (range) {
    const targetDepth = liftTarget(range);
    if (targetDepth !== null && targetDepth !== undefined) {
      tr.lift(range, targetDepth);
      hasChanges = true;
    }
  }

  return { transaction: tr, hasChanges };
}
