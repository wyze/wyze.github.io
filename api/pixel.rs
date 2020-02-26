use firestore_db_and_auth::{documents, Credentials, ServiceSession};
use now_lambda::{error::NowError, lambda, IntoResponse, Request, Response};
use serde::{Deserialize, Serialize};
use std::error::Error;

mod constants;
mod util;

#[derive(Serialize, Deserialize)]
struct PixelDTO {
  location: String,
}

fn handler(request: Request) -> Result<impl IntoResponse, NowError> {
  let credentials = util::decrypt_string(constants::FIREBASE_CREDENTIALS);
  let service_jwk = util::decrypt_string(constants::FIREBASE_SERVICE_JWK);
  let analytics_jwk = util::decrypt_string(constants::FIREBASE_ANALYTICS_JWK);

  let cred = Credentials::new(&credentials, &[&service_jwk, &analytics_jwk])
    .expect("Read credentials input");
  let session = ServiceSession::new(cred).expect("Create a service account session");

  let uri = match request.uri().query() {
    Some(query) => match query.split('=').collect::<Vec<_>>()[..] {
      ["image", image] => image.split('.').collect::<Vec<_>>().remove(0).to_string(),
      _ => panic!("Shouldn't be reachable 2."),
    },
    _ => panic!("Shouldn't be reachable."),
  };

  let obj = PixelDTO { location: uri };

  documents::write(
    &session,
    "neilkistner.com",
    None::<&str>,
    &obj,
    documents::WriteOptions::default(),
  )
  .expect("Write document to firebase");

  let pixel =
    "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=";

  Ok(
    Response::builder()
      .status(200)
      .header("content-type", "image/png")
      .body(pixel)
      .expect("Failed to render response"),
  )
}

fn main() -> Result<(), Box<dyn Error>> {
  Ok(lambda!(handler))
}
