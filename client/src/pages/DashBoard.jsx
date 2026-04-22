import { useEffect, useState } from "react";
import API from "../api/axios";
import ExpenseForm from "../components/ExpenseForm";
import ExpenseList from "../components/ExpenseList";
import Filters from "../components/Filters";
import TotalCard from "../components/TotalCard";

export default function Dashboard() {
  const [expenses, setExpenses] = useState([]);
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("desc");
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState(""); 

  const fetchExpenses = async () => {
    try {
      setLoading(true);
      setError("");

      let url = "/expenses?";
      if (category) url += `category=${category}&`;
      if (sort) url += `sort=${sort}`;

      const res = await API.get(url);
      setExpenses(res.data);
    } catch (err) {
      console.error(err);
      setError("Failed to load expenses");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, [category, sort]);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-3xl mx-auto space-y-6">

        <h1 className="text-3xl font-bold text-center">
          Expense Tracker
        </h1>

        <div className="bg-white p-5 rounded-xl shadow">
          <ExpenseForm onAdd={fetchExpenses} />
        </div>

        <div className="bg-white p-5 rounded-xl shadow">
          <Filters
            category={category}
            setCategory={setCategory}
            setSort={setSort}
          />
        </div>

        <TotalCard expenses={expenses} />

        {error && (
          <div className="text-sm text-red-500 text-center">
            {error}
          </div>
        )}

        <div className="bg-white p-5 rounded-xl shadow">
          <ExpenseList expenses={expenses} loading={loading} />
        </div>

      </div>
    </div>
  );
}