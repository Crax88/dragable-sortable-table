import React from "react";
import { DataServiceConsumer } from "../dataServiceContext/dataServiceContext";

const WithDataService = mapServiceMethodsToProps => Wrapped => {
  return props => {
    return (
      <DataServiceConsumer>
        {dataService => {
          const serviceProps = mapServiceMethodsToProps(dataService);
          return <Wrapped {...props} {...serviceProps} />;
        }}
      </DataServiceConsumer>
    );
  };
};
export default WithDataService;
