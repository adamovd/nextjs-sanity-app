import Link from "next/link";
import { notFound } from "next/navigation";

import { defineQuery } from "next-sanity";

import CoverImage from "@/app/components/cover-image";
import DateComponent from "@/app/components/date";
import ResolvedLink from "@/app/components/resolved-link";
import { sanityFetch } from "@/sanity/lib/live";

const EVENT_QUERY = defineQuery(`*[
    _type == "events" &&
    slug.current == $slug
  ][0]{
  ...,
  "date": coalesce(date, now()),
  venue->
}`);

export default async function EventPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { data: event } = await sanityFetch({
    query: EVENT_QUERY,
    params: await params,
  });
  if (!event) {
    notFound();
  }
  const { name, date, image, eventType, venue } = event;

  const eventDate = new Date(date).toDateString();
  const eventTime = new Date(date).toLocaleTimeString();

  return (
    <main className="container mx-auto grid gap-12 p-12">
      <div className="mb-4">
        <Link href="/">← Back to events</Link>
      </div>
      <div className="items-top grid gap-12 sm:grid-cols-2">
        <CoverImage image={image} />

        <div className="flex flex-col justify-center space-y-4">
          <div className="space-y-4">
            {eventType ? (
              <div className="inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm capitalize dark:bg-gray-800">
                {eventType.replace("-", " ")}
              </div>
            ) : null}
            {name ? (
              <h1 className="mb-8 text-4xl font-bold tracking-tighter">
                {name}
              </h1>
            ) : null}

            <dl className="grid grid-cols-2 gap-1 text-sm font-medium sm:gap-2 lg:text-base">
              <dd className="font-semibold">When</dd>
              <div>
                <DateComponent dateString={date} />
                {eventDate && <dt>{eventDate}</dt>}
                {eventTime && <dt>{eventTime}</dt>}
              </div>
            </dl>

            {venue?.name ? (
              <dl className="grid grid-cols-2 gap-1 text-sm font-medium sm:gap-2 lg:text-base">
                <div className="flex items-start">
                  <dd className="font-semibold">Where</dd>
                </div>
                <div className="grid gap-1">
                  <dt>{venue.name}</dt>
                  <ResolvedLink link={name}>Läs mer</ResolvedLink>
                </div>
              </dl>
            ) : null}
          </div>
        </div>
      </div>
    </main>
  );
}
