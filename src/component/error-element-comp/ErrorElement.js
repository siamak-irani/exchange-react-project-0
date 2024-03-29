import { useRouteError } from "react-router-dom";
import ErrorBox from "./ErrorBox";

function ErrorElement({ err = null }) {
  const routerError = useRouteError();
  const error = err || routerError;

  let title = "خطایی پیش آمد!";
  let message =
    "ظاهرا مشکلی پیش آمده است. اتصال اینترنت و VPN خود را بررسی کنید و دوباره تلاش کنید.";

  const errStatus = error ? error.status : -1;

  switch (errStatus) {
    case 400:
      title = "درخواست نامعتبر!";
      message = "سرور نتوانست درخواست را درک کند.";
      break;
    case 401:
      title = "تأیید نشده!";
      message = "برای دسترسی به این منبع، احراز هویت لازم است.";
      break;
    case 404:
      title = "یافت نشد!";
      message = "منبع یا صفحه مورد نظر یافت نشد.";
      break;
  }

  return (
    <>
      <ErrorBox title={title} message={message} />
    </>
  );
}

export default ErrorElement;
