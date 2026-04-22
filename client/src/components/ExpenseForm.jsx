import { useState } from "react";
import API from "../api/axios";

export default function ExpenseForm({ onAdd }) {
  const [form, setForm] = useState({
    amount: "",
    category: "",
    description: "",
    date: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const newErrors = {};

    if (!form.amount) {
      newErrors.amount = "Required";
    } else if (Number(form.amount) <= 0) {
      newErrors.amount = "Must be > 0";
    }

    if (!form.category.trim()) {
      newErrors.category = "Required";
    }

    if (!form.date) {
      newErrors.date = "Required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      setLoading(true);

      const payload = {
        ...form,
        amount: Number(form.amount) * 100,
        idempotencyKey: Date.now() + "-" + Math.random(),
      };

      await API.post("/expenses", payload);

      setForm({
        amount: "",
        category: "",
        description: "",
        date: "",
      });

      setErrors({});
      onAdd();
    } catch (err) {
      console.error(err);
      alert("Failed to add expense");
    } finally {
      setLoading(false);
    }
  };

  const inputBase =
    "w-full rounded-md border px-3 py-2 text-sm focus:outline-none";

  const inputNormal =
    "border-gray-300 focus:border-gray-900";

  const inputError =
    "border-red-400 focus:border-red-500";

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      {/* Header */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900">
          Add Expense
        </h2>
        <p className="text-sm text-gray-500">
          Track where your money goes
        </p>
      </div>

      {/* Amount + Category */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-sm text-gray-600">
            Amount
          </label>
          <input
            type="number"
            placeholder="₹ 500"
            className={`${inputBase} ${
              errors.amount ? inputError : inputNormal
            }`}
            value={form.amount}
            onChange={(e) =>
              setForm({ ...form, amount: e.target.value })
            }
          />
          {errors.amount && (
            <p className="text-xs text-red-500 mt-1">
              {errors.amount}
            </p>
          )}
        </div>

        <div>
          <label className="text-sm text-gray-600">
            Category
          </label>
          <input
            placeholder="Food, Travel..."
            className={`${inputBase} ${
              errors.category ? inputError : inputNormal
            }`}
            value={form.category}
            onChange={(e) =>
              setForm({ ...form, category: e.target.value })
            }
          />
          {errors.category && (
            <p className="text-xs text-red-500 mt-1">
              {errors.category}
            </p>
          )}
        </div>
      </div>

      {/* Description */}
      <div>
        <label className="text-sm text-gray-600">
          Description
        </label>
        <input
          placeholder="Optional note"
          className={`${inputBase} ${inputNormal}`}
          value={form.description}
          onChange={(e) =>
            setForm({ ...form, description: e.target.value })
          }
        />
      </div>

      {/* Date */}
      <div>
        <label className="text-sm text-gray-600">
          Date
        </label>
        <input
          type="date"
          className={`${inputBase} ${
            errors.date ? inputError : inputNormal
          }`}
          value={form.date}
          onChange={(e) =>
            setForm({ ...form, date: e.target.value })
          }
        />
        {errors.date && (
          <p className="text-xs text-red-500 mt-1">
            {errors.date}
          </p>
        )}
      </div>

      {/* Submit */}
      <div className="pt-2">
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-md bg-gray-900 text-white py-2.5 text-sm font-medium hover:bg-gray-800 transition disabled:opacity-50"
        >
          {loading ? "Saving..." : "Add Expense"}
        </button>
      </div>
    </form>
  );
}