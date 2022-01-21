import {FC, memo} from 'react'
import {compose} from '@reduxjs/toolkit'
import {useFormikContext} from 'formik'
import {getData} from 'country-list'
import Flags from 'country-flag-icons/react/3x2'
import {Select} from 'antd'
import {FormGroup} from '../../../shared'
import styles from './CountrySelect.module.scss'

interface IProps {
  name: string
  value?: string
}

const {Option} = Select
const countries = getData().flat()

const filterOption = (input, option) =>
  new RegExp(`^${input.toLowerCase()}`).test(option[`data-name`]?.toLowerCase())

const CountrySelect: FC<IProps> = function ({name, value}) {
  const {setFieldValue} = useFormikContext()

  const handleChange = function (value) {
    setFieldValue(name, value)
  }

  return (
    <FormGroup
      name="country"
      label="Country"
    >
      <Select
        size="large"
        value={value || ``}
        style={{width: `100%`}}
        onChange={handleChange}
        filterOption={filterOption}
        showSearch
      >
        <Option value="">
          <i className={styles.DefaultOption}>Select your country...</i>
        </Option>

        {countries.map(({code, name}): JSX.Element => {
          const Flag = Flags[code]

          return (
            <Option
              key={code}
              value={code}
              data-name={name}
            >
              <Flag className={styles.FlagIcon} /> {name}
            </Option>
          )
        })}
      </Select>
    </FormGroup>
  )
}

export default compose(memo)(CountrySelect)
