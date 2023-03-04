import "./style.css"

import { useEffect, useState } from "react"

import Input from "~components/input"
import { generateRandomString } from "~utils"

export default function Options() {
  // TODO fetch username and premium status from db
  const [username, setUsername] = useState("alex")
  const [premium, setPremium] = useState(false)

  const exampleSlug = premium ? "your-custom-slug" : generateRandomString()

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault()
    // TODO: save options in db
    // TODO: display loading state, success state, error state
  }

  return (
    <Container>
      <main className="relative -mt-32">
        <div className="mx-auto max-w-screen-xl px-4 pb-6 sm:px-6 lg:px-8 lg:pb-16">
          <div className="overflow-hidden rounded-lg bg-white shadow">
            <div className="divide-y divide-gray-200  lg:divide-y-0 lg:divide-x">
              <form
                className="divide-y divide-gray-200"
                onSubmit={handleSubmit}
                method="POST">
                <div className="py-6 px-4 sm:p-6 lg:pb-8">
                  {/* form header */}
                  <div>
                    <h2 className="text-lg font-medium leading-6 text-gray-900">
                      Hi {username}!
                    </h2>
                    <p className="mt-1 text-sm text-gray-500">
                      You can change your username (we use it to generate your
                      short links)
                      {premium ? "." : " and upgrade to a premium plan here."}
                    </p>
                  </div>

                  <div className="mt-6 flex flex-col lg:flex-row">
                    <div className="flex-grow space-y-6">
                      {/* username input */}
                      <Input
                        label="Username"
                        type="text"
                        placeholder="Your username"
                        id="username"
                        value={username}
                        setValue={setUsername}
                      />

                      {/* how short link looks */}
                      <div className="-space-y-px rounded-md shadow-sm mt-2">
                        <div>
                          <label
                            htmlFor="shortened-url"
                            className="block text-sm font-medium leading-6 text-gray-900">
                            Example of shortened Link
                          </label>
                          <div className="mt-2">
                            <div
                              id="shortened-url"
                              className="flex w-ful rounded-md p-1.5 border-0 bg-gray-50 shadow-sm ring-1 ring-gray-200 text-gray-400 sm:text-sm sm:leading-6">
                              <span className="truncate">{`https://shortifythis.com/l/${username}/${exampleSlug}`}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <p className="text-gray-400 sm:text-sm sm:leading-6 mt-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="w-5 h-5 inline-block">
                          <path
                            fillRule="evenodd"
                            d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z"
                            clipRule="evenodd"
                          />
                        </svg>{" "}
                        The above is how your links will look when shortened. "
                        {exampleSlug}" is the slug and you can change it (if on
                        a premium plan).
                      </p>
                    </div>
                  </div>
                </div>

                {/* form footer */}
                <div className="divide-y divide-gray-200 bg-gray-50">
                  <div className="flex justify-end gap-x-3 p-4 sm:px-6">
                    <a
                      href="https://shortifythis.com/"
                      className="inline-flex justify-center rounded-md bg-white py-2 px-3 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                      Go premium
                    </a>
                    <button
                      type="submit"
                      className="inline-flex justify-center rounded-md bg-sky-700 py-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-sky-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-700">
                      Save options
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
    </Container>
  )
}

function Container({ children }) {
  return (
    <div>
      <div className="relative overflow-hidden bg-sky-700 pb-32">
        <nav className="bg-transparent relative z-10 border-b border-teal-500 border-opacity-25 lg:border-none lg:bg-transparent">
          <div className="mx-auto max-w-screen-xl px-2 sm:px-4 lg:px-8">
            <div className="relative flex h-16 items-center justify-between lg:border-b lg:border-sky-800">
              <div className="flex items-center px-2 lg:px-0">
                <div className="flex-shrink-0">
                  <h1 className="text-2xl font-bold text-teal-400">
                    ShortifyThis
                  </h1>
                </div>
              </div>
            </div>
          </div>
        </nav>
        <div
          aria-hidden="true"
          className="inset-y-0 absolute inset-x-0 left-1/2 w-full -translate-x-1/2 transform overflow-hidden lg:inset-y-0">
          <div className="absolute inset-0 flex">
            <div
              className="h-full w-1/2"
              style={{ backgroundColor: "#0a527b" }}
            />
            <div
              className="h-full w-1/2"
              style={{ backgroundColor: "#065d8c" }}
            />
          </div>
          <div className="relative flex justify-center">
            <svg
              className="flex-shrink-0"
              width={1750}
              height={308}
              viewBox="0 0 1750 308">
              <path
                d="M284.161 308H1465.84L875.001 182.413 284.161 308z"
                fill="#0369a1"
              />
              <path
                d="M1465.84 308L16.816 0H1750v308h-284.16z"
                fill="#065d8c"
              />
              <path d="M1733.19 0L284.161 308H0V0h1733.19z" fill="#0a527b" />
              <path
                d="M875.001 182.413L1733.19 0H16.816l858.185 182.413z"
                fill="#0a4f76"
              />
            </svg>
          </div>
        </div>
        <header className="relative py-10">
          <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold tracking-tight text-white">
              Options
            </h1>
          </div>
        </header>
      </div>

      {children}
    </div>
  )
}
