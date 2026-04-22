import { useState, useEffect } from "react";
import { db } from "../firebase/config";
import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";

import { FiTrash2, FiEdit2, FiSave } from "react-icons/fi";

export default function Admin() {
  const [data, setData] = useState([]);
  const [editId, setEditId] = useState(null);

  const [form, setForm] = useState({
    merchantName: "",
    badge: "",
    trades30d: "",
    completion30d: "",
    feedbackPositive: "",
    feedbackNegative: "",
    totalOrders: "",
    buyRate: "",
    sellRate: "",
    buyAd: "",
    sellAd: "",
    merchantLink: "",
  });

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "merchants"), (snap) => {
      setData(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    });
    return () => unsub();
  }, []);

  const resetForm = () => {
    setForm({
      merchantName: "",
      badge: "",
      trades30d: "",
      completion30d: "",
      feedbackPositive: "",
      feedbackNegative: "",
      totalOrders: "",
      buyRate: "",
      sellRate: "",
      buyAd: "",
      sellAd: "",
      merchantLink: "",
    });
    setEditId(null);
  };

  const addOrUpdateMerchant = async () => {
    const payload = {
      ...form,
      trades30d: Number(form.trades30d),
      completion30d: Number(form.completion30d),
      feedbackPositive: Number(form.feedbackPositive),
      feedbackNegative: Number(form.feedbackNegative),
      buyRate: Number(form.buyRate),
      sellRate: Number(form.sellRate),
      lastUpdated: new Date().toLocaleString(), // ✅ auto date-time
    };

    if (editId) {
      await updateDoc(doc(db, "merchants", editId), payload);
    } else {
      await addDoc(collection(db, "merchants"), payload);
    }

    resetForm();
  };

  const deleteMerchant = async (id) => {
    await deleteDoc(doc(db, "merchants", id));
  };

  const handleEdit = (m) => {
    setForm(m);
    setEditId(m.id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 p-4 md:p-6">

      <h2 className="text-2xl font-semibold mb-6">
        Admin Panel
      </h2>

      {/* FORM */}
      <div className="bg-white border border-gray-200 p-4 rounded-xl mb-6 grid grid-cols-1 sm:grid-cols-2 gap-3 shadow-sm">
        {Object.keys(form).map((key) => (
          <div key={key} className="flex flex-col">
            <label className="text-xs text-gray-500 mb-1 capitalize">
              {key}
            </label>
            <input
              value={form[key]}
              placeholder={key}
              className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              onChange={(e) =>
                setForm({ ...form, [key]: e.target.value })
              }
            />
          </div>
        ))}
      </div>

      {/* BUTTON */}
      <button
        onClick={addOrUpdateMerchant}
        className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition mb-8"
      >
        {editId ? <FiSave /> : <FiSave />}
        {editId ? "Update Merchant" : "Add Merchant"}
      </button>

      {/* LIST */}
      <div className="space-y-3">
        {data.map((m) => (
          <div
            key={m.id}
            className="bg-white border border-gray-200 p-4 rounded-lg flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 shadow-sm"
          >
            <div>
              <h3 className="font-semibold text-lg">
                {m.merchantName}
              </h3>

              <p className="text-xs text-gray-500">
                {m.trades30d} trades • {m.completion30d}% completion
              </p>

              <p className="text-sm text-green-600">
                Buy: {m.buyRate} | Sell: {m.sellRate}
              </p>

              <p className="text-xs text-gray-400 mt-1">
                Updated: {m.lastUpdated}
              </p>
            </div>

            <div className="flex gap-3">
              {/* EDIT */}
              <button
                onClick={() => handleEdit(m)}
                className="text-blue-500 hover:text-blue-600"
              >
                <FiEdit2 />
              </button>

              {/* DELETE */}
              <button
                onClick={() => deleteMerchant(m.id)}
                className="text-red-500 hover:text-red-600"
              >
                <FiTrash2 />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}