import * as yup from "yup"

const SpendMoneySchema = yup.object().shape({
    spendMoney: yup
        .string()
        .trim()
        .required('لطفا قیمت را وارد کنید'),

    SpendMoneyDesc: yup
        .string()
        .trim()
        .required('لطفا توضیحات را اضافه کنید')
        .test('len', 'تعداد حروف نباید بیشتر از255 حروف باشد', val => val.length <= 250),
});

export default SpendMoneySchema;