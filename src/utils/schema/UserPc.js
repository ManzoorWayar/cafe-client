import * as yup from "yup"

const UserPc = yup.object().shape({
    code: yup
        .string()
        .trim()
        .required('لطفا صفحه کد را وارد کنید'),

    pc: yup.object().shape({
        value: yup.string().trim().required('لطفا نام کامپیوتر را انتخاب کنید'),
        label: yup.string().trim().required('لطفا نام کامپیوتر را انتخاب کنید'),
    }),

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

export default UserPc;