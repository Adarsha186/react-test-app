import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import App from "./App";
import { hitSuccessAPI, hitFailureAPI } from "./services/api";

jest.mock("./services/api", () => ({
  hitSuccessAPI: jest.fn(),
  hitFailureAPI: jest.fn(),
}));

import "@testing-library/jest-dom";

// 1. Missing Fields
test("TC-01: shows error when required fields are missing", async () => {
  render(<App />);

  fireEvent.change(screen.getByPlaceholderText("Email"), {
    target: { value: "john@gmail.com" },
  });

  fireEvent.click(screen.getByText("Register"));

  expect(screen.getByText("All fields are required")).toBeInTheDocument();

  await waitFor(() => {
    expect(hitFailureAPI).toHaveBeenCalledTimes(1);
  });
});

// 2. Invalid name
// test("TC-02a: shows name validation error", async () => {
//   render(<App />);

//   fireEvent.change(screen.getByPlaceholderText("Name"), {
//     target: { value: "Jo" },
//   });
//   fireEvent.change(screen.getByPlaceholderText("Email"), {
//     target: { value: "john@gmail.com" },
//   });
//   fireEvent.change(screen.getByPlaceholderText("Password"), {
//     target: { value: "123456" },
//   });

//   fireEvent.click(screen.getByText("Register"));

//   expect(screen.getByText("Name must be at least 3 characters")).toBeInTheDocument();

//   await waitFor(() => {
//     expect(hitFailureAPI).toHaveBeenCalledTimes(1);
//   });
// });

// 2b. Invalid name characters
test("TC-02b: shows name validation error for invalid characters", async () => {
  render(<App />);
  fireEvent.change(screen.getByPlaceholderText("Name"), {
    target: { value: "John123" },
  });
  fireEvent.change(screen.getByPlaceholderText("Email"), {
    target: { value: "john@gmail.com" },
  });
  fireEvent.change(screen.getByPlaceholderText("Password"), {
    target: { value: "123456" },
  });
  fireEvent.click(screen.getByText("Register"));
  expect(screen.getByText("Name must contain only alphabets and spaces")).toBeInTheDocument();
  await waitFor(() => {
    expect(hitFailureAPI).toHaveBeenCalledTimes(1);
  });
});

// 3. Invalid Email
test("TC-03: invalid email triggers error and calls failure API", async () => {
  render(<App />);

  fireEvent.change(screen.getByPlaceholderText("Name"), {
    target: { value: "John" },
  });
  fireEvent.change(screen.getByPlaceholderText("Email"), {
    target: { value: "invalidEmail" },
  });
  fireEvent.change(screen.getByPlaceholderText("Password"), {
    target: { value: "123456" },
  });

  fireEvent.click(screen.getByText("Register"));

  expect(screen.getByText("Invalid email format")).toBeInTheDocument();

  await waitFor(() => {
    expect(hitFailureAPI).toHaveBeenCalledTimes(1);
  });
});

// 4. Weak Password
// test("TC-04: shows password length error", async () => {
//   render(<App />);

//   fireEvent.change(screen.getByPlaceholderText("Name"), {
//     target: { value: "John" },
//   });
//   fireEvent.change(screen.getByPlaceholderText("Email"), {
//     target: { value: "john@gmail.com" },
//   });
//   fireEvent.change(screen.getByPlaceholderText("Password"), {
//     target: { value: "123" },
//   });

//   fireEvent.click(screen.getByText("Register"));

//   expect(screen.getByText("Password must be at least 6 characters")).toBeInTheDocument();

//   await waitFor(() => {
//     expect(hitFailureAPI).toHaveBeenCalledTimes(1);
//   });
// });

// 5. Success Scenario
test("TC-05: shows success message when API returns response", async () => {
  jest.useFakeTimers();
  hitSuccessAPI.mockResolvedValueOnce({ title: "mock success title" });

  render(<App />);

  fireEvent.change(screen.getByPlaceholderText("Name"), {
    target: { value: "John" },
  });
  fireEvent.change(screen.getByPlaceholderText("Email"), {
    target: { value: "john@gmail.com" },
  });
  fireEvent.change(screen.getByPlaceholderText("Password"), {
    target: { value: "John@123" },
  });

  fireEvent.click(screen.getByText("Register"));
  jest.runAllTimers();

  await waitFor(() => {
    expect(hitSuccessAPI).toHaveBeenCalledTimes(1);
  });
});


// 6. Loading state
test("TC-06: displays loading state when submitting", async () => {
  hitSuccessAPI.mockResolvedValueOnce({ title: "success" });

  render(<App />);

  fireEvent.change(screen.getByPlaceholderText("Name"), {
    target: { value: "John" },
  });
  fireEvent.change(screen.getByPlaceholderText("Email"), {
    target: { value: "john@gmail.com" },
  });
  fireEvent.change(screen.getByPlaceholderText("Password"), {
    target: { value: "123456" },
  });

  fireEvent.click(screen.getByText("Register"));

  expect(screen.getByText("Loading...")).toBeInTheDocument();
});
