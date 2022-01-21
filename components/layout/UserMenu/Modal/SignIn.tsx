import {FC, useState, useEffect, useCallback} from 'react'
import {useDispatch, useSelector, RootStateOrAny} from 'react-redux'
import {FormikProps} from 'formik'
import {Modal} from 'antd'
import {user} from '../../../../store'
import {SignInForm} from './SignInForm'
import {ResetPasswordForm} from './ResetPasswordForm'

interface IProps {
  isVisible: boolean
  onCancel: () => void
}

const {clearUserError} = user.action

const SignIn: FC<IProps> = function (props) {
  const dispatch = useDispatch()
  const user = useSelector((state: RootStateOrAny) => state.user)
  const [form, setForm] = useState<FormikProps<any>>(null)
  const [isVisible, setIsVisible] = useState<boolean>(false)
  const [isResetPasswordFormVisible, setIsResetPasswordFormVisible] = useState<boolean>(false)
  const title = isResetPasswordFormVisible ? 'Reset Password' : 'Log In'

  useEffect(function () {
    if (props.isVisible) {
      setIsVisible(true)
    }
  }, [
    props.isVisible
  ])

  useEffect(function () {
    if (user.data) {
      setIsVisible(false)
    }
  }, [
    user.data
  ])

  useEffect(function () {
    if (!isVisible && form) {
      props.onCancel()
      form.resetForm()
      dispatch(clearUserError())
    }
  }, [
    isVisible
  ])

  const handleCancel = useCallback(function () {
    setIsVisible(false)
    setIsResetPasswordFormVisible(false)
  }, [])

  const handlePasswordReset = useCallback(function () {
    setIsResetPasswordFormVisible(true)
  }, [])

  return (
    <>
      <Modal
        title={title}
        visible={isVisible}
        onCancel={handleCancel}
        footer={null}
      >
        {isResetPasswordFormVisible ? (
          <ResetPasswordForm
            onCancel={handleCancel}
          />
        ) : (
          <SignInForm
            onFormChange={setForm}
            onCancel={handleCancel}
            onPasswordReset={handlePasswordReset}
          />
        )}
      </Modal>
    </>
  )
}

export default SignIn
