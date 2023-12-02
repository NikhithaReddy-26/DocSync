import { render } from "@testing-library/react";
import Image, { ImageProps } from ".";
import FileNotFoundSrc from "./../../../../public/images/File-not-found.svg";

test("should render image component", () => {
  const { getByRole } = render(
    <Image src={FileNotFoundSrc} alt="file not found" />
  );
  const image = getByRole("img");
  expect(image).toBeInTheDocument();
});
