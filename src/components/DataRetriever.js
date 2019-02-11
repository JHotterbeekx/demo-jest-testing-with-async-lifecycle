

// This demo method calls an open API, then translates the response to JSON. Once that is done
// it returns the 'title' property from this data. So when the API gives us { title: 'myTitle' },
// the code will return 'myTitle'. Synce we want to use await to give us a readable way to handle
// the promises we encounter, we have to make the method itselfs asynchronous. Which result in 
// the actual return value being a promise that resolves to the title.
export default async() => {
  const todoData = await fetch("https://jsonplaceholder.typicode.com/todos/1");
  const todoDataJson = await todoData.json();
  return todoDataJson.title;
}
