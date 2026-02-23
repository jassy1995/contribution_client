import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import { Label } from '@/components/ui/label.jsx';
import { Input } from '@/components/ui/input.jsx';
import {
  BoldItalicUnderlineToggles,
  CreateLink,
  headingsPlugin,
  imagePlugin,
  insertImage$,
  InsertThematicBreak,
  linkDialogPlugin,
  listsPlugin,
  ListsToggle,
  markdownShortcutPlugin,
  MDXEditor,
  quotePlugin,
  thematicBreakPlugin,
  toolbarPlugin,
  UndoRedo,
  usePublisher,
} from '@mdxeditor/editor';
import '@mdxeditor/editor/style.css';
import { LucideImage } from 'lucide-react';
import Button from '@/components/global/Button.jsx';
import Tabs from '@/components/global/Tabs.jsx';
import { Combobox, ComboboxInput, ComboboxOption, ComboboxOptions } from '@headlessui/react';
import { useGetUploads } from '@/lib/api/insights.js';
import { useToast } from '@/lib/contexts/toast.js';
import { useDebounce } from 'react-use';

const bucket = import.meta.env.VITE_S3_BUCKET_NAME;

const isDataUrl = (url) => url.trim().toLowerCase().startsWith('data:image/');
const isHttpUrl = (url) => {
  try {
    const u = new URL(url);
    return u.protocol === 'http:' || u.protocol === 'https:';
  } catch {
    return false;
  }
};

