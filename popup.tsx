import { useEffect, useState } from "react"

import "./style.css"

function IndexPopup() {
  const [url, setURL] = useState("https://very-long-url.com/")
  const [slug, setSlug] = useState(
    (Math.random() + 1).toString(36).substring(7)
  )
  const [shortenedURL, setShortenedURL] = useState(url + slug)

  const saveInClipboard = () => {
    navigator.clipboard.writeText(url + slug)
    alert("Copied url to clipboard")
  }

  useEffect(() => {
    setShortenedURL(url + slug)
  }, [url, slug])

  return (
    <Container>
      <Header />
      <form
        className="mt-4"
        onSubmit={(e) => {
          e.preventDefault()
        }}>
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
                className="block w-full rounded-md border-0 bg-gray-50 p-1.5 shadow-sm ring-1 ring-gray-200 cursor-pointer text-gray-400 sm:text-sm sm:leading-6">
                {shortenedURL}
              </div>
            </div>
          </div>
        </div>

        {/* button */}
        <div className="mt-4">
          <button
            type="submit"
            className="flex w-full justify-center rounded-md bg-blue-600 py-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">
            Shortify this.
          </button>
        </div>
      </form>
    </Container>
  )
}

export default IndexPopup

function Container({ children }) {
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

function Input({ label, type, placeholder, id, value, setValue }) {
  return (
    <div className="-space-y-px rounded-md shadow-sm mt-2">
      <div>
        <label
          htmlFor={id}
          className="block text-sm font-medium leading-6 text-gray-900">
          {label}
        </label>
        <div className="mt-2">
          <input
            id={id}
            name={id}
            type={type}
            autoComplete={id}
            placeholder={placeholder}
            required
            className="block w-full rounded-md border-0 p-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </div>
      </div>
    </div>
  )
}
