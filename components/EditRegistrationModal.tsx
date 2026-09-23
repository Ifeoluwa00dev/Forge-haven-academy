"use client";

import { useState } from "react";
import { X, Plus, Trash2 } from "lucide-react";

interface Child {
  child_name: string;
  child_age: number | null;
}

interface RegistrationData {
  id: string;
  parent_name: string;
  parent_email: string;
  parent_phone: string;
  payment_status: string;
  registration_children: Child[];
}

export default function EditRegistrationModal({
  registration,
  onClose,
  onSaved,
}: {
  registration: RegistrationData;
  onClose: () => void;
  onSaved: () => void;
}) {
  const [parentName, setParentName] = useState(registration.parent_name);
  const [parentEmail, setParentEmail] = useState(registration.parent_email);
  const [parentPhone, setParentPhone] = useState(registration.parent_phone);
  const [paymentStatus, setPaymentStatus] = useState(registration.payment_status);
  const [children, setChildren] = useState<Child[]>(
    registration.registration_children.length > 0
      ? registration.registration_children
      : [{ child_name: "", child_age: null }]
  );
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateChild = (idx: number, field: keyof Child, value: string) => {
    setChildren((c) =>
      c.map((child, i) =>
        i === idx
          ? {
              ...child,
              [field]: field === "child_age" ? (value ? parseInt(value, 10) : null) : value,
            }
          : child
      )
    );
  };

  const addChild = () => setChildren((c) => [...c, { child_name: "", child_age: null }]);
  const removeChild = (idx: number) => setChildren((c) => c.filter((_, i) => i !== idx));

  const handleSave = async () => {
    setError(null);
    setSaving(true);

    const res = await fetch(`/api/admin/registrations/${registration.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        parent_name: parentName,
        parent_email: parentEmail,
        parent_phone: parentPhone,
        payment_status: paymentStatus,
        children,
      }),
    });

    setSaving(false);

    if (!res.ok) {
      setError("Something went wrong saving these changes.");
      return;
    }

    onSaved();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white p-6 dark:bg-forge-surface">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-medium">Edit registration</h2>
          <button onClick={onClose} className="text-forge-black/50 hover:text-forge-black dark:text-white/50 dark:hover:text-white">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="mb-1 block text-xs font-semibold text-forge-black/70 dark:text-white/70">
              Parent name
            </label>
            <input
              value={parentName}
              onChange={(e) => setParentName(e.target.value)}
              className="w-full rounded-xl border border-black/15 px-3.5 py-2.5 text-sm outline-none focus:ring-2 focus:ring-forge-orange dark:border-white/15 dark:bg-forge-surface-alt"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-semibold text-forge-black/70 dark:text-white/70">
              Email
            </label>
            <input
              value={parentEmail}
              onChange={(e) => setParentEmail(e.target.value)}
              className="w-full rounded-xl border border-black/15 px-3.5 py-2.5 text-sm outline-none focus:ring-2 focus:ring-forge-orange dark:border-white/15 dark:bg-forge-surface-alt"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-semibold text-forge-black/70 dark:text-white/70">
              Phone
            </label>
            <input
              value={parentPhone}
              onChange={(e) => setParentPhone(e.target.value)}
              className="w-full rounded-xl border border-black/15 px-3.5 py-2.5 text-sm outline-none focus:ring-2 focus:ring-forge-orange dark:border-white/15 dark:bg-forge-surface-alt"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-semibold text-forge-black/70 dark:text-white/70">
              Payment status
            </label>
            <select
              value={paymentStatus}
              onChange={(e) => setPaymentStatus(e.target.value)}
              className="w-full rounded-xl border border-black/15 px-3.5 py-2.5 text-sm outline-none focus:ring-2 focus:ring-forge-orange dark:border-white/15 dark:bg-forge-surface-alt"
            >
              <option value="pending">pending</option>
              <option value="paid">paid</option>
              <option value="free">free</option>
            </select>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-forge-black/70 dark:text-white/70">
                Children
              </label>
              <button
                type="button"
                onClick={addChild}
                className="inline-flex items-center gap-1 text-xs font-semibold text-forge-orange-dark hover:text-forge-orange dark:text-forge-orange"
              >
                <Plus className="h-3.5 w-3.5" /> Add child
              </button>
            </div>
            {children.map((child, idx) => (
              <div key={idx} className="flex gap-2">
                <input
                  value={child.child_name}
                  onChange={(e) => updateChild(idx, "child_name", e.target.value)}
                  placeholder="Name"
                  className="flex-1 rounded-lg border border-black/15 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-forge-orange dark:border-white/15 dark:bg-forge-surface-alt"
                />
                <input
                  type="number"
                  value={child.child_age ?? ""}
                  onChange={(e) => updateChild(idx, "child_age", e.target.value)}
                  placeholder="Age"
                  className="w-20 rounded-lg border border-black/15 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-forge-orange dark:border-white/15 dark:bg-forge-surface-alt"
                />
                {children.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeChild(idx)}
                    className="rounded-lg border border-black/10 px-2 text-forge-black/60 hover:border-red-300 hover:text-red-600 dark:border-white/15"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                )}
              </div>
            ))}
          </div>

          {error && (
            <p className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">
              {error}
            </p>
          )}

          <div className="flex gap-3 pt-2">
            <button
              onClick={handleSave}
              disabled={saving}
              className="rounded-xl bg-forge-orange px-5 py-2.5 text-sm font-medium text-white hover:bg-forge-orange-dark disabled:opacity-60"
            >
              {saving ? "Saving..." : "Save changes"}
            </button>
            <button
              onClick={onClose}
              className="rounded-xl border border-black/15 px-5 py-2.5 text-sm font-medium hover:border-black/30 dark:border-white/15"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}