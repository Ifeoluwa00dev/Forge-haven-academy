export interface CustomField {
  id: string; // unique key, e.g. "dietary_restriction"
  label: string; // shown to the parent, e.g. "Any dietary restrictions?"
  type: "text" | "textarea" | "select" | "checkbox";
  required: boolean;
  options?: string[]; // only used when type is "select"
}