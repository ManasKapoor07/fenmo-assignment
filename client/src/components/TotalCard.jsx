export default function TotalCard({ expenses }) {
  const total = expenses.reduce((sum, e) => sum + e.amount, 0);

  const categoryMap = {};

  expenses.forEach((e) => {
    if (!categoryMap[e.category]) {
      categoryMap[e.category] = 0;
    }
    categoryMap[e.category] += e.amount;
  });

  const categories = Object.entries(categoryMap);

  return (
    <div className="bg-white border rounded-lg p-4 space-y-4">

      <div className="flex justify-between items-center">
        <span className="text-sm text-gray-500">Total</span>
        <span className="text-lg font-semibold text-gray-900">
          ₹{(total / 100).toFixed(2)}
        </span>
      </div>

      {categories.length > 0 && (
        <div className="border-t pt-3 space-y-2">
          <p className="text-xs text-gray-500">
            Breakdown
          </p>

          {categories.map(([cat, amt]) => (
            <div
              key={cat}
              className="flex justify-between text-sm"
            >
              <span className="text-gray-600">
                {cat}
              </span>
              <span className="font-medium text-gray-900">
                ₹{(amt / 100).toFixed(2)}
              </span>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}