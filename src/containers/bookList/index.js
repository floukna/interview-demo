import React from 'react'
import { message, Button, Layout, List, Avatar, Space } from 'antd'
import { connect } from 'react-redux'
import { MessageOutlined, LikeOutlined, StarOutlined } from '@ant-design/icons'
import dayjs from 'dayjs'
import { deleteBook } from '../../modules/book'
const { Content } = Layout

const success = () => {
  message.success('ลบสำเร็จ')
}

const IconText = ({ icon, text }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
)

const BookList = props => {
  const books = props.books.data
  return (
    <Layout className="layout">
      <Content>
        <h1 className="header">Book List</h1>
        <div className="container">
          <List
            itemLayout="vertical"
            size="large"
            pagination={{
              onChange: page => {
                console.log(page)
              },
              pageSize: 3
            }}
            dataSource={books}
            renderItem={item => (
              <List.Item
                key={item.id}
                actions={[
                  <IconText
                    icon={StarOutlined}
                    text="156"
                    key="list-vertical-star-o"
                  />,
                  <IconText
                    icon={LikeOutlined}
                    text="156"
                    key="list-vertical-like-o"
                  />,
                  <IconText
                    icon={MessageOutlined}
                    text="2"
                    key="list-vertical-message"
                  />
                ]}
                extra={
                  <img
                    style={{
                      height: '200px',
                      width: 'auto',
                      objectFit: 'contain'
                    }}
                    alt="logo"
                    src={item.image}
                  />
                }>
                <List.Item.Meta
                  avatar={<Avatar src={item.avatar} />}
                  title={<span>ชื่อหนังสือ : {item.name}</span>}
                  description={<span>ชื่อคนเขียน : {item.author}</span>}
                />
                <div>
                  <div>ระยะเวลาที่ใช้ในการอ่าน: {item.period}</div>
                  <div>
                    วันที่อ่านจบ:{' '}
                    {dayjs(item.had_read_date).format('DD-MM-YYYY')}
                  </div>
                  <div>
                    <Button onClick={() => props.history.push(`/book/${item.id}`)} type="primary">แก้ไข</Button>{' '}
                    <Button onClick={() => {
                        props.deleteBook(item.id)
                        success()
                    }} type="primary" danger>
                      ลบ
                    </Button>
                  </div>
                </div>
              </List.Item>
            )}
          />
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
    deleteBook: (id) => dispatch(deleteBook(id))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BookList)
