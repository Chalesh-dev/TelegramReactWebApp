import { Button, Form, Typography } from 'antd';
import { useExpand,useWebApp } from '@vkruglikov/react-telegram-web-app';

const ExpandDemo = () => {
  const [isExpanded, expand] = useExpand();
  const idd = useWebApp().initData.user.id;
  return (
    <>
      <Typography.Title level={3}>useExpand</Typography.Title>
      <Form
        labelCol={{ span: 6 }}
        name="ExpandDemo"
        layout="horizontal"
        autoComplete="off"
      >
        <Form.Item name="isExpanded">
          <Typography.Text>{idd} isExpanded: {`${isExpanded}`}</Typography.Text>
        </Form.Item>
        <Form.Item>
          <Button block type="primary" onClick={expand}>
            {`isExpanded: ${isExpanded}, call expand()`}
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default ExpandDemo;
