import { useState, useEffect } from 'react';
import Head from 'next/head';
import { FaTimes, FaPlus } from 'react-icons/fa';
import Header from '../components/Header';
import Footer from '../components/Footer';
import packagesData from '../data/packages';

export default function Packages() {
  const [menuItems, setMenuItems] = useState([]);
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    eventDate: '',
    headcount: '',
    packageId: packagesData[0]?.id || '',
    message: ''
  });
  const [status, setStatus] = useState({ state: 'idle', error: '' });
  
  // Customizable package state
  const [customPkg, setCustomPkg] = useState({ guestCount: '', selectedItems: [] });
  const [showCustomBuilder, setShowCustomBuilder] = useState(false);
  const [showItemPicker, setShowItemPicker] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  // Category limits for customizable package
  const categoryLimits = {
    appetizers: { label: 'Appetizers', limit: 3 },
    curries: { label: 'Curries / Main Course', limit: 5 },
    biryani: { label: 'Biryani', limit: 2 },
    grilled: { label: 'Grilled / Tandoori', limit: 3 },
    vegetarian: { label: 'Vegetarian', limit: 2 },
    desserts: { label: 'Desserts', limit: 2 }
  };

  useEffect(() => {
    async function fetchMenu() {
      const response = await fetch('/api/menu');
      const data = await response.json();
      setMenuItems(data);
    }
    fetchMenu();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleCustomGuestCount = (e) => {
    setCustomPkg((prev) => ({ ...prev, guestCount: e.target.value }));
  };

  const handleAddItem = (item) => {
    const category = item.category || 'uncategorized';
    const limit = categoryLimits[category]?.limit || 5;
    const selectedInCategory = customPkg.selectedItems.filter((i) => (i.category || 'uncategorized') === category).length;

    if (selectedInCategory >= limit) {
      alert(`You can only pick ${limit} items from the "${categoryLimits[category]?.label}" category.`);
      return;
    }

    if (!customPkg.selectedItems.find((i) => i.id === item.id)) {
      setCustomPkg((prev) => ({ ...prev, selectedItems: [...prev.selectedItems, item] }));
    }
  };

  const handleRemoveItem = (itemId) => {
    setCustomPkg((prev) => ({
      ...prev,
      selectedItems: prev.selectedItems.filter((i) => i.id !== itemId)
    }));
  };

  const handleConfirmCustom = () => {
    const customMessage = `Custom Package: ${customPkg.guestCount} guests\nItems:\n${customPkg.selectedItems.map((i) => `- ${i.name}`).join('\n')}`;
    setForm((prev) => ({
      ...prev,
      headcount: customPkg.guestCount,
      packageId: 'pkg-custom',
      message: customMessage
    }));
    setShowCustomBuilder(false);
    setShowConfirmation(false);
    
    // Scroll to form after a short delay
    setTimeout(() => {
      const formElement = document.getElementById('quote-form');
      if (formElement) {
        formElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ state: 'submitting', error: '' });
    try {
      const res = await fetch('/api/package-inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data?.error || 'Request failed');
      }
      setStatus({ state: 'success', error: '' });
      setForm((prev) => ({ ...prev, message: '' }));
    } catch (err) {
      setStatus({ state: 'error', error: err.message || 'Something went wrong' });
    }
  };

  return (
    <>
      <Head>
        <title>Packages - Kabab Hut Catering</title>
      </Head>
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Header />

        <main className="container mx-auto px-4 py-12 flex-grow">
          <div className="max-w-5xl mx-auto">
            <h1 className="text-4xl font-bold text-center text-gray-800 mb-4">Catering Packages</h1>
            <p className="text-center text-gray-600 mb-10">
              Four curated spreads (200+ ppl) with appetizers, mains, and regular/premium desserts.
            </p>

            {/* Packages Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              {packagesData.map((pkg) => (
                <div key={pkg.id} className="bg-white shadow-lg rounded-xl p-6 flex flex-col gap-5 border border-gray-100">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <h3 className="text-xl font-bold text-gray-800">{pkg.name}</h3>
                      <p className="text-sm text-gray-500">{pkg.priceNote || 'Contact for pricing'}</p>
                    </div>
                    <span className="px-3 py-1 bg-red-50 text-red-700 rounded-full text-xs font-semibold">
                      {pkg.id === 'pkg-custom' ? 'Custom' : 'Large events'}
                    </span>
                  </div>

                  {pkg.id === 'pkg-custom' ? (
                    <div className="space-y-3">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Number of Guests</label>
                        <input
                          type="number"
                          min="1"
                          value={customPkg.guestCount}
                          onChange={handleCustomGuestCount}
                          placeholder="e.g., 150"
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-600 focus:outline-none"
                        />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-700 mb-2">Selected Items ({customPkg.selectedItems.length})</p>
                        {customPkg.selectedItems.length === 0 ? (
                          <p className="text-xs text-gray-500 italic">No items selected yet</p>
                        ) : (
                          <div className="space-y-2">
                            {customPkg.selectedItems.map((item) => (
                              <div key={item.id} className="flex items-center justify-between bg-gray-50 p-2 rounded border border-gray-200">
                                <span className="text-sm text-gray-700">{item.name}</span>
                                <button
                                  type="button"
                                  onClick={() => handleRemoveItem(item.id)}
                                  className="text-red-600 hover:text-red-700"
                                >
                                  <FaTimes size={16} />
                                </button>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => setShowItemPicker(true)}
                          className="flex-1 bg-blue-600 text-white px-3 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700 transition flex items-center justify-center gap-2"
                        >
                          <FaPlus size={14} /> Add Items from Menu
                        </button>
                        <button
                          type="button"
                          onClick={() => setShowConfirmation(true)}
                          disabled={!customPkg.guestCount || customPkg.selectedItems.length === 0}
                          className="flex-1 bg-green-600 text-white px-3 py-2 rounded-lg text-sm font-semibold hover:bg-green-700 transition disabled:opacity-50"
                        >
                          Confirm
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm font-semibold text-gray-700 mb-2">Appetizers</p>
                          <ul className="text-sm text-gray-700 space-y-1">
                            {pkg.appetizers.map((item, idx) => (
                              <li key={idx} className="flex gap-2"><span className="text-red-600">•</span><span>{item}</span></li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-gray-700 mb-2">Main Course</p>
                          <ul className="text-sm text-gray-700 space-y-1">
                            {pkg.mains.map((item, idx) => (
                              <li key={idx} className="flex gap-2"><span className="text-red-600">•</span><span>{item}</span></li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm font-semibold text-gray-700 mb-2">Regular Dessert</p>
                          <ul className="text-sm text-gray-700 space-y-1">
                            {pkg.dessertsRegular.map((item, idx) => (
                              <li key={idx} className="flex gap-2"><span className="text-red-600">•</span><span>{item}</span></li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-gray-700 mb-2">Premium Dessert</p>
                          <ul className="text-sm text-gray-700 space-y-1">
                            {pkg.dessertsPremium.map((item, idx) => (
                              <li key={idx} className="flex gap-2"><span className="text-red-600">•</span><span>{item}</span></li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {pkg.note && (
                        <div className="text-sm text-gray-600 bg-gray-50 border border-dashed border-gray-200 rounded-lg p-3">
                          {pkg.note}
                        </div>
                      )}
                    </>
                  )}
                </div>
              ))}
            </div>

            {/* Item Picker Modal */}
            {showItemPicker && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-xl shadow-2xl max-w-3xl w-full max-h-[80vh] overflow-y-auto p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-2xl font-bold text-gray-800">Select Menu Items by Category</h3>
                    <button
                      onClick={() => setShowItemPicker(false)}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <FaTimes size={24} />
                    </button>
                  </div>

                  {/* Category limits info */}
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                    <p className="text-sm font-semibold text-blue-900 mb-3">Pick limits by category:</p>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                      {Object.entries(categoryLimits).map(([key, { label, limit }]) => {
                        const selectedCount = customPkg.selectedItems.filter((i) => (i.category || 'uncategorized') === key).length;
                        return (
                          <div key={key} className="text-xs text-blue-800 bg-white px-2 py-1 rounded border border-blue-100">
                            <strong>{label}:</strong> {selectedCount}/{limit}
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Items grouped by category */}
                  <div className="space-y-6">
                    {Object.entries(categoryLimits).map(([catKey, { label, limit }]) => {
                      const itemsInCat = menuItems.filter((item) => (item.category || 'uncategorized') === catKey);
                      const selectedCount = customPkg.selectedItems.filter((i) => (i.category || 'uncategorized') === catKey).length;

                      return (
                        <div key={catKey}>
                          <h4 className="text-lg font-semibold text-gray-800 mb-2">
                            {label} <span className="text-sm text-gray-500">({selectedCount}/{limit})</span>
                          </h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {itemsInCat.map((item) => {
                              const isSelected = customPkg.selectedItems.find((i) => i.id === item.id);
                              const isFull = selectedCount >= limit && !isSelected;

                              return (
                                <button
                                  key={item.id}
                                  onClick={() => handleAddItem(item)}
                                  disabled={isFull}
                                  className={`p-3 border-2 rounded-lg text-left transition ${
                                    isSelected
                                      ? 'border-green-600 bg-green-50 cursor-not-allowed'
                                      : isFull
                                      ? 'border-gray-200 bg-gray-50 cursor-not-allowed opacity-50'
                                      : 'border-gray-300 hover:border-red-600 hover:bg-red-50 cursor-pointer'
                                  }`}
                                >
                                  <p className="font-semibold text-sm text-gray-800">{item.name}</p>
                                  <p className="text-xs text-gray-600">{item.desc}</p>
                                  {isSelected && (
                                    <p className="text-xs text-green-600 font-semibold mt-1">✓ Selected</p>
                                  )}
                                  {isFull && (
                                    <p className="text-xs text-gray-500 font-semibold mt-1">Category full</p>
                                  )}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <button
                    onClick={() => setShowItemPicker(false)}
                    className="w-full mt-6 bg-gray-800 text-white px-4 py-2 rounded-lg font-semibold hover:bg-gray-900 transition"
                  >
                    Done
                  </button>
                </div>
              </div>
            )}

            {/* Confirmation Modal */}
            {showConfirmation && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6">
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">Confirm Your Selection</h3>
                  <div className="space-y-3 mb-6">
                    <div className="border-b pb-3">
                      <p className="text-sm text-gray-600">Guests</p>
                      <p className="text-lg font-semibold text-gray-800">{customPkg.guestCount} people</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-2">Selected Items ({customPkg.selectedItems.length})</p>
                      <ul className="space-y-1">
                        {customPkg.selectedItems.map((item) => (
                          <li key={item.id} className="text-sm text-gray-700 flex gap-2">
                            <span className="text-red-600">•</span> {item.name}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={() => setShowConfirmation(false)}
                      className="flex-1 bg-gray-300 text-gray-800 px-4 py-2 rounded-lg font-semibold hover:bg-gray-400 transition"
                    >
                      Edit
                    </button>
                    <button
                      onClick={handleConfirmCustom}
                      className="flex-1 bg-green-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-700 transition"
                    >
                      Confirm & Continue
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Inquiry Form */}
            <div className="bg-white shadow-lg rounded-xl p-8 border border-gray-100" id="quote-form">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Request a Quote</h2>
              <p className="text-gray-600 mb-6">Complete the form below with your contact details. We'll email you a custom quote.</p>
              <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Name *</label>
                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-600 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-600 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Phone</label>
                  <input
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-600 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Event Date</label>
                  <input
                    type="date"
                    name="eventDate"
                    value={form.eventDate}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-600 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Headcount</label>
                  <input
                    type="number"
                    min="1"
                    name="headcount"
                    value={form.headcount}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-600 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Package</label>
                  <select
                    name="packageId"
                    value={form.packageId}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-600 focus:outline-none"
                  >
                    {packagesData.map((pkg) => (
                      <option key={pkg.id} value={pkg.id}>
                        {pkg.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Notes</label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows={4}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-600 focus:outline-none"
                    placeholder="Tell us about your event, cuisine preferences, dietary needs, venue, etc."
                  />
                </div>
                <div className="md:col-span-2 flex items-center gap-3">
                  <button
                    type="submit"
                    disabled={status.state === 'submitting'}
                    className="bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition disabled:opacity-60"
                  >
                    {status.state === 'submitting' ? 'Sending...' : 'Request Quote'}
                  </button>
                  {status.state === 'success' && (
                    <span className="text-green-600 text-sm">Inquiry sent! We will contact you soon.</span>
                  )}
                  {status.state === 'error' && (
                    <span className="text-red-600 text-sm">{status.error}</span>
                  )}
                </div>
              </form>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}
