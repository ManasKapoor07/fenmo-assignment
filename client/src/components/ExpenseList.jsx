export default function ExpenseList({ expenses }) {
  if (!expenses.length) {
    return (
      <div className="text-center py-12 text-gray-400 text-sm">
        No expenses recorded
      </div>
    );
  }

  return (
    <div className="bg-white border rounded-lg overflow-hidden">

      <div className="hidden sm:grid grid-cols-4 text-xs text-gray-500 px-4 py-3 bg-gray-50 border-b">
        <span>Category</span>
        <span>Description</span>
        <span>Date</span>
        <span className="text-right">Amount</span>
      </div>

      <div className="divide-y">

        {expenses.map((e) => (
          <div
            key={e.id}
            className="p-4 sm:p-3 sm:grid sm:grid-cols-4 sm:items-center hover:bg-gray-50 transition"
          >

            {/* 🟢 Mobile Layout */}
            <div className="sm:hidden space-y-1">
              <div className="flex justify-between items-center">
                <span className="font-medium text-gray-900">
                  {e.category}
                </span>
                <span className="font-semibold text-gray-900">
                  ₹{(e.amount / 100).toFixed(2)}
                </span>
              </div>

              <p className="text-sm text-gray-500">
                {e.description || "—"}
              </p>

              <p className="text-xs text-gray-400">
                {new Date(e.date).toLocaleDateString()}
              </p>
            </div>

            <span className="hidden sm:block font-medium text-gray-800">
              {e.category}
            </span>

            <span className="hidden sm:block text-gray-500 truncate">
              {e.description || "—"}
            </span>

            <span className="hidden sm:block text-gray-500">
              {new Date(e.date).toLocaleDateString()}
            </span>

            <span className="hidden sm:block text-right font-semibold text-gray-900">
              ₹{(e.amount / 100).toFixed(2)}
            </span>

          </div>
        ))}

      </div>
    </div>
  );
}