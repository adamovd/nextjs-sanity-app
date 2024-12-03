import resolveButtonLink from "@/lib/resolve-button-link";
import { ButtonGroup, Link } from "@/sanity.types";

import ResolvedLink from "./resolved-link";

type ButtonProps = {
  block: ButtonGroup;
  index: number;
};

const buttonGroup = async ({ block }: ButtonProps) => {
  const resolvedButtons = await Promise.all(
    block.buttons!.map(async (button) => ({
      ...button,
      link: await resolveButtonLink(button.link),
    }))
  );

  console.log(resolvedButtons);

  return (
    <section className="button-group">
      {resolvedButtons.map((button, index) => (
        <ResolvedLink
          key={index}
          link={button.link as Link}
          className={`btn btn-${button.color} size-${button.size} ${button.style === "outline" ? "outlined" : ""}`}
        >
          {button.buttonText}
        </ResolvedLink>
      ))}
    </section>
  );
};

export default buttonGroup;
