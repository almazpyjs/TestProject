import { useEffect, useRef, useState } from 'react';

const TOOLBAR_ACTIONS = [
  { command: 'bold', label: 'B', title: 'Полужирный', className: 'font-semibold' },
  { command: 'italic', label: 'I', title: 'Курсив', className: 'italic' },
  { command: 'underline', label: 'U', title: 'Подчеркнутый', className: 'underline' },
  { command: 'insertUnorderedList', label: '•', title: 'Маркированный список' },
  { command: 'insertOrderedList', label: '1.', title: 'Нумерованный список' },
  { command: 'formatBlock', value: 'blockquote', label: '❝', title: 'Цитата' },
];

const BLOCK_ACTIONS = [
  { value: 'p', label: 'Текст' },
  { value: 'h2', label: 'Заголовок H2' },
  { value: 'h3', label: 'Заголовок H3' },
  { value: 'pre', label: 'Код' },
];

function RichTextEditor({ value, onChange, placeholder = 'Начните вводить контент урока…' }) {
  const editorRef = useRef(null);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    const element = editorRef.current;
    if (!element) return;
    const sanitized = value || '';
    if (sanitized !== element.innerHTML) {
      element.innerHTML = sanitized;
    }
  }, [value]);

  const emitChange = () => {
    const element = editorRef.current;
    if (!element) return;
    onChange?.(element.innerHTML);
  };

  const handleToolbarAction = (action) => {
    const { command, value: commandValue } = action;
    if (!command) return;
    editorRef.current?.focus();
    if (command === 'createLink') {
      const url = window.prompt('Введите URL', 'https://');
      if (url) {
        document.execCommand('createLink', false, url.trim());
      }
    } else if (command === 'formatBlock' && commandValue) {
      document.execCommand('formatBlock', false, commandValue);
    } else {
      document.execCommand(command, false, null);
    }
    emitChange();
  };

  const handleBlockChange = (event) => {
    const block = event.target.value;
    editorRef.current?.focus();
    document.execCommand('formatBlock', false, block);
    emitChange();
  };

  const handlePaste = (event) => {
    event.preventDefault();
    const text = event.clipboardData.getData('text/plain');
    document.execCommand('insertText', false, text);
    emitChange();
  };

  return (
    <div className="rounded-3xl border border-slate-200 bg-white shadow-inner transition focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20 dark:border-slate-700 dark:bg-slate-900">
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-100 px-4 py-2 dark:border-slate-700">
        <select
          onChange={handleBlockChange}
          className="rounded-2xl border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-700 transition focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200"
        >
          {BLOCK_ACTIONS.map((action) => (
            <option key={action.value} value={action.value}>
              {action.label}
            </option>
          ))}
        </select>
        {TOOLBAR_ACTIONS.map((action) => (
          <button
            key={action.title}
            type="button"
            onMouseDown={(event) => event.preventDefault()}
            onClick={() => handleToolbarAction(action)}
            title={action.title}
            className={`rounded-full px-3 py-1 text-xs font-semibold text-slate-700 transition hover:bg-primary/10 hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary/20 dark:text-slate-200 ${action.className || ''}`}
          >
            {action.label}
          </button>
        ))}
        <button
          type="button"
          onMouseDown={(event) => event.preventDefault()}
          onClick={() => handleToolbarAction({ command: 'createLink' })}
          title="Вставить ссылку"
          className="rounded-full px-3 py-1 text-xs font-semibold text-slate-700 transition hover:bg-primary/10 hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary/20 dark:text-slate-200"
        >
          🔗
        </button>
        <button
          type="button"
          onMouseDown={(event) => event.preventDefault()}
          onClick={() => {
            document.execCommand('removeFormat');
            document.execCommand('unlink');
            emitChange();
          }}
          title="Очистить форматирование"
          className="rounded-full px-3 py-1 text-xs font-semibold text-slate-500 transition hover:bg-rose-100 hover:text-rose-500 focus:outline-none focus:ring-2 focus:ring-rose-200 dark:text-slate-300"
        >
          ✕
        </button>
      </div>
      <div className="relative">
        {!value && !isFocused && (
          <span className="pointer-events-none absolute left-4 top-3 text-sm text-slate-400 dark:text-slate-500">
            {placeholder}
          </span>
        )}
        <div
          ref={editorRef}
          className="min-h-[220px] w-full rounded-3xl px-4 py-3 text-sm leading-relaxed text-slate-800 focus:outline-none dark:text-slate-100"
          contentEditable
          onInput={emitChange}
          onBlur={() => {
            setIsFocused(false);
            emitChange();
          }}
          onFocus={() => setIsFocused(true)}
          onPaste={handlePaste}
        />
      </div>
    </div>
  );
}

export default RichTextEditor;
