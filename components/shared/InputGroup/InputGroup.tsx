import {FC, ForwardRefExoticComponent, } from 'react'
import {Field, useFormikContext} from 'formik'
import {Input} from 'antd'
import cx from 'classnames'
import {FormGroup} from '../FormGroup'
import styles from './InputGroup.module.scss'

interface IProps {
  name: string
  label?: string
  control?: ForwardRefExoticComponent<any>
  prefix?: any
}

const InputGroup: FC<IProps> = function ({label, name, control, prefix}) {
  const {values, setValues} = useFormikContext()
  const InputField = control || Input

  const handleChange = function ({target: {name, value}}) {
    setValues({
      ...(values as object),
      [name]: value,
    })
  }

  return (
    <FormGroup
      label={label}
      name={name}
    >
      <Field name={name}>
        {({field, form: {errors, touched, submitCount}}) => (
          <InputField
            {...field}
            className={cx({
              [styles.InputField]: true,
              [styles.InputField_m_Invalid]: errors[name] && (touched[name] || !!submitCount),
            })}
            size="large"
            prefix={prefix}
            onChange={handleChange}
          />
        )}
      </Field>
    </FormGroup>
  )
}

export default InputGroup
