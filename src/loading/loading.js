// eslint-disable-next-line import/no-extraneous-dependencies
import { Flex, Spin } from 'antd';

const contentStyle = {
  padding: 50,
  background: 'rgba(0, 0, 0, 0.05)',
  borderRadius: 4,
};
const content = <div style={contentStyle} />;

export default function Loading() {
  return (
    <Flex gap="middle" vertical>
      <Flex gap="middle">
        <Spin tip="Loading" size="large">
          {content}
        </Spin>
      </Flex>
    </Flex>
  );
}
