let baseUrl = "";
let mode: string = import.meta.env.MODE;
switch (mode) {
  case "development":
    baseUrl = "http://192.168.3.132:8000"; //开发环境url
    break;
  case "production":
    baseUrl = ""; //生产环境url
    break;
}

export default baseUrl;
