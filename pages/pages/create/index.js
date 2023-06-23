import { useState } from "react";
import { useRouter as nav } from "next/navigation";

export default function CreatePost() {
  const [wpContent, setWpContent] = useState({ title: "", content: "" });
  const navRouter = nav();

  const onClickHandler = async () => {
    const headers = new Headers();

    const username = "ajay";
    const password = "G4uR KaXO o644 feEh u0yF PjnN";

    headers.set("Content-Type", "application/json");
    headers.set(
      "Authorization",
      "Basic " + Buffer.from(`${username}:${password}`).toString("base64")
    );

    const res = await fetch(
      "http://localhost/wordpress/index.php/wp-json/wp/v2/posts/",
      {
        method: "POST",
        headers,
        body: JSON.stringify({
          title: wpContent.title,
          content: wpContent.content,
          //   "<!-- wp:paragraph --> This is a content from Postman <!-- /wp:paragraph --> ",
          status: "publish",
        }),
      }
    );
    if (res.status == 201) {
      alert("New Post Created!!");
      navRouter.push("/");
    }
  };

  return (
    <div style={{ marginTop: "40px", marginLeft: "100px" }}>
      <div>
        <label htmlFor="title">Title : </label>
        <br />
        <input
          type="text"
          id="title"
          name="title"
          required
          onChange={(e) => {
            setWpContent({ ...wpContent, title: e.target.value });
          }}
        />
      </div>
      <br />
      <div>
        <label htmlFor="content">Content : </label>
        <br />

        <textarea
          type="text"
          id="content"
          name="content"
          required
          onChange={(e) => {
            setWpContent({ ...wpContent, content: e.target.value });
          }}
        />
      </div>
      <div>
        <button onClick={onClickHandler}>Create Post</button>
      </div>
    </div>
  );
}
