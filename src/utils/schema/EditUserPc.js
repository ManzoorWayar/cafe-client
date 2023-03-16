import * as yup from "yup"

const EditUserPc = yup.object().shape({
    speed: yup
        .string()
        .when('isUsingWifi', (payload, schema) => {
            return payload[0] === true ?
                yup.object().shape({
                    label: yup.string().trim().required('لطفا سرعت وای فای را انتخاب کنید'),
                    value: yup.string().trim().required('لطفا سرعت وای فای را انتخاب کنید')
                })
                :
                schema.nullable()
        }),

    mobileSpeed: yup
        .string()
        .when('isUsingMobileWifi', (payload, schema) => {
            return payload[0] === true ?
                yup.object().shape({
                    label: yup.string().trim().required('لطفا سرعت وای فای مبایل را انتخاب کنید'),
                    value: yup.string().trim().required('لطفا سرعت وای فای را مبایل انتخاب کنید')
                })
                :
                schema.nullable()
        }),
});

export default EditUserPc;