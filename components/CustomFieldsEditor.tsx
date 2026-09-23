"use client";

import { Plus, Trash2 } from "lucide-react";
import type { CustomField } from "@/lib/custom-fields";

export default function CustomFieldsEditor({
  fields,
  onChange,
}: {
  fields: CustomField[];
  onChange: (fields: CustomField[]) => void;
}) {
  const addField = () => {
    onChange([
      ...fields,
      {
        id: `field_${Date.now()}`,
        label: "",
        type: "text",
        required: false,
        options: [],
      },
    ]);
  };

  const updateField = (idx: number, patch: Partial<CustomField>) => {
    onChange(fields.map((f, i) => (i === idx ? { ...f, ...patch } : f)));
  };

  const removeField = (idx: number) => {
    onChange(fields.filter((_, i) => i !== idx));
  };

  return (
    <div className="space-y-3 rounded-2xl border border-black/10 p-4 dark:border-white/10">
      <div className="flex items-center justify-between">
        <label className="text-xs font-semibold text-forge-black/70 dark:text-white/70">
          Custom registration fields (optional)
        </label>
        <button
          type="button"
          onClick={addField}
          className="inline-flex items-center gap-1 text-xs font-semibold text-forge-orange-dark hover:text-forge-orange dark:text-forge-orange"
        >
          <Plus className="h-3.5 w-3.5" /> Add field
        </button>
      </div>

      <p className="text-xs text-forge-black/50 dark:text-white/50">
        These appear on the registration form for this event, in addition to
        the standard parent and child details.
      </p>

      {fields.map((field, idx) => (
        <div key={field.id} className="space-y-2 rounded-xl border border-black/10 p-3 dark:border-white/10">
          <div className="flex gap-2">
            <input
              value={field.label}
              onChange={(e) => updateField(idx, { label: e.target.value })}
              placeholder="Field label, e.g. Dietary restrictions"
              className="flex-1 rounded-lg border border-black/15 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-forge-orange dark:border-white/15 dark:bg-forge-surface-alt"
            />
            <select
              value={field.type}
              onChange={(e) => updateField(idx, { type: e.target.value as CustomField["type"] })}
              className="rounded-lg border border-black/15 px-2 py-2 text-sm outline-none focus:ring-2 focus:ring-forge-orange dark:border-white/15 dark:bg-forge-surface-alt"
            >
              <option value="text">Short text</option>
              <option value="textarea">Long text</option>
              <option value="select">Dropdown</option>
              <option value="checkbox">Checkbox</option>
            </select>
            <button
              type="button"
              onClick={() => removeField(idx)}
              className="rounded-lg border border-black/10 px-2 text-forge-black/60 hover:border-red-300 hover:text-red-600 dark:border-white/15"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>

          {field.type === "select" && (
            <input
              value={(field.options || []).join(", ")}
              onChange={(e) =>
                updateField(idx, {
                  options: e.target.value.split(",").map((s) => s.trim()).filter(Boolean),
                })
              }
              placeholder="Options, comma-separated, e.g. Yes, No, Maybe"
              className="w-full rounded-lg border border-black/15 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-forge-orange dark:border-white/15 dark:bg-forge-surface-alt"
            />
          )}

          <label className="flex items-center gap-2 text-xs text-forge-black/70 dark:text-white/70">
            <input
              type="checkbox"
              checked={field.required}
              onChange={(e) => updateField(idx, { required: e.target.checked })}
            />
            Required
          </label>
        </div>
      ))}
    </div>
  );
}