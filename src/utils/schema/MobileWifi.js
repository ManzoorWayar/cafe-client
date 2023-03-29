import * as yup from "yup"

const MobileWifi = yup.object().shape({
    mobileSpeed: yup.object().shape({
        label: yup.string().trim().required('لطفا سرعت وای فای مبایل را انتخاب کنید'),
        value: yup.string().trim().required('لطفا سرعت وای فای را مبایل انتخاب کنید')
    })
});

export default MobileWifi;