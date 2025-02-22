import { Label, Button } from "../common";
import type { FC } from "react";
import type { FormProps } from "./types";

const CardForm: FC<FormProps> = ({ onCancel }) => {
  return (
    <form>
      <Label htmlFor="title" label="Title" required />

      <Label label="Workspace" htmlFor="workspace" />

      <Label label="Board" htmlFor="board" />

      <Label label="List" htmlFor="list" />

      <Label htmlFor="description" label="Description" />

      <Label label="Due date" htmlFor="due_date" />

      <Label htmlFor="labels" label="Labels" />


      <Label label="Members" />
      <div className="flex justify-between">
        <Button
          type="submit"
          text="Create"
          // disabled={isSubmitting}
          // loading={isSubmitting}
        />
        <Button
          text="Cancel"
          intent="secondary"
          onClick={onCancel}
        />
      </div>
    </form>
  );
};

export { CardForm };
