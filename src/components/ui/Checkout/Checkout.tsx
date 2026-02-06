import React, { useEffect, useState } from "react";
import styles from "./Checkout.module.css";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { useModal } from "../Modal/useModal";

import { SubmitHandler, useForm } from "react-hook-form";
import { email, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  name: z.string().min(1, "Напишите ваше имя!"),
  phone: z
    .string()
    .regex(
      /^(\+7|7|8)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/,
      {
        message: "Неверный формат номера телефона!",
      },
    )
    .transform((val) => {
      const cleaned = val.replace(/\D/g, "");
      if (cleaned.length === 10) {
        return `+7${cleaned}`;
      }
      if (cleaned.length === 11 && cleaned.startsWith("7")) {
        return `+${cleaned}`;
      }
      if (cleaned.length === 11 && cleaned.startsWith("8")) {
        return `+7${cleaned.substring(1)}`;
      }

      return val;
    }),
  email: z.email("Неправильный формат email!"),
  address: z.string().min(1, "Выберите адрес!"),
  payment: z.string().min(1, "Выберите способ оплаты!"),
  comment: z.string().max(200),
});

type FormFields = z.infer<typeof schema>;

const Checkout = ({ total }: { total: number }) => {
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

  useEffect(() => {
    const city = localStorage.getItem("restaurant_city");
    if (city) {
      setValue("address", city);
    }
  }, [setValue]);

  const paymentHandler = (method: string) => {
    setValue("payment", method);
    setPayment(method);
  };

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log(data);
    } catch (e) {
      setError("email", {
        message: "email is already taken",
      });
    }
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
          />
          {errors.name && (
            <div className={styles.errorMessage}>{errors.name.message}</div>
          )}
          <input
            {...register("phone")}
            className={`${styles.input} ${errors.phone && styles.errorInput}`}
            type="text"
            placeholder="Номер телефон"
          />
          {errors.phone && (
            <div className={styles.errorMessage}>{errors.phone.message}</div>
          )}

          <input
            {...register("email")}
            className={`${styles.input} ${errors.email && styles.errorInput}`}
            type="text"
            placeholder="Email"
          />
          {errors.email && (
            <div className={styles.errorMessage}>{errors.email.message}</div>
          )}
        </div>
      </div>
    </form>
  );
};

export default Checkout;
