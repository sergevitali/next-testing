import { fireEvent, render, screen } from "@testing-library/react";
import { Counter } from "./Counter";
import user from "@testing-library/user-event";

describe("Counter Component", () => {
  describe('Initialized with defaultCount=0 and description="My Counter', () => {
    beforeEach(() => {
      const expectedProps = {
        defaultCount: 0,
        description: "My Counter",
      };
      render(<Counter {...expectedProps} />);
    });

    it("Renders Current Count: 0", () => {
      expect(screen.getByText("Current Count: 0")).toBeInTheDocument();
    });

    it("Renders title as 'My Counter'", () => {
      expect(screen.getByText(/my counter/i)).toBeInTheDocument();
    });

    describe('when the incrementor changes to 5 and "+" button is clicked', () => {
      beforeEach(() => {
        user.type(screen.getByLabelText(/Incrementor/i), "{selectall}5");
        fireEvent.click(
          screen.getByRole("button", { name: /add to counter/i })
        );
      });

      it("renders 'Current Count: 5'", () => {
        expect(screen.getByText("Current Count: 5")).toBeInTheDocument();
      });
    });

    describe('when the count exceeds 20, rends "boom"', () => {
      beforeEach(() => {
        user.type(screen.getByLabelText(/Incrementor/i), "{selectall}21");
        fireEvent.click(
          screen.getByRole("button", { name: /add to counter/i })
        );
      });

      it("renders 'Boom'", () => {
        expect(screen.getByText(/boom/i)).toBeInTheDocument();
      });
    });

    describe('when the count exceeds 51, "add to counter button disables', () => {
      beforeEach(() => {
        user.type(screen.getByLabelText(/Incrementor/i), "{selectall}51");
        fireEvent.click(
          screen.getByRole("button", { name: /add to counter/i })
        );
      });

      it("buttons disabled", () => {
        const button = screen.getByRole("button", { name: /add to counter/i });
        expect(button).toBeDisabled();
      });

      it("Current Count is not changed", () => {
        fireEvent.click(
          screen.getByRole("button", { name: /add to counter/i })
        );
        expect(screen.getByText("Current Count: 51")).toBeInTheDocument();
      });
    });

    describe('when the incrementor changes to 25 and "-" button is clicked', () => {
      beforeEach(() => {
        user.type(screen.getByLabelText(/Incrementor/i), "{selectall}25");
        fireEvent.click(
          screen.getByRole("button", { name: /subtract from counter/i })
        );
      });

      it("renders 'Current Count: -25'", () => {
        expect(screen.getByText("Current Count: -25")).toBeInTheDocument();
      });
    });
  });
});
