import * as yup from "yup";
import { useFormik } from "formik";
import { Button, Label, /*TextArea,*/ Attach } from "../common";
import type { FC } from "react";
import type { Values } from "./types";

type Props = {
  onSubmit: (values: Values) => void;
  onCancel: () => void;
};

const validationSchema = yup.object().shape({
  comment: yup.string(),
});

const initialValues = {
  comment: "",
  files: [],
};

const AddComment: FC<Props> = ({ onSubmit, onCancel }) => {
  const {
    handleSubmit,
    isSubmitting,
    setFieldValue,
    // getFieldProps,
  } = useFormik<Values>({ validationSchema, initialValues, onSubmit });

  return (
    <form onSubmit={handleSubmit}>
      <Label htmlFor="comment" label="New comment">
        {/* <TextArea
          minWidth="auto"
          placeholder="Enter comment"
          {...getFieldProps("comment")}
        /> */}
      </Label>

      <Label label="Attachments">
        <Attach
          onFiles={(files) => {
            setFieldValue("files", files);
          }}
        />
      </Label>

      <div className="flex justify-between">
        <Button
          type="submit"
          text="Save"
          disabled={isSubmitting}
          loading={isSubmitting}
        />
        <Button
          text="Cancel"
          intent="minimal"
          onClick={onCancel}
        />
      </div>
    </form>
  );
};

export { AddComment };
