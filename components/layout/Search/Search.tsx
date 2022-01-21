import {FC, useState, useEffect} from 'react'
import {useRouter} from 'next/router'
import {Input} from 'antd'
import {Route} from '../../../config'

type Value = string

const Search: FC = function () {
  const router = useRouter()
  const {isReady, query} = router
  const [value, setValue] = useState<Value>(``)

  useEffect(function () {
    if (isReady && query.q) {
      setValue(query.q as Value)
    }
  }, [
    isReady
  ])

  const handleSearch = function (value: Value): void {
    if (!value) {
      return
    }

    if (value !== query.q) {
      router.push(`${Route.Films}?q=${value}`)
    }
  }

  const handleChange = function ({target: {value}}): void {
    setValue(value)
  }

  return (
    <Input.Search
      placeholder="Search..."
      size="large"
      onSearch={handleSearch}
      onChange={handleChange}
      value={value}
      enterButton
    />
  )
}

export default Search
