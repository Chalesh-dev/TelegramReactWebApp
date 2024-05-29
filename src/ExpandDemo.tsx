import { Button, Form, Typography } from 'antd';
import {useExpand, WebAppProvider} from '@vkruglikov/react-telegram-web-app';
import { useInitData } from "@vkruglikov/react-telegram-web-app";

const ExpandDemo = () => {
  const [isExpanded, expand] = useExpand();

  const [initDataUnsafe] = useInitData();
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
          <Typography.Text>{initDataUnsafe?.user?.id} isExpanded: {`${isExpanded}`}</Typography.Text>
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
