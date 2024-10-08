import { supabase } from "@/app/api/client/supabase";

function escapeXml(unsafe) {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function generateSiteMap(posts) {
  return `<?xml version="1.0" encoding="UTF-8"?>
    <rss version="2.0">
      <channel>
        ${posts
          .map(
            ({ link }) => `
            <item>
              <link>${escapeXml(link)}</link>
            </item>
          `
          )
          .join("")}
      </channel>
    </rss>`;
}

export async function getServerSideProps({ res }) {
  const { data: notes, error } = await supabase.from("links").select();

  if (error) {
    console.error("Error fetching notes:", error);
    res.statusCode = 500;
    res.end("Error fetching data");
    return { props: {} };
  }

  const sitemap = generateSiteMap(notes || []);

  res.setHeader("Content-Type", "text/xml");
  res.write(sitemap);
  res.end();

  return { props: {} };
}

export default function SiteMap() {
  return null; // This component won't be rendered
}
