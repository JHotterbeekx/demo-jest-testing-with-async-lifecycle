import React from "react";
import { shallow } from "enzyme";
import DataDisplayer from "./DataDisplayer";

// We want to test DataDisplayer in an isolated state, but DataDisplayer uses DataRetriever.
// To keep the isolation we will need to mock out the DataRetriever. This way we control 
// what this component does and we can predict the outcome. To do this we need to do a manual
// mock, we can do this by importing the component we want to mock, and then defining a mock
// om that import.
import * as DataRetriever from "./DataRetriever";
DataRetriever.default = jest.fn();

describe("DataDisplayer", () => {
  beforeEach(() => {
    // Before each test we want to reset the state of the mocked component, so each test can
    // mock the component in the way it needs to be mocked. Should you have any default mock
    // needed that is required for every test, this is the place to do this.
    DataRetriever.default.mockClear();
  });
  
  // In this test we will mock the DataRetriever in a way that it will call the callback method
  // we pass to it, and call it with "fakeTitle" as argument. This simulates that the API has
  // given us a result with { title: "fakeTitle" } in it. We make the test asynchronous, since
  // we want to be able to use await in the code to wait for a promise to resolve.
  it("Should show the data, When retrieved", async () => {
    // We are going to set up the mock value that DataRetriever resolves to, we tell it when the 
    // code uses DataRetiever instead of actually calling it and fetching data from the API. It
    // instantly resolves to a value 'fakeTitle'.
    DataRetriever.default.mockResolvedValue('fakeTitle');
    
    // We shallow mount the compont through enzyme. This renders the component with a fake DOM 
    // making us able to see the result that would be rendered. We specifically use the shallow
    // mount in this case. Not only is this the prefered render for unit tests, since it isolates
    // the component completly when rendering, we also use it because we don't want to trigger
    // the lifecycle methods. Since our lifecycle method handles code asynchronously, we want
    // to be able to wait for that code to complete, this requires manually calling this method.
    var wrapper = shallow(<DataDisplayer />);
    // We need to get the actual instance from the virtual DOM, so we can call any method that 
    // is available on it.
    const instance = wrapper.instance();
    // Now we call the componentDidMount event, telling the component that it mounted. But because
    // we called it manually we are able to await for it to resolve. This makes sure the promise
    // for the method is completed before going on with the code.
    await instance.componentDidMount();
    // Since we fake a result coming back from the retriever, we expect the text to actually show
    // the word "fakeTitle" in the component.
    expect(wrapper.text()).toContain("fakeTitle");
  });

  // In this test we will mock the DataRetriever in a way that it will not call the callback
  // method we pass to it. This simulates tha API not being finished or returning an error.
  // We make the test asynchronous, since we want to be able to use await in the code to wait 
  // for a promise to resolve.
  it("Should show not available, When data has not been retrieved", async () => {
    // We are going to set up the mock value that DataRetriever resolves to, we tell it when the 
    // code uses DataRetiever instead of actually calling it and fetching data from the API. It
    // instantly resolves to an undefined value, so we can handle nothing coming back from the API.
    DataRetriever.default.mockResolvedValue(undefined);

    // We are shallow mounting the component again, using its instance, calling the 
    // componentDidMount and waiting for it to resolve. Only this time it will resolve to a value
    // of undefined.
    var wrapper = shallow(<DataDisplayer />);
    const instance = wrapper.instance();
    await instance.componentDidMount();
    // Since we fake no result coming back from the retriever we don't expect any title appearing
    // on the page, but instead we expect to see the text "not available"
    expect(wrapper.text()).toContain("not available");
  });
});
