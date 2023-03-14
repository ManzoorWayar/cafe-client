import * as yup from "yup"

const AccessorySchema = yup.object().shape({
    accessory: yup
        .string()
        .trim()
        .required('لطفا قیمت را وارد کنید'),

    message: yup
        .string()
        .trim()
        .required('لطفا توضیحات را اضافه کنید')
        .test('len', 'تعداد حروف نباید بیشتر از255 حروف باشد', val => val.length <= 250),
});

export default AccessorySchema;