let baseUrl = "";
let mode: string = import.meta.env.MODE;
switch (mode) {
  case "development":
    baseUrl = "http://127.0.0.1:8000"; //开发环境url
    break;
  case "production":
    baseUrl = ""; //生产环境url
    break;
}

export default baseUrl;
