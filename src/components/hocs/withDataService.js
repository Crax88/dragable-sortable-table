import React from "react";
import { DataServiceConsumer } from "../dataServiceContext/dataServiceContext";

const WithDataService = Wrapped => {
  return props => {
    return (
      <DataServiceConsumer>
        {dataService => {
          return <Wrapped {...props} dataService={dataService} />;
        }}
      </DataServiceConsumer>
    );
  };
};
export default WithDataService;
