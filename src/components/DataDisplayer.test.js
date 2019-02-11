import React from "react";
import { shallow } from "enzyme";
import DataDisplayer from "./DataDisplayer";

import * as DataRetriever from "./DataRetriever";
DataRetriever.default = jest.fn();

describe("DataDisplayer", () => {
  beforeEach(() => {
    DataRetriever.default.mockClear();
  });
  
  it("Should show the data, When retrieved", async () => {
    DataRetriever.default.mockResolvedValue('fakeTitle');
    
    var wrapper = shallow(<DataDisplayer />);
    const instance = wrapper.instance();
    await instance.componentDidMount();
    expect(wrapper.text()).toContain("fakeTitle");
  });

  it("Should show not available, When data has not been retrieved", async () => {
    DataRetriever.default.mockResolvedValue(undefined);

    var wrapper = shallow(<DataDisplayer />);
    const instance = wrapper.instance();
    await instance.componentDidMount();
    expect(wrapper.text()).toContain("not available");
  });
});
