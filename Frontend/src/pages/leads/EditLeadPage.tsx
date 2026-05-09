import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import api from "../../api/axios";

import LeadForm from "../../components/leads/LeadForm";

function EditLeadPage() {
  const { id } = useParams();

  const [lead, setLead] = useState<any>(
    null
  );

  const fetchLead = async () => {
    try {
      const response = await api.get(
        `/leads/${id}`
      );

      setLead(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const loadLead = async () => {
      await fetchLead();
    };

    loadLead();
  }, []);

  if (!lead) {
    return <div>Loading...</div>;
  }

  if (!lead) {
    return (
      <div>Loading lead...</div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold">
          Edit Lead
        </h1>

        <p className="text-gray-500 mt-2">
          Update lead information
        </p>
      </div>

      <LeadForm
        initialData={lead}
        isEdit
      />
    </div>
  );
}

export default EditLeadPage;