# LinkedIn carousel previews

The five WebP images in `public/assets/linkedin/` are captures of Sameer's public
LinkedIn embeds, taken on 27 September 2026 at their native 504px width and the
heights listed in `components/zones/SpaceZone.tsx`. Their combined size is about
210 KB. Each filename is the share or UGC post ID from its source embed URL.

The preview is a linked fallback while the live iframe loads. The iframe mounts
when the rail approaches the viewport, retries a stalled request once, and keeps
the local preview if LinkedIn never responds. The initial empty `about:blank`
load event must not dismiss the preview. The footer always offers a direct post
link and a manual reload.

When changing a post, update its embed URL, canonical activity URL, description,
height, and local preview together. Capture the public embed after its media has
loaded, at 504px wide and the configured height; save as WebP. Preview reaction
counts and relative dates reflect the capture date; the live embed and direct
link provide the current post.
