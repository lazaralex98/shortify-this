import "./style.css"

function IndexPopup() {
  return (
    <Container>
      <Header />
      <div className="mt-5">Form goes here.</div>
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
