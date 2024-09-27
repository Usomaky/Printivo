import api from "./api";
const environment = process.env.NODE_ENV;

const handlePaystack = ({ channels, customer, transaction }, callback) =>
  new Promise((resolve) => {
    const options = {
      ref: transaction.id,
      key:
        environment === "development"
          ? process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY
          : process.env.NEXT_PUBLIC_PAYSTACK_LIVE_KEY,
      email: customer.email,
      amount: Math.trunc(transaction.amount * 100),
      firstname: customer.first_name,
      lastname: customer.last_name,
      onClose: () => {
        callback();
      },
      callback: async () => {
        try {
          await api
            .put(`transactions/${transaction.id}.json`)
            .then((response) => {
              resolve(response.data);
            });
          window.location.href = `/checkout/success/${transaction.id}`;
        } catch (error) {
          console.log(error);
          // window.location.href = "/checkout/result/failure";
        }
      },
    };

    if (channels) {
      options.channels = channels;
    }

    PaystackPop.setup(options).openIframe();
  });

export const handleTransaction = (order, values, callback) => {
  let promise = null;
  const paystackBankOnly =
    values.payment_option === "bank-transfer" && values.bank !== "missing";
  const method = paystackBankOnly ? "paystack" : values.payment_option;
  const channels = paystackBankOnly ? ["bank"] : null;

  // paystack block
  promise = api
    .post("transactions.json", {
      payment_option: method,
      order_id: order.id,
    })
    .then((response) => response.data);

  if (method === "paystack") {
    promise = promise.then((transaction) =>
      handlePaystack(
        {
          channels,
          customer: order.customer
            ? order.customer
            : {
                email: order.email_address,
                first_name: order.address.name.split(" ")[0],
                last_name: order.address.name.split(" ")[0],
              },
          transaction,
        },
        callback
      )
    );
  }

  return promise.then((transaction) => {
    if (!transaction) {
      return null;
    }

    if (transaction.payment_option === "bank-transfer") {
      callback(transaction);
    }

    const status = transaction.approved ? "paid" : "checked-out";
  });

  // end of paystack block
};
