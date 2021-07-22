import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
// import { useSelector } from 'react-redux'
import {
  Layout,
  Form,
  Input,
  Button,
  DatePicker,
  InputNumber,
  message
} from 'antd'
import { createBook, updateBook } from '../../modules/book'
const { Content } = Layout

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 5 }
  },
  wrapperCol: {
    xs: { span: 12 },
    sm: { span: 16 }
  }
}

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0
    },
    sm: {
      span: 16,
      offset: 12
    }
  }
}

const success = text => {
  message.success(text)
}

const BookForm = props => {
  // const state = useSelector((state) => state)
  // console.log(state, 'state');

  const [checkEdit, setCheckEdit] = useState(false)
  const [form] = Form.useForm()
  const onFinish = values => {
    if (checkEdit) {
      success('แก้ไขสำเร็จ')
      props.updateBook({id: form.getFieldValue('id'), ...values})
    } else {
      success('สร้างสำเร็จ')
      props.createBook(values)
    }
    form.resetFields()
  }

  useEffect(
    () => {
      const id = props.match.params.id
      const findBook = props.books.data.find(val => val.id == id)
      if (!findBook) {
        props.history.push('/book')
        return
      }
      form.setFieldsValue({
        id: findBook.id,
        name: findBook.name,
        author: findBook.author,
        had_read_date: findBook.had_read_date,
        period: findBook.period,
        image: findBook.image
      })
      setCheckEdit(true)
    },
    [props.match.params.id]
  )

  return (
    <Layout className="layout">
      <Content>
        <h1 className="header">{checkEdit && 'Edit '}Book Form</h1>
        <div className="container">
          <Form
            {...formItemLayout}
            form={form}
            name="register"
            onFinish={onFinish}
            scrollToFirstError>
            <Form.Item
              name="name"
              label="ชื่อหนังสือ"
              rules={[
                {
                  required: true,
                  message: 'โปรดกรอกชื่อหนังสือ!'
                }
              ]}>
              <Input />
            </Form.Item>

            <Form.Item
              name="author"
              label="ชื่อคนเขียน"
              rules={[
                {
                  required: true,
                  message: 'โปรดกรอกชื่อคนเขียน!'
                }
              ]}>
              <Input />
            </Form.Item>
            <Form.Item
              name="had_read_date"
              label="วันที่อ่านจบ"
              rules={[
                {
                  required: true,
                  message: 'โปรดกรอกวันที่อ่านจบ!'
                }
              ]}>
              <DatePicker />
            </Form.Item>
            <Form.Item
              name="period"
              label="ระยะเวลาที่ใช้ในการอ่าน"
              rules={[
                {
                  required: true,
                  message: 'โปรดกรอกระยะเวลาที่ใช้ในการอ่าน!'
                }
              ]}>
              <InputNumber min={1} max={1000} />
            </Form.Item>
            <Form.Item
              name="image"
              label="รูปปก (URL)"
              type="url"
              rules={[
                {
                  required: true,
                  message: 'โปรดกรอกรูปปก (URL)!'
                }
              ]}>
              <Input type="url" />
            </Form.Item>
            <Form.Item {...tailFormItemLayout}>
              <Button type="primary" htmlType="submit">
                ยืนยัน
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Content>
    </Layout>
  )
}

const mapStateToProps = state => {
  return {
    books: state.books
  }
}

const mapDispatchToProps = dispatch => {
  // console.log(dispatch({ type: ''}), "DISPA");
  return {
    createBook: data => dispatch(createBook(data)),
    updateBook: data => dispatch(updateBook(data))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BookForm)
