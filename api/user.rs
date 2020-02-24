use now_lambda::lambda;
use std::error::Error;

use http::{StatusCode};
use now_lambda::{error::NowError, IntoResponse, Request, Response};

fn handler(_: Request) -> Result<impl IntoResponse, NowError> {
  let response = Response::builder()
    .status(StatusCode::OK)
    .header("Content-Type", "text/plain")
    .body("user endpoint...")
    .expect("Internal Server Error");

  Ok(response)
}


fn main() -> Result<(), Box<dyn Error>> {
  Ok(lambda!(handler))
}
