import { useTranslation } from "react-i18next"

const Translate = ({ validations, name, value }) => {
  const { t } = useTranslation()

  if (value)
    return t(validations, { key: { name: t(name), value: t(value) } })

  else
    return t(validations, { key: t(name) })

}

export default Translate