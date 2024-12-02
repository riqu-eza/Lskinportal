// Backend: Payment Controller
import PesaPalPlugin from "pesapaldan";

export const processPayment = async (req, res, next) => {
  const { orderId, formData } = req.body;

  try {
    // Initialize the PesaPal plugin
    const plugin = new PesaPalPlugin({
      consumerKey: process.env.CONSUMER_KEY,
      consumerSecret: process.env.CONSUMER_SECRET,
      ipnUrl: process.env.IPN_URL,
    });

    await plugin.initialize();
    await plugin.registerIPN();

    // Submit the order to PesaPal
    const { trackingId, redirectUrl } = await plugin.submitOrder({
      id: orderId,
      currency: "KES",
      amount: formData.totalPrice,
      description: "Order payment",
      callback_url: process.env.CALLBACK_URL,
      billing_address: {
        email_address: formData.email,
        phone_number: formData.phoneNumber,
        county_code: "254",
        first_name: formData.firstName,
        middle_name: formData.middleName,
        last_name: formData.lastName,
        line_1: formData.address,
        line_2: formData.address,
        postal_code: formData.postalcode,
        zip_code: formData.postalcode,
      },
    });

    // Return both tracking ID and redirect URL to the client
    return res.status(200).json({
      success: true,
      trackingId,
      redirectUrl,
    });
  } catch (error) {
    console.error("Payment Error:", error);
    return res.status(500).json({
      success: false,
      message: "Payment error",
      error: error.message,
    });
  }
};
 export const call = async (req, res) =>{
const callback = req.body;
console.log("callback", callback)
 }