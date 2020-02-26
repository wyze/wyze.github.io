use now_lambda::lambda;
use std::error::Error;

use firestore_db_and_auth::{documents, Credentials, ServiceSession};
use http::StatusCode;
use now_lambda::{error::NowError, IntoResponse, Request, Response};
use serde::{Deserialize, Serialize};
use std::env;

#[derive(Serialize, Deserialize)]
struct PixelDTO {
  location: String,
}

fn handler(request: Request) -> Result<impl IntoResponse, NowError> {
  let base64_credentials = env::var("FIREBASE_CREDENTIALS").expect("Read credentials from env");
  let base64_jwk_service_acct =
    env::var("FIREBASE_JWK_SERVICE_ACCT").expect("Read jwk service acct from env");
  let base64_jwk_analytics_acct =
    env::var("FIREBASE_JWK_ANALYTICS_ACCT").expect("Read jwk analytics acct from env");

  let credentials = String::from_utf8(base64::decode(&base64_credentials).unwrap()).unwrap();
  let jwk_service_acct =
    String::from_utf8(base64::decode(&base64_jwk_service_acct).unwrap()).unwrap();
  let jwk_analytics_acct =
    String::from_utf8(base64::decode(&base64_jwk_analytics_acct).unwrap()).unwrap();

  let cred = Credentials::new(&credentials, &[&jwk_service_acct, &jwk_analytics_acct])
    .expect("Read credentials input");
  let session = ServiceSession::new(cred).expect("Create a service account session");

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

  let obj = PixelDTO { location: uri };

  documents::write(
    &session,
    "neilkistner.com",
    None::<&str>,
    &obj,
    documents::WriteOptions::default(),
  ).expect("Write document to firebase");

  Ok(
    Response::builder()
      .status(StatusCode::OK)
      .header("content-type", "image/png")
      .body(pixel)
      .expect("Failed to render response."),
  )
}

fn main() -> Result<(), Box<dyn Error>> {
  Ok(lambda!(handler))
}
