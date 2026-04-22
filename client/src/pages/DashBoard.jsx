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

  const fetchExpenses = async () => {
    let url = "/expenses?";
    if (category) url += `category=${category}&`;
    if (sort) url += `sort=${sort}`;

    const res = await API.get(url);
    setExpenses(res.data);
  };

  useEffect(() => {
    fetchExpenses();
  }, [category, sort]);

  const total = expenses.reduce((sum, e) => sum + e.amount, 0);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-3xl mx-auto space-y-6">

        <h1 className="text-3xl font-bold text-center">
          💸 Expense Tracker
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

        <TotalCard  expenses={expenses}/>

        <div className="bg-white p-5 rounded-xl shadow">
          <ExpenseList expenses={expenses} />
        </div>

      </div>
    </div>
  );
}