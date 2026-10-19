import type { Editor } from '@tiptap/core';
import { useEditorState } from '@tiptap/react';

import { menuBarStateSelector } from './menuBarState.ts';
import {
  Code,
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Heading5,
  Heading6,
  List,
  ListOrdered,
  ListTodo,
  Pilcrow,
  Quote,
  Redo2,
  SquareCode,
  TextWrap,
  Undo2,
} from 'lucide-react';
import clsx from 'clsx';

export const MenuBar = ({
  editor,
  className = '',
}: {
  editor: Editor;
  className?: string;
}) => {
  const editorState = useEditorState({
    editor,
    selector: menuBarStateSelector,
  });

  if (!editor) {
    return null;
  }

  return (
    <div className={`control-group ${className}`}>
      <div className="button-group flex items-center gap-1 p-1">
        <button
          onClick={() => editor.chain().focus().setParagraph().run()}
          className={clsx(
            'rounded-sm p-1',
            editorState.isParagraph ? 'is-active' : '',
          )}
        >
          <Pilcrow size={16} />
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
          className={clsx(
            'rounded-sm p-1',
            editorState.isHeading1 ? 'is-active' : '',
          )}
        >
          <Heading1 size={16} />
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          className={clsx(
            'rounded-sm p-1',
            editorState.isHeading2 ? 'is-active' : '',
          )}
        >
          <Heading2 size={16} />
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
          className={clsx(
            'rounded-sm p-1',
            editorState.isHeading3 ? 'is-active' : '',
          )}
        >
          <Heading3 size={16} />
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 4 }).run()
          }
          className={clsx(
            'rounded-sm p-1',
            editorState.isHeading4 ? 'is-active' : '',
          )}
        >
          <Heading4 size={16} />
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 5 }).run()
          }
          className={clsx(
            'rounded-sm p-1',
            editorState.isHeading5 ? 'is-active' : '',
          )}
        >
          <Heading5 size={16} />
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 6 }).run()
          }
          className={clsx(
            'rounded-sm p-1',
            editorState.isHeading6 ? 'is-active' : '',
          )}
        >
          <Heading6 size={16} />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleTaskList().run()}
          className={clsx(
            'rounded-sm p-1',
            editorState.isTaskList ? 'is-active' : '',
          )}
        >
          <ListTodo size={16} />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={clsx(
            'rounded-sm p-1',
            editorState.isBulletList ? 'is-active' : '',
          )}
        >
          <List size={16} />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={clsx(
            'rounded-sm p-1',
            editorState.isOrderedList ? 'is-active' : '',
          )}
        >
          <ListOrdered size={16} />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleCode().run()}
          disabled={!editorState.canCode}
          className={clsx(
            'rounded-sm p-1',
            editorState.isCode ? 'is-active' : '',
          )}
        >
          <Code size={16} />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={clsx(
            'rounded-sm p-1',
            editorState.isCodeBlock ? 'is-active' : '',
          )}
        >
          <SquareCode size={16} />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={clsx(
            'rounded-sm p-1',
            editorState.isBlockquote ? 'is-active' : '',
          )}
        >
          <Quote size={16} />
        </button>
        <button onClick={() => editor.chain().focus().setHardBreak().run()}>
          <TextWrap size={16} />
        </button>
        <button
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editorState.canUndo}
        >
          <Undo2 size={16} />
        </button>
        <button
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editorState.canRedo}
        >
          <Redo2 size={16} />
        </button>
      </div>
    </div>
  );
};
