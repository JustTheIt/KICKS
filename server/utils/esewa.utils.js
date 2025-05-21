import crypto from 'crypto';

// Generate signature for eSewa payment
export const generateEsewaSignature = (secretKey, data) => {
    console.log('Generating signature with:', { secretKey, data });
    const hmac = crypto.createHmac('sha256', secretKey);
    hmac.update(data);
    const signature = hmac.digest('base64');
    console.log('Generated signature:', signature);
    return signature;
};

// Validate eSewa payment response
export const validateEsewaPayment = (data) => {
    try {
        console.log('Validating eSewa payment:', data);
        
        if (!data || !data.signed_field_names || !data.signature) {
            console.error('Missing required fields for validation');
            return false;
        }

        const fields = data.signed_field_names.split(',');
        const signatureData = fields
            .map(field => `${field}=${data[field]}`)
            .join(',');

        console.log('Signature data:', signatureData);

        const calculatedSignature = generateEsewaSignature(
            process.env.ESEWA_SECRET_KEY,
            signatureData
        );

        const isValid = calculatedSignature === data.signature;
        console.log('Signature validation result:', isValid);
        
        return isValid;
    } catch (error) {
        console.error('Error validating eSewa payment:', error);
        return false;
    }
};

// Generate eSewa payment form data
export const generateEsewaFormData = (orderData) => {
    console.log('Generating eSewa form data:', orderData);
    
    const {
        amount,
        tax_amount = "0",
        product_service_charge = "0",
        product_delivery_charge = "0",
        transaction_uuid,
        success_url,
        failure_url
    } = orderData;

    const total_amount = (
        Number(amount) +
        Number(tax_amount) +
        Number(product_service_charge) +
        Number(product_delivery_charge)
    ).toString();

    console.log('Calculated total amount:', total_amount);

    const signed_field_names = "total_amount,transaction_uuid,product_code";
    const signatureString = `total_amount=${total_amount},transaction_uuid=${transaction_uuid},product_code=${process.env.ESEWA_MERCHANT_CODE}`;
    
    console.log('Signature string:', signatureString);
    
    const signature = generateEsewaSignature(
        process.env.ESEWA_SECRET_KEY,
        signatureString
    );

    const formData = {
        amount,
        tax_amount,
        total_amount,
        transaction_uuid,
        product_code: process.env.ESEWA_MERCHANT_CODE,
        product_service_charge,
        product_delivery_charge,
        success_url,
        failure_url,
        signed_field_names,
        signature
    };

    console.log('Generated form data:', formData);
    return formData;
};