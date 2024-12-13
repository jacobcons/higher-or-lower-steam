import { useState } from 'react';

export default async function App() {
  const [count, setCount] = useState(0);

  const res = await fetch(
    `https://gist.githubusercontent.com/sunilshenoy/23a3e7132c27d62599ba741bce13056a/raw/517b07fc382c843dcc7d444046d959a318695245/sample_json.json`,
  );
  const txt = await res.text();
  console.log(txt);

  return (
    <>
      <h1 className="text-3xl font-bold">hi</h1>
    </>
  );
}
