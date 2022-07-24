import React from "react";
import { render, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";

import "../__mocks__/intersectionObserverMock";

import App, { USERNAME } from "./App";

/* In here please contirbute a test or tests that 
show the modal meets WCAG 2.1 AA Standards, you can
put your tests in different files to this one */

describe("Modal", () => {
  it("should set the initial focus on the input", async () => {
    const { getByRole, queryByRole, getByLabelText } = render(<App />);

    expect(queryByRole("dialog")).not.toBeTruthy();

    userEvent.click(getByRole("button", { name: /Deactivate account/ }));

    await waitFor(async () => {
      expect(queryByRole("dialog")).toBeTruthy();
    });

    // Check 1.1.
    expect(
      getByLabelText(
        /Type in your username to confirm that you want to deactivate your account./
      )
    ).toHaveFocus();

    // Testing with jest-axe.
    expect(await axe(getByRole("dialog"))).toHaveNoViolations();
  });

  it("should close the model by pressing escape", async () => {
    const { getByRole, queryByRole } = render(<App />);

    expect(queryByRole("dialog")).not.toBeTruthy();

    userEvent.click(getByRole("button", { name: /Deactivate account/ }));

    await waitFor(async () => {
      expect(queryByRole("dialog")).toBeTruthy();
    });

    // Check item 2.1.
    userEvent.keyboard("[Escape]");

    await waitFor(async () => {
      expect(queryByRole("dialog")).not.toBeTruthy();
    });

    // Checl 1.2.
    expect(getByRole("button", { name: /Deactivate account/ })).toHaveFocus();
  });

  it("should be able to move focus by pressing tab", async () => {
    const { getByRole, queryByRole, getByLabelText } = render(<App />);

    expect(queryByRole("dialog")).not.toBeTruthy();

    userEvent.click(getByRole("button", { name: /Deactivate account/ }));

    await waitFor(async () => {
      expect(queryByRole("dialog")).toBeTruthy();
    });

    const input = getByLabelText(
      /Type in your username to confirm that you want to deactivate your account./
    );
    const btnCancel = getByRole("button", { name: /Cancel/ });
    const btnConfirmDeactivation = getByRole("button", {
      name: /^Deactivate$/,
    });

    expect(input).toHaveFocus();

    // Check 2.2.
    userEvent.tab();
    expect(btnCancel).toHaveFocus();

    userEvent.tab();
    // Since Deactivate button is disabled, the next focusable element is the previous input.
    expect(input).toHaveFocus();

    await userEvent.type(input, USERNAME);

    expect(btnConfirmDeactivation).not.toBeDisabled();

    userEvent.tab();
    expect(btnConfirmDeactivation).toHaveFocus();

    userEvent.tab();
    expect(btnCancel).toHaveFocus();

    // Wasn't able to check Shift+Tab (not sure if it's an issue with the lib)
    // userEvent.tab({ shift: true });
    // expect(btnConfirmDeactivation).toHaveFocus();
  });

  it("should have the proper role and attributes", async () => {
    const { getByRole, queryByRole } = render(<App />);

    // Check item 3.1.
    expect(queryByRole("dialog")).not.toBeTruthy();

    userEvent.click(getByRole("button", { name: /Deactivate account/ }));

    await waitFor(async () => {
      expect(queryByRole("dialog")).toBeTruthy();
    });

    // Check item 3.2.
    expect(queryByRole("dialog")).toHaveAttribute("aria-modal", "true");
    // Check item 3.3.
    expect(queryByRole("dialog")).toHaveAccessibleName();
  });
});
