import React from "react";
import { ChangeEvent, Fragment, useEffect, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { ExclamationIcon } from "@heroicons/react/outline";

/*

Interview Task:

Create a WCAG 2.1 AA Compliant Modal

Put any content you want in the modal,
ensure it is dismissable or closable,
include comments to help us understand
your choices, the modal must prevent 
interaction with th eunderlying page
until dismissed or actioned

Write some tests to confirm that the
modal works and is compliant

Create some styles, remember any styles,
should also be WCAG 2.1 AA Compliant

NB: Getting the task done is more important than
it being complete, don't worry about impelementing 
the solution in a single file

Use comments to explain missing parts of the 
implementation or to explain where you stopped
and why - the more comments you leave us the
easier it will be for use to undersand how you
write code :)

Feel free to add libraries on the left,
the test runner is in a tab on the right

*/

export const USERNAME = "matheuspiment";

/**
 * Some of the libraries that implement accessible modals are `react-modal` and `@headlessui/react`.
 *
 * I chose `headlessui` because it already fits `tailwindcss` - to have some styles that accomplish WCAG 2.1 AA.
 *  - In this example I just added `leading-normal` to accomplish the `Success Criterion 1.4.12 Text Spacing`.
 *
 * As decribed here - https://www.w3.org/WAI/ARIA/apg/example-index/dialog-modal/dialog - an accessible dialog must have:
 *  - 1. Accessibility Features
 *    - 1.1. Set the initial focus - the input in our case
 *    - 1.2. When the dialog closes as a result of the Cancel action, the user's point of regard is maintained by returning focus to the Deactivate account button.
 *
 *  - 2. Keyboard Support
 *    - 2.1. Close with escape
 *    - 2.2. Tab and Shift + Tab to move focus
 *
 *  - 3. Proper Role, Property, State, and Tabindex Attributes
 *    - 3.1. role="dialog"
 *    - 3.2. aria-modal="true"
 *    - 3.3. aria-labelledby="<elId>" - in our case
 */

export default function App() {
  const [open, setOpen] = useState(false);
  const [isDeactivateBtnDisabled, setIsDeactivateBtnDisabled] = useState(true);
  const deactivateInputRef = useRef(null);

  useEffect(() => {
    if (!open) {
      setIsDeactivateBtnDisabled(true);
    }
  }, [open]);

  const handleChangeDeactivateInput = ({
    target,
  }: ChangeEvent<HTMLInputElement>) => {
    if (target.value === USERNAME) {
      setIsDeactivateBtnDisabled(false);
    } else {
      setIsDeactivateBtnDisabled(true);
    }
  };

  const handleSubmit = () => {
    setOpen(false);
  };

  return (
    <div className="flex flex-col items-center">
      <h1>NewDay</h1>

      <button
        className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:w-auto sm:text-sm sm:leading-normal mt-2"
        onClick={() => {
          setOpen(true);
        }}
      >
        Deactivate account
      </button>

      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          initialFocus={deactivateInputRef}
          onClose={setOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed z-10 inset-0 overflow-y-auto">
            <div className="flex items-start sm:items-center justify-center min-h-full p-4 text-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-lg sm:w-full">
                  <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                      <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                        <ExclamationIcon
                          className="h-6 w-6 text-red-600"
                          aria-hidden="true"
                        />
                      </div>
                      <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                        <Dialog.Title
                          as="h2"
                          className="text-lg leading-normal font-medium text-gray-900"
                        >
                          Deactivate account
                        </Dialog.Title>
                        <div className="mt-2">
                          <p className="text-sm text-gray-500 leading-normal">
                            Are you sure you want to deactivate your account?
                            All of your data will be permanently removed. This
                            action cannot be undone.
                          </p>
                        </div>

                        <div className="mt-2">
                          <form
                            id="formDeactivateAccount"
                            onSubmit={handleSubmit}
                          >
                            <div className="grid">
                              <div className="col-span-6 sm:col-span-3">
                                <p className="block text-sm font-medium text-gray-700 leading-normal">
                                  Please type <strong>matheuspiment</strong> to
                                  confirm.
                                </p>
                                <input
                                  ref={deactivateInputRef}
                                  aria-label="Type in your username to confirm that you want to deactivate your account."
                                  autoComplete="off"
                                  type="text"
                                  name="username"
                                  id="username"
                                  onChange={handleChangeDeactivateInput}
                                  className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm sm:leading-normal border-gray-300 rounded-md"
                                />
                              </div>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                    <button
                      type="submit"
                      form="formDeactivateAccount"
                      disabled={isDeactivateBtnDisabled}
                      className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-60 disabled:pointer-events-none sm:ml-3 sm:w-auto sm:text-sm"
                      onClick={() => setOpen(false)}
                    >
                      Deactivate
                    </button>
                    <button
                      type="button"
                      className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm sm:leading-normal"
                      onClick={() => setOpen(false)}
                    >
                      Cancel
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </div>
  );
}
