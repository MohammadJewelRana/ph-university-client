import { Layout } from "antd";
import { Outlet } from "react-router-dom";

import Sidebar from "./Sidebar";

const { Header, Content } = Layout;

const MainLayOut = () => {
  return (
    <Layout style={{ height: "100vh" }}>
      {/* sidebar */}
      <Sidebar></Sidebar>

      {/* main content part  */}
      <Layout>
        <Header style={{ padding: 0 }} />
        <Content style={{ margin: "24px 16px 0" }}>
          <div
            style={{
              padding: 24,
              minHeight: 360,
            }}
          >
            {/* <h1>Main content</h1> */}
            <Outlet></Outlet>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayOut;
