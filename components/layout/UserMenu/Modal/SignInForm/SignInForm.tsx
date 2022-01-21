import {FC, useEffect, memo} from 'react'
import {compose} from 'redux'
import {useDispatch, useSelector, RootStateOrAny} from 'react-redux'
import {Formik, FormikProps, Form} from 'formik'
import {Input, Button, Divider} from 'antd'
import {UserOutlined, LockOutlined} from '@ant-design/icons'
import {user} from '../../../../../store'
import {InputGroup} from '../../../../shared'
import schema from './schema'
import styles from './SignInForm.module.scss'

interface IProps {
  onFormChange: (form: FormikProps<any>) => void
  onCancel: () => void
  onPasswordReset: () => void
}

const {signIn, clearUserError} = user.action

let form: FormikProps<any> = null

const SignInForm: FC<IProps> = function (props) {
  const {onFormChange, onPasswordReset, onCancel} = props
  const user = useSelector((state: RootStateOrAny) => state.user)
  const dispatch = useDispatch()

  useEffect(function () {
    onFormChange(form)
  }, [])

  useEffect(function () {
    form.setErrors(user.error)
  }, [
    user.error
  ])

  const handleSubmit = function () {
    const {username, password} = form.values

    dispatch(clearUserError())
    dispatch(signIn({username, password}))
  }

  return (
    <Formik
      initialValues={{}}
      validationSchema={schema}
      onSubmit={handleSubmit}
    >
      {(props: FormikProps<any>): JSX.Element => {
        form = props

        return (
          <Form>
            <InputGroup
              label="Login"
              name="username"
              prefix={<UserOutlined className={styles.InputIcon} />}
            />

            <InputGroup
              label="Password"
              name="password"
              control={Input.Password}
              prefix={<LockOutlined className={styles.InputIcon} />}
            />

            <Button
              type="link"
              onClick={onPasswordReset}
            >
              Forgot password
            </Button>

            <Divider />

            <div className="btn-group">
              <Button
                className="btn-group__item"
                type="ghost"
                size="large"
                onClick={onCancel}
              >
                Cancel
              </Button>

              <Button
                className="btn-group__item"
                type="primary"
                size="large"
                htmlType="submit"
                loading={!user.isLoaded}
              >
                Sign In
              </Button>
            </div>
          </Form>
        )
      }}
    </Formik>
  )
}

export default compose(memo)(SignInForm)
