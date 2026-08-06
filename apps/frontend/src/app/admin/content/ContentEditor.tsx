'use client';

import { useRef, useState } from 'react';
import type { SiteContent } from '@/lib/content';
import type { Yatra } from '@/lib/yatras';

type Path = (string | number)[];

function setDeep<T>(obj: T, path: Path, value: unknown): T {
  if (path.length === 0) return value as T;
  const [head, ...rest] = path;
  const clone: Record<string | number, unknown> = Array.isArray(obj)
    ? ([...(obj as unknown[])] as unknown as Record<string | number, unknown>)
    : { ...(obj as Record<string | number, unknown>) };
  clone[head] = setDeep(clone[head], rest, value);
  return clone as T;
}

function getDeep(obj: unknown, path: Path): unknown {
  return path.reduce<unknown>(
    (acc, key) => (acc as Record<string | number, unknown> | undefined)?.[key],
    obj,
  );
}

const SECTIONS = [
  { id: 'home', label: 'Homepage' },
  { id: 'yatras', label: 'Yatras' },
  { id: 'experience', label: 'Experience' },
  { id: 'footer', label: 'Footer & Contact' },
  { id: 'settings', label: 'WhatsApp' },
] as const;

type SectionId = (typeof SECTIONS)[number]['id'];

export default function ContentEditor({ initialContent }: { initialContent: SiteContent }) {
  const [content, setContent] = useState<SiteContent>(initialContent);
  const [savedContent, setSavedContent] = useState<SiteContent>(initialContent);
  const [section, setSection] = useState<SectionId>('home');
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ kind: 'ok' | 'err'; text: string } | null>(null);

  function update(path: Path, value: unknown) {
    setContent((c) => setDeep(c, path, value));
    setMessage(null);
  }

  async function persist(next: SiteContent) {
    const res = await fetch('/api/admin/content', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content: next }),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(data.error || 'Save failed');
  }

  async function save() {
    setSaving(true);
    setMessage(null);
    try {
      await persist(content);
      setSavedContent(content);
      setMessage({ kind: 'ok', text: 'Saved. The live site now shows this content.' });
    } catch (err) {
      setMessage({ kind: 'err', text: err instanceof Error ? err.message : 'Save failed' });
    } finally {
      setSaving(false);
    }
  }

  const fieldProps = { content, update };

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-serif text-[34px] font-medium text-heading">Content</h1>
          <p className="mt-2 text-[14px] text-secondary">
            Edit the website&apos;s text, images and video. Changes go live when you save.
          </p>
        </div>
        {section !== 'yatras' && (
          <div className="flex items-center gap-4">
            {message && (
              <span
                className={`text-[13px] ${message.kind === 'ok' ? 'text-success' : 'text-danger'}`}
              >
                {message.text}
              </span>
            )}
            <button
              onClick={save}
              disabled={saving}
              className="cursor-pointer rounded-full bg-ink px-8 py-3 text-[12px] tracking-[0.18em] text-surface uppercase disabled:opacity-60"
            >
              {saving ? 'Saving…' : 'Save changes'}
            </button>
          </div>
        )}
      </div>

      <div className="mt-8 flex flex-wrap gap-2 border-b border-border pb-4">
        {SECTIONS.map((s) => (
          <button
            key={s.id}
            onClick={() => setSection(s.id)}
            className={`cursor-pointer rounded-full px-5 py-2 text-[11.5px] tracking-[0.14em] uppercase transition ${
              section === s.id
                ? 'bg-ink text-surface'
                : 'bg-card-alt text-secondary hover:bg-card-alt'
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>

      <div className="mt-8 flex flex-col gap-10 pb-24">
        {section === 'home' && <HomeSection {...fieldProps} />}
        {section === 'settings' && <SettingsSection {...fieldProps} />}
        {section === 'footer' && <FooterSection {...fieldProps} />}
        {section === 'yatras' && (
          <YatrasSection
            {...fieldProps}
            savedContent={savedContent}
            onSaveYatra={async () => {
              await persist(content);
              setSavedContent(content);
            }}
          />
        )}
        {section === 'experience' && <ExperienceSection {...fieldProps} />}
      </div>
    </div>
  );
}

/* ---------- shared field primitives ---------- */

type FieldProps = {
  content: SiteContent;
  update: (path: Path, value: unknown) => void;
};

function Group({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <fieldset className="border border-border bg-raised p-6">
      <legend className="px-2 text-[11px] tracking-[0.2em] text-accent uppercase">{title}</legend>
      <div className="flex flex-col gap-5">{children}</div>
    </fieldset>
  );
}

function Text({
  content,
  update,
  path,
  label,
  multiline,
  hint,
}: FieldProps & { path: Path; label: string; multiline?: boolean; hint?: string }) {
  const value = String(getDeep(content, path) ?? '');
  const cls =
    'w-full border-b border-border bg-transparent py-2 text-[14px] text-ink outline-none focus:border-accent';
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-[11px] tracking-[0.16em] text-label uppercase">{label}</span>
      {multiline ? (
        <textarea
          value={value}
          rows={3}
          onChange={(e) => update(path, e.target.value)}
          className={`${cls} resize-y`}
        />
      ) : (
        <input value={value} onChange={(e) => update(path, e.target.value)} className={cls} />
      )}
      {hint && <span className="text-[12px] text-label">{hint}</span>}
    </label>
  );
}

function Select({
  content,
  update,
  path,
  label,
  options,
}: FieldProps & { path: Path; label: string; options: { value: string; label: string }[] }) {
  const value = String(getDeep(content, path) ?? '');
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-[11px] tracking-[0.16em] text-label uppercase">{label}</span>
      <select
        value={value}
        onChange={(e) => update(path, e.target.value)}
        className="w-full border-b border-border bg-transparent py-2 text-[14px] text-ink outline-none focus:border-accent"
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </label>
  );
}

function MediaField({
  content,
  update,
  path,
  label,
  kind,
}: FieldProps & { path: Path; label: string; kind: 'image' | 'video' }) {
  const value = String(getDeep(content, path) ?? '');
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const fileRef = useRef<HTMLInputElement>(null);

  async function upload(file: File) {
    setUploading(true);
    setError('');
    try {
      const body = new FormData();
      body.append('file', file);
      const res = await fetch('/api/admin/media', { method: 'POST', body });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || 'Upload failed');
      update(path, data.url);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed');
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="flex flex-col gap-2">
      <span className="text-[11px] tracking-[0.16em] text-label uppercase">{label}</span>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start">
        <div className="flex-1">
          <input
            value={value}
            onChange={(e) => update(path, e.target.value)}
            placeholder={kind === 'image' ? 'https://… image URL' : 'https://… video URL (mp4)'}
            className="w-full border-b border-border bg-transparent py-2 text-[13px] text-ink outline-none focus:border-accent"
          />
          <div className="mt-2 flex items-center gap-3">
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              disabled={uploading}
              className="cursor-pointer rounded-full border border-ink/40 px-4 py-[6px] text-[10.5px] tracking-[0.14em] text-ink uppercase hover:bg-ink/5 disabled:opacity-60"
            >
              {uploading ? 'Uploading…' : `Upload ${kind}`}
            </button>
            <span className="text-[11.5px] text-label">or paste a URL above</span>
          </div>
          {error && <p className="mt-2 text-[12px] text-danger">{error}</p>}
          <input
            ref={fileRef}
            type="file"
            accept={kind === 'image' ? 'image/*' : 'video/*'}
            className="hidden"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) upload(f);
              e.target.value = '';
            }}
          />
        </div>
        {value &&
          (kind === 'image' ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={value}
              alt=""
              className="h-[72px] w-[110px] shrink-0 border border-border object-cover"
            />
          ) : (
            <video
              src={value}
              muted
              playsInline
              preload="metadata"
              className="h-[72px] w-[110px] shrink-0 border border-border bg-ink object-cover"
            />
          ))}
      </div>
    </div>
  );
}

function StringList({
  content,
  update,
  path,
  label,
  itemLabel,
}: FieldProps & { path: Path; label: string; itemLabel: string }) {
  const raw = getDeep(content, path);
  const items = Array.isArray(raw) ? raw : raw ? [String(raw)] : [];
  const text = items.join('\n');
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-[11px] tracking-[0.16em] text-label uppercase">{label}</span>
      <textarea
        defaultValue={text}
        rows={Math.min(Math.max(items.length, 3), 14)}
        placeholder={`One ${itemLabel.toLowerCase()} per line`}
        onBlur={(e) =>
          update(
            path,
            e.target.value
              .split('\n')
              .map((line) => line.trim())
              .filter(Boolean),
          )
        }
        className="w-full resize-y border-b border-border bg-transparent py-2 text-[14px] leading-[1.7] text-ink outline-none focus:border-accent"
      />
      <span className="text-[12px] text-label">One {itemLabel.toLowerCase()} per line.</span>
    </label>
  );
}

function RowButton({ onClick, children }: { onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="cursor-pointer self-start rounded-full border border-ink/30 px-4 py-[6px] text-[10.5px] tracking-[0.14em] text-secondary uppercase hover:bg-ink/5"
    >
      {children}
    </button>
  );
}

/* ---------- sections ---------- */

function HomeSection(p: FieldProps) {
  const { content, update } = p;
  return (
    <>
      <Group title="Intro strip">
        <Text
          {...p}
          path={['home', 'intro', 'quote']}
          label="Quote"
          multiline
          hint="Shown just below the hero video."
        />
        <Text {...p} path={['home', 'intro', 'buttonText']} label="Button text" />
      </Group>

      <Group title="On Pilgrimage">
        <Text {...p} path={['home', 'pilgrimage', 'eyebrow']} label="Section label" />
        <Text {...p} path={['home', 'pilgrimage', 'lead']} label="Lead paragraph" multiline />
        <Text {...p} path={['home', 'pilgrimage', 'body']} label="Body paragraph" multiline />
        <Text {...p} path={['home', 'pilgrimage', 'linkText']} label="Link text" />
        <MediaField {...p} path={['home', 'pilgrimage', 'image']} label="Image" kind="image" />
      </Group>

      <Group title="Our Philosophy">
        <Text {...p} path={['home', 'philosophy', 'eyebrow']} label="Section label" />
        <Text {...p} path={['home', 'philosophy', 'lead']} label="Lead paragraph" multiline />
        <Text {...p} path={['home', 'philosophy', 'body']} label="Body paragraph" multiline />
        <MediaField {...p} path={['home', 'philosophy', 'image']} label="Image" kind="image" />
      </Group>

      <Group title="Gallery">
        <Text {...p} path={['home', 'gallery', 'heading']} label="Heading" />
        <Text {...p} path={['home', 'gallery', 'label']} label="Right-side label" />
        {content.home.gallery.images.map((img, i) => (
          <div key={i} className="flex flex-col gap-3 border-b border-card-alt pb-5">
            <MediaField
              {...p}
              path={['home', 'gallery', 'images', i, 'src']}
              label={`Image ${i + 1}`}
              kind="image"
            />
            <Text
              {...p}
              path={['home', 'gallery', 'images', i, 'alt']}
              label="Alt text (describes the image)"
            />
            <RowButton
              onClick={() =>
                update(
                  ['home', 'gallery', 'images'],
                  content.home.gallery.images.filter((_, j) => j !== i),
                )
              }
            >
              Remove image
            </RowButton>
          </div>
        ))}
        <RowButton
          onClick={() =>
            update(
              ['home', 'gallery', 'images'],
              [...content.home.gallery.images, { src: '', alt: '' }],
            )
          }
        >
          + Add gallery image
        </RowButton>
      </Group>

      <Group title="Bottom call to action">
        <Text {...p} path={['home', 'cta', 'eyebrow']} label="Small line" />
        <Text {...p} path={['home', 'cta', 'heading']} label="Heading" multiline />
        <Text {...p} path={['home', 'cta', 'buttonText']} label="Button text" />
      </Group>
    </>
  );
}

function SettingsSection(p: FieldProps) {
  return (
    <Group title="WhatsApp">
      <Text
        {...p}
        path={['settings', 'whatsappNumber']}
        label="WhatsApp number"
        hint="Country code + number, digits only. Example: 918144123123"
      />
      <Text
        {...p}
        path={['settings', 'whatsappMessage']}
        label="Pre-filled message"
        multiline
        hint="This text appears in the visitor's WhatsApp chat box when they tap the button."
      />
    </Group>
  );
}

function FooterSection(p: FieldProps) {
  return (
    <>
      <Group title="Footer">
        <Text {...p} path={['footer', 'tagline']} label="Tagline" multiline />
        <Text {...p} path={['footer', 'copyright']} label="Copyright line" />
      </Group>
      <Group title="Contact details">
        <Text {...p} path={['footer', 'phone']} label="Phone" />
        <Text {...p} path={['footer', 'email']} label="Email" />
        <Text {...p} path={['footer', 'address']} label="Address" />
      </Group>
    </>
  );
}

function YatrasSection(
  p: FieldProps & { savedContent: SiteContent; onSaveYatra: () => Promise<void> },
) {
  const { content, update, savedContent, onSaveYatra } = p;
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [savingIndex, setSavingIndex] = useState<number | null>(null);
  const [savedFlashIndex, setSavedFlashIndex] = useState<number | null>(null);
  const [errorIndex, setErrorIndex] = useState<number | null>(null);

  async function saveYatra(i: number) {
    setSavingIndex(i);
    setErrorIndex(null);
    try {
      await onSaveYatra();
      setSavedFlashIndex(i);
      setTimeout(() => setSavedFlashIndex((cur) => (cur === i ? null : cur)), 2000);
    } catch {
      setErrorIndex(i);
    } finally {
      setSavingIndex(null);
    }
  }

  function addYatra() {
    const next: Yatra = {
      n: String(content.yatras.length + 1).padStart(2, '0'),
      slug: `new-yatra-${content.yatras.length + 1}`,
      name: 'New Yatra',
      days: '7 Days',
      region: '',
      route: '',
      status: 'opening-soon',
      heroImage: '',
      heroPlaceholder: '',
      featureImage: '',
      featurePlaceholder: '',
      overviewLead: '',
      overviewBody: '',
      whyVisitQuote: '',
      whyVisit: [],
      highlights: [],
      highlightsOptional: [],
      stays: [],
      specs: [{ k: 'Duration', v: '7 Days' }],
      itinerary: [{ day: 'Day 01', place: '', note: [] }],
    };
    update(['yatras'], [...content.yatras, next]);
    setOpenIndex(content.yatras.length);
  }

  return (
    <>
      {content.yatras.map((y, i) => {
        const isDirty = JSON.stringify(y) !== JSON.stringify(savedContent.yatras[i]);
        return (
          <div key={i} className="relative border border-border bg-raised">
            <div className="flex w-full items-center justify-between px-6 py-4">
              <button
                type="button"
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="flex flex-1 cursor-pointer items-center gap-2.5 text-left font-serif text-[20px] font-medium text-heading"
              >
                {y.n} — {y.name || 'Untitled yatra'}
                {isDirty && (
                  <span
                    className="h-2 w-2 shrink-0 rounded-full bg-accent"
                    title="Unsaved changes"
                    aria-label="Unsaved changes"
                  />
                )}
              </button>
              <div className="flex shrink-0 items-center -space-x-1">
                <button
                  type="button"
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  aria-label={openIndex === i ? 'Close editor' : 'Edit yatra'}
                  title={openIndex === i ? 'Close editor' : 'Edit yatra'}
                  className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full text-label transition hover:bg-card-alt hover:text-ink"
                >
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path
                      d="M4 20h4L18.5 9.5a2.12 2.12 0 0 0-3-3L5 17v3Z"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (window.confirm(`Remove "${y.name || 'this yatra'}" from the website?`)) {
                      update(
                        ['yatras'],
                        content.yatras.filter((_, j) => j !== i),
                      );
                      if (openIndex === i) setOpenIndex(null);
                    }
                  }}
                  aria-label="Delete yatra"
                  title="Delete yatra"
                  className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full text-danger transition hover:bg-danger/10"
                >
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path
                      d="M5 7h14M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2m2 0-.7 12.1a2 2 0 0 1-2 1.9H8.7a2 2 0 0 1-2-1.9L6 7h12ZM10 11v6M14 11v6"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
            </div>

            {openIndex === i && (
              <div className="flex flex-col gap-5 border-t border-card-alt p-6 pb-24">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <Text {...p} path={['yatras', i, 'name']} label="Name" />
                  <Text
                    {...p}
                    path={['yatras', i, 'slug']}
                    label="URL slug"
                    hint="Lowercase with hyphens; changing it changes the page address."
                  />
                  <Text {...p} path={['yatras', i, 'n']} label="Number (e.g. 01)" />
                  <Text {...p} path={['yatras', i, 'days']} label="Duration (e.g. 14 Days)" />
                  <Text {...p} path={['yatras', i, 'region']} label="Region" />
                  <Text {...p} path={['yatras', i, 'route']} label="Route line" />
                  <Select
                    {...p}
                    path={['yatras', i, 'status']}
                    label="Availability status"
                    options={[
                      { value: 'open', label: 'Open for Registrations' },
                      { value: 'opening-soon', label: 'Coming Soon' },
                      { value: 'closed', label: 'Registrations Closed' },
                    ]}
                  />
                </div>
                <MediaField
                  {...p}
                  path={['yatras', i, 'heroImage']}
                  label="Hero image"
                  kind="image"
                />
                <Text
                  {...p}
                  path={['yatras', i, 'heroPlaceholder']}
                  label="Hero image description"
                  hint="Used as alt text for accessibility and while the image loads."
                />
                <MediaField
                  {...p}
                  path={['yatras', i, 'featureImage']}
                  label="Feature image"
                  kind="image"
                />
                <Text
                  {...p}
                  path={['yatras', i, 'featurePlaceholder']}
                  label="Feature image description"
                  hint="Used as alt text for accessibility and while the image loads."
                />
                <Text {...p} path={['yatras', i, 'overviewLead']} label="Overview lead" multiline />
                <Text {...p} path={['yatras', i, 'overviewBody']} label="Overview body" multiline />

                <div className="mt-2 text-[11px] tracking-[0.2em] text-accent uppercase">
                  Why visit
                </div>
                <Text
                  {...p}
                  path={['yatras', i, 'whyVisitQuote']}
                  label="Why-visit quote"
                  multiline
                />
                <StringList
                  {...p}
                  path={['yatras', i, 'whyVisit']}
                  label="Why-visit paragraphs"
                  itemLabel="Paragraph"
                />

                <div className="mt-2 text-[11px] tracking-[0.2em] text-accent uppercase">
                  Highlights
                </div>
                <StringList
                  {...p}
                  path={['yatras', i, 'highlights']}
                  label="Highlights"
                  itemLabel="Highlight"
                />
                <StringList
                  {...p}
                  path={['yatras', i, 'highlightsOptional']}
                  label="Optional highlights"
                  itemLabel="Highlight"
                />

                <div className="mt-2 text-[11px] tracking-[0.2em] text-accent uppercase">Stays</div>
                {(y.stays ?? []).map((stay, j) => (
                  <div key={j} className="flex flex-col gap-3 border-b border-card-alt pb-4">
                    <div className="grid grid-cols-[1fr_auto] items-end gap-3">
                      <Text {...p} path={['yatras', i, 'stays', j, 'place']} label="Place" />
                      <RowButton
                        onClick={() =>
                          update(
                            ['yatras', i, 'stays'],
                            (y.stays ?? []).filter((_, k) => k !== j),
                          )
                        }
                      >
                        Remove stay
                      </RowButton>
                    </div>
                    <StringList
                      {...p}
                      path={['yatras', i, 'stays', j, 'options']}
                      label="Accommodation options"
                      itemLabel="Option"
                    />
                  </div>
                ))}
                <RowButton
                  onClick={() =>
                    update(['yatras', i, 'stays'], [...(y.stays ?? []), { place: '', options: [] }])
                  }
                >
                  + Add stay
                </RowButton>

                <div className="mt-2 text-[11px] tracking-[0.2em] text-accent uppercase">
                  Quick facts
                </div>
                {y.specs.map((s, j) => (
                  <div key={j} className="grid grid-cols-[1fr_1fr_auto] items-end gap-4">
                    <Text {...p} path={['yatras', i, 'specs', j, 'k']} label="Label" />
                    <Text {...p} path={['yatras', i, 'specs', j, 'v']} label="Value" />
                    <RowButton
                      onClick={() =>
                        update(
                          ['yatras', i, 'specs'],
                          y.specs.filter((_, k) => k !== j),
                        )
                      }
                    >
                      Remove
                    </RowButton>
                  </div>
                ))}
                <RowButton
                  onClick={() => update(['yatras', i, 'specs'], [...y.specs, { k: '', v: '' }])}
                >
                  + Add fact
                </RowButton>

                <div className="mt-2 text-[11px] tracking-[0.2em] text-accent uppercase">
                  Itinerary
                </div>
                {y.itinerary.map((d, j) => (
                  <div
                    key={j}
                    className="grid grid-cols-1 gap-4 border-b border-card-alt pb-4 sm:grid-cols-[130px_1fr]"
                  >
                    <Text {...p} path={['yatras', i, 'itinerary', j, 'day']} label="Day" />
                    <Text {...p} path={['yatras', i, 'itinerary', j, 'place']} label="Place" />
                    <div className="sm:col-span-2">
                      <StringList
                        {...p}
                        path={['yatras', i, 'itinerary', j, 'note']}
                        label="Points"
                        itemLabel="Point"
                      />
                    </div>
                    <RowButton
                      onClick={() =>
                        update(
                          ['yatras', i, 'itinerary'],
                          y.itinerary.filter((_, k) => k !== j),
                        )
                      }
                    >
                      Remove day
                    </RowButton>
                  </div>
                ))}
                <RowButton
                  onClick={() =>
                    update(
                      ['yatras', i, 'itinerary'],
                      [
                        ...y.itinerary,
                        {
                          day: `Day ${String(y.itinerary.length + 1).padStart(2, '0')}`,
                          place: '',
                          note: [],
                        },
                      ],
                    )
                  }
                >
                  + Add day
                </RowButton>

                <div className="mt-4 border-t border-card-alt pt-4">
                  <RowButton
                    onClick={() => {
                      if (window.confirm(`Remove "${y.name}" from the website?`)) {
                        update(
                          ['yatras'],
                          content.yatras.filter((_, j) => j !== i),
                        );
                        setOpenIndex(null);
                      }
                    }}
                  >
                    Remove this yatra
                  </RowButton>
                </div>

                {(isDirty || savedFlashIndex === i || errorIndex === i) && (
                  <div className="sticky bottom-4 z-10 flex justify-end">
                    <div className="flex items-center gap-3 rounded-full border border-border bg-raised px-3 py-2 shadow-[0_8px_28px_rgba(20,18,12,.16)]">
                      {errorIndex === i && (
                        <span className="pl-2 text-[12.5px] text-danger">Save failed</span>
                      )}
                      {savedFlashIndex === i && (
                        <span className="pl-2 text-[12.5px] text-success">Saved</span>
                      )}
                      {isDirty && (
                        <button
                          type="button"
                          onClick={() => saveYatra(i)}
                          disabled={savingIndex === i}
                          className="cursor-pointer rounded-full bg-ink px-6 py-[10px] text-[11.5px] tracking-[0.16em] text-surface uppercase disabled:opacity-60"
                        >
                          {savingIndex === i ? 'Saving…' : `Save ${y.name || 'this yatra'}`}
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        );
      })}
      <RowButton onClick={addYatra}>+ Add yatra</RowButton>
    </>
  );
}

function ExperienceSection(p: FieldProps) {
  const { content, update } = p;
  return (
    <>
      <Group title="Introduction">
        <Text {...p} path={['experience', 'eyebrow']} label="Section label" />
        <Text {...p} path={['experience', 'heading']} label="Heading" />
      </Group>

      <Group title="Programme Guide">
        <Text {...p} path={['experience', 'programmeGuide', 'heading']} label="Heading" />
        <Text {...p} path={['experience', 'programmeGuide', 'intro']} label="Intro" multiline />
        <StringList
          {...p}
          path={['experience', 'programmeGuide', 'items']}
          label="Journey may include"
          itemLabel="Item"
        />
        <Text {...p} path={['experience', 'programmeGuide', 'closing']} label="Closing line" />
      </Group>

      <Group title="Dates & Registration">
        <Text {...p} path={['experience', 'datesRegistration', 'heading']} label="Heading" />
        <Text {...p} path={['experience', 'datesRegistration', 'intro']} label="Intro" multiline />
        <Text
          {...p}
          path={['experience', 'datesRegistration', 'groupSizeHeading']}
          label="Group size heading"
        />
        <Text {...p} path={['experience', 'datesRegistration', 'groupSize']} label="Group size" />
        <Text
          {...p}
          path={['experience', 'datesRegistration', 'departuresHeading']}
          label="Departures heading"
        />
        <Text
          {...p}
          path={['experience', 'datesRegistration', 'departures']}
          label="Departures"
          multiline
        />
        <Text {...p} path={['experience', 'datesRegistration', 'note']} label="Note" multiline />
        <Text
          {...p}
          path={['experience', 'datesRegistration', 'privateNote']}
          label="Private departures note"
          multiline
        />
      </Group>

      <Group title="Customised Itineraries">
        <Text {...p} path={['experience', 'customisedItineraries', 'heading']} label="Heading" />
        <Text
          {...p}
          path={['experience', 'customisedItineraries', 'intro']}
          label="Intro"
          multiline
        />
        <StringList
          {...p}
          path={['experience', 'customisedItineraries', 'items']}
          label="Custom journey types"
          itemLabel="Item"
        />
        <Text
          {...p}
          path={['experience', 'customisedItineraries', 'closing']}
          label="Closing line"
        />
      </Group>

      <Group title="All Inclusions">
        <Text {...p} path={['experience', 'allInclusions', 'heading']} label="Heading" />
        <Text
          {...p}
          path={['experience', 'allInclusions', 'includedHeading']}
          label="Included list heading"
        />
        <StringList
          {...p}
          path={['experience', 'allInclusions', 'included']}
          label="Every Sacred Walk includes"
          itemLabel="Item"
        />
        <Text
          {...p}
          path={['experience', 'allInclusions', 'onRequestHeading']}
          label="On-request list heading"
        />
        <StringList
          {...p}
          path={['experience', 'allInclusions', 'onRequest']}
          label="Available on request"
          itemLabel="Item"
        />
      </Group>

      <Group title="Frequently Asked Questions">
        {content.experience.faq.map((f, i) => (
          <div key={i} className="flex flex-col gap-4 border-b border-card-alt pb-5">
            <Text {...p} path={['experience', 'faq', i, 'question']} label={`Question ${i + 1}`} />
            <Text {...p} path={['experience', 'faq', i, 'answer']} label="Answer" multiline />
            <RowButton
              onClick={() =>
                update(
                  ['experience', 'faq'],
                  content.experience.faq.filter((_, j) => j !== i),
                )
              }
            >
              Remove question
            </RowButton>
          </div>
        ))}
        <RowButton
          onClick={() =>
            update(['experience', 'faq'], [...content.experience.faq, { question: '', answer: '' }])
          }
        >
          + Add question
        </RowButton>
      </Group>
    </>
  );
}
