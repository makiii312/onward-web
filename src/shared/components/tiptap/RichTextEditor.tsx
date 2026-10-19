import { useEditor, EditorContent, useEditorState } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { Placeholder } from '@tiptap/extensions';
import { TaskItem, TaskList } from '@tiptap/extension-list';
import TextAlign from '@tiptap/extension-text-align';
import { Button } from '../ui/button';
import { MenuBar } from './MenuBar';
import { TextFormatBubbleMenu } from './TextFormatBubbleMenu';

import './tiptap.css';

type RichTextEditorProps = {
  content?: string;
  onAddNote?: (notes: object) => void;
};

const RichTextEditor = ({ content = '', onAddNote }: RichTextEditorProps) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({ placeholder: 'Write something...' }),
      TaskList,
      TaskItem.configure({ nested: true }),
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
    ],
    content: content, // initial content
    editable: true,
    editorProps: {
      attributes: {
        ariaLabel: 'Rich Text Editor',
        ariaMultiline: 'true',
        ariaReadonly: 'false',
      },
    },
  });

  const isEditorEmpty = useEditorState({editor, selector: (context) => context?.editor.isEmpty ?? true});

  if (!editor) {
    return null; // Prevent rendering until the editor is initialized
  }


  const handleSaveNote = () => {
    const jsonNote = editor.getJSON();
    console.log('jsonNote', typeof jsonNote, jsonNote);
    onAddNote?.(jsonNote);
    editor.commands.clearContent(); // Clear the editor content after saving
  };

  return (
    <>
      <div className="p">
        <EditorContent
          editor={editor}
          className="max-h-50 min-h-20 overflow-auto rounded-t-xl bg-white p-3"
        />
        <div className="flex items-center justify-between rounded-b-xl border border-gray-200 bg-gray-200 p-2">
          <MenuBar editor={editor} className="w-fit" />
          <Button
            className="w-20 rounded-lg border-gray-500 px-2 py-1.5 font-semibold"
            variant="outline"
            disabled={isEditorEmpty}
            onClick={handleSaveNote}
          >
            Save
          </Button>
        </div>
      </div>

      <TextFormatBubbleMenu editor={editor} />
    </>
  );
};

export default RichTextEditor;
