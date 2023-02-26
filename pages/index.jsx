import React from 'react'

export async function getServerSideProps() {
  const res = await fetch('https://hacker-news.firebaseio.com/v0/item/30167605.json')
  const data = await res.json()
  return {
    props: { data }
  }
}

export default function Page(props) {
  const [response, setResponse] = React.useState(null)
  const submitForm = async () => {
    try {
      setResponse(null)
      const res = await fetch('/api/test', { method: 'POST' })
      const json = await res.json()
      setResponse(json)
    } catch (err) {
      console.error(err)
      setResponse(`Request failed: ${err}`)
    }
  }

  return (
    <div>
      <style type="text/css" global>{`
        body { font-family: system-ui; }
        pre { white-space: normal; }
        iframe { width: 100%; }
      `}</style>

      <h1>vercel-fetch-firebase-repro</h1>
      <p>
        This page demonstrates how making requests to{" "}
        <code>https://hacker-news.firebaseio.com/v0/item/30167605.json</code> fails from a Vercel API route.
      </p>

      <h2>iframe</h2>
      <p>Here's a simple iframe tag to that URL:</p>
      <iframe src="https://hacker-news.firebaseio.com/v0/item/30167605.json"></iframe>

      <h2>getServerSideProps</h2>
      <p>Here's what we got using <code>fetch()</code> from <code>getServerSideProps</code>:</p>
      <pre>{JSON.stringify(props.data)}</pre>

      <h2>API route via POST</h2>
      <p>Click <button onClick={submitForm}>Submit</button> to load the API route via a POST request</p>
      <pre>{JSON.stringify(response)}</pre>
    </div>
  );
}
