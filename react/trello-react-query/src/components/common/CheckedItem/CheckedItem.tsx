import { useState } from "react";
import { Card } from "../Card";
import { Spinner } from "../Spinner";
import { Span } from "../Typography";
import type { FC } from "react";

type CheckedItemProps = {
  id: string;
  label: string;
  checked: boolean;
  onChange: () => Promise<void>;
};

const CheckedItem: FC<CheckedItemProps> = ({ id, label, checked, onChange }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = () => {
    setIsLoading(true);

    onChange().finally(() => setIsLoading(false))
  };

  return (
    <Card className="gap-1">
      <Card.Media className="flex">
        {isLoading
          ? <Spinner size="2xs"/>
          : <input type="checkbox" id={id} key={id} checked={checked} onChange={handleChange}/>
        }
      </Card.Media>
      <Card.Body>
        <Span>{label}</Span>
      </Card.Body>
    </Card>
  );
};

export { CheckedItem };
