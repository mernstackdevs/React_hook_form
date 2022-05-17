import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Service } from "../../ApiServices/Services";
import Loader from "../../Common/Loader";
import { GlobalContext } from "../../GlobalContext/Globalcontext";

const AddDriver = () => {

    const { register, formState: { errors }, handleSubmit ,reset} = useForm();
    const globalData = useContext(GlobalContext)
    const [pic, set_pic] = useState('')
    const [lic, set_lic] = useState('')

    const onSubmit = data => {
        console.log(data.profile_pic)
        console.log(data.lic_pic[0])
        const payload= new FormData()
            payload.append("name",data.firstName)
            payload.append("email",data.email)
            payload.append("password",data.password)
            payload.append("address",data.address)
            payload.append("phone_number",data.phoneNumber)
            payload.append("driver_license",data.licenseNumber)
            payload.append("role","Driver")
            payload.append("license_image",data.lic_pic[0])
            payload.append("profile_image",data.profile_pic[0])
       
        globalData.setLoader(true)
        Service.AddDriver(payload ,globalData.token).then(res=>{
            if(res.status===200){
                set_pic('')
                set_lic('')
                reset()
                globalData.setLoader(false)
                alert('Driver added successfully.')
            }
        }).catch(err=>{
            globalData.setLoader(false)
            console.log(err)
        })
    };


    useEffect(()=>{

    },[reset])


    return (
        <>
            {globalData.loader === true &&
                <Loader />
            }
            <h3 style={{ color: "#f8a033" }}>Add driver details</h3>
            <form className="main-form" onSubmit={handleSubmit(onSubmit)}>
                <div className="row">
                    <aside className="col-md-12 mb-4 pb-3">
                        <label className="text-center">
                            Upload Image
                            {errors.profile_pic && <p style={{ color: "red" }}>{errors.profile_pic.message}</p>}
                        </label>
                        <div className="upload_image">
                            <img src={pic} alt='' />
                            <input type="file"  {...register("profile_pic", { required: "Profile image is required.", onChange: (e) => set_pic(URL.createObjectURL(e.target.files[0])) })} />
                            <i className="fa fa-camera"></i>
                        </div>
                    </aside>
                    <aside className="col-md-6">
                        <label>
                            Name:
                            <input className="form-control" placeholder="Enter Name" {...register("firstName", { required: "First name is required", maxLength: { value: 15, message: 'it should be only 15 characters.' }, validate: val => val.trim() !== '' || 'It should not be empty.', setValueAs: v => v.trim() })} />
                            {errors.firstName && <p style={{ color: "red" }}> {errors.firstName.message}</p>}
                        </label>
                    </aside>
                    <aside className="col-md-6">
                        <label>
                            Address:
                            <input className="form-control" placeholder="Enter Address" {...register("address", { required: "Address is required", maxLength: { value: 30, message: 'it should be only 15 characters.' }, validate: val => val.trim() !== '' || 'It should not be empty.', setValueAs: v => v.trim() })} />
                            {errors.address && <p style={{ color: "red" }}>{errors.address.message}</p>}
                        </label>
                    </aside>
                    <aside className="col-md-6 mt-2">
                        <label>
                            Email:
                            <input className="form-control" placeholder="Enter driver email" {...register("email", { required: "email is required", pattern: { value: /^[a-zA-Z0-9._%+-]+@[a-z0-9]+\.[a-z]{2,10}(\.[a-z]{2,10})?(\.[a-z]{2,10})?(\.[a-z]{2,10})?(\.[a-z]{2,10})?$/, message: "Invalid email." }, setValueAs: v => v.toLowerCase() })} />
                            {errors.email && <p style={{ color: "red" }}>{errors.email.message}</p>}
                        </label>

                    </aside>
                    <aside className="col-md-6 mt-2">
                        <label>
                            Phone:
                            <input className="form-control" placeholder="Enter phone number" {...register("phoneNumber", { required: "Phone number is required", maxLength: { value: 10, message: 'Phone number should be 10 digits.' }, pattern: { value: /^[0-9]*$/, message: "Invalid" }, minLength: { value: 10, message: 'Phone number should be 10 digits.' } })} />
                            {errors.phoneNumber && <p style={{ color: "red" }}>{errors.phoneNumber.message}</p>}
                        </label>
                    </aside>
                    <aside className="col-md-6 mt-2">
                        <label>
                            Driving License:
                            <input className="form-control" placeholder="Enter license number" {...register("licenseNumber", { required: "License number is required", pattern: { value: /^[a-zA-Z0-9]*$/, message: "Invalid" } ,maxLength:{value:11 ,message:"Invalid license number."} ,minLength:{value:11 ,message:"Invalid license number."}})} />
                            {errors.licenseNumber && <p style={{ color: "red" }}>{errors.licenseNumber.message}</p>}
                        </label>
                    </aside>
                    <aside className="col-md-6 mt-2">
                        <label>
                            Password:
                            <input className="form-control" placeholder="Enter Password" type='password' {...register("password", { required: "Password is required", validate: val => val.trim() !== '' || 'It should not be empty.', setValueAs: v => v.trim() })} />
                            {errors.password && <p style={{ color: "red" }}>{errors.password.message}</p>}
                        </label>
                    </aside>
                    <aside className="col-md-12 mt-2">
                        <div className="row">
                            <aside className="col-md-4 mt-2">
                                <label className="">
                                    Driving License:
                                    {errors.lic_pic && <p style={{ color: "red" }}>{errors.lic_pic.message}</p>}
                                </label>
                                <div className="upload_image" style={{ margin: "unset" }}>
                                    <img src={lic} alt='' />
                                    <input type="file"  {...register("lic_pic", { required: "License image is required.", onChange: (e) => set_lic(URL.createObjectURL(e.target.files[0])) })} />
                                    <i className="fa fa-plus"></i>
                                </div>
                            </aside>
                        
                        </div>
                    </aside>

                    <aside className="col-md-12 mt-4">
                        <input type="submit" className="btn btn-color px-5 mt-4" />
                    </aside>
                </div>
            </form>
        </>
    );
}
export default AddDriver;