'use client';

import { useRef, useState } from 'react';
import type { SiteContent } from '@/lib/content';
import type { Yatra, FutureDestination } from '@/lib/yatras';

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
  { id: 'video', label: 'Video' },
  { id: 'settings', label: 'WhatsApp' },
  { id: 'footer', label: 'Footer & Contact' },
  { id: 'yatras', label: 'Yatras' },
  { id: 'futureDestinations', label: 'Future Destinations' },
  { id: 'experience', label: 'Experience' },
] as const;

type SectionId = (typeof SECTIONS)[number]['id'];

export default function ContentEditor({ initialContent }: { initialContent: SiteContent }) {
  const [content, setContent] = useState<SiteContent>(initialContent);
  const [section, setSection] = useState<SectionId>('home');
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ kind: 'ok' | 'err'; text: string } | null>(null);

  function update(path: Path, value: unknown) {
    setContent((c) => setDeep(c, path, value));
    setMessage(null);
  }

  async function save() {
    setSaving(true);
    setMessage(null);
    try {
      const res = await fetch('/api/admin/content', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || 'Save failed');
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
          <h1 className="font-serif text-[34px] font-medium text-[#2C2A22]">Content</h1>
          <p className="mt-2 text-[14px] text-[#5F5C50]">
            Edit the website&apos;s text, images and video. Changes go live when you save.
          </p>
        </div>
        <div className="flex items-center gap-4">
          {message && (
            <span
              className={`text-[13px] ${message.kind === 'ok' ? 'text-[#5C6852]' : 'text-[#A05B4C]'}`}
            >
              {message.text}
            </span>
          )}
          <button
            onClick={save}
            disabled={saving}
            className="cursor-pointer rounded-full bg-[#25241E] px-8 py-3 text-[12px] tracking-[0.18em] text-[#F5F1E9] uppercase disabled:opacity-60"
          >
            {saving ? 'Saving…' : 'Save changes'}
          </button>
        </div>
      </div>

      <div className="mt-8 flex flex-wrap gap-2 border-b border-[#D8CFBD] pb-4">
        {SECTIONS.map((s) => (
          <button
            key={s.id}
            onClick={() => setSection(s.id)}
            className={`cursor-pointer rounded-full px-5 py-2 text-[11.5px] tracking-[0.14em] uppercase transition ${
              section === s.id
                ? 'bg-[#25241E] text-[#F5F1E9]'
                : 'bg-[#EDE6D6] text-[#5F5C50] hover:bg-[#E2D9C7]'
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>

      <div className="mt-8 flex flex-col gap-10 pb-24">
        {section === 'home' && <HomeSection {...fieldProps} />}
        {section === 'video' && <VideoSectionEditor {...fieldProps} />}
        {section === 'settings' && <SettingsSection {...fieldProps} />}
        {section === 'footer' && <FooterSection {...fieldProps} />}
        {section === 'yatras' && <YatrasSection {...fieldProps} />}
        {section === 'futureDestinations' && <FutureDestinationsSection {...fieldProps} />}
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
    <fieldset className="border border-[#D8CFBD] bg-[#FBF8F1] p-6">
      <legend className="px-2 text-[11px] tracking-[0.2em] text-[#7C8A72] uppercase">
        {title}
      </legend>
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
    'w-full border-b border-[#D8CFBD] bg-transparent py-2 text-[14px] text-[#25241E] outline-none focus:border-[#7C8A72]';
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-[11px] tracking-[0.16em] text-[#9A917D] uppercase">{label}</span>
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
      {hint && <span className="text-[12px] text-[#9A917D]">{hint}</span>}
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
      <span className="text-[11px] tracking-[0.16em] text-[#9A917D] uppercase">{label}</span>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start">
        <div className="flex-1">
          <input
            value={value}
            onChange={(e) => update(path, e.target.value)}
            placeholder={kind === 'image' ? 'https://… image URL' : 'https://… video URL (mp4)'}
            className="w-full border-b border-[#D8CFBD] bg-transparent py-2 text-[13px] text-[#25241E] outline-none focus:border-[#7C8A72]"
          />
          <div className="mt-2 flex items-center gap-3">
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              disabled={uploading}
              className="cursor-pointer rounded-full border border-[#25241E]/40 px-4 py-[6px] text-[10.5px] tracking-[0.14em] text-[#25241E] uppercase hover:bg-[#25241E]/5 disabled:opacity-60"
            >
              {uploading ? 'Uploading…' : `Upload ${kind}`}
            </button>
            <span className="text-[11.5px] text-[#9A917D]">or paste a URL above</span>
          </div>
          {error && <p className="mt-2 text-[12px] text-[#A05B4C]">{error}</p>}
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
              className="h-[72px] w-[110px] shrink-0 border border-[#D8CFBD] object-cover"
            />
          ) : (
            <video
              src={value}
              muted
              playsInline
              preload="metadata"
              className="h-[72px] w-[110px] shrink-0 border border-[#D8CFBD] bg-[#25241E] object-cover"
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
  const items = (getDeep(content, path) as string[] | undefined) ?? [];
  return (
    <div className="flex flex-col gap-3">
      <div className="text-[11px] tracking-[0.2em] text-[#7C8A72] uppercase">{label}</div>
      {items.map((_, i) => (
        <div key={i} className="grid grid-cols-[1fr_auto] items-end gap-3">
          <Text {...{ content, update }} path={[...path, i]} label={`${itemLabel} ${i + 1}`} />
          <RowButton
            onClick={() =>
              update(
                path,
                items.filter((_, j) => j !== i),
              )
            }
          >
            Remove
          </RowButton>
        </div>
      ))}
      <RowButton onClick={() => update(path, [...items, ''])}>
        + Add {itemLabel.toLowerCase()}
      </RowButton>
    </div>
  );
}

function RowButton({ onClick, children }: { onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="cursor-pointer self-start rounded-full border border-[#25241E]/30 px-4 py-[6px] text-[10.5px] tracking-[0.14em] text-[#5F5C50] uppercase hover:bg-[#25241E]/5"
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
      <Group title="Hero">
        <MediaField {...p} path={['home', 'hero', 'image']} label="Background image" kind="image" />
        <Text {...p} path={['home', 'hero', 'eyebrow']} label="Small line above title" />
        <Text {...p} path={['home', 'hero', 'titleLine1']} label="Title — line 1" />
        <Text {...p} path={['home', 'hero', 'titleLine2']} label="Title — line 2 (italic)" />
        <Text {...p} path={['home', 'hero', 'sideText']} label="Side text" multiline />
        <Text {...p} path={['home', 'hero', 'journalLine']} label="Bottom journal line" />
      </Group>

      <Group title="On Pilgrimage">
        <Text {...p} path={['home', 'pilgrimage', 'eyebrow']} label="Section label" />
        <Text {...p} path={['home', 'pilgrimage', 'lead']} label="Lead paragraph" multiline />
        <Text {...p} path={['home', 'pilgrimage', 'body']} label="Body paragraph" multiline />
        <Text {...p} path={['home', 'pilgrimage', 'linkText']} label="Link text" />
        <MediaField {...p} path={['home', 'pilgrimage', 'image']} label="Image" kind="image" />
      </Group>

      <Group title="Quote / Sharings">
        <Text {...p} path={['home', 'quote', 'eyebrow']} label="Section label" />
        <Text {...p} path={['home', 'quote', 'text']} label="Quote text" multiline />
        <Text {...p} path={['home', 'quote', 'emphasis']} label="Emphasised ending (italic)" />
        <Text {...p} path={['home', 'quote', 'attribution']} label="Attribution" />
      </Group>

      <Group title="Testimonials">
        {content.home.testimonials.map((t, i) => (
          <div key={i} className="flex flex-col gap-4 border-b border-[#EDE6D6] pb-5">
            <Text
              {...p}
              path={['home', 'testimonials', i, 'quote']}
              label={`Quote ${i + 1}`}
              multiline
            />
            <div className="grid grid-cols-2 gap-4">
              <Text {...p} path={['home', 'testimonials', i, 'name']} label="Name" />
              <Text {...p} path={['home', 'testimonials', i, 'from']} label="From / journey" />
            </div>
            <RowButton
              onClick={() =>
                update(
                  ['home', 'testimonials'],
                  content.home.testimonials.filter((_, j) => j !== i),
                )
              }
            >
              Remove testimonial
            </RowButton>
          </div>
        ))}
        <RowButton
          onClick={() =>
            update(
              ['home', 'testimonials'],
              [...content.home.testimonials, { name: '', from: '', quote: '' }],
            )
          }
        >
          + Add testimonial
        </RowButton>
      </Group>

      <Group title="Gallery">
        <Text {...p} path={['home', 'gallery', 'heading']} label="Heading" />
        <Text {...p} path={['home', 'gallery', 'label']} label="Right-side label" />
        {content.home.gallery.images.map((img, i) => (
          <div key={i} className="flex flex-col gap-3 border-b border-[#EDE6D6] pb-5">
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

function VideoSectionEditor(p: FieldProps) {
  return (
    <Group title="Landing page video">
      <MediaField {...p} path={['home', 'video', 'videoUrl']} label="Video file" kind="video" />
      <MediaField
        {...p}
        path={['home', 'video', 'posterImage']}
        label="Poster image (shown before play)"
        kind="image"
      />
      <Text {...p} path={['home', 'video', 'eyebrow']} label="Section label" />
      <Text {...p} path={['home', 'video', 'heading']} label="Heading" />
      <Text {...p} path={['home', 'video', 'caption']} label="Caption" multiline />
      <p className="text-[12.5px] leading-[1.6] text-[#9A917D]">
        Upload an MP4 (up to 64 MB) or paste a direct video URL. Clearing the video URL hides the
        section on the homepage.
      </p>
    </Group>
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
      <Group title="Newsletter box">
        <Text {...p} path={['footer', 'newsletterHeading']} label="Heading" />
        <Text {...p} path={['footer', 'newsletterSub']} label="Sub-text" multiline />
      </Group>
    </>
  );
}

function YatrasSection(p: FieldProps) {
  const { content, update } = p;
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  function addYatra() {
    const next: Yatra = {
      n: String(content.yatras.length + 1).padStart(2, '0'),
      slug: `new-yatra-${content.yatras.length + 1}`,
      name: 'New Yatra',
      days: '7 Days',
      region: '',
      route: '',
      heroImage: '',
      heroPlaceholder: '',
      featureImage: '',
      featurePlaceholder: '',
      overviewLead: '',
      overviewBody: '',
      specs: [{ k: 'Duration', v: '7 Days' }],
      itinerary: [{ day: 'Day 01', place: '', note: '' }],
    };
    update(['yatras'], [...content.yatras, next]);
    setOpenIndex(content.yatras.length);
  }

  return (
    <>
      {content.yatras.map((y, i) => (
        <div key={i} className="border border-[#D8CFBD] bg-[#FBF8F1]">
          <button
            type="button"
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
            className="flex w-full cursor-pointer items-center justify-between px-6 py-4 text-left"
          >
            <span className="font-serif text-[20px] font-medium text-[#2C2A22]">
              {y.n} — {y.name || 'Untitled yatra'}
            </span>
            <span className="text-[11px] tracking-[0.16em] text-[#9A917D] uppercase">
              {openIndex === i ? 'Close' : 'Edit'}
            </span>
          </button>

          {openIndex === i && (
            <div className="flex flex-col gap-5 border-t border-[#EDE6D6] p-6">
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
              </div>
              <MediaField
                {...p}
                path={['yatras', i, 'heroImage']}
                label="Hero image"
                kind="image"
              />
              <MediaField
                {...p}
                path={['yatras', i, 'featureImage']}
                label="Feature image"
                kind="image"
              />
              <Text {...p} path={['yatras', i, 'overviewLead']} label="Overview lead" multiline />
              <Text {...p} path={['yatras', i, 'overviewBody']} label="Overview body" multiline />

              <div className="mt-2 text-[11px] tracking-[0.2em] text-[#7C8A72] uppercase">
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

              <div className="mt-2 text-[11px] tracking-[0.2em] text-[#7C8A72] uppercase">
                Itinerary
              </div>
              {y.itinerary.map((d, j) => (
                <div
                  key={j}
                  className="grid grid-cols-1 gap-4 border-b border-[#EDE6D6] pb-4 sm:grid-cols-[130px_1fr]"
                >
                  <Text {...p} path={['yatras', i, 'itinerary', j, 'day']} label="Day" />
                  <Text {...p} path={['yatras', i, 'itinerary', j, 'place']} label="Place" />
                  <div className="sm:col-span-2">
                    <Text
                      {...p}
                      path={['yatras', i, 'itinerary', j, 'note']}
                      label="Note"
                      multiline
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
                        note: '',
                      },
                    ],
                  )
                }
              >
                + Add day
              </RowButton>

              <div className="mt-4 border-t border-[#EDE6D6] pt-4">
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
            </div>
          )}
        </div>
      ))}
      <RowButton onClick={addYatra}>+ Add yatra</RowButton>
    </>
  );
}

function FutureDestinationsSection(p: FieldProps) {
  const { content, update } = p;
  return (
    <Group title="Future Destinations">
      {content.futureDestinations.map((d: FutureDestination, i: number) => (
        <div key={i} className="grid grid-cols-1 items-end gap-4 sm:grid-cols-[1fr_1fr_auto]">
          <Text {...p} path={['futureDestinations', i, 'name']} label="Name" />
          <Text {...p} path={['futureDestinations', i, 'note']} label="Note (optional)" />
          <RowButton
            onClick={() =>
              update(
                ['futureDestinations'],
                content.futureDestinations.filter((_, j) => j !== i),
              )
            }
          >
            Remove
          </RowButton>
        </div>
      ))}
      <RowButton
        onClick={() =>
          update(['futureDestinations'], [...content.futureDestinations, { name: '', note: '' }])
        }
      >
        + Add destination
      </RowButton>
    </Group>
  );
}

function ExperienceSection(p: FieldProps) {
  return (
    <>
      <Group title="Introduction">
        <Text {...p} path={['experience', 'eyebrow']} label="Section label" />
        <Text {...p} path={['experience', 'heading']} label="Heading" />
        <StringList
          {...p}
          path={['experience', 'intro']}
          label="Intro paragraphs"
          itemLabel="Paragraph"
        />
      </Group>

      <Group title="Included Throughout Every Journey">
        <StringList
          {...p}
          path={['experience', 'included']}
          label="Included items"
          itemLabel="Item"
        />
      </Group>

      <Group title="Handpicked Stays">
        <Text {...p} path={['experience', 'stays', 'heading']} label="Heading" />
        <Text {...p} path={['experience', 'stays', 'body']} label="Body" multiline />
        <Text {...p} path={['experience', 'stays', 'note']} label="Note" />
      </Group>

      <Group title="Personalised Rituals">
        <Text {...p} path={['experience', 'rituals', 'heading']} label="Heading" />
        <Text {...p} path={['experience', 'rituals', 'intro']} label="Intro" multiline />
        <StringList
          {...p}
          path={['experience', 'rituals', 'general']}
          label="General rituals"
          itemLabel="Ritual"
        />
        <StringList
          {...p}
          path={['experience', 'rituals', 'destinationSpecific']}
          label="Destination-specific rituals"
          itemLabel="Ritual"
        />
      </Group>

      <Group title="Optional Enhancements">
        <Text {...p} path={['experience', 'enhancements', 'heading']} label="Heading" />
        <Text {...p} path={['experience', 'enhancements', 'intro']} label="Intro" />
        <StringList
          {...p}
          path={['experience', 'enhancements', 'items']}
          label="Enhancements"
          itemLabel="Enhancement"
        />
      </Group>

      <Group title="The Sacred Walks Concierge">
        <Text {...p} path={['experience', 'concierge', 'heading']} label="Heading" />
        <StringList
          {...p}
          path={['experience', 'concierge', 'before']}
          label="Before your journey"
          itemLabel="Item"
        />
        <StringList
          {...p}
          path={['experience', 'concierge', 'during']}
          label="During your journey"
          itemLabel="Item"
        />
      </Group>

      <Group title="Welcome Kit">
        <Text {...p} path={['experience', 'welcomeKit', 'heading']} label="Heading" />
        <Text {...p} path={['experience', 'welcomeKit', 'intro']} label="Intro" multiline />
        <StringList
          {...p}
          path={['experience', 'welcomeKit', 'items']}
          label="Kit items"
          itemLabel="Item"
        />
      </Group>

      <Group title="Why Travel With Sacred Walks">
        <Text {...p} path={['experience', 'whyUs', 'heading']} label="Heading" />
        <StringList
          {...p}
          path={['experience', 'whyUs', 'items']}
          label="Reasons"
          itemLabel="Reason"
        />
      </Group>

      <Group title="Important Information">
        <Text {...p} path={['experience', 'importantInfo', 'heading']} label="Heading" />
        <StringList
          {...p}
          path={['experience', 'importantInfo', 'body']}
          label="Paragraphs"
          itemLabel="Paragraph"
        />
      </Group>
    </>
  );
}
