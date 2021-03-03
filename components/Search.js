export default function Search() {
  return <div className="border rounded border-gray-700 w-1/3 flex items-center">
    <label htmlFor="search" className="py-2 pl-2 pr-1 cursor-text">🔍</label>
    <input
      id="search"
      className="py-2 pl-1 w-full rounded"
      placeholder="Search..."
    />
  </div>
}
