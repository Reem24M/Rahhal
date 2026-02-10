export function getUserId(): string {
  const token = localStorage.getItem("token");
  if (!token) return "";

  try {
    const parsedToken = JSON.parse(token); 
    const payloadBase64 = parsedToken.split('.')[1];
    const payloadJson = atob(payloadBase64); 
    const payload = JSON.parse(payloadJson);
    return payload.profileId || null; 
  } catch (err) {
    console.error("Failed to parse token", err);
    return "";
  }
}
