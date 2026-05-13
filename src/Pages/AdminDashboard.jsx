import { Link } from "react-router";

import { useState, useEffect } from "react";
import { axiosInstance as api } from "../utils/axios";

const emptyForm = {
  title: "",
  price: "",
  description: "",
  category: "",
  status: false,
  images: [],
};

const AdminDashboard = () => {
  const [foods, setFoods] = useState([]); //Array -> Objects -> _id
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [form, setForm] = useState(emptyForm);
  const [submitting, setSubmitting] = useState(false);
  const [editType, seteditType] = useState("CREATE");
  const [updateID, setUpdateId] = useState("");
  const [buttonState, setbuttonState] = useState("Create Food");

  const loadFoods = async () => {
    try {
      const res = await api.get("/food");
      setFoods(res.data.data || []);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load foods");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadFoods();
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files || []);
    setForm((prev) => ({ ...prev, images: files }));
  };

  const handleCreateFood = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    try {
      const fd = new FormData();
      fd.append("title", form.title);
      fd.append("price", form.price);
      fd.append("description", form.description);
      fd.append("category", form.category);
      fd.append("status", String(form.available));
      form.images.forEach((file) => {
        fd.append("images", file);
      });

      if (editType == "CREATE") {
        const res = await api.post("/food", fd, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        setFoods((prev) => [...prev, res.data]);
        setForm(emptyForm);
        return;
      }
      const res = await api.put(`/food/update/${updateID}`, fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setFoods((prev) => [...prev, res.data]);
      setForm(emptyForm);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create food");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteFood = async (id) => {
    if (!window.confirm("Delete this food item?")) return;
    try {
      await api.delete(`/food/${id}`);
      setFoods((prev) => prev.filter((f) => f._id !== id));
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete food");
    }
  };

  const handleUpdateFood = async (id) => {
    const foodFromID = foods.filter((item) => item._id == id);

    // console.log(foodFromID[0]);
    const foodSelectIdData = foodFromID[0];

    setForm({
      title: foodSelectIdData.title,
      price: foodSelectIdData.price,
      description: foodSelectIdData.description,
      category: foodSelectIdData.category,
      status: foodSelectIdData.status,
      images: [],
    });

    seteditType("EDIT");
    setUpdateId(id);
  };
  useEffect(() => {
    if (submitting) {
      if (editType == "CREATE") {
        setbuttonState("Creating Food ....");
      } else {
        setbuttonState("Updating Food ....");
      }
    } else {
      if (editType == "CREATE") {
        setbuttonState("Create Food");
      } else {
        setbuttonState("Update Food");
      }
    }
  }, [editType]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold">Admin dashboard</h1>
          <p className="text-sm text-base-content/70">
            Manage menu items with multiple images.
          </p>
        </div>
        <div className="flex gap-2">
          <Link to="/admin/orders" className="btn btn-outline btn-sm">
            View all orders
          </Link>
        </div>
      </div>
      {error && <div className="alert alert-error text-sm">{error}</div>}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        <form
          className="card bg-base-100 shadow col-span-1"
          onSubmit={handleCreateFood}
        >
          <div className="card-body space-y-3">
            <h2 className="card-title text-lg">Create food</h2>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                name="title"
                className="input input-bordered w-full"
                value={form.title}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Price</span>
              </label>
              <input
                type="number"
                step="0.01"
                name="price"
                className="input input-bordered w-full"
                value={form.price}
                onChange={handleInputChange}
                required
                min={0}
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Description</span>
              </label>
              <textarea
                name="description"
                className="textarea textarea-bordered w-full"
                rows={3}
                value={form.description}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Category</span>
              </label>

              <input
                type="text"
                name="category"
                className="input input-bordered w-full"
                value={form.category}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-control flex-row items-center gap-2">
              <label className="label cursor-pointer">
                <span className="label-text mr-2">Available</span>
                <input
                  type="checkbox"
                  className="toggle toggle-primary"
                  name="available"
                  checked={form.available}
                  onChange={handleInputChange}
                />
              </label>
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Images</span>
              </label>
              <input
                type="file"
                multiple
                accept="image/*"
                className="file-input file-input-bordered w-full"
                onChange={handleFileChange}
              />
              <span className="text-xs text-base-content/60 mt-1">
                You can upload multiple images; the first one will be used as
                the cover.
              </span>
            </div>
            <div className="card-actions mt-3">
              <button
                className={`btn btn-primary w-full ${
                  submitting ? "loading" : ""
                }`}
                type="submit"
                disabled={submitting}
              >
                {buttonState}
              </button>
            </div>
          </div>
        </form>

        <div className="lg:col-span-2 space-y-3">
          <h2 className="text-lg font-semibold">Menu items</h2>
          {loading ? (
            <div className="flex items-center justify-center h-64">
              <span className="loading loading-spinner loading-lg text-primary" />
            </div>
          ) : (
            <div className="grid gap-3 md:grid-cols-2">
              {foods.map((food) => {
                const imageSrc = Array.isArray(food.images)
                  ? food.images[0]
                  : food.images;
                return (
                  <div key={food._id} className="card bg-base-100 shadow">
                    {imageSrc && (
                      <figure>
                        {/* eslint-disable-next-line jsx-a11y/img-redundant-alt */}
                        <img
                          src={imageSrc}
                          alt={food.name}
                          className="h-40 w-full object-cover"
                        />
                      </figure>
                    )}
                    <div className="card-body space-y-1">
                      <div className="flex items-center justify-between">
                        <h2 className="card-title text-base">{food.title}</h2>
                        <span className="font-semibold">
                          ${Number(food.price).toFixed(2)}
                        </span>
                      </div>
                      <p className="text-xs text-base-content/70 line-clamp-2">
                        {food.description}
                      </p>
                      <div className="flex items-center justify-between mt-1">
                        <span className="badge badge-outline">
                          {food.category}
                        </span>
                        <span
                          className={`badge badge-sm ${
                            food.available ? "badge-success" : "badge-neutral"
                          }`}
                        >
                          {food.available ? "Available" : "Hidden"}
                        </span>
                      </div>
                      <div className="card-actions justify-end mt-2">
                        <button
                          type="button"
                          className="btn btn-outline btn-error btn-xs"
                          onClick={() => handleDeleteFood(food._id)}
                        >
                          Delete
                        </button>
                      </div>
                      <div className="card-actions justify-end mt-2">
                        <button
                          type="button"
                          className="btn btn-outline btn-error btn-xs"
                          onClick={() => handleUpdateFood(food._id)}
                        >
                          Edit
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
              {foods.length === 0 && (
                <div className="card bg-base-100 shadow col-span-full">
                  <div className="card-body">
                    <p className="text-sm text-base-content/70">
                      No foods yet. Use the form on the left to create your
                      first item.
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
