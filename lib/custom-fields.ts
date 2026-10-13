export interface CustomField {
  id: string; // unique key, e.g. "dietary_restriction"
  label: string; // shown to the parent, e.g. "Any dietary restrictions?"
  type: "text" | "textarea" | "select" | "checkbox";
  required: boolean;
  options?: string[]; // only used when type is "select"
}
export const DEFAULT_FEEDBACK_QUESTIONS: CustomField[] = [
  {
    id: "overall_rating",
    label: "How would you rate this event overall?",
    type: "select",
    required: true,
    options: ["1 (Poor)", "2", "3", "4", "5 (Excellent)"],
  },
  { id: "went_well", label: "What went well?", type: "textarea", required: false },
  { id: "could_improve", label: "What could be better?", type: "textarea", required: false },
];