import { FC } from "react";

interface JsonLdProps {
  data: object;
}

const JsonLdWrapper: FC<JsonLdProps> = ({ data }) => {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
};

export default JsonLdWrapper;
