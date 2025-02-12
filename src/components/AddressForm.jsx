import { useForm } from "react-hook-form";
import Button from "./elements/Button";
import { ReactComponent as ArrowRightSvg } from "../assets/icons/arrow-right-long-svgrepo-com.svg";
import { useDispatch } from "react-redux";
import { setAddress } from "../stores/userInfo/addressSlice";
import { useState } from "react";

export const AddressForm = ({ onTabSwitch }) => {
    const { register, handleSubmit, formState: { errors }} = useForm();
    const dispatch = useDispatch();
    const [leaveAtDoor, setLeaveAtDoor] = useState(false);

    const onSubmit = (data) => {
        dispatch(setAddress({ ...data, leaveAtDoor }));
        onTabSwitch("Payment");
    };

    return (
        <div className="w-full max-w-lg mx-auto bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-2xl font-semibold text-gray-800 text-center mb-6">Delivery Information</h3>

            <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                {/*Имя*/}
                <div>
                    <label className="block text-sm font-semibold text-gray-700">Recipient's Name</label>
                    <input 
                        {...register("recipientName", { required: true })}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none"
                        type="text"
                        placeholder="Full Name"
                    />
                    {errors.recipientName && <span className="text-red-500 text-xs">This field is required</span>}
                </div>

                {/*Телефон*/}
                <div>
                    <label className="block text-sm font-semibold text-gray-700">Phone Number</label>
                    <input 
                        {...register("phone", { required: true })}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none"
                        type="tel"
                        placeholder="Your phone number"
                    />
                    {errors.phone && <span className="text-red-500 text-xs">This field is required</span>}
                </div>

                {/*Адрес*/}
                <div>
                    <label className="block text-sm font-semibold text-gray-700">Street Address</label>
                    <input 
                        {...register("address", { required: true })}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none"
                        type="text"
                        placeholder="Street Address"
                    />
                    {errors.address && <span className="text-red-500 text-xs">This field is required</span>}
                </div>

                {/*Квартира/Дом*/}
                <div>
                    <label className="block text-sm font-semibold text-gray-700">Apartment / House</label>
                    <input 
                        {...register("apartment")}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none"
                        type="text"
                        placeholder="Apartment / House (Optional)"
                    />
                </div>

                {/*Город*/}
                <div>
                    <label className="block text-sm font-semibold text-gray-700">City</label>
                    <input 
                        {...register("city", { required: true })}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none"
                        type="text"
                        placeholder="City"
                    />
                    {errors.city && <span className="text-red-500 text-xs">This field is required</span>}
                </div>

                {/*Оставить у двери*/}
                <div className="flex items-center space-x-2">
                    <input 
                        type="checkbox" 
                        id="leaveAtDoor" 
                        checked={leaveAtDoor} 
                        onChange={() => setLeaveAtDoor(!leaveAtDoor)} 
                        className="w-5 h-5 text-yellow-500 focus:ring-yellow-500 border-gray-300 rounded"
                    />
                    <label htmlFor="leaveAtDoor" className="text-sm text-gray-700">Leave at the door?</label>
                </div>

                <div className="flex justify-end">
                    <Button variant="dark" className="flex items-center" type="submit">
                        <span className="mr-1">Next</span>
                        <ArrowRightSvg />
                    </Button>
                </div>
            </form>
        </div>
    );
};
