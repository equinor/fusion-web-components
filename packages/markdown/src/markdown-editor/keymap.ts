/* eslint-disable @typescript-eslint/ban-ts-comment */
import {
  wrapIn,
  setBlockType,
  chainCommands,
  toggleMark,
  exitCode,
  joinUp,
  joinDown,
  lift,
  selectParentNode,
} from 'prosemirror-commands';
import { wrapInList, splitListItem, liftListItem, sinkListItem } from 'prosemirror-schema-list';
import { undo, redo } from 'prosemirror-history';
import { undoInputRule } from 'prosemirror-inputrules';
import type { Command, EditorState, Transaction } from 'prosemirror-state';
import type { Schema } from 'prosemirror-model';

const mac = typeof navigator !== 'undefined' ? /Mac/.test(navigator.platform) : false;

// :: (Schema, ?Object) → Object
// Inspect the given schema looking for marks and nodes from the
// basic schema, and if found, add key bindings related to them.
// This will add:
//
// * **Mod-b** for toggling [strong](#schema-basic.StrongMark)
// * **Mod-i** for toggling [emphasis](#schema-basic.EmMark)
// * **Mod-`** for toggling [code font](#schema-basic.CodeMark)
// * **Ctrl-Shift-0** for making the current textblock a paragraph
// * **Ctrl-Shift-1** to **Ctrl-Shift-Digit6** for making the current
//   textblock a heading of the corresponding level
// * **Ctrl-Shift-Backslash** to make the current textblock a code block
// * **Ctrl-Shift-8** to wrap the selection in an ordered list
// * **Ctrl-Shift-9** to wrap the selection in a bullet list
// * **Ctrl->** to wrap the selection in a block quote
// * **Enter** to split a non-empty textblock in a list item while at
//   the same time splitting the list item
// * **Mod-Enter** to insert a hard break
// * **Mod-_** to insert a horizontal rule
// * **Backspace** to undo an input rule
// * **Alt-ArrowUp** to `joinUp`
// * **Alt-ArrowDown** to `joinDown`
// * **Mod-BracketLeft** to `lift`
// * **Escape** to `selectParentNode`
//
// You can suppress or map these bindings by passing a `mapKeys`
// argument, which maps key names (say `"Mod-B"` to either `false`, to
// remove the binding, or a new key name string.

export function buildKeymap(schema: Schema) {
  const keys: { [key: string]: Command } = {};
  function bind(key: string, cmd: Command) {
    keys[key] = cmd;
  }

  function bindIfExists<T>(path: T | undefined, callback: (type: T) => void) {
    if (path) {
      callback(path);
    }
  }

  bind('Mod-z', undo);
  bind('Shift-Mod-z', redo);
  bind('Backspace', undoInputRule);
  if (!mac) bind('Mod-y', redo);

  bind('Alt-ArrowUp', joinUp);
  bind('Alt-ArrowDown', joinDown);
  bind('Mod-BracketLeft', lift);
  bind('Escape', selectParentNode);

  bindIfExists(schema.marks.strong, (type) => {
    bind('Mod-b', toggleMark(type));
    bind('Mod-B', toggleMark(type));
  });
  bindIfExists(schema.marks.em, (type) => {
    bind('Mod-i', toggleMark(type));
    bind('Mod-I', toggleMark(type));
  });
  bindIfExists(schema.marks.code, (type) => {
    bind('Mod-`', toggleMark(type));
  });

  bindIfExists(schema.nodes.bullet_list, (type) => {
    bind('Shift-Ctrl-8', wrapInList(type));
  });
  bindIfExists(schema.nodes.ordered_list, (type) => {
    bind('Shift-Ctrl-9', wrapInList(type));
  });
  bindIfExists(schema.nodes.blockquote, (type) => {
    bind('Ctrl->', wrapIn(type));
  });
  bindIfExists(schema.nodes.hard_break, (type) => {
    const br = type;
    const cmd = chainCommands(
      exitCode,
      (state: EditorState, dispatch: ((tr: Transaction) => void) | undefined) => {
        if (dispatch) dispatch(state.tr.replaceSelectionWith(br.create()).scrollIntoView());
        return true;
      },
    );
    bind('Mod-Enter', cmd);
    bind('Shift-Enter', cmd);
    if (mac) bind('Ctrl-Enter', cmd);
  });
  bindIfExists(schema.nodes.list_item, (type) => {
    bind('Enter', splitListItem(type));
    bind('Mod-[', liftListItem(type));
    bind('Mod-]', sinkListItem(type));
  });
  bindIfExists(schema.nodes.paragraph, (type) => {
    bind('Shift-Ctrl-0', setBlockType(type));
  });
  bindIfExists(schema.nodes.code_block, (type) => {
    bind('Shift-Ctrl-\\', setBlockType(type));
  });
  bindIfExists(schema.nodes.heading, (type) => {
    for (let i = 1; i <= 6; i++) bind(`Shift-Ctrl-${i}`, setBlockType(type, { level: i }));
  });
  bindIfExists(schema.nodes.horizontal_rule, (type) => {
    const hr = type;
    bind('Mod-_', (state: EditorState, dispatch: ((tr: Transaction) => void) | undefined) => {
      if (dispatch) dispatch(state.tr.replaceSelectionWith(hr.create()).scrollIntoView());
      return true;
    });
  });

  return keys;
}
