type PreviewBannerProps = {
  isEnabled: boolean;
};

export default function PreviewBanner({ isEnabled }: PreviewBannerProps) {
  if (!isEnabled) return null;

  return (
    <aside className="draft-preview-banner" role="status">
      <span>⚠️ Preview Mode Active — Viewing Draft Content.</span>{' '}
      <a href="/api/exit-draft">Exit Preview</a>
    </aside>
  );
}
