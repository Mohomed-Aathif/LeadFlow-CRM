import LeadForm from "../../components/leads/LeadForm";

function CreateLeadPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold">
          Create Lead
        </h1>

        <p className="text-gray-500 mt-2">
          Add a new sales lead
        </p>
      </div>

      <LeadForm />
    </div>
  );
}

export default CreateLeadPage;