function InsertImagePopover() {
  const insertImage = usePublisher(insertImage$);
  const [open, setOpen] = useState(false);
  const [coords, setCoords] = useState({ top: 0, left: 0 });
  const anchorRef = useRef(null);
  const [searchDebounced, setSearchDebounced] = useState('');
  const popRef = useRef(null);
  const [src, setSrc] = useState('');
  const [altText, setAltText] = useState('');
  const [title, setTitle] = useState('');
  const [tabIndex, setTabIndex] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFileItem, setSelectedFileItem] = useState(null);
  const fileTypes = ['png', 'jpg', 'jpeg', 'webp', 'gif'];
  const toast = useToast();

  const { data: { pages = [] } = {}, isLoading: isSearching } = useGetUploads({
    types: fileTypes,
    search: searchDebounced,
    isSearch: true,
  });
  const uploads = pages.map((p) => p.uploads).flat();

  useDebounce(() => setSearchDebounced(searchTerm), 600, [searchTerm]);

  const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

  const canInsertUrl = src.trim().length > 0;
  const canInsertSelected = !!selectedFileItem;

  const updatePosition = () => {
    if (!anchorRef.current) return;
    const rect = anchorRef.current.getBoundingClientRect();
    const width = 320;
    const margin = 8;
    const left = Math.min(Math.max(margin, rect.left), window.innerWidth - width - margin);
    const top = rect.bottom + margin;
    setCoords({ top, left });
  };

  useEffect(() => {
    if (!open) return;
    updatePosition();
    const handleScroll = () => updatePosition();
    const handleResize = () => updatePosition();
    const handleClickOutside = (e) => {
      if (!popRef.current || !anchorRef.current) return;
      if (!popRef.current.contains(e.target) && !anchorRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    window.addEventListener('scroll', handleScroll, true);
    window.addEventListener('resize', handleResize);
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      window.removeEventListener('scroll', handleScroll, true);
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [open]);

  const handleInsertUrl = async () => {
    if (!canInsertUrl) return;
    const url = src.trim();
    if (isDataUrl(url)) return toast.error('Base64 images are not allowed');
    if (!isHttpUrl(url)) return toast.error('Please enter a valid http(s) image URL');
    let canProceed = true;
    try {
      const headRes = await window.fetch(url, { method: 'HEAD' });
      const len = headRes.headers.get('content-length');
      if (len && Number(len) > MAX_FILE_SIZE) {
        canProceed = false;
        toast.error('Image is too large (max 5MB)');
      }
      if (canProceed && (!len || Number(len) === 0)) {
        const res = await window.fetch(url);
        const blob = await res.blob();
        if (blob.size > MAX_FILE_SIZE) {
          canProceed = false;
          toast.error('Image is too large (max 5MB)');
        }
      }
    } catch {
      toast.warning('Could not verify image size due to CORS; inserting anyway');
    }
    if (!canProceed) return;
    insertImage({ src: url, altText: altText.trim() || undefined, title: title.trim() || undefined });
    setOpen(false);
    setSrc('');
    setAltText('');
    setTitle('');
  };

  const handleInsertSelected = (chosenArg) => {
    const chosen = chosenArg || selectedFileItem;
    if (!chosen) return;
    const url = `https://${bucket}.s3.amazonaws.com/${chosen.file}`;
    insertImage({ src: url, altText: (chosen.name || '').trim() || undefined });
    setOpen(false);
    setSrc('');
    setAltText('');
    setTitle('');
    setSelectedFileItem(null);
  };

  return (
    <span ref={anchorRef} className="inline-flex">
      <button
        type="button"
        title="Insert image"
        className="px-1.5 py-1.5 text-sm rounded-md bg-transparent hover:bg-black/5 cursor-pointer"
        onClick={() => setOpen((v) => !v)}
      >
        <LucideImage size="16" />
      </button>
      {open &&
        createPortal(
          <div
            ref={popRef}
            style={{ position: 'fixed', top: `${coords.top}px`, left: `${coords.left}px`, width: '20rem' }}
            className="rounded-xl border border-gray-200 bg-white px-6 py-5 shadow-lg z-[1000]"
          >
            <Tabs
              index={tabIndex}
              onChange={(idx) => {
                setTabIndex(idx);
                setSrc('');
                setAltText('');
                setTitle('');
                setSelectedFileItem(null);
                setSearchTerm('');
                setSearchDebounced('');
              }}
              tabs={[
                {
                  key: 'url',
                  name: 'From URL',
                  panel: (
                    <div className="flex flex-col gap-2">
                      <Label>Image URL</Label>
                      <Input placeholder="https://..." value={src} onChange={(e) => setSrc(e.target.value)} />
                      <Label>Name</Label>
                      <Input
                        placeholder="name the image"
                        value={altText}
                        onChange={(e) => setAltText(e.target.value)}
                      />
                      <div className="flex justify-end gap-2 pt-2">
                        <Button variant="outline" onClick={() => setOpen(false)}>
                          Cancel
                        </Button>
                        <Button
                          onClick={handleInsertUrl}
                          disabled={!canInsertUrl}
                          className="bg-teal-500 hover:bg-teal-600"
                        >
                          Insert
                        </Button>
                      </div>
                    </div>
                  ),
                },
                {
                  key: 'select',
                  name: 'Upload',
                  panel: (
                    <div className="flex flex-col gap-2">
                      <Label>Image file</Label>
                      <Combobox
                        value={selectedFileItem}
                        onChange={(chosen) => {
                          setSelectedFileItem(chosen || null);
                          setAltText(chosen?.name || '');
                          if (chosen) {
                            handleInsertSelected(chosen);
                          }
                        }}
                      >
                        <div className="relative">
                          <ComboboxInput
                            className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 outline-none focus:ring-2 focus:ring-neutral-950"
                            displayValue={(item) => item?.name || ''}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder={isSearching ? 'Searching...' : 'Search and select file'}
                          />
                        </div>
                        <ComboboxOptions className="mt-2 max-h-60 overflow-auto rounded-md border border-neutral-200 bg-white p-1 text-neutral-950 shadow focus:outline-none">
                          {isSearching && <div className="px-3 py-2 text-sm text-neutral-500">Searching...</div>}
                          {!isSearching &&
                            (uploads || []).length > 0 &&
                            (uploads || []).map((f) => (
                              <ComboboxOption
                                key={f.file}
                                value={f}
                                className={({ active }) =>
                                  `cursor-pointer select-none rounded-md px-3 py-2 text-sm ${active ? 'bg-neutral-100 text-neutral-900' : ''}`
                                }
                              >
                                {f.name} ({f.type})
                              </ComboboxOption>
                            ))}
                          {!isSearching && (uploads || []).length === 0 && (
                            <div className="px-3 py-2 text-sm text-neutral-500">No files found</div>
                          )}
                        </ComboboxOptions>
                      </Combobox>
                      <div className="flex justify-end gap-2 pt-2">
                        <Button variant="outline" onClick={() => setOpen(false)}>
                          Cancel
                        </Button>
                        <Button
                          onClick={handleInsertSelected}
                          disabled={!canInsertSelected}
                          className="bg-teal-500 hover:bg-teal-600"
                        >
                          Insert
                        </Button>
                      </div>
                    </div>
                  ),
                },
              ]}
            />
          </div>,
          document.body
        )}
    </span>
  );
}

function DefaultToolbar() {
  return (
    <>
      <UndoRedo />
      <BoldItalicUnderlineToggles />
      <CreateLink />
      <InsertImagePopover />
      <InsertThematicBreak />
      <ListsToggle />
    </>
  );
}

const RichTextEditor = ({ value, onChange, disabled, className, toolbarContents, onImageUpload }) => {
  return (
    <MDXEditor
      markdown={value}
      onChange={(markdown) => onChange?.(markdown)}
      disabled={disabled}
      className={className}
      plugins={[
        headingsPlugin(),
        listsPlugin(),
        quotePlugin(),
        thematicBreakPlugin(),
        markdownShortcutPlugin(),
        linkDialogPlugin(),
        imagePlugin({ disableImageSettingsButton: true }),
        toolbarPlugin({
          toolbarContents: () =>
            toolbarContents ? toolbarContents() : <DefaultToolbar onImageUpload={onImageUpload} />,
        }),
      ]}
    />
  );
};

RichTextEditor.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  toolbarContents: PropTypes.func,
  onImageUpload: PropTypes.func,
};
DefaultToolbar.propTypes = {
  onImageUpload: PropTypes.func,
};

export default RichTextEditor;
