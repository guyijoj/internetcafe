import React from "react";
import { useEffect, useState } from "react";
import styles from "./CheckoutForm.module.css";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { useModal } from "../Modal/useModal";

import { SubmitHandler, useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import { useCart } from "../../../context/CartContext";
import { FormFields, schema, StatusValue } from "../../../types/checkoutForm";
import { postOrder } from "../../../api/checkout";

type UserForm = {
  name: string;
  phone: string;
  email: string;
  comment: string;
};
const CheckoutForm = ({
  status,
}: {
  status: (status: StatusValue) => void;
}) => {
  const { total, utensils, items, restaurantId } = useCart();
  const { openModal } = useModal();
  const {
    register,
    handleSubmit,
    setError,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({ resolver: zodResolver(schema) });
  const restaurant = watch("address");
  const [payment, setPayment] = useState<string>("");
  const [userForm, setUserForm] = useState<UserForm>(() => {
    const form = localStorage.getItem("savedInfoUser");

    return form
      ? JSON.parse(form)
      : {
          name: "",
          phone: "",
          email: "",
          comment: "",
        };
  });
  const handleSavedInfo = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    const updatedform = { ...userForm, [name]: value };
    setUserForm(updatedform);
    localStorage.setItem("savedInfoUser", JSON.stringify(updatedform));
  };

  useEffect(() => {
    const city = localStorage.getItem("restaurant_city");
    if (city) {
      setValue("address", city);
    }
  }, [setValue]);

  const paymentHandler = (method: string) => {
    setValue("payment", method, {
      shouldValidate: true,
      shouldDirty: true,
    });
    setPayment(method);
  };

  const onSubmit: SubmitHandler<FormFields> = async (dataForm) => {
    if (!restaurantId) {
      console.error("Ресторан не выбран");
      return;
    }

    const orderInfo = {
      restaurantId: restaurantId,
      dataForm: dataForm,
      utensils: utensils,
      items: items,
    };

    postOrder(orderInfo)
      .then((data) => {
        if (data.success) {
          status("success");
          localStorage.removeItem("savedInfoUser");
          setTimeout(() => {
            window.location.reload();
          }, 3000);
        } else {
          status("error");
        }
      })
      .catch((e) => {
        console.error(e);
      });
  };
  return (
    <form className={styles.wrap} onSubmit={handleSubmit(onSubmit)}>
      <div
        className={`${styles.address} ${errors.address && styles.errorInput}`}
      >
        <p className={styles.title}>Адрес</p>
        <input {...register("address")} type="hidden" />
        <div className={styles.addressBody}>
          <button
            type="button"
            className={`${styles.input} ${styles.inputAddress} ${errors.address && styles.errorInput} `}
            onClick={() => {
              openModal("restaurants", {
                fromCheckout: true,
              });
            }}
          >
            {!restaurant ? (
              <>
                Выберите ресторан
                <MdOutlineKeyboardArrowDown />
              </>
            ) : (
              restaurant
            )}
          </button>
          {errors.address && (
            <div className={styles.errorMessage}>{errors.address.message}</div>
          )}
        </div>
      </div>
      <div className={styles.second}>
        <div
          className={`${styles.payment} ${errors.payment && styles.errorInput}`}
        >
          <p className={styles.title}>Оплата</p>
          <div className={styles.methods}>
            <select className={styles.hide} {...register("payment")}>
              <option value="">---</option>
              <option value="online">Онлайн</option>
              <option value="cash">На кассе</option>
            </select>
            <div
              onClick={() => paymentHandler("online")}
              className={`${styles.method} ${payment === "online" && styles.methodOn}`}
            >
              Онлайн
            </div>
            <div
              onClick={() => paymentHandler("cash")}
              className={`${styles.method} ${payment === "cash" && styles.methodOn}`}
            >
              На кассе
            </div>
          </div>
          {errors.payment && (
            <div className={`${styles.errorMessage}`}>
              {errors.payment.message}
            </div>
          )}
          <textarea
            {...register("comment")}
            rows={4}
            className={`${styles.input} ${styles.comment} `}
            placeholder="Комментарий к заказу"
            value={userForm.comment}
            onChange={(e) => handleSavedInfo(e)}
          />
        </div>
        <div className={styles.total}>
          <div>
            <p className={styles.sublabel}>Итог:</p>
            <p className={styles.sum}>{total}₽</p>
          </div>
          <button disabled={isSubmitting} type="submit" className={styles.btn}>
            {isSubmitting ? "Loading" : "Оформить"}
          </button>
        </div>
      </div>
      <div
        className={`${styles.who} ${(errors.name || errors.phone || errors.email) && styles.errorInput}`}
      >
        <p className={styles.title}>Кому?</p>
        <div className={`${styles.inputs}`}>
          <input
            {...register("name")}
            className={`${styles.input} ${errors.name && styles.errorInput}`}
            type="text"
            placeholder="Имя"
            value={userForm.name}
            onChange={(e) => handleSavedInfo(e)}
          />
          {errors.name && (
            <div className={styles.errorMessage}>{errors.name.message}</div>
          )}
          <input
            {...register("phone")}
            className={`${styles.input} ${errors.phone && styles.errorInput}`}
            type="text"
            placeholder="Номер телефон"
            value={userForm.phone}
            onChange={(e) => handleSavedInfo(e)}
          />
          {errors.phone && (
            <div className={styles.errorMessage}>{errors.phone.message}</div>
          )}

          <input
            {...register("email")}
            className={`${styles.input} ${errors.email && styles.errorInput}`}
            type="text"
            placeholder="Email"
            value={userForm.email}
            onChange={(e) => handleSavedInfo(e)}
          />
          {errors.email && (
            <div className={styles.errorMessage}>{errors.email.message}</div>
          )}
        </div>
      </div>
    </form>
  );
};

export default CheckoutForm;
