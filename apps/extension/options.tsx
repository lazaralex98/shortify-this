import "./style.css"

import type { Session } from "@supabase/supabase-js"
import { useEffect, useState } from "react"
import { QueryClient, QueryClientProvider, useMutation } from "react-query"
import { ReactQueryDevtools } from "react-query/devtools"

import Input from "~components/input"
import { supabase } from "~core/store"
import { generateRandomString, handleSession } from "~utils"

const queryClient = new QueryClient()

export default function OptionsWrapper() {
  return (
    <QueryClientProvider client={queryClient}>
      <Options />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

function Options() {
  const [ses, setSession] = useState<Session | null>(null)
  useEffect(() => {
    handleSession(setSession)
  }, [])

  if (!ses) {
    return (
      <Container>
        <main className="relative -mt-32">
          <div className="mx-auto max-w-screen-xl px-4 pb-6 sm:px-6 lg:px-8 lg:pb-16">
            <div className="overflow-hidden rounded-lg bg-white shadow">
              <div className="divide-y divide-gray-200  lg:divide-y-0 lg:divide-x">
                <AuthForm />
              </div>
            </div>
          </div>
        </main>
      </Container>
    )
  }

  return (
    <Container>
      <main className="relative -mt-32">
        <div className="mx-auto max-w-screen-xl px-4 pb-6 sm:px-6 lg:px-8 lg:pb-16">
          <div className="overflow-hidden rounded-lg bg-white shadow">
            <div className="divide-y divide-gray-200  lg:divide-y-0 lg:divide-x">
              <OptionsForm />
            </div>
          </div>
        </div>
      </main>
    </Container>
  )
}

function Container({ children }: { children: React.ReactNode }) {
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

function AuthForm() {
  const [email, setEmail] = useState("")

  const auth = useMutation(async (e: { preventDefault: () => void }) => {
    e.preventDefault()
    return await supabase.auth.signInWithOtp({
      email: email,
      options: {
        emailRedirectTo: window.location.href,
        data: {
          username: generateRandomString()
        }
      }
    })
  })

  return (
    <form
      className="space-y-6 py-6 px-4 sm:p-6 lg:pb-8"
      method="POST"
      onSubmit={auth.mutate}>
      <Input
        id="email"
        label="Email"
        placeholder="alex@example.com"
        type="email"
        value={email}
        setValue={setEmail}
      />

      <div>
        <button
          type="submit"
          className="flex w-full justify-center rounded-md bg-blue-600 py-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">
          {auth.isLoading && "Loading..."}
          {auth.isError && "Error"}
          {auth.isSuccess && "Check your email!"}
          {!auth.isLoading &&
            !auth.isError &&
            !auth.isSuccess &&
            "Send magic link!"}
        </button>
      </div>
    </form>
  )
}

function OptionsForm() {
  return (
    <div className="divide-y divide-gray-200">
      <div className="py-6 px-4 sm:p-6 lg:pb-8">
        {/* form header */}
        <div>
          <p className="mt-1 text-sm text-gray-500">
            I aim to add a premium plan with the ability to further customize
            your link (by changing your username, for example) and access to
            analytics.
          </p>
        </div>

        <div className="mt-4 flex flex-col lg:flex-row">
          <div className="flex-grow space-y-6">
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
                    <span className="truncate">{`https://shortifythis.com/l/<your username>/<random or custom slug>`}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
