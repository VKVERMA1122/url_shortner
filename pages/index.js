import { useState } from "react";
import { Button, Input } from "@chakra-ui/react";

export default function Home() {
  const [fullurl, setfullurl] = useState("");
  const [shorturl, setshorturl] = useState("");

  const createUrl = async () => {
    const response = await fetch(
      "https://url-shortner-v2.vercel.app/api/create",
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          url: fullurl,
          slug: shorturl,
        }),
      }
    );
    if (response.ok) {
      console.log("msg", response.data);
    } else {
      console.log("err", response.data);
    }
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignContent: "center",
        justifyContent: "center",
        flexWrap: "wrap",
      }}
    >
      <label>FullUrl</label>
      <Input
        value={fullurl}
        mb="10px"
        width="10rem"
        errorBorderColor="crimson"
        isInvalid={!fullurl}
        onChange={(e) => setfullurl(e.target.value)}
        placeholder="Enter Full Url"
      />
      <label>Short</label>
      <Input
        value={shorturl}
        mb="10px"
        width="10rem"
        errorBorderColor="crimson"
        isInvalid={!shorturl}
        onChange={(e) => setshorturl(e.target.value)}
        placeholder="Enter Short Form"
      />

      <Button onClick={createUrl} isDisabled={!fullurl || !shorturl} mt="10px">
        Submit
      </Button>
    </div>
  );
}
