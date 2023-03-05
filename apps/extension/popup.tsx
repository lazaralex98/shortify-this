import type { Session } from "@supabase/supabase-js"
import { useEffect, useState } from "react"
import { QueryClient, QueryClientProvider, useMutation } from "react-query"

import Info from "~components/info"
import Input from "~components/input"
import { supabase } from "~core/store"
import {
  classNames,
  extractErrorMsg,
  generateRandomString,
  handleSession
} from "~utils"

import "./style.css"

const queryClient = new QueryClient()

export default function OptionsWrapper() {
  return (
    <QueryClientProvider client={queryClient}>
      <IndexPopup />
    </QueryClientProvider>
  )
}

function IndexPopup() {
  const [url, setURL] = useState("https://very-long-url.com/")
  const [slug, setSlug] = useState(generateRandomString())
  const [shortenedURL, setShortenedURL] = useState(url + slug)
  const [copied, setCopied] = useState(false)
  const [ses, setSession] = useState<Session | null>(null)

  const saveInClipboard = () => {
    navigator.clipboard.writeText(shortenedURL)
    setCopied(true)
  }

  const link = useMutation(async (e: { preventDefault: () => void }) => {
    e.preventDefault()
    if (!ses) throw new Error("You are not logged in.")

    const { data, error } = await supabase.from("links").select()
    if (error) throw new Error(error.message)
    if (data.find((link) => link.slug === slug)) {
      throw new Error("Slug already exists")
    }

    const res = await supabase.from("links").insert([
      {
        user_id: ses.user.id,
        slug: slug,
        to: url
      }
    ])
    if (res.error) throw new Error(res.error.message)
    return res
  })

  useEffect(() => {
    handleSession(setSession)

    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      var activeTab = tabs[0]
      if (activeTab && activeTab.url) {
        setURL(activeTab.url)
      }
    })
  }, [])

  useEffect(() => {
    if (!ses) return
    const username = ses.user.user_metadata.username
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
      <form className="mt-4" onSubmit={link.mutate}>
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
          disabled={link.isLoading || link.isError || link.isSuccess || !ses}
          className={classNames(
            "flex w-full mt-4 justify-center rounded-md bg-blue-600 py-2 px-3 text-sm font-semibold text-white shadow-sm",
            "hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600",
            "disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-blue-600"
          )}>
          {link.isLoading && "Loading..."}
          {link.isError && extractErrorMsg(link.error)}
          {link.isSuccess && "We saved it!"}
          {!link.isLoading && !link.isError && !link.isSuccess && "Save link"}
        </button>
        {!ses && (
          <p className="text-gray-400 sm:text-sm sm:leading-6 mt-2">
            <Info /> To log in, right-click the extension icon in the top right
            corner of your browser and click 'Options.'
          </p>
        )}
        {ses && (
          <p className="text-gray-400 sm:text-sm sm:leading-6 mt-2">
            <Info /> The link will not redirect to the actual url until you
            click the 'Save link.' button.
          </p>
        )}
      </form>
    </Container>
  )
}

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
