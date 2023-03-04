import { useEffect, useState } from "react"

import Input from "~components/input"
import { generateRandomString } from "~utils"

import "./style.css"

function IndexPopup() {
  const [url, setURL] = useState("https://very-long-url.com/")
  const [slug, setSlug] = useState(generateRandomString())
  // TODO: fetch the username
  const username = "alex"
  const [shortenedURL, setShortenedURL] = useState(url + slug)
  const [copied, setCopied] = useState(false)

  const saveInClipboard = () => {
    navigator.clipboard.writeText(shortenedURL)
    setCopied(true)
  }

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault()
    // TODO: save link in db
    // TODO: display loading state, success state, error state
  }

  useEffect(() => {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      var activeTab = tabs[0]
      if (activeTab && activeTab.url) {
        setURL(activeTab.url)
      }
    })
  }, [])

  useEffect(() => {
    setShortenedURL(`https://shortifythis.com/l/${username}/${slug}`)
  }, [url, slug])

  useEffect(() => {
    if (copied) {
      const timer = setTimeout(() => {
        setCopied(false)
      }, 3 * 1_000)
      return () => clearTimeout(timer)
    }
  }, [copied])

  return (
    <Container>
      <Header />
      <form className="mt-4" onSubmit={handleSubmit}>
        {/* url input */}
        <Input
          label="URL"
          type="url"
          placeholder="https://very-long-url.com/"
          id="url"
          value={url}
          setValue={setURL}
        />

        {/* slug input */}
        <Input
          label="Custom slug"
          type="text"
          placeholder="custom-slug"
          id="slug"
          value={slug}
          setValue={setSlug}
        />

        {/* generated short url */}
        <div className="-space-y-px rounded-md shadow-sm mt-2">
          <div>
            <label
              htmlFor="shortened-url"
              className="block text-sm font-medium leading-6 text-gray-900">
              Shortened Link
            </label>
            <div className="mt-2">
              <div
                onClick={saveInClipboard}
                id="shortened-url"
                className="flex w-ful rounded-md p-1.5 border-0 bg-gray-50 shadow-sm ring-1 ring-gray-200 cursor-pointer text-gray-400 sm:text-sm sm:leading-6">
                <span className="truncate">{shortenedURL}</span>
              </div>
            </div>
          </div>
        </div>
        <p className="text-gray-400 sm:text-sm sm:leading-6 mt-2">
          {copied ? "Copied." : "Click ^ to copy."}
        </p>

        {/* button */}
        <button
          type="submit"
          className="flex w-full mt-4 justify-center rounded-md bg-blue-600 py-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">
          Save link.
        </button>
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
          The link will not redirect to the actual url until you click the 'Save
          link.' button.
        </p>
      </form>
    </Container>
  )
}

export default IndexPopup

function Container({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-white shadow sm:rounded-lg w-72">
      <div className="px-4 py-5 sm:p-6">{children}</div>
    </div>
  )
}

function Header() {
  return (
    <div className="border-b border-gray-200 pb-2">
      <h3 className="text-base font-semibold leading-6 text-gray-900">
        Shortify this.
      </h3>
      <div className="mt-2 max-w-xl text-sm text-gray-500">
        <p>
          Put in a long URL and get a short one. Use your custom slug if you
          want.
        </p>
      </div>
    </div>
  )
}
