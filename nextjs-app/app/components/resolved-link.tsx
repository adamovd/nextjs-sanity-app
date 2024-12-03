import Link from "next/link";

import { Link as SanityLink } from "@/sanity.types";

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
  if (link?.href) {
    return (
      <Link
        href={link.href}
        target={link.openInNewTab ? "_blank" : undefined}
        rel={link.openInNewTab ? "noopener noreferrer" : undefined}
        className={className}
      >
        {children}
      </Link>
    );
  }
  return <>{children}</>;
}
