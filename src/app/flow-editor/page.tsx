import { FlowCanvas } from "@/components/flow/FlowCanvas";

export const metadata = {
  title: "Flow Editor — Flow Studio",
};

export default function FlowEditorPage() {
  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <FlowCanvas />
    </div>
  );
}
