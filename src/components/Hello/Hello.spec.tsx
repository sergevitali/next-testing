import Hello from "./Hello";

import { render, screen } from "@testing-library/react";

describe("Hello Component", () => {
  it("Renders 'Hello World'", () => {
    render(<Hello />);
    const myElement = screen.getByText(/Hello World/);
    //screen.debug();
    expect(myElement).toBeInTheDocument();
  });
});
