import request from "@/utils/request";

//  获取公钥
export async function publicKeyApi() {
  const methodType = "GET";
  const url = "/public/publickey";
  return await request(methodType, url, {});
}
