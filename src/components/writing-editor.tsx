'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { countWords } from '@/lib/utils';
import { Eye, EyeOff, FileText, AlertCircle } from 'lucide-react';

interface WritingEditorProps {
  initialContent?: string;
  onContentChange?: (content: string, wordCount: number) => void;
  writeForwardMode?: boolean;
  sessionActive?: boolean;
  goalWords?: number;
}

export function WritingEditor({
  initialContent = '',
  onContentChange,
  writeForwardMode = false,
  sessionActive = false,
  goalWords = 250,
}: WritingEditorProps) {
  const [content, setContent] = useState(initialContent);
  const [sessionStartContent, setSessionStartContent] = useState('');
  const [writeForwardEnabled, setWriteForwardEnabled] = useState(writeForwardMode);
  const [notes, setNotes] = useState<string[]>([]);
  const [showNotes, setShowNotes] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const wordCount = countWords(content);
  const sessionWordCount = countWords(content) - countWords(sessionStartContent);

  useEffect(() => {
    if (sessionActive && !sessionStartContent) {
      setSessionStartContent(content);
    }
  }, [sessionActive, content, sessionStartContent]);

  useEffect(() => {
    onContentChange?.(content, wordCount);
  }, [content, wordCount, onContentChange]);

  const handleContentChange = (newContent: string) => {
    if (writeForwardEnabled && sessionActive) {
      const currentSessionContent = newContent.substring(sessionStartContent.length);
      const sessionStartLength = sessionStartContent.length;

      if (newContent.length < sessionStartLength) {
        return;
      }

      const cursorPosition = textareaRef.current?.selectionStart || 0;
      if (cursorPosition < sessionStartLength) {
        textareaRef.current?.setSelectionRange(sessionStartLength, sessionStartLength);
        return;
      }
    }

    setContent(newContent);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (writeForwardEnabled && sessionActive) {
      const cursorPosition = textareaRef.current?.selectionStart || 0;
      const sessionStartLength = sessionStartContent.length;

      if (e.key === 'Backspace' || e.key === 'Delete') {
        if (cursorPosition <= sessionStartLength) {
          e.preventDefault();
          return;
        }

        const wordsToDelete = content.substring(cursorPosition - 50, cursorPosition);
        if (wordsToDelete.split(' ').length > 10) {
          e.preventDefault();
          return;
        }
      }
    }

    if (e.key === 'Tab') {
      e.preventDefault();
      const start = textareaRef.current?.selectionStart || 0;
      const end = textareaRef.current?.selectionEnd || 0;
      const newContent = content.substring(0, start) + '    ' + content.substring(end);
      setContent(newContent);

      setTimeout(() => {
        textareaRef.current?.setSelectionRange(start + 4, start + 4);
      }, 0);
    }
  };

  const addNote = () => {
    const selection = textareaRef.current?.getSelection?.() || '';
    const noteText = selection || `[fix later: ${new Date().toLocaleTimeString()}]`;
    setNotes([...notes, noteText]);

    if (!selection) {
      const cursorPos = textareaRef.current?.selectionStart || 0;
      const newContent =
        content.substring(0, cursorPos) +
        ` ${noteText} ` +
        content.substring(cursorPos);
      setContent(newContent);
    }
  };

  const progress = Math.min((sessionWordCount / goalWords) * 100, 100);

  return (
    <div className="h-full flex flex-col bg-background">
      <div className="border-b border-border p-4 flex items-center justify-between bg-background/95 backdrop-blur">
        <div className="flex items-center gap-4">
          <div className="text-sm font-medium">
            {sessionWordCount} / {goalWords} words
          </div>
          <div className="w-32 h-2 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-primary transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          {sessionWordCount >= goalWords && (
            <div className="text-green-600 text-sm font-medium">Goal reached! 🎉</div>
          )}
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant={writeForwardEnabled ? 'default' : 'outline'}
            size="sm"
            onClick={() => setWriteForwardEnabled(!writeForwardEnabled)}
            className="gap-2"
          >
            {writeForwardEnabled ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            Write-Forward
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={addNote}
            className="gap-2"
          >
            <FileText className="h-4 w-4" />
            Add Note
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowNotes(!showNotes)}
            className="gap-2"
          >
            <AlertCircle className="h-4 w-4" />
            Notes ({notes.length})
          </Button>
        </div>
      </div>

      <div className="flex-1 flex">
        <div className="flex-1 relative">
          <textarea
            ref={textareaRef}
            value={content}
            onChange={(e) => handleContentChange(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Start writing your story here... Remember, this is just your first draft. Don't worry about perfection—just keep the words flowing."
            className="w-full h-full p-8 resize-none border-none outline-none text-lg leading-relaxed bg-transparent font-serif"
            style={{
              lineHeight: '1.6',
              fontFamily: 'Georgia, "Times New Roman", serif',
            }}
          />

          {writeForwardEnabled && sessionActive && (
            <div className="absolute top-4 right-4 bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
              Write-Forward Mode Active
            </div>
          )}
        </div>

        {showNotes && (
          <div className="w-80 border-l border-border bg-muted/30 p-4">
            <h3 className="font-medium mb-3">Session Notes</h3>
            <div className="space-y-2">
              {notes.length === 0 ? (
                <p className="text-sm text-muted-foreground">No notes yet</p>
              ) : (
                notes.map((note, index) => (
                  <div
                    key={index}
                    className="text-sm p-2 bg-background rounded border"
                  >
                    {note}
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>

      <div className="border-t border-border p-4 bg-background/95 backdrop-blur">
        <div className="flex justify-between items-center text-sm text-muted-foreground">
          <div>Total words: {wordCount.toLocaleString()}</div>
          <div>Session: +{sessionWordCount} words</div>
        </div>
      </div>
    </div>
  );
}