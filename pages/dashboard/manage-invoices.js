import { getSession, useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { FaArrowLeft, FaPlus, FaTrash } from 'react-icons/fa';

export default function ManageInvoices() {
  const { data: session } = useSession();
  const router = useRouter();
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    customer: '',
    items: [{ name: '', qty: 1, unitPrice: 0 }],
  });

  useEffect(() => {
    async function fetchInvoices() {
      const response = await fetch('/api/invoices', {
        headers: { 'x-role': session?.user?.role || '' },
      });
      const data = await response.json();
      setInvoices(data);
      setLoading(false);
    }
    if (session?.user?.role) fetchInvoices();
  }, [session]);

  function addItem() {
    setFormData({
      ...formData,
      items: [...formData.items, { name: '', qty: 1, unitPrice: 0 }],
    });
  }

  function removeItem(index) {
    setFormData({
      ...formData,
      items: formData.items.filter((_, i) => i !== index),
    });
  }

  function updateItem(index, field, value) {
    const updated = [...formData.items];
    updated[index][field] = field === 'name' ? value : parseFloat(value) || 0;
    setFormData({ ...formData, items: updated });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const total = formData.items.reduce((sum, item) => sum + item.qty * item.unitPrice, 0);
    const response = await fetch('/api/invoices', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-role': session.user.role,
      },
      body: JSON.stringify({ customer: formData.customer, total, items: formData.items }),
    });

    if (response.ok) {
      const newInvoice = await response.json();
      setInvoices([newInvoice, ...invoices]);
      setFormData({ customer: '', items: [{ name: '', qty: 1, unitPrice: 0 }] });
      setShowForm(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto bg-white shadow-md rounded-lg p-6">
        <button
          onClick={() => router.push('/dashboard/owner')}
          className="flex items-center gap-2 mb-4 text-blue-600 hover:text-blue-800"
        >
          <FaArrowLeft /> Back to Dashboard
        </button>

        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Manage Invoices</h1>
          <button
            onClick={() => setShowForm(!showForm)}
            className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            <FaPlus /> Create New Invoice
          </button>
        </div>

        {showForm && (
          <form onSubmit={handleSubmit} className="mb-8 p-6 bg-gray-50 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">New Invoice</h2>
            <div className="mb-4">
              <label className="block mb-2 font-medium">Customer Name</label>
              <input
                type="text"
                value={formData.customer}
                onChange={(e) => setFormData({ ...formData, customer: e.target.value })}
                required
                className="w-full px-3 py-2 border rounded"
              />
            </div>

            <h3 className="font-semibold mb-3">Items</h3>
            {formData.items.map((item, index) => (
              <div key={index} className="grid grid-cols-12 gap-2 mb-3">
                <input
                  type="text"
                  placeholder="Item name"
                  value={item.name}
                  onChange={(e) => updateItem(index, 'name', e.target.value)}
                  required
                  className="col-span-5 px-3 py-2 border rounded"
                />
                <input
                  type="number"
                  placeholder="Qty"
                  value={item.qty}
                  onChange={(e) => updateItem(index, 'qty', e.target.value)}
                  required
                  min="1"
                  className="col-span-2 px-3 py-2 border rounded"
                />
                <input
                  type="number"
                  placeholder="Price"
                  value={item.unitPrice}
                  onChange={(e) => updateItem(index, 'unitPrice', e.target.value)}
                  required
                  step="0.01"
                  className="col-span-3 px-3 py-2 border rounded"
                />
                <button
                  type="button"
                  onClick={() => removeItem(index)}
                  className="col-span-2 px-3 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                >
                  <FaTrash />
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addItem}
              className="mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              + Add Item
            </button>

            <div className="flex gap-2">
              <button
                type="submit"
                className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              >
                Create Invoice
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="px-6 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
              >
                Cancel
              </button>
            </div>
          </form>
        )}

        {loading ? (
          <p>Loading invoices...</p>
        ) : (
          <div className="space-y-4">
            {invoices.map((invoice) => (
              <div key={invoice.id} className="border rounded-lg p-4 shadow hover:shadow-lg transition">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="text-xl font-semibold">{invoice.customer}</h3>
                    <p className="text-sm text-gray-500">
                      {invoice.createdAt ? new Date(invoice.createdAt).toLocaleDateString() : 'N/A'}
                    </p>
                  </div>
                  <p className="text-2xl font-bold text-green-600">${invoice.total.toFixed(2)}</p>
                </div>
                <div className="border-t pt-3">
                  <h4 className="font-semibold mb-2">Items:</h4>
                  <ul className="space-y-1">
                    {invoice.items?.map((item, idx) => (
                      <li key={idx} className="text-sm text-gray-700">
                        {item.name} - Qty: {item.qty} × ${item.unitPrice.toFixed(2)} = ${(item.qty * item.unitPrice).toFixed(2)}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (!session || !['owner', 'root'].includes(session.user.role)) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
}
