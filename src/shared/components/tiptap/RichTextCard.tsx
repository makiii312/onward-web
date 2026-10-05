import DOMPurify from 'dompurify';
import { generateHTML } from '@tiptap/core';
import StarterKit from '@tiptap/starter-kit';
import { Placeholder } from '@tiptap/extensions';
import { TaskItem, TaskList } from '@tiptap/extension-list';
import TextAlign from '@tiptap/extension-text-align';
import { Button } from '../ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '../ui/card';

import './tiptap.css';
import { RichTextCardDropdown } from './RichTextCardDropdown';
import { useState } from 'react';
import { MenuBar } from './MenuBar';
import { EditorContent, useEditor } from '@tiptap/react';
import { TextFormatBubbleMenu } from './TextFormatBubbleMenu';

type RichTextCardProps = {
  jsonNote: object;
};

const RichTextCard = ({ jsonNote }: RichTextCardProps) => {
  const [editable, setEditable] = useState(false);
  const [jsonContent, setJsonContent] = useState(jsonNote);

  const htmlNote = generateHTML(jsonContent, [
    StarterKit,
    Placeholder.configure({ placeholder: 'Write something...' }),
    TaskList,
    TaskItem.configure({ nested: true }),
    TextAlign.configure({
      types: ['heading', 'paragraph'],
    }),
  ]);

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
    content: htmlNote,
    editable: true,
    editorProps: {
      attributes: {
        ariaLabel: 'Rich Text Editor',
        ariaMultiline: 'true',
        ariaReadonly: 'false',
      },
    },
  });

  const handleSaveNote = () => {
    const jsonNote = editor.getJSON();
    setJsonContent(jsonNote);
    setEditable(false);
  };

  return (
    <>
      {editable ? (
        <Card size="sm" className="mx-auto w-full">
          <CardHeader>
            <MenuBar editor={editor} className="w-fit" />
          </CardHeader>
          <CardContent>
            <EditorContent
              editor={editor}
              className="max-h-50 min-h-20 overflow-auto rounded-t-xl bg-white p-3"
            />
            <TextFormatBubbleMenu editor={editor} />
          </CardContent>
          <CardFooter className="flex items-center justify-end gap-4">
            <Button variant="ghost" onClick={() => setEditable(false)}>
              Cancel
            </Button>
            <Button
              className="w-20 rounded-lg border-gray-500 px-2 py-1.5 font-semibold"
              variant="outline"
              onClick={handleSaveNote}
            >
              Save
            </Button>
          </CardFooter>
        </Card>
      ) : (
        <Card size="sm" className="mx-auto w-full">
          <CardHeader className="relative">
            <RichTextCardDropdown onEdit={() => setEditable(true)} />
          </CardHeader>
          <CardContent>
            <div
              className="tiptap"
              dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(htmlNote) }}
            />
          </CardContent>
          <CardFooter>
            <p>Date added: May 4, 2025 10:30PM</p>
          </CardFooter>
        </Card>
      )}
    </>
  );
};

export default RichTextCard;
