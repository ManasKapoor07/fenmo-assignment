export default function Filters({
  category,
  setCategory,
  sort,
  setSort,
}) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

      {/* Category */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-2 w-full sm:w-auto">
        <span className="text-sm text-gray-500">Category</span>

        <input
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="Search..."
          className="w-full sm:w-48 border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-gray-900"
        />
      </div>

      {/* Sort */}
      <div className="flex items-center justify-between sm:justify-end gap-2">
        <span className="text-sm text-gray-500 hidden sm:block">
          Sort
        </span>

        <div className="flex gap-2 w-full sm:w-auto">
          <button
            onClick={() => setSort("desc")}
            className={`flex-1 sm:flex-none px-3 py-2 text-sm rounded-md border transition ${
              sort === "date_desc"
                ? "bg-gray-900 text-white border-gray-900"
                : "border-gray-300 text-gray-700"
            }`}
          >
            Newest
          </button>

          <button
            onClick={() => setSort("asc")}
            className={`flex-1 sm:flex-none px-3 py-2 text-sm rounded-md border transition ${
              sort === "date_asc"
                ? "bg-gray-900 text-white border-gray-900"
                : "border-gray-300 text-gray-700"
            }`}
          >
            Oldest
          </button>
        </div>
      </div>
    </div>
  );
}