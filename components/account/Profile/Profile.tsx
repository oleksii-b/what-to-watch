import {FC, useEffect, useState} from 'react'
import {useDispatch, useSelector, RootStateOrAny} from 'react-redux'
import {Formik, FormikProps, Form} from 'formik'
import {Modal, Result, Input, Button, Divider} from 'antd'
import {user} from '../../../store'
import {InputGroup} from '../../shared'
import {userService} from '../../../services'
import {CountrySelect} from './CountrySelect'
import schema from './schema'
import styles from './Profile.module.scss'

const {setUser, setUserError} = user.action

let form: FormikProps<any> = null

const Profile: FC = function () {
  const dispatch = useDispatch()
  const user = useSelector((state: RootStateOrAny) => state.user)
  const [isLoading, setIsLoading] = useState(false)
  const [isAlertVisible, setIsAlertVisible] = useState(false)

  useEffect(function () {
    if (!user.data) {
      return
    }

    const {data} = user

    if (data.profile) {
      let profile = {}

      for (let key in data.profile) {
        if (data.profile[key]) {
          profile[key] = data.profile[key]
        }
      }

      form.setValues({...data, ...profile})
    } else {
      form.setValues({...data})
    }
  }, [
    user.data
  ])

  useEffect(function () {
    form.setErrors(user.error)
  }, [
    user.error
  ])

  const handleSubmit = async function () {
    const {
      username,
      email,
      currentPassword,
      newPassword,
      country,
      additional
    } = form.values

    const profile = {
      additional,
      country,
    }

    setIsLoading(true)

    try {
      await userService.update({
        username,
        email,
        profile,
        currentPassword,
        newPassword: newPassword || currentPassword,
      })

      form.resetForm()
      setIsAlertVisible(true)

      dispatch(
        setUser({
          ...user.data,
          username,
          email,
          profile,
        })
      )
    } catch (err) {
      dispatch(setUserError(err))
    } finally {
      setIsLoading(false)
    }
  }

  const handleAlertClose = function () {
    setIsAlertVisible(false)
  }

  return (
    <div className={styles.Container}>
      {isAlertVisible && (
        <Modal
          className={styles.Alert}
          visible={isAlertVisible}
          onCancel={handleAlertClose}
          footer={null}
        >
          <Result
            status="success"
            title="The user was updated successfuly!"
          />

          <Button
            type="primary"
            size="large"
            onClick={handleAlertClose}
          >
            OK
          </Button>
        </Modal>
      )}

      <Formik
        initialValues={{}}
        validationSchema={schema}
        onSubmit={handleSubmit}
        isValidating
      >
        {(props: FormikProps<any>): JSX.Element => {
          const {values} = props

          form = props

          return (
            <Form>
              <input
                type="hidden"
                name="username"
              />

              <InputGroup
                label="Email"
                name="email"
              />

              <InputGroup
                label="Current password"
                name="currentPassword"
                control={Input.Password}
              />

              <InputGroup
                label="New password"
                name="newPassword"
                control={Input.Password}
              />

              <CountrySelect
                name="country"
                value={values.country}
              />

              <InputGroup
                label="Additional"
                name="additional"
                control={Input.TextArea}
              />

              <Divider />

              <div className="btn-group">
                <Button
                  className="btn-group__item"
                  type="primary"
                  size="large"
                  htmlType="submit"
                  loading={isLoading}
                >
                  Update account
                </Button>
              </div>
            </Form>
          )
        }}
      </Formik>
    </div>
  )
}

export default Profile
