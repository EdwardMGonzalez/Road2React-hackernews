import React from "react";
import { render } from "@testing-library/react";
import App from "./App";

test("renders author", () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/Jordan Walke/i);
  expect(linkElement).toBeInTheDocument();
});
