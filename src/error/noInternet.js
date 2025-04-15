// eslint-disable-next-line import/no-extraneous-dependencies
import { Alert } from 'antd';

function NoInternet() {
  return (
    <>
      <Alert message="Error" description="Нет интернета" type="error" showIcon />
      <br />
    </>
  );
}
export default NoInternet;
