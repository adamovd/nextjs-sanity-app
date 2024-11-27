import { Link as SanityLink } from "@/sanity.types";
import { linkResolver } from "@/sanity/lib/utils";
import Link from "next/link";

interface ResolvedLinkProps {
  link: SanityLink | undefined;
  children: React.ReactNode;
  className?: string;
}

export default function ResolvedLink({
  link,
  children,
  className,
}: ResolvedLinkProps) {
  const resolvedLink = linkResolver(link);
  if (typeof resolvedLink === "string") {
    return (
      <Link
        href={resolvedLink}
        target={link?.openInNewTab ? "_blank" : undefined}
        rel={link?.openInNewTab ? "noopener noreferrer" : undefined}
        className={className}
      >
        {children}
      </Link>
    );
  }
  return <>{children}</>;
}