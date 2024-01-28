import toast from "react-hot-toast";
import { studentEndpoints } from "../apis";
import { apiconnector } from "../apiconnector";

import rzplogo from "../../assets/Logo/razorpay.jpeg";
import { resetCart } from "../../slices/cartSlice";
import { setPaymentLoading } from "../../slices/courseSlice";
// import { sendPaymentSuccessEmail, verifyPayment } from "../../../server/controllers/Payments";



const {COURSE_PAYMENT_API, COURSE_VERIFY_API,SEND_PAYMENT_SUCCESS_EMAIL_API}  = studentEndpoints;

function loadScript(src){
    return new Promise((resolve)=>{
        const script = document.createElement("script");
        script.src = src;
        script.onload = ()=>{
            resolve(true);
        }
        script.onerror = ()=>{
            resolve(false);
        }
        document.body.appendChild(script);
    })
}

export async function buyCourse(token,courses,userDetails,navigate,dispatch){
    const toastId = toast.loading("Loading.....");
    try {
        // const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");
        // if(!res){
        //     toast.error("razorpay sdk failed to load");
        //     return;
        // }

        const orderResponse = await apiconnector("POST",COURSE_PAYMENT_API,{courses},{Authorization: `Bearer ${token}`,});
        if(!orderResponse.data.success){
            console.log("Order response error ",orderResponse.data.message);
            throw new Error(orderResponse.data.message);
        }
        console.log("PRINTING OrderRESPONSE",orderResponse);

        const options={
            key: 'rzp_test_lMXcnSw5WYdtzR',
            currency: orderResponse.data.data.currency,
            amount: `${orderResponse.data.data.amount}`,
            order_id:orderResponse.data.data.id,
            name:"StudyNotion",
            description:"THanks for purchase",
            image:rzplogo,
            prefill:{
                name:`${userDetails.firstName}`,
                email:userDetails.email
            },
            handler: function(response){
                sendPaymentSuccessEmail(response,orderResponse.data.data.amount,token);
                verifyPayment({...response,courses},token,navigate,dispatch);
                // console.log(response);
            }
        }

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
        // paymentObject.on("payment.failed",function(response){
        //     toast.error("Oops, payment failed");
        //     console.log(response.error);
        // })


    } catch (error) {
        console.log("PAYMENT API ERROR......",error);
        toast.error("COULD NOT MAKE PAYMENT");
    }
    toast.dismiss(toastId);
}

async function sendPaymentSuccessEmail(response, amount, token) {
    try{
        await apiconnector("POST", SEND_PAYMENT_SUCCESS_EMAIL_API, {
            orderId: response.razorpay_order_id,
            paymentId: response.razorpay_payment_id,
            amount,
        },{
            Authorization: `Bearer ${token}`
        })
    }
    catch(error) {
        console.log("PAYMENT SUCCESS EMAIL ERROR....", error);
    }
}


async function verifyPayment(bodyData, token, navigate, dispatch) {
    const toastId = toast.loading("Verifying Payment....");
    dispatch(setPaymentLoading(true));
    try{
        const response  = await apiconnector("POST", COURSE_VERIFY_API, bodyData, { Authorization:`Bearer ${token}`,})

        if(!response.data.success) {
            throw new Error(response.data.message);
        }
        console.log("Printing Response VERIFY PAYMENT....",response);
        toast.success("payment Successful, ypou are addded to the course");
        navigate("/dashboard/enrolled-courses");
        dispatch(resetCart());
    }   
    catch(error) {
        console.log("PAYMENT VERIFY ERROR....", error);
        toast.error("Could not verify Payment");
    }
    toast.dismiss(toastId);
    dispatch(setPaymentLoading(false));
}