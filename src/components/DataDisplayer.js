import React from "react";
import RetrieveData from "./DataRetriever";

export default class DataDisplayer extends React.Component {
  constructor(props) {
    super(props);

    // We initialize the state with a boolean that contains a boolean telling us if data is
    // available, which will be set to 'true' once the callback method is called. And a data
    // property which will be filled on callback containing a string with a title.
    this.state = {
      dataAvailable: false,
      data: null
    };
  }

  // We use the componentDidMount to trigger the retrieval of the data once the component is
  // mounted. Which means the component first mounts with its default state and than triggers
  // this method so data is retrieved. We make the method asynchronous so we are able to use
  // await. This gives us a better readable and debuggable way to handle the promise received
  // from RetrieveData().
  async componentDidMount () {
    // We call the retrieve method and wait for the promise to resolve, the result of this resolved
    // promise will be the title, which is placed in the variable title. We validate if we indeed
    // got a title before updating the state and marking the data as available.
    const title = await RetrieveData();
    if(title){
      this.setState({
        dataAvailable: true,
        data: title
      });
    }
  }

  // This render method will initially render the text 'Data not available', because in the 
  // initial state the property dataAvailable is false. Once data is retrieved and the callback
  // method has been called the state will update, which triggers a re-render, so the render
  // is executed again. Now the dataAvailable will be true and the content in data will be shown.
  render() {
    if (!this.state.dataAvailable) return <div>Data not available</div>;
    return (
      <div>
        Data value: <strong>{this.state.data}</strong>
      </div>
    );
  }
}
