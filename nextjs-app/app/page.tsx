import { AllPosts } from "@/app/components/posts";
import { TEvent } from "@/models/types";
import { client } from "@/sanity/lib/client";
import { sanityFetch } from "@/sanity/lib/live";
import imageUrlBuilder from "@sanity/image-url";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { defineQuery } from "next-sanity";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";

const EVENTS_QUERY = defineQuery(`*[
  _type == "event"
  && defined(slug.current)
]{_id, title, slug, date, eventType, image, venue}|order(date desc)`);

const { projectId, dataset } = client.config();
const urlFor = (source: SanityImageSource) =>
  projectId && dataset
    ? imageUrlBuilder({ projectId, dataset }).image(source)
    : null;

export default async function Page() {
  const { data: events } = await sanityFetch({ query: EVENTS_QUERY });

  return (
    <>
      <div className="border-t border-gray-10">
        <div className="container">
          <ul className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            {events.map((event: TEvent) => (
              <li className="bg-white p-4 rounded-lg" key={event._id}>
                <Link
                  className="hover:underline"
                  href={`/events/${event?.slug?.current}`}
                >
                  <Image
                    src={urlFor(event.image)?.width(550).height(310).url() || ""}
                    alt={event.image.alt}
                    height={500}
                    width={500}
                  />
                  <h2 className="text-xl font-semibold">{event?.title}</h2>
                  {event.venue ? <small>{event.venue.name}</small> : null}
                  {event?.date && (
                    <p className="text-gray-500">
                      {new Date(event.date).toLocaleDateString()}
                    </p>
                  )}
                </Link>
              </li>
            ))}
          </ul>
          <aside className="py-12 sm:py-20">
            <Suspense>
              <AllPosts />
            </Suspense>
          </aside>
        </div>
      </div>
    </>
  );
}
