import { useState } from "react";
import CheckoutForm from "../Forms/CheckoutForm";
import { StatusValue } from "../../../types/checkoutForm";

const Checkout = () => {
  const [status, setStatus] = useState<StatusValue>("idle");

  return (
    <>
      {(() => {
        switch (status) {
          case "success":
            return <div>SUCCESS</div>;
          case "error":
            return <div>ERROR</div>;
          case "idle":
            return (
              <CheckoutForm
                status={(status: StatusValue) => setStatus(status)}
              />
            );
        }
      })()}
    </>
  );
};

export default Checkout;
