

// This demo method calls an open API, then translates the response to JSON. Once that is done
// it calls the passed in callbackMethod with the title property as parameter. So when the API
// gives us { title: 'myTitle' }, the code will perform callbackMethod('myTitle')
export default async() => {
  const todoData = await fetch("https://jsonplaceholder.typicode.com/todos/1");
  const todoDataJson = await todoData.json();
  return todoDataJson.title;
}
