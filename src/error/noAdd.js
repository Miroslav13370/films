import { Alert } from "antd";

function NoAdd() {
  return (
    <>
      <Alert message="Error" description="В избранное ничего не добавлено" type="error" showIcon />
      <br />
    </>
  );
}
export default NoAdd;
