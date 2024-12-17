export const ipnreat = async (req, res, next)=>{
    console.log("we got you")
    const merchantReference = req.query.pesapal_merchant_reference;
    const transactionTrackingId = req.query.pesapal_transaction_tracking_id;

    if (merchantReference && transactionTrackingId) {
        // Here, you can store transaction details in your database
        // Example: await insertTransaction(merchantReference, transactionTrackingId);

        // Optionally, query Pesapal for the payment status if needed
        // Example: const status = await queryPaymentStatus(transactionTrackingId);

        // Redirect user to a success page
        res.redirect('/success'); // Replace with your success page URL
    } else {
        // Redirect user to a failure page if parameters are missing
        res.redirect('/failure'); // Replace with your failure page URL
    }
}

