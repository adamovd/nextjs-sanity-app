import { FaqSection } from "@/sanity.types";

type FAQProps = {
  block: FaqSection;
  index: number;
};
const faqSection = ({ block }: FAQProps) => {
  return (
    <section className="faq-block">
      {block.faqs?.map((faq, index) => (
        <details key={index} className="faq-item">
          <summary>
            <h3 className="faq-question">{faq.question}</h3>
          </summary>
          <section className="faq-answer">
            <p>{faq.answer} </p>
          </section>
        </details>
      ))}
    </section>
  );
};

export default faqSection;
