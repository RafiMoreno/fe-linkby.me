export default function (username: string | string[]) {
  const currentUser = useCookie("username").value;
  if (typeof currentUser === "string" && currentUser === username) {
    return useState<Boolean>("isProfileOwner", () => true);
  } else {
    return useState<Boolean>("isProfileOwner", () => false);
  }
}
