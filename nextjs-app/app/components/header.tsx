import Link from "next/link";

export default function Header() {
  return (
    <header className="fixed inset-0 z-50 flex h-24 items-center bg-white/80 backdrop-blur-lg">
      <div className="container py-6 sm:px-6">
        <div className="flex items-center justify-between gap-5">
          <Link href="/">Sanity Template</Link>
          <nav className="">
            <ul
              role="list"
              className="flex items-center gap-4 text-sm font-normal leading-5 tracking-tight md:gap-6 md:text-base"
            >
              <li>
                <Link href="/about" className="">
                  About
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}
