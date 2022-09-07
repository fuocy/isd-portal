import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { createUserPresenter } from "stores/user_store";
import { createServices } from "services/services";
import { createCompanyPresenter } from "pages/auth/login/user_store";
import { observer } from "mobx-react";
import { Header as HeaderView } from "base/ui/layout/header/header";
import { Sidebar as SidebarView } from "base/ui/layout/sidebar/sidebar";
import { Layout } from "base/ui/layout/layout";
import { createLayoutLoginHOC } from "base/ui/layout/layout.login";
import { createPages } from "pages/create";
import { createLogin } from "pages/createLogin";

export function createApp() {
  const services = createServices("api-url");
  const userPresenter = createUserPresenter(services);
  // Create global stores
  const userStore = userPresenter.createStore();

  const loginPresenter = createCompanyPresenter(services);
  // Create global stores
  const loginStore = loginPresenter.createStore();
  // Init/load stores

  // loginPresenter.login(loginStore, {
  //   userName: "Admin",
  //   password: "isdcorp@456456",
  //   saleOrg: "1000",
  //   companyCode: "1000",
  // });
// console.log(localStorage.getItem('user_session'))

  const openSidebar = (e: any) => {
    userStore.open = e;
    userPresenter.loadUser("user-id", userStore);
  };

  // Connect view with data
  const Header = observer(() => (
    <HeaderView
     
      openSidebar={openSidebar}

    />
  ));
  const Sidebar = observer(() => (
    <SidebarView
      openSidebarWrapper={userStore.open}
    />
  ));
  const layoutLoginHOC = createLayoutLoginHOC();

  const {
    HomePage,

    //======= purchase oder page===========================//

    PurchaseOrderPage,
    PurchaseOrderDetailPage,
    PrintBarcodePurchaseOderPage,
    //====== location Page ===============================//
    LocationListPage,
    PrintBarcodeLocation,
    //======vendor==========================================//
    VendorListPage
  } = createPages(services);

  const { LoginPage } = createLogin(layoutLoginHOC, services);

  return () => (
    <BrowserRouter>
      <Routes>
        <Route path="auth">
          <Route path="login" element={<LoginPage />} />
        </Route>
        <Route
          path="/*"
          element={
            <Layout header={<Header />} footer={null} sidebar={<Sidebar />} />
          }
        >
          {/*========================= purchaseOrder========================================== */}

          <Route path="MES/PurchaseOrder/*" element={<PurchaseOrderPage />} />
          <Route
            path="purchaseOrder/detail/:PurchaseOrderId"
            element={<PurchaseOrderDetailPage />}
          />
          <Route
            path="MES/PurchaseOrder/detail/:PurchaseOrderId"
            element={<PurchaseOrderDetailPage />}
          />
          <Route
            path="purchaseOrder/printBarcode/:PurchaseOrderDetailId"
            element={<PrintBarcodePurchaseOderPage />}
          />
          {/*=============== Location==================================================== */}

          <Route
            path="MasterData/StorageBin/*"
            element={<LocationListPage />}
          />
          <Route
            path="MasterData/StorageBin/printBarcode/:StorageBinId"
            element={<PrintBarcodeLocation />}
          />
          {/* //===============================vendor=========================================== */}
          <Route
            path="MasterData/Vendor/*"
            element={<VendorListPage />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
