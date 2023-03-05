import { classNames } from "~utils"

export function Button({
  disabled,
  children
}: {
  disabled: boolean
  children: React.ReactNode
}) {
  return (
    <button
      type="submit"
      disabled={disabled}
      className={classNames(
        "flex w-full mt-4 justify-center rounded-md bg-blue-600 py-2 px-3 text-sm font-semibold text-white shadow-sm",
        "hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600",
        "disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-blue-600"
      )}>
      {children}
    </button>
  )
}
