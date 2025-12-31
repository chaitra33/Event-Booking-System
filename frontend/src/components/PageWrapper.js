import { useEffect, useState } from "react";

export default function PageWrapper({ children }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(true);
  }, []);

  return (
    <div className={`page ${show ? "page-enter" : ""}`}>
      {children}
    </div>
  );
}
