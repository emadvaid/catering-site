import { getSession, useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { FaArrowLeft, FaTrash, FaEdit, FaCamera } from 'react-icons/fa';
import { takePhoto, pickImage } from '../../lib/nativeFeatures';

export default function ManageMenu() {
  const { data: session } = useSession();
  const router = useRouter();
  const [menu, setMenu] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({ name: '', price: '', image: '' });
  const [uploadingPhoto, setUploadingPhoto] = useState(false);

  useEffect(() => {
    async function fetchMenu() {
      const response = await fetch('/api/menu', {
        headers: { 'x-role': session?.user?.role || '' },
      });
      const data = await response.json();
      setMenu(data);
      setLoading(false);
    }
    if (session?.user?.role) fetchMenu();
  }, [session]);

  async function handleSubmit(e) {
    e.preventDefault();
    const url = editingId ? '/api/menu' : '/api/menu';
    const method = editingId ? 'PUT' : 'POST';
    const body = editingId
      ? { id: editingId, ...formData, price: parseFloat(formData.price) }
      : { ...formData, price: parseFloat(formData.price) };

    const response = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        'x-role': session.user.role,
      },
      body: JSON.stringify(body),
    });

    if (response.ok) {
      const updated = await response.json();
      if (editingId) {
        setMenu(menu.map((item) => (item.id === editingId ? updated : item)));
        setEditingId(null);
      } else {
        setMenu([...menu, updated]);
      }
      setFormData({ name: '', price: '', image: '' });
    }
  }

  async function handleDelete(id) {
    if (!confirm('Are you sure you want to delete this item?')) return;
    const response = await fetch(`/api/menu?id=${id}`, {
      method: 'DELETE',
      headers: { 'x-role': session.user.role },
    });
    if (response.ok) {
      setMenu(menu.filter((item) => item.id !== id));
    }
  }

  function handleEdit(item) {
    setEditingId(item.id);
    setFormData({ name: item.name, price: item.price.toString(), image: item.image || '' });
  }

  function handleCancel() {
    setEditingId(null);
    setFormData({ name: '', price: '', image: '' });
  }

  async function handleTakePhoto() {
    setUploadingPhoto(true);
    try {
      const photoBase64 = await takePhoto();
      if (photoBase64) {
        setFormData({ ...formData, image: photoBase64 });
      }
    } catch (error) {
      console.error('Camera error:', error);
      alert('Camera not available. Please enter image URL manually.');
    }
    setUploadingPhoto(false);
  }

  async function handlePickImage() {
    setUploadingPhoto(true);
    try {
      const photoBase64 = await pickImage();
      if (photoBase64) {
        setFormData({ ...formData, image: photoBase64 });
      }
    } catch (error) {
      console.error('Gallery error:', error);
      alert('Gallery not available. Please enter image URL manually.');
    }
    setUploadingPhoto(false);
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

        <h1 className="text-3xl font-bold mb-6">Manage Menu</h1>

        <form onSubmit={handleSubmit} className="mb-8 p-6 bg-gray-50 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">{editingId ? 'Edit Menu Item' : 'Add New Menu Item'}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block mb-2 font-medium">Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                className="w-full px-3 py-2 border rounded"
              />
            </div>
            <div>
              <label className="block mb-2 font-medium">Price</label>
              <input
                type="number"
                step="0.01"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                required
                className="w-full px-3 py-2 border rounded"
              />
            </div>
            <div>
              <label className="block mb-2 font-medium">Image</label>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={handleTakePhoto}
                  disabled={uploadingPhoto}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-400"
                >
                  <FaCamera /> {uploadingPhoto ? 'Loading...' : 'Take Photo'}
                </button>
                <button
                  type="button"
                  onClick={handlePickImage}
                  disabled={uploadingPhoto}
                  className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 disabled:bg-gray-400"
                >
                  📱 Gallery
                </button>
              </div>
              <input
                type="text"
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                placeholder="Or paste image URL"
                className="w-full px-3 py-2 border rounded mt-2"
              />
              {formData.image && (
                <img src={formData.image} alt="Preview" className="mt-2 w-full h-32 object-cover rounded" />
              )}
            </div>
          </div>
          <div className="mt-4 flex gap-2">
            <button
              type="submit"
              className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              {editingId ? 'Update' : 'Add'} Item
            </button>
            {editingId && (
              <button
                type="button"
                onClick={handleCancel}
                className="px-6 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
              >
                Cancel
              </button>
            )}
          </div>
        </form>

        {loading ? (
          <p>Loading menu...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {menu.map((item) => (
              <div key={item.id} className="border rounded-lg p-4 shadow hover:shadow-lg transition">
                {item.image && (
                  <img src={item.image} alt={item.name} className="w-full h-40 object-cover rounded mb-3" />
                )}
                <h3 className="text-xl font-semibold mb-2">{item.name}</h3>
                <p className="text-gray-600 mb-4">${item.price.toFixed(2)}</p>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(item)}
                    className="flex-1 px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 flex items-center justify-center gap-2"
                  >
                    <FaEdit /> Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="flex-1 px-3 py-2 bg-red-600 text-white rounded hover:bg-red-700 flex items-center justify-center gap-2"
                  >
                    <FaTrash /> Delete
                  </button>
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
