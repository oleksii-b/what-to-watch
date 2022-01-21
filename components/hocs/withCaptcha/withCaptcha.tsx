import {FC, ComponentProps, useEffect} from 'react'
import {loadCaptchaEnginge, validateCaptcha} from 'react-simple-captcha'
import {Captcha} from './Captcha'

interface IProps {
  isCaptchaValid: (string) => boolean
  renderCaptcha: () => JSX.Element
}

const withCaptcha = function (Component): typeof Component {
  const renderCaptcha = () => <Captcha />

  const WithCaptcha: FC<ComponentProps<typeof Component>> = function (props) {
    useEffect(function () {
      loadCaptchaEnginge(6)
    }, [])

    const isCaptchaValid = function (value: string): boolean {
      return validateCaptcha(value)
    }

    return (
      <Component
        {...props}
        isCaptchaValid={isCaptchaValid}
        renderCaptcha={renderCaptcha}
      />
    )
  }

  WithCaptcha.displayName =
    `WithPageNumber(${Component.displayName || Component.name || `Component`})`

  return WithCaptcha
}

export default withCaptcha
export type Props = IProps
