import {FC, ReactNode} from 'react'
import {useFormikContext} from 'formik'
import {ExclamationCircleOutlined} from '@ant-design/icons'
import cx from 'classnames'
import styles from './FormGroup.module.scss'

interface IProps {
  name: string
  label?: string
  children?: ReactNode
}

const FormGroup: FC<IProps> = function ({label, name, children}) {
  const {errors, touched, submitCount, ...rest} = useFormikContext()
  const isErrorVisisble = errors[name] && (touched[name] || !!submitCount)

  return (
    <div className={cx([styles.FormGroup, 'form-group row align-items-center'])}>
      {label && <label>{label}</label>}

      <div>
        {children}
      </div>

      {isErrorVisisble && (
        <div className={styles.ErrorMessage}>
          <ExclamationCircleOutlined className={styles.ErrorMessage__Icon} />

          <small className={styles.ErrorMessage__Text}>{errors[name]}</small>
        </div>
      )}
    </div>
  )
}

export default FormGroup
