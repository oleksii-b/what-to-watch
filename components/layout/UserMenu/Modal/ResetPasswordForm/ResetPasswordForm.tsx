import {FC, useState, useEffect} from 'react'
import {useDispatch, useSelector, RootStateOrAny} from 'react-redux'
import {Formik, FormikProps, Form} from 'formik'
import {Result, Button, Divider} from 'antd'
import {user} from '../../. /../../../../store'
import {userService} from '../../. /../../../../services'
import {InputGroup} from '../../../../shared'
import styles from './ResetPasswordForm.module.scss'

const {setUserError} = user.action

interface IProps {
  onCancel: () => void
}

let form: FormikProps<any> = null

const ResetPasswordForm: FC<IProps> = function ({onCancel}) {
  const dispatch = useDispatch()
  const user = useSelector((state: RootStateOrAny) => state.user)
  const [isReseted, setIsReseted] = useState<boolean>(false)
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

  useEffect(function () {
    form.setErrors(user.error)
  }, [
    user.error
  ])

  const handleSubmit = async function () {
    setIsSubmitting(true)

    try {
      await userService.resetPassword(form.values.username)

      setIsReseted(true)
    } catch (err) {
      dispatch(setUserError(err))
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleCancel = function () {
    if (form) {
      form.setValues({})
    }

    setIsReseted(false)
    onCancel()
  }

  return (
    <>
      {isReseted ? (
        <div className={styles.Alert}>
          <Result
            status="success"
            title="The new password was sended on Your email!"
          />

          <Button
            type="primary"
            size="large"
            onClick={handleCancel}
          >
            OK
          </Button>
        </div>
      ) : (
        <Formik
          initialValues={{}}
          onSubmit={handleSubmit}
        >
          {(props: FormikProps<any>): JSX.Element => {
            form = props

            return (
              <Form>
                <InputGroup
                  label="Username"
                  name="username"
                />

                <Divider />

                <div className="btn-group">
                  <Button
                    className="btn-group__item"
                    type="ghost"
                    size="large"
                    onClick={handleCancel}
                  >
                    Cancel
                  </Button>

                  <Button
                    className="btn-group__item"
                    type="primary"
                    size="large"
                    htmlType="submit"
                    loading={isSubmitting}
                  >
                    Reset
                  </Button>
                </div>
              </Form>
            )
          }}
        </Formik>
      )}
    </>
  )
}

export default ResetPasswordForm
