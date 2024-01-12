export function append(key: string) {
  let myPostsStr = localStorage.getItem("posts");

  let myPosts: string[] = [];

  if (myPostsStr != null) {
    myPosts = JSON.parse(myPostsStr);
  } else {
    myPosts = [];
  }

  myPosts.push(key);

  localStorage.setItem("posts", JSON.stringify(myPosts));
}

export function get() {
  let myPostsStr = localStorage.getItem("posts");

  let myPosts: string[];

  if (myPostsStr === null) {
    localStorage.setItem("posts", "[]");
    myPosts = [];
  } else {
    myPosts = JSON.parse(myPostsStr);
  }

  return myPosts;
}

export function remove(key: string) {
  let myPostsStr = localStorage.getItem("posts");

  let myPosts: string[] = [];

  if (myPostsStr != null) {
    myPosts.splice(myPosts.indexOf(key), myPosts.indexOf(key));
    myPosts = JSON.parse(myPostsStr);
  } else {
    myPosts = [];
  }

  localStorage.setItem("posts", JSON.stringify(myPosts));
}
