function Input({
  label,
  type,
  placeholder,
  id,
  value,
  setValue
}: {
  label: string
  type: string
  placeholder: string
  id: string
  value: string
  setValue: (value: string) => void
}) {
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
            className="truncate block w-full rounded-md border-0 p-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </div>
      </div>
    </div>
  )
}

export default Input
