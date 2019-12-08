import service from "../utils/request";

export function GetSms(data) {
  //触发
  return service.request({
    method: "post",
    url: "/getSms/",
    data: data
  });
}
