export type TEvent = {
  _id: string;
  title: string;
  slug: { current: string };
  eventType: "in-person" | "virtual";
  date: string;
  image: { asset: string; alt: string };
  venue: {
    name: string;
    city: string;
    streetNo: number;
    street: string;
    zipCode: string;
  };
};
