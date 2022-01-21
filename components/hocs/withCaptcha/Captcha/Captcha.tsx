import {FC} from 'react'
import {LoadCanvasTemplate} from 'react-simple-captcha'
import {InputGroup} from '../../../shared'
import styles from './Captcha.module.scss'

const Captcha: FC = function () {
  return (
    <div className={styles.Captcha}>
      <div className={styles.Captcha__Input}>
        <InputGroup
          name="captcha"
        />
      </div>

      <div className={styles.Captcha__Canvas}>
        <LoadCanvasTemplate />
      </div>
    </div>
  )
}

export default Captcha
