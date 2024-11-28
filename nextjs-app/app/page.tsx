import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";

import imageUrlBuilder from "@sanity/image-url";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { defineQuery } from "next-sanity";

import { Event } from "@/sanity.types";
import { client } from "@/sanity/lib/client";
import { sanityFetch } from "@/sanity/lib/live";

import { AllPosts } from "./components/posts";

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
      <div className="border-gray-10 border-t">
        <div className="container">
          <ul className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            {events.map((event: Event) => (
              <li className="rounded-lg bg-white p-4" key={event._id}>
                <Link
                  className="hover:underline"
                  href={`/events/${event?.slug?.current}`}
                >
                  {event.image ? (
                    <Image
                      src={
                        urlFor(event.image)?.width(550).height(310).url() || ""
                      }
                      alt={event.image?.alt || event.title || "image"}
                      height={500}
                      width={500}
                    />
                  ) : null}

                  <h2 className="text-xl font-semibold">{event?.title}</h2>
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
