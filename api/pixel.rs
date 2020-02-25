use now_lambda::lambda;
use std::error::Error;

use http::StatusCode;
use now_lambda::{error::NowError, IntoResponse, Request, Response};

fn handler(request: Request) -> Result<impl IntoResponse, NowError> {
  let pixel = String::from(
    "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=",
  );
  let uri = match request.uri().query() {
    Some(query) => match query.split('=').collect::<Vec<_>>()[..] {
      ["image", image] => image.split('.').collect::<Vec<_>>().remove(0).to_string(),
      _ => panic!("Shouldn't be reachable 2."),
    },
    _ => panic!("Shouldn't be reachable."),
  };

  Ok(
    Response::builder()
      .status(StatusCode::OK)
      .header("content-type", "image/png")
      .header("x-uri", uri)
      .body(pixel)
      .expect("Failed to render response."),
  )
}


fn main() -> Result<(), Box<dyn Error>> {
    Ok(lambda!(handler))
}
