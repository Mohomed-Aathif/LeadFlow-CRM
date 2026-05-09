import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import toast from "react-hot-toast";

import api from "../../api/axios";

import StatusBadge from "../../components/leads/StatusBadge";

function LeadDetailsPage() {
  const { id } = useParams();

  const [lead, setLead] =
    useState<any>(null);

  const [notes, setNotes] = useState<
    any[]
  >([]);

  const [noteContent, setNoteContent] =
    useState("");

  const [loading, setLoading] =
    useState(true);

  const fetchLead = async () => {
    try {
      const response = await api.get(
        `/leads/${id}`
      );

      setLead(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchNotes = async () => {
    try {
      const response = await api.get(
        `/leads/${id}/notes`
      );

      setNotes(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const loadLead = async () => {
      await fetchLead();

      await fetchNotes();
    };

    loadLead();
  }, []);


  const addNote = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    if (!noteContent.trim()) return;

    try {
      await api.post(
        `/leads/${id}/notes`,
        {
          content: noteContent,
        }
      );

      setNoteContent("");

      toast.success("Note added");

      fetchNotes();
    } catch (error) {
      console.error(error);

      toast.error("Failed to add note");
    }
  };

  if (loading || !lead) {
    return (
      <div>Loading lead...</div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="bg-white border rounded-2xl p-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold">
              {lead.leadName}
            </h1>

            <p className="text-gray-500 mt-2">
              {lead.companyName}
            </p>
          </div>

          <StatusBadge
            status={lead.status}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <p className="text-sm text-gray-500">
              Email
            </p>

            <p className="font-medium">
              {lead.email}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">
              Phone
            </p>

            <p className="font-medium">
              {lead.phoneNumber}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">
              Lead Source
            </p>

            <p className="font-medium">
              {lead.leadSource.replace(
                "_",
                " "
              )}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">
              Assigned Salesperson
            </p>

            <p className="font-medium">
              {
                lead.assignedSalesperson
              }
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">
              Deal Value
            </p>

            <p className="font-medium">
              $
              {lead.dealValue.toLocaleString()}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">
              Created Date
            </p>

            <p className="font-medium">
              {new Date(
                lead.createdAt
              ).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white border rounded-2xl p-8">
        <h2 className="text-2xl font-bold mb-6">
          Notes
        </h2>

        <form
          onSubmit={addNote}
          className="mb-8"
        >
          <textarea
            value={noteContent}
            onChange={(e) =>
              setNoteContent(
                e.target.value
              )
            }
            placeholder="Add a note..."
            rows={4}
            className="w-full border rounded-xl px-4 py-3"
          />

          <button
            type="submit"
            className="mt-4 bg-blue-600 text-white px-5 py-3 rounded-lg hover:bg-blue-700 transition"
          >
            Add Note
          </button>
        </form>

        <div className="space-y-4">
          {notes.length === 0 ? (
            <p className="text-gray-500">
              No notes yet
            </p>
          ) : (
            notes.map((note) => (
              <div
                key={note.id}
                className="border rounded-xl p-4"
              >
                <div className="flex items-center justify-between mb-2">
                  <p className="font-semibold">
                    {note.createdBy}
                  </p>

                  <p className="text-sm text-gray-500">
                    {new Date(
                      note.createdAt
                    ).toLocaleString()}
                  </p>
                </div>

                <p className="text-gray-700">
                  {note.content}
                </p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default LeadDetailsPage;