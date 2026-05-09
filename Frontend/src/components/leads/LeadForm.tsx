import { useState } from "react";

import { useNavigate } from "react-router-dom";

import toast from "react-hot-toast";

import api from "../../api/axios";

interface LeadFormProps {
  initialData?: any;
  isEdit?: boolean;
}

function LeadForm({
  initialData,
  isEdit = false,
}: LeadFormProps) {
  const navigate = useNavigate();

  const [formData, setFormData] =
    useState({
      leadName:
        initialData?.leadName || "",
      companyName:
        initialData?.companyName || "",
      email: initialData?.email || "",
      phoneNumber:
        initialData?.phoneNumber || "",
      leadSource:
        initialData?.leadSource ||
        "WEBSITE",
      assignedSalesperson:
        initialData?.assignedSalesperson ||
        "",
      status:
        initialData?.status || "NEW",
      dealValue:
        initialData?.dealValue || "",
    });

  const [loading, setLoading] =
    useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    try {
      setLoading(true);

      if (isEdit) {
        await api.put(
          `/leads/${initialData.id}`,
          {
            ...formData,
            dealValue: Number(
              formData.dealValue
            ),
          }
        );
      } else {
        await api.post("/leads", {
          ...formData,
          dealValue: Number(
            formData.dealValue
          ),
        });

        toast.success(
            isEdit
                ? "Lead updated successfully"
                : "Lead created successfully"
        );
      }

      navigate("/leads");
    } catch (error) {
      console.error(error);

      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white border rounded-2xl p-8 max-w-3xl">
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        <div>
          <label className="block mb-2 font-medium">
            Lead Name
          </label>

          <input
            type="text"
            name="leadName"
            value={formData.leadName}
            onChange={handleChange}
            required
            className="w-full border rounded-lg px-4 py-3"
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">
            Company Name
          </label>

          <input
            type="text"
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
            required
            className="w-full border rounded-lg px-4 py-3"
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">
            Email
          </label>

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full border rounded-lg px-4 py-3"
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">
            Phone Number
          </label>

          <input
            type="text"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
            className="w-full border rounded-lg px-4 py-3"
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">
            Lead Source
          </label>

          <select
            name="leadSource"
            value={formData.leadSource}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-3"
          >
            <option value="WEBSITE">
              Website
            </option>

            <option value="LINKEDIN">
              LinkedIn
            </option>

            <option value="REFERRAL">
              Referral
            </option>

            <option value="COLD_EMAIL">
              Cold Email
            </option>

            <option value="EVENT">
              Event
            </option>

            <option value="OTHER">
              Other
            </option>
          </select>
        </div>

        <div>
          <label className="block mb-2 font-medium">
            Assigned Salesperson
          </label>

          <input
            type="text"
            name="assignedSalesperson"
            value={
              formData.assignedSalesperson
            }
            onChange={handleChange}
            required
            className="w-full border rounded-lg px-4 py-3"
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">
            Status
          </label>

          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-3"
          >
            <option value="NEW">
              New
            </option>

            <option value="CONTACTED">
              Contacted
            </option>

            <option value="QUALIFIED">
              Qualified
            </option>

            <option value="PROPOSAL_SENT">
              Proposal Sent
            </option>

            <option value="WON">
              Won
            </option>

            <option value="LOST">
              Lost
            </option>
          </select>
        </div>

        <div>
          <label className="block mb-2 font-medium">
            Deal Value
          </label>

          <input
            type="number"
            name="dealValue"
            value={formData.dealValue}
            onChange={handleChange}
            required
            className="w-full border rounded-lg px-4 py-3"
          />
        </div>

        <div className="md:col-span-2">
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
          >
            {loading
              ? "Saving..."
              : isEdit
              ? "Update Lead"
              : "Create Lead"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default LeadForm;