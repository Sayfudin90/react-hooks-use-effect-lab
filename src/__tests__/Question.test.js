import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import Question from "../components/Question";

const testQuestion = {
  id: 1,
  prompt: "lorem testum",
  answers: ["choice 1", "choice 2", "choice 3", "choice 4"],
  correctIndex: 0,
};

const noop = () => {};

beforeEach(() => {
  jest.useFakeTimers();
});

afterEach(() => {
  jest.runOnlyPendingTimers();
  jest.useRealTimers();
});

test("creates an interval with setTimeout", () => {
  jest.spyOn(global, "setTimeout");
  render(<Question question={testQuestion} onAnswered={noop} />);
  expect(setTimeout).toHaveBeenCalled();
});

test("decrements the timer by 1 every second", () => {
  render(<Question question={testQuestion} onAnswered={noop} />);

  // Initial timer check
  expect(screen.queryByText(/10 seconds remaining/)).toBeInTheDocument();

  // Advance timer by 1 second and check if it decrements
  act(() => {
    jest.advanceTimersByTime(1000);
  });
  expect(screen.queryByText(/9 seconds remaining/)).toBeInTheDocument();

  // Advance timer by another second and check
  act(() => {
    jest.advanceTimersByTime(1000);
  });
  expect(screen.queryByText(/8 seconds remaining/)).toBeInTheDocument();

  // Repeat for a few more seconds
  act(() => {
    jest.advanceTimersByTime(1000);
  });
  expect(screen.queryByText(/7 seconds remaining/)).toBeInTheDocument();

  // Optionally, you can repeat for more seconds if needed
});

test("calls onAnswered after 10 seconds", () => {
  const onAnswered = jest.fn();
  render(<Question question={testQuestion} onAnswered={onAnswered} />);

  // Advance the timer by 11 seconds (to simulate the 10 second timeout)
  act(() => {
    jest.advanceTimersByTime(11000);
  });

  // Check if onAnswered was called with false after 10 seconds
  expect(onAnswered).toHaveBeenCalledWith(false);
});

test("clears the timeout after unmount", () => {
  jest.spyOn(global, "clearTimeout");
  const { unmount } = render(
    <Question question={testQuestion} onAnswered={noop} />
  );

  // Unmount the component and check if clearTimeout was called
  unmount();
  expect(clearTimeout).toHaveBeenCalled();
});
