import { Link } from "@/sanity.types";
import { client } from "@/sanity/lib/client";

const resolveButtonLink = async (link: Link | undefined) => {
  if (!link) return null;

  // Direct href case (external or internal)
  if (link.href) {
    return {
      href: link.href,
      linkType: link.linkType || "href",
      openInNewTab: link.openInNewTab || false,
    };
  }

  // Page reference case
  if (link.linkType === "page") {
    const pageRef = link.page?._ref || link.page;

    try {
      const pageDocument = await client.fetch("*[_id == $pageId][0]{slug}", {
        pageId: pageRef,
      });

      if (pageDocument?.slug?.current) {
        return {
          href: `/${pageDocument.slug.current}`,
          linkType: "page",
          openInNewTab: link.openInNewTab || false,
        };
      }
    } catch (error) {
      console.error("Error resolving page link:", error);
    }
  }

  return null;
};

export default resolveButtonLink;
