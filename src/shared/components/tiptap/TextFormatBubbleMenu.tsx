import type { Editor } from '@tiptap/core';
import { useEditorState } from '@tiptap/react';
import { BubbleMenu } from '@tiptap/react/menus';
import {
  Bold,
  Italic,
  Strikethrough,
  TextAlignCenter,
  TextAlignEnd,
  TextAlignJustify,
  TextAlignStart,
  Underline,
} from 'lucide-react';

import { menuBarStateSelector } from './menuBarState';
import clsx from 'clsx';

export const TextFormatBubbleMenu = ({ editor }: { editor: Editor }) => {
  const editorState = useEditorState({
    editor,
    selector: menuBarStateSelector,
  });

  return (
    <BubbleMenu
      editor={editor}
      shouldShow={({ editor }) =>
        editor.isFocused && !editor.state.selection.empty
      }
      options={{ placement: 'top', offset: 8, strategy: 'fixed' }}
      className="rounded-xl border border-gray-200 bg-gray-200"
    >
      <div className="button-group flex items-center gap-2 p-2">
        {/* Text Formatting */}
        <button
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={!editorState.canBold}
          className={clsx(
            'rounded-sm p-1',
            editorState.isBold ? 'is-active' : '',
          )}
        >
          <Bold size={16} />
        </button>
        <button
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={!editorState.canItalic}
          className={clsx(
            'rounded-sm p-1',
            editorState.isItalic ? 'is-active' : '',
          )}
        >
          <Italic size={16} />
        </button>
        <button
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          disabled={!editorState.canUnderline}
          className={clsx(
            'rounded-sm p-1',
            editorState.isUnderline ? 'is-active' : '',
          )}
        >
          <Underline size={16} />
        </button>
        <button
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => editor.chain().focus().toggleStrike().run()}
          disabled={!editorState.canStrike}
          className={clsx(
            'rounded-sm p-1',
            editorState.isStrike ? 'is-active' : '',
          )}
        >
          <Strikethrough size={16} />
        </button>

        {/* Text Alignment */}
        <button
          onClick={() => editor.chain().focus().setTextAlign('left').run()}
          className={clsx(
            'rounded-sm p-1',
            editorState.isTextAlignLeft ? 'is-active' : '',
          )}
        >
          <TextAlignStart size={16} />
        </button>
        <button
          onClick={() => editor.chain().focus().setTextAlign('center').run()}
          className={clsx(
            'rounded-sm p-1',
            editorState.isTextAlignCenter ? 'is-active' : '',
          )}
        >
          <TextAlignCenter size={16} />
        </button>
        <button
          onClick={() => editor.chain().focus().setTextAlign('right').run()}
          className={clsx(
            'rounded-sm p-1',
            editorState.isTextAlignRight ? 'is-active' : '',
          )}
        >
          <TextAlignEnd size={16} />
        </button>
        <button
          onClick={() => editor.chain().focus().setTextAlign('justify').run()}
          className={clsx(
            'rounded-sm p-1',
            editorState.isTextAlignJustify ? 'is-active' : '',
          )}
        >
          <TextAlignJustify size={16} />
        </button>
      </div>
    </BubbleMenu>
  );
};
