// eslint-disable-next-line import/no-extraneous-dependencies
import { Alert } from 'antd';

function Noretult() {
  return (
    <>
      <Alert
        message="Error"
        description="По вашему запросу ничего не найдено"
        type="error"
        showIcon
      />
      <br />
    </>
  );
}
export default Noretult;
