import {FC, useEffect} from 'react'
import {compose} from '@reduxjs/toolkit'
import {useDispatch, useSelector, RootStateOrAny} from 'react-redux'
import {Formik, FormikProps, Form} from 'formik'
import {Input, Button, Divider} from 'antd'
import {user} from '../../../store'
import {InputGroup} from '../../shared'
import {withCaptcha} from '../../hocs'
import schema from './schema'
import styles from './SignUpForm.module.scss'

interface IProps extends withCaptcha.Props {}

const {createUser} = user.action

let form: FormikProps<any> = null

const SignUpForm: FC<IProps> = function ({renderCaptcha, isCaptchaValid}) {
  const dispatch = useDispatch()
  const user = useSelector((state: RootStateOrAny) => state.user)

  useEffect(function () {
    form.setErrors(user.error)
  }, [
    user.error
  ])

  const handleSubmit = function () {
    const {captcha, username, email, password} = form.values

    if (isCaptchaValid(captcha)) {
      dispatch(createUser({username, email, password}))
    } else {
      form.setFieldValue(`captcha`, null)

      setTimeout(function () {
        form.setFieldError(`captcha`, `The value was incorrect`)
      }, 0)
    }
  }

  return (
    <div className={styles.Container}>
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
              />

              <InputGroup
                label="Email"
                name="email"
              />

              <InputGroup
                label="Password"
                name="password"
                control={Input.Password}
              />

              <InputGroup
                label="Confirm Password"
                name="confirmPassword"
                control={Input.Password}
              />

              <div className={styles.Captcha}>
                {renderCaptcha()}
              </div>

              <Divider />

              <div className="btn-group">
                <Button
                  className="btn-group__item"
                  type="primary"
                  size="large"
                  htmlType="submit"
                  loading={!user.isLoaded}
                >
                  Create account
                </Button>
              </div>
            </Form>
          )
        }}
      </Formik>
    </div>
  )
}

export default compose(withCaptcha.default)(SignUpForm)
