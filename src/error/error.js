// eslint-disable-next-line import/no-extraneous-dependencies
import { Alert } from 'antd';

function Err() {
  return (
    <>
      <Alert
        message="Error"
        description="Ошибка в загрузке даных с сервера"
        type="error"
        showIcon
      />
      <br />
    </>
  );
}
export default Err;